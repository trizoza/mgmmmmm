# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for "Makers gonna make" - a website showcasing monthly hackathon-style events for indie hackers, creators, and entrepreneurs. The site displays upcoming and past events with registration links and event reports.

## Development Commands

- `bun dev` - Start development server on http://localhost:3000
- `bun build` - Build production application  
- `bun start` - Start production server
- `bun lint` - Run ESLint for code quality checks

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Geist and Geist Mono from next/font/google
- **Analytics**: SimpleAnalytics

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── EventCard.tsx - Reusable event display component
│   │   └── footer.tsx - Site footer component
│   ├── globals.css - Global styles and Tailwind imports
│   ├── layout.tsx - Root layout with fonts and metadata
│   └── page.tsx - Homepage with events data and main sections
```

### Key Components

**Event System**: 
- Events are defined as an array of `Event` objects in `src/app/page.tsx:21-157`
- Event interface defined at `src/app/page.tsx:7-19` with fields for date, title, capacity, attendees, location, images, and URLs
- Events are automatically filtered into "upcoming" and "past" based on current date
- EventCard component handles display logic for both upcoming and past events with different layouts

**EventCard Component**:
- Renders differently for upcoming vs past events (horizontal vs vertical layout)
- Includes hover effects for past events (switches between eventImageA and eventImageB)
- Handles registration links for upcoming events and report links for past events

### Data Management
- All event data is statically defined in the events array in `page.tsx`
- No external database or CMS - events are hardcoded and managed through code updates
- Images stored in `/public/` directory with consistent naming patterns

### Styling Approach
- Custom Tailwind classes throughout
- Responsive design with mobile-first approach
- Custom hover animations (title letters bounce on hover)
- Uses Unsplash background image for hero section

## Adding New Events

### Using the create-new-event Command
Use the `/create-new-event` command to quickly add new events:

```
/create-new-event --title "Event Title" --city "City" --date "Day, Month DD, YYYY, HH:MM AM/PM" --url "https://lu.ma/example" --capacity 20
```

- `capacity` defaults to 15 if omitted
- New events are added to the top of the events array
- Event images and report URLs are left empty for manual addition later

### Manual Event Addition
To manually add events, modify the `events` array in `src/app/page.tsx`. Ensure:
1. Add event images to `/public/` directory following naming conventions
2. Include all required Event interface fields
3. Use consistent date format: "Day, Month DD, YYYY, HH:MM AM/PM"
4. Maintain chronological order (newest first)