"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Star, Clock, ShieldCheck, Award, Zap, BookOpen, Users, Compass } from 'lucide-react';
import { API_BASE_URL } from '../context/AuthContext';
import Spinner from '../components/Spinner';

export default function HomePage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: 'Find Your Perfect Academic Match',
      description: 'Book sessions with world-class tutors from Ivy League universities and elite companies. Accelerate your career and skills.',
      badge: 'Elite Tutors Platform',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      tagline: 'Expert Guidance On-Demand'
    },
    {
      title: 'No Conflicts. Seamless Scheduling.',
      description: 'Our digital token system guarantees double-booking prevention. Book instantly based on real-time tutor availability lists.',
      badge: 'Smart Time Slots',
      bgGradient: 'from-indigo-500/10 to-blue-500/10',
      tagline: 'Zero-Friction Booking Experience'
    },
    {
      title: 'Elevate Your Practical Understanding',
      description: 'Unlock one-on-one sessions in Advanced Math, Physics, Organic Chemistry, and Staff-level Software Engineering.',
      badge: 'Interactive Sessions',
      bgGradient: 'from-orange-500/10 to-amber-500/10',
      tagline: 'Achieve Learning Excellence'
    }
  ];

  useEffect(() => {
    async function fetchTutors() {
      try {
        const res = await fetch(`${API_BASE_URL}/tutors?limit=6`);
        if (res.ok) {
          const data = await res.json();
          setTutors(data.length > 0 ? data : []);
        } else {
          setTutors([]);
        }
      } catch (error) {
        console.error('Error fetching homepage tutors:', error);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTutors();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-base-100 min-h-screen">
      <section className="relative w-full py-16 sm:py-24 px-6 sm:px-8 bg-gradient-to-b from-base-200/50 to-base-100 overflow-hidden border-b border-base-200">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto min-h-[350px] flex items-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-8 space-y-6 animate-slide-in">
              <span className="badge badge-primary badge-outline font-bold tracking-wider uppercase px-3 py-2 border-2">
                {slides[currentSlide].badge}
              </span>
              <p className="text-primary font-semibold tracking-wide text-sm sm:text-base">
                {slides[currentSlide].tagline}
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-base-content max-w-2xl leading-none">
                {slides[currentSlide].title}
              </h1>
              <p className="text-base-content/70 text-lg max-w-xl leading-relaxed">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/tutors" className="btn btn-primary px-6 shadow-lg shadow-primary/20 gap-2 font-bold hover:scale-105 transition-all">
                  Browse Tutors <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/add-tutor" className="btn btn-outline hover:btn-primary px-6 font-bold hover:scale-105 transition-all">
                  Teach on MediQueue
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
              <div className={`w-80 h-80 rounded-3xl bg-gradient-to-tr ${slides[currentSlide].bgGradient} border border-base-200 shadow-2xl flex items-center justify-center p-8 relative overflow-hidden transition-all duration-700`}>
                <div className="absolute w-40 h-40 bg-primary/10 rounded-full blur-2xl top-10 left-10"></div>
                <div className="absolute w-40 h-40 bg-secondary/10 rounded-full blur-2xl bottom-10 right-10"></div>
                <div className="relative text-center space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-base-100 flex items-center justify-center text-primary mx-auto shadow-md border border-base-200">
                    {currentSlide === 0 && <Award className="h-10 w-10 animate-bounce" />}
                    {currentSlide === 1 && <Clock className="h-10 w-10 animate-spin" style={{ animationDuration: '6s' }} />}
                    {currentSlide === 2 && <Zap className="h-10 w-10 animate-pulse" />}
                  </div>
                  <h3 className="font-bold text-lg text-base-content">MediQueue Learning</h3>
                  <p className="text-xs text-base-content/60 leading-snug">Elite platform providing transparent scheduling for students.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-primary' : 'w-2.5 bg-base-content/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
              <Compass className="h-4 w-4" /> Discover Talent
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Featured Elite Tutors
            </h2>
            <p className="text-base-content/65 max-w-xl text-sm leading-relaxed">
              Book real-time interactive classes with top certified tutors. Learn subjects organically with a clear schedule.
            </p>
          </div>
          <Link href="/tutors" className="btn btn-ghost text-primary font-bold gap-1 group self-start hover:bg-primary/10">
            View All Tutors <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : tutors.length === 0 ? (
          <div className="card bg-base-200 border border-base-300 p-12 text-center rounded-2xl max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
              <Compass className="h-8 w-8 animate-pulse" />
            </div>
            <h3 className="font-extrabold text-2xl text-base-content">No Featured Tutors</h3>
            <p className="text-sm text-base-content/65 max-w-sm mx-auto leading-relaxed">
              There are no tutor sessions published yet. Be the first to create one!
            </p>
            <Link href="/add-tutor" className="btn btn-primary rounded-xl font-bold px-6 shadow-md shadow-primary/10">
              Become an Instructor
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="card bg-base-100 shadow-md hover:shadow-xl border border-base-200/60 hover:border-primary/20 transition-all duration-300 flex flex-col h-full rounded-2xl overflow-hidden group"
              >
                <div className="relative h-56 bg-base-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={tutor.photoUrl}
                    alt={tutor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + encodeURIComponent(tutor.name);
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
                    <p className="text-xs text-base-content/50 font-medium truncate mt-0.5">{tutor.institution}</p>
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
                    <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40">Available Days</p>
                    <div className="flex flex-wrap gap-1">
                      {tutor.availableDays.map((day, idx) => (
                        <span key={idx} className="badge badge-neutral badge-xs font-semibold px-2 py-1.5">
                          {day}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-base-content/60 font-medium mt-1">🕒 {tutor.availableTime}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-t-base-200/50">
                    <div>
                      <p className="text-xs text-base-content/50 uppercase tracking-widest font-semibold">Hourly Fee</p>
                      <p className="text-2xl font-black text-primary">${tutor.hourlyFee}<span className="text-xs font-normal text-base-content/70">/hr</span></p>
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
            ))}
          </div>
        )}
      </section>

      <section className="bg-base-200/50 border-y border-base-200 py-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="badge badge-primary badge-outline font-bold tracking-widest uppercase">The MediQueue Promise</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Why Students Love MediQueue
            </h2>
            <p className="text-sm text-base-content/65 leading-relaxed">
              We eliminated manual coordinate sheets, late email notices, and tutor schedule overlapping. Discover our intelligent booking standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 p-8 border border-base-200/60 rounded-2xl space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-base-content">100% Verified Tutors</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Every tutor undergoes profile screening and qualification verification before receiving approval to join.
              </p>
            </div>

            <div className="card bg-base-100 p-8 border border-base-200/60 rounded-2xl space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-base-content">Conflict Prevention</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Smart automated time-matching prevents double bookings, blocking slots dynamically upon confirmation.
              </p>
            </div>

            <div className="card bg-base-100 p-8 border border-base-200/60 rounded-2xl space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-base-content">Digital Sessions</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Upon successful slot registration, our system generates dedicated session tokens to confirm your appointment.
              </p>
            </div>

            <div className="card bg-base-100 p-8 border border-base-200/60 rounded-2xl space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-base-content">Teaching Flexibility</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Flexible teaching arrangements: study online, face-to-face offline in your city, or choose hybrid modes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="badge badge-secondary badge-outline font-bold tracking-widest uppercase">Growing Fast</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Unlock Your Highest Academic Potential
            </h2>
            <p className="text-sm text-base-content/70 leading-relaxed">
              MediQueue connects thousands of active students with experienced subject specialists, professors, and professional software developers daily.
            </p>
            <div className="space-y-4 border-l-2 border-primary pl-4">
              <p className="italic text-base-content/80 text-sm leading-relaxed">
                "The slot restriction and digital token system completely saved my exam prep schedule. No more texting back-and-forth for days!"
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-base-content/50">— Kabya N., CS Student</p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="bg-base-200 p-8 rounded-2xl text-center space-y-2 border border-base-300">
              <p className="text-4xl sm:text-5xl font-black text-primary">98%</p>
              <h4 className="font-bold text-sm text-base-content uppercase tracking-wider">Satisfaction Rate</h4>
              <p className="text-xs text-base-content/60">Calculated from student class reviews</p>
            </div>

            <div className="bg-base-200 p-8 rounded-2xl text-center space-y-2 border border-base-300">
              <p className="text-4xl sm:text-5xl font-black text-secondary">15,000+</p>
              <h4 className="font-bold text-sm text-base-content uppercase tracking-wider">Sessions Booked</h4>
              <p className="text-xs text-base-content/60">Digital tokens issued successfully</p>
            </div>

            <div className="bg-base-200 p-8 rounded-2xl text-center space-y-2 border border-base-300">
              <p className="text-4xl sm:text-5xl font-black text-accent">500+</p>
              <h4 className="font-bold text-sm text-base-content uppercase tracking-wider">Verified Tutors</h4>
              <p className="text-xs text-base-content/60">Specialists across major academic disciplines</p>
            </div>

            <div className="bg-base-200 p-8 rounded-2xl text-center space-y-2 border border-base-300">
              <p className="text-4xl sm:text-5xl font-black text-emerald-500">24/7</p>
              <h4 className="font-bold text-sm text-base-content uppercase tracking-wider">Active Learning</h4>
              <p className="text-xs text-base-content/60">Continuous session slot updates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
