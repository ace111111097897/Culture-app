import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Bot } from 'lucide-react';

interface RegisterScreenProps {
  onRegister: (email: string, password: string, name: string) => Promise<void>;
  onSwitchToLogin: () => void;
  onBack: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onSwitchToLogin, onBack }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
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

    setLoading(true);
    
    try {
      await onRegister(formData.email, formData.password, formData.name);
      toast({
        title: "Success",
        description: "Welcome to your cultural journey!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Registration failed",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
            Join Culture
          </CardTitle>
          <p className="text-gray-600 mt-2">Start your cultural journey</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="h-12 border-2 border-gray-200 focus:border-teal-500 transition-colors rounded-xl"
            />
          </div>
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 hover:from-teal-700 hover:via-emerald-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-0"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Create Account</span>
              </div>
            )}
          </Button>
          <div className="text-center">
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

export default RegisterScreen;