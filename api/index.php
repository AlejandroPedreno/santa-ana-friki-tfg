<?php

declare(strict_types=1);

// 1. Importamos las funciones base de conexión y respuestas JSON desde db.php
require_once __DIR__ . '/db.php';

// 2. Control de Preflight CORS (Vital para que React pueda comunicarse desde otro puerto)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $config = api_config();
    header('Access-Control-Allow-Origin: ' . ($config['cors_origin'] ?? '*'));
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}

// 3. Capturamos el endpoint solicitado a través de la URL (por defecto responderá 'health')
$endpoint = $_GET['endpoint'] ?? 'health';

try {
    // Inicializamos la conexión PDO
    $pdo = api_pdo();

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
                'database' => 'Conexión con MySQL (Puerto 3308) establecida con éxito'
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
            // Devuelve los productos permitiendo filtrar por sección (?section=) y subcategoría (?subcategory=)
            $sectionSlug = $_GET['section'] ?? null;
            $subCategorySlug = $_GET['subcategory'] ?? null;
            
            $sql = "SELECT p.* FROM products p WHERE p.active = 1";
            $params = [];

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
        // FASE 2: ESTRUCTURA PARA FUTURAS ITERACIONES (USUARIOS, CARROS, EVENTOS)
        // =================================================================
        
        case 'register':
            // Estructura preparada para el registro de usuarios (POST)
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                api_send_json(['error' => 'Método no permitido. Use POST.'], 405);
            }
            // Aquí iría la captura de datos de React, password_hash() e INSERT INTO users
            api_send_json(['message' => 'Endpoint de registro preparado (Fase 2)'], 202);
            break;

        case 'login':
            // Estructura preparada para la autenticación y uso de tokens JWT/Bearer
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                api_send_json(['error' => 'Método no permitido. Use POST.'], 405);
            }
            // Aquí se verificarían credenciales y se llamaría a api_generate_token($userId)
            api_send_json(['message' => 'Endpoint de autenticación preparado (Fase 2)'], 202);
            break;

        case 'events':
            // Estructura preparada para listar la agenda de torneos de la comunidad
            $stmt = $pdo->query("SELECT * FROM events ORDER BY event_date ASC");
            $events = $stmt->fetchAll();
            api_send_json([
                'message' => 'Módulo de eventos conceptual (Fase 2)',
                'data' => $events
            ]);
            break;

        case 'checkout':
            // Estructura preparada para procesar la compra segura verificando el token del usuario
            $token = api_get_bearer_token();
            $userId = $token ? api_verify_token($token) : null;
            
            if (!$userId) {
                api_send_json(['error' => 'No autorizado. Se requiere token de sesión válido.'], 401);
            }
            // Aquí se pasaría el carrito temporal de cart_items a orders y order_items
            api_send_json(['message' => 'Procesamiento de pedido preparado para el usuario ' . $userId], 202);
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