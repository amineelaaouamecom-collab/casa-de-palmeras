-- Migration Script for Casa de Parmiras Car Management System
-- Run this in your new Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL DEFAULT 'Casa de Parmiras',
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  year INTEGER,
  mileage TEXT,
  seats INTEGER DEFAULT 5,
  transmission TEXT DEFAULT 'Automatic',
  fuel TEXT DEFAULT 'Electric (EV)',
  price_status TEXT DEFAULT 'VIN on Request',
  export_price TEXT,
  sourcing_city TEXT DEFAULT 'Guangzhou',
  status_badge TEXT DEFAULT 'In Stock',
  is_available BOOLEAN DEFAULT true,
  price_per_day INTEGER DEFAULT 0,
  daily_rate INTEGER DEFAULT 0,
  price INTEGER DEFAULT 0,
  luggage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;

-- Create trigger for cars table
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access on cars" ON cars;
DROP POLICY IF EXISTS "Allow authenticated insert on cars" ON cars;
DROP POLICY IF EXISTS "Allow authenticated update on cars" ON cars;
DROP POLICY IF EXISTS "Allow authenticated delete on cars" ON cars;

-- Create policies for cars table
-- Allow public read access
CREATE POLICY "Allow public read access on cars"
  ON cars FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on cars"
  ON cars FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update on cars"
  ON cars FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete on cars"
  ON cars FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for car images
INSERT INTO storage.buckets (id, name, public)
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Allow public read on car-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload on car-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete on car-images" ON storage.objects;

-- Create storage policies for car-images bucket
-- Allow public read access
CREATE POLICY "Allow public read on car-images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'car-images');

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated upload on car-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'car-images');

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete on car-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'car-images');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_cars_category ON cars(category);
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
CREATE INDEX IF NOT EXISTS idx_cars_is_available ON cars(is_available);
CREATE INDEX IF NOT EXISTS idx_cars_created_at ON cars(created_at DESC);

-- Insert sample data (optional - remove if not needed)
-- Uncomment the lines below to add sample data

/*
INSERT INTO cars (name, brand, category, image_url, images, year, mileage, seats, transmission, fuel, price_status, export_price, sourcing_city, status_badge, is_available)
VALUES 
  ('Casa de Parmiras 1', 'Casa de Parmiras', 'citadine', '/images/cars/WhatsApp Image 2026-08-11 at 17.22.03.jpeg', ARRAY['/images/cars/WhatsApp Image 2026-08-11 at 17.22.03.jpeg'], 2026, '0', 5, 'Automatic', 'Electric (EV)', 'VIN on Request', NULL, 'Guangzhou', 'In Stock', true),
  ('Casa de Parmiras 2', 'Casa de Parmiras', 'citadine', '/images/cars/WhatsApp Image 2026-08-11 at 17.22.03 (1).jpeg', ARRAY['/images/cars/WhatsApp Image 2026-08-11 at 17.22.03 (1).jpeg'], 2026, '0', 5, 'Automatic', 'Electric (EV)', 'VIN on Request', NULL, 'Guangzhou', 'In Stock', true);
*/

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE cars TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
