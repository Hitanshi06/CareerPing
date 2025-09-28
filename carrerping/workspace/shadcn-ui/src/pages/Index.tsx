import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Map, Users, Zap, Award, Bell, Search, Building, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Event Centralizer
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-slate-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => navigate('/events')} className="text-slate-300 hover:text-white transition-colors">Events</button>
              <button onClick={() => navigate('/map')} className="text-slate-300 hover:text-white transition-colors">Map</button>
              <button onClick={() => navigate('/companies')} className="text-slate-300 hover:text-white transition-colors">Companies</button>
              <button onClick={() => navigate('/profile')} className="text-slate-300 hover:text-white transition-colors">My Passport</button>
              <button className="text-slate-300 hover:text-white transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
            🏙️ Chicago Professional Events
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Corporate Event
            <br />
            Centralizer
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover hackathons, job fairs, workshops, and tech talks. Get live alerts and build your professional passport.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 relative"
              onClick={() => navigate('/events')}
              onMouseEnter={() => setIsHovered('browse')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Browse Events
              {isHovered === 'browse' && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-sm px-3 py-1 rounded-lg border border-slate-600 whitespace-nowrap">
                  See all upcoming events
                </div>
              )}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-6 py-6 border-2 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 relative"
              onClick={() => navigate('/map')}
              onMouseEnter={() => setIsHovered('map')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Map className="mr-2 h-5 w-5" />
              View Live Radar
              {isHovered === 'map' && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-sm px-3 py-1 rounded-lg border border-slate-600 whitespace-nowrap">
                  See events happening now
                </div>
              )}
            </Button>
          </div>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search events, companies, or topics..."
                className="pl-12 py-4 text-lg bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Chicago Professionals Choose Us
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stop missing opportunities. Get everything in one place.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Live Alerts</h3>
                <p className="text-slate-300 leading-relaxed">
                  Get real-time updates from organizers. Room changes, speaker delays, 
                  last-minute opportunities - never miss a beat.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Map className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Chicago Radar</h3>
                <p className="text-slate-300 leading-relaxed">
                  Interactive map showing live events across Chicago. 
                  Pulsing markers for events happening right now.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Professional Passport</h3>
                <p className="text-slate-300 leading-relaxed">
                  Automatically track your event attendance. 
                  Build a verified portfolio that impresses recruiters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Event Categories
            </h2>
            <p className="text-xl text-slate-300">
              Find the perfect events for your professional growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Hackathons', icon: Zap, color: 'from-purple-500 to-pink-500', count: '12 events' },
              { name: 'Career Fairs', icon: Building, color: 'from-green-500 to-emerald-500', count: '8 events' },
              { name: 'Workshops', icon: Star, color: 'from-orange-500 to-red-500', count: '15 events' },
              { name: 'Community', icon: Users, color: 'from-blue-500 to-indigo-500', count: '20 events' }
            ].map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="border-0 shadow-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{category.name}</h3>
                    <p className="text-slate-400 text-sm">{category.count}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-blue-400">500+</div>
              <div className="text-slate-300">Events This Month</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-green-400">50+</div>
              <div className="text-slate-300">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-purple-400">10K+</div>
              <div className="text-slate-300">Active Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-orange-400">95%</div>
              <div className="text-slate-300">Event Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Level Up Your Career?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of Chicago professionals who never miss an opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6"
              onClick={() => navigate('/login')}
            >
              <Users className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
              onClick={() => navigate('/events')}
            >
              Explore Events
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Event Centralizer</span>
          </div>
          <p className="text-slate-400 mb-4">
            Connecting Chicago professionals with opportunities that matter.
          </p>
          <p className="text-sm text-slate-500">
            © 2024 Corporate Event Centralizer. Built for Chicago professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}