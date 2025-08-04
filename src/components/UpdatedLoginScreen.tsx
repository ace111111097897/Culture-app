import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Bot, HelpCircle } from 'lucide-react';

interface UpdatedLoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSwitchToRegister: () => void;
  onBack: () => void;
}

const UpdatedLoginScreen: React.FC<UpdatedLoginScreenProps> = ({ onLogin, onSwitchToRegister, onBack }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [ageVerified, setAgeVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    console.log('Login button clicked with:', { email: credentials.email, hasPassword: !!credentials.password }); // Debug log
    
    if (!credentials.email || !credentials.password) {
      console.log('Missing credentials'); // Debug log
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (!ageVerified) {
      console.log('Age not verified'); // Debug log
      toast({
        title: "Verification Required",
        description: "Please confirm you are 18+ to continue",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    console.log('Starting login process for:', credentials.email); // Debug log
    
    try {
      console.log('Calling onLogin function...'); // Debug log
      await onLogin(credentials.email, credentials.password);
      console.log('Login function completed successfully'); // Debug log
      toast({
        title: "Success",
        description: "Welcome back to your cultural journey!"
      });
    } catch (error: any) {
      console.error('Login error in UpdatedLoginScreen:', error); // Debug log
      toast({
        title: "Login Failed",
        description: error.message || "Please check your email and password and try again.",
        variant: "destructive"
      });
    } finally {
      console.log('Login process finished, setting loading to false'); // Debug log
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-emerald-900 to-purple-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-8 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute left-0 top-0 p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 p-2 hover:bg-gray-100"
            onClick={() => toast({ title: "Help", description: "Cubbleton AI is here to assist you!" })}
          >
            <HelpCircle className="h-4 w-4 text-teal-600" />
          </Button>
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
            <Bot className="text-white text-2xl h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Culture
          </CardTitle>
          <p className="text-gray-600 mt-2 text-lg font-medium">The Culture Bubble</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              onKeyPress={handleKeyPress}
              className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              onKeyPress={handleKeyPress}
              className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors rounded-xl"
            />
          </div>
          
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
            <Checkbox
              id="age-verification"
              checked={ageVerified}
              onCheckedChange={(checked) => setAgeVerified(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="age-verification" className="text-sm leading-relaxed cursor-pointer text-gray-700">
              I confirm that I am 18 years of age or older
            </label>
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            type="button"
            className="w-full h-14 bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 hover:from-teal-700 hover:via-emerald-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-0"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Sign In</span>
              </div>
            )}
          </Button>
          <div className="text-center">
            <button
              onClick={onSwitchToRegister}
              className="text-teal-600 hover:text-teal-800 font-medium transition-colors hover:underline"
            >
              Don't have an account? Join the cultural community
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatedLoginScreen;