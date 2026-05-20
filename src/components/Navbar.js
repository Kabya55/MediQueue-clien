"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  Sun,
  Moon,
  LogOut,
  User,
  BookOpen,
  GraduationCap,
  Menu,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `btn btn-sm font-medium rounded-full transition-all duration-300 ${
      isActive(path)
        ? "bg-primary/15 text-primary border border-primary/20 shadow-sm backdrop-blur-md"
        : "btn-ghost text-base-content/80 hover:bg-base-200/40 hover:border-base-200/50 border border-transparent backdrop-blur-sm"
    }`;

  const mobileLinkClass = (path) =>
    `font-medium ${
      isActive(path)
        ? "text-primary bg-primary/10 font-semibold"
        : "text-base-content/85"
    }`;

  return (
    <div className="navbar sticky top-0 z-50 glass-nav border-b border-base-200 px-4 sm:px-8 shadow-sm">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle text-base-content"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-2xl w-64 border border-base-200 gap-1"
          >
            <li>
              <Link href="/" className={mobileLinkClass("/")}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/tutors" className={mobileLinkClass("/tutors")}>
                Tutors
              </Link>
            </li>

            {user && (
              <>
                <li>
                  <Link
                    href="/add-tutor"
                    className={mobileLinkClass("/add-tutor")}
                  >
                    Add Tutor
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-tutors"
                    className={mobileLinkClass("/my-tutors")}
                  >
                    My Tutors
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-booked-sessions"
                    className={mobileLinkClass("/my-booked-sessions")}
                  >
                    My Bookings
                  </Link>
                </li>
              </>
            )}

            {/* Mobile Login/Register */}
            {!user && (
              <>
                <div className="border-t border-base-200 my-2"></div>

                <li>
                  <Link
                    href="/login"
                    className="btn btn-sm w-full rounded-full font-semibold text-base-content/90 hover:text-primary bg-base-200/40 hover:bg-base-200/60 border border-base-200/50"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    className="btn btn-sm w-full rounded-full font-semibold bg-primary/90 hover:bg-primary text-primary-content border border-primary/30"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90">
          <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-primary-content shadow-md shadow-primary/20 border border-primary/30 backdrop-blur-md">
            <GraduationCap className="h-6 w-6" />
          </div>

          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MediQueue
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <div className="flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          <Link href="/tutors" className={linkClass("/tutors")}>
            Tutors
          </Link>

          {user && (
            <>
              <Link href="/add-tutor" className={linkClass("/add-tutor")}>
                Add Tutor
              </Link>

              <Link href="/my-tutors" className={linkClass("/my-tutors")}>
                My Tutors
              </Link>

              <Link
                href="/my-booked-sessions"
                className={linkClass("/my-booked-sessions")}
              >
                My Booked Sessions
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-sm text-base-content/80 hover:text-primary transition-all bg-base-200/40 hover:bg-base-200/60 border border-base-200/50 backdrop-blur-md shadow-sm"
          title={
            theme === "emerald" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
          aria-label="Toggle theme"
        >
          {theme === "emerald" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>

        {/* User Dropdown */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar online ring-2 ring-primary/20 ring-offset-2"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <Image
                  width={500}
                  height={300}
                  src={
                    user.image ||
                    user.photoUrl ||
                    "https://via.placeholder.com/150"
                  }
                  alt={user.name || "User Profile"}
                  onError={(e) => {
                    e.target.src =
                      "https://api.dicebear.com/7.x/adventurer/svg?seed=" +
                      encodeURIComponent(user.name || "avatar");
                  }}
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-60 border border-base-200 gap-1"
            >
              <div className="px-3 py-2 border-b border-base-200 mb-1">
                <p className="font-semibold text-base text-base-content truncate">
                  {user.name}
                </p>

                <p className="text-xs text-base-content/60 truncate">
                  {user.email}
                </p>
              </div>

              <li>
                <Link
                  href="/my-tutors"
                  className="flex items-center gap-2 text-base-content py-2"
                >
                  <User className="h-4 w-4 text-base-content/60" />
                  My Profile & Tutors
                </Link>
              </li>

              <li>
                <Link
                  href="/my-booked-sessions"
                  className="flex items-center gap-2 text-base-content py-2"
                >
                  <BookOpen className="h-4 w-4 text-base-content/60" />
                  My Bookings
                </Link>
              </li>

              <div className="border-t border-base-200 my-1"></div>

              <li>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-error hover:bg-error/10 py-2 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* Desktop Login/Register */
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="btn btn-sm rounded-full font-semibold text-base-content/90 hover:text-primary bg-base-200/40 hover:bg-base-200/60 border border-base-200/50 backdrop-blur-md transition-all shadow-sm"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="btn btn-sm rounded-full px-5 shadow-md font-semibold bg-primary/90 hover:bg-primary text-primary-content border border-primary/30 backdrop-blur-md transition-all hover:shadow-lg"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
