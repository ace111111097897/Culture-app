import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Plus, Star, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QRCodeManager } from '../QRCodeManager';

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showQRManager, setShowQRManager] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const events = [
    {
      id: '1',
      title: 'Diwali Festival Celebration',
      description: 'Join us for a vibrant celebration of lights, food, and culture',
      date: '2024-02-20',
      time: '18:00',
      location: 'Cultural Center',
      attendees: 156,
      maxAttendees: 200,
      price: 'Free',
      category: 'Festival',
      image: '🪔',
      organizer: 'Indian Cultural Society',
      isAttending: false
    },
    {
      id: '2',
      title: 'Salsa Dancing Workshop',
      description: 'Learn traditional salsa moves with professional instructors',
      date: '2024-02-18',
      time: '19:30',
      location: 'Dance Studio Downtown',
      attendees: 24,
      maxAttendees: 30,
      price: '$25',
      category: 'Workshop',
      image: '💃',
      organizer: 'Latin Dance Academy',
      isAttending: true
    },
    {
      id: '3',
      title: 'Japanese Tea Ceremony',
      description: 'Experience the art and mindfulness of traditional tea ceremony',
      date: '2024-02-22',
      time: '15:00',
      location: 'Zen Garden',
      attendees: 12,
      maxAttendees: 15,
      price: '$40',
      category: 'Cultural',
      image: '🍵',
      organizer: 'Japanese Cultural Center',
      isAttending: false
    }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: events.length },
    { id: 'my-events', label: 'My Events', count: events.filter(e => e.isAttending).length },
    { id: 'past', label: 'Past Events', count: 5 }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'festival', label: 'Festivals' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'food', label: 'Food & Drink' },
    { id: 'music', label: 'Music & Dance' }
  ];

  const handleShareEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowQRManager(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Events
        </h1>
        <p className="text-gray-600">Cultural events and gatherings near you</p>
      </div>

      {/* QR Code Manager Modal */}
      {showQRManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Event QR Codes</h2>
              <Button variant="ghost" onClick={() => setShowQRManager(false)}>
                ×
              </Button>
            </div>
            <QRCodeManager 
              userId="current-user"
              eventId={selectedEventId || undefined}
            />
          </div>
        </div>
      )}

      {/* Search and Create */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-teal-200 focus:border-teal-400"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 border-teal-200 hover:bg-teal-50">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
          <Button 
            onClick={() => setShowQRManager(true)}
            variant="outline" 
            className="flex items-center gap-2 border-teal-200 hover:bg-teal-50"
          >
            <QrCode className="h-4 w-4" />
            QR Codes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 text-white' 
                : 'border-teal-200 hover:bg-teal-50'
            }`}
          >
            {tab.label}
            <Badge variant="secondary" className="text-xs">
              {tab.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="sm"
            className="whitespace-nowrap border-teal-200 hover:bg-teal-50"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'my-events' ? events.filter(e => e.isAttending) : events).map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-teal-100">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="text-4xl mb-2">{event.image}</div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs border-teal-200 text-teal-600">
                    {event.category}
                  </Badge>
                  <Button
                    onClick={() => handleShareEvent(event.id)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                  >
                    <QrCode className="h-3 w-3 text-teal-600" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg text-gray-900">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal-600" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-teal-600" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal-600" />
                  {event.attendees}/{event.maxAttendees} attending
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant={event.price === 'Free' ? 'secondary' : 'default'} className="bg-teal-100 text-teal-700">
                  {event.price}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">4.9</span>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                by {event.organizer}
              </div>

              <Button 
                className={`w-full ${
                  event.isAttending 
                    ? 'border-teal-200 hover:bg-teal-50' 
                    : 'bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700'
                }`}
                variant={event.isAttending ? "outline" : "default"}
              >
                {event.isAttending ? 'View Details' : 'Join Event'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Past Events */}
      {activeTab === 'past' && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No past events yet</h3>
          <p className="text-gray-500">Events you've attended will appear here</p>
        </div>
      )}
    </div>
  );
};

export default EventsPage;