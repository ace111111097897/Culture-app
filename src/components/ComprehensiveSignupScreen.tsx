import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Bot, ChevronRight, User, Heart, Globe, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ComprehensiveSignupScreenProps {
  onRegister: (email: string, password: string, name: string, age: number, preferences: any) => Promise<void>;
  onSwitchToLogin: () => void;
  onBack: () => void;
}

const ComprehensiveSignupScreen: React.FC<ComprehensiveSignupScreenProps> = ({ 
  onRegister, 
  onSwitchToLogin, 
  onBack 
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });

  const [preferences, setPreferences] = useState({
    culturalBackground: [],
    interests: [],
    zodiacSign: '',
    lifestyle: [],
    foodPreferences: []
  });

  const culturalOptions = [
    'East Asian', 'Southeast Asian', 'South Asian', 'Middle Eastern',
    'European', 'African', 'Latin American', 'North American', 'Caribbean'
  ];

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const interestOptions = [
    'Music', 'Art', 'Travel', 'Food', 'Sports', 'Gaming', 'Reading', 'Movies',
    'Dancing', 'Photography', 'Fitness', 'Technology', 'Fashion', 'Nature'
  ];

  const lifestyleOptions = [
    'Early Bird', 'Night Owl', 'Social Butterfly', 'Homebody', 'Adventurous',
    'Creative', 'Fitness Focused', 'Tech Enthusiast', 'Eco-Conscious'
  ];

  const foodOptions = [
    'Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Halal', 'Kosher',
    'Gluten-Free', 'Keto', 'Mediterranean', 'Asian Cuisine'
  ];

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error", 
        description: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }

    if (parseInt(formData.age) < 18) {
      toast({
        title: "Age Requirement",
        description: "You must be 18 or older to join",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await onRegister(formData.email, formData.password, formData.name, parseInt(formData.age), preferences);
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully!"
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderOptions = (options: string[], selectedKey: string, colorClass: string) => (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <Badge
          key={option}
          variant={preferences[selectedKey].includes(option) ? "default" : "outline"}
          className={`cursor-pointer p-2 justify-center text-xs transition-all ${
            preferences[selectedKey].includes(option) 
              ? `bg-gradient-to-r ${colorClass} text-white` 
              : 'border-gray-300 hover:border-gray-500 text-black bg-white'
          }`}
          onClick={() => {
            const updated = preferences[selectedKey].includes(option)
              ? preferences[selectedKey].filter(item => item !== option)
              : [...preferences[selectedKey], option];
            setPreferences({...preferences, [selectedKey]: updated});
          }}
        >
          {option}
        </Badge>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
          className="h-12"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Age *</Label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          placeholder="Enter your age"
          className="h-12"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          className="h-12"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Create a password"
          className="h-12"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="Confirm your password"
          className="h-12"
        />
      </div>
    </CardContent>
  );

  const renderStep2 = () => (
    <CardContent className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-black">
          <Globe className="w-5 h-5 text-teal-600" />
          Cultural Background
        </h3>
        {renderOptions(culturalOptions, 'culturalBackground', 'from-teal-500 to-blue-500')}
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-black">
          <Star className="w-5 h-5 text-purple-600" />
          Zodiac Sign
        </h3>
        <Select value={preferences.zodiacSign} onValueChange={(value) => setPreferences({...preferences, zodiacSign: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select your zodiac sign" />
          </SelectTrigger>
          <SelectContent>
            {zodiacSigns.map((sign) => (
              <SelectItem key={sign} value={sign}>{sign}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-black">
          <Heart className="w-5 h-5 text-pink-600" />
          Interests
        </h3>
        {renderOptions(interestOptions, 'interests', 'from-pink-500 to-purple-500')}
      </div>
    </CardContent>
  );

  const renderStep3 = () => (
    <CardContent className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-black">
          <User className="w-5 h-5 text-green-600" />
          Lifestyle
        </h3>
        {renderOptions(lifestyleOptions, 'lifestyle', 'from-green-500 to-teal-500')}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-black">Food Preferences</h3>
        {renderOptions(foodOptions, 'foodPreferences', 'from-orange-500 to-red-500')}
      </div>
    </CardContent>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-emerald-900 to-purple-900 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-6 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="absolute left-0 top-0 p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
            <Bot className="text-white text-2xl h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
            Join Culture
          </CardTitle>
          <p className="text-gray-600 mt-2">Step {step} of 3 - {step === 1 ? 'Basic Info' : step === 2 ? 'Cultural Identity' : 'Lifestyle'}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-teal-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </CardHeader>
        
        <div className="overflow-y-auto max-h-[60vh] px-1">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <CardContent className="pt-6">
          <div className="flex justify-between">
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && (!formData.name || !formData.email || !formData.password || !formData.age)}
                className="ml-auto bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 hover:from-teal-700 hover:via-emerald-700 hover:to-purple-700 text-white font-bold rounded-xl"
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                disabled={loading}
                className="ml-auto bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 hover:from-teal-700 hover:via-emerald-700 hover:to-purple-700 text-white font-bold rounded-xl"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            )}
          </div>
          
          <div className="text-center mt-4">
            <button
              onClick={onSwitchToLogin}
              className="text-teal-600 hover:text-teal-800 font-medium transition-colors hover:underline"
            >
              Already have an account? Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveSignupScreen;