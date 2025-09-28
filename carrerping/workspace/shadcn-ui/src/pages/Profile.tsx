import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Share2, Calendar, MapPin, Award, Users, ExternalLink, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const attendedEvents = [
    {
      id: '1',
      title: 'Chicago Tech Hiring Fair 2024',
      category: 'Job Fairs',
      company: 'TechStars Chicago',
      date: '2024-09-15',
      status: 'attended',
      badge: 'Networking Pro'
    },
    {
      id: '2',
      title: 'React & Next.js Workshop',
      category: 'Workshops',
      company: 'Dev Bootcamp Chicago',
      date: '2024-09-12',
      status: 'attended',
      badge: 'Skill Builder'
    },
    {
      id: '3',
      title: 'AI/ML Hackathon Weekend',
      category: 'Hackathons',
      company: 'Northwestern University',
      date: '2024-08-20',
      status: 'attended',
      badge: 'Innovation Champion'
    }
  ];

  const upcomingEvents = [
    {
      id: '4',
      title: 'Scaling Startups: CTO Insights',
      category: 'Tech Talks',
      company: 'Chicago Startup Week',
      date: '2024-10-18',
      status: 'registered'
    },
    {
      id: '5',
      title: 'Fintech Innovation Challenge',
      category: 'Hackathons',
      company: 'CME Group',
      date: '2024-10-25',
      status: 'registered'
    }
  ];

  const achievements = [
    { name: 'Event Explorer', description: 'Attended 5+ events', icon: Trophy, earned: true },
    { name: 'Networking Master', description: 'Attended 3+ job fairs', icon: Users, earned: true },
    { name: 'Skill Collector', description: 'Completed 5+ workshops', icon: Award, earned: false },
    { name: 'Innovation Leader', description: 'Won a hackathon', icon: Star, earned: false }
  ];

  const categoryColors = {
    'Hackathons': 'bg-purple-100 text-purple-800 border-purple-200',
    'Job Fairs': 'bg-green-100 text-green-800 border-green-200',
    'Tech Talks': 'bg-blue-100 text-blue-800 border-blue-200',
    'Workshops': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">John Smith</h1>
                  <p className="text-gray-600 mb-2">Software Engineer</p>
                  <p className="text-sm text-gray-500 mb-4">Chicago, IL</p>
                  
                  <div className="flex justify-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-blue-600">12</div>
                      <div className="text-gray-500">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">8</div>
                      <div className="text-gray-500">Attended</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">4</div>
                      <div className="text-gray-500">Badges</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn Profile
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub Portfolio
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Personal Website
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        achievement.earned 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-gray-50 border border-gray-200 opacity-60'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className={`text-sm font-medium ${
                          achievement.earned ? 'text-green-900' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Professional Passport</CardTitle>
                <p className="text-gray-600">
                  Your verified event attendance history and professional development journey
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="attended" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="attended">Attended Events</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="attended" className="mt-6">
                    <div className="space-y-4">
                      {attendedEvents.map((event) => (
                        <Card key={event.id} className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                  <span className="font-medium">{event.company}</span>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(event.date).toLocaleDateString('en-US', { 
                                      year: 'numeric',
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge className={categoryColors[event.category as keyof typeof categoryColors]}>
                                    {event.category}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    ✓ Verified Attendance
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mb-2">
                                  <Award className="h-3 w-3 mr-1" />
                                  {event.badge}
                                </Badge>
                                <div className="text-sm text-gray-500">
                                  Added to portfolio
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upcoming" className="mt-6">
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <Card key={event.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                  <span className="font-medium">{event.company}</span>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(event.date).toLocaleDateString('en-US', { 
                                      year: 'numeric',
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge className={categoryColors[event.category as keyof typeof categoryColors]}>
                                    {event.category}
                                  </Badge>
                                  <Badge variant="outline" className="border-blue-200 text-blue-800">
                                    📅 Registered
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}