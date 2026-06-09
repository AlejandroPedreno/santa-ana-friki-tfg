<?php

declare(strict_types=1);

require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    api_send_json(['ok' => true]);
}

try {
    $pdo = api_pdo();
    $endpoint = $_GET['endpoint'] ?? 'catalog';

    // Read JSON body for POST requests
    $body = null;
    if (in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'PATCH'])) {
        $raw = file_get_contents('php://input');
        $body = $raw ? json_decode($raw, true) : null;
    }

    // --- AUTH: register / login / profile
    if ($endpoint === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = $body ?? [];
        $email = trim((string)($data['email'] ?? ''));
        $password = (string)($data['password'] ?? '');
        $first = trim((string)($data['first_name'] ?? ''));

        if ($email === '' || $password === '') {
            api_send_json(['ok' => false, 'error' => 'missing_fields'], 400);
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('INSERT INTO users (email, password_hash, first_name, created_at) VALUES (:email, :pw, :first, NOW())');
        try {
            $stmt->execute(['email' => $email, 'pw' => $hash, 'first' => $first]);
        } catch (PDOException $e) {
            api_send_json(['ok' => false, 'error' => 'duplicate_email'], 409);
        }

        $id = (int)$pdo->lastInsertId();
        $token = api_generate_token($id);
        api_send_json(['ok' => true, 'user_id' => $id, 'token' => $token]);
    }

    if ($endpoint === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = $body ?? [];
        $email = trim((string)($data['email'] ?? ''));
        $password = (string)($data['password'] ?? '');

        $stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $row = $stmt->fetch();
        if (!$row || !password_verify($password, $row['password_hash'])) {
            api_send_json(['ok' => false, 'error' => 'invalid_credentials'], 401);
        }

        $token = api_generate_token((int)$row['id']);
        api_send_json(['ok' => true, 'token' => $token]);
    }

    if ($endpoint === 'profile') {
        $token = api_get_bearer_token();
        $userId = $token ? api_verify_token($token) : null;
        if (!$userId) api_send_json(['ok' => false, 'error' => 'unauthorized'], 401);

        $stmt = $pdo->prepare('SELECT id, email, role, first_name, last_name, created_at FROM users WHERE id = :id');
        $stmt->execute(['id' => $userId]);
        api_send_json(['ok' => true, 'data' => $stmt->fetch()]);
    }

    // --- CART endpoints (simple)
    if ($endpoint === 'cart') {
        $token = api_get_bearer_token();
        $userId = $token ? api_verify_token($token) : null;
        if (!$userId) api_send_json(['ok' => false, 'error' => 'unauthorized'], 401);

        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            // return cart and items
            $stmt = $pdo->prepare('SELECT id, total, currency FROM carts WHERE user_id = :uid LIMIT 1');
            $stmt->execute(['uid' => $userId]);
            $cart = $stmt->fetch();
            if (!$cart) {
                api_send_json(['ok' => true, 'data' => ['cart' => null, 'items' => []]]);
            }

            $stmt = $pdo->prepare('SELECT ci.id, ci.product_id, ci.quantity, ci.unit_price, p.name, p.slug FROM cart_items ci LEFT JOIN products p ON p.id = ci.product_id WHERE ci.cart_id = :cid');
            $stmt->execute(['cid' => $cart['id']]);
            $items = $stmt->fetchAll();
            api_send_json(['ok' => true, 'data' => ['cart' => $cart, 'items' => $items]]);
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // add item { product_id, quantity }
            $data = $body ?? [];
            $productId = (int)($data['product_id'] ?? 0);
            $quantity = max(1, (int)($data['quantity'] ?? 1));

            if ($productId <= 0) api_send_json(['ok' => false, 'error' => 'invalid_product'], 400);

            // ensure cart exists
            $stmt = $pdo->prepare('SELECT id FROM carts WHERE user_id = :uid LIMIT 1');
            $stmt->execute(['uid' => $userId]);
            $cart = $stmt->fetch();
            if (!$cart) {
                $stmt = $pdo->prepare('INSERT INTO carts (user_id, total, currency, created_at) VALUES (:uid, 0, "EUR", NOW())');
                $stmt->execute(['uid' => $userId]);
                $cartId = (int)$pdo->lastInsertId();
            } else {
                $cartId = (int)$cart['id'];
            }

            // get price
            $stmt = $pdo->prepare('SELECT price FROM products WHERE id = :pid LIMIT 1');
            $stmt->execute(['pid' => $productId]);
            $p = $stmt->fetch();
            if (!$p) api_send_json(['ok' => false, 'error' => 'product_not_found'], 404);

            $unit = (float)$p['price'];
            // upsert cart item
            $stmt = $pdo->prepare('SELECT id, quantity FROM cart_items WHERE cart_id = :cid AND product_id = :pid LIMIT 1');
            $stmt->execute(['cid' => $cartId, 'pid' => $productId]);
            $existing = $stmt->fetch();
            if ($existing) {
                $newQty = (int)$existing['quantity'] + $quantity;
                $stmt = $pdo->prepare('UPDATE cart_items SET quantity = :q, unit_price = :u, updated_at = NOW() WHERE id = :id');
                $stmt->execute(['q' => $newQty, 'u' => $unit, 'id' => $existing['id']]);
            } else {
                $stmt = $pdo->prepare('INSERT INTO cart_items (cart_id, product_id, quantity, unit_price, created_at) VALUES (:cid, :pid, :q, :u, NOW())');
                $stmt->execute(['cid' => $cartId, 'pid' => $productId, 'q' => $quantity, 'u' => $unit]);
            }

            // recalc cart total
            $stmt = $pdo->prepare('SELECT SUM(quantity * unit_price) AS total FROM cart_items WHERE cart_id = :cid');
            $stmt->execute(['cid' => $cartId]);
            $total = (float)($stmt->fetchColumn() ?? 0);
            $stmt = $pdo->prepare('UPDATE carts SET total = :t, updated_at = NOW() WHERE id = :cid');
            $stmt->execute(['t' => $total, 'cid' => $cartId]);

            api_send_json(['ok' => true, 'cart_id' => $cartId, 'total' => $total]);
        }
    }

    // --- Checkout
    if ($endpoint === 'checkout' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $token = api_get_bearer_token();
        $userId = $token ? api_verify_token($token) : null;
        if (!$userId) api_send_json(['ok' => false, 'error' => 'unauthorized'], 401);

        // get cart
        $stmt = $pdo->prepare('SELECT id, total FROM carts WHERE user_id = :uid LIMIT 1');
        $stmt->execute(['uid' => $userId]);
        $cart = $stmt->fetch();
        if (!$cart) api_send_json(['ok' => false, 'error' => 'empty_cart'], 400);

        $stmt = $pdo->prepare('SELECT ci.product_id, ci.quantity, ci.unit_price, p.name FROM cart_items ci LEFT JOIN products p ON p.id = ci.product_id WHERE ci.cart_id = :cid');
        $stmt->execute(['cid' => $cart['id']]);
        $items = $stmt->fetchAll();
        if (!$items) api_send_json(['ok' => false, 'error' => 'empty_cart'], 400);

        // create order
        $orderNumber = 'ORD-' . strtoupper(bin2hex(random_bytes(4)));
        $pdo->beginTransaction();
        try {
            $stmt = $pdo->prepare('INSERT INTO orders (user_id, order_number, total, currency, status, created_at) VALUES (:uid, :on, :total, "EUR", "pending", NOW())');
            $stmt->execute(['uid' => $userId, 'on' => $orderNumber, 'total' => $cart['total']]);
            $orderId = (int)$pdo->lastInsertId();

            $insertItem = $pdo->prepare('INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal, created_at) VALUES (:oid, :pid, :pname, :q, :u, :sub, NOW())');
            foreach ($items as $it) {
                $sub = (float)$it['quantity'] * (float)$it['unit_price'];
                $insertItem->execute(['oid' => $orderId, 'pid' => $it['product_id'], 'pname' => $it['name'], 'q' => $it['quantity'], 'u' => $it['unit_price'], 'sub' => $sub]);
            }

            // clear cart
            $stmt = $pdo->prepare('DELETE FROM cart_items WHERE cart_id = :cid');
            $stmt->execute(['cid' => $cart['id']]);
            $stmt = $pdo->prepare('UPDATE carts SET total = 0 WHERE id = :cid');
            $stmt->execute(['cid' => $cart['id']]);

            $pdo->commit();
            api_send_json(['ok' => true, 'order_id' => $orderId, 'order_number' => $orderNumber]);
        } catch (Throwable $e) {
            $pdo->rollBack();
            api_send_json(['ok' => false, 'error' => 'checkout_failed', 'message' => $e->getMessage()], 500);
        }
    }

    // --- Orders list
    if ($endpoint === 'orders' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $token = api_get_bearer_token();
        $userId = $token ? api_verify_token($token) : null;
        if (!$userId) api_send_json(['ok' => false, 'error' => 'unauthorized'], 401);

        $stmt = $pdo->prepare('SELECT id, order_number, total, currency, status, created_at FROM orders WHERE user_id = :uid ORDER BY created_at DESC');
        $stmt->execute(['uid' => $userId]);
        $orders = $stmt->fetchAll();
        api_send_json(['ok' => true, 'data' => $orders]);
    }

    // --- Events
    if ($endpoint === 'events' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->query('SELECT id, name, slug, description, game_type, event_date, location, max_participants, registration_fee, currency, status FROM events WHERE status IN ("open","draft") ORDER BY event_date ASC');
        api_send_json(['ok' => true, 'data' => $stmt->fetchAll()]);
    }

    if ($endpoint === 'events_register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $token = api_get_bearer_token();
        $userId = $token ? api_verify_token($token) : null;
        if (!$userId) api_send_json(['ok' => false, 'error' => 'unauthorized'], 401);

        $data = $body ?? [];
        $eventId = (int)($data['event_id'] ?? 0);
        if ($eventId <= 0) api_send_json(['ok' => false, 'error' => 'invalid_event'], 400);

        $stmt = $pdo->prepare('INSERT INTO event_registrations (event_id, user_id, deck_list, status, registered_at) VALUES (:eid, :uid, :deck, "registered", NOW())');
        try {
            $stmt->execute(['eid' => $eventId, 'uid' => $userId, 'deck' => $data['deck_list'] ?? null]);
            api_send_json(['ok' => true]);
        } catch (PDOException $e) {
            api_send_json(['ok' => false, 'error' => 'already_registered_or_error'], 409);
        }
    }


    if ($endpoint === 'health') {
        api_send_json([
            'ok' => true,
            'service' => 'santa-ana-friki-api',
            'database' => true,
        ]);
    }

    if ($endpoint === 'sections') {
        $stmt = $pdo->query('SELECT id, name, slug, route_path, sort_order, active FROM catalog_sections ORDER BY sort_order ASC, id ASC');
        api_send_json(['data' => $stmt->fetchAll()]);
    }

    if ($endpoint === 'subcategories') {
        $sectionSlug = isset($_GET['section']) ? trim((string) $_GET['section']) : '';

        $sql = 'SELECT cs.id, cs.section_id, cs.name, cs.slug, cs.sort_order, cs.active, s.slug AS section_slug FROM catalog_subcategories cs INNER JOIN catalog_sections s ON s.id = cs.section_id';
        $params = [];

        if ($sectionSlug !== '') {
            $sql .= ' WHERE s.slug = :section_slug';
            $params['section_slug'] = $sectionSlug;
        }

        $sql .= ' ORDER BY cs.sort_order ASC, cs.id ASC';

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        api_send_json(['data' => $stmt->fetchAll()]);
    }

    if ($endpoint === 'products') {
        $sectionSlug = isset($_GET['section']) ? trim((string) $_GET['section']) : '';
        $subcategorySlug = isset($_GET['subcategory']) ? trim((string) $_GET['subcategory']) : '';
        $limit = isset($_GET['limit']) ? max(1, min(200, (int) $_GET['limit'])) : 200;
        $offset = isset($_GET['offset']) ? max(0, (int) $_GET['offset']) : 0;

        $sql = <<<SQL
SELECT
    p.id,
    p.section_id,
    p.subcategory_id,
    p.legacy_id,
    p.name,
    p.slug,
    p.image_path,
    p.price,
    p.currency,
    p.release_order,
    p.in_stock,
    p.stock,
    p.active,
    p.source_file,
    s.slug AS section_slug,
    s.name AS section_name,
    sc.slug AS subcategory_slug,
    sc.name AS subcategory_name
FROM products p
INNER JOIN catalog_sections s ON s.id = p.section_id
LEFT JOIN catalog_subcategories sc ON sc.id = p.subcategory_id
SQL;
        $conditions = [];
        $params = [];

        if ($sectionSlug !== '') {
            $conditions[] = 's.slug = :section_slug';
            $params['section_slug'] = $sectionSlug;
        }

        if ($subcategorySlug !== '') {
            $conditions[] = 'sc.slug = :subcategory_slug';
            $params['subcategory_slug'] = $subcategorySlug;
        }

        if ($conditions) {
            $sql .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $sql .= ' ORDER BY p.release_order DESC, p.id ASC LIMIT :limit OFFSET :offset';

        $stmt = $pdo->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue(':' . $key, $value, PDO::PARAM_STR);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        api_send_json(['data' => $stmt->fetchAll()]);
    }

    $sectionSlug = isset($_GET['section']) ? trim((string) $_GET['section']) : '';
    $subcategorySlug = isset($_GET['subcategory']) ? trim((string) $_GET['subcategory']) : '';

    $sql = <<<SQL
SELECT
    p.id,
    p.section_id,
    p.subcategory_id,
    p.legacy_id,
    p.name,
    p.slug,
    p.image_path,
    p.price,
    p.currency,
    p.release_order,
    p.in_stock,
    p.stock,
    p.active,
    p.source_file,
    s.slug AS section_slug,
    s.name AS section_name,
    sc.slug AS subcategory_slug,
    sc.name AS subcategory_name
FROM products p
INNER JOIN catalog_sections s ON s.id = p.section_id
LEFT JOIN catalog_subcategories sc ON sc.id = p.subcategory_id
SQL;
    $conditions = [];
    $params = [];

    if ($sectionSlug !== '') {
        $conditions[] = 's.slug = :section_slug';
        $params['section_slug'] = $sectionSlug;
    }

    if ($subcategorySlug !== '') {
        $conditions[] = 'sc.slug = :subcategory_slug';
        $params['subcategory_slug'] = $subcategorySlug;
    }

    if ($conditions) {
        $sql .= ' WHERE ' . implode(' AND ', $conditions);
    }

    $sql .= ' ORDER BY s.sort_order ASC, sc.sort_order ASC, p.release_order DESC, p.id ASC';

    $stmt = $pdo->prepare($sql);
    foreach ($params as $key => $value) {
        $stmt->bindValue(':' . $key, $value, PDO::PARAM_STR);
    }
    $stmt->execute();

    api_send_json(['data' => $stmt->fetchAll()]);
} catch (Throwable $throwable) {
    api_send_json([
        'ok' => false,
        'error' => 'Internal Server Error',
        'message' => $throwable->getMessage(),
    ], 500);
}
