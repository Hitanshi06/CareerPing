import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users, Clock } from 'lucide-react';
import { Event } from '@/lib/mockData';

interface EventCardProps {
  event: Event;
}

const categoryColors = {
  'Hackathons': 'bg-purple-100 text-purple-800 border-purple-200',
  'Job Fairs': 'bg-green-100 text-green-800 border-green-200',
  'Tech Talks': 'bg-blue-100 text-blue-800 border-blue-200',
  'Workshops': 'bg-orange-100 text-orange-800 border-orange-200'
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold leading-tight">{event.title}</CardTitle>
          {event.isLive && (
            <Badge variant="destructive" className="animate-pulse">
              LIVE
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge className={categoryColors[event.category]}>
            {event.category}
          </Badge>
          <span className="text-sm text-muted-foreground font-medium">{event.company}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{event.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{event.attendees} registered</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        
        <div className="pt-2">
          <Button className="w-full" size="sm">
            Register for Event
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}