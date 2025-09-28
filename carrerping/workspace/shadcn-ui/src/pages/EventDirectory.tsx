import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Bell, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FilterBar from '@/components/FilterBar';
import { mockEvents } from '@/lib/mockData';

export default function EventDirectory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesCompany = selectedCompany === 'All' || event.company === selectedCompany;
      
      return matchesSearch && matchesCategory && matchesCompany;
    });
  }, [searchTerm, selectedCategory, selectedCompany]);

  const categoryColors = {
    'Hackathons': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Job Fairs': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Tech Talks': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Workshops': 'bg-orange-500/20 text-orange-300 border-orange-500/30'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center text-slate-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Event Directory</h1>
                <p className="text-sm text-slate-400">
                  {filteredEvents.length} events found in Chicago
                </p>
              </div>
            </div>
            <Button onClick={() => navigate('/map')} className="bg-blue-600 hover:bg-blue-700">
              View on Map
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl bg-slate-800/50 border border-slate-700">
            <CardContent className="p-6">
              <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
              />
              <div className="mt-4">
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="All">All Formats</SelectItem>
                    <SelectItem value="In-person">In-person</SelectItem>
                    <SelectItem value="Virtual">Virtual</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id} 
                className="border-0 shadow-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all duration-300 group cursor-pointer"
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                            <span className="font-medium text-slate-300">{event.company}</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {event.isLive && (
                            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 animate-pulse">
                              🔴 LIVE
                            </Badge>
                          )}
                          <Badge className={categoryColors[event.category]}>
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} registered</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      
                      {hoveredEvent === event.id && (
                        <div className="bg-slate-700/50 rounded-lg p-4 mb-4 border border-slate-600">
                          <h4 className="font-semibold text-white mb-2">Event Highlights</h4>
                          <ul className="text-sm text-slate-300 space-y-1">
                            <li>• Networking opportunities with industry professionals</li>
                            <li>• Interactive sessions and Q&A</li>
                            <li>• Professional development certificates available</li>
                            <li>• Light refreshments provided</li>
                          </ul>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Register Now
                            </Button>
                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500">
                              <Bell className="h-4 w-4 mr-1" />
                              Add Reminder
                            </Button>
                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              View on Map
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {hoveredEvent !== event.id && (
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Register for Event
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-slate-400">
                        Hover for quick actions
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Calendar className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
            <p className="text-slate-400 mb-4">
              Try adjusting your search criteria or check back later for new events.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedCompany('All');
              }}
              className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}