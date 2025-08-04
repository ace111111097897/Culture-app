import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Video, Upload, X, Plus, Globe, Clock, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StoryContent {
  type: 'image' | 'video';
  file: File;
  url: string;
  thumbnail?: string;
}

interface CubbleStory {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: StoryContent;
  caption: string;
  culturalTags: string[];
  expiresAt: Date;
  timestamp: Date;
}

interface CubbleStoryCreatorProps {
  onStoryCreated: (story: CubbleStory) => void;
  onClose: () => void;
}

export const CubbleStoryCreator: React.FC<CubbleStoryCreatorProps> = ({
  onStoryCreated,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState<StoryContent | null>(null);
  const [caption, setCaption] = useState('');
  const [newTag, setNewTag] = useState('');
  const [culturalTags, setCulturalTags] = useState<string[]>([]);
  const [duration, setDuration] = useState('12'); // hours
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast({
        title: "Invalid file type",
        description: "Please select an image or video file",
        variant: "destructive"
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setContent({
      type: isImage ? 'image' : 'video',
      file,
      url
    });
  };

  const handleUpload = async () => {
    if (!content) {
      toast({
        title: "No content",
        description: "Please select a photo or video first",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create story object
      const story: CubbleStory = {
        id: Date.now().toString(),
        userId: 'current-user',
        username: 'Your Name',
        avatar: '/api/placeholder/40/40',
        content: {
          ...content,
          url: content.url, // In real app, this would be the uploaded URL
          thumbnail: content.type === 'video' ? content.url : undefined
        },
        caption,
        culturalTags,
        expiresAt: new Date(Date.now() + parseInt(duration) * 60 * 60 * 1000),
        timestamp: new Date()
      };

      onStoryCreated(story);
      
      toast({
        title: "Story created!",
        description: `Your ${content.type} story will expire in ${duration} hours`,
      });

      // Reset form
      setContent(null);
      setCaption('');
      setCulturalTags([]);
      setNewTag('');
      setIsOpen(false);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !culturalTags.includes(newTag.trim())) {
      setCulturalTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setCulturalTags(prev => prev.filter(t => t !== tag));
  };

  const handleClose = () => {
    if (content || caption || culturalTags.length > 0) {
      if (confirm('Are you sure you want to discard your story?')) {
        setContent(null);
        setCaption('');
        setCulturalTags([]);
        setNewTag('');
        setIsOpen(false);
        onClose();
      }
    } else {
      setIsOpen(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Create Cubble Story
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Create Your Culture Story
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {content?.type === 'video' ? <Video className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                {content ? `${content.type === 'video' ? 'Video' : 'Photo'} Selected` : 'Upload Content'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!content ? (
                <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700">Upload your story</p>
                      <p className="text-sm text-gray-500">Share photos or videos from your cultural experiences</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-teal-200 hover:bg-teal-50"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Photo
                      </Button>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-teal-200 hover:bg-teal-50"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100">
                    {content.type === 'image' ? (
                      <img 
                        src={content.url} 
                        alt="Story content" 
                        className="w-full max-h-64 object-cover"
                      />
                    ) : (
                      <video 
                        src={content.url} 
                        className="w-full max-h-64 object-cover"
                        controls
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setContent(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Caption Section */}
          <Card>
            <CardHeader>
              <CardTitle>Story Caption</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Share the story behind your photo or video..."
                className="min-h-[100px]"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-2">
                {caption.length}/500 characters
              </p>
            </CardContent>
          </Card>

          {/* Cultural Tags Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Cultural Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add cultural tags..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {culturalTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Duration Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Story Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="12">12 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-2">
                Your story will disappear after {duration} hours
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!content || uploading}
              className="flex-1 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Story...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Create Story
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CubbleStoryCreator; 