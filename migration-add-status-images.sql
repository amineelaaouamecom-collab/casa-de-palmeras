-- Migration to add status and images columns to cars table
-- Run this in your Supabase SQL editor

-- Add images column (array of text for multiple image URLs)
ALTER TABLE cars 
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Add status column with check constraint
ALTER TABLE cars 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Disponible' 
CHECK (status IN ('Disponible', 'Loué', 'Réservé', 'Indisponible', 'Maintenance'));

-- Update existing records to have default status
UPDATE cars 
SET status = 'Disponible' 
WHERE status IS NULL;

-- Verify the changes
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'cars';
