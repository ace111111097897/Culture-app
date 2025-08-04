import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Users, Calendar, MessageCircle, Trophy, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CubbletonAITourProps {
  onClose: () => void;
}

const CubbletonAITour: React.FC<CubbletonAITourProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      title: "Welcome to Cubble!",
      subtitle: "The Culture Bubble",
      content: "Welcome to Cubble - your personal culture bubble! I'm Cubbleton, your AI guide. Let me show you how to explore, connect, and celebrate cultures from around the world.",
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      highlight: "Discover cultures, make connections, and expand your worldview in a safe, inclusive environment."
    },
    {
      title: "Discover Cultures",
      subtitle: "Explore the World",
      content: "Browse through diverse cultures, traditions, and communities. Find what resonates with you and discover new perspectives.",
      icon: <Users className="h-8 w-8 text-blue-500" />,
      highlight: "Use our smart matching to find cultures and people that align with your interests."
    },
    {
      title: "Join Cubbles",
      subtitle: "Cultural Communities",
      content: "Join cultural communities called 'Cubbles' where you can connect with like-minded people and explore shared interests.",
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      highlight: "From K-Pop Universe to Street Art Collective - find your cultural tribe!"
    },
    {
      title: "Build Connections",
      subtitle: "Cultural Exchange",
      content: "Connect with people who share your cultural interests or want to learn about your background through meaningful conversations.",
      icon: <MessageCircle className="h-8 w-8 text-pink-500" />,
      highlight: "Share stories, exchange knowledge, and build lasting friendships across cultures."
    },
    {
      title: "Earn Achievements",
      subtitle: "Celebrate Your Journey",
      content: "Track your cultural exploration journey and earn badges for trying new experiences and making connections.",
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      highlight: "From 'Cultural Explorer' to 'Bridge Builder' - celebrate your growth!"
    },
    {
      title: "Safe Environment",
      subtitle: "Culture with Care",
      content: "Cubble maintains a respectful environment where all cultures are celebrated. Our community guidelines ensure positive interactions.",
      icon: <Shield className="h-8 w-8 text-red-500" />,
      highlight: "Report any issues and help us maintain a welcoming space for cultural exchange."
    }
  ];

  const currentStepData = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-lg border-2 border-purple-200 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-purple-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">Cubbleton AI Tour</h3>
              <p className="text-sm opacity-90">Your cultural guide</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 bg-purple-50">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Step {currentStep + 1} of {tourSteps.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-purple-600 hover:text-purple-700">
              Skip Tour
            </Button>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {currentStepData.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {currentStepData.title}
            </h2>
            <p className="text-purple-600 font-medium mb-4">
              {currentStepData.subtitle}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed text-center">
            {currentStepData.content}
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-700 font-medium">
              💡 {currentStepData.highlight}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-purple-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
            {currentStep < tourSteps.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CubbletonAITour;