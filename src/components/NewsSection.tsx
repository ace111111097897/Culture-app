import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Globe } from 'lucide-react';

const NewsSection: React.FC = () => {
  const newsItems = [
    {
      id: '1',
      title: 'Global Cultural Festival Returns This Summer',
      summary: 'Experience diverse cultures from around the world in one amazing event.',
      category: 'Events',
      time: '2 hours ago',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'New Art Exhibition Opens Downtown',
      summary: 'Local artists showcase contemporary works inspired by cultural heritage.',
      category: 'Arts',
      time: '5 hours ago',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'Food Truck Festival Celebrates International Cuisine',
      summary: 'Taste authentic dishes from 20+ countries this weekend.',
      category: 'Food',
      time: '1 day ago',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6 text-purple-600" />
          Cultural News Feed
        </h2>
      </div>
      
      <div className="grid gap-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;