-- CASA DE PALMERAS FLEET IMPORT
-- Run this in your Supabase SQL Editor
-- This inserts the 20 fleet cars with correct image mappings and brand field

-- Clear existing cars (optional - remove if you want to keep existing cars)
-- TRUNCATE TABLE cars CASCADE;

-- Add brand column if it doesn't exist
ALTER TABLE cars ADD COLUMN IF NOT EXISTS brand TEXT;

-- Insert Casa de Palmeras fleet with brand field
INSERT INTO cars (name, category, brand, image_url, images, seats, luggage, transmission, fuel, price_per_day, is_available, status) VALUES
-- Range Rover Sport
('Range Rover Sport', 'LUXE', 'range-rover', '/images/cars/imgi_4_content.png', ARRAY['/images/cars/imgi_4_content.png'], 5, 4, 'Automatique', 'Diesel', 1200.00, true, 'Disponible'),
('Range Rover Sport', 'LUXE', 'range-rover', '/images/cars/imgi_5_content.png', ARRAY['/images/cars/imgi_5_content.png'], 5, 4, 'Automatique', 'Diesel', 1200.00, true, 'Disponible'),

-- Range Rover Full Size
('Range Rover Full Size', 'LUXE', 'range-rover', '/images/cars/imgi_6_content.png', ARRAY['/images/cars/imgi_6_content.png'], 5, 4, 'Automatique', 'Diesel', 1500.00, true, 'Disponible'),

-- Range Rover Evoque
('Range Rover Evoque', 'LUXE', 'range-rover', '/images/cars/imgi_7_content.png', ARRAY['/images/cars/imgi_7_content.png'], 5, 3, 'Automatique', 'Diesel', 950.00, true, 'Disponible'),
('Range Rover Evoque', 'LUXE', 'range-rover', '/images/cars/imgi_8_content.png', ARRAY['/images/cars/imgi_8_content.png'], 5, 3, 'Automatique', 'Diesel', 950.00, true, 'Disponible'),
('Range Rover Evoque', 'LUXE', 'range-rover', '/images/cars/imgi_9_content.png', ARRAY['/images/cars/imgi_9_content.png'], 5, 3, 'Automatique', 'Diesel', 950.00, true, 'Disponible'),

-- Range Rover Velar
('Range Rover Velar', 'LUXE', 'range-rover', '/images/cars/imgi_10_content.png', ARRAY['/images/cars/imgi_10_content.png'], 5, 4, 'Automatique', 'Diesel', 1100.00, true, 'Disponible'),

-- Volkswagen Golf 8 R
('Volkswagen Golf 8 R', 'BERLINE', 'volkswagen', '/images/cars/imgi_11_content.png', ARRAY['/images/cars/imgi_11_content.png'], 5, 2, 'Automatique', 'Essence', 700.00, true, 'Disponible'),
('Volkswagen Golf 8 R', 'BERLINE', 'volkswagen', '/images/cars/imgi_13_content.png', ARRAY['/images/cars/imgi_13_content.png'], 5, 2, 'Automatique', 'Essence', 700.00, true, 'Disponible'),

-- Volkswagen Touareg
('Volkswagen Touareg', 'SUV', 'volkswagen', '/images/cars/imgi_17_content.png', ARRAY['/images/cars/imgi_17_content.png'], 5, 4, 'Automatique', 'Diesel', 800.00, true, 'Disponible'),

-- Volkswagen T-Roc
('Volkswagen T-Roc', 'SUV', 'volkswagen', '/images/cars/imgi_18_content.png', ARRAY['/images/cars/imgi_18_content.png'], 5, 3, 'Automatique', 'Essence', 550.00, true, 'Disponible'),

-- Mercedes-Benz CLA
('Mercedes-Benz CLA', 'LUXE', 'mercedes-benz', '/images/cars/imgi_19_content.png', ARRAY['/images/cars/imgi_19_content.png'], 5, 3, 'Automatique', 'Diesel', 900.00, true, 'Disponible'),

-- Mercedes-Benz C-Class
('Mercedes-Benz C-Class', 'LUXE', 'mercedes-benz', '/images/cars/imgi_20_content.png', ARRAY['/images/cars/imgi_20_content.png'], 5, 3, 'Automatique', 'Diesel', 850.00, true, 'Disponible'),
('Mercedes-Benz C-Class', 'LUXE', 'mercedes-benz', '/images/cars/imgi_21_content.png', ARRAY['/images/cars/imgi_21_content.png'], 5, 3, 'Automatique', 'Diesel', 850.00, true, 'Disponible'),

-- Mercedes-Benz A-Class
('Mercedes-Benz A-Class', 'BERLINE', 'mercedes-benz', '/images/cars/imgi_22_content.png', ARRAY['/images/cars/imgi_22_content.png'], 5, 2, 'Automatique', 'Essence', 600.00, true, 'Disponible'),

-- Mercedes-AMG G 63
('Mercedes-AMG G 63', 'LUXE', 'mercedes-benz', '/images/cars/imgi_23_content.png', ARRAY['/images/cars/imgi_23_content.png'], 5, 4, 'Automatique', 'Essence', 2500.00, true, 'Disponible'),

-- Porsche Macan
('Porsche Macan', 'LUXE', 'porsche', '/images/cars/imgi_24_content.png', ARRAY['/images/cars/imgi_24_content.png'], 5, 3, 'Automatique', 'Essence', 1300.00, true, 'Disponible'),
('Porsche Macan', 'LUXE', 'porsche', '/images/cars/imgi_25_content.png', ARRAY['/images/cars/imgi_25_content.png'], 5, 3, 'Automatique', 'Essence', 1300.00, true, 'Disponible'),

-- BMW 5 Series
('BMW 5 Series', 'LUXE', 'bmw', '/images/cars/imgi_26_content.png', ARRAY['/images/cars/imgi_26_content.png'], 5, 3, 'Automatique', 'Diesel', 950.00, true, 'Disponible'),

-- Audi Q8
('Audi Q8', 'LUXE', 'audi', '/images/cars/imgi_27_content.png', ARRAY['/images/cars/imgi_27_content.png'], 5, 4, 'Automatique', 'Diesel', 1100.00, true, 'Disponible');

-- Verify the import
SELECT 'Fleet imported successfully' as status;
SELECT COUNT(*) as total_cars FROM cars;
SELECT name, category, image_url, price_per_day, is_available FROM cars ORDER BY created_at DESC;
