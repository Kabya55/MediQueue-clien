"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import Spinner from './Spinner';
import Image from 'next/image';
import { DollarSign, MapPin, Landmark, Award, ArrowLeft, Send, CheckCircle, AlertTriangle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TutorDetailsContent({ id }) {
  const { user, fetchWithAuth } = useAuth();
  const router = useRouter();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [studentName, setStudentName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      setStudentName(user.name);
    }
  }, [user]);

  const fetchTutorDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tutors/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTutor(data);
      } else {
        setTutor(null);
      }
    } catch (error) {
      console.error('Failed to fetch details:', error);
      setTutor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTutorDetails();
    }
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !phone) {
      return toast.error('Please enter your full name and phone number.');
    }

    setBookingLoading(true);
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        body: JSON.stringify({
          tutorId: tutor._id,
          studentName,
          phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      toast.success(data.message || 'Booking successfully registered!');
      setShowModal(false);
      setPhone('');

      setTutor((prev) => {
        const updatedSlot = prev.totalSlot - 1;
        return {
          ...prev,
          totalSlot: updatedSlot
        };
      });

      if (tutor && tutor.totalSlot - 1 === 0) {
        toast.error("This session is fully booked. You can't join at the moment.");
      }
    } catch (error) {
      toast.error(error.message || 'Failed to complete booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!tutor) return <div className="p-8 text-center text-error font-bold">Failed to load profile.</div>;

  const currentDate = new Date();
  const sessionStartDate = new Date(tutor.sessionStartDate);
  currentDate.setHours(0, 0, 0, 0);
  sessionStartDate.setHours(0, 0, 0, 0);

  const isDateLocked = currentDate < sessionStartDate;
  const isSlotsEmpty = tutor.totalSlot <= 0;

  let isDateExpired = false;
  if (tutor.sessionEndDate) {
    const sessionEndDate = new Date(tutor.sessionEndDate);
    sessionEndDate.setHours(0, 0, 0, 0);
    isDateExpired = currentDate > sessionEndDate;
  }

  return (
    <div className="w-full bg-base-100 py-12 px-6 sm:px-8 max-w-5xl mx-auto flex-grow">
      <button
        onClick={() => router.back()}
        className="btn btn-ghost btn-sm gap-1 hover:text-primary mb-6 pl-0"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Tutors
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4 card bg-base-100 border border-base-200 shadow-md p-4 rounded-2xl">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-base-200">
            <Image
              src={tutor.photoUrl}
              alt={tutor.name}
              className="w-full h-full object-cover"
              width={500}
              height={500}
              unoptimized
              onError={(e) => {
                e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + encodeURIComponent(tutor.name);
              }}
            />
            <div className="absolute top-3 left-3">
              <span className="badge badge-primary px-3 py-2.5 font-bold shadow-md">{tutor.subject}</span>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-base-200 space-y-2 border border-base-300">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-base-content/60">Session Start:</span>
              <span className="font-bold text-base-content">{tutor.sessionStartDate}</span>
            </div>
            {tutor.sessionEndDate && (
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-base-content/60">Session End:</span>
                <span className={`font-bold ${isDateExpired ? 'text-error' : 'text-base-content'}`}>{tutor.sessionEndDate}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-base-content/60">Available Slots:</span>
              <span className={`font-black ${tutor.totalSlot > 0 ? 'text-primary' : 'text-error animate-pulse'}`}>
                {tutor.totalSlot} left
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-base-content leading-none">
              {tutor.name}
            </h1>
            <p className="text-sm font-semibold text-primary">{tutor.subject} Specialist</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-base-200 py-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-base-content/50 uppercase tracking-widest font-semibold">Institution</p>
                <p className="text-sm font-bold text-base-content truncate max-w-[150px]">{tutor.institution}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-base-content/50 uppercase tracking-widest font-semibold">Experience</p>
                <p className="text-sm font-bold text-base-content">{tutor.experience}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-base-content/50 uppercase tracking-widest font-semibold">Hourly Fee</p>
                <p className="text-sm font-black text-primary">${tutor.hourlyFee}/hr</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-base-content/80 text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-base-content">Tutor Scheduling Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                <p className="font-bold text-xs text-base-content/50 uppercase tracking-wider mb-2">Available Days</p>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.availableDays.map((day, idx) => (
                    <span key={idx} className="badge badge-neutral font-semibold px-2.5 py-2">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                <p className="font-bold text-xs text-base-content/50 uppercase tracking-wider mb-1">Available Hour Block</p>
                <p className="text-sm font-bold text-base-content">🕒 {tutor.availableTime}</p>
                <p className="text-[11px] text-base-content/60 font-semibold mt-1">Teaching Mode: {tutor.teachingMode}</p>
              </div>
            </div>

            <div className="bg-base-200/50 p-4 rounded-xl border border-base-200 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-bold text-xs text-base-content/50 uppercase tracking-wider">Session Area Location</p>
                <p className="text-sm font-semibold text-base-content">{tutor.location}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-base-200 space-y-4">
            {isSlotsEmpty ? (
              <div className="alert alert-error flex items-start gap-3 rounded-2xl">
                <AlertTriangle className="h-5 w-5 shrink-0 text-error-content" />
                <div>
                  <h4 className="font-bold text-sm">No available slots left.</h4>
                  <p className="text-xs opacity-90 leading-snug">This tutor is currently fully booked. You will be able to book once they expand their learning slots.</p>
                </div>
              </div>
            ) : isDateExpired ? (
              <div className="alert alert-error flex items-start gap-3 rounded-2xl">
                <AlertTriangle className="h-5 w-5 shrink-0 text-error-content" />
                <div>
                  <h4 className="font-bold text-sm">Booking window has expired</h4>
                  <p className="text-xs opacity-90 leading-snug">The booking period for this tutor ended on <strong>{tutor.sessionEndDate}</strong>. Please look for other available tutors.</p>
                </div>
              </div>
            ) : isDateLocked ? (
              <div className="alert alert-warning flex items-start gap-3 rounded-2xl">
                <AlertTriangle className="h-5 w-5 shrink-0 text-warning-content" />
                <div>
                  <h4 className="font-bold text-sm">Booking is not available yet for this tutor</h4>
                  <p className="text-xs opacity-90 leading-snug">
                    Bookings for this session open on the Session Start Date: <strong>{tutor.sessionStartDate}</strong>. Please check back then!
                  </p>
                </div>
              </div>
            ) : null}

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(true)}
                disabled={isSlotsEmpty || isDateLocked || isDateExpired}
                className="btn btn-primary px-8 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all text-sm gap-2"
              >
                Book Learning Session Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-base-100 p-6 sm:p-8 rounded-2xl border border-base-200 shadow-2xl max-w-md w-full relative animate-slide-in">
            <button
              onClick={() => setShowModal(false)}
              className="btn btn-ghost btn-circle btn-sm absolute top-4 right-4 text-base-content/50 hover:text-base-content"
              aria-label="Close booking modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-6 w-6" />
                <h3 className="text-xl font-extrabold tracking-tight text-base-content">
                  Confirm Learning Slot
                </h3>
              </div>
              <p className="text-xs text-base-content/65 leading-relaxed">
                Confirm your slot booking for <strong>{tutor.name}</strong>. Provide your name and phone number to verify booking credentials.
              </p>

              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-[10px] uppercase font-bold text-base-content/50">Tutor Name (Auto-filled)</span>
                  </label>
                  <input
                    type="text"
                    value={tutor.name}
                    className="input input-bordered w-full rounded-xl bg-base-200 text-sm font-semibold cursor-not-allowed"
                    disabled
                  />
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-[10px] uppercase font-bold text-base-content/50">Student Email (Auto-filled)</span>
                  </label>
                  <input
                    type="text"
                    value={user?.email || ''}
                    className="input input-bordered w-full rounded-xl bg-base-200 text-sm font-semibold cursor-not-allowed"
                    disabled
                  />
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-[10px] uppercase font-bold text-base-content/50">Student Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your name"
                    className="input input-bordered w-full rounded-xl text-sm focus:input-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-[10px] uppercase font-bold text-base-content/50">Student Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +880 1712345678"
                    className="input input-bordered w-full rounded-xl text-sm focus:input-primary"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-ghost flex-1 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="btn btn-primary flex-1 rounded-xl text-xs font-bold gap-1 text-primary-content"
                  >
                    {bookingLoading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" /> Book Session
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
