import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { Camera, Upload, Loader2 } from 'lucide-react';

interface ProfileImageUploaderProps {
  currentImageUrl?: string;
  userName: string;
  onImageUpdate: (imageUrl: string) => void;
}

export const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  currentImageUrl,
  userName,
  onImageUpdate
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    await uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('You must be logged in to upload images');
        return;
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media-uploads')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        alert('Error uploading image. Please try again.');
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media-uploads')
        .getPublicUrl(fileName);

      // Update profile with new image URL
      // Update profile with new image URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        alert('Error updating profile. Please try again.');
        return;
      }

      onImageUpdate(publicUrl);
      setPreviewUrl(null);
      alert('Profile picture updated successfully!');

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const displayImageUrl = previewUrl || currentImageUrl || '/placeholder.svg';

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative">
        <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
          <AvatarImage src={displayImageUrl} alt={userName} />
          <AvatarFallback className="text-lg">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="text-center sm:text-left">
        <Button 
          variant="outline" 
          onClick={triggerFileSelect}
          disabled={uploading}
          className="mb-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              Change Photo
            </>
          )}
        </Button>
        
        <p className="text-xs sm:text-sm text-gray-500">
          JPG, PNG or GIF. Max size 5MB.
        </p>
        
        {previewUrl && (
          <p className="text-xs text-green-600 mt-1">
            New image ready to save
          </p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};