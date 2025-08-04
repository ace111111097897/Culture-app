import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Subscription {
  tier: 'free' | 'premium' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  billingCycle?: 'monthly' | 'yearly';
  price: number;
  expiresAt?: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription>({
    tier: 'free',
    status: 'active',
    price: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSubscriptionStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('subscription-manager', {
        body: { action: 'get-status' }
      });

      if (error) throw error;
      if (data?.success) {
        setSubscription(data.subscription);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get subscription status');
    } finally {
      setLoading(false);
    }
  };

  const upgradeSubscription = async (
    tier: 'premium' | 'pro' | 'enterprise',
    billingCycle: 'monthly' | 'yearly'
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('subscription-manager', {
        body: {
          action: 'upgrade',
          tier,
          billingCycle
        }
      });

      if (error) throw error;
      if (data?.success) {
        setSubscription(data.subscription);
        return { success: true, message: data.message };
      }
      
      throw new Error('Upgrade failed');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to upgrade subscription';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('subscription-manager', {
        body: { action: 'cancel' }
      });

      if (error) throw error;
      if (data?.success) {
        setSubscription(prev => ({ ...prev, status: 'cancelled' }));
        return { success: true, message: data.message };
      }
      
      throw new Error('Cancellation failed');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to cancel subscription';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptionStatus();
  }, []);

  return {
    subscription,
    loading,
    error,
    upgradeSubscription,
    cancelSubscription,
    refreshSubscription: getSubscriptionStatus
  };
};