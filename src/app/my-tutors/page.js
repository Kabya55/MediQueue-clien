"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, API_BASE_URL } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import { Edit2, Trash2, AlertCircle, FileText, X, Check, Landmark, DollarSign, Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

function MyTutorsList() {
  const { fetchWithAuth } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingTutor, setEditingTutor] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    photoUrl: '',
    subject: 'Mathematics',
    availableDays: [],
    availableTime: '',
    hourlyFee: '',
    totalSlot: '',
    sessionStartDate: '',
    sessionEndDate: '',
    institution: '',
    experience: '',
    location: '',
    teachingMode: 'Online'
  });
  const [updating, setUpdating] = useState(false);

  const [deletingTutor, setDeletingTutor] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const fetchMyTutors = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/tutors/my`);
      if (response.ok) {
        const data = await response.json();
        setTutors(data);
      }
    } catch (error) {
      console.error('Failed to fetch user profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTutors();
  }, []);

  const handleOpenEdit = (tutor) => {
    setEditingTutor(tutor);
    setEditForm({
      name: tutor.name,
      photoUrl: tutor.photoUrl,
      subject: tutor.subject,
      availableDays: tutor.availableDays || [],
      availableTime: tutor.availableTime,
      hourlyFee: tutor.hourlyFee,
      totalSlot: tutor.totalSlot,
      sessionStartDate: tutor.sessionStartDate,
      sessionEndDate: tutor.sessionEndDate || '',
      institution: tutor.institution,
      experience: tutor.experience,
      location: tutor.location,
      teachingMode: tutor.teachingMode
    });
  };

  const handleEditDayChange = (day) => {
    if (editForm.availableDays.includes(day)) {
      setEditForm({
        ...editForm,
        availableDays: editForm.availableDays.filter((d) => d !== day)
      });
    } else {
      setEditForm({
        ...editForm,
        availableDays: [...editForm.availableDays, day]
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (editForm.availableDays.length === 0) {
      return toast.error('Select at least one day.');
    }

    setUpdating(true);
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/tutors/${editingTutor._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...editForm,
          hourlyFee: parseFloat(editForm.hourlyFee),
          totalSlot: parseInt(editForm.totalSlot)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }

      toast.success(data.message || 'Tutor details updated successfully!');
      setEditingTutor(null);

      setTutors(
        tutors.map((t) =>
          t._id === editingTutor._id
            ? { ...t, ...editForm, hourlyFee: parseFloat(editForm.hourlyFee), totalSlot: parseInt(editForm.totalSlot) }
            : t
        )
      );
    } catch (error) {
      toast.error(error.message || 'Failed to update details');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/tutors/${deletingTutor._id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      toast.success(data.message || 'Profile deleted successfully!');
      setTutors(tutors.filter((t) => t._id !== deletingTutor._id));
      setDeletingTutor(null);
    } catch (error) {
      toast.error(error.message || 'Failed to delete profile');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full bg-base-100 py-12 px-6 sm:px-8 max-w-6xl mx-auto flex-grow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-base-content tracking-tight">My Tutor Profiles</h1>
          <p className="text-sm text-base-content/60 mt-1">Manage and edit your listed session times, slots, and details</p>
        </div>
        <Link href="/add-tutor" className="btn btn-primary rounded-xl font-bold px-6 shadow-md shadow-primary/10 text-sm">
          + Add New Tutor Profile
        </Link>
      </div>

      {tutors.length === 0 ? (
        <div className="card bg-base-200 border border-base-300 p-12 text-center rounded-2xl max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="font-extrabold text-xl text-base-content">No Active Listings</h3>
          <p className="text-sm text-base-content/65 leading-relaxed">
            You haven't listed any tutor profiles yet. Publish your subject specialist details and start receiving active student slots!
          </p>
          <Link href="/add-tutor" className="btn btn-primary rounded-xl font-bold px-6 shadow-md shadow-primary/10">
            Create Tutor Profile
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-200/80 shadow-md">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50 text-base-content/70">
                <th className="font-bold text-xs uppercase tracking-wider py-4">Tutor Profile</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4">Subject</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4">Available Days & Time</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4">Total Slots</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4">Hourly Fee</th>
                <th className="font-bold text-xs uppercase tracking-wider py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor) => (
                <tr key={tutor._id} className="hover:bg-base-200/30 transition-colors border-b border-base-200">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-base-200 ring-1 ring-base-300">
                          <img
                            src={tutor.photoUrl}
                            alt={tutor.name}
                            onError={(e) => {
                              e.target.src = 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + encodeURIComponent(tutor.name);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-base-content">{tutor.name}</p>
                        <p className="text-[10px] text-base-content/50 font-semibold truncate max-w-[150px]">{tutor.institution}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4">
                    <span className="badge badge-primary badge-sm font-semibold">{tutor.subject}</span>
                  </td>

                  <td className="py-4 space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {tutor.availableDays.map((day, idx) => (
                        <span key={idx} className="badge badge-neutral badge-xs font-semibold px-1.5 py-0.5">
                          {day}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-base-content/60 font-medium">🕒 {tutor.availableTime}</p>
                  </td>

                  <td className="py-4 font-bold text-sm">
                    <span className={tutor.totalSlot > 0 ? 'text-primary' : 'text-error'}>{tutor.totalSlot} slots</span>
                  </td>

                  <td className="py-4 font-black text-sm text-primary">${tutor.hourlyFee}/hr</td>

                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(tutor)}
                        className="btn btn-ghost btn-square btn-sm hover:text-primary"
                        title="Edit profile"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeletingTutor(tutor)}
                        className="btn btn-ghost btn-square btn-sm hover:text-error"
                        title="Delete profile"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingTutor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-base-100 p-6 sm:p-8 rounded-2xl border border-base-200 shadow-2xl max-w-2xl w-full relative my-8 animate-slide-in">
            <button
              onClick={() => setEditingTutor(null)}
              className="btn btn-ghost btn-circle btn-sm absolute top-4 right-4 text-base-content/50"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-extrabold tracking-tight text-base-content mb-6">
              Update Tutor Profile
            </h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Tutor Name</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Photo URL</span>
                  </label>
                  <input
                    type="url"
                    value={editForm.photoUrl}
                    onChange={(e) => setEditForm({ ...editForm, photoUrl: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Subject</span>
                  </label>
                  <select
                    value={editForm.subject}
                    onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                    className="select select-bordered w-full rounded-xl text-sm font-medium"
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
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Arrangement</span>
                  </label>
                  <select
                    value={editForm.teachingMode}
                    onChange={(e) => setEditForm({ ...editForm, teachingMode: e.target.value })}
                    className="select select-bordered w-full rounded-xl text-sm font-medium"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Both">Both (Hybrid)</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Institution</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.institution}
                    onChange={(e) => setEditForm({ ...editForm, institution: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Experience</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.experience}
                    onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Hourly Fee ($ USD)</span>
                  </label>
                  <input
                    type="number"
                    value={editForm.hourlyFee}
                    onChange={(e) => setEditForm({ ...editForm, hourlyFee: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Total Slots</span>
                  </label>
                  <input
                    type="number"
                    value={editForm.totalSlot}
                    onChange={(e) => setEditForm({ ...editForm, totalSlot: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Location</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Start Date</span>
                  </label>
                  <input
                    type="date"
                    value={editForm.sessionStartDate}
                    onChange={(e) => setEditForm({ ...editForm, sessionStartDate: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm font-medium"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">End Date <span className="normal-case font-normal text-base-content/40">(optional)</span></span>
                  </label>
                  <input
                    type="date"
                    value={editForm.sessionEndDate}
                    min={editForm.sessionStartDate}
                    onChange={(e) => setEditForm({ ...editForm, sessionEndDate: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm font-medium"
                  />
                </div>

                <div className="form-control sm:col-span-2">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Time Slot Block</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.availableTime}
                    onChange={(e) => setEditForm({ ...editForm, availableTime: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="form-control sm:col-span-2 space-y-2">
                  <label className="label py-0.5">
                    <span className="label-text text-[11px] font-bold uppercase text-base-content/60">Available Days</span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {daysList.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleEditDayChange(day)}
                        className={`btn btn-xs rounded-lg font-bold border h-9 ${
                          editForm.availableDays.includes(day)
                            ? 'btn-primary text-primary-content border-primary'
                            : 'bg-base-200 text-base-content/70 border-base-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingTutor(null)}
                  className="btn btn-ghost rounded-xl text-xs font-bold px-6"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-primary rounded-xl text-xs font-bold px-8 gap-1 text-primary-content"
                >
                  {updating ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <>
                      <Check className="h-3.5 w-3.5" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingTutor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-base-100 p-6 sm:p-8 rounded-2xl border border-base-200 shadow-2xl max-w-sm w-full relative animate-slide-in text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-error/15 flex items-center justify-center text-error mx-auto">
              <Trash2 className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-xl text-base-content">Delete Tutor Listing?</h3>
              <p className="text-xs text-base-content/60 leading-relaxed">
                Are you sure you want to permanently delete the profile listing for <strong>{deletingTutor.name}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingTutor(null)}
                className="btn btn-ghost flex-1 rounded-xl text-xs font-bold"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="btn btn-error flex-1 rounded-xl text-xs font-bold text-error-content"
                disabled={deleting}
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  'Confirm Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyTutorsPage() {
  return <MyTutorsList />;
}
