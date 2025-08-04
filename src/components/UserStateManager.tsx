import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UserState {
  isNewUser: boolean;
  hasCompletedPreferences: boolean;
  username: string;
  userId?: string;
}

interface UserStateManagerProps {
  children: (userState: UserState, updateUserState: (state: Partial<UserState>) => void) => React.ReactNode;
}

const UserStateManager: React.FC<UserStateManagerProps> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>({
    isNewUser: true,
    hasCompletedPreferences: false,
    username: '',
    userId: undefined
  });

  const updateUserState = (newState: Partial<UserState>) => {
    setUserState(prev => ({ ...prev, ...newState }));
  };

  const checkUserPreferences = async (username: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('profile-manager', {
        body: { 
          action: 'check_preferences',
          username 
        }
      });

      if (!error && data?.hasPreferences) {
        updateUserState({ hasCompletedPreferences: true, isNewUser: false });
      }
    } catch (error) {
      console.error('Error checking user preferences:', error);
    }
  };

  useEffect(() => {
    if (userState.username && userState.isNewUser) {
      checkUserPreferences(userState.username);
    }
  }, [userState.username]);

  return (
    <>
      {children(userState, updateUserState)}
    </>
  );
};

export default UserStateManager;