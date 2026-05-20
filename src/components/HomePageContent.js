"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Compass } from "lucide-react";
import { API_BASE_URL } from "../context/AuthContext";
import Spinner from "./Spinner";
import GrowingFast from "./GrowingFast";
import StudentsLove from "./StudentsLove";
import HeroSlider from "./HeroSlider";
import TutorCard from "./TutorCard";
import EmptyState from "./EmptyState";

export default function HomePageContent() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        console.error("Error fetching homepage tutors:", error);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTutors();
  }, []);

  return (
    <div className="w-full bg-base-100 min-h-screen">
      <HeroSlider />

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
              Book real-time interactive classes with top certified tutors.
              Learn subjects organically with a clear schedule.
            </p>
          </div>
          <Link
            href="/tutors"
            className="btn btn-ghost text-primary font-bold gap-1 group self-start hover:bg-primary/10"
          >
            View All Tutors{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : tutors.length === 0 ? (
          <EmptyState
            icon={Compass}
            iconInnerClass="animate-pulse"
            title="No Featured Tutors"
            description="There are no tutor sessions published yet. Be the first to create one!"
            actionText="Become an Instructor"
            actionLink="/add-tutor"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </section>

      <StudentsLove />
      <GrowingFast />
    </div>
  );
}
