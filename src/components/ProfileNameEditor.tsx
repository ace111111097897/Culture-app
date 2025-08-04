import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, X, AlertCircle } from 'lucide-react';

interface ProfileNameEditorProps {
  currentName: string;
  onSave: (newName: string) => void;
  onCancel: () => void;
}

const ProfileNameEditor: React.FC<ProfileNameEditorProps> = ({ currentName, onSave, onCancel }) => {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState('');

  const validateName = (inputName: string): string => {
    if (!inputName.trim()) {
      return 'Profile name is required';
    }
    if (inputName.length < 2) {
      return 'Profile name must be at least 2 characters';
    }
    if (inputName.length > 30) {
      return 'Profile name must be less than 30 characters';
    }
    
    // Check for special characters (allow only letters, numbers, spaces, hyphens, underscores)
    const specialCharRegex = /[^a-zA-Z0-9\s\-_]/;
    if (specialCharRegex.test(inputName)) {
      return 'Profile name cannot contain special characters';
    }

    // Basic offensive language filter
    const offensiveWords = ['damn', 'hell', 'stupid', 'idiot', 'hate'];
    const lowerName = inputName.toLowerCase();
    for (const word of offensiveWords) {
      if (lowerName.includes(word)) {
        return 'Profile name contains inappropriate language';
      }
    }

    return '';
  };

  const handleSave = () => {
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSave(name.trim());
  };

  const handleChange = (value: string) => {
    setName(value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="profileName">Profile Name</Label>
        <Input
          id="profileName"
          value={name}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter your profile name"
          className={error ? 'border-red-500' : ''}
          maxLength={30}
        />
        <p className="text-xs text-gray-500 mt-1">
          {name.length}/30 characters
        </p>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex gap-2">
        <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
          <Check className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button onClick={onCancel} variant="outline" size="sm">
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProfileNameEditor;