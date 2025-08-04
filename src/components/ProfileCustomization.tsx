import React, { useState } from 'react';
import { Palette, Layout, Save, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  preview: string;
}

interface LayoutOption {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface ProfileCustomizationProps {
  currentTheme: string;
  currentLayout: string;
  themes: Theme[];
  layouts: LayoutOption[];
  onThemeChange: (themeId: string) => void;
  onLayoutChange: (layoutId: string) => void;
  onSaveChanges: () => void;
  onResetToDefault: () => void;
}

const ProfileCustomization: React.FC<ProfileCustomizationProps> = ({
  currentTheme,
  currentLayout,
  themes,
  layouts,
  onThemeChange,
  onLayoutChange,
  onSaveChanges,
  onResetToDefault
}) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [selectedLayout, setSelectedLayout] = useState(currentLayout);
  const [hasChanges, setHasChanges] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setHasChanges(themeId !== currentTheme || selectedLayout !== currentLayout);
  };

  const handleLayoutSelect = (layoutId: string) => {
    setSelectedLayout(layoutId);
    setHasChanges(selectedTheme !== currentTheme || layoutId !== currentLayout);
  };

  const handleSave = () => {
    onThemeChange(selectedTheme);
    onLayoutChange(selectedLayout);
    onSaveChanges();
    setHasChanges(false);
  };

  const handleReset = () => {
    onResetToDefault();
    setSelectedTheme('default');
    setSelectedLayout('standard');
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Save/Reset Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              🎨 Profile Customization
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="themes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="themes">🎨 Themes</TabsTrigger>
          <TabsTrigger value="layouts">📐 Layouts</TabsTrigger>
        </TabsList>

        {/* Themes Tab */}
        <TabsContent value="themes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Your Theme</CardTitle>
              <p className="text-sm text-gray-600">
                Select a color scheme that reflects your personal style
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedTheme} onValueChange={handleThemeSelect}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <div key={theme.id} className="relative">
                      <RadioGroupItem
                        value={theme.id}
                        id={theme.id}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={theme.id}
                        className={`block cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                          selectedTheme === theme.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {/* Theme Preview */}
                        <div className="mb-3">
                          <div 
                            className="h-20 rounded-md border overflow-hidden"
                            style={{ background: theme.preview }}
                          >
                            <div className="h-6" style={{ background: theme.primary }} />
                            <div className="p-2">
                              <div 
                                className="h-2 w-3/4 rounded mb-1"
                                style={{ background: theme.secondary }}
                              />
                              <div 
                                className="h-2 w-1/2 rounded"
                                style={{ background: theme.secondary, opacity: 0.6 }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <h3 className="font-semibold text-sm mb-1">{theme.name}</h3>
                          <div className="flex justify-center gap-1">
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ background: theme.primary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ background: theme.secondary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ background: theme.background }}
                            />
                          </div>
                        </div>
                        
                        {selectedTheme === theme.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layouts Tab */}
        <TabsContent value="layouts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Layout</CardTitle>
              <p className="text-sm text-gray-600">
                Choose how your profile information is organized and displayed
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedLayout} onValueChange={handleLayoutSelect}>
                <div className="space-y-4">
                  {layouts.map((layout) => (
                    <div key={layout.id} className="relative">
                      <RadioGroupItem
                        value={layout.id}
                        id={layout.id}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={layout.id}
                        className={`block cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                          selectedLayout === layout.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Layout Preview */}
                          <div className="w-24 h-16 bg-gray-100 rounded border overflow-hidden flex-shrink-0">
                            <div 
                              className="w-full h-full bg-gray-200 bg-opacity-50"
                              style={{ backgroundImage: layout.preview }}
                            >
                              {/* Simple layout representation */}
                              {layout.id === 'standard' && (
                                <div className="p-1">
                                  <div className="w-4 h-4 bg-gray-400 rounded-full mx-auto mb-1" />
                                  <div className="space-y-1">
                                    <div className="h-1 bg-gray-400 rounded" />
                                    <div className="h-1 bg-gray-400 rounded w-3/4 mx-auto" />
                                  </div>
                                </div>
                              )}
                              {layout.id === 'compact' && (
                                <div className="p-1 flex">
                                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-1" />
                                  <div className="flex-1">
                                    <div className="h-1 bg-gray-400 rounded mb-1" />
                                    <div className="h-1 bg-gray-400 rounded w-2/3" />
                                  </div>
                                </div>
                              )}
                              {layout.id === 'showcase' && (
                                <div className="p-1">
                                  <div className="h-2 bg-gray-400 rounded mb-1" />
                                  <div className="grid grid-cols-3 gap-1">
                                    <div className="h-3 bg-gray-400 rounded" />
                                    <div className="h-3 bg-gray-400 rounded" />
                                    <div className="h-3 bg-gray-400 rounded" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">{layout.name}</h3>
                            <p className="text-xs text-gray-600">{layout.description}</p>
                          </div>
                          
                          {selectedLayout === layout.id && (
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Section */}
      {hasChanges && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-purple-700">
              <Layout className="h-4 w-4" />
              <span className="text-sm font-medium">Preview Changes</span>
            </div>
            <p className="text-xs text-purple-600 mt-1">
              Your profile will use the {themes.find(t => t.id === selectedTheme)?.name} theme with {layouts.find(l => l.id === selectedLayout)?.name} layout.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileCustomization;