# Corporate Event Centralizer - MVP Todo

## Core Files to Create/Modify:

1. **index.html** - Update title and meta tags for the app
2. **src/pages/Index.tsx** - Hero page with title, tagline, and CTAs
3. **src/pages/EventDirectory.tsx** - Event listing with filters and search
4. **src/pages/MapView.tsx** - Interactive Chicago map with event markers
5. **src/pages/Login.tsx** - Authentication page
6. **src/pages/Profile.tsx** - Professional passport/profile page
7. **src/components/EventCard.tsx** - Individual event display component
8. **src/components/FilterBar.tsx** - Event filtering component
9. **src/lib/mockData.ts** - Mock event data for MVP demonstration

## MVP Features Implementation:

### 1. Hero/Home Page (Index.tsx)
- Clean hero section with app title and tagline
- Three main CTAs: Browse Events, View Map, Sign Up
- Modern gradient design with Chicago theme

### 2. Event Directory (EventDirectory.tsx)
- Grid layout of event cards
- Filter by category (Hackathons, Job Fairs, Tech Talks, Workshops)
- Search functionality
- Date and company filters

### 3. Map View (MapView.tsx)
- Static Chicago map with event markers
- Event popup on marker click
- Filter events by category on map

### 4. Authentication (Login.tsx)
- Simple email/password form
- Sign up and login options
- Basic form validation

### 5. Professional Passport (Profile.tsx)
- User profile with attended events
- Event badges/history
- Exportable portfolio concept

### 6. Components
- EventCard: Display event info, category, date, location
- FilterBar: Category, date, and search filters

### 7. Mock Data
- Sample Chicago corporate events
- Different categories and companies
- Realistic event data for demonstration

## Tech Stack:
- React + TypeScript
- Shadcn/UI components
- Tailwind CSS for styling
- React Router for navigation
- Mock data (no external APIs for MVP)

## File Relationships:
- App.tsx routes to all pages
- EventDirectory and MapView use EventCard component
- FilterBar used in EventDirectory
- All pages use mockData for event information
- Consistent styling with Tailwind and Shadcn components