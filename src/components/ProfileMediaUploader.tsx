import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video, X, Move, Loader2 } from 'lucide-react';
import { uploadFile, UploadResult } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  name: string;
}

export const ProfileMediaUploader: React.FC = () => {
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList | null, type: 'photo' | 'video') => {
    if (!files) return;
    
    for (const file of Array.from(files)) {
      if (type === 'photo' && photos.length >= 8) {
        toast({
          title: "Upload limit reached",
          description: "You can only upload 8 photos maximum.",
          variant: "destructive"
        });
        break;
      }
      
      if (type === 'video' && videos.length >= 5) {
        toast({
          title: "Upload limit reached", 
          description: "You can only upload 5 videos maximum.",
          variant: "destructive"
        });
        break;
      }

      setUploading(file.name);
      
      const result: UploadResult = await uploadFile(file, 'media-uploads', type + 's');
      
      if (result.success && result.url) {
        const newItem: MediaItem = {
          id: Date.now().toString() + Math.random(),
          type,
          url: result.url,
          name: file.name
        };
        
        if (type === 'photo') {
          setPhotos(prev => [...prev, newItem]);
        } else {
          setVideos(prev => [...prev, newItem]);
        }
        
        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded successfully.`
        });
      } else {
        toast({
          title: "Upload failed",
          description: result.error || "Failed to upload file.",
          variant: "destructive"
        });
      }
      
      setUploading(null);
    }
  };

  const removeItem = (id: string, type: 'photo' | 'video') => {
    if (type === 'photo') {
      setPhotos(prev => prev.filter(item => item.id !== id));
    } else {
      setVideos(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Photo Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-teal-700 flex items-center gap-2">
            <Image className="w-5 h-5" />
            Photos ({photos.length}/8 Free)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {photos.map(photo => (
              <div key={photo.id} className="relative group">
                <img src={photo.url} alt={photo.name} className="w-full h-24 object-cover rounded-lg" />
                <button
                  onClick={() => removeItem(photo.id, 'photo')}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                <Move className="absolute bottom-1 right-1 text-white opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4" />
              </div>
            ))}
          </div>
          {photos.length < 8 && (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-teal-300 border-dashed rounded-lg cursor-pointer bg-teal-50 hover:bg-teal-100">
              <Upload className="w-8 h-8 text-teal-500 mb-2" />
              <p className="text-teal-600">Drag & drop photos or click to upload</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, 'photo')}
              />
            </label>
          )}
        </CardContent>
      </Card>

      {/* Video Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center gap-2">
            <Video className="w-5 h-5" />
            Videos ({videos.length}/5 Free)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {videos.map(video => (
              <div key={video.id} className="relative group">
                <video src={video.url} className="w-full h-32 object-cover rounded-lg" controls />
                <button
                  onClick={() => removeItem(video.id, 'video')}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          {videos.length < 5 && (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100">
              <Upload className="w-8 h-8 text-blue-500 mb-2" />
              <p className="text-blue-600">Drag & drop videos or click to upload</p>
              <input
                type="file"
                multiple
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, 'video')}
              />
            </label>
          )}
        </CardContent>
      </Card>
    </div>
  );
};