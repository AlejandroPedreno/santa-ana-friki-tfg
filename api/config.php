<?php

declare(strict_types=1);

return [
    // Configuración local de desarrollo para conectar con MySQL y permitir CORS desde Vite.
    'db_host' => '127.0.0.1',
    'db_port' => 3306,
    'db_name' => 'santa_ana',
    'db_user' => 'root',
    'db_pass' => '',
    'db_charset' => 'utf8mb4',
    'cors_origin' => '*',
    'api_secret' => 'change_me_in_production',
    'allow_dev_seed' => true,
];
