"use client";
import React, { useState, useEffect } from "react";
import { Users, Sparkles, Code2, Rocket } from "lucide-react";
import Footer from "./components/footer";
import Link from "next/link";
import { EventCard } from "./components/EventCard";

export interface Event {
  date: string;
  title: string;
  description: string;
  capacity: number;
  attendees: number;
  location: string;
  thumbImage: string;
  eventImageA: string;
  eventImageB: string;
  eventUrl: string;
  reportUrl: string;
}

const events: Event[] = [
  {
    date: "Sat, September 27, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 10",
    description: "",
    capacity: 15,
    attendees: 0,
    location: "Edinburgh",
    thumbImage: "thumb-episode-10.png",
    eventImageA: "edinburgh-episode-10-A.jpg",
    eventImageB: "edinburgh-episode-10-B.jpg",
    eventUrl: "https://luma.com/2f4y30xn",
    reportUrl: "https://www.linkedin.com/posts/peter-trizuliak_11-makers-locked-in-for-8-hours-on-another-activity-7378156457441275905-1j7g?utm_source=share&utm_medium=member_desktop&rcm=ACoAAA5wQEUBBi0NQgVdQ64xN_68f0Q44sr9fAQ",
  },
  {
    date: "Sat, August 23, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 9",
    description: "",
    capacity: 15,
    attendees: 0,
    location: "Edinburgh",
    thumbImage: "thumb-episode-9.png",
    eventImageA: "edinburgh-episode-1-A.jpg",
    eventImageB: "edinburgh-episode-1-A.jpg",
    eventUrl: "https://lu.ma/od40tn78",
    reportUrl: "https://www.linkedin.com/posts/katy--smith_it-was-great-to-attend-makers-gonna-make-ugcPost-7366875399210823685-IUli?utm_source=share&utm_medium=member_desktop&rcm=ACoAAA5wQEUBBi0NQgVdQ64xN_68f0Q44sr9fAQ",
  },
  {
    date: "Sat, August 9, 2025, 10:00 AM",
    title: "Makers gonna make - Dundee - Episode 2",
    description: "",
    capacity: 15,
    attendees: 8,
    location: "The Flour Mill, Dundee",
    thumbImage: "thumb-dundee-episode-1.avif",
    eventImageA: "dundee-episode-2-B.jpeg",
    eventImageB: "dundee-episode-2-A.jpeg",
    eventUrl: "https://lu.ma/080yvrcp",
    reportUrl: "https://www.linkedin.com/posts/dundee-founders-collective_makersgonnamake-dundeefounders-foundercommunity-activity-7360595880388771841-77ME",
  },
  {
    date: "Sat, July 26, 2025, 10:00 AM",
    title: "Makers gonna make - Dundee - Episode 1",
    description: "",
    capacity: 15,
    attendees: 15,
    location: "The Flour Mill, Dundee",
    thumbImage: "thumb-dundee-episode-1.avif",
    eventImageA: "dundee-episode-1-A.jpg",
    eventImageB: "dundee-episode-1-B.jpg",
    eventUrl: "https://lu.ma/dll9xxro",
    reportUrl: "https://www.linkedin.com/posts/dundee-founders-collective_makersgonnamake-dundeefounders-dfc-activity-7355507362373242880-JJIi",
  },
  {
    date: "Sat, June 28, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 8",
    description: "",
    capacity: 15,
    attendees: 12,
    location: "CodeBase, Edinburgh",
    thumbImage: "thumb-episode-8.png",
    eventImageA: "edinburgh-episode-8-A.jpeg",
    eventImageB: "edinburgh-episode-8-B.jpeg",
    eventUrl: "https://lu.ma/xwa4kduz",
    reportUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7344844921138282496/",
  },
  {
    date: "Sat, May 24, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 7",
    description: "",
    capacity: 15,
    attendees: 11,
    location: "CodeBase, Edinburgh",
    thumbImage: "thumb-episode-7.png",
    eventImageA: "edinburgh-episode-7-A.jpeg",
    eventImageB: "edinburgh-episode-7-B.jpeg",
    eventUrl: "https://lu.ma/hkacoe77",
    reportUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7332566153027854336/",
  },
  {
    date: "Sat, March 29, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 6",
    description: "",
    capacity: 15,
    attendees: 12,
    location: "CodeBase, Edinburgh",
    thumbImage: "thumb-episode-6.png",
    eventImageA: "edinburgh-episode-6-B.jpg",
    eventImageB: "edinburgh-episode-6-A.jpg",
    eventUrl: "https://lu.ma/3241ib0d",
    reportUrl: "https://www.linkedin.com/pulse/makers-gonna-make-episode-6-peter-trizuliak-3gsee/?trackingId=ltWDmtTnvaWi%2F1QAWz1Qwg%3D%3D",
  },
  {
    date: "Sat, Feb 22, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 5",
    description: "",
    capacity: 15,
    attendees: 19,
    location: "CodeBase, Edinburgh",
    thumbImage: "thumb-episode-5.jpg",
    eventImageA: "edinburgh-episode-5-A.jpg",
    eventImageB: "edinburgh-episode-5-B.jpg",
    eventUrl: "https://lu.ma/c410sjxy",
    reportUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7299452852362498048/",
  },
  {
    date: "Sat, Jan 25, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 4",
    description: "",
    capacity: 15,
    attendees: 12,
    location: "CodeBase, Edinburgh",
    thumbImage: "thumb-episode-4.jpg",
    eventImageA: "edinburgh-episode-4-A.jpg",
    eventImageB: "edinburgh-episode-4-B.jpg",
    eventUrl: "https://lu.ma/0d99mx3r",
    reportUrl:
      "https://www.linkedin.com/posts/peter-trizuliak_work-on-a-cool-project-meet-inspiring-activity-7289292123118424064-1Qxm",
  },
  {
    date: "Sat, Nov 16, 2024, 10:00 AM",
    title: "Makers gonna make - Episode 3",
    description: "",
    capacity: 12,
    attendees: 11,
    location: "CodeBase, Edinburgh",
    thumbImage: "thumb-episode-3.jpg",
    eventImageA: "edinburgh-episode-3-A.jpg",
    eventImageB: "edinburgh-episode-3-B.jpg",
    eventUrl: "https://lu.ma/r8qeik4x",
    reportUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7264024068385869824/",
  },
  {
    date: "Sat, Oct 12, 2024, 10:00 AM",
    title: "Makers gonna make - Episode 2",
    description: "",
    capacity: 12,
    attendees: 11,
    location: "CodeBase, Edinburgh",
    thumbImage: "thumb-episode-2.jpg",
    eventImageA: "edinburgh-episode-2-A.jpg",
    eventImageB: "edinburgh-episode-2-B.jpg",
    eventUrl: "https://lu.ma/xnxoxzvn",
    reportUrl:
      "https://www.linkedin.com/posts/peter-trizuliak_makersgonnamake-mgmmmmm-activity-7251494506456395777-dpRU?utm_source=share&utm_medium=member_desktop",
  },
  {
    date: "Sat, Sep 21, 2024, 10:00 AM",
    title: "Makers gonna make",
    description: "",
    capacity: 12,
    attendees: 7,
    location: "CodeBase, Edinburgh",
    thumbImage: "thumb-episode-1.jpg",
    eventImageA: "edinburgh-episode-1-A.jpg",
    eventImageB: "edinburgh-episode-1-B.jpg",
    eventUrl: "https://lu.ma/q3x3ucfk",
    reportUrl:
      "https://www.linkedin.com/posts/peter-trizuliak_big-shout-out-to-all-the-makers-who-showed-activity-7243607080996147200-sWF9?utm_source=share&utm_medium=member_desktop",
  },
];

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch upcoming events from iCal API
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        // Sort events chronologically (earliest first)
        const sortedEvents = data.sort((a: Event, b: Event) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        setUpcomingEvents(sortedEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching upcoming events:', error);
        setLoading(false);
      });
  }, []);

  // Filter hardcoded events to only show past events
  const pastEvents = events.filter(({ date }) => {
    const jsdate = new Date(date);
    return !isNaN(jsdate.getTime()) && jsdate < new Date();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-[white] mb-8 mt-5 uppercase group cursor-pointer"
            aria-label="Makers gonna make"
          >
            {"Makers gonna make".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block">
                {[...word].map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className="inline-block transition-transform duration-200 hover:-translate-y-4"
                    aria-hidden="true"
                  >
                    {letter}
                  </span>
                ))}
                {wordIndex !== 2 && (
                  <span
                    className="inline-block transition-transform duration-200 hover:-translate-y-2"
                    aria-hidden="true"
                  >
                    {"\u00A0"}
                  </span>
                )}
              </span>
            ))}
          </h1>
          <h2 className="text-xl text-[lightgray] mb-8">
            A monthly hackathon style event for indie hackers, creators, and
            entrepreneurs building their future.
          </h2>
          <h2 className="text-xl text-[lightgray] mb-8">
            Because good things come to those who make.
          </h2>
          <div>
            <button className="bg-[#5046e5] text-white px-8 py-3 mb-3 rounded-lg font-medium hover:text-[#5046e5] hover:bg-[#9dff74] transition-colors flex items-center space-x-2 mx-auto">
              <Sparkles className="w-5 h-5" />
              <Link href="/#events">Join next event</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Why Monthly Section */}
      <div className="container mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why meeting monthly?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Consistent progress</h4>
            <p className="text-gray-600">
              Monthly meetups create a rhythm for shipping and accountability in
              your indie hacker journey.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Community support</h4>
            <p className="text-gray-600">
              Build relationships with fellow makers who understand your
              challenges and celebrate your wins.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Continuous learning</h4>
            <p className="text-gray-600">
              Each month brings new insights, techniques, and opportunities to
              level up your skills.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16" id="events">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Upcoming events</h2>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading upcoming events...</p>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No upcoming events at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} upcoming={true} />
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Past events</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <EventCard key={index} event={event} upcoming={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
