-- ============================================================================
-- Santa Ana Friki - ARQUITECTURA COMPLETA DE BASE DE DATOS
-- ============================================================================
-- Nota: Esta versión incluye módulos futuros (usuarios, pedidos, eventos) 
-- para presentación al tribunal y escalabilidad.
-- En la fase actual solo el CATÁLOGO está funcional.
-- ============================================================================

-- CATÁLOGO DE PRODUCTOS (YA FUNCIONAL)
CREATE TABLE IF NOT EXISTS `catalog_sections` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL UNIQUE,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `route_path` VARCHAR(255) NOT NULL,
  `sort_order` INT(11) DEFAULT 0,
  `active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `catalog_subcategories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `section_id` INT(11) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `sort_order` INT(11) DEFAULT 0,
  `active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_section_name` (`section_id`, `name`),
  FOREIGN KEY (`section_id`) REFERENCES `catalog_sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `section_id` INT(11) NOT NULL,
  `subcategory_id` INT(11) NOT NULL,
  `legacy_id` INT(11) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `image_path` VARCHAR(500),
  `price` DECIMAL(10, 2) NOT NULL,
  `currency` CHAR(3) DEFAULT 'EUR',
  `release_order` INT(11),
  `in_stock` TINYINT(1) DEFAULT 1,
  `stock` INT(11) DEFAULT 0,
  `active` TINYINT(1) DEFAULT 1,
  `source_file` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_legacy_per_section` (`section_id`, `legacy_id`),
  FOREIGN KEY (`section_id`) REFERENCES `catalog_sections` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`subcategory_id`) REFERENCES `catalog_subcategories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SISTEMA DE USUARIOS
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin', 'moderator') DEFAULT 'user',
  `first_name` VARCHAR(120),
  `last_name` VARCHAR(120),
  `phone` VARCHAR(20),
  `address` VARCHAR(500),
  `city` VARCHAR(120),
  `postal_code` VARCHAR(10),
  `country` VARCHAR(120),
  `active` TINYINT(1) DEFAULT 1,
  `email_verified_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `email_idx` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SISTEMA DE CARRITO Y PEDIDOS
CREATE TABLE IF NOT EXISTS `carts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `total` DECIMAL(10, 2) DEFAULT 0.00,
  `currency` CHAR(3) DEFAULT 'EUR',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_cart` (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cart_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10, 2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_cart_product` (`cart_id`, `product_id`),
  FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `total` DECIMAL(10, 2) NOT NULL,
  `currency` CHAR(3) DEFAULT 'EUR',
  `status` ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  `billing_address` VARCHAR(500),
  `shipping_address` VARCHAR(500),
  `payment_method` VARCHAR(50),
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_idx` (`user_id`),
  KEY `status_idx` (`status`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `unit_price` DECIMAL(10, 2) NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_idx` (`order_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SISTEMA DE EVENTOS / TORNEOS
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT,
  `game_type` VARCHAR(120),
  `event_date` DATETIME NOT NULL,
  `event_end_date` DATETIME,
  `location` VARCHAR(500),
  `image_path` VARCHAR(500),
  `max_participants` INT(11),
  `registration_fee` DECIMAL(10, 2),
  `currency` CHAR(3) DEFAULT 'EUR',
  `status` ENUM('draft', 'open', 'closed', 'ongoing', 'completed', 'cancelled') DEFAULT 'draft',
  `organizer_notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_date_idx` (`event_date`),
  KEY `status_idx` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `event_registrations` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `event_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `deck_list` LONGTEXT,
  `status` ENUM('registered', 'confirmed', 'cancelled', 'finished') DEFAULT 'registered',
  `registered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_event_user` (`event_id`, `user_id`),
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- AUDITORÍA
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11),
  `action` VARCHAR(120) NOT NULL,
  `entity_type` VARCHAR(120),
  `entity_id` INT(11),
  `old_values` JSON,
  `new_values` JSON,
  `ip_address` VARCHAR(45),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_idx` (`user_id`),
  KEY `action_idx` (`action`),
  KEY `created_at_idx` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;