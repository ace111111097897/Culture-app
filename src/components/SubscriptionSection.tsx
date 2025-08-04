import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Check, 
  Star, 
  Zap, 
  Heart, 
  MessageCircle, 
  Eye,
  Infinity,
  Shield,
  Sparkles
} from 'lucide-react';

interface SubscriptionSectionProps {
  currentPlan?: 'free' | 'premium' | 'elite';
}

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ currentPlan = 'free' }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    free: {
      name: 'Free',
      price: '$0',
      period: 'forever',
      color: 'gray',
      features: [
        '8 profile photos',
        '5 profile videos',
        'Basic matching',
        'Limited messages per day',
        'Standard support'
      ]
    },
    premium: {
      name: 'Premium',
      price: selectedPlan === 'monthly' ? '$9.99' : '$79.99',
      period: selectedPlan === 'monthly' ? 'per month' : 'per year',
      color: 'purple',
      popular: true,
      features: [
        'Unlimited photos & videos',
        'Advanced AI matching',
        'Unlimited messages',
        'See who liked you',
        'Priority support',
        'Boost your profile',
        'Advanced filters'
      ]
    },
    elite: {
      name: 'Elite',
      price: selectedPlan === 'monthly' ? '$19.99' : '$159.99',
      period: selectedPlan === 'monthly' ? 'per month' : 'per year',
      color: 'yellow',
      features: [
        'Everything in Premium',
        'VIP profile badge',
        'Exclusive events access',
        'Personal matchmaker',
        'Priority customer success',
        'Early feature access',
        'Custom profile themes'
      ]
    }
  };

  const handleUpgrade = (planType: string) => {
    // In a real app, this would integrate with payment processing
    console.log(`Upgrading to ${planType} plan`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Unlock premium features and find your perfect cultural match faster
        </p>
      </div>

      {/* Plan Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <Button
            onClick={() => setSelectedPlan('monthly')}
            variant={selectedPlan === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-md"
          >
            Monthly
          </Button>
          <Button
            onClick={() => setSelectedPlan('yearly')}
            variant={selectedPlan === 'yearly' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-md relative"
          >
            Yearly
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-xs">
              Save 33%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Current Plan Status */}
      {currentPlan !== 'free' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-800">
              <Check className="h-5 w-5" />
              <span className="font-medium">
                You're currently on the {plans[currentPlan].name} plan
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(plans).map(([key, plan]) => {
          const isCurrentPlan = currentPlan === key;
          const planKey = key as keyof typeof plans;
          
          return (
            <Card 
              key={key}
              className={`relative ${
                plan.popular ? 'border-purple-300 shadow-lg' : ''
              } ${isCurrentPlan ? 'border-green-300 bg-green-50' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {key === 'free' && <Shield className="h-8 w-8 text-gray-500" />}
                  {key === 'premium' && <Star className="h-8 w-8 text-purple-500" />}
                  {key === 'elite' && <Crown className="h-8 w-8 text-yellow-500" />}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-600">
                    /{plan.period}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleUpgrade(key)}
                  disabled={isCurrentPlan}
                  className={`w-full ${
                    key === 'premium' 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : key === 'elite'
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : key === 'free' ? 'Current Plan' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Premium Features Highlight */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Sparkles className="h-6 w-6" />
            Why Upgrade?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Infinity className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Unlimited Everything</h4>
                  <p className="text-sm text-gray-600">No limits on photos, videos, or messages</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">See Who Likes You</h4>
                  <p className="text-sm text-gray-600">Know who's interested before you swipe</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Profile Boost</h4>
                  <p className="text-sm text-gray-600">Get 10x more visibility and matches</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Advanced Matching</h4>
                  <p className="text-sm text-gray-600">AI-powered cultural compatibility</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSection;