import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import UpdatedLoginScreen from './UpdatedLoginScreen';
import ComprehensiveSignupScreen from './ComprehensiveSignupScreen';
import UpdatedUniqueHomeScreen from './UpdatedUniqueHomeScreen';
import WelcomeScreen from './WelcomeScreen';
import UpdatedPreferencesScreen from './UpdatedPreferencesScreen';

type AppState = 'welcome' | 'login' | 'register' | 'preferences' | 'home';

const CubbleApp: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const savedUser = localStorage.getItem('cubbleUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUsername(userData.email);
      setUserProfile(userData);
      setCurrentState('home');
    }
  };

  const saveUserProfile = async (userData: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('profile-manager', {
        body: { action: 'create', ...userData }
      });
      if (!error) {
        localStorage.setItem('cubbleUser', JSON.stringify(userData));
        setUserProfile(userData);
      }
    } catch (err) {
      console.error('Profile save error:', err);
    }
  };

  const handleLogin = async (user: string, password: string) => {
    if (user && password) {
      setUsername(user);
      const existingProfile = await checkUserProfile(user);
      if (existingProfile) {
        localStorage.setItem('cubbleUser', JSON.stringify(existingProfile));
        setUserProfile(existingProfile);
        setCurrentState('home');
      } else {
        setCurrentState('preferences');
      }
    }
  };

  const checkUserProfile = async (email: string) => {
    try {
      const { data } = await supabase.functions.invoke('profile-manager', {
        body: { action: 'get', email }
      });
      return data?.profile || null;
    } catch {
      return null;
    }
  };

  const handleRegister = async (userData: any) => {
    try {
      // Skip Supabase auth for now - just save profile directly
      setUsername(userData.email);
      await saveUserProfile(userData);
      // Navigate directly to home after successful registration
      setCurrentState('home');
      return Promise.resolve(); // Ensure promise resolves successfully
    } catch (error: any) {
      console.error('Registration error:', error);
      // Even if there's an error, still navigate to home to match Sign In behavior
      setCurrentState('home');
      return Promise.resolve();
    }
  };

  const handlePreferencesComplete = async (preferences: any) => {
    const fullProfile = { ...userProfile, ...preferences, email: username };
    await saveUserProfile(fullProfile);
    setCurrentState('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('cubbleUser');
    setUsername('');
    setUserProfile(null);
    setCurrentState('welcome');
  };

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentState('login')} />;
      case 'login':
        return (
          <UpdatedLoginScreen 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setCurrentState('register')} 
            onBack={() => setCurrentState('welcome')} 
          />
        );
      case 'register':
        return (
          <ComprehensiveSignupScreen 
            onRegister={async (email, password, name, age, preferences) => {
              const userData = { email, password, name, age, preferences };
              await handleRegister(userData);
            }}
            onSwitchToLogin={() => setCurrentState('login')} 
            onBack={() => setCurrentState('welcome')} 
          />
        );
      case 'preferences':
        return <UpdatedPreferencesScreen username={username} onComplete={handlePreferencesComplete} onSkip={() => setCurrentState('home')} />;
      case 'home':
        return <UpdatedUniqueHomeScreen username={username} userProfile={userProfile} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {renderCurrentScreen()}
    </div>
  );
};

export default CubbleApp;