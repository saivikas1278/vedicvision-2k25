import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const DarkThemeBackground = ({ children }) => {
  const { isDark, getCurrentPalette } = useTheme();
  const palette = getCurrentPalette();

  if (!isDark) return children;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, ${palette.primary}15 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${palette.accent}15 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${palette.secondary}10 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
          `,
        }}
      />
      
      {/* Floating particles */}
      <div className="fixed inset-0 z-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DarkThemeBackground;
