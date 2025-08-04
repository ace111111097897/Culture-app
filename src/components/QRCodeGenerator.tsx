import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QrCode, Download, Share2, Copy } from 'lucide-react';

interface QRCodeGeneratorProps {
  type: 'cubble' | 'profile' | 'event' | 'content' | 'feedback' | 'special';
  data: any;
  title?: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ type, data, title }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      // Generate QR code data based on type
      let qrData = '';
      switch (type) {
        case 'cubble':
          qrData = `https://cubble.app/cubble/${data.id}`;
          break;
        case 'profile':
          qrData = `https://cubble.app/profile/${data.userId}`;
          break;
        case 'event':
          qrData = `https://cubble.app/event/${data.eventId}`;
          break;
        case 'content':
          qrData = `https://cubble.app/content/${data.contentId}`;
          break;
        case 'feedback':
          qrData = `https://cubble.app/feedback/${data.feedbackId}`;
          break;
        case 'special':
          qrData = `https://cubble.app/special/${data.code}`;
          break;
      }

      // Use QR code API service
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&bgcolor=0f172a&color=06b6d4`;
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [type, data]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `cubble-qr-${type}-${Date.now()}.png`;
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrCodeUrl);
  };

  const getTypeColor = () => {
    switch (type) {
      case 'cubble': return 'bg-gradient-to-r from-teal-500 to-cyan-500';
      case 'profile': return 'bg-gradient-to-r from-blue-500 to-purple-500';
      case 'event': return 'bg-gradient-to-r from-green-500 to-teal-500';
      case 'content': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'feedback': return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'special': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default: return 'bg-gradient-to-r from-teal-500 to-cyan-500';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-900/50 border-teal-500/20">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-teal-300">
          <QrCode className="w-5 h-5" />
          {title || `${type.charAt(0).toUpperCase() + type.slice(1)} QR Code`}
        </CardTitle>
        <Badge className={`${getTypeColor()} text-white`}>
          {type.toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          {qrCodeUrl ? (
            <div className="p-4 bg-white rounded-lg">
              <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
            </div>
          ) : (
            <div className="w-48 h-48 bg-slate-800 rounded-lg flex items-center justify-center">
              {isGenerating ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              ) : (
                <QrCode className="w-12 h-12 text-slate-600" />
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1 bg-teal-600 hover:bg-teal-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleCopyLink} variant="outline" className="flex-1 border-teal-500/50 text-teal-300">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};