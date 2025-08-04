import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, Search, Filter } from 'lucide-react';

const EventsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Japanese Tea Ceremony Workshop',
      date: 'March 15, 2024',
      time: '2:00 PM - 4:00 PM',
      location: 'Cultural Center Downtown',
      type: 'Workshop',
      attendees: 45,
      maxAttendees: 60,
      culture: 'Japanese',
      description: 'Learn the traditional art of Japanese tea ceremony'
    },
    {
      id: 2,
      title: 'Diwali Festival Celebration',
      date: 'March 20, 2024',
      time: '6:00 PM - 10:00 PM',
      location: 'Community Park',
      type: 'Festival',
      attendees: 234,
      maxAttendees: 500,
      culture: 'Indian',
      description: 'Celebrate the festival of lights with music, dance, and food'
    },
    {
      id: 3,
      title: 'African Drumming Circle',
      date: 'March 22, 2024',
      time: '7:00 PM - 9:00 PM',
      location: 'Music Hall',
      type: 'Performance',
      attendees: 67,
      maxAttendees: 100,
      culture: 'African',
      description: 'Experience traditional African rhythms and drumming'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.culture.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Cultural Events</h1>
          <p className="text-gray-600">Discover and join cultural events near you</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events or cultures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="workshop">Workshops</SelectItem>
            <SelectItem value="festival">Festivals</SelectItem>
            <SelectItem value="performance">Performances</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{event.type}</Badge>
                  <Badge variant="outline">{event.culture}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}/{event.maxAttendees} attending</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Learn More</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">RSVP</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsSection;