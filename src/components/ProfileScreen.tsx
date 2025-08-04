import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Camera, Edit, MapPin, Calendar, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ProfileScreenProps {
  username: string;
  onBack: () => void;
}

interface ProfilePhoto {
  id: number;
  url: string;
  isPrimary: boolean;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ username, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Cultural enthusiast exploring art, music, and diverse experiences. Love connecting with creative minds! 🎨🎵');
  const [location, setLocation] = useState('San Francisco, CA');
  const [interests, setInterests] = useState(['Art', 'Music', 'Food', 'Photography']);
  
  const [photos, setPhotos] = useState<ProfilePhoto[]>([
    { id: 1, url: '/placeholder.svg', isPrimary: true },
    { id: 2, url: '/placeholder.svg', isPrimary: false },
    { id: 3, url: '/placeholder.svg', isPrimary: false }
  ]);

  const maxPhotos = 5;
  const freePhotos = 5;

  const handleAddPhoto = () => {
    if (photos.length < maxPhotos) {
      const newPhoto: ProfilePhoto = {
        id: Date.now(),
        url: '/placeholder.svg',
        isPrimary: false
      };
      setPhotos([...photos, newPhoto]);
    }
  };

  const handleRemovePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur"
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur mb-6">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={photos.find(p => p.isPrimary)?.url || '/placeholder.svg'} />
                  <AvatarFallback className="bg-white/20 text-white text-2xl">
                    {username[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{username}</h1>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                      placeholder="Your location"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-white/90">{bio}</p>
                    <div className="flex items-center justify-center md:justify-start text-white/70">
                      <MapPin className="w-4 h-4 mr-1" />
                      {location}
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-white/70">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined December 2023
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Photos ({photos.length}/{maxPhotos})</span>
              <Badge className="bg-green-100 text-green-800">
                {freePhotos} Free
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt="Profile photo"
                    className="w-full h-32 object-cover rounded-lg bg-white/20"
                  />
                  {photo.isPrimary && (
                    <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
                      Primary
                    </Badge>
                  )}
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemovePhoto(photo.id)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              
              {isEditing && photos.length < maxPhotos && (
                <Button
                  onClick={handleAddPhoto}
                  className="h-32 border-2 border-dashed border-white/30 bg-white/10 hover:bg-white/20 text-white"
                >
                  <Camera className="w-6 h-6 mb-2" />
                  Add Photo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} className="bg-purple-100 text-purple-800">
                  <Heart className="w-3 h-3 mr-1" />
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-8"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;