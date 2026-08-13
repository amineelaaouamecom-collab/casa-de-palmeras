import { useState, useRef, useEffect } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with value prop when it changes from parent
  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('Image must not exceed 5MB');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Try Supabase upload first
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `car-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from('car-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (!error) {
        setProgress(50);

        const { data: publicUrlData } = supabase.storage
          .from('car-images')
          .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;
        setProgress(100);

        setPreview(publicUrl);
        onChange(publicUrl);

        setTimeout(() => setProgress(0), 500);
        return;
      }

      // Fallback to Base64 if Supabase fails
      console.warn('Supabase upload failed, using Base64 fallback');
    } catch (error) {
      console.warn('Upload error, using Base64 fallback:', error);
    }

    // Base64 fallback - immediate assignment
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target?.result as string;
        setProgress(100);
        setPreview(base64Url);
        onChange(base64Url);
        setUploading(false); // Immediately stop uploading state
        setTimeout(() => setProgress(0), 500);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        setUploading(false);
        setProgress(0);
      };
      // Start reading immediately
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error converting to Base64:', error);
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setPreview(url);
    onChange(url);
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {!showUrlInput ? (
        <>
          {/* Dropzone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-all duration-300
              ${uploading ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50 hover:bg-accent/50'}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />

            {uploading ? (
              <div className="space-y-3">
                <Loader2 className="w-8 h-8 mx-auto animate-spin text-gold" />
                <p className="text-sm text-muted-foreground">
                  Téléchargement... {progress}%
                </p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-gold h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : preview ? (
              <div className="space-y-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mx-auto"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Supprimer l'image
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Glissez-déposez une image ici
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ou cliquez pour sélectionner
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG jusqu'à 5MB
                </p>
              </div>
            )}
          </div>

          {/* Fallback link */}
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="text-xs text-gold hover:text-gold/80 underline"
          >
            Ou utiliser un lien URL direct
          </button>
        </>
      ) : (
        <>
          {/* URL Input */}
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="https://exemple.com/image.jpg"
              value={preview}
              onChange={handleUrlChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={() => setPreview('')}
              />
            )}
          </div>

          {/* Fallback link */}
          <button
            type="button"
            onClick={() => setShowUrlInput(false)}
            className="text-xs text-gold hover:text-gold/80 underline"
          >
            ← Retour au téléchargement de fichier
          </button>
        </>
      )}
    </div>
  );
};
