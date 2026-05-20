"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  RefreshCw,
  Compass,
  AlertCircle,
} from "lucide-react";
import { API_BASE_URL } from "../../context/AuthContext";
import Spinner from "../../components/Spinner";
import TutorCard from "../../components/TutorCard";
import EmptyState from "../../components/EmptyState";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTutors = async () => {
    setLoading(true);
    try {
      let queryParams = [];
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
      if (startDate)
        queryParams.push(`startDate=${encodeURIComponent(startDate)}`);
      if (endDate) queryParams.push(`endDate=${encodeURIComponent(endDate)}`);

      const queryString =
        queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      const response = await fetch(`${API_BASE_URL}/tutors${queryString}`);

      if (response.ok) {
        const data = await response.json();
        setTutors(data);
      } else {
        setTutors([]);
      }
    } catch (error) {
      console.error("Failed to fetch tutors from MongoDB:", error);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [search, startDate, endDate]);

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="w-full bg-base-100 min-h-screen py-12 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
          <Compass className="h-4 w-4" /> Learning Hub
        </div>
        <h1 className="text-4xl font-extrabold text-base-content tracking-tight">
          Available Learning Instructors
        </h1>
        <p className="text-sm text-base-content/65 leading-relaxed">
          Browse our elite grid of verified subject matter experts and book
          premium one-on-one sessions in seconds.
        </p>
      </div>

      <div className="bg-base-200 p-6 rounded-2xl border border-base-300 shadow-sm mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="form-control md:col-span-4">
            <label className="label py-1">
              <span className="label-text font-bold text-xs uppercase text-base-content/60 tracking-wider">
                Search Tutor Name
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search e.g. Sarah Connor..."
                className="input input-bordered pl-10 w-full rounded-xl focus:input-primary text-sm"
              />
            </div>
          </div>

          <div className="form-control md:col-span-3">
            <label className="label py-1">
              <span className="label-text font-bold text-xs uppercase text-base-content/60 tracking-wider">
                Start Session Date
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered pl-10 w-full rounded-xl focus:input-primary text-sm"
              />
            </div>
          </div>

          <div className="form-control md:col-span-3">
            <label className="label py-1">
              <span className="label-text font-bold text-xs uppercase text-base-content/60 tracking-wider">
                End Session Date
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered pl-10 w-full rounded-xl focus:input-primary text-sm"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleReset}
              className="btn btn-neutral hover:btn-primary w-full rounded-xl font-bold gap-2 text-sm"
            >
              <RefreshCw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : tutors.length === 0 ? (
        <EmptyState
          icon={AlertCircle}
          iconColorClass="bg-error/10 text-error"
          title="No Instructors Found"
          description={`We couldn't find any tutors matching "${search || "your date criteria"}". Try tweaking your filters or resetting the search parameters above!`}
          actionText="Reset Filters & Try Again"
          onAction={handleReset}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} showStartDate={true} />
          ))}
        </div>
      )}
    </div>
  );
}
