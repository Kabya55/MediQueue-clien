"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TitleUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    let title = 'MediQueue | Tutor Booking Platform';

    if (pathname === '/') {
      title = 'MediQueue | Elite Tutor Booking Platform';
    } else if (pathname === '/tutors') {
      title = 'MediQueue | Browse Professional Tutors';
    } else if (pathname.startsWith('/tutors/')) {
      title = 'MediQueue | Tutor Profiles & Details';
    } else if (pathname === '/add-tutor') {
      title = 'MediQueue | Offer Your Tutor Services';
    } else if (pathname === '/my-tutors') {
      title = 'MediQueue | Manage Your Tutor Profiles';
    } else if (pathname === '/my-booked-sessions') {
      title = 'MediQueue | My Scheduled Learning Classes';
    } else if (pathname === '/login') {
      title = 'MediQueue | Log In';
    } else if (pathname === '/register') {
      title = 'MediQueue | Create An Account';
    } else if (pathname === '/404') {
      title = 'MediQueue | Page Not Found';
    }

    document.title = title;
  }, [pathname]);

  return null;
}
