import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SimpleLoginTest: React.FC = () => {
  const [email, setEmail] = useState('eternalvanguardstudios@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const testLogin = async () => {
    console.log('=== SIMPLE LOGIN TEST ===');
    setLoading(true);
    setMessage('Testing login...');

    try {
      console.log('Testing with email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Auth result:', { data, error });

      if (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Login error:', error);
      } else if (data.user) {
        setMessage(`Success! Logged in as: ${data.user.email}`);
        console.log('Login successful:', data.user);
      } else {
        setMessage('No user data returned');
      }
    } catch (err: any) {
      setMessage(`Exception: ${err.message}`);
      console.error('Exception:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Login Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            onClick={testLogin} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Login'}
          </Button>
          {message && (
            <div className="p-3 bg-gray-50 rounded text-sm">
              {message}
            </div>
          )}
          <div className="text-xs text-gray-500">
            Test credentials: eternalvanguardstudios@gmail.com or dnaone@gmail.com
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleLoginTest;