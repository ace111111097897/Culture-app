import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, MessageCircle, Heart, Globe } from 'lucide-react';

const InteractiveCubblesSection: React.FC = () => {
  const [cubbles, setCubbles] = useState([
    { id: 1, name: 'Language Exchange', members: 156, category: 'Education', joined: false, description: 'Practice languages with native speakers' },
    { id: 2, name: 'Cultural Cooking', members: 89, category: 'Food', joined: true, description: 'Share recipes from around the world' },
    { id: 3, name: 'Travel Stories', members: 234, category: 'Travel', joined: false, description: 'Share your travel experiences' },
    { id: 4, name: 'Music Fusion', members: 167, category: 'Music', joined: true, description: 'Discover music from different cultures' }
  ]);
  const [newCubbleName, setNewCubbleName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('General');

  const categories = ['General', 'Education', 'Food', 'Travel', 'Music', 'Art', 'Sports', 'Technology'];

  const joinCubble = (cubbleId: number) => {
    setCubbles(cubbles.map(cubble => 
      cubble.id === cubbleId 
        ? { ...cubble, joined: !cubble.joined, members: cubble.joined ? cubble.members - 1 : cubble.members + 1 }
        : cubble
    ));
  };

  const createCubble = () => {
    if (newCubbleName.trim()) {
      const newCubble = {
        id: cubbles.length + 1,
        name: newCubbleName,
        members: 1,
        category: selectedCategory,
        joined: true,
        description: `A new cubble for ${newCubbleName.toLowerCase()} enthusiasts`
      };
      setCubbles([newCubble, ...cubbles]);
      setNewCubbleName('');
      setShowCreateForm(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Education: 'bg-blue-100 text-blue-800',
      Food: 'bg-orange-100 text-orange-800',
      Travel: 'bg-green-100 text-green-800',
      Music: 'bg-purple-100 text-purple-800',
      Art: 'bg-pink-100 text-pink-800',
      Sports: 'bg-red-100 text-red-800',
      Technology: 'bg-gray-100 text-gray-800',
      General: 'bg-teal-100 text-teal-800'
    };
    return colors[category as keyof typeof colors] || colors.General;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-teal-100 to-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="text-teal-600" />
            Interactive Cubbles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">Join communities and create your own cultural spaces!</p>
          {!showCreateForm ? (
            <Button onClick={() => setShowCreateForm(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Create New Cubble
            </Button>
          ) : (
            <div className="space-y-3">
              <Input
                placeholder="Cubble name..."
                value={newCubbleName}
                onChange={(e) => setNewCubbleName(e.target.value)}
              />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button onClick={createCubble} size="sm">Create</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)} size="sm">Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {cubbles.map(cubble => (
          <Card key={cubble.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{cubble.name}</h3>
                  <p className="text-gray-600 text-sm">{cubble.description}</p>
                </div>
                <Badge className={getCategoryColor(cubble.category)}>
                  {cubble.category}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  {cubble.members} members
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MessageCircle className="w-4 h-4" />
                  Active discussions
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => joinCubble(cubble.id)}
                  variant={cubble.joined ? "outline" : "default"}
                  className={cubble.joined ? "border-teal-500 text-teal-600" : "bg-teal-500 hover:bg-teal-600"}
                >
                  {cubble.joined ? 'Joined' : 'Join Cubble'}
                </Button>
                {cubble.joined && (
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-purple-600" />
            <span className="font-semibold">Your Cubble Activity</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{cubbles.filter(c => c.joined).length}</div>
              <div className="text-sm text-gray-600">Joined Cubbles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{cubbles.filter(c => c.joined).reduce((sum, c) => sum + c.members, 0)}</div>
              <div className="text-sm text-gray-600">Total Connections</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveCubblesSection;