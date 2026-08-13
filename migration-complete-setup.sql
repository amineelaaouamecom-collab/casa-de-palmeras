-- COMPLETE SUPABASE MIGRATION FOR CASA DE PALMERAS
-- Run this in your Supabase SQL Editor
-- This will recreate the entire database with the correct schema

-- Drop existing tables and policies
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS cars CASCADE;

-- Create cars table for Casa de Palmeras fleet management
CREATE TABLE cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  seats INTEGER NOT NULL DEFAULT 5,
  luggage INTEGER NOT NULL DEFAULT 3,
  transmission TEXT NOT NULL DEFAULT 'Automatique' CHECK (transmission IN ('Automatique', 'Manuelle')),
  fuel TEXT NOT NULL DEFAULT 'Diesel' CHECK (fuel IN ('Essence', 'Diesel', 'Hybride', 'Électrique')),
  price_per_day DECIMAL(10, 2) NOT NULL DEFAULT 350,
  is_available BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'Disponible' CHECK (status IN ('Disponible', 'Loué', 'Réservé', 'Indisponible', 'Maintenance')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_cars_category ON cars(category);
CREATE INDEX idx_cars_available ON cars(is_available);
CREATE INDEX idx_cars_status ON cars(status);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON cars
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow public insert (for admin)
CREATE POLICY "Allow public insert" ON cars
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow public update (for admin)
CREATE POLICY "Allow public update" ON cars
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create policy to allow public delete (for admin)
CREATE POLICY "Allow public delete" ON cars
  FOR DELETE
  TO public
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for cars
DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create reservations table
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  car_name TEXT NOT NULL,
  car_category TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  flight_number TEXT,
  notes TEXT,
  status TEXT DEFAULT 'En attente' CHECK (status IN ('En attente', 'Confirmé', 'Annulé')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for reservations
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_dates ON reservations(start_date, end_date);

-- Enable RLS for reservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for reservations
CREATE POLICY "Allow public read reservations" ON reservations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert reservations" ON reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update reservations" ON reservations
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete reservations" ON reservations
  FOR DELETE
  TO public
  USING (true);

-- Create trigger for reservations
DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert seed data for cars
INSERT INTO cars (name, category, image_url, images, seats, luggage, transmission, fuel, price_per_day, is_available, status) VALUES
  ('Dacia Logan Auto', 'BERLINE', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', ARRAY['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'], 5, 3, 'Automatique', 'Diesel', 350.00, true, 'Disponible'),
  ('Renault Clio 5', 'ÉCONOMIQUE', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800', ARRAY['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800'], 5, 2, 'Manuelle', 'Essence', 250.00, true, 'Disponible'),
  ('Range Rover Evoque', 'LUXE', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', ARRAY['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'], 5, 4, 'Automatique', 'Diesel', 1200.00, true, 'Disponible'),
  ('Toyota RAV4', 'SUV', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'], 5, 3, 'Automatique', 'Hybride', 550.00, true, 'Disponible'),
  ('Peugeot 3008', 'SUV & 4X4', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', ARRAY['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'], 5, 4, 'Automatique', 'Diesel', 600.00, true, 'Disponible'),
  ('Mercedes Classe C', 'LUXE', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'], 5, 3, 'Automatique', 'Diesel', 950.00, true, 'Disponible');

-- Verify the setup
SELECT 'Cars table created successfully' as status;
SELECT COUNT(*) as car_count FROM cars;
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'cars' ORDER BY ordinal_position;
