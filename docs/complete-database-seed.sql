-- Seed de ejemplo para Santa Ana Friki (datos artificiales para desarrollo)
-- Incluye usuarios de prueba, eventos y algunas inscripciones.

-- Usuarios (password: "password" para ambos, dev only)
INSERT INTO users (email, password_hash, role, first_name, last_name, created_at) VALUES
('admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.3R67o8g2b6c0o3e.', 'admin', 'Admin', 'User', NOW()),
('user@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.3R67o8g2b6c0o3e.', 'user', 'Normal', 'User', NOW());

-- Events de ejemplo
INSERT INTO events (name, slug, description, game_type, event_date, event_end_date, location, image_path, max_participants, registration_fee, currency, status, created_at) VALUES
('Torneo One Piece - Junio', 'torneo-one-piece-junio', 'Torneo semanal de One Piece TCG', 'one-piece', '2026-06-20 18:00:00', '2026-06-20 22:00:00', 'Sala A - Tienda Santa Ana', NULL, 32, 5.00, 'EUR', 'open', NOW()),
('Liga Pokemon Mensual', 'liga-pokemon', 'Liga mensual de Pokemon TCG', 'pokemon', '2026-07-05 17:00:00', '2026-07-05 21:00:00', 'Sala B - Tienda Santa Ana', NULL, 40, 3.00, 'EUR', 'open', NOW());

-- Registrar user@example.com en el primer evento
INSERT INTO event_registrations (event_id, user_id, deck_list, status, registered_at) VALUES
((SELECT id FROM events WHERE slug = 'torneo-one-piece-junio' LIMIT 1), (SELECT id FROM users WHERE email = 'user@example.com' LIMIT 1), '{"deck":"Ejemplo"}', 'registered', NOW());

-- Crear carrito de prueba para user@example.com
INSERT INTO carts (user_id, total, currency, created_at) VALUES
((SELECT id FROM users WHERE email = 'user@example.com' LIMIT 1), 0.00, 'EUR', NOW());

-- Nota: No se insertan product items aquí porque el catálogo real ya fue seed-eado desde el frontend.
-- Si necesitáis productos de prueba, puedo generar N inserts que referencien secciones existentes.
