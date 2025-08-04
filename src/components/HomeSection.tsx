import React from 'react';
import InteractiveHomeContent from './InteractiveHomeContent';
import PersonalizedFeed from './PersonalizedFeed';
import { Card } from '@/components/ui/card';
import { Sparkles, Users, Heart } from 'lucide-react';

interface HomeSectionProps {
  onSectionChange?: (section: string) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onSectionChange }) => {
  const handleSectionChange = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Welcome to Culture
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with diverse cultures, make meaningful friendships, and explore the world together
        </p>
      </div>

      {/* Interactive Content */}
      <InteractiveHomeContent onSectionChange={handleSectionChange} />

      {/* Featured Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all cursor-pointer" onClick={() => handleSectionChange('cubbles')}>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-900">Cubbles</h3>
          </div>
          <p className="text-purple-700 mb-4">Share your cultural moments with photos and short videos</p>
          <div className="text-sm text-purple-600 font-semibold">Create Your First Cubble →</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:shadow-lg transition-all cursor-pointer" onClick={() => handleSectionChange('matches')}>
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-red-600" />
            <h3 className="text-xl font-bold text-red-900">Smart Matching</h3>
          </div>
          <p className="text-red-700 mb-4">Find people who share your cultural interests and values</p>
          <div className="text-sm text-red-600 font-semibold">Start Matching →</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all cursor-pointer" onClick={() => handleSectionChange('community')}>
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-900">Communities</h3>
          </div>
          <p className="text-blue-700 mb-4">Join cultural communities and participate in discussions</p>
          <div className="text-sm text-blue-600 font-semibold">Explore Communities →</div>
        </Card>
      </div>

      {/* Personalized Feed */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Personalized Feed</h2>
        <PersonalizedFeed />
      </div>
    </div>
  );
};

export default HomeSection;