<?php

declare(strict_types=1);

function api_config(): array
{
    static $config = null;

    if ($config === null) {
        $config = require __DIR__ . '/config.php';
    }

    return $config;
}

function api_send_json($data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');

    $config = api_config();
    header('Access-Control-Allow-Origin: ' . ($config['cors_origin'] ?? '*'));
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function api_request_body(): array
{
    $rawInput = file_get_contents('php://input');

    if (is_string($rawInput) && trim($rawInput) !== '') {
        $decoded = json_decode($rawInput, true);

        if (is_array($decoded)) {
            return $decoded;
        }
    }

    return $_POST;
}

function api_pdo(): PDO
{
    $config = api_config();
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $config['db_host'],
        $config['db_port'],
        $config['db_name'],
        $config['db_charset']
    );

    return new PDO($dsn, $config['db_user'], $config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}

function api_get_bearer_token(): ?string
{
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['Authorization'] ?? null;
    if (!$auth) return null;

    if (stripos($auth, 'Bearer ') === 0) {
        return trim(substr($auth, 7));
    }

    return null;
}

function api_generate_token(int $userId, int $ttl = 3600): string
{
    $config = api_config();
    $secret = $config['api_secret'] ?? 'change_me';
    $expiry = time() + $ttl;
    $nonce = bin2hex(random_bytes(8));
    $payload = $userId . '|' . $expiry . '|' . $nonce;
    $sig = hash_hmac('sha256', $payload, $secret);
    $token = base64_encode($payload . '|' . $sig);
    return $token;
}

function api_verify_token(string $token): ?int
{
    $config = api_config();
    $secret = $config['api_secret'] ?? 'change_me';

    $decoded = base64_decode($token, true);
    if ($decoded === false) return null;

    $parts = explode('|', $decoded);
    if (count($parts) !== 4) return null;

    [$userId, $expiry, $nonce, $sig] = $parts;
    if ((int)$expiry < time()) return null;

    $payload = $userId . '|' . $expiry . '|' . $nonce;
    $expected = hash_hmac('sha256', $payload, $secret);
    if (!hash_equals($expected, $sig)) return null;

    return (int)$userId;
}
