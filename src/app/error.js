"use client";

import React, { useEffect } from 'react';
import { RefreshCw, AlertOctagon, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Next.js App error caught:', error);
  }, [error]);

  return (
    <div className="flex-grow bg-gradient-to-b from-base-200/40 to-base-100 flex flex-col items-center justify-center py-20 px-6 text-center min-h-[70vh]">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center text-error mx-auto shadow-sm">
          <AlertOctagon className="h-10 w-10 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Something Went Wrong</h1>
          <p className="text-sm text-base-content/60 leading-relaxed max-w-xs mx-auto">
            An unexpected error occurred in your learning session dashboard. Our academic staff has been notified!
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => reset()}
            className="btn btn-primary rounded-xl font-bold gap-2 text-sm px-6 shadow-md shadow-primary/10 text-primary-content hover:scale-105 transition-all"
          >
            <RefreshCw className="h-4.5 w-4.5" /> Try Resetting
          </button>
          <Link href="/" className="btn btn-outline hover:btn-primary rounded-xl font-bold gap-2 text-sm px-6 hover:scale-105 transition-all">
            <Home className="h-4.5 w-4.5" /> Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
