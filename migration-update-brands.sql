-- UPDATE EXISTING CARS WITH BRAND VALUES
-- Run this in your Supabase SQL Editor to add brand field to existing cars

-- Add brand column if it doesn't exist
ALTER TABLE cars ADD COLUMN IF NOT EXISTS brand TEXT;

-- Update Range Rover / Land Rover cars
UPDATE cars SET brand = 'range-rover' 
WHERE name ILIKE '%Range Rover%' OR name ILIKE '%Land Rover%';

-- Update Volkswagen cars
UPDATE cars SET brand = 'volkswagen' 
WHERE name ILIKE '%Volkswagen%';

-- Update Mercedes-Benz cars (including Mercedes-AMG)
UPDATE cars SET brand = 'mercedes-benz' 
WHERE name ILIKE '%Mercedes%' OR name ILIKE '%Mercedes-Benz%' OR name ILIKE '%Mercedes-AMG%';

-- Update Porsche cars
UPDATE cars SET brand = 'porsche' 
WHERE name ILIKE '%Porsche%';

-- Update BMW cars
UPDATE cars SET brand = 'bmw' 
WHERE name ILIKE '%BMW%';

-- Update Audi cars
UPDATE cars SET brand = 'audi' 
WHERE name ILIKE '%Audi%';

-- Verify the updates
SELECT 'Brand updates completed' as status;
SELECT name, brand, image_url FROM cars ORDER BY created_at DESC;
