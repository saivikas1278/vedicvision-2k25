import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  glow = false,
  ...props 
}) => {
  const { isDark } = useTheme();

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return isDark
          ? 'bg-gray-800/30 backdrop-blur-xl border border-gray-600/30'
          : 'bg-white/30 backdrop-blur-xl border border-white/30';
      case 'solid':
        return isDark
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-gray-200';
      case 'gradient':
        return isDark
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600/50'
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200';
      default:
        return isDark
          ? 'bg-gray-800/50 border border-gray-700/50'
          : 'bg-white/50 border border-gray-200/50';
    }
  };

  const getHoverClasses = () => {
    if (!hover) return '';
    
    return isDark
      ? 'hover:bg-gray-700/60 hover:border-gray-600/70 hover:shadow-lg hover:shadow-cyan-500/10'
      : 'hover:bg-white/80 hover:border-gray-300/70 hover:shadow-lg hover:shadow-blue-500/10';
  };

  const getGlowClasses = () => {
    if (!glow) return '';
    
    return isDark
      ? 'shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30'
      : 'shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30';
  };

  return (
    <div
      className={`
        rounded-xl transition-all duration-300 
        ${getVariantClasses()}
        ${getHoverClasses()}
        ${getGlowClasses()}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
