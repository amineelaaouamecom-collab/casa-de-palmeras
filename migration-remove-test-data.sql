-- REMOVE TEST DATA FROM PRODUCTION
-- Run this in your Supabase SQL Editor

-- Remove test vehicles (vehicles with test names or patterns)
DELETE FROM cars 
WHERE name ILIKE '%test%' 
   OR name ILIKE '%test%'
   OR name = 'test'
   OR name = 'Test'
   OR name = 'TEST';

-- Alternatively, if you prefer to deactivate instead of delete:
-- UPDATE cars 
-- SET is_available = false, status = 'Indisponible'
-- WHERE name ILIKE '%test%' 
--    OR name = 'Test'
--    OR name = 'TEST';

-- Verify cleanup
SELECT 'Test data removed successfully' as status;
SELECT COUNT(*) as remaining_cars FROM cars;
SELECT name, category, price_per_day, is_available FROM cars ORDER BY created_at DESC;
