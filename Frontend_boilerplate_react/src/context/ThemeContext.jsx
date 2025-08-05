import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to dark theme
    return true;
  });

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const setTheme = (isDark) => {
    setIsDarkTheme(isDark);
  };

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    
    // Update document class for global theme
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const value = {
    isDarkTheme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 