import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Heart, MessageCircle, X, Star, MapPin, Sparkles, Brain } from 'lucide-react';

interface AIMatchCardProps {
  match: {
    id: string;
    name: string;
    age: number;
    culture: string;
    location: string;
    matchPercentage: number;
    avatar: string;
    lastActive: string;
    commonInterests: string[];
    isNewMatch: boolean;
    aiReason: string;
    icebreaker: string;
    culturalCompatibility: string[];
    sharedCubbles: string[];
  };
  onMessage: (id: string) => void;
  onPass: (id: string) => void;
  onFeedback: (id: string, rating: number) => void;
}

const AIMatchCard: React.FC<AIMatchCardProps> = ({ match, onMessage, onPass, onFeedback }) => {
  const [showIcebreaker, setShowIcebreaker] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = (rating: number) => {
    onFeedback(match.id, rating);
    setFeedbackGiven(true);
  };

  return (
    <Card className="relative p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
      {match.isNewMatch && (
        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500">
          <Sparkles className="h-3 w-3 mr-1" />
          AI Match!
        </Badge>
      )}
      
      <div className="flex items-start space-x-4">
        <Avatar className="h-16 w-16 ring-2 ring-purple-200">
          <img src={match.avatar} alt={match.name} />
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-semibold">{match.name}, {match.age}</h3>
            <div className="flex items-center space-x-1">
              <Brain className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">
                {match.matchPercentage}% AI match
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
            <MapPin className="h-3 w-3" />
            <span>{match.location}</span>
          </div>
          
          <Badge variant="outline" className="mb-3 border-purple-200">
            {match.culture} Culture
          </Badge>
          
          <div className="mb-3 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-700 mb-1">
              <Brain className="h-3 w-3 inline mr-1" />
              Why Cubbleton AI matched you:
            </p>
            <p className="text-sm text-purple-600">{match.aiReason}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Cultural compatibility:</p>
            <div className="flex flex-wrap gap-1">
              {match.culturalCompatibility.map((trait, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
          
          {match.sharedCubbles.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Shared Cubbles:</p>
              <div className="flex flex-wrap gap-1">
                {match.sharedCubbles.map((cubble, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {cubble}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-xs text-gray-400">Active {match.lastActive}</p>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            size="sm" 
            onClick={() => setShowIcebreaker(!showIcebreaker)}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Icebreaker
          </Button>
          <Button 
            size="sm" 
            className="bg-pink-500 hover:bg-pink-600"
            onClick={() => onMessage(match.id)}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-500 hover:text-red-600"
            onClick={() => onPass(match.id)}
          >
            <X className="h-4 w-4 mr-1" />
            Pass
          </Button>
        </div>
      </div>
      
      {showIcebreaker && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <p className="text-sm font-medium text-purple-700 mb-2">
            <Sparkles className="h-3 w-3 inline mr-1" />
            AI-Generated Icebreaker:
          </p>
          <p className="text-sm text-gray-700 mb-3">"{match.icebreaker}"</p>
          
          {!feedbackGiven && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Rate this suggestion:</span>
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  size="sm"
                  variant="ghost"
                  className="p-1 h-6 w-6"
                  onClick={() => handleFeedback(rating)}
                >
                  <Star className="h-3 w-3" />
                </Button>
              ))}
            </div>
          )}
          
          {feedbackGiven && (
            <p className="text-xs text-green-600">Thanks for your feedback! This helps improve AI suggestions.</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default AIMatchCard;