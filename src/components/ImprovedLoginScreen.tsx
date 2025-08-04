import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import CubbleBrandLogo from './CubbleBrandLogo';

interface ImprovedLoginScreenProps {
  onLoginSuccess: () => void;
}

const ImprovedLoginScreen: React.FC<ImprovedLoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let result;
      if (isSignUp) {
        console.log('Attempting to sign up user:', email);
        result = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (result.error) {
          throw result.error;
        }
        
        if (result.data.user && !result.data.user.email_confirmed_at) {
          setSuccess('Please check your email to confirm your account');
          return;
        }
      } else {
        console.log('Attempting to sign in user:', email);
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (result.error) {
        throw result.error;
      }

      if (result.data.user) {
        console.log('Authentication successful:', result.data.user.id);
        setSuccess(isSignUp ? 'Account created successfully!' : 'Welcome to Cubble!');
        
        // Call onLoginSuccess immediately to trigger the app state change
        setTimeout(() => {
          onLoginSuccess();
        }, 500);
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      if (err.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (err.message.includes('Email not confirmed')) {
        setError('Please check your email and confirm your account before signing in.');
      } else {
        setError(err.message || 'An error occurred during authentication');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6">
            <CubbleBrandLogo size="lg" showText={true} />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {isSignUp ? 'Join Cubble' : 'Welcome Back'}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Create your account to get started' : 'Sign in to continue your journey'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
          
          <div className="space-y-2 relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 pr-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleAuth} 
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white font-semibold"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </Button>

          <Button 
            variant="ghost" 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccess('');
            }}
            className="w-full text-gray-600 hover:text-gray-800"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </Button>

          <div className="text-xs text-gray-500 text-center space-y-1 pt-4 border-t">
            <div className="font-medium">Test Account:</div>
            <div>eternalvanguardstudios@gmail.com</div>
            <div className="text-gray-400">Password: testpass123</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovedLoginScreen;