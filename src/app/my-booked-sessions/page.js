"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, API_BASE_URL } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import { BookOpen, XCircle, AlertCircle, Trash, Check, X, CalendarClock } from 'lucide-react';
import toast from 'react-hot-toast';

function MyBookedSessionsList() {
  const { fetchWithAuth } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchMyBookings = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/bookings`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancelConfirm = async () => {
    setCancelling(true);
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/bookings/${cancellingBooking._id}/cancel`, {
        method: 'PATCH'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Cancellation failed');
      }

      toast.success(data.message || 'Booking cancelled successfully.');
      setCancellingBooking(null);

      setBookings(
        bookings.map((b) =>
          b._id === cancellingBooking._id ? { ...b, status: 'cancelled' } : b
        )
      );
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full bg-base-100 py-12 px-6 sm:px-8 max-w-5xl mx-auto flex-grow">
      <div className="border-b border-base-200 pb-6 mb-10">
        <h1 className="text-3xl font-extrabold text-base-content tracking-tight">My Booked Sessions</h1>
        <p className="text-sm text-base-content/60 mt-1">View, track, and manage your scheduled classes and digital session tokens</p>
      </div>

      {bookings.length === 0 ? (
        <div className="card bg-base-200 border border-base-300 p-12 text-center rounded-2xl max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mx-auto">
            <CalendarClock className="h-8 w-8" />
          </div>
          <h3 className="font-extrabold text-xl text-base-content">No Active Bookings</h3>
          <p className="text-sm text-base-content/65 leading-relaxed">
            You haven't scheduled any classes yet. Browse our professional instructors list and book your slot today!
          </p>
          <Link href="/tutors" className="btn btn-primary rounded-xl font-bold px-6 shadow-md shadow-primary/10">
            Find Elite Tutors
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-200/80 shadow-md">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50 text-base-content/70">
                <th className="font-bold text-xs uppercase tracking-wider py-4">Tutor name</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4">Student name</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4">Student Email</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4">Status Token</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-base-200/30 transition-colors border-b border-base-200">
                  <td className="py-4">
                    <p className="font-bold text-sm text-base-content">{booking.tutorName}</p>
                    <p className="text-[10px] text-base-content/50 font-semibold">Tutor ID: {booking.tutorId}</p>
                  </td>

                  <td className="py-4 text-sm font-semibold text-base-content/85">
                    {booking.studentName}
                  </td>

                  <td className="py-4 text-xs font-semibold text-base-content/60">
                    {booking.studentEmail}
                  </td>

                  <td className="py-4">
                    <span
                      className={`badge badge-sm font-bold uppercase tracking-wider text-[9px] px-2.5 py-2.5 ${
                        booking.status === 'booked'
                          ? 'badge-success text-success-content'
                          : 'badge-ghost border-base-300 text-base-content/40'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="py-4 text-right">
                    {booking.status === 'booked' ? (
                      <button
                        onClick={() => setCancellingBooking(booking)}
                        className="btn btn-ghost hover:btn-error/10 hover:text-error btn-xs font-bold rounded-lg px-3 py-1.5 h-auto text-xs"
                      >
                        Cancel Class
                      </button>
                    ) : (
                      <span className="text-xs text-base-content/40 font-bold italic mr-2">Cancelled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cancellingBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-base-100 p-6 sm:p-8 rounded-2xl border border-base-200 shadow-2xl max-w-sm w-full relative animate-slide-in text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-error/15 flex items-center justify-center text-error mx-auto">
              <XCircle className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-xl text-base-content">Cancel Learning Slot?</h3>
              <p className="text-xs text-base-content/60 leading-relaxed">
                Are you sure you want to cancel your booked session with <strong>{cancellingBooking.tutorName}</strong>? Your slot will be released back to other students.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancellingBooking(null)}
                className="btn btn-ghost flex-1 rounded-xl text-xs font-bold"
                disabled={cancelling}
              >
                No, Keep Class
              </button>
              <button
                onClick={handleCancelConfirm}
                className="btn btn-error flex-1 rounded-xl text-xs font-bold text-error-content"
                disabled={cancelling}
              >
                {cancelling ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  'Yes, Cancel Session'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyBookedSessionsPage() {
  return <MyBookedSessionsList />;
}
