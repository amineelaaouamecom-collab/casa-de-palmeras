-- SUPABASE STORAGE BUCKET SETUP FOR CAR IMAGES
-- Run this in your Supabase SQL Editor

-- Insert storage bucket for car images
-- Note: This creates the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  public = EXCLUDED.public;

-- Create policy to allow public read access to car-images bucket
CREATE POLICY "Allow public read access to car-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'car-images');

-- Create policy to allow public upload to car-images bucket
CREATE POLICY "Allow public upload to car-images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'car-images');

-- Create policy to allow public update to car-images bucket
CREATE POLICY "Allow public update to car-images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'car-images')
WITH CHECK (bucket_id = 'car-images');

-- Create policy to allow public delete to car-images bucket
CREATE POLICY "Allow public delete to car-images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'car-images');

-- Verify the bucket was created
SELECT id, name, public FROM storage.buckets WHERE id = 'car-images';
