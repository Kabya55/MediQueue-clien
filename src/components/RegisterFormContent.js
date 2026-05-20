"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Link as LinkIcon, Lock, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterFormContent() {
  const { user, register, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const validatePassword = (pass) => {
    if (!pass) return '';
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const isValidLength = pass.length >= 6;

    if (!isValidLength) {
      return 'Password must be at least 6 characters long.';
    }
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter.';
    }
    return '';
  };

  useEffect(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !photoUrl || !password) {
      return toast.error('All fields are required.');
    }

    const currentError = validatePassword(password);
    if (currentError) {
      setPasswordError(currentError);
      return toast.error(currentError);
    }

    setSubmitting(true);
    try {
      await register(name, email, photoUrl, password);
      router.push('/login');
    } catch (error) {
      console.error('Credential registration error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setSubmitting(true);
    try {
      const mockGoogleAccount = {
        name: 'Kabya Student',
        email: 'kabya.student@gmail.com',
        photoUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=kabya'
      };

      await new Promise((resolve) => setTimeout(resolve, 800));
      await loginWithGoogle(mockGoogleAccount);
      router.push('/');
    } catch (error) {
      console.error('Google social login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 p-8 sm:p-10 shadow-xl border border-base-200/80 rounded-2xl w-full max-w-md">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Create Account</h1>
        <p className="text-sm text-base-content/65">Register to unlock personalized tutor schedules</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-semibold text-base-content/80 text-xs uppercase tracking-wider">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
              <User className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-semibold text-base-content/80 text-xs uppercase tracking-wider">Email Address</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
              <Mail className="h-4.5 w-4.5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-semibold text-base-content/80 text-xs uppercase tracking-wider">Profile Photo URL</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
              <LinkIcon className="h-4.5 w-4.5" />
            </div>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-semibold text-base-content/80 text-xs uppercase tracking-wider">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
              <Lock className="h-4.5 w-4.5" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 chars, A-Z, a-z"
              className={`input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm ${
                passwordError ? 'border-error' : ''
              }`}
              required
            />
          </div>
          {passwordError && (
            <p className="text-xs text-error font-medium mt-1.5 pl-1">
              ⚠️ {passwordError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full rounded-xl font-bold gap-2 mt-4 shadow-md shadow-primary/10"
          disabled={submitting || !!passwordError}
        >
          {submitting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <>
              <UserPlus className="h-4.5 w-4.5" /> Register
            </>
          )}
        </button>
      </form>

      <div className="divider my-5 text-xs text-base-content/40 uppercase tracking-widest font-semibold">Or join with</div>

      <button
        onClick={handleGoogleRegister}
        disabled={submitting}
        className="btn btn-outline hover:btn-primary w-full rounded-xl font-semibold gap-2 border-base-300 text-base-content/80"
      >
        <svg className="h-4.5 w-4.5 fill-current text-primary" viewBox="0 0 24 24">
          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.414 0-6.19-2.776-6.19-6.19 0-3.414 2.776-6.19 6.19-6.19 1.483 0 2.844.526 3.916 1.397l3.056-3.056C19.167 1.848 15.938 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.967-4.248 10.967-11.24 0-.705-.083-1.398-.247-1.955H12.24z" />
        </svg>
        Google Login
      </button>

      <p className="text-center text-sm text-base-content/65 mt-8">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Log In Here
        </Link>
      </p>
    </div>
  );
}
