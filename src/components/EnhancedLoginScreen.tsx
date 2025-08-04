import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Bot, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface EnhancedLoginScreenProps {
  onLoginSuccess: (userData: any) => void;
  onSwitchToRegister: () => void;
  onBack: () => void;
}

const EnhancedLoginScreen: React.FC<EnhancedLoginScreenProps> = ({ 
  onLoginSuccess, 
  onSwitchToRegister, 
  onBack 
}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        // Load user profile from database
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        let userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || 'User'
        };

        if (profile) {
          userData = { ...userData, ...profile };
          // Save to localStorage for offline access
          localStorage.setItem('cubbleUser', JSON.stringify(profile));
        }

        toast({
          title: "Success",
          description: "Welcome back!"
        });

        onLoginSuccess(userData);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive"
      });
    } finally {
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
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
            <Bot className="text-white text-2xl h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <p className="text-gray-600 mt-2">Sign in to continue your cultural journey</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onKeyPress={handleKeyPress}
              className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onKeyPress={handleKeyPress}
                className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors rounded-xl pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>
          <Button
            onClick={handleLogin}
            disabled={loading}
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
              Don't have an account? Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLoginScreen;