import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Color palette definitions
export const COLOR_PALETTES = {
  blue: {
    name: 'Ocean Blue',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#06b6d4',
    gradient: 'from-blue-600 to-cyan-600'
  },
  purple: {
    name: 'Royal Purple',
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    accent: '#a855f7',
    gradient: 'from-purple-600 to-pink-600'
  },
  green: {
    name: 'Forest Green',
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    gradient: 'from-green-600 to-emerald-600'
  },
  orange: {
    name: 'Sunset Orange',
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fbbf24',
    gradient: 'from-orange-600 to-red-600'
  },
  red: {
    name: 'Crimson Red',
    primary: '#ef4444',
    secondary: '#dc2626',
    accent: '#f87171',
    gradient: 'from-red-600 to-pink-600'
  },
  teal: {
    name: 'Ocean Teal',
    primary: '#14b8a6',
    secondary: '#0d9488',
    accent: '#5eead4',
    gradient: 'from-teal-600 to-cyan-600'
  },
  indigo: {
    name: 'Deep Indigo',
    primary: '#6366f1',
    secondary: '#4f46e5',
    accent: '#818cf8',
    gradient: 'from-indigo-600 to-purple-600'
  },
  rose: {
    name: 'Rose Pink',
    primary: '#f43f5e',
    secondary: '#e11d48',
    accent: '#fb7185',
    gradient: 'from-rose-600 to-pink-600'
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('sportSphere-theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference - default to dark
    return 'dark';
  });

  const [colorPalette, setColorPalette] = useState(() => {
    const savedPalette = localStorage.getItem('sportSphere-color-palette');
    return savedPalette || 'blue';
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('sportSphere-theme', theme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Save color palette to localStorage
    localStorage.setItem('sportSphere-color-palette', colorPalette);
    
    // Apply color palette to document
    const root = document.documentElement;
    const palette = COLOR_PALETTES[colorPalette];
    
    // Remove existing palette classes
    Object.keys(COLOR_PALETTES).forEach(key => {
      root.classList.remove(`palette-${key}`);
    });
    
    // Add current palette class
    root.classList.add(`palette-${colorPalette}`);
    root.setAttribute('data-palette', colorPalette);
    
    // Set CSS custom properties for the palette
    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-secondary', palette.secondary);
    root.style.setProperty('--color-accent', palette.accent);
  }, [colorPalette]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only auto-change if user hasn't manually set a preference
      if (!localStorage.getItem('sportSphere-theme-manual')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Mark as manually set
    localStorage.setItem('sportSphere-theme-manual', 'true');
  };

  const setThemeMode = (mode) => {
    setTheme(mode);
    localStorage.setItem('sportSphere-theme-manual', 'true');
  };

  const changeColorPalette = (palette) => {
    if (COLOR_PALETTES[palette]) {
      setColorPalette(palette);
    }
  };

  const getCurrentPalette = () => {
    return COLOR_PALETTES[colorPalette];
  };

  const value = {
    theme,
    colorPalette,
    toggleTheme,
    setThemeMode,
    changeColorPalette,
    getCurrentPalette,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    availablePalettes: COLOR_PALETTES
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
