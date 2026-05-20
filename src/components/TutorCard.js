import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock } from "lucide-react";

export default function TutorCard({ tutor, showStartDate = false }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl border border-base-200/60 hover:border-primary/20 transition-all duration-300 flex flex-col h-full rounded-2xl overflow-hidden group">
      <div className="relative h-56 bg-base-200 flex items-center justify-center overflow-hidden">
        <Image
          src={tutor.photoUrl}
          alt={tutor.name}
          width={700}
          height={500}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://api.dicebear.com/7.x/adventurer/svg?seed=" +
              encodeURIComponent(tutor.name);
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="badge badge-primary px-3 py-2.5 font-bold shadow-md">
            {tutor.subject}
          </span>
        </div>
        {tutor.totalSlot === 0 && (
          <div className="absolute inset-0 bg-base-300/80 backdrop-blur-xs flex items-center justify-center">
            <span className="badge badge-error px-4 py-3 text-error-content font-bold shadow-lg uppercase text-xs tracking-wider">
              Fully Booked
            </span>
          </div>
        )}
      </div>

      <div className="card-body p-6 flex flex-col flex-grow gap-4">
        <div>
          <h3 className="card-title font-bold text-xl text-base-content group-hover:text-primary transition-colors">
            {tutor.name}
          </h3>
          <p className="text-xs text-base-content/50 font-medium truncate mt-0.5">
            {tutor.institution}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-base-content/70 border-y border-base-200/50 py-3">
          <div className="flex items-center gap-1 font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 (42 reviews)</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>{tutor.experience} Experience</span>
          </div>
        </div>

        <div className="space-y-1.5 text-sm text-base-content/85 flex-grow">
          <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40">
            Available Days
          </p>
          <div className="flex flex-wrap gap-1">
            {tutor.availableDays?.map((day, idx) => (
              <span
                key={idx}
                className="badge badge-neutral badge-xs font-semibold px-2 py-1.5"
              >
                {day}
              </span>
            ))}
          </div>
          <p className="text-xs text-base-content/60 font-medium mt-1">
            🕒 {tutor.availableTime}
          </p>
          {showStartDate && tutor.sessionStartDate && (
            <p className="text-xs text-base-content/50 font-semibold mt-1">
              📅 Session Starts: {tutor.sessionStartDate}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200/50">
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-widest font-semibold">
              Hourly Fee
            </p>
            <p className="text-2xl font-black text-primary">
              ${tutor.hourlyFee}
              <span className="text-xs font-normal text-base-content/70">
                /hr
              </span>
            </p>
          </div>
          <Link
            href={`/tutors/${tutor._id}`}
            className="btn btn-sm px-4 rounded-xl font-bold shadow-md shadow-primary/10 gap-1 btn-primary text-primary-content hover:shadow-lg hover:shadow-primary/20"
          >
            Book Session
          </Link>
        </div>
      </div>
    </div>
  );
}
