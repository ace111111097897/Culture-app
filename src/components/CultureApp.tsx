import React, { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import AgeVerificationScreen from './AgeVerificationScreen';
import UpdatedLoginScreen from './UpdatedLoginScreen';
import RegisterScreen from './RegisterScreen';
import UniqueHomeScreen from './UniqueHomeScreen';
import WelcomeScreen from './WelcomeScreen';
import PreferencesScreen from './PreferencesScreen';

type AppState = 'verification' | 'welcome' | 'login' | 'register' | 'preferences' | 'home';

const CultureApp: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('verification');
  const [username, setUsername] = useState('');
  const { isMobile } = useResponsive();

  const handleVerificationComplete = () => {
    setCurrentState('welcome');
  };

  const handleLogin = (user: string, password: string) => {
    // Simple validation - in real app, this would be API call
    if (user && password) {
      setUsername(user);
      setCurrentState('preferences');
    }
  };

  const handleRegister = (userData: any) => {
    setUsername(userData.username || userData.email);
    setCurrentState('preferences');
  };

  const handlePreferencesComplete = () => {
    setCurrentState('home');
  };

  const handleLogout = () => {
    setUsername('');
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
          <PreferencesScreen
            username={username}
            onComplete={handlePreferencesComplete}
          />
        );
      
      case 'home':
        return (
          <UniqueHomeScreen
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
    <div className="min-h-screen">
      {renderCurrentScreen()}
    </div>
  );
};

export default CultureApp;