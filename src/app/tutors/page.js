"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, RefreshCw, Compass, Star, Clock, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchTutors = async () => {
    setLoading(true);
    try {
      let queryParams = [];
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
      if (startDate) queryParams.push(`startDate=${encodeURIComponent(startDate)}`);
      if (endDate) queryParams.push(`endDate=${encodeURIComponent(endDate)}`);

      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      const response = await fetch(`${API_BASE_URL}/tutors${queryString}`);

      if (response.ok) {
        const data = await response.json();
        setTutors(data);
      } else {
        setTutors([]);
      }
    } catch (error) {
      console.error('Failed to fetch tutors from MongoDB:', error);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [search, startDate, endDate]);

  const handleReset = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="w-full bg-base-100 min-h-screen py-12 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
          <Compass className="h-4 w-4" /> Learning Hub
        </div>
        <h1 className="text-4xl font-extrabold text-base-content tracking-tight">Available Learning Instructors</h1>
        <p className="text-sm text-base-content/65 leading-relaxed">
          Browse our elite grid of verified subject matter experts and book premium one-on-one sessions in seconds.
        </p>
      </div>

      <div className="bg-base-200 p-6 rounded-2xl border border-base-300 shadow-sm mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="form-control md:col-span-4">
            <label className="label py-1">
              <span className="label-text font-bold text-xs uppercase text-base-content/60 tracking-wider">Search Tutor Name</span>
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
              <span className="label-text font-bold text-xs uppercase text-base-content/60 tracking-wider">Start Session Date</span>
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
              <span className="label-text font-bold text-xs uppercase text-base-content/60 tracking-wider">End Session Date</span>
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
        <div className="card bg-base-200 border border-base-300 p-12 text-center rounded-2xl max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mx-auto">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="font-extrabold text-2xl text-base-content">No Instructors Found</h3>
          <p className="text-sm text-base-content/65 max-w-sm mx-auto leading-relaxed">
            We couldn't find any tutors matching "{search || 'your date criteria'}". Try tweaking your filters or resetting the search parameters above!
          </p>
          <button onClick={handleReset} className="btn btn-primary rounded-xl font-bold px-6 shadow-md shadow-primary/10">
            Reset Filters & Try Again
          </button>
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
                  <p className="text-xs text-base-content/50 font-semibold mt-1">📅 Session Starts: {tutor.sessionStartDate}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200/50">
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
    </div>
  );
}
