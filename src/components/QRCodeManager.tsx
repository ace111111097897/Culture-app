import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { QrCode, Scan, Plus, History } from 'lucide-react';
import { QRCodeGenerator } from './QRCodeGenerator';
import { QRCodeScanner } from './QRCodeScanner';

interface QRCodeManagerProps {
  userId?: string;
  cubbleId?: string;
  eventId?: string;
}

export const QRCodeManager: React.FC<QRCodeManagerProps> = ({ userId, cubbleId, eventId }) => {
  const [activeTab, setActiveTab] = useState('generate');
  const [showScanner, setShowScanner] = useState(false);
  const [scanHistory, setScanHistory] = useState<string[]>([]);

  const handleScanResult = (result: string) => {
    setScanHistory(prev => [result, ...prev.slice(0, 9)]);
    setShowScanner(false);
    
    // Handle different QR code types
    if (result.includes('/cubble/')) {
      // Navigate to cubble
      console.log('Navigate to cubble:', result);
    } else if (result.includes('/profile/')) {
      // Navigate to profile
      console.log('Navigate to profile:', result);
    } else if (result.includes('/event/')) {
      // Navigate to event
      console.log('Navigate to event:', result);
    }
  };

  const qrCodeTypes = [
    {
      type: 'cubble' as const,
      title: 'Cubble Access',
      description: 'Share your Cubble with others',
      data: { id: cubbleId || 'default' },
      available: !!cubbleId
    },
    {
      type: 'profile' as const,
      title: 'Your Profile',
      description: 'Let others connect with you',
      data: { userId: userId || 'default' },
      available: !!userId
    },
    {
      type: 'event' as const,
      title: 'Event Access',
      description: 'Share event details',
      data: { eventId: eventId || 'default' },
      available: !!eventId
    },
    {
      type: 'feedback' as const,
      title: 'Feedback Form',
      description: 'Collect user feedback',
      data: { feedbackId: 'general' },
      available: true
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-slate-900/50 border-teal-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-300">
            <QrCode className="w-6 h-6" />
            QR Code Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="generate" className="data-[state=active]:bg-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                Generate
              </TabsTrigger>
              <TabsTrigger value="scan" className="data-[state=active]:bg-teal-600">
                <Scan className="w-4 h-4 mr-2" />
                Scan
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-teal-600">
                <History className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {qrCodeTypes.map((qrType) => (
                  <div key={qrType.type} className={qrType.available ? '' : 'opacity-50'}>
                    <QRCodeGenerator
                      type={qrType.type}
                      data={qrType.data}
                      title={qrType.title}
                    />
                    <p className="text-xs text-slate-500 text-center mt-2">
                      {qrType.description}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scan" className="space-y-4">
              <div className="text-center space-y-4">
                <Button
                  onClick={() => setShowScanner(true)}
                  className="bg-teal-600 hover:bg-teal-700"
                  size="lg"
                >
                  <Scan className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
                <p className="text-sm text-slate-400">
                  Scan QR codes to access Cubbles, profiles, events, and more
                </p>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {scanHistory.length > 0 ? (
                <div className="space-y-2">
                  {scanHistory.map((result, index) => (
                    <Card key={index} className="bg-slate-800/50 border-slate-700">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300 truncate flex-1">
                            {result}
                          </span>
                          <Badge variant="outline" className="ml-2">
                            {new Date().toLocaleDateString()}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500 py-8">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No scan history yet</p>
                  <p className="text-sm">Start scanning QR codes to see them here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <QRCodeScanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onScanResult={handleScanResult}
      />
    </div>
  );
};