import { NextResponse } from 'next/server';
import ICAL from 'ical.js';

const ICAL_URLS = [
  { url: 'https://api2.luma.com/ics/get?entity=calendar&id=cal-n64Hav2BOilAax5', location: 'Edinburgh' },
  { url: 'https://api2.luma.com/ics/get?entity=calendar&id=cal-bffgrpCSNSdMw9X', location: 'Dundee' },
];

async function fetchEventThumbnail(eventUrl: string): Promise<string> {
  try {
    if (!eventUrl) return '';

    const response = await fetch(eventUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EventBot/1.0)',
      },
    });

    if (!response.ok) return '';

    const html = await response.text();

    // Try to extract from JSON-LD schema
    const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    if (jsonLdMatch) {
      try {
        const jsonLd = JSON.parse(jsonLdMatch[1]);
        if (jsonLd.image) {
          // Handle both string and array formats
          return Array.isArray(jsonLd.image) ? jsonLd.image[0] : jsonLd.image;
        }
      } catch {
        // Continue to next method
      }
    }

    // Try to extract from og:image meta tag
    const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    if (ogImageMatch) {
      return ogImageMatch[1];
    }

    return '';
  } catch (error) {
    console.error('Error fetching thumbnail:', error);
    return '';
  }
}

async function fetchIcalCalendar(icalUrl: string, overrideLocation: string | null) {
  try {
    const response = await fetch(icalUrl, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.error(`Failed to fetch iCal from ${icalUrl}`);
      return [];
    }

    const icalData = await response.text();

    // Parse iCal data
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const now = new Date();

    // Parse all events
    const parsedEvents = vevents
      .map((vevent: ICAL.Component) => {
        const event = new ICAL.Event(vevent);

        const description = event.description || '';
        const locationFieldRaw = vevent.getFirstPropertyValue('location');
        const locationField = typeof locationFieldRaw === 'string' ? locationFieldRaw : '';

        // Extract Luma URL from description (format: "Get up-to-date information at: https://luma.com/xxxxx")
        let eventUrl = '';
        const lumaUrlMatch = description.match(/https:\/\/luma\.com\/[a-zA-Z0-9]+/);
        if (lumaUrlMatch) {
          // Convert luma.com to lu.ma format to match hardcoded events
          eventUrl = lumaUrlMatch[0].replace('luma.com', 'lu.ma');
        }

        // Try to extract actual location from description
        // Luma puts it after "Address:\n"
        let location = 'To be announced';
        if (overrideLocation) {
          // Use the override location for this calendar
          location = overrideLocation;
        } else {
          const addressMatch = description.match(/Address:\s*\n([^\n]+)/);
          if (addressMatch && addressMatch[1] && !addressMatch[1].includes('Check event page')) {
            location = addressMatch[1].trim();
          } else if (locationField && !locationField.startsWith('http')) {
            location = locationField;
          }
        }

        // Format date to match your format: "Day, Month DD, YYYY, HH:MM AM/PM"
        const startDate = event.startDate.toJSDate();

        // Filter for upcoming events only
        if (startDate < now) {
          return null;
        }

        // Filter for "Makers gonna make" events only
        const isMakersEvent = (event.summary || '').toLowerCase().includes('makers gonna make');
        if (!isMakersEvent) {
          return null;
        }

        // Use a simpler date format that's easier to parse
        const formattedDate = startDate.toLocaleString('en-US', {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });

        return {
          date: formattedDate,
          dateISO: startDate.toISOString(), // Store ISO string for reliable sorting
          title: event.summary || '',
          description: '',
          capacity: 15, // Default capacity, can't get from iCal
          attendees: 0, // Can't get from iCal
          location: location,
          thumbImage: '', // Will be fetched separately
          eventImageA: '',
          eventImageB: '',
          eventUrl: eventUrl,
          reportUrl: '',
        };
      })
      .filter((event): event is NonNullable<typeof event> => event !== null);

    return parsedEvents;
  } catch (error) {
    console.error(`Error fetching iCal calendar from ${icalUrl}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    // Fetch from all iCal calendars in parallel
    const icalPromises = ICAL_URLS.map(({ url, location }) =>
      fetchIcalCalendar(url, location)
    );

    // Fetch JSON calendar events in parallel


    // Wait for all sources
    const [...icalResults] = await Promise.all([...icalPromises]);
    const allIcalEvents = icalResults.flat();



    // Merge events from all sources
    // Put JSON events first so they take precedence during deduplication
    const allEvents = [...allIcalEvents];

    // Deduplicate by URL (in case same event is in both sources)
    // Strip query parameters when comparing URLs
    const uniqueEvents = allEvents.reduce((acc, event) => {
      const eventUrlBase = event.eventUrl.split('?')[0];
      const existingEvent = acc.find(e => e.eventUrl.split('?')[0] === eventUrlBase);
      if (!existingEvent) {
        acc.push(event);
      }
      return acc;
    }, [] as typeof allEvents);

    console.log(uniqueEvents);

    // Sort by date (earliest first) using ISO string for reliable sorting
    uniqueEvents.sort((a, b) => {
      const dateA = a.dateISO ? new Date(a.dateISO).getTime() : new Date(a.date).getTime();
      const dateB = b.dateISO ? new Date(b.dateISO).getTime() : new Date(b.date).getTime();
      return dateA - dateB;
    });

    // Fetch thumbnails for all upcoming events in parallel
    const eventsWithThumbnails = await Promise.all(
      uniqueEvents.map(async (event) => {
        if (event.eventUrl) {
          const thumbImage = await fetchEventThumbnail(event.eventUrl);
          return { ...event, thumbImage };
        }
        return event;
      })
    );

    console.log(`Found ${allIcalEvents.length} iCal events, ${eventsWithThumbnails.length} total upcoming`);

    return NextResponse.json(eventsWithThumbnails);
  } catch (error) {
    console.error('Error fetching iCal data:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
