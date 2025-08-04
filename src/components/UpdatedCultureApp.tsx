import React, { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import AgeVerificationScreen from './AgeVerificationScreen';
import UpdatedLoginScreen from './UpdatedLoginScreen';
import RegisterScreen from './RegisterScreen';
import NewLayoutHomeScreen from './NewLayoutHomeScreen';
import WelcomeScreen from './WelcomeScreen';
import EnhancedPreferencesScreen from './EnhancedPreferencesScreen';
import UserStateManager from './UserStateManager';
import { supabase } from '@/lib/supabase';

type AppState = 'verification' | 'welcome' | 'login' | 'register' | 'preferences' | 'home';

const UpdatedCultureApp: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('verification');
  const [username, setUsername] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const { isMobile } = useResponsive();

  const handleVerificationComplete = () => {
    setCurrentState('welcome');
  };

  const handleLogin = async (user: string, password: string) => {
    if (user && password) {
      setUsername(user);
      setIsNewUser(false);
      
      // Check if returning user has completed preferences
      try {
        const { data, error } = await supabase.functions.invoke('profile-manager', {
          body: { 
            action: 'check_preferences',
            username: user 
          }
        });

        if (!error && data?.hasPreferences) {
          // Returning user with preferences - go directly to home
          setCurrentState('home');
        } else {
          // User without preferences - go to preferences
          setCurrentState('preferences');
        }
      } catch (error) {
        console.error('Error checking preferences:', error);
        // Default to home for returning users if error
        setCurrentState('home');
      }
    }
  };

  const handleRegister = (userData: any) => {
    setUsername(userData.username || userData.email);
    setIsNewUser(true);
    // New users always go to preferences first
    setCurrentState('preferences');
  };

  const handlePreferencesComplete = () => {
    setCurrentState('home');
  };

  const handleLogout = () => {
    setUsername('');
    setIsNewUser(false);
    setCurrentState('verification');
  };

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'verification':
        return (
          <AgeVerificationScreen
            onVerificationComplete={handleVerificationComplete}
          />
        );
      
      case 'welcome':
        return (
          <WelcomeScreen
            onGetStarted={() => setCurrentState('login')}
          />
        );
      
      case 'login':
        return (
          <UpdatedLoginScreen
            onLogin={handleLogin}
            onRegister={() => setCurrentState('register')}
          />
        );
      
      case 'register':
        return (
          <RegisterScreen
            onRegister={handleRegister}
            onBackToLogin={() => setCurrentState('login')}
          />
        );
      
      case 'preferences':
        return (
          <EnhancedPreferencesScreen
            username={username}
            isNewUser={isNewUser}
            onComplete={handlePreferencesComplete}
          />
        );
      
      case 'home':
        return (
          <NewLayoutHomeScreen
            username={username}
            onLogout={handleLogout}
          />
        );
      
      default:
        return (
          <AgeVerificationScreen
            onVerificationComplete={handleVerificationComplete}
          />
        );
    }
  };

  return (
    <UserStateManager>
      {(userState, updateUserState) => (
        <div className="min-h-screen">
          {renderCurrentScreen()}
        </div>
      )}
    </UserStateManager>
  );
};

export default UpdatedCultureApp;