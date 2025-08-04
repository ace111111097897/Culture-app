import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedSubscriptionSectionProps {
  currentTier: 'free' | 'premium' | 'pro' | 'enterprise';
}

const EnhancedSubscriptionSection: React.FC<EnhancedSubscriptionSectionProps> = ({ currentTier }) => {
  const plans = [
    {
      id: 'free',
      name: 'Explorer',
      price: 'Free',
      description: 'Perfect for cultural discovery',
      icon: Sparkles,
      color: 'from-gray-500 to-slate-500',
      features: [
        'Basic cultural matching',
        'Limited daily matches',
        'Community access',
        'Basic profile features'
      ]
    },
    {
      id: 'premium',
      name: 'Cultural Enthusiast',
      price: '$9.99/month',
      description: 'Enhanced cultural connections',
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        'Unlimited cultural matches',
        'Advanced AI recommendations',
        'Priority event access',
        'Enhanced messaging',
        'Cultural compatibility insights'
      ]
    },
    {
      id: 'pro',
      name: 'Cultural Ambassador',
      price: '$19.99/month',
      description: 'For serious cultural explorers',
      icon: Crown,
      color: 'from-yellow-500 to-amber-500',
      features: [
        'Everything in Premium',
        'Global cultural network',
        'Exclusive cultural events',
        'Personal culture concierge',
        'Advanced analytics',
        'Priority customer support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Cultural Institution',
      price: 'Custom',
      description: 'For organizations and institutions',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Bulk user management',
        'Advanced reporting',
        'Dedicated account manager',
        'White-label options'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Cultural Journey</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Unlock deeper cultural connections and experiences with our premium plans designed for every level of cultural exploration.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentTier === plan.id;
          
          return (
            <Card
              key={plan.id}
              className={cn(
                'relative overflow-hidden transition-all duration-300 hover:shadow-xl border-2',
                {
                  'border-purple-300 shadow-lg scale-105': plan.popular,
                  'border-green-300 shadow-lg': isCurrentPlan,
                  'border-gray-200 hover:border-purple-200': !plan.popular && !isCurrentPlan,
                }
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-2 text-sm font-medium">
                    Current Plan
                  </div>
                </div>
              )}

              <CardHeader className={cn('text-center', { 'pt-12': plan.popular || isCurrentPlan })}>
                <div className={cn(
                  'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg',
                  `bg-gradient-to-r ${plan.color}`
                )}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== 'Free' && plan.price !== 'Custom' && (
                    <span className="text-gray-500 text-sm">/month</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    'w-full rounded-xl py-3 font-semibold transition-all duration-300',
                    {
                      [`bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:scale-105`]: !isCurrentPlan,
                      'bg-gray-100 text-gray-500 cursor-not-allowed': isCurrentPlan,
                    }
                  )}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.price === 'Free' ? 'Get Started' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Comparison */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 border border-purple-100">
        <h3 className="text-xl font-bold text-center mb-6">Why Choose Premium?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold">AI-Powered Matching</h4>
            <p className="text-sm text-gray-600">Advanced algorithms find your perfect cultural matches</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold">Exclusive Events</h4>
            <p className="text-sm text-gray-600">Access to premium cultural events and experiences</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold">Priority Support</h4>
            <p className="text-sm text-gray-600">Get help when you need it with priority customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSubscriptionSection;