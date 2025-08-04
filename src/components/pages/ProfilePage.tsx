import React, { useState, useEffect } from 'react';
import { Camera, Edit, MapPin, Calendar, Heart, Star, Trophy, Settings, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { EditProfileTab } from '../EditProfileTab';
import ProfileDataManager from '../ProfileDataManager';
interface ProfilePageProps {
  userProfile?: any;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile: propUserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      // Use ProfileDataManager to load profile data
      const profileData = await ProfileDataManager.loadProfile();
      
      if (profileData) {
        setProfileData(profileData);
      } else if (propUserProfile) {
        setProfileData(propUserProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      if (propUserProfile) {
        setProfileData(propUserProfile);
      }
    } finally {
      setLoading(false);
    }
  };

  const achievements = [
    { id: 1, name: 'Cultural Explorer', description: 'Visited 10+ cultural events', icon: '🌍', earned: true },
    { id: 2, name: 'Master Chef', description: 'Shared 25+ cultural recipes', icon: '👨‍🍳', earned: true },
    { id: 3, name: 'Language Lover', description: 'Speaks 3+ languages', icon: '🗣️', earned: true },
    { id: 4, name: 'Community Builder', description: 'Made 50+ connections', icon: '🤝', earned: true },
    { id: 5, name: 'Story Teller', description: 'Shared 100+ cubbles', icon: '📖', earned: true },
    { id: 6, name: 'Event Organizer', description: 'Organized 5+ events', icon: '🎉', earned: false }
  ];

  const recentCubbles = [
    { id: 1, content: 'Just made the most amazing Korean BBQ for my friends! 🥩', likes: 23, comments: 8, time: '2 hours ago' },
    { id: 2, content: 'Learning Spanish guitar - any tips from my Spanish friends? 🎸', likes: 15, comments: 12, time: '1 day ago' },
    { id: 3, content: 'Visited the Japanese Tea Garden today. So peaceful! 🍵', likes: 31, comments: 6, time: '3 days ago' }
  ];

  if (loading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  // Use actual profile data or fallback
  const displayProfile = profileData || propUserProfile || {
    name: 'User',
    age: 25,
    location: 'Location',
    bio: 'No bio yet',
    interests: [],
    avatar_url: '/placeholder.svg'
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => setIsEditing(false)} 
          className="mb-4"
          variant="outline"
        >
          ← Back to Profile
        </Button>
        <EditProfileTab />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <Card className="border-teal-100">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 ring-4 ring-teal-200 mb-4">
              <AvatarImage src={displayProfile.avatar_url} />
              <AvatarFallback className="bg-gradient-to-r from-teal-500 to-purple-500 text-white text-2xl">
                {displayProfile.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-2xl font-bold text-black mb-2">
              {displayProfile.name}{displayProfile.age ? `, ${displayProfile.age}` : ''}
            </h1>
            
            {displayProfile.location && (
              <div className="flex items-center gap-1 text-gray-600 mb-4">
                <MapPin className="h-4 w-4 text-teal-500" />
                <span className="text-sm">{displayProfile.location}</span>
              </div>
            )}

            <Button
              onClick={() => setIsEditing(true)}
              className="mb-4 bg-gradient-to-r from-teal-500 to-purple-500"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>

            {displayProfile.bio && (
              <p className="text-gray-700 mb-4 max-w-md">{displayProfile.bio}</p>
            )}

            {displayProfile.interests && displayProfile.interests.length > 0 && (
              <div className="w-full max-w-md">
                <h3 className="font-semibold text-black mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {displayProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-700">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;