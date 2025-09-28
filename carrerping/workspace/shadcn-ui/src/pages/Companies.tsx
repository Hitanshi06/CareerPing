import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Building, MapPin, Calendar, Users, Star, Bell, ExternalLink, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  verified: boolean;
  followers: number;
  upcomingEvents: number;
  pastEvents: number;
  categories: string[];
  location: string;
}

interface APIResponse {
  id?: string;
  name?: string;
  company?: string;
  title?: string;
  logo?: string;
  description?: string;
  summary?: string;
  verified?: boolean;
  followers?: number;
  upcomingEvents?: number;
  pastEvents?: number;
  categories?: string[];
  location?: string;
  [key: string]: unknown;
}

export default function Companies() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Default companies to show when no search is performed
  const defaultCompanies: Company[] = [
    {
      id: '1',
      name: 'Amazon Web Services',
      logo: '🟠',
      description: 'Cloud computing platform and services',
      verified: true,
      followers: 2450,
      upcomingEvents: 3,
      pastEvents: 12,
      categories: ['Tech Talks', 'Workshops'],
      location: 'Chicago, IL'
    },
    {
      id: '2',
      name: 'Accenture',
      logo: '🔷',
      description: 'Global professional services company',
      verified: true,
      followers: 1890,
      upcomingEvents: 2,
      pastEvents: 8,
      categories: ['Job Fairs', 'Workshops'],
      location: 'Chicago, IL'
    },
    {
      id: '3',
      name: 'Discover Financial',
      logo: '🟡',
      description: 'Digital banking and payment services',
      verified: true,
      followers: 1234,
      upcomingEvents: 1,
      pastEvents: 6,
      categories: ['Hackathons', 'Tech Talks'],
      location: 'Riverwoods, IL'
    },
    {
      id: '4',
      name: 'CME Group',
      logo: '🔵',
      description: 'Financial derivatives marketplace',
      verified: true,
      followers: 987,
      upcomingEvents: 2,
      pastEvents: 5,
      categories: ['Hackathons', 'Job Fairs'],
      location: 'Chicago, IL'
    },
    {
      id: '5',
      name: 'Northwestern University',
      logo: '🟣',
      description: 'Private research university',
      verified: true,
      followers: 3456,
      upcomingEvents: 4,
      pastEvents: 15,
      categories: ['Hackathons', 'Workshops', 'Tech Talks'],
      location: 'Evanston, IL'
    },
    {
      id: '6',
      name: 'TechStars Chicago',
      logo: '⭐',
      description: 'Startup accelerator and venture capital',
      verified: true,
      followers: 1567,
      upcomingEvents: 2,
      pastEvents: 9,
      categories: ['Job Fairs', 'Tech Talks'],
      location: 'Chicago, IL'
    }
  ];

  // Initialize with default companies
  useEffect(() => {
    setCompanies(defaultCompanies);
  }, []);

  // Function to fetch data from API
  const fetchCompaniesFromAPI = async (query: string) => {
    if (!query.trim()) {
      setCompanies(defaultCompanies);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://172.16.131.227:8000`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          type: 'companies'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform API response to match our Company interface
      let transformedCompanies: Company[] = [];
      
      if (Array.isArray(data)) {
        transformedCompanies = data.map((item: APIResponse, index: number) => ({
          id: item.id || `api-${index}`,
          name: item.name || item.company || item.title || 'Unknown Company',
          logo: item.logo || '🏢',
          description: item.description || item.summary || 'No description available',
          verified: item.verified || false,
          followers: item.followers || Math.floor(Math.random() * 3000) + 100,
          upcomingEvents: item.upcomingEvents || Math.floor(Math.random() * 5) + 1,
          pastEvents: item.pastEvents || Math.floor(Math.random() * 20) + 1,
          categories: item.categories || ['Tech Talks'],
          location: item.location || 'Chicago, IL'
        }));
      } else if (data && typeof data === 'object') {
        // If single object response
        const apiData = data as APIResponse;
        transformedCompanies = [{
          id: apiData.id || 'api-1',
          name: apiData.name || apiData.company || apiData.title || 'API Result',
          logo: apiData.logo || '🏢',
          description: apiData.description || apiData.summary || JSON.stringify(data),
          verified: apiData.verified || false,
          followers: apiData.followers || Math.floor(Math.random() * 3000) + 100,
          upcomingEvents: apiData.upcomingEvents || Math.floor(Math.random() * 5) + 1,
          pastEvents: apiData.pastEvents || Math.floor(Math.random() * 20) + 1,
          categories: apiData.categories || ['Tech Talks'],
          location: apiData.location || 'Chicago, IL'
        }];
      } else {
        // If response is just text or other format
        transformedCompanies = [{
          id: 'api-response',
          name: 'API Response',
          logo: '📡',
          description: typeof data === 'string' ? data : JSON.stringify(data),
          verified: false,
          followers: 0,
          upcomingEvents: 0,
          pastEvents: 0,
          categories: ['API Response'],
          location: 'Remote'
        }];
      }

      setCompanies(transformedCompanies);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch data from API. Showing default results.');
      setCompanies(defaultCompanies.filter(company =>
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.description.toLowerCase().includes(query.toLowerCase())
      ));
    } finally {
      setLoading(false);
    }
  };

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCompaniesFromAPI(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const categoryColors = {
    'Hackathons': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Job Fairs': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Tech Talks': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Workshops': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'API Response': 'bg-red-500/20 text-red-300 border-red-500/30'
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
                <h1 className="text-2xl font-bold text-white">Company Profiles</h1>
                <p className="text-sm text-slate-400">
                  {companies.length} companies hosting events in Chicago
                  {searchTerm && ' (API Results)'}
                </p>
              </div>
            </div>
            <Button onClick={() => navigate('/events')} className="bg-blue-600 hover:bg-blue-700">
              View All Events
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            {loading ? (
              <Loader2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 animate-spin" />
            ) : (
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            )}
            <Input
              placeholder="Search companies via API (try any query)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
            />
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-2">
              {error}
            </div>
          )}
          {searchTerm && (
            <div className="mt-2 text-sm text-blue-400">
              🔗 Fetching results from: http://172.16.131.227:8000
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-slate-300">Fetching data from API...</span>
          </div>
        )}

        {/* Companies Grid */}
        {!loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Card key={company.id} className="border-0 shadow-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                        {company.logo}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                          {company.name}
                          {company.verified && (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm text-slate-400 mt-1">
                          <MapPin className="h-3 w-3" />
                          {company.location}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500">
                      <Bell className="h-4 w-4 mr-1" />
                      Follow
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {company.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {company.categories.map((category) => (
                      <Badge key={category} className={categoryColors[category as keyof typeof categoryColors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}>
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-slate-700">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{company.followers}</div>
                      <div className="text-xs text-slate-400">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{company.upcomingEvents}</div>
                      <div className="text-xs text-slate-400">Upcoming</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">{company.pastEvents}</div>
                      <div className="text-xs text-slate-400">Past Events</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Calendar className="h-4 w-4 mr-1" />
                      View Events
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && companies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Building className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No companies found</h3>
            <p className="text-slate-400 mb-4">
              Try adjusting your search criteria or check back later for new companies.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')}
              className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}