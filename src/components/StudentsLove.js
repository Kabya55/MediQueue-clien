import { BookOpen, Clock, ShieldCheck, Zap } from "lucide-react";
import React from "react";

const StudentsLove = () => {
  return (
    <div>
      <section className="bg-base-200/50 border-y border-base-200 py-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="badge badge-primary badge-outline font-bold tracking-widest uppercase">
              The MediQueue Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Why Students Love MediQueue
            </h2>
            <p className="text-sm text-base-content/65 leading-relaxed">
              We eliminated manual coordinate sheets, late email notices, and
              tutor schedule overlapping. Discover our intelligent booking
              standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 p-8 border border-base-200/60 rounded-2xl space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-base-content">
                100% Verified Tutors
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Every tutor undergoes profile screening and qualification
                verification before receiving approval to join.
              </p>
            </div>

            <div className="card bg-base-100 p-8 border border-base-200/60 rounded-2xl space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-base-content">
                Conflict Prevention
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Smart automated time-matching prevents double bookings, blocking
                slots dynamically upon confirmation.
              </p>
            </div>

            <div className="card bg-base-100 p-8 border border-base-200/60 rounded-2xl space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-base-content">
                Digital Sessions
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Upon successful slot registration, our system generates
                dedicated session tokens to confirm your appointment.
              </p>
            </div>

            <div className="card bg-base-100 p-8 border border-base-200/60 rounded-2xl space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-base-content">
                Teaching Flexibility
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Flexible teaching arrangements: study online, face-to-face
                offline in your city, or choose hybrid modes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentsLove;
