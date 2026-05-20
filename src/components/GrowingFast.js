import React from "react";

const GrowingFast = () => {
  return (
    <div>
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="badge badge-secondary badge-outline font-bold tracking-widest uppercase">
              Growing Fast
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Unlock Your Highest Academic Potential
            </h2>
            <p className="text-sm text-base-content/70 leading-relaxed">
              MediQueue connects thousands of active students with experienced
              subject specialists, professors, and professional software
              developers daily.
            </p>
            <div className="space-y-4 border-l-2 border-primary pl-4">
              <p className="italic text-base-content/80 text-sm leading-relaxed">
                "The slot restriction and digital token system completely saved
                my exam prep schedule. No more texting back-and-forth for days!"
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-base-content/50">
                — Kabya N., CS Student
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="bg-base-200 p-8 rounded-2xl text-center space-y-2 border border-base-300">
              <p className="text-4xl sm:text-5xl font-black text-primary">
                98%
              </p>
              <h4 className="font-bold text-sm text-base-content uppercase tracking-wider">
                Satisfaction Rate
              </h4>
              <p className="text-xs text-base-content/60">
                Calculated from student class reviews
              </p>
            </div>

            <div className="bg-base-200 p-8 rounded-2xl text-center space-y-2 border border-base-300">
              <p className="text-4xl sm:text-5xl font-black text-secondary">
                15,000+
              </p>
              <h4 className="font-bold text-sm text-base-content uppercase tracking-wider">
                Sessions Booked
              </h4>
              <p className="text-xs text-base-content/60">
                Digital tokens issued successfully
              </p>
            </div>

            <div className="bg-base-200 p-8 rounded-2xl text-center space-y-2 border border-base-300">
              <p className="text-4xl sm:text-5xl font-black text-accent">
                500+
              </p>
              <h4 className="font-bold text-sm text-base-content uppercase tracking-wider">
                Verified Tutors
              </h4>
              <p className="text-xs text-base-content/60">
                Specialists across major academic disciplines
              </p>
            </div>

            <div className="bg-base-200 p-8 rounded-2xl text-center space-y-2 border border-base-300">
              <p className="text-4xl sm:text-5xl font-black text-emerald-500">
                24/7
              </p>
              <h4 className="font-bold text-sm text-base-content uppercase tracking-wider">
                Active Learning
              </h4>
              <p className="text-xs text-base-content/60">
                Continuous session slot updates
              </p>
            </div>
          </div>
        </div>
      </section>
      ;
    </div>
  );
};

export default GrowingFast;
