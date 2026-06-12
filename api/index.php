<?php

declare(strict_types=1);

// 1. Importamos las funciones base de conexión y respuestas JSON desde db.php
require_once __DIR__ . '/db.php';

// 2. Control del preflight CORS para que React pueda comunicarse desde otro puerto.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $config = api_config();
    header('Access-Control-Allow-Origin: ' . ($config['cors_origin'] ?? '*'));
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}

// 3. Leemos el endpoint pedido en la URL; si no viene ninguno, respondemos health.
$endpoint = $_GET['endpoint'] ?? 'health';

try {
    // Inicializamos la conexión PDO
    $pdo = api_pdo();
    $body = api_request_body();
    $effectiveMethod = $_SERVER['REQUEST_METHOD'];

    if ($effectiveMethod === 'POST' && strtoupper((string)($body['_method'] ?? '')) === 'PUT') {
        $effectiveMethod = 'PUT';
    }

    // 4. Sistema de Enrutamiento Principal
    switch ($endpoint) {
        
        // =================================================================
        // FASE 1: ENDPOINTS DEL CATÁLOGO (COMPLETAMENTE OPERATIVOS)
        // =================================================================
        
        case 'health':
            // Endpoint de diagnóstico del estado de la API y la base de datos
            api_send_json([
                'status' => 'ok',
                'message' => 'API de Santa Ana Friki activa',
                'database' => 'Conexión con MySQL (Puerto 3306) establecida con éxito'
            ]);
            break;

        case 'sections':
            // Devuelve todas las secciones principales del catálogo ordenadas
            $stmt = $pdo->query("SELECT id, name, slug, route_path FROM catalog_sections WHERE active = 1 ORDER BY sort_order ASC");
            $sections = $stmt->fetchAll();
            api_send_json($sections);
            break;

        case 'subcategories':
            // Devuelve las subcategorías. Permite filtrar por sección (?endpoint=subcategories&section=slug)
            $sectionSlug = $_GET['section'] ?? null;
            if ($sectionSlug) {
                $stmt = $pdo->prepare("
                    SELECT s.id, s.name, s.slug 
                    FROM catalog_subcategories s
                    JOIN catalog_sections cs ON s.section_id = cs.id
                    WHERE cs.slug = :section_slug AND s.active = 1
                    ORDER BY s.sort_order ASC
                ");
                $stmt->execute(['section_slug' => $sectionSlug]);
            } else {
                $stmt = $pdo->query("SELECT id, section_id, name, slug FROM catalog_subcategories WHERE active = 1 ORDER BY sort_order ASC");
            }
            $subcategories = $stmt->fetchAll();
            api_send_json($subcategories);
            break;

        case 'products':
            // Devuelve los productos permitiendo filtrar por sección (?section=), subcategoría (?subcategory=) o búsqueda (?search=)
            $sectionSlug = $_GET['section'] ?? null;
            $subCategorySlug = $_GET['subcategory'] ?? null;
            $searchTerm = $_GET['search'] ?? null;
            
            $sql = "SELECT p.* FROM products p WHERE p.active = 1";
            $params = [];

            if ($searchTerm) {
                $sql .= " AND (p.name LIKE :search_term OR p.source_file LIKE :search_term)";
                $params['search_term'] = '%' . $searchTerm . '%';
            }

            if ($sectionSlug) {
                $sql .= " AND p.section_id = (SELECT id FROM catalog_sections WHERE slug = :section_slug)";
                $params['section_slug'] = $sectionSlug;
            }

            if ($subCategorySlug) {
                $sql .= " AND p.subcategory_id = (SELECT id FROM catalog_subcategories WHERE slug = :sub_slug)";
                $params['sub_slug'] = $subCategorySlug;
            }

            $sql .= " ORDER BY p.release_order ASC";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $products = $stmt->fetchAll();
            
            api_send_json($products);
            break;

        // =================================================================
        // Fase 2: estructura preparada para futuras iteraciones como usuarios, carrito y eventos.
        // =================================================================
        
        case 'register':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                api_send_json(['error' => 'Método no permitido. Use POST.'], 405);
            }

            $body = api_request_body();
            $name = trim((string)($body['name'] ?? ''));
            $email = trim((string)($body['email'] ?? ''));
            $phone = trim((string)($body['phone'] ?? ''));
            $password = (string)($body['password'] ?? '');

            if ($name === '' || $email === '' || $password === '') {
                api_send_json(['error' => 'Faltan datos obligatorios para registrar el usuario.'], 422);
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                api_send_json(['error' => 'El correo electrónico no es válido.'], 422);
            }

            if (strlen($password) < 8) {
                api_send_json(['error' => 'La contraseña debe tener al menos 8 caracteres.'], 422);
            }

            $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
            $stmt->execute(['email' => $email]);

            if ($stmt->fetch()) {
                api_send_json(['error' => 'Ya existe una cuenta con ese correo electrónico.'], 409);
            }

            $nameParts = preg_split('/\s+/', $name, 2, PREG_SPLIT_NO_EMPTY) ?: [];
            $firstName = $nameParts[0] ?? $name;
            $lastName = $nameParts[1] ?? null;

            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $pdo->prepare('
                INSERT INTO users (email, password_hash, role, first_name, last_name, phone, active)
                VALUES (:email, :password_hash, :role, :first_name, :last_name, :phone, 1)
            ');
            $stmt->execute([
                'email' => $email,
                'password_hash' => $passwordHash,
                'role' => 'user',
                'first_name' => $firstName,
                'last_name' => $lastName,
                'phone' => $phone !== '' ? $phone : null,
            ]);

            $userId = (int)$pdo->lastInsertId();
            $sessionToken = api_generate_token($userId);

            api_send_json([
                'message' => 'Usuario registrado correctamente.',
                'token' => $sessionToken,
                'user' => [
                    'id' => $userId,
                    'email' => $email,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'phone' => $phone,
                    'role' => 'user',
                ],
            ], 201);
            break;

        case 'login':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                api_send_json(['error' => 'Método no permitido. Use POST.'], 405);
            }

            $body = api_request_body();
            $email = trim((string)($body['email'] ?? ''));
            $password = (string)($body['password'] ?? '');

            if ($email === '' || $password === '') {
                api_send_json(['error' => 'Debes indicar correo electrónico y contraseña.'], 422);
            }

            $stmt = $pdo->prepare('
                SELECT id, email, password_hash, role, first_name, last_name, phone
                FROM users
                WHERE email = :email AND active = 1
                LIMIT 1
            ');
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password_hash'])) {
                api_send_json(['error' => 'Credenciales incorrectas.'], 401);
            }

            $sessionToken = api_generate_token((int)$user['id']);

            api_send_json([
                'message' => 'Sesión iniciada correctamente.',
                'token' => $sessionToken,
                'user' => [
                    'id' => (int)$user['id'],
                    'email' => $user['email'],
                    'first_name' => $user['first_name'],
                    'last_name' => $user['last_name'],
                    'phone' => $user['phone'],
                    'role' => $user['role'],
                ],
            ]);
            break;

        case 'events':
            // Endpoint preparado para listar la agenda de torneos de la comunidad.
            $stmt = $pdo->query("SELECT * FROM events ORDER BY event_date ASC");
            $events = $stmt->fetchAll();
            api_send_json([
                'message' => 'Módulo de eventos conceptual (Fase 2)',
                'data' => $events
            ]);
            break;

        case 'checkout':
            // Endpoint preparado para procesar la compra segura verificando el token del usuario.
            $token = api_get_bearer_token();
            $userId = $token ? api_verify_token($token) : null;
            
            if (!$userId) {
                api_send_json(['error' => 'No autorizado. Se requiere token de sesión válido.'], 401);
            }
            // Aquí se pasaría el carrito temporal de cart_items a orders y order_items
            api_send_json(['message' => 'Procesamiento de pedido preparado para el usuario ' . $userId], 202);
            break;

        case 'admin-products':
            $currentUser = api_require_admin();

            if ($effectiveMethod === 'GET') {
                $stmt = $pdo->query(
                    'SELECT p.*, cs.name AS section_name, cs.slug AS section_slug, csub.name AS subcategory_name, csub.slug AS subcategory_slug
                     FROM products p
                     INNER JOIN catalog_sections cs ON p.section_id = cs.id
                     LEFT JOIN catalog_subcategories csub ON p.subcategory_id = csub.id
                     ORDER BY p.updated_at DESC, p.id DESC'
                );

                api_send_json([
                    'user' => [
                        'id' => (int)$currentUser['id'],
                        'email' => $currentUser['email'],
                        'role' => $currentUser['role'],
                    ],
                    'data' => $stmt->fetchAll(),
                ]);
            }

            $uploadedImagePath = null;

            if (!empty($_FILES['image_file']['name'])) {
                $uploadedImagePath = api_store_product_image($_FILES['image_file']);
            }

            // Calcula el legacy_id efectivo: usa el valor recibido o asigna el siguiente disponible.
            $effectiveLegacyId = isset($body['legacy_id']) && (int)$body['legacy_id'] > 0 ? (int)$body['legacy_id'] : null;
            if ($effectiveLegacyId === null) {
                $stmtNext = $pdo->query('SELECT COALESCE(MAX(legacy_id), 0) + 1 AS next_legacy FROM products');
                $rowNext = $stmtNext->fetch();
                $effectiveLegacyId = (int)($rowNext['next_legacy'] ?? 1);
            }

            $normalizedSlug = api_slugify(trim((string)($body['slug'] ?? '')));
            if ($normalizedSlug === 'producto' || ($body['slug'] ?? '') === '') {
                $normalizedSlug = api_slugify(trim((string)($body['name'] ?? '')) . '-' . (string)$effectiveLegacyId);
            }

            if ($effectiveMethod === 'POST') {
                // El legacy_id es opcional: si no se envía, el backend lo asigna automáticamente.
                $requiredFields = ['section_id', 'name', 'slug', 'price'];
                foreach ($requiredFields as $field) {
                    if ($field === 'slug') {
                        continue;
                    }

                    if (!isset($body[$field]) || $body[$field] === '') {
                        api_send_json(['error' => 'Faltan campos obligatorios para crear el producto.'], 422);
                    }
                }

                if ($uploadedImagePath === null && empty($body['image_path'])) {
                    api_send_json(['error' => 'Debes subir una imagen o indicar una ruta de imagen.'], 422);
                }

                $stmt = $pdo->prepare('
                    INSERT INTO products
                    (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file)
                    VALUES
                    (:section_id, :subcategory_id, :legacy_id, :name, :slug, :image_path, :price, :currency, :release_order, :in_stock, :stock, :active, :source_file)
                ');

                $stmt->execute([
                    'section_id' => (int)$body['section_id'],
                    'subcategory_id' => !empty($body['subcategory_id']) ? (int)$body['subcategory_id'] : null,
                    'legacy_id' => $effectiveLegacyId,
                    'name' => trim((string)$body['name']),
                    'slug' => $normalizedSlug,
                    'image_path' => $uploadedImagePath ?? (trim((string)($body['image_path'] ?? '')) ?: null),
                    'price' => (float)$body['price'],
                    'currency' => trim((string)($body['currency'] ?? 'EUR')),
                    'release_order' => $body['release_order'] !== null && $body['release_order'] !== '' ? (int)$body['release_order'] : 0,
                    'in_stock' => !empty($body['in_stock']) ? 1 : 0,
                    'stock' => isset($body['stock']) ? (int)$body['stock'] : 0,
                    'active' => isset($body['active']) ? (int)(bool)$body['active'] : 1,
                    'source_file' => trim((string)($body['source_file'] ?? '')) ?: null,
                ]);

                api_send_json([
                    'message' => 'Producto creado correctamente.',
                    'id' => (int)$pdo->lastInsertId(),
                ], 201);
            }

            if ($effectiveMethod === 'PUT') {
                $productId = (int)($body['id'] ?? 0);
                if ($productId <= 0) {
                    api_send_json(['error' => 'Debes indicar el ID del producto a modificar.'], 422);
                }

                $stmt = $pdo->prepare('
                    UPDATE products
                    SET section_id = :section_id,
                        subcategory_id = :subcategory_id,
                        legacy_id = :legacy_id,
                        name = :name,
                        slug = :slug,
                        image_path = :image_path,
                        price = :price,
                        in_stock = :in_stock,
                        stock = :stock,
                        active = :active,
                        source_file = :source_file
                    WHERE id = :id
                    LIMIT 1
                ');

                $stmt->execute([
                    'id' => $productId,
                    'section_id' => (int)($body['section_id'] ?? 0),
                    'subcategory_id' => !empty($body['subcategory_id']) ? (int)$body['subcategory_id'] : null,
                    'legacy_id' => (int)($body['legacy_id'] ?? 0),
                    'name' => trim((string)($body['name'] ?? '')),
                    'slug' => $normalizedSlug,
                    'image_path' => $uploadedImagePath ?? (trim((string)($body['image_path'] ?? '')) ?: null),
                    'price' => (float)($body['price'] ?? 0),
                    'in_stock' => !empty($body['in_stock']) ? 1 : 0,
                    'stock' => isset($body['stock']) ? (int)$body['stock'] : 0,
                    'active' => isset($body['active']) ? (int)(bool)$body['active'] : 1,
                    'source_file' => trim((string)($body['source_file'] ?? '')) ?: null,
                ]);

                api_send_json(['message' => 'Producto actualizado correctamente.']);
            }

            if ($effectiveMethod === 'DELETE') {
                $productId = (int)($_GET['id'] ?? ($body['id'] ?? 0));

                if ($productId <= 0) {
                    api_send_json(['error' => 'Debes indicar el ID del producto a eliminar.'], 422);
                }

                $stmt = $pdo->prepare('DELETE FROM products WHERE id = :id LIMIT 1');
                $stmt->execute(['id' => $productId]);

                api_send_json(['message' => 'Producto eliminado correctamente.']);
            }

            api_send_json(['error' => 'Método no permitido.'], 405);
            break;

        default:
            // Error en caso de solicitar un recurso que no existe en la API
            api_send_json(['error' => 'Endpoint no encontrado'], 404);
            break;
    }

} catch (PDOException $e) {
    // Captura y gestión de errores de la base de datos (ej: XAMPP apagado o puerto bloqueado)
    api_send_json([
        'error' => 'Error de comunicación con la base de datos',
        'message' => $e->getMessage()
    ], 500);
} catch (Exception $e) {
    // Captura de cualquier otra excepción general del sistema
    api_send_json([
        'error' => 'Error interno del servidor',
        'message' => $e->getMessage()
    ], 500);
}