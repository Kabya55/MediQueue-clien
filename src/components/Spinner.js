import React from 'react';

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-sm font-medium tracking-wider text-base-content/60 animate-pulse">
        Loading MediQueue...
      </p>
    </div>
  );
}
