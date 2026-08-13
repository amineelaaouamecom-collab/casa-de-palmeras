import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Missing Supabase credentials. Please check your .env file.');
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Car {
  id: string;
  name: string;
  category: string;
  image_url: string;
  images?: string[];
  seats: number;
  luggage: number;
  transmission: 'Automatique' | 'Manuelle';
  fuel: 'Essence' | 'Diesel' | 'Hybride' | 'Électrique';
  price_per_day: number;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

// Upload image to Supabase Storage
export const uploadImageToStorage = async (
  file: File,
  path: string
): Promise<string | null> => {
  if (!supabase) {
    console.error('Supabase not available, cannot upload to storage');
    return null;
  }
  
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}/${Date.now()}.${fileExt}`;
    
    console.log('Uploading to storage:', fileName);
    const { data, error } = await supabase.storage
      .from('car-images')
      .upload(fileName, file);

    if (error) {
      console.error('Storage upload error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return null;
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('car-images')
      .getPublicUrl(fileName);

    console.log('Public URL:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

// Upload Base64 string to Supabase Storage
export const uploadBase64ToStorage = async (
  base64: string,
  path: string
): Promise<string | null> => {
  if (!supabase) {
    console.warn('Supabase not available, cannot upload to storage');
    return null;
  }
  
  try {
    // Convert Base64 to Blob
    const base64Data = base64.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: 'image/jpeg' });
    const file = new File([blob], `image-${Date.now()}.jpg`, { type: 'image/jpeg' });
    
    const result = await uploadImageToStorage(file, path);
    if (!result) {
      console.warn('Storage upload failed, returning placeholder');
      return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800';
    }
    return result;
  } catch (error) {
    console.error('Error converting Base64 to file:', error);
    return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800';
  }
};
