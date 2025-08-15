import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  glow = false,
  ...props 
}) => {
  const { isDark, getCurrentPalette } = useTheme();
  const palette = getCurrentPalette();

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return isDark
          ? 'glass border-primary bg-opacity-20'
          : 'glass border-primary bg-opacity-10';
      case 'solid':
        return 'bg-primary border border-primary shadow-dark';
      case 'gradient':
        return `bg-gradient-brand text-white border-none shadow-dark-lg`;
      case 'glow':
        return `bg-primary border border-primary glow shadow-dark`;
      default:
        return 'card shadow-dark hover:shadow-dark-lg';
    }
  };

  const getHoverClasses = () => {
    if (!hover) return '';
    
    return 'hover-lift interactive';
  };

  const getGlowClasses = () => {
    if (!glow) return '';
    
    return variant === 'gradient' ? 'animate-glow' : 'hover-glow';
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
      style={variant === 'gradient' ? {
        background: palette.gradient.replace('from-', 'linear-gradient(135deg, ').replace(' to-', ', ')
      } : {}}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
