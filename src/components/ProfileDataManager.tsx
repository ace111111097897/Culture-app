import { supabase } from '@/lib/supabase';

export interface UserProfile {
  user_id: string;
  name: string;
  email: string;
  age?: number;
  location?: string;
  bio?: string;
  interests?: string[];
  languages?: string[];
  avatar_url?: string;
  cultural_interests?: string[];
  zodiac_sign?: string;
  notification_preferences?: any;
  onboarding_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export class ProfileDataManager {
  static async saveProfile(profileData: Partial<UserProfile>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const dataToSave = {
          ...profileData,
          user_id: user.id,
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('profiles')
          .upsert([dataToSave]);

        if (error) {
          console.error('Database save error:', error);
          // Save to localStorage as fallback
          localStorage.setItem('cubbleUser', JSON.stringify(dataToSave));
          return false;
        }

        // Also save to localStorage for offline access
        localStorage.setItem('cubbleUser', JSON.stringify(dataToSave));
        return true;
      } else {
        // No authenticated user, save to localStorage only
        localStorage.setItem('cubbleUser', JSON.stringify(profileData));
        return true;
      }
    } catch (error) {
      console.error('Profile save error:', error);
      // Fallback to localStorage
      localStorage.setItem('cubbleUser', JSON.stringify(profileData));
      return false;
    }
  }

  static async loadProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          localStorage.setItem('cubbleUser', JSON.stringify(data));
          return data;
        }
      }

      // Fallback to localStorage
      const savedUser = localStorage.getItem('cubbleUser');
      if (savedUser) {
        return JSON.parse(savedUser);
      }

      return null;
    } catch (error) {
      console.error('Profile load error:', error);
      
      // Fallback to localStorage
      const savedUser = localStorage.getItem('cubbleUser');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
      
      return null;
    }
  }

  static async updateProfile(updates: Partial<UserProfile>): Promise<boolean> {
    try {
      const currentProfile = await this.loadProfile();
      if (!currentProfile) return false;

      const updatedProfile = {
        ...currentProfile,
        ...updates,
        updated_at: new Date().toISOString()
      };

      return await this.saveProfile(updatedProfile);
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  }

  static clearProfile(): void {
    localStorage.removeItem('cubbleUser');
  }
}

export default ProfileDataManager;