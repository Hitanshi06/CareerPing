import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Calendar, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockEvents, categories } from '@/lib/mockData';

export default function MapView() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const filteredEvents = mockEvents.filter(event => 
    selectedCategory === 'All' || event.category === selectedCategory
  );

  const categoryColors = {
    'Hackathons': 'bg-purple-500',
    'Job Fairs': 'bg-green-500',
    'Tech Talks': 'bg-blue-500',
    'Workshops': 'bg-orange-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chicago Events Radar</h1>
                <p className="text-sm text-gray-600">
                  Live map of professional events
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => navigate('/events')}>
                List View
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] relative overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Chicago Events Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                {/* Simulated Map */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                  {/* Chicago Outline Simulation */}
                  <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border-2 border-blue-200 shadow-inner">
                    <div className="absolute top-4 left-4 text-sm font-medium text-blue-700">
                      Chicago, IL
                    </div>
                    
                    {/* Event Markers */}
                    {filteredEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                          event.isLive ? 'animate-pulse' : ''
                        }`}
                        style={{
                          left: `${20 + (index % 3) * 25 + Math.random() * 10}%`,
                          top: `${20 + Math.floor(index / 3) * 20 + Math.random() * 10}%`
                        }}
                        onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                      >
                        <div className={`w-4 h-4 rounded-full ${categoryColors[event.category]} border-2 border-white shadow-lg`}>
                          {event.isLive && (
                            <div className={`absolute inset-0 rounded-full ${categoryColors[event.category]} animate-ping opacity-75`}></div>
                          )}
                        </div>
                        
                        {/* Event Popup */}
                        {selectedEvent === event.id && (
                          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl border z-10 p-3">
                            <div className="text-sm font-semibold mb-1">{event.title}</div>
                            <div className="text-xs text-gray-600 mb-2">{event.company}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                            <Button size="sm" className="w-full mt-2 text-xs">
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Legend */}
                    <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 border">
                      <div className="text-xs font-semibold mb-2">Event Types</div>
                      {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center gap-2 text-xs mb-1">
                          <div className={`w-3 h-3 rounded-full ${color}`}></div>
                          <span>{category}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 text-xs mt-2 pt-2 border-t">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <span>Live Events</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event List Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <p className="text-sm text-gray-600">
                  {filteredEvents.length} events {selectedCategory !== 'All' && `in ${selectedCategory}`}
                </p>
              </CardHeader>
            </Card>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedEvent === event.id ? 'ring-2 ring-blue-500 shadow-md' : ''
                  } ${event.isLive ? 'border-l-4 border-l-red-500' : ''}`}
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm leading-tight">{event.title}</h3>
                      {event.isLive && (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          LIVE
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-2">{event.company}</div>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time.split(' - ')[0]}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${
                        event.category === 'Hackathons' ? 'bg-purple-100 text-purple-800' :
                        event.category === 'Job Fairs' ? 'bg-green-100 text-green-800' :
                        event.category === 'Tech Talks' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {event.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        {event.attendees}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}