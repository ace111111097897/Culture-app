import React, { useState } from 'react';
import { Upload, Play, Trash2, Tag, Edit, Camera, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  caption?: string;
  tags: string[];
  uploadDate: string;
}

interface MultimediaGalleryProps {
  photos: MediaItem[];
  videos: MediaItem[];
  monthlyLimits: {
    photos: { used: number; total: number };
    videos: { used: number; total: number };
  };
  onUpload: (file: File, type: 'photo' | 'video', tags: string[], caption: string) => void;
  onDelete: (id: string, type: 'photo' | 'video') => void;
  onUpdate: (id: string, type: 'photo' | 'video', updates: Partial<MediaItem>) => void;
}

const MultimediaGallery: React.FC<MultimediaGalleryProps> = ({
  photos,
  videos,
  monthlyLimits,
  onUpload,
  onDelete,
  onUpdate
}) => {
  const [uploadType, setUploadType] = useState<'photo' | 'video'>('photo');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const tags = uploadTags.split(',').map(tag => tag.trim()).filter(Boolean);
      onUpload(file, uploadType, tags, uploadCaption);
      setUploadTags('');
      setUploadCaption('');
    }
  };

  const canUpload = (type: 'photo' | 'video') => {
    const limit = monthlyLimits[type === 'photo' ? 'photos' : 'videos'];
    return limit.used < limit.total;
  };

  const MediaGrid = ({ items, type }: { items: MediaItem[]; type: 'photo' | 'video' }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-square bg-gray-100">
            {type === 'photo' ? (
              <img
                src={item.url}
                alt={item.caption || 'Photo'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <Play className="h-12 w-12 text-gray-400" />
                <video
                  src={item.url}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                />
              </div>
            )}
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                onClick={() => setEditingItem(item)}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0 bg-red-500/80 hover:bg-red-500"
                onClick={() => onDelete(item.id, type)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <CardContent className="p-3">
            {item.caption && (
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">{item.caption}</p>
            )}
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(item.uploadDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            📸 Upload Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Monthly Limits Display */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Camera className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-blue-700">Photos</span>
              </div>
              <div className="text-sm text-blue-600">
                {monthlyLimits.photos.used}/{monthlyLimits.photos.total} used this month
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${(monthlyLimits.photos.used / monthlyLimits.photos.total) * 100}%` }}
                />
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Video className="h-4 w-4 text-purple-500" />
                <span className="font-medium text-purple-700">Videos</span>
              </div>
              <div className="text-sm text-purple-600">
                {monthlyLimits.videos.used}/{monthlyLimits.videos.total} used this month
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${(monthlyLimits.videos.used / monthlyLimits.videos.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <div className="space-y-4">
            <Tabs value={uploadType} onValueChange={(value) => setUploadType(value as 'photo' | 'video')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photo">📷 Photo</TabsTrigger>
                <TabsTrigger value="video">🎥 Video</TabsTrigger>
              </TabsList>
            </Tabs>

            <Input
              placeholder="Add a caption..."
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
            />
            
            <Input
              placeholder="Add tags (comma separated)"
              value={uploadTags}
              onChange={(e) => setUploadTags(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <input
                type="file"
                accept={uploadType === 'photo' ? 'image/*' : 'video/*'}
                onChange={handleFileUpload}
                className="hidden"
                id="media-upload"
                disabled={!canUpload(uploadType)}
              />
              <label htmlFor="media-upload">
                <Button
                  asChild
                  disabled={!canUpload(uploadType)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <span className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {uploadType === 'photo' ? 'Photo' : 'Video'}
                  </span>
                </Button>
              </label>
              {!canUpload(uploadType) && (
                <span className="text-sm text-red-500">
                  Monthly limit reached
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Gallery */}
      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="photos">📷 Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value="videos">🎥 Videos ({videos.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="photos" className="mt-4">
          {photos.length > 0 ? (
            <MediaGrid items={photos} type="photo" />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No photos uploaded yet</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="videos" className="mt-4">
          {videos.length > 0 ? (
            <MediaGrid items={videos} type="video" />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No videos uploaded yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editingItem.type === 'photo' ? 'Photo' : 'Video'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Caption"
                value={editingItem.caption || ''}
                onChange={(e) => setEditingItem({...editingItem, caption: e.target.value})}
              />
              <Input
                placeholder="Tags (comma separated)"
                value={editingItem.tags.join(', ')}
                onChange={(e) => setEditingItem({
                  ...editingItem, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    onUpdate(editingItem.id, editingItem.type, {
                      caption: editingItem.caption,
                      tags: editingItem.tags
                    });
                    setEditingItem(null);
                  }}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MultimediaGallery;