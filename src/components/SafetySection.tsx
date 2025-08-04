import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Phone, MapPin, Users, Lock, Eye, MessageSquare } from 'lucide-react';

const SafetySection: React.FC = () => {
  const safetyGuidelines = [
    {
      id: 1,
      title: 'Meeting in Public',
      description: 'Always meet new connections in public places like cafes, restaurants, or cultural centers.',
      icon: MapPin,
      priority: 'High'
    },
    {
      id: 2,
      title: 'Tell Someone Your Plans',
      description: 'Share your meeting details with a trusted friend or family member.',
      icon: Users,
      priority: 'High'
    },
    {
      id: 3,
      title: 'Trust Your Instincts',
      description: 'If something feels off, don\'t hesitate to leave or end the conversation.',
      icon: Eye,
      priority: 'Critical'
    },
    {
      id: 4,
      title: 'Protect Personal Information',
      description: 'Don\'t share sensitive details like home address, financial info, or workplace initially.',
      icon: Lock,
      priority: 'High'
    },
    {
      id: 5,
      title: 'Video Chat First',
      description: 'Consider video calling before meeting in person to verify identity.',
      icon: MessageSquare,
      priority: 'Medium'
    },
    {
      id: 6,
      title: 'Emergency Contacts',
      description: 'Keep emergency contacts easily accessible on your phone.',
      icon: Phone,
      priority: 'Critical'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Safety & Security</h1>
          <p className="text-gray-600">Your safety is our top priority</p>
        </div>
      </div>

      {/* Emergency Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Emergency Assistance</h3>
              <p className="text-sm text-red-700">If you feel unsafe, contact local emergency services immediately.</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Call 911
            </Button>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700">
              Report User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Safety Guidelines */}
      <div className="grid gap-4 md:grid-cols-2">
        {safetyGuidelines.map((guideline) => {
          const IconComponent = guideline.icon;
          return (
            <Card key={guideline.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{guideline.title}</CardTitle>
                  </div>
                  <Badge className={getPriorityColor(guideline.priority)}>
                    {guideline.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700">{guideline.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Safety Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-blue-600" />
            Platform Safety Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Profile Verification</h4>
              <p className="text-sm text-blue-700">All profiles go through verification to ensure authenticity.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Block & Report</h4>
              <p className="text-sm text-purple-700">Easily block or report users who violate community guidelines.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Safe Chat</h4>
              <p className="text-sm text-green-700">Our messaging system filters inappropriate content automatically.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">24/7 Support</h4>
              <p className="text-sm text-orange-700">Our safety team monitors the platform around the clock.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            If you encounter any safety concerns or need assistance, don't hesitate to reach out to our support team.
          </p>
          <div className="flex gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              Contact Support
            </Button>
            <Button variant="outline">
              Safety Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetySection;