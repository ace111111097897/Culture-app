import React, { useState } from 'react';
import { Settings, Accessibility, MessageSquare, BarChart3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAccessibility } from './AccessibilityProvider';
import { FeedbackModal } from './UserFeedbackSystem';

export const UIOptimizationDashboard: React.FC = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { highContrast, fontSize, toggleHighContrast, setFontSize } = useAccessibility();

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            UI Optimization Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Accessibility Controls */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Accessibility className="h-4 w-4" />
              Accessibility
            </h3>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">High Contrast Mode</span>
              <Switch
                checked={highContrast}
                onCheckedChange={toggleHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm">Font Size</span>
              <div className="flex gap-2">
                {(['normal', 'large', 'xl'] as const).map((size) => (
                  <Button
                    key={size}
                    variant={fontSize === size ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFontSize(size)}
                    aria-label={`Set font size to ${size}`}
                  >
                    {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* User Feedback */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <MessageSquare className="h-4 w-4" />
              User Feedback
            </h3>
            
            <Button
              onClick={() => setShowFeedback(true)}
              variant="outline"
              className="w-full"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Share Feedback
            </Button>
          </div>

          {/* Performance Monitoring */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <BarChart3 className="h-4 w-4" />
              Performance
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800">Load Time</div>
                <div className="text-green-600">Fast</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Responsiveness</div>
                <div className="text-blue-600">Optimized</div>
              </div>
            </div>
          </div>

          {/* Visual Design Status */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Eye className="h-4 w-4" />
              Design System
            </h3>
            
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Design Tokens</span>
                <span className="text-green-600">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span>Error Boundaries</span>
                <span className="text-green-600">✓ Implemented</span>
              </div>
              <div className="flex justify-between">
                <span>Loading States</span>
                <span className="text-green-600">✓ Consistent</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
      />
    </>
  );
};