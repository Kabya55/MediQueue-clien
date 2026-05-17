"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('emerald');

  useEffect(() => {
    const savedTheme = localStorage.getItem('mediQueue-theme');
    if (savedTheme === 'emerald' || savedTheme === 'forest') {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      setTheme('emerald');
      document.documentElement.setAttribute('data-theme', 'emerald');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'emerald' ? 'forest' : 'emerald';
    setTheme(newTheme);
    localStorage.setItem('mediQueue-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
