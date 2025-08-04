import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Globe, Calendar, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface EnhancedWelcomeScreenProps {
  onGetStarted: () => void;
  onContinueAsGuest?: () => void;
}

const EnhancedWelcomeScreen: React.FC<EnhancedWelcomeScreenProps> = ({ 
  onGetStarted, 
  onContinueAsGuest 
}) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Image Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/6854fec0a2c2f51f319e38b2_1754180739573_36e603a9.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center text-white">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2 text-white drop-shadow-lg">
              Cubble
            </h1>
            <p className="text-xl text-white/90 drop-shadow">
              Culture • Connection • Community
            </p>
          </div>
          
          {/* Main Tagline */}
          <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
            Connect Through Culture
          </h2>
          
          <p className="text-lg text-white/90 mb-8 leading-relaxed drop-shadow">
            Discover meaningful connections through shared cultural experiences, interests, and values in our vibrant community.
          </p>
          
          {/* Feature Highlights */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Users className="w-5 h-5" />
              <span>Connect with like-minded people</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Globe className="w-5 h-5" />
              <span>Explore diverse cultures</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Calendar className="w-5 h-5" />
              <span>Join cultural events</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <Sparkles className="w-5 h-5" />
              <span>AI-powered matching</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={onGetStarted}
              className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 hover:from-teal-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            {onContinueAsGuest && (
              <Button 
                variant="outline"
                onClick={onContinueAsGuest}
                className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Continue as Guest
              </Button>
            )}
          </div>
          
          <p className="text-xs text-white/70 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWelcomeScreen;