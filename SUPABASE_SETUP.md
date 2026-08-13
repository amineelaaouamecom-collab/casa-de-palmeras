# Supabase Setup Instructions for Casa de Parmiras

## Step 1: Create a New Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose your organization (or create one)
5. Fill in project details:
   - **Name**: casa-de-parmiras
   - **Database Password**: (choose a strong password and save it)
   - **Region**: Choose the region closest to your users
6. Click "Create new project"
7. Wait for the project to be provisioned (2-3 minutes)

## Step 2: Get Your Credentials

Once your project is ready:

1. Go to **Project Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key** (the long JWT token)

## Step 3: Run the Migration Script

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the contents of `supabase-migration.sql` from this project
4. Paste it into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. Verify that all tables and policies were created successfully

## Step 4: Configure Environment Variables

1. Create a `.env` file in the project root (if it doesn't exist)
2. Copy the contents from `.env.example`
3. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 5: Verify Storage Bucket

The migration script creates a storage bucket called `car-images`. To verify:

1. Go to **Storage** (left sidebar)
2. You should see a bucket named `car-images`
3. Make sure it's marked as **Public**

## Step 6: Test the Admin Dashboard

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin` in your browser
3. You should be able to:
   - Add new vehicles
   - Edit existing vehicles
   - Delete vehicles
   - Upload images
   - Toggle availability

## Database Schema

The `cars` table includes the following fields:

- `id` (UUID, primary key)
- `name` (text) - Vehicle name
- `brand` (text) - Brand name (default: "Casa de Parmiras")
- `category` (text) - Vehicle category
- `image_url` (text) - Main image URL
- `images` (text[]) - Array of image URLs
- `year` (integer) - Vehicle year
- `mileage` (text) - Mileage in KM
- `seats` (integer) - Number of seats
- `transmission` (text) - Transmission type
- `fuel` (text) - Fuel type
- `price_status` (text) - "VIN on Request" or "Export Price"
- `export_price` (text) - Export price if applicable
- `sourcing_city` (text) - Sourcing city
- `status_badge` (text) - "In Stock", "Reserved", "In Transit", "Sold"
- `is_available` (boolean) - Availability status
- `created_at` (timestamp) - Creation timestamp
- `updated_at` (timestamp) - Last update timestamp

## Security Notes

- Row Level Security (RLS) is enabled
- Public read access is allowed for the cars table
- Authenticated users can insert, update, and delete
- Storage bucket has public read access
- Authenticated users can upload and delete images

## Troubleshooting

### "Missing Supabase credentials" error
- Ensure your `.env` file exists and contains the correct values
- Restart your development server after adding the `.env` file

### "Permission denied" errors
- Check that the migration script ran successfully
- Verify RLS policies in Supabase Dashboard → Authentication → Policies

### Image upload fails
- Ensure the `car-images` storage bucket exists and is public
- Check storage policies in Supabase Dashboard → Storage → Policies

### Admin page not loading data
- Check browser console for errors
- Verify Supabase URL and anon key are correct
- Check that the `cars` table has data or try adding a vehicle through the admin panel
