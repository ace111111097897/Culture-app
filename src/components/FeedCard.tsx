import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface FeedItem {
  id: number;
  content: string;
  author: string;
  type?: string;
}

interface FeedCardProps {
  item: FeedItem;
}

const FeedCard: React.FC<FeedCardProps> = ({ item }) => {
  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Card className="mb-4 shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className={`bg-gradient-to-r ${getGradientClass(item.id)} text-white font-semibold`}>
              {getAuthorInitials(item.author)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">{item.author}</h4>
              {item.type && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  {item.type}
                </Badge>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed">{item.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedCard;