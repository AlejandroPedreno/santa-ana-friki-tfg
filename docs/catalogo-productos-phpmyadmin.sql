-- phpMyAdmin import file generated from docs/catalogo-productos-seed.json and docs/catalogo-productos-schema.sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS catalog_subcategories;
DROP TABLE IF EXISTS catalog_sections;

CREATE TABLE catalog_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    route_path VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_catalog_sections_slug (slug),
    UNIQUE KEY uq_catalog_sections_route_path (route_path)
);

CREATE TABLE catalog_subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_catalog_subcategories_section
        FOREIGN KEY (section_id) REFERENCES catalog_sections (id)
        ON DELETE CASCADE,
    UNIQUE KEY uq_catalog_subcategories_section_slug (section_id, slug)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,
    subcategory_id INT NULL,
    legacy_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NULL,
    image_path VARCHAR(500) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'EUR',
    release_order INT NOT NULL DEFAULT 0,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    stock INT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    source_file VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_section
        FOREIGN KEY (section_id) REFERENCES catalog_sections (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_products_subcategory
        FOREIGN KEY (subcategory_id) REFERENCES catalog_subcategories (id)
        ON DELETE SET NULL,
    UNIQUE KEY uq_products_section_legacy_id (section_id, legacy_id),
    UNIQUE KEY uq_products_section_slug (section_id, slug),
    INDEX idx_products_section_id (section_id),
    INDEX idx_products_subcategory_id (subcategory_id),
    INDEX idx_products_release_order (release_order),
    INDEX idx_products_in_stock (in_stock)
);


INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Dragon Ball Fusion World', 'dragon-ball-fusion-world', '/juegos-de-cartas/dragon-ball-fusion-world', 1, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 401, 'Starter Deck Dragon Ball Fusion World - Goku', 'starter-deck-dragon-ball-fusion-world-goku-401', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 402, 'Starter Deck Dragon Ball Fusion World - Vegeta', 'starter-deck-dragon-ball-fusion-world-vegeta-402', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 403, 'Booster Pack Dragon Ball Fusion World - Set 1', 'booster-pack-dragon-ball-fusion-world-set-1-403', 'src/resources/images/home/producto-prueba.webp', 4.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 404, 'Display Dragon Ball Fusion World - 24 Sobres', 'display-dragon-ball-fusion-world-24-sobres-404', 'src/resources/images/home/producto-prueba.webp', 89.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 405, 'Protectores Dragon Ball Fusion World - Pack 100', 'protectores-dragon-ball-fusion-world-pack-100-405', 'src/resources/images/home/producto-prueba.webp', 8.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 406, 'Tapete Dragon Ball Fusion World - Oficial', 'tapete-dragon-ball-fusion-world-oficial-406', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 407, 'Caja de Almacenamiento Dragon Ball Fusion World', 'caja-de-almacenamiento-dragon-ball-fusion-world-407', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 408, 'Fundas Premium Dragon Ball Fusion World', 'fundas-premium-dragon-ball-fusion-world-408', 'src/resources/images/home/producto-prueba.webp', 7.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Lorcana', 'lorcana', '/juegos-de-cartas/lorcana', 2, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 501, 'Starter Deck Lorcana - Amber & Amethyst', 'starter-deck-lorcana-amber-amethyst-501', 'src/resources/images/home/producto-prueba.webp', 16.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 502, 'Starter Deck Lorcana - Ruby & Sapphire', 'starter-deck-lorcana-ruby-sapphire-502', 'src/resources/images/home/producto-prueba.webp', 16.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 503, 'Booster Pack Lorcana - Set 1', 'booster-pack-lorcana-set-1-503', 'src/resources/images/home/producto-prueba.webp', 5.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 504, 'Display Lorcana - 24 Sobres', 'display-lorcana-24-sobres-504', 'src/resources/images/home/producto-prueba.webp', 99.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 505, 'Protectores Lorcana - Pack 100', 'protectores-lorcana-pack-100-505', 'src/resources/images/home/producto-prueba.webp', 8.49, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 506, 'Tapete Lorcana - Diseño Oficial', 'tapete-lorcana-diseno-oficial-506', 'src/resources/images/home/producto-prueba.webp', 21.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 507, 'Album Lorcana - Collector', 'album-lorcana-collector-507', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 508, 'Fundas Premium Lorcana', 'fundas-premium-lorcana-508', 'src/resources/images/home/producto-prueba.webp', 7.49, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Magic: The Gathering', 'magic-the-gathering', '/juegos-de-cartas/magic-the-gathering', 3, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 601, 'Starter Deck Magic - Esper Control', 'starter-deck-magic-esper-control-601', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 602, 'Starter Deck Magic - Red Aggro', 'starter-deck-magic-red-aggro-602', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 603, 'Booster Magic - Set 1', 'booster-magic-set-1-603', 'src/resources/images/home/producto-prueba.webp', 5.49, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 604, 'Display Magic - 36 Sobres', 'display-magic-36-sobres-604', 'src/resources/images/home/producto-prueba.webp', 129.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 605, 'Protectores Magic - Pack 100', 'protectores-magic-pack-100-605', 'src/resources/images/home/producto-prueba.webp', 9.49, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 606, 'Playmat Magic - Diseño Oficial', 'playmat-magic-diseno-oficial-606', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 607, 'Deckbox Magic - Premium', 'deckbox-magic-premium-607', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 608, 'Fundas Magic - Pack 100', 'fundas-magic-pack-100-608', 'src/resources/images/home/producto-prueba.webp', 6.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Naruto Mythos', 'naruto-mythos', '/juegos-de-cartas/naruto-mythos', 4, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 701, 'Starter Deck Naruto Mythos - Naruto', 'starter-deck-naruto-mythos-naruto-701', 'src/resources/images/home/producto-prueba.webp', 18.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 702, 'Starter Deck Naruto Mythos - Sasuke', 'starter-deck-naruto-mythos-sasuke-702', 'src/resources/images/home/producto-prueba.webp', 18.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 703, 'Booster Naruto Mythos - Set 1', 'booster-naruto-mythos-set-1-703', 'src/resources/images/home/producto-prueba.webp', 4.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 704, 'Display Naruto Mythos - 24 Sobres', 'display-naruto-mythos-24-sobres-704', 'src/resources/images/home/producto-prueba.webp', 94.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 705, 'Protectores Naruto Mythos - Pack 100', 'protectores-naruto-mythos-pack-100-705', 'src/resources/images/home/producto-prueba.webp', 8.49, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 706, 'Tapete Naruto Mythos - Oficial', 'tapete-naruto-mythos-oficial-706', 'src/resources/images/home/producto-prueba.webp', 22.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 707, 'Deckbox Naruto Mythos - Kurama', 'deckbox-naruto-mythos-kurama-707', 'src/resources/images/home/producto-prueba.webp', 13.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 708, 'Fundas Naruto Mythos - Pack 100', 'fundas-naruto-mythos-pack-100-708', 'src/resources/images/home/producto-prueba.webp', 6.49, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Pokemon', 'pokemon', '/juegos-de-cartas/pokemon', 5, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 301, 'Display Pokemon Set Temporal Forces - Español', 'display-pokemon-set-temporal-forces-espanol-301', 'src/resources/images/home/producto-prueba.webp', 154.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 302, 'ETB Pokemon Set Temporal Forces - Español', 'etb-pokemon-set-temporal-forces-espanol-302', 'src/resources/images/home/producto-prueba.webp', 59.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 303, 'Booster Bundle Pokemon Surging Sparks - Español', 'booster-bundle-pokemon-surging-sparks-espanol-303', 'src/resources/images/home/producto-prueba.webp', 34.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 304, 'Caja de Entrenador Elite Heroes Ascendentes - Español', 'caja-de-entrenador-elite-heroes-ascendentes-espanol-304', 'src/resources/images/home/producto-prueba.webp', 69.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 305, 'Pack 3 Sobres Pokemon Paldea Evolved - Español', 'pack-3-sobres-pokemon-paldea-evolved-espanol-305', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 306, 'Sobre Suelto Pokemon Scarlet and Violet - Español', 'sobre-suelto-pokemon-scarlet-and-violet-espanol-306', 'src/resources/images/home/producto-prueba.webp', 4.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 307, 'Portamazos Premium Pokemon - Rojo', 'portamazos-premium-pokemon-rojo-307', 'src/resources/images/home/producto-prueba.webp', 11.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 308, 'Fundas Protectoras Pokemon Pack 100 - Negro', 'fundas-protectoras-pokemon-pack-100-negro-308', 'src/resources/images/home/producto-prueba.webp', 7.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('One Piece TCG', 'one-piece-tcg', '/juegos-de-cartas/one-piece-tcg', 6, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 101, 'One Piece Card Game: Starter Deck GREEN YELLOW YAMATO ST-28 (Ingles)', 'one-piece-card-game-starter-deck-green-yellow-yamato-st-28-ingles-101', 'src/resources/images/prueba/st28.png', 14.95, 'EUR', 1, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 102, 'One Piece Card Game: Starter Deck BLACK MARSHALL.D.TEACH ST-27 (Inglés)', 'one-piece-card-game-starter-deck-black-marshall-d-teach-st-27-ingles-102', 'src/resources/images/prueba/st27.png', 14.95, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 103, 'One Piece Card Game: Starter Deck BLUE BUGGY ST-25 (Inglés)', 'one-piece-card-game-starter-deck-blue-buggy-st-25-ingles-103', 'src/resources/images/prueba/st25.png', 14.95, 'EUR', 8, 0, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 104, 'One Piece Card Game: Starter Deck Ex GEAR 5 ST-21 (Inglés)', 'one-piece-card-game-starter-deck-ex-gear-5-st-21-ingles-104', 'src/resources/images/prueba/st21.png', 34.95, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 105, 'One Piece Card Game: Starter Deck YELLOW KATAKURI ST-20 (Inglés)', 'one-piece-card-game-starter-deck-yellow-katakuri-st-20-ingles-105', 'src/resources/images/prueba/st20.png', 14.95, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 106, 'One Piece Card Game: Starter Deck BLACK SMOKER ST-19 (Inglés)', 'one-piece-card-game-starter-deck-black-smoker-st-19-ingles-106', 'src/resources/images/prueba/st19.png', 14.95, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 107, 'One Piece Card Game: Starter Deck RED WHITEBEARD ST-15 (Inglés)', 'one-piece-card-game-starter-deck-red-whitebeard-st-15-ingles-107', 'src/resources/images/prueba/st15.png', 14.95, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 108, 'One Piece Card Game: Starter Deck MONKEY.D.LUFFY ST-08 (Inglés)', 'one-piece-card-game-starter-deck-monkey-d-luffy-st-08-ingles-108', 'src/resources/images/prueba/st08.png', 14.95, 'EUR', 4, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Riftbound', 'riftbound', '/juegos-de-cartas/riftbound', 7, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 201, 'Booster Pack Riftbound Set 1 - Español', 'booster-pack-riftbound-set-1-espanol-201', 'src/resources/images/home/producto-prueba.webp', 4.99, 'EUR', 1, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 202, 'Starter Deck Riftbound - Español', 'starter-deck-riftbound-espanol-202', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 203, 'Display Booster 24 Sobres - Riftbound', 'display-booster-24-sobres-riftbound-203', 'src/resources/images/home/producto-prueba.webp', 89.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 204, 'Playset Cartas Legendarias - Riftbound', 'playset-cartas-legendarias-riftbound-204', 'src/resources/images/home/producto-prueba.webp', 54.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 205, 'Protectores Cartas Riftbound - Pack 100', 'protectores-cartas-riftbound-pack-100-205', 'src/resources/images/home/producto-prueba.webp', 8.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 206, 'Tapete de Juego Riftbound - Diseño Oficial', 'tapete-de-juego-riftbound-diseno-oficial-206', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 207, 'Caja de Almacenamiento Riftbound - Roja', 'caja-de-almacenamiento-riftbound-roja-207', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 208, 'Dados Premium Riftbound - Set', 'dados-premium-riftbound-set-208', 'src/resources/images/home/producto-prueba.webp', 9.99, 'EUR', 4, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Yu-Gi-Oh!', 'yu-gi-oh', '/juegos-de-cartas/yu-gi-oh', 8, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 801, 'Starter Deck Yu-Gi-Oh! - Dark Magician', 'starter-deck-yu-gi-oh-dark-magician-801', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 802, 'Starter Deck Yu-Gi-Oh! - Blue-Eyes', 'starter-deck-yu-gi-oh-blue-eyes-802', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 803, 'Booster Yu-Gi-Oh! - Set 1', 'booster-yu-gi-oh-set-1-803', 'src/resources/images/home/producto-prueba.webp', 4.49, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 804, 'Display Yu-Gi-Oh! - 24 Sobres', 'display-yu-gi-oh-24-sobres-804', 'src/resources/images/home/producto-prueba.webp', 84.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 805, 'Protectores Yu-Gi-Oh! - Pack 100', 'protectores-yu-gi-oh-pack-100-805', 'src/resources/images/home/producto-prueba.webp', 8.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 806, 'Playmat Yu-Gi-Oh! - Oficial', 'playmat-yu-gi-oh-oficial-806', 'src/resources/images/home/producto-prueba.webp', 21.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 807, 'Deckbox Yu-Gi-Oh! - Red', 'deckbox-yu-gi-oh-red-807', 'src/resources/images/home/producto-prueba.webp', 12.49, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 808, 'Fundas Yu-Gi-Oh! - Pack 100', 'fundas-yu-gi-oh-pack-100-808', 'src/resources/images/home/producto-prueba.webp', 6.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Star Wars - Legion', 'star-wars-legion', '/miniaturas/star-wars-legion', 9, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 901, 'Starter Set Star Wars - Legion Clone Troopers', 'starter-set-star-wars-legion-clone-troopers-901', 'src/resources/images/home/producto-prueba.webp', 89.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 902, 'Starter Set Star Wars - Legion Imperial Troopers', 'starter-set-star-wars-legion-imperial-troopers-902', 'src/resources/images/home/producto-prueba.webp', 89.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 903, 'Expansion Star Wars - Legion: Jedi Knights', 'expansion-star-wars-legion-jedi-knights-903', 'src/resources/images/home/producto-prueba.webp', 49.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 904, 'Expansion Star Wars - Legion: Sith Operatives', 'expansion-star-wars-legion-sith-operatives-904', 'src/resources/images/home/producto-prueba.webp', 49.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 905, 'Star Wars - Legion Dice Pack', 'star-wars-legion-dice-pack-905', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 906, 'Star Wars - Legion Movement Tools', 'star-wars-legion-movement-tools-906', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 907, 'Star Wars - Legion Terrain Pack', 'star-wars-legion-terrain-pack-907', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 908, 'Star Wars - Legion Unit Cards', 'star-wars-legion-unit-cards-908', 'src/resources/images/home/producto-prueba.webp', 9.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Warhammer', 'warhammer', '/miniaturas/warhammer', 10, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'THE HORUS HERESY', 'the-horus-heresy', 1, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Warhammer 40.000 - KILL TEAM', 'warhammer-40-000-kill-team', 2, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'WARHAMMER 40000', 'warhammer-40000', 3, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'WARHAMMER AGE OF SIGMAR', 'warhammer-age-of-sigmar', 4, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'WARHAMMER DADOS', 'warhammer-dados', 5, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'WARHAMMER NECROMUNDA', 'warhammer-necromunda', 6, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'WARHAMMER UNDERWORLDS', 'warhammer-underworlds', 7, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'WARHAMMER WARCRY', 'warhammer-warcry', 8, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'WARHAMMER QUEST', 'warhammer-quest', 9, 1);

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'the-horus-heresy' LIMIT 1), 1001, 'THE HORUS HERESY - Age of Darkness Starter Set', 'the-horus-heresy-age-of-darkness-starter-set-1001', 'src/resources/images/home/producto-prueba.webp', 129.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'warhammer-40-000-kill-team' LIMIT 1), 1002, 'Warhammer 40.000 - KILL TEAM Starter Set', 'warhammer-40-000-kill-team-starter-set-1002', 'src/resources/images/home/producto-prueba.webp', 129.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'warhammer-40000' LIMIT 1), 1003, 'WARHAMMER 40000 - Leviathan Box', 'warhammer-40000-leviathan-box-1003', 'src/resources/images/home/producto-prueba.webp', 44.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'warhammer-age-of-sigmar' LIMIT 1), 1004, 'WARHAMMER AGE OF SIGMAR - Starter Set', 'warhammer-age-of-sigmar-starter-set-1004', 'src/resources/images/home/producto-prueba.webp', 29.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'warhammer-dados' LIMIT 1), 1005, 'WARHAMMER DADOS - Dice Set', 'warhammer-dados-dice-set-1005', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'warhammer-necromunda' LIMIT 1), 1006, 'WARHAMMER NECROMUNDA - Underhive Gang', 'warhammer-necromunda-underhive-gang-1006', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'warhammer-underworlds' LIMIT 1), 1007, 'WARHAMMER UNDERWORLDS - Starter Set', 'warhammer-underworlds-starter-set-1007', 'src/resources/images/home/producto-prueba.webp', 34.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'warhammer-warcry' LIMIT 1), 1008, 'WARHAMMER WARCRY - Ruins of the Mortal Realms', 'warhammer-warcry-ruins-of-the-mortal-realms-1008', 'src/resources/images/home/producto-prueba.webp', 16.99, 'EUR', 1, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'warhammer-quest' LIMIT 1), 1009, 'WARHAMMER QUEST - Cursed City', 'warhammer-quest-cursed-city-1009', 'src/resources/images/home/producto-prueba.webp', 59.99, 'EUR', 9, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Escenografía', 'escenografia', '/miniaturas/escenografia', 11, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1101, 'Ruined Buildings Set', 'ruined-buildings-set-1101', 'src/resources/images/home/producto-prueba.webp', 59.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1102, 'Industrial Terrain Pack', 'industrial-terrain-pack-1102', 'src/resources/images/home/producto-prueba.webp', 49.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1103, 'Fantasy Ruins Set', 'fantasy-ruins-set-1103', 'src/resources/images/home/producto-prueba.webp', 44.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1104, 'Sci-fi Scatter Terrain', 'sci-fi-scatter-terrain-1104', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1105, 'Woodland Terrain Pack', 'woodland-terrain-pack-1105', 'src/resources/images/home/producto-prueba.webp', 39.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1106, 'Roads and Barricades Set', 'roads-and-barricades-set-1106', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1107, 'Objective Markers Pack', 'objective-markers-pack-1107', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1108, 'Ruins Bases Pack', 'ruins-bases-pack-1108', 'src/resources/images/home/producto-prueba.webp', 9.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Blood Bowl', 'blood-bowl', '/miniaturas/blood-bowl', 12, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1201, 'Blood Bowl Starter Set', 'blood-bowl-starter-set-1201', 'src/resources/images/home/producto-prueba.webp', 109.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1202, 'Blood Bowl Orc Team', 'blood-bowl-orc-team-1202', 'src/resources/images/home/producto-prueba.webp', 49.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1203, 'Blood Bowl Human Team', 'blood-bowl-human-team-1203', 'src/resources/images/home/producto-prueba.webp', 49.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1204, 'Blood Bowl Dice Set', 'blood-bowl-dice-set-1204', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1205, 'Blood Bowl Pitch', 'blood-bowl-pitch-1205', 'src/resources/images/home/producto-prueba.webp', 39.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1206, 'Blood Bowl Dugout Set', 'blood-bowl-dugout-set-1206', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1207, 'Blood Bowl Coach Pack', 'blood-bowl-coach-pack-1207', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1208, 'Blood Bowl Rulebook', 'blood-bowl-rulebook-1208', 'src/resources/images/home/producto-prueba.webp', 18.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Middle-earth Strategy Battle Game', 'middle-earth-strategy-battle-game', '/miniaturas/middle-earth-strategy-battle-game', 13, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1301, 'Middle-earth Strategy Battle Game Starter Set', 'middle-earth-strategy-battle-game-starter-set-1301', 'src/resources/images/home/producto-prueba.webp', 119.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1302, 'Rohan Warriors Pack', 'rohan-warriors-pack-1302', 'src/resources/images/home/producto-prueba.webp', 44.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1303, 'Mordor Orcs Pack', 'mordor-orcs-pack-1303', 'src/resources/images/home/producto-prueba.webp', 44.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1304, 'The Fellowship of the Ring Pack', 'the-fellowship-of-the-ring-pack-1304', 'src/resources/images/home/producto-prueba.webp', 54.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1305, 'Middle-earth Dice Set', 'middle-earth-dice-set-1305', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1306, 'Gaming Mat Middle-earth', 'gaming-mat-middle-earth-1306', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1307, 'Terrain Pack Middle-earth', 'terrain-pack-middle-earth-1307', 'src/resources/images/home/producto-prueba.webp', 29.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1308, 'Rulebook Middle-earth', 'rulebook-middle-earth-1308', 'src/resources/images/home/producto-prueba.webp', 22.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Marvel Crisis Protocol', 'marvel-crisis-protocol', '/miniaturas/marvel-crisis-protocol', 14, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1401, 'Marvel Crisis Protocol Core Set', 'marvel-crisis-protocol-core-set-1401', 'src/resources/images/home/producto-prueba.webp', 149.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1402, 'Marvel Crisis Protocol Spider-Man & Ghost-Spider', 'marvel-crisis-protocol-spider-man-ghost-spider-1402', 'src/resources/images/home/producto-prueba.webp', 49.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1403, 'Marvel Crisis Protocol Doctor Strange & Wong', 'marvel-crisis-protocol-doctor-strange-wong-1403', 'src/resources/images/home/producto-prueba.webp', 49.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1404, 'Marvel Crisis Protocol Modular Terrain', 'marvel-crisis-protocol-modular-terrain-1404', 'src/resources/images/home/producto-prueba.webp', 39.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1405, 'Marvel Crisis Protocol Dice Set', 'marvel-crisis-protocol-dice-set-1405', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1406, 'Marvel Crisis Protocol Tokens Pack', 'marvel-crisis-protocol-tokens-pack-1406', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1407, 'Marvel Crisis Protocol Battle Pack', 'marvel-crisis-protocol-battle-pack-1407', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1408, 'Marvel Crisis Protocol Rulebook', 'marvel-crisis-protocol-rulebook-1408', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Figuras de colección', 'figuras-de-coleccion', '/miniaturas/figuras-de-coleccion', 15, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Bandai', 'bandai', 1, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Banpresto', 'banpresto', 2, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Good Smile Company', 'good-smile-company', 3, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Hasbro', 'hasbro', 4, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'MegaHouse', 'megahouse', 5, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Qposket', 'qposket', 6, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Taito', 'taito', 7, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Figuras Premium', 'figuras-premium', 8, 1);
INSERT INTO catalog_subcategories (section_id, name, slug, sort_order, active) VALUES (@section_id, 'Joy Toy', 'joy-toy', 9, 1);

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'bandai' LIMIT 1), 1501, 'Bandai - Pack premium 01', 'bandai-pack-premium-01-1501', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'banpresto' LIMIT 1), 1502, 'Banpresto - Edición limitada 02', 'banpresto-edicion-limitada-02-1502', 'src/resources/images/home/producto-prueba.webp', 34.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'good-smile-company' LIMIT 1), 1503, 'Good Smile Company - Nendoroid 03', 'good-smile-company-nendoroid-03-1503', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'hasbro' LIMIT 1), 1504, 'Hasbro - Figura articulada 04', 'hasbro-figura-articulada-04-1504', 'src/resources/images/home/producto-prueba.webp', 29.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'megahouse' LIMIT 1), 1505, 'MegaHouse - Diorama mini 05', 'megahouse-diorama-mini-05-1505', 'src/resources/images/home/producto-prueba.webp', 39.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'qposket' LIMIT 1), 1506, 'Qposket - Busto coleccionable 06', 'qposket-busto-coleccionable-06-1506', 'src/resources/images/home/producto-prueba.webp', 44.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'taito' LIMIT 1), 1507, 'Taito - Pack exposición 07', 'taito-pack-exposicion-07-1507', 'src/resources/images/home/producto-prueba.webp', 27.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'figuras-premium' LIMIT 1), 1508, 'Figuras Premium - Serie especial 08', 'figuras-premium-serie-especial-08-1508', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 1, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, (SELECT id FROM catalog_subcategories WHERE section_id = @section_id AND slug = 'joy-toy' LIMIT 1), 1509, 'Joy Toy - Especial 09', 'joy-toy-especial-09-1509', 'src/resources/images/home/producto-prueba.webp', 21.99, 'EUR', 9, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Academy Hobby Model Kits', 'academy-hobby-model-kits', '/maquetas/academy-hobby-model-kits', 16, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1501, 'Academy Hobby Model Kit - F-14 Tomcat', 'academy-hobby-model-kit-f-14-tomcat-1501', 'src/resources/images/home/producto-prueba.webp', 34.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1502, 'Academy Hobby Model Kit - P-51 Mustang', 'academy-hobby-model-kit-p-51-mustang-1502', 'src/resources/images/home/producto-prueba.webp', 29.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1503, 'Academy Hobby Model Kit - Tiger I', 'academy-hobby-model-kit-tiger-i-1503', 'src/resources/images/home/producto-prueba.webp', 39.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1504, 'Academy Hobby Model Kit - USS Enterprise', 'academy-hobby-model-kit-uss-enterprise-1504', 'src/resources/images/home/producto-prueba.webp', 44.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1505, 'Academy Hobby Model Kit - Paint Set', 'academy-hobby-model-kit-paint-set-1505', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1506, 'Academy Hobby Model Kit - Glue & Tools', 'academy-hobby-model-kit-glue-tools-1506', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1507, 'Academy Hobby Model Kit - Display Base', 'academy-hobby-model-kit-display-base-1507', 'src/resources/images/home/producto-prueba.webp', 9.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1508, 'Academy Hobby Model Kit - Tool Pack', 'academy-hobby-model-kit-tool-pack-1508', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Blokees', 'blokees', '/maquetas/blokees', 17, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1601, 'Blokees Model - Optimus Prime', 'blokees-model-optimus-prime-1601', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1602, 'Blokees Model - Bumblebee', 'blokees-model-bumblebee-1602', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1603, 'Blokees Model - Megatron', 'blokees-model-megatron-1603', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1604, 'Blokees Model - Starscream', 'blokees-model-starscream-1604', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1605, 'Blokees Model - Upgrade Kit', 'blokees-model-upgrade-kit-1605', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1606, 'Blokees Model - Display Base', 'blokees-model-display-base-1606', 'src/resources/images/home/producto-prueba.webp', 9.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1607, 'Blokees Model - Accessory Pack', 'blokees-model-accessory-pack-1607', 'src/resources/images/home/producto-prueba.webp', 7.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1608, 'Blokees Model - Tool Set', 'blokees-model-tool-set-1608', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Diy Miniature', 'diy-miniature', '/maquetas/diy-miniature', 18, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1701, 'Diy Miniature - Fantasy Cottage', 'diy-miniature-fantasy-cottage-1701', 'src/resources/images/home/producto-prueba.webp', 18.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1702, 'Diy Miniature - Sci-fi Hangar', 'diy-miniature-sci-fi-hangar-1702', 'src/resources/images/home/producto-prueba.webp', 21.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1703, 'Diy Miniature - Medieval House', 'diy-miniature-medieval-house-1703', 'src/resources/images/home/producto-prueba.webp', 18.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1704, 'Diy Miniature - Workshop Diorama', 'diy-miniature-workshop-diorama-1704', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1705, 'Diy Miniature - LED Kit', 'diy-miniature-led-kit-1705', 'src/resources/images/home/producto-prueba.webp', 9.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1706, 'Diy Miniature - Tree Pack', 'diy-miniature-tree-pack-1706', 'src/resources/images/home/producto-prueba.webp', 7.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1707, 'Diy Miniature - Paint Bundle', 'diy-miniature-paint-bundle-1707', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1708, 'Diy Miniature - Tools Pack', 'diy-miniature-tools-pack-1708', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Italeri', 'italeri', '/maquetas/italeri', 19, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1801, 'Italeri Model Kit - Spitfire Mk.V', 'italeri-model-kit-spitfire-mk-v-1801', 'src/resources/images/home/producto-prueba.webp', 27.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1802, 'Italeri Model Kit - M4 Sherman', 'italeri-model-kit-m4-sherman-1802', 'src/resources/images/home/producto-prueba.webp', 29.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1803, 'Italeri Model Kit - F-16 Fighting Falcon', 'italeri-model-kit-f-16-fighting-falcon-1803', 'src/resources/images/home/producto-prueba.webp', 34.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1804, 'Italeri Model Kit - Ducati 1199 Panigale', 'italeri-model-kit-ducati-1199-panigale-1804', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1805, 'Italeri Model Kit - Glue Pack', 'italeri-model-kit-glue-pack-1805', 'src/resources/images/home/producto-prueba.webp', 6.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1806, 'Italeri Model Kit - Paint Pack', 'italeri-model-kit-paint-pack-1806', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1807, 'Italeri Model Kit - Display Stand', 'italeri-model-kit-display-stand-1807', 'src/resources/images/home/producto-prueba.webp', 8.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1808, 'Italeri Model Kit - Tool Pack', 'italeri-model-kit-tool-pack-1808', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Revell', 'revell', '/maquetas/revell', 20, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1901, 'Revell Model Kit - BMW M4 GT3', 'revell-model-kit-bmw-m4-gt3-1901', 'src/resources/images/home/producto-prueba.webp', 32.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1902, 'Revell Model Kit - Airbus A320', 'revell-model-kit-airbus-a320-1902', 'src/resources/images/home/producto-prueba.webp', 29.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1903, 'Revell Model Kit - Titanic', 'revell-model-kit-titanic-1903', 'src/resources/images/home/producto-prueba.webp', 39.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1904, 'Revell Model Kit - USS Missouri', 'revell-model-kit-uss-missouri-1904', 'src/resources/images/home/producto-prueba.webp', 44.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1905, 'Revell Model Kit - Glue & Tools', 'revell-model-kit-glue-tools-1905', 'src/resources/images/home/producto-prueba.webp', 7.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1906, 'Revell Model Kit - Paint Set', 'revell-model-kit-paint-set-1906', 'src/resources/images/home/producto-prueba.webp', 11.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1907, 'Revell Model Kit - Display Base', 'revell-model-kit-display-base-1907', 'src/resources/images/home/producto-prueba.webp', 8.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 1908, 'Revell Model Kit - Tool Pack', 'revell-model-kit-tool-pack-1908', 'src/resources/images/home/producto-prueba.webp', 13.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Pinturas', 'pinturas', '/accesorios/pinturas', 21, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2101, 'Pinturas Acrílicas - Set Básico', 'pinturas-acrilicas-set-basico-2101', 'src/resources/images/home/producto-prueba.webp', 17.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2102, 'Pintura Base - Rojo Escarlata', 'pintura-base-rojo-escarlata-2102', 'src/resources/images/home/producto-prueba.webp', 3.49, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2103, 'Pintura Base - Azul Real', 'pintura-base-azul-real-2103', 'src/resources/images/home/producto-prueba.webp', 3.49, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2104, 'Pintura Base - Negro Mate', 'pintura-base-negro-mate-2104', 'src/resources/images/home/producto-prueba.webp', 3.49, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2105, 'Pintura Base - Blanco Puro', 'pintura-base-blanco-puro-2105', 'src/resources/images/home/producto-prueba.webp', 3.49, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2106, 'Barniz Satinado', 'barniz-satinado-2106', 'src/resources/images/home/producto-prueba.webp', 4.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2107, 'Imprimación Gris', 'imprimacion-gris-2107', 'src/resources/images/home/producto-prueba.webp', 6.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2108, 'Pincel de Detalle Premium', 'pincel-de-detalle-premium-2108', 'src/resources/images/home/producto-prueba.webp', 7.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Fundas', 'fundas', '/accesorios/fundas', 22, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2201, 'Fundas Protectoras - Pack 100', 'fundas-protectoras-pack-100-2201', 'src/resources/images/home/producto-prueba.webp', 6.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2202, 'Fundas Premium - Transparentes', 'fundas-premium-transparentes-2202', 'src/resources/images/home/producto-prueba.webp', 8.49, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2203, 'Fundas Matte - Negro', 'fundas-matte-negro-2203', 'src/resources/images/home/producto-prueba.webp', 9.49, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2204, 'Fundas Matte - Azul', 'fundas-matte-azul-2204', 'src/resources/images/home/producto-prueba.webp', 9.49, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2205, 'Fundas Mini - Pack 50', 'fundas-mini-pack-50-2205', 'src/resources/images/home/producto-prueba.webp', 3.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2206, 'Fundas Oversize - Pack 50', 'fundas-oversize-pack-50-2206', 'src/resources/images/home/producto-prueba.webp', 4.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2207, 'Fundas Katanas - Pack 100', 'fundas-katanas-pack-100-2207', 'src/resources/images/home/producto-prueba.webp', 7.49, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2208, 'Fundas Deluxe - Pack 100', 'fundas-deluxe-pack-100-2208', 'src/resources/images/home/producto-prueba.webp', 11.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Tapetes', 'tapetes', '/accesorios/tapetes', 23, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2301, 'Tapete de Neopreno - Negro', 'tapete-de-neopreno-negro-2301', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2302, 'Tapete de Juego - Azul', 'tapete-de-juego-azul-2302', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2303, 'Tapete de Juego - Gris', 'tapete-de-juego-gris-2303', 'src/resources/images/home/producto-prueba.webp', 19.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2304, 'Tapete Premium - 60x35', 'tapete-premium-60x35-2304', 'src/resources/images/home/producto-prueba.webp', 24.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2305, 'Tapete Premium - 80x35', 'tapete-premium-80x35-2305', 'src/resources/images/home/producto-prueba.webp', 27.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2306, 'Tapete Antideslizante - Verde', 'tapete-antideslizante-verde-2306', 'src/resources/images/home/producto-prueba.webp', 21.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2307, 'Tapete Enrollable - Marrón', 'tapete-enrollable-marron-2307', 'src/resources/images/home/producto-prueba.webp', 17.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2308, 'Tapete Deluxe - Ilustrado', 'tapete-deluxe-ilustrado-2308', 'src/resources/images/home/producto-prueba.webp', 29.99, 'EUR', 1, 1, NULL, 1, NULL);

INSERT INTO catalog_sections (name, slug, route_path, sort_order, active) VALUES ('Deckbox', 'deckbox', '/accesorios/deckbox', 24, 1);

SET @section_id := LAST_INSERT_ID();

INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2401, 'Deckbox Compacta - Roja', 'deckbox-compacta-roja-2401', 'src/resources/images/home/producto-prueba.webp', 9.99, 'EUR', 4, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2402, 'Deckbox Compacta - Negra', 'deckbox-compacta-negra-2402', 'src/resources/images/home/producto-prueba.webp', 9.99, 'EUR', 3, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2403, 'Deckbox Premium - Azul', 'deckbox-premium-azul-2403', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 8, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2404, 'Deckbox Premium - Verde', 'deckbox-premium-verde-2404', 'src/resources/images/home/producto-prueba.webp', 14.99, 'EUR', 7, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2405, 'Deckbox XL - Doble Mazo', 'deckbox-xl-doble-mazo-2405', 'src/resources/images/home/producto-prueba.webp', 16.99, 'EUR', 2, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2406, 'Deckbox Transparente', 'deckbox-transparente-2406', 'src/resources/images/home/producto-prueba.webp', 11.99, 'EUR', 6, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2407, 'Deckbox Apilable', 'deckbox-apilable-2407', 'src/resources/images/home/producto-prueba.webp', 12.99, 'EUR', 5, 1, NULL, 1, NULL);
INSERT INTO products (section_id, subcategory_id, legacy_id, name, slug, image_path, price, currency, release_order, in_stock, stock, active, source_file) VALUES (@section_id, NULL, 2408, 'Deckbox Deluxe - Imantada', 'deckbox-deluxe-imantada-2408', 'src/resources/images/home/producto-prueba.webp', 18.99, 'EUR', 1, 1, NULL, 1, NULL);


COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
