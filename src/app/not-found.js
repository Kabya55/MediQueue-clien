import React from 'react';
import Link from 'next/link';
import { Home, Compass, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex-grow bg-gradient-to-b from-base-200/40 to-base-100 flex flex-col items-center justify-center py-20 px-6 text-center min-h-[70vh]">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center text-error mx-auto shadow-sm">
          <AlertCircle className="h-10 w-10 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-primary">404</h1>
          <h2 className="text-2xl font-extrabold text-base-content tracking-tight">Classroom Not Found</h2>
          <p className="text-sm text-base-content/60 leading-relaxed max-w-xs mx-auto">
            Oops! The tutoring session link or dashboard path you followed doesn't seem to exist. It might have been rescheduled or cancelled.
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-2">
          <Link href="/" className="btn btn-primary rounded-xl font-bold gap-2 text-sm px-6 shadow-md shadow-primary/10 text-primary-content hover:scale-105 transition-all">
            <Home className="h-4.5 w-4.5" /> Back to Home
          </Link>
          <Link href="/tutors" className="btn btn-outline hover:btn-primary rounded-xl font-bold gap-2 text-sm px-6 hover:scale-105 transition-all">
            <Compass className="h-4.5 w-4.5" /> Find Tutors
          </Link>
        </div>
      </div>
    </div>
  );
}
