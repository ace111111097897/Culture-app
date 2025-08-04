import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Upload, Image, Video, X, Loader2 } from 'lucide-react';

interface MediaUploaderProps {
  onMediaUploaded?: (url: string, type: 'image' | 'video') => void;
  allowedTypes?: ('image' | 'video')[];
  maxSizeMB?: number;
  className?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  onMediaUploaded,
  allowedTypes = ['image', 'video'],
  maxSizeMB = 10,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<Array<{url: string, type: 'image' | 'video', name: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('You must be logged in to upload files');
        return;
      }

      // Validate file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        alert('Please select an image or video file');
        return;
      }

      if (isImage && !allowedTypes.includes('image')) {
        alert('Image uploads not allowed');
        return;
      }

      if (isVideo && !allowedTypes.includes('video')) {
        alert('Video uploads not allowed');
        return;
      }

      // Validate file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const mediaType = isImage ? 'image' : 'video';
      const fileName = `${user.id}/${mediaType}-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media-uploads')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        alert('Error uploading file. Please try again.');
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media-uploads')
        .getPublicUrl(fileName);

      // Add to uploaded media list
      const newMedia = {
        url: publicUrl,
        type: mediaType as 'image' | 'video',
        name: file.name
      };
      
      setUploadedMedia(prev => [...prev, newMedia]);
      
      // Call callback if provided
      if (onMediaUploaded) {
        onMediaUploaded(publicUrl, mediaType as 'image' | 'video');
      }

      alert(`${mediaType} uploaded successfully!`);

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const acceptedTypes = [];
  if (allowedTypes.includes('image')) acceptedTypes.push('image/*');
  if (allowedTypes.includes('video')) acceptedTypes.push('video/*');

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={triggerFileSelect}
              disabled={uploading}
              className="w-full sm:w-auto"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Media
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 mt-2">
              {allowedTypes.includes('image') && allowedTypes.includes('video') 
                ? `Images and videos up to ${maxSizeMB}MB`
                : allowedTypes.includes('image') 
                ? `Images up to ${maxSizeMB}MB`
                : `Videos up to ${maxSizeMB}MB`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {uploadedMedia.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {uploadedMedia.map((media, index) => (
            <div key={index} className="relative group">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {media.type === 'image' ? (
                    <img 
                      src={media.url} 
                      alt={media.name}
                      className="w-full h-24 sm:h-32 object-cover"
                    />
                  ) : (
                    <video 
                      src={media.url}
                      className="w-full h-24 sm:h-32 object-cover"
                      controls
                    />
                  )}
                  
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMedia(index)}
                      className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-2 left-2">
                    {media.type === 'image' ? (
                      <Image className="w-4 h-4 text-white" />
                    ) : (
                      <Video className="w-4 h-4 text-white" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        multiple
        className="hidden"
      />
    </div>
  );
};