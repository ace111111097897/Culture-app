import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://lsltvcasrlpasldnzwng.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbHR2Y2FzcmxwYXNsZG56d25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3MjkzNzgsImV4cCI6MjAzNzMwNTM3OH0.BUXiZGBBaFdEjfzYFJdIZCGqzwKJdNhQxmZQsJCgSuI';

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection on initialization
console.log('Supabase client initialized:', { url: supabaseUrl, keyLength: supabaseKey.length });

export { supabase };