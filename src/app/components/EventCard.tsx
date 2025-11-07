"use client";
import { ArrowRight, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { Event } from "../page";
import { useState } from "react";

export function EventCard({
  event,
  upcoming = false,
}: {
  event: Event;
  upcoming: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Helper function to format image URL
  const formatImageUrl = (image: string) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `/${image}`;
  };

  return (
    <div className={`flex ${upcoming ? `flex-row` : "flex-col"}`}>
      {!upcoming ? (
        <div
          className={`flex-item w-full aspect-[2/1] bg-cover bg-center rounded-tr-lg rounded-tl-lg`}
          style={{
            backgroundImage: isHovered
              ? `url('${formatImageUrl(event.eventImageB ?? event.eventImageA)}')`
              : `url('${formatImageUrl(event.eventImageA)}')`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ) : null}
      <div
        className={`flex-item bg-white shadow-md p-3 hover:shadow-lg transition-shadow flex items-center ${upcoming
            ? `rounded-lg sm:rounded-tr-none sm:rounded-br-none`
            : `rounded-bl-lg rounded-br-lg`
          } `}
      >
        <div className="flex-item grow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-indigo-600">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                {upcoming ? event.capacity : event.attendees}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{event.location}</span>
            {upcoming ? (
              <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700">
                <Link href={event.eventUrl} target="_blank">
                  Register
                </Link>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
            {!upcoming && event.reportUrl ? (
              <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700">
                <Link href={event.reportUrl} target="_blank">
                  Read the report
                </Link>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {upcoming && event.thumbImage ? (
        <Link href={event.eventUrl} target="_blank">
          <button
            className={`hidden sm:block flex-item h-full aspect-[1/1] bg-cover bg-center rounded-tr-lg rounded-br-lg shadow-md hover:shadow-lg transition-shadow`}
            style={{
              backgroundImage: `url('${formatImageUrl(event.thumbImage)}')`,
            }}
          />
        </Link>
      ) : null}
    </div>
  );
}
