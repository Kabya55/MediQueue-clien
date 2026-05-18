"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, API_BASE_URL } from '../../context/AuthContext';
import { PlusCircle, User, Link as LinkIcon, BookOpen, Clock, Calendar, Landmark, MapPin, Send, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function AddTutorForm() {
  const { fetchWithAuth } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTime, setAvailableTime] = useState('');
  const [hourlyFee, setHourlyFee] = useState('');
  const [totalSlot, setTotalSlot] = useState('');
  const [sessionStartDate, setSessionStartDate] = useState('');
  const [sessionEndDate, setSessionEndDate] = useState('');
  const [institution, setInstitution] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [teachingMode, setTeachingMode] = useState('Online');
  const [submitting, setSubmitting] = useState(false);

  const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayChange = (day) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter((d) => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (availableDays.length === 0) {
      return toast.error('Please select at least one available day.');
    }

    setSubmitting(true);
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/tutors`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          photoUrl,
          subject,
          availableDays,
          availableTime,
          hourlyFee: parseFloat(hourlyFee),
          totalSlot: parseInt(totalSlot),
          sessionStartDate,
          sessionEndDate: sessionEndDate || null,
          institution,
          experience,
          location,
          teachingMode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add tutor profile');
      }

      toast.success(data.message || 'Tutor profile published successfully!');
      router.push('/my-tutors');
    } catch (error) {
      toast.error(error.message || 'Failed to submit profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-base-200/40 to-base-100 py-12 px-6 sm:px-8 max-w-3xl mx-auto flex-grow">
      <div className="card bg-base-100 p-8 sm:p-10 shadow-xl border border-base-200/80 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <PlusCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Become an Instructor</h1>
            <p className="text-sm text-base-content/65">List your tutoring session schedule for active students</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Tutor Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                  <User className="h-4.5 w-4.5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Sarah Connor"
                  className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Photo Image URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                  <LinkIcon className="h-4.5 w-4.5" />
                </div>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Subject / Category</span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="select select-bordered w-full rounded-xl focus:select-primary text-sm font-medium"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Teaching Arrangement</span>
              </label>
              <select
                value={teachingMode}
                onChange={(e) => setTeachingMode(e.target.value)}
                className="select select-bordered w-full rounded-xl focus:select-primary text-sm font-medium"
              >
                <option value="Online">Online Sessions Only</option>
                <option value="Offline">Offline Face-To-Face</option>
                <option value="Both">Both (Hybrid)</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Institution / Degree</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                  <Landmark className="h-4.5 w-4.5" />
                </div>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="MIT Dept of Mathematics"
                  className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Years of Experience</span>
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 5 Years or 8+ Years"
                className="input input-bordered w-full rounded-xl focus:input-primary text-sm"
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Hourly Fee ($ USD)</span>
              </label>
              <input
                type="number"
                value={hourlyFee}
                onChange={(e) => setHourlyFee(e.target.value)}
                placeholder="40"
                min="0"
                className="input input-bordered w-full rounded-xl focus:input-primary text-sm"
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Total Slots Available</span>
              </label>
              <input
                type="number"
                value={totalSlot}
                onChange={(e) => setTotalSlot(e.target.value)}
                placeholder="5"
                min="1"
                className="input input-bordered w-full rounded-xl focus:input-primary text-sm"
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Teaching Area / Location</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Dhaka, BD or Online"
                  className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Session Start Date</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
                <input
                  type="date"
                  value={sessionStartDate}
                  onChange={(e) => setSessionStartDate(e.target.value)}
                  className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Session End Date <span className="text-base-content/40 normal-case font-normal">(optional)</span></span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
                <input
                  type="date"
                  value={sessionEndDate}
                  min={sessionStartDate}
                  onChange={(e) => setSessionEndDate(e.target.value)}
                  className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm font-medium"
                />
              </div>
            </div>

            <div className="form-control sm:col-span-2">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Available Hour Slots block</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <input
                  type="text"
                  value={availableTime}
                  onChange={(e) => setAvailableTime(e.target.value)}
                  placeholder="Sun - Thu 5:00 PM - 8:00 PM"
                  className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
                  required
                />
              </div>
            </div>

            <div className="form-control sm:col-span-2 space-y-2.5">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-base-content/65 tracking-wider">Select Available Days</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
                {daysList.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayChange(day)}
                    className={`btn btn-xs rounded-lg font-bold border h-9 ${
                      availableDays.includes(day)
                        ? 'btn-primary text-primary-content border-primary shadow-xs'
                        : 'bg-base-200 text-base-content/70 border-base-300 hover:bg-base-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full rounded-xl font-bold mt-4 shadow-md shadow-primary/10 gap-2 text-primary-content"
          >
            {submitting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <>
                <Send className="h-4.5 w-4.5" /> Create Tutor Slot
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AddTutorPage() {
  return <AddTutorForm />;
}
