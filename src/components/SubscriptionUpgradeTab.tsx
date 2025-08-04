import React, { useState } from 'react';
import { Crown, Star, Zap, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface SubscriptionUpgradeTabProps {
  currentPlan?: 'free' | 'premium' | 'elite';
  onUpgrade?: (plan: string) => void;
}

const SubscriptionUpgradeTab: React.FC<SubscriptionUpgradeTabProps> = ({ 
  currentPlan = 'free',
  onUpgrade 
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      icon: Star,
      color: 'from-gray-500 to-gray-600',
      features: ['Basic matching', '5 daily likes', 'Standard support'],
      limitations: ['Limited cultural filters', 'Basic AI features']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      icon: Zap,
      color: 'from-teal-500 to-emerald-600',
      popular: true,
      features: ['Unlimited likes', 'Advanced cultural matching', 'Priority support', 'Enhanced AI features'],
      limitations: []
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '$19.99',
      period: '/month',
      icon: Crown,
      color: 'from-emerald-600 to-green-700',
      features: ['Everything in Premium', 'VIP profile boost', 'Exclusive events', 'Personal culture concierge'],
      limitations: []
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">
          Upgrade Your Experience
        </h2>
        <p className="text-gray-600">Unlock deeper cultural connections</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentPlan === plan.id;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-emerald-500 scale-105' : ''
              } ${isCurrentPlan ? 'bg-emerald-50 border-emerald-200' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-emerald-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-2`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center gap-2 opacity-60">
                      <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                {isCurrentPlan ? (
                  <Button disabled className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpgrade?.(plan.id);
                    }}
                  >
                    {plan.id === 'free' ? 'Current' : 'Upgrade'}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionUpgradeTab;