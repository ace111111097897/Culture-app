import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CubbleBrandLogo from './CubbleBrandLogo';
import { Globe, Users, Heart, Sparkles } from 'lucide-react';

interface OnboardingWelcomeScreenProps {
  onContinue: () => void;
  onSkip: () => void;
}

const OnboardingWelcomeScreen: React.FC<OnboardingWelcomeScreenProps> = ({ onContinue, onSkip }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <CubbleBrandLogo size="lg" showTagline={true} />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Cubble!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Let's set up your cultural journey in just a few steps. This will help us personalize your experience and connect you with the right communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-teal-50 rounded-xl">
                <Globe className="w-8 h-8 text-teal-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-teal-800">Cultural Discovery</h3>
                  <p className="text-sm text-teal-600">Explore diverse cultures and traditions</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-blue-800">Community Connection</h3>
                  <p className="text-sm text-blue-600">Join like-minded cultural enthusiasts</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                <Heart className="w-8 h-8 text-purple-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-purple-800">Meaningful Matches</h3>
                  <p className="text-sm text-purple-600">Connect based on shared interests</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl">
                <Sparkles className="w-8 h-8 text-emerald-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-emerald-800">Personalized Experience</h3>
                  <p className="text-sm text-emerald-600">Tailored content just for you</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onContinue}
                className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Set Up Preferences
              </Button>
              
              <Button 
                onClick={onSkip}
                variant="outline"
                className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Skip for Now
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Setup takes 2-3 minutes • You can always change preferences later
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingWelcomeScreen;