import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import EnhancedLoginScreen from './EnhancedLoginScreen';
import EnhancedRegisterScreen from './EnhancedRegisterScreen';
import UpdatedUniqueHomeScreen from './UpdatedUniqueHomeScreen';
import EnhancedWelcomeScreen from './EnhancedWelcomeScreen';
import OnboardingFlow from './OnboardingFlow';
import ProfileDataManager from './ProfileDataManager';

type AppState = 'welcome' | 'login' | 'register' | 'onboarding' | 'home';

const UpdatedCubbleApp: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome'); // Start with welcome screen
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Enable loading to check auth

  // Check authentication on app start
  useEffect(() => {
    checkUserSession();
  }, []);
  const checkUserSession = async () => {
    try {
      // Check if user is already logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUserId(session.user.id);
        setUsername(session.user.email || session.user.user_metadata?.username || 'User');
        
        // Check if onboarding is completed
        const onboardingCompleted = localStorage.getItem('cubble_onboarding_completed');
        
        if (onboardingCompleted === 'true') {
          setCurrentState('home');
        } else {
          // Check database for onboarding status

          const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('user_id', session.user.id)
            .single();
          
          if (profile?.onboarding_completed) {
            localStorage.setItem('cubble_onboarding_completed', 'true');
            setCurrentState('home');
          } else {
            setCurrentState('onboarding');
          }
        }
      } else {
        setCurrentState('welcome');
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setCurrentState('welcome');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    console.log('=== LOGIN PROCESS STARTED ===');
    console.log('HandleLogin called with email:', email);
    
    try {
      console.log('Attempting Supabase authentication...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Supabase auth response:', { 
        user: data.user ? { id: data.user.id, email: data.user.email } : null, 
        error: error ? error.message : null 
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw new Error(error.message);
      }

      if (data.user) {
        console.log('User authenticated successfully:', data.user.id);
        setUserId(data.user.id);
        setUsername(data.user.email || email);
        
        // Check local storage first
        const onboardingCompleted = localStorage.getItem('cubble_onboarding_completed');
        console.log('Local onboarding status:', onboardingCompleted);
        
        if (onboardingCompleted === 'true') {
          console.log('Onboarding completed locally, redirecting to home');
          setCurrentState('home');
          return;
        }
        
        // Check database profile
        console.log('Checking database profile for user:', data.user.id);
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('user_id', data.user.id)
            .single();
          
          console.log('Profile query result:', { profile, profileError });
          
          if (profile?.onboarding_completed) {
            console.log('Profile shows onboarding completed, updating local storage and redirecting to home');
            localStorage.setItem('cubble_onboarding_completed', 'true');
            setCurrentState('home');
          } else {
            console.log('Profile shows onboarding not completed, redirecting to onboarding');
            setCurrentState('onboarding');
          }
        } catch (profileError) {
          console.log('Profile check failed, redirecting to onboarding:', profileError);
          setCurrentState('onboarding');
        }
      } else {
        console.error('No user data returned from authentication');
        throw new Error('Authentication failed - no user data');
      }
    } catch (error: any) {
      console.error('=== LOGIN PROCESS FAILED ===');
      console.error('Login error details:', error);
      throw error; // Re-throw so the login screen can handle it
    }
    console.log('=== LOGIN PROCESS COMPLETED ===');
  };

  const handleRegister = async (userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.username,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        setUserId(data.user.id);
        setUsername(userData.username || userData.email);
        setCurrentState('onboarding');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error
    }
  };

  const handleOnboardingComplete = () => {
    setCurrentState('home');
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('cubble_onboarding_completed');
      localStorage.removeItem('cubble_user_preferences');
      setUserId('');
      setUsername('');
      setCurrentState('welcome');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Cubble...</p>
        </div>
      </div>
    );
  }

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'welcome':
        return (
          <EnhancedWelcomeScreen
            onGetStarted={() => setCurrentState('login')}
            onContinueAsGuest={() => {
              setUserId('guest-user');
              setUsername('Guest User');
              setCurrentState('home');
            }}
          />
        );
      case 'login':
        return (
          <EnhancedLoginScreen
            onLoginSuccess={(userData) => {
              setUserId(userData.id || userData.user_id);
              setUsername(userData.name || userData.email);
              checkUserSession();
            }}
            onSwitchToRegister={() => setCurrentState('register')}
            onBack={() => setCurrentState('welcome')}
          />
        );
      
      case 'register':
        return (
          <EnhancedRegisterScreen
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentState('login')}
            onBack={() => setCurrentState('welcome')}
          />
        );
      
      case 'onboarding':
        return (
          <OnboardingFlow
            userId={userId}
            onComplete={handleOnboardingComplete}
          />
        );
      
      case 'home':
        return (
          <UpdatedUniqueHomeScreen
            username={username}
            onLogout={handleLogout}
          />
        );
      
      default:
        return (
          <EnhancedWelcomeScreen
            onGetStarted={() => setCurrentState('login')}
            onContinueAsGuest={() => {
              setUserId('guest-user');
              setUsername('Guest User');
              setCurrentState('home');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {renderCurrentScreen()}
    </div>
  );
};

export default UpdatedCubbleApp;