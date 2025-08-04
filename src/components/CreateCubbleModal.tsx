import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Upload, X, Video, Image as ImageIcon, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/storage';

interface CreateCubbleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cubbleData: any) => void;
}

interface FilePreview {
  file: File;
  type: 'image' | 'video';
  preview: string;
  name: string;
}

const CreateCubbleModal: React.FC<CreateCubbleModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [category, setCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);

  const categories = ['General', 'Food', 'Travel', 'Culture', 'Art', 'Music', 'Events', 'Lifestyle'];
  const maxPhotos = 10;
  const maxVideoDuration = 10; // seconds
  const maxVideoSize = 50 * 1024 * 1024; // 50MB
  const cubbleDuration = 48; // hours
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      if (file.type.startsWith('image/')) {
        return selectedFiles.filter(f => f.type.startsWith('image/')).length < maxPhotos;
      }
      if (file.type.startsWith('video/')) {
        return selectedFiles.filter(f => f.type.startsWith('video/')).length === 0;
      }
      return false;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles].slice(0, maxPhotos + 1));
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      if (file.type.startsWith('image/') && photoCount < maxPhotos) {
        setUploading(true);
        try {
          const result = await uploadFile(file, 'media-uploads', 'photos');
          if (result.success && result.url) {
            setSelectedFiles(prev => [...prev, {
              file,
              type: 'image',
              preview: result.url,
              name: file.name
            }]);
            setPhotoCount(prev => prev + 1);
          } else {
            console.error('Upload failed:', result.error);
          }
        } catch (error) {
          console.error('Upload error:', error);
        } finally {
          setUploading(false);
        }
      } else if (file.type.startsWith('video/') && videoCount < 1) {
        if (file.size > maxVideoSize) {
          alert(`Video file is too large. Maximum size is ${maxVideoSize / (1024 * 1024)}MB`);
          continue;
        }
        
        setUploading(true);
        try {
          const result = await uploadFile(file, 'media-uploads', 'videos');
          if (result.success && result.url) {
            setSelectedFiles(prev => [...prev, {
              file,
              type: 'video',
              preview: result.url,
              name: file.name
            }]);
            setVideoCount(prev => prev + 1);
          } else {
            console.error('Upload failed:', result.error);
          }
        } catch (error) {
          console.error('Upload error:', error);
        } finally {
          setUploading(false);
        }
      }
    }
  };
              <span className="text-white font-bold text-sm">C</span>
            </div>
            Create a Cubble
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Duration Notice */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">48-Hour Duration</p>
                <p className="text-sm text-blue-700">Your cubble will automatically disappear after 48 hours</p>
              </div>
            </div>
          </Card>

          {/* Content Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">What's happening?</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your cultural moment..."
              className="min-h-[100px] resize-none"
              maxLength={280}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{content.length}/280 characters</span>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className={`cursor-pointer ${
                    category === cat 
                      ? 'bg-purple-600 text-white' 
                      : 'hover:bg-purple-100'
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Media</label>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  {photoCount}/{maxPhotos} photos
                </span>
                <span className="flex items-center gap-1">
                  <Video className="h-3 w-3" />
                  {videoCount}/1 video (max 10s)
                </span>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                disabled={photoCount >= maxPhotos && videoCount >= 1}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload photos and videos</p>
                <p className="text-xs text-gray-400 mt-1">
                  Up to {maxPhotos} photos or 1 video (max {maxVideoDuration}s)
                </p>
              </label>
            </div>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Video className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Warning for video duration */}
          {videoCount > 0 && (
            <Card className="p-3 bg-yellow-50 border-yellow-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Please ensure your video is under {maxVideoDuration} seconds
                </p>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Cubble'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCubbleModal;