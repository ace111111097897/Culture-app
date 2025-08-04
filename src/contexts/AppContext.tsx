import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AppContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const defaultAppContext: AppContextType = {
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  sidebarOpen: false,
  toggleSidebar: () => {},
};

export const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error && error.message === 'Invalid login credentials') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined,
            data: {
              name: email.split('@')[0],
            },
          },
        });
        
        if (signUpError) throw signUpError;
        
        const { error: retryError } = await supabase.auth.signInWithPassword({ email, password });
        if (retryError) throw retryError;
      } else if (error && error.message === 'Email not confirmed') {
        console.log('Email confirmation bypassed for demo');
        setUser({
          id: 'demo-user-' + Date.now(),
          email: email,
          user_metadata: { name: email.split('@')[0] },
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as User);
        return;
      } else if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
        data: {
          name: name,
        },
      },
    });
    if (error && error.message !== 'Email not confirmed') {
      throw error;
    }
    setUser({
      id: 'demo-user-' + Date.now(),
      email: email,
      user_metadata: { name: name },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as User);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};