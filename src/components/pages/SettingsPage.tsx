import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Volume2, 
  Eye, 
  Heart, 
  Users, 
  MapPin,
  Smartphone,
  Mail,
  Lock
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false,
      messages: true,
      matches: true,
      cubbles: true,
      events: false
    },
    privacy: {
      profileVisibility: 'public',
      showAge: true,
      showLocation: true,
      onlineStatus: true,
      readReceipts: true
    },
    preferences: {
      darkMode: false,
      language: 'en',
      distance: [25],
      ageRange: [18, 35],
      soundEffects: true
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      blockScreenshots: false
    }
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 mt-2">Customize your Cubble experience</p>
      </div>

      {/* Notifications */}
      <Card className="border-teal-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-700">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-black">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive notifications on your device</p>
            </div>
            <Switch
              checked={settings.notifications.push}
              onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-black">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <Switch
              checked={settings.notifications.email}
              onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-black">New Messages</p>
              <p className="text-sm text-gray-600">Get notified of new messages</p>
            </div>
            <Switch
              checked={settings.notifications.messages}
              onCheckedChange={(checked) => updateSetting('notifications', 'messages', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="border-teal-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-700">
            <Shield className="w-5 h-5" />
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-black">Profile Visibility</p>
              <p className="text-sm text-gray-600">Who can see your profile</p>
            </div>
            <Select
              value={settings.privacy.profileVisibility}
              onValueChange={(value) => updateSetting('privacy', 'profileVisibility', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="matches">Matches Only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card className="border-teal-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-700">
            <Globe className="w-5 h-5" />
            App Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-black">Dark Mode</p>
              <p className="text-sm text-gray-600">Use dark theme</p>
            </div>
            <Switch
              checked={settings.preferences.darkMode}
              onCheckedChange={(checked) => updateSetting('preferences', 'darkMode', checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-black">Language</p>
              <p className="text-sm text-gray-600">App language</p>
            </div>
            <Select
              value={settings.preferences.language}
              onValueChange={(value) => updateSetting('preferences', 'language', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6">
        <Button className="flex-1 bg-gradient-to-r from-teal-600 to-purple-600 text-white">
          Save Changes
        </Button>
        <Button variant="outline" className="flex-1 border-teal-200 text-black hover:bg-teal-50">
          Reset to Default
        </Button>
      </div>
    </div>
  );
}