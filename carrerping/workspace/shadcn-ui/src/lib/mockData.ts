export interface Event {
  id: string;
  title: string;
  category: 'Hackathons' | 'Job Fairs' | 'Tech Talks' | 'Workshops';
  company: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  attendees: number;
  isLive: boolean;
  lat: number;
  lng: number;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Chicago Tech Hiring Fair 2024',
    category: 'Job Fairs',
    company: 'TechStars Chicago',
    date: '2024-10-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Navy Pier Convention Center',
    address: '600 E Grand Ave, Chicago, IL 60611',
    description: 'Connect with 50+ tech companies hiring in Chicago. Bring your resume and portfolio.',
    attendees: 245,
    isLive: true,
    lat: 41.8917,
    lng: -87.6086
  },
  {
    id: '2',
    title: 'AI/ML Hackathon Weekend',
    category: 'Hackathons',
    company: 'Northwestern University',
    date: '2024-10-20',
    time: '9:00 AM - 6:00 PM',
    location: 'Northwestern Campus',
    address: '633 Clark St, Evanston, IL 60208',
    description: '48-hour hackathon focused on AI and machine learning solutions for healthcare.',
    attendees: 120,
    isLive: false,
    lat: 42.0565,
    lng: -87.6753
  },
  {
    id: '3',
    title: 'React & Next.js Workshop',
    category: 'Workshops',
    company: 'Dev Bootcamp Chicago',
    date: '2024-10-12',
    time: '2:00 PM - 6:00 PM',
    location: 'WeWork River North',
    address: '515 N State St, Chicago, IL 60654',
    description: 'Hands-on workshop covering React hooks, Next.js 14, and modern deployment strategies.',
    attendees: 85,
    isLive: true,
    lat: 41.8919,
    lng: -87.6278
  },
  {
    id: '4',
    title: 'Scaling Startups: CTO Insights',
    category: 'Tech Talks',
    company: 'Chicago Startup Week',
    date: '2024-10-18',
    time: '7:00 PM - 9:00 PM',
    location: '1871 Chicago',
    address: '222 Merchandise Mart Plaza, Chicago, IL 60654',
    description: 'Panel discussion with CTOs from successful Chicago startups about scaling engineering teams.',
    attendees: 156,
    isLive: false,
    lat: 41.8881,
    lng: -87.6353
  },
  {
    id: '5',
    title: 'Fintech Innovation Challenge',
    category: 'Hackathons',
    company: 'CME Group',
    date: '2024-10-25',
    time: '8:00 AM - 8:00 PM',
    location: 'CME Group Headquarters',
    address: '20 S Wacker Dr, Chicago, IL 60606',
    description: 'Build innovative fintech solutions using CME Group APIs and data feeds.',
    attendees: 89,
    isLive: false,
    lat: 41.8781,
    lng: -87.6364
  },
  {
    id: '6',
    title: 'UX/UI Design Career Fair',
    category: 'Job Fairs',
    company: 'AIGA Chicago',
    date: '2024-10-22',
    time: '11:00 AM - 3:00 PM',
    location: 'Chicago Cultural Center',
    address: '78 E Washington St, Chicago, IL 60602',
    description: 'Meet with design agencies, tech companies, and startups looking for UX/UI talent.',
    attendees: 198,
    isLive: false,
    lat: 41.8837,
    lng: -87.6247
  }
];

export const categories = ['All', 'Hackathons', 'Job Fairs', 'Tech Talks', 'Workshops'] as const;
export const companies = ['All', ...Array.from(new Set(mockEvents.map(event => event.company)))];