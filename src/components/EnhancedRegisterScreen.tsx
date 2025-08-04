import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Bot } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface EnhancedRegisterScreenProps {
  onRegister: (userData: any) => Promise<void>;
  onSwitchToLogin: () => void;
  onBack: () => void;
}

const EnhancedRegisterScreen: React.FC<EnhancedRegisterScreenProps> = ({ 
  onRegister, 
  onSwitchToLogin, 
  onBack 
}) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    age: '',
    location: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
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
      // Create user account
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Save profile data to database
        const profileData = {
          user_id: data.user.id,
          name: formData.name,
          email: formData.email,
          age: formData.age ? parseInt(formData.age) : null,
          location: formData.location || null,
          bio: formData.bio || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profileData]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        // Save to localStorage as backup
        localStorage.setItem('cubbleUser', JSON.stringify(profileData));
        
        await onRegister({
          ...formData,
          userId: data.user.id
        });
        
        toast({
          title: "Success",
          description: "Account created! Welcome to Culture!"
        });
      }
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
        <CardHeader className="text-center pb-6 relative">
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
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="h-12 rounded-xl"
            />
          </div>
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 rounded-xl"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <div className="text-center">
            <button
              onClick={onSwitchToLogin}
              className="text-teal-600 hover:text-teal-800 font-medium"
            >
              Already have an account? Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedRegisterScreen;