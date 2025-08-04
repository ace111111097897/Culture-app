import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Image, Video, X, Loader2, AlertCircle } from 'lucide-react';
import { uploadFile, UploadResult } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  name: string;
  caption?: string;
  tags: string[];
}

interface EnhancedMediaUploaderProps {
  onUpload?: (item: MediaItem) => void;
  maxPhotos?: number;
  maxVideos?: number;
}

export const EnhancedMediaUploader: React.FC<EnhancedMediaUploaderProps> = ({
  onUpload,
  maxPhotos = 8,
  maxVideos = 5
}) => {
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'photo' | 'video'>('photo');
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    
    const file = files[0];
    const currentItems = uploadType === 'photo' ? photos : videos;
    const maxItems = uploadType === 'photo' ? maxPhotos : maxVideos;
    
    if (currentItems.length >= maxItems) {
      toast({
        title: "Upload limit reached",
        description: `You can only upload ${maxItems} ${uploadType}s maximum.`,
        variant: "destructive"
      });
      return;
    }

    setUploading(file.name);
    
    const result: UploadResult = await uploadFile(file, 'media-uploads', uploadType + 's');
    
    if (result.success && result.url) {
      const newItem: MediaItem = {
        id: Date.now().toString() + Math.random(),
        type: uploadType,
        url: result.url,
        name: file.name,
        caption: caption.trim() || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      
      if (uploadType === 'photo') {
        setPhotos(prev => [...prev, newItem]);
      } else {
        setVideos(prev => [...prev, newItem]);
      }
      
      onUpload?.(newItem);
      setCaption('');
      setTags('');
      
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
  };

  const removeItem = (id: string, type: 'photo' | 'video') => {
    if (type === 'photo') {
      setPhotos(prev => prev.filter(item => item.id !== id));
    } else {
      setVideos(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Media Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={uploadType} onValueChange={(value) => setUploadType(value as 'photo' | 'video')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="photo" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Photos ({photos.length}/{maxPhotos})
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos ({videos.length}/{maxVideos})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="photo" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="relative group">
                  <img src={photo.url} alt={photo.name} className="w-full h-24 object-cover rounded-lg" />
                  <button
                    onClick={() => removeItem(photo.id, 'photo')}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </TabsContent>
        </Tabs>

        <div className="space-y-3">
          <Input
            placeholder="Add a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Input
            placeholder="Add tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept={uploadType === 'photo' ? 'image/*' : 'video/*'}
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="media-upload"
              disabled={uploading !== null}
            />
            <label htmlFor="media-upload" className="flex-1">
              <Button
                asChild
                disabled={uploading !== null}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <span className="cursor-pointer flex items-center justify-center">
                  {uploading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  {uploading ? `Uploading ${uploading}...` : `Upload ${uploadType}`}
                </span>
              </Button>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};