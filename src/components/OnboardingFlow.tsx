import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import OnboardingWelcomeScreen from './OnboardingWelcomeScreen';
import GuidedPreferencesSetup from './GuidedPreferencesSetup';
import PreferencesSummaryScreen from './PreferencesSummaryScreen';

interface PreferencesData {
  culturalInterests: string[];
  languages: string[];
  location: string;
  zodiacSign: string;
  notifications: {
    newCubbles: boolean;
    matches: boolean;
    events: boolean;
    messages: boolean;
  };
}

interface OnboardingFlowProps {
  userId: string;
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ userId, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'setup' | 'summary'>('welcome');
  const [preferences, setPreferences] = useState<PreferencesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleWelcomeContinue = () => {
    setCurrentStep('setup');
  };

  const handleSkipOnboarding = async () => {
    setIsLoading(true);
    try {
      // Mark onboarding as skipped in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          onboarding_completed: true,
          onboarding_skipped: true,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error marking onboarding as skipped:', error);
      }

      // Mark onboarding as complete in localStorage
      localStorage.setItem('cubble_onboarding_completed', 'true');
      localStorage.setItem('cubble_onboarding_skipped', 'true');
      
      onComplete();
    } catch (error) {
      console.error('Error during onboarding skip:', error);
      onComplete();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesComplete = async (preferencesData: PreferencesData) => {
    setPreferences(preferencesData);
    setCurrentStep('summary');
  };

  const handleBackToSetup = () => {
    setCurrentStep('setup');
  };

  const handleConfirmPreferences = async () => {
    if (!preferences) return;

    setIsLoading(true);
    try {
      // Save preferences to Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          cultural_interests: preferences.culturalInterests,
          languages: preferences.languages,
          location: preferences.location,
          zodiac_sign: preferences.zodiacSign,
          notification_preferences: preferences.notifications,
          onboarding_completed: true,
          onboarding_skipped: false,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving preferences:', error);
        // Continue anyway - we don't want to block the user
      }

      // Mark onboarding as complete in localStorage
      localStorage.setItem('cubble_onboarding_completed', 'true');
      localStorage.setItem('cubble_user_preferences', JSON.stringify(preferences));
      
      onComplete();
    } catch (error) {
      console.error('Error during onboarding completion:', error);
      // Continue anyway
      onComplete();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    );
  }

  switch (currentStep) {
    case 'welcome':
      return (
        <OnboardingWelcomeScreen 
          onContinue={handleWelcomeContinue}
          onSkip={handleSkipOnboarding}
        />
      );
    
    case 'setup':
      return (
        <GuidedPreferencesSetup
          onComplete={handlePreferencesComplete}
          onBack={handleWelcomeContinue}
        />
      );
    
    case 'summary':
      return preferences ? (
        <PreferencesSummaryScreen
          preferences={preferences}
          onConfirm={handleConfirmPreferences}
          onEdit={handleBackToSetup}
        />
      ) : null;
    
    default:
      return (
        <OnboardingWelcomeScreen 
          onContinue={handleWelcomeContinue}
          onSkip={handleSkipOnboarding}
        />
      );
  }
};

export default OnboardingFlow;