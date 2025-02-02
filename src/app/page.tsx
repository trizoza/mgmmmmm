import React from "react";
import {
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Code2,
  Rocket,
} from "lucide-react";
import Footer from "./components/footer";

const events = [
  {
    date: "Sat, Feb 22, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 5",
    capacity: 15,
    attendees: 12,
    location: "CodeBase, Edinburgh",
    thumbImage: "/thumb-episode-5.avif",
    eventImage: "",
    eventUrl: "https://lu.ma/c410sjxy",
    reportUrl: "",
  },
  {
    date: "Sat, Jan 25, 2025, 10:00 AM",
    title: "Makers gonna make - Episode 4",
    capacity: 15,
    attendees: 12,
    location: "CodeBase, Edinburgh",
    thumbImage: "/thumb-episode-4.avif",
    eventImage: "",
    eventUrl: "https://lu.ma/0d99mx3r",
    reportUrl:
      "https://www.linkedin.com/posts/peter-trizuliak_work-on-a-cool-project-meet-inspiring-activity-7289292123118424064-1Qxm",
  },
  {
    date: "Sat, Nov 16, 2024, 10:00 AM",
    title: "Makers gonna make - Episode 3",
    capacity: 12,
    attendees: 11,
    location: "CodeBase, Edinburgh",
    thumbImage: "/thumb-episode-3.avif",
    eventImage: "",
    eventUrl: "https://lu.ma/r8qeik4x",
    reportUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7264024068385869824/",
  },
  {
    date: "Sat, Oct 12, 2024, 10:00 AM",
    title: "Makers gonna make - Episode 2",
    capacity: 12,
    attendees: 11,
    location: "CodeBase, Edinburgh",
    thumbImage: "/thumb-episode-2.avif",
    eventImage: "",
    eventUrl: "https://lu.ma/xnxoxzvn",
    reportUrl:
      "https://www.linkedin.com/posts/peter-trizuliak_makersgonnamake-mgmmmmm-activity-7251494506456395777-dpRU?utm_source=share&utm_medium=member_desktop",
  },
  {
    date: "Sat, Sep 21, 2024, 10:00 AM",
    title: "Makers gonna make",
    capacity: 12,
    attendees: 7,
    location: "CodeBase, Edinburgh",
    thumbImage: "/thumb-episode-1.avif",
    eventImage: "",
    eventUrl: "https://lu.ma/q3x3ucfk",
    reportUrl:
      "https://www.linkedin.com/posts/peter-trizuliak_big-shout-out-to-all-the-makers-who-showed-activity-7243607080996147200-sWF9?utm_source=share&utm_medium=member_desktop",
  },
];

function EventCard({
  event,
  upcoming = false,
}: {
  event: any;
  upcoming: boolean;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-indigo-600">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">{event.date}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">
            {upcoming ? event.capacity : `${event.attendees}/${event.capacity}`}
          </span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{event.location}</span>
        {upcoming ? (
          <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700">
            <a href={event.eventUrl} target="_blank">
              Register
            </a>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700">
            <a href={event.reportUrl} target="_blank">
              Read the report
            </a>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-[white] mb-8 mt-5">
            Makers gonna make
          </h1>
          <h2 className="text-xl text-[lightgray] mb-8">
            A monthly hackathon style event for indie hackers, creators, and
            entrepreneurs building their future.
          </h2>
          <div>
            <button className="bg-[#5046e5] text-white px-8 py-3 mb-3 rounded-lg font-medium hover:text-[#5046e5] hover:bg-[#9dff74] transition-colors flex items-center space-x-2 mx-auto">
              <Sparkles className="w-5 h-5" />
              <a href="/#events">Join next event</a>
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
            <div className="grid md:grid-cols-2 gap-8">
              {events
                .filter(({ date }) => {
                  const jsdate = new Date(date);
                  return !isNaN(jsdate.getTime()) && jsdate >= new Date();
                })
                .map((event, index) => (
                  <EventCard key={index} event={event} upcoming={true} />
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Past events</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {events
                .filter(({ date }) => {
                  const jsdate = new Date(date);
                  return !isNaN(jsdate.getTime()) && jsdate < new Date();
                })
                .map((event, index) => (
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
