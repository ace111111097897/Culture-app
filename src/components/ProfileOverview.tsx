import React, { useState } from 'react';
import { Camera, Edit3, MapPin, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileOverviewProps {
  user: {
    name: string;
    avatar?: string;
    bio?: string;
    location?: string;
    interests: string[];
    projectLinks?: string[];
  };
  onUpdateProfile: (updates: any) => void;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location || '');
  const [newInterest, setNewInterest] = useState('');
  const [interests, setInterests] = useState(user.interests || []);
  const [newLink, setNewLink] = useState('');
  const [projectLinks, setProjectLinks] = useState(user.projectLinks || []);

  const handleSave = () => {
    onUpdateProfile({
      bio,
      location,
      interests,
      projectLinks
    });
    setIsEditing(false);
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const addProjectLink = () => {
    if (newLink.trim() && !projectLinks.includes(newLink.trim())) {
      setProjectLinks([...projectLinks, newLink.trim()]);
      setNewLink('');
    }
  };

  const removeProjectLink = (link: string) => {
    setProjectLinks(projectLinks.filter(l => l !== link));
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-purple-200">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute bottom-0 right-0 rounded-full h-10 w-10 bg-purple-500 hover:bg-purple-600"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-2xl font-bold mt-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {user.name}
          </h2>
        </div>

        {/* Bio Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">📝 Bio</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your cultural interests, hobbies, and background..."
                maxLength={300}
                className="resize-none"
              />
              <div className="text-sm text-gray-500 text-right">
                {bio.length}/300 characters
              </div>
            </div>
          ) : (
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {bio || "Add a bio to share your cultural interests and background..."}
            </p>
          )}
        </div>

        {/* Location Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <MapPin className="h-5 w-5" /> Location
          </h3>
          {isEditing ? (
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
            />
          ) : (
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {location || "Add your location to connect with local events..."}
            </p>
          )}
        </div>

        {/* Interests & Tags */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🎨 Cultural Interests</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {interests.map((interest, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
                onClick={() => isEditing && removeInterest(interest)}
              >
                {interest}
                {isEditing && <span className="ml-1 text-red-500">×</span>}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add cultural interest"
                onKeyPress={(e) => e.key === 'Enter' && addInterest()}
              />
              <Button onClick={addInterest} size="sm">
                Add
              </Button>
            </div>
          )}
        </div>

        {/* Project Links */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Link className="h-5 w-5" /> Cultural Projects
          </h3>
          <div className="space-y-2 mb-3">
            {projectLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Link className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-700 flex-1">{link}</span>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProjectLink(link)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Add project link"
                onKeyPress={(e) => e.key === 'Enter' && addProjectLink()}
              />
              <Button onClick={addProjectLink} size="sm">
                Add
              </Button>
            </div>
          )}
        </div>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600">
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;