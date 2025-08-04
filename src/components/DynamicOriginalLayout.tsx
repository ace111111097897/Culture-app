import React, { useState, useEffect } from 'react';
import { Heart, Users, Globe, Sparkles, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import CubbleCultureLogo from './CubbleCultureLogo';

interface DynamicOriginalLayoutProps {
  children?: React.ReactNode;
}

const DynamicOriginalLayout: React.FC<DynamicOriginalLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'discover', label: 'Discover', icon: Globe },
    { id: 'premium', label: 'Premium', icon: Sparkles }

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
      {/* Dynamic Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <CubbleCultureLogo size="md" showTagline />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white'
                        : 'text-gray-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Culture Bubbles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-20 h-20 rounded-full bg-gradient-to-br from-teal-200/30 to-emerald-300/30 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <main className="relative pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center py-16 space-y-6">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
                Cultural
              </h1>
              <div className="absolute -top-4 -right-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full animate-bounce"></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
              Connections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover meaningful relationships through shared cultural experiences and values
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:opacity-90">
                Start Connecting
              </Button>
              <Button size="lg" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                Learn More
              </Button>
            </div>
          </div>

          {/* Dynamic Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[
              { title: 'Cultural Matching', icon: Heart, desc: 'AI-powered cultural compatibility' },
              { title: 'Global Community', icon: Globe, desc: 'Connect across cultures worldwide' },
              { title: 'Shared Experiences', icon: Users, desc: 'Build bonds through activities' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Custom Children Content */}
          {children && (
            <div className="py-8">
              {children}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DynamicOriginalLayout;