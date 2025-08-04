import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, X, Scan, Upload } from 'lucide-react';

interface QRCodeScannerProps {
  onScanResult: (result: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanResult, onClose, isOpen }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Camera access denied or not available');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate QR code reading from file
      // In a real implementation, you'd use a QR code library
      const reader = new FileReader();
      reader.onload = () => {
        // Mock QR code result
        onScanResult('https://cubble.app/mock-qr-result');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-teal-500/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-teal-300">
            <Scan className="w-5 h-5" />
            Scan QR Code
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <div className="text-center space-y-4">
              <Badge variant="destructive">{error}</Badge>
              <div className="space-y-2">
                <p className="text-sm text-slate-400">Upload QR code image instead:</p>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-black rounded-lg object-cover"
                />
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-teal-500 rounded-lg animate-pulse">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-teal-500 rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-teal-500 rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-teal-500 rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-teal-500 rounded-br-lg"></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button onClick={startCamera} className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <Camera className="w-4 h-4 mr-2" />
                  {isScanning ? 'Scanning...' : 'Start Camera'}
                </Button>
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="outline" className="w-full border-teal-500/50 text-teal-300">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </label>
              </div>
            </div>
          )}
          
          <p className="text-xs text-slate-500 text-center">
            Point your camera at a QR code or upload an image
          </p>
        </CardContent>
      </Card>
    </div>
  );
};