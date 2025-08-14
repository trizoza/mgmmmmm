# create-new-event

Add a new event to the events array in page.tsx.

## Arguments

- `title` (required): Event title
- `city` (required): Event location city (defaults to Edinburgh)
- `capacity` (optional): Event capacity (defaults to 15)
- `date` (required): Event date in format "Day, Month DD, YYYY, HH:MM AM/PM"
- `url` (required): Event registration URL

## Usage

```
/create-new-event --title "Makers gonna make - Glasgow - Episode 1" --city "Glasgow" --capacity 20 --date "Sat, September 14, 2025, 10:00 AM" --url "https://lu.ma/example"
```

## Implementation

This command will:
1. Read the current events array from src/app/page.tsx
2. Create a new event object with the provided parameters
3. Add the new event as the first item in the events array
4. Leave eventImageA, eventImageB, and reportUrl empty
5. Set attendees to 0 for new events
6. Generate a placeholder thumbImage based on the city name

The new event will be inserted at the top of the events array (index 0) to appear first in the upcoming events section.

## Command Logic

When this command is called, Claude will:

1. Parse the provided arguments (title, city, capacity, date, url)
2. Read the current page.tsx file
3. Extract the events array
4. Create a new event object:
```typescript
{
  date: "[provided date]",
  title: "[provided title]", 
  description: "",
  capacity: [provided capacity or 15],
  attendees: 0,
  location: "[provided city]",
  thumbImage: "[city-based-placeholder]",
  eventImageA: "",
  eventImageB: "",
  eventUrl: "[provided url]",
  reportUrl: "",
}
```
5. Insert the new event at index 0 of the events array
6. Write the updated file back to src/app/page.tsx