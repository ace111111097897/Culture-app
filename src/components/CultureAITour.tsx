import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface CultureAITourProps {
  isVisible: boolean;
  onClose: () => void;
  onSkip: () => void;
  isFirstTime?: boolean;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: '🌟 Welcome to Culture!',
    description: 'I\'m Culture AI, your personal guide! Let me show you around this amazing cultural community.',
    target: 'header',
    position: 'bottom'
  },
  {
    id: 'cubbles',
    title: '✨ Discover Cubbles',
    description: 'These are Cubbles - trending cultural moments and stories from our community. Tap to explore!',
    target: 'cubbles',
    position: 'bottom'
  },
  {
    id: 'matches',
    title: '💕 Find Your Match',
    description: 'Connect with people who share your cultural interests and passions.',
    target: 'matches',
    position: 'top'
  },
  {
    id: 'messages',
    title: '💬 Stay Connected',
    description: 'Chat with your matches and friends in real-time messaging.',
    target: 'messages',
    position: 'top'
  },
  {
    id: 'premium',
    title: '👑 Go Premium',
    description: 'Unlock exclusive features and enhanced cultural experiences.',
    target: 'premium',
    position: 'top'
  },
  {
    id: 'safety',
    title: '🛡️ Tips & Safety',
    description: 'Access feedback, safety reports, and community guidelines anytime from the navigation.',
    target: 'safety',
    position: 'left'
  }
];

const CultureAITour: React.FC<CultureAITourProps> = ({ 
  isVisible, 
  onClose, 
  onSkip,
  isFirstTime = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentTourStep = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleSkip = () => {
    onSkip();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className={`max-w-md w-full bg-white/95 backdrop-blur-lg border-2 border-purple-200 shadow-2xl transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-purple-900">Culture AI</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">
                {currentTourStep.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {currentTourStep.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                {isFirstTime && (
                  <Button variant="outline" size="sm" onClick={handleSkip}>
                    <SkipForward className="h-4 w-4 mr-1" />
                    Skip Tour
                  </Button>
                )}
                
                {currentStep > 0 && (
                  <Button variant="outline" size="sm" onClick={handlePrevious}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                
                <Button onClick={handleNext} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < tourSteps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CultureAITour;