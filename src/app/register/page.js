import React, { Suspense } from 'react';
import RegisterFormContent from "../../components/RegisterFormContent";

export default function RegisterPage() {
  return (
    <div className="flex-grow bg-gradient-to-b from-base-200/40 to-base-100 py-16 px-6 flex items-center justify-center min-h-[85vh]">
      <Suspense fallback={
        <div className="card bg-base-100 p-8 sm:p-10 shadow-xl border border-base-200/80 rounded-2xl w-full max-w-md flex items-center justify-center min-h-[400px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }>
        <RegisterFormContent />
      </Suspense>
    </div>
  );
}
