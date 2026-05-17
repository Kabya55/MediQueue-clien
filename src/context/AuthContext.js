"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext();

export const API_BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: sessionData } = await authClient.getSession();
        if (sessionData?.user) {
          setUser({ ...sessionData.user, _id: sessionData.user.id });
          const res = await fetch('/api/auth/token');
          const data = await res.json();
          if (data.token) {
            setToken(data.token);
          }
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('Failed to load user session:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({ email, password });
      if (error) throw new Error(error.message);
      
      setUser({ ...data.user, _id: data.user.id });
      const res = await fetch('/api/auth/token');
      const tokenData = await res.json();
      setToken(tokenData.token);
      
      toast.success('Logged in successfully!');
      return data.user;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, photoUrl, password) => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoUrl || '',
      });
      if (error) throw new Error(error.message);

      toast.success('Registration successful! You are now logged in.');
      if (data?.user) {
        setUser({ ...data.user, _id: data.user.id });
        const res = await fetch('/api/auth/token');
        const tokenData = await res.json();
        setToken(tokenData.token);
      }
      return data?.user;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({ provider: "google" });
      if (error) throw new Error(error.message);
    } catch (error) {
      toast.error(error.message || 'Google Login failed');
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await authClient.signOut();
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully.');
    router.push('/');
  };

  const fetchWithAuth = async (url, options = {}) => {
    let activeToken = token;
    
    if (!activeToken) {
       const res = await fetch('/api/auth/token');
       const data = await res.json();
       activeToken = data.token;
       if (activeToken) setToken(activeToken);
    }

    const headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    };

    if (activeToken) {
      headers['Authorization'] = `Bearer ${activeToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401 || response.status === 403) {
      logout();
      throw new Error('Your session expired. Please log in again.');
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        fetchWithAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
