import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Sparkles, 
  Shield, 
  Globe, 
  Users, 
  MessageSquare, 
  Calendar,
  Camera,
  Music,
  Gamepad2,
  Crown
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      id: 'culture-ai',
      name: 'Culture AI Assistant',
      description: 'Get personalized cultural insights and recommendations',
      icon: Sparkles,
      enabled: true,
      premium: false
    },
    {
      id: 'smart-matching',
      name: 'Smart Cultural Matching',
      description: 'Connect with people who share your cultural interests',
      icon: Users,
      enabled: true,
      premium: false
    },
    {
      id: 'live-events',
      name: 'Live Cultural Events',
      description: 'Join virtual and local cultural events',
      icon: Calendar,
      enabled: true,
      premium: false
    },
    {
      id: 'culture-bubbles',
      name: 'Culture Bubbles',
      description: 'Share and discover cultural stories',
      icon: MessageSquare,
      enabled: true,
      premium: false
    },
    {
      id: 'global-chat',
      name: 'Global Cultural Chat',
      description: 'Real-time conversations with cultural communities',
      icon: Globe,
      enabled: false,
      premium: true
    },
    {
      id: 'premium-content',
      name: 'Premium Cultural Content',
      description: 'Access exclusive documentaries and cultural materials',
      icon: Crown,
      enabled: false,
      premium: true
    },
    {
      id: 'advanced-privacy',
      name: 'Advanced Privacy Controls',
      description: 'Enhanced security and privacy settings',
      icon: Shield,
      enabled: false,
      premium: true
    },
    {
      id: 'media-sharing',
      name: 'Rich Media Sharing',
      description: 'Share photos, videos, and audio from cultural experiences',
      icon: Camera,
      enabled: true,
      premium: false
    },
    {
      id: 'cultural-games',
      name: 'Cultural Learning Games',
      description: 'Interactive games to learn about different cultures',
      icon: Gamepad2,
      enabled: true,
      premium: false
    },
    {
      id: 'music-discovery',
      name: 'Cultural Music Discovery',
      description: 'Explore music from different cultures worldwide',
      icon: Music,
      enabled: true,
      premium: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Features & Options</h1>
          <p className="text-gray-600">Customize your Culture experience</p>
        </div>
      </div>

      <div className="grid gap-4">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card key={feature.id} className={`${feature.premium ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      feature.premium 
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                        {feature.premium && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {feature.premium && !feature.enabled && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
                      >
                        Upgrade
                      </Button>
                    )}
                    <Switch 
                      checked={feature.enabled} 
                      disabled={feature.premium && !feature.enabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Crown className="h-6 w-6" />
            Unlock All Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-700 mb-4">
            Get access to all premium features and enhance your cultural journey with unlimited possibilities.
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            View Premium Plans
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesSection;