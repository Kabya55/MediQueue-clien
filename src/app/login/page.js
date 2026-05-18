"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

function LoginFormContent() {
  const { user, login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = searchParams.get('from') || '/';

  useEffect(() => {
    if (user) {
      router.replace(redirectPath);
    }
  }, [user, router, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please enter both email and password');
    }

    setSubmitting(true);
    try {
      await login(email, password);
      router.push(redirectPath);
    } catch (error) {
      console.error('Credential login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    try {
      const mockGoogleAccount = {
        name: 'Kabya Student',
        email: 'kabya.student@gmail.com',
        photoUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=kabya'
      };

      await new Promise((resolve) => setTimeout(resolve, 800));
      await loginWithGoogle(mockGoogleAccount);
      router.push(redirectPath);
    } catch (error) {
      console.error('Google social login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 p-8 sm:p-10 shadow-xl border border-base-200/80 rounded-2xl w-full max-w-md">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Welcome Back</h1>
        <p className="text-sm text-base-content/65">Log in to schedule your learning sessions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="you@example.com"
              className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <div className="flex justify-between items-center py-1">
            <label className="label p-0">
              <span className="label-text font-semibold text-base-content/80 text-xs uppercase tracking-wider">Password</span>
            </label>
            <button
              type="button"
              onClick={() => toast.error('Email verification & forget password features are disabled for developer evaluation convenience.')}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Forget Password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
              <Lock className="h-4.5 w-4.5" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input input-bordered pl-11 w-full rounded-xl focus:input-primary text-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full rounded-xl font-bold gap-2 mt-2 shadow-md shadow-primary/10"
          disabled={submitting}
        >
          {submitting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <>
              <LogIn className="h-4 w-4" /> Log In
            </>
          )}
        </button>
      </form>

      <div className="divider my-6 text-xs text-base-content/40 uppercase tracking-widest font-semibold">Or continue with</div>

      <button
        onClick={handleGoogleLogin}
        disabled={submitting}
        className="btn btn-outline hover:btn-primary w-full rounded-xl font-semibold gap-2 border-base-300 text-base-content/80"
      >
        <svg className="h-4.5 w-4.5 fill-current text-primary" viewBox="0 0 24 24">
          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.414 0-6.19-2.776-6.19-6.19 0-3.414 2.776-6.19 6.19-6.19 1.483 0 2.844.526 3.916 1.397l3.056-3.056C19.167 1.848 15.938 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.967-4.248 10.967-11.24 0-.705-.083-1.398-.247-1.955H12.24z" />
        </svg>
        Google Login
      </button>

      <p className="text-center text-sm text-base-content/65 mt-8">
        Don't have an account?{' '}
        <Link href="/register" className="text-primary font-bold hover:underline">
          Register Here
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex-grow bg-gradient-to-b from-base-200/40 to-base-100 py-16 px-6 flex items-center justify-center min-h-[80vh]">
      <Suspense fallback={
        <div className="card bg-base-100 p-8 sm:p-10 shadow-xl border border-base-200/80 rounded-2xl w-full max-w-md flex items-center justify-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
