import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ variant = 'button', className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === 'dropdown') {
    return (
      <div className={`relative group ${className}`}>
        <button
          className={`
            p-3 rounded-xl transition-all duration-300 transform hover:scale-110
            ${isDark 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          `}
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <div className="relative">
            {isDark ? (
              <FaSun className="text-lg transition-transform duration-300 group-hover:rotate-45" />
            ) : (
              <FaMoon className="text-lg transition-transform duration-300 group-hover:-rotate-12" />
            )}
            
            {/* Glow effect */}
            <div className={`
              absolute inset-0 rounded-full transition-opacity duration-300
              ${isDark 
                ? 'bg-yellow-400/20 opacity-0 group-hover:opacity-100' 
                : 'bg-blue-400/20 opacity-0 group-hover:opacity-100'
              }
              blur-sm -z-10
            `} />
          </div>
        </button>
      </div>
    );
  }

  return (
    <button
      className={`
        relative flex items-center justify-center w-12 h-12 rounded-full
        transition-all duration-300 transform hover:scale-110 focus:scale-105
        ${isDark 
          ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-yellow-400 shadow-lg shadow-gray-900/25' 
          : 'bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 shadow-lg shadow-blue-500/25'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        hover:shadow-xl ${className}
      `}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Currently ${theme} mode. Click to switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background animation */}
      <div className={`
        absolute inset-0 rounded-full transition-all duration-500
        ${isDark 
          ? 'bg-gradient-to-br from-yellow-400/10 to-orange-400/10' 
          : 'bg-gradient-to-br from-blue-400/10 to-purple-400/10'
        }
        scale-0 group-hover:scale-100
      `} />
      
      {/* Icon container */}
      <div className="relative z-10 transition-transform duration-300">
        {isDark ? (
          <FaSun className="text-lg animate-pulse" />
        ) : (
          <FaMoon className="text-lg" />
        )}
      </div>
      
      {/* Outer glow */}
      <div className={`
        absolute -inset-1 rounded-full transition-opacity duration-300
        ${isDark 
          ? 'bg-yellow-400/30 opacity-0 hover:opacity-75' 
          : 'bg-blue-400/30 opacity-0 hover:opacity-75'
        }
        blur-md -z-10
      `} />
    </button>
  );
};

export default ThemeToggle;
