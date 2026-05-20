"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Clock, Zap } from "lucide-react";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Find Your Perfect Academic Match",
      description:
        "Book sessions with world-class tutors from Ivy League universities and elite companies. Accelerate your career and skills.",
      badge: "Elite Tutors Platform",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      tagline: "Expert Guidance On-Demand",
    },
    {
      title: "No Conflicts. Seamless Scheduling.",
      description:
        "Our digital token system guarantees double-booking prevention. Book instantly based on real-time tutor availability lists.",
      badge: "Smart Time Slots",
      bgGradient: "from-indigo-500/10 to-blue-500/10",
      tagline: "Zero-Friction Booking Experience",
    },
    {
      title: "Elevate Your Practical Understanding",
      description:
        "Unlock one-on-one sessions in Advanced Math, Physics, Organic Chemistry, and Staff-level Software Engineering.",
      badge: "Interactive Sessions",
      bgGradient: "from-orange-500/10 to-amber-500/10",
      tagline: "Achieve Learning Excellence",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
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
              <Link
                href="/tutors"
                className="btn btn-primary px-6 shadow-lg shadow-primary/20 gap-2 font-bold hover:scale-105 transition-all"
              >
                Browse Tutors <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/add-tutor"
                className="btn btn-outline hover:btn-primary px-6 font-bold hover:scale-105 transition-all"
              >
                Teach on MediQueue
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
            <div
              className={`w-80 h-80 rounded-3xl bg-gradient-to-tr ${slides[currentSlide].bgGradient} border border-base-200 shadow-2xl flex items-center justify-center p-8 relative overflow-hidden transition-all duration-700`}
            >
              <div className="absolute w-40 h-40 bg-primary/10 rounded-full blur-2xl top-10 left-10"></div>

              <div className="absolute w-40 h-40 bg-secondary/10 rounded-full blur-2xl bottom-10 right-10"></div>

              <div className="relative text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-base-100 flex items-center justify-center text-primary mx-auto shadow-md border border-base-200">
                  {currentSlide === 0 && (
                    <Award className="h-10 w-10 animate-bounce" />
                  )}

                  {currentSlide === 1 && (
                    <Clock
                      className="h-10 w-10 animate-spin"
                      style={{ animationDuration: "6s" }}
                    />
                  )}

                  {currentSlide === 2 && (
                    <Zap className="h-10 w-10 animate-pulse" />
                  )}
                </div>

                <h3 className="font-bold text-lg text-base-content">
                  MediQueue Learning
                </h3>

                <p className="text-xs text-base-content/60 leading-snug">
                  Elite platform providing transparent scheduling for students.
                </p>
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
              currentSlide === idx
                ? "w-8 bg-primary"
                : "w-2.5 bg-base-content/20"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
