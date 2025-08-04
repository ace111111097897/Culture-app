import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Tag, 
  FolderOpen, 
  Search, 
  Sparkles,
  Image,
  Video,
  Hash
} from 'lucide-react';

export const EnhancedAIContentManager: React.FC = () => {
  const [uploadedMedia, setUploadedMedia] = useState([
    {
      id: 1,
      type: 'video',
      title: 'Traditional Dance Performance',
      tags: ['cultural-dance', 'traditional', 'performance', 'asian-culture'],
      autoTags: ['movement', 'music', 'costume'],
      album: 'Cultural Events',
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'photo',
      title: 'Festival Celebration',
      tags: ['festival', 'celebration', 'community'],
      autoTags: ['colorful', 'crowd', 'decorations'],
      album: 'Festivals',
      date: '2024-01-14'
    }
  ]);

  const suggestedTags = [
    '#CulturalHeritage', '#TraditionalArt', '#FestivalVibes', 
    '#CommunitySpirit', '#CulturalExchange', '#ArtisticExpression'
  ];

  const autoAlbums = [
    { name: 'Cultural Events', count: 12, theme: 'Events and celebrations' },
    { name: 'Traditional Arts', count: 8, theme: 'Art and crafts' },
    { name: 'Food Culture', count: 15, theme: 'Culinary experiences' },
    { name: 'Travel Memories', count: 6, theme: 'Cultural travel' }
  ];

  return (
    <div className="space-y-6">
      {/* AI Content Analysis */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-700 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Content Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">Auto-Generated Tags</h4>
              <p className="text-sm text-gray-600 mb-3">
                AI automatically analyzes your content and suggests relevant tags
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-purple-600 border-purple-300">
                    <Hash className="w-3 h-3 mr-1" />
                    {tag.replace('#', '')}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-teal-600 mb-2">Smart Organization</h4>
              <p className="text-sm text-gray-600 mb-3">
                Content is automatically grouped by themes and cultural context
              </p>
              <Button variant="outline" className="text-teal-600 border-teal-300">
                <FolderOpen className="w-4 h-4 mr-2" />
                View Auto Albums
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Library with AI Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-teal-700 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Smart Media Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedMedia.map((media) => (
              <div key={media.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {media.type === 'video' ? (
                    <Video className="w-8 h-8 text-blue-500" />
                  ) : (
                    <Image className="w-8 h-8 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{media.title}</h4>
                  <p className="text-sm text-gray-600">Album: {media.album}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {media.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {media.autoTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-purple-600">
                        AI: {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {media.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Auto-Generated Albums */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            AI-Generated Albums
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {autoAlbums.map((album, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-700">{album.name}</h4>
                  <Badge variant="secondary">{album.count} items</Badge>
                </div>
                <p className="text-sm text-blue-600">{album.theme}</p>
                <Button variant="outline" size="sm" className="mt-2 text-blue-600 border-blue-300">
                  View Album
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};