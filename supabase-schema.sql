-- Create cars table for Drive in Marrakech fleet management
CREATE TABLE IF NOT EXISTS cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  seats INTEGER NOT NULL,
  luggage INTEGER NOT NULL,
  transmission TEXT NOT NULL CHECK (transmission IN ('Automatique', 'Manuelle')),
  fuel TEXT NOT NULL CHECK (fuel IN ('Essence', 'Diesel', 'Hybride', 'Électrique')),
  price_per_day DECIMAL(10, 2) NOT NULL,
  is_available BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'Disponible' CHECK (status IN ('Disponible', 'Loué', 'Réservé', 'Indisponible', 'Maintenance')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_cars_category ON cars(category);
CREATE INDEX IF NOT EXISTS idx_cars_available ON cars(is_available);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent execution)
DROP POLICY IF EXISTS "Allow public read access" ON cars;
DROP POLICY IF EXISTS "Allow full admin access" ON cars;

-- Create policy to allow public read access (for fleet display)
CREATE POLICY "Allow public read access" ON cars
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow all operations (for admin - you may want to restrict this in production)
CREATE POLICY "Allow full admin access" ON cars
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Insert seed data
INSERT INTO cars (name, category, image_url, seats, luggage, transmission, fuel, price_per_day, is_available) VALUES
  ('Dacia Logan Auto', 'BERLINE', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', 5, 3, 'Automatique', 'Diesel', 350.00, true),
  ('Renault Clio 5', 'ÉCONOMIQUE', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800', 5, 2, 'Manuelle', 'Essence', 250.00, true),
  ('Range Rover Evoque', 'LUXE', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 5, 4, 'Automatique', 'Diesel', 1200.00, true),
  ('Toyota RAV4', 'SUV', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', 5, 3, 'Automatique', 'Hybride', 550.00, true),
  ('Peugeot 3008', 'SUV & 4X4', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', 5, 4, 'Automatique', 'Diesel', 600.00, true),
  ('Mercedes Classe C', 'LUXE', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', 5, 3, 'Automatique', 'Diesel', 950.00, true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger for cars if it exists (for idempotent execution)
DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;

-- Create trigger to automatically update updated_at for cars
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create reservations table for booking management
CREATE TABLE IF NOT EXISTS reservations (
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

-- Create index on reservations for faster queries
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON reservations(start_date, end_date);

-- Enable Row Level Security for reservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent execution)
DROP POLICY IF EXISTS "Allow public insert reservations" ON reservations;
DROP POLICY IF EXISTS "Allow public read reservations" ON reservations;
DROP POLICY IF EXISTS "Allow full admin access reservations" ON reservations;

-- Create policy to allow public insert (for booking form)
CREATE POLICY "Allow public insert reservations" ON reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow public read access (for admin to view)
CREATE POLICY "Allow public read reservations" ON reservations
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow all operations (for admin)
CREATE POLICY "Allow full admin access reservations" ON reservations
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Drop existing trigger for reservations if it exists (for idempotent execution)
DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;

-- Create trigger to automatically update updated_at for reservations
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
