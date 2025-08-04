import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider } from '@/components/AccessibilityProvider';
import CultureAppMain from '@/components/CultureAppMain';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AccessibilityProvider>
          <TooltipProvider>
            <Router>
              <div className="min-h-screen bg-background font-sans antialiased max-w-full overflow-x-hidden portrait:max-w-screen portrait:w-full">
                <Routes>
                  <Route path="/" element={<CultureAppMain />} />
                  <Route path="/legacy" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Toaster />
            </Router>
          </TooltipProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;