import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon, FaPalette, FaCog } from 'react-icons/fa';
import ThemeSettings from './ThemeSettings';

const ThemeToggle = ({ showSettings = true, className = "" }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-secondary hover:bg-tertiary border border-primary transition-all duration-200 group relative overflow-hidden"
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <div className="relative z-10 flex items-center justify-center">
            {isDark ? (
              <FaSun className="w-4 h-4 text-yellow-500 transform transition-transform duration-300 group-hover:rotate-180" />
            ) : (
              <FaMoon className="w-4 h-4 text-blue-500 transform transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </div>
          
          {/* Animated background */}
          <div className={`absolute inset-0 transform transition-transform duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 translate-x-full group-hover:translate-x-0' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 -translate-x-full group-hover:translate-x-0'
          }`} />
        </button>

        {/* Theme Settings Button */}
        {showSettings && (
          <button
            onClick={() => setShowThemeSettings(true)}
            className="p-2 rounded-lg bg-secondary hover:bg-tertiary border border-primary transition-all duration-200 group"
            title="Theme settings"
          >
            <FaPalette className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
          </button>
        )}
      </div>

      {/* Theme Settings Modal */}
      <ThemeSettings 
        isOpen={showThemeSettings}
        onClose={() => setShowThemeSettings(false)}
      />
    </>
  );
};

export default ThemeToggle;
