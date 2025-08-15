import React, { useState, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const GradientButton = ({ 
  children, 
  className = "", 
  variant = "primary",
  size = "md",
  animated = true,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);
  const { getCurrentPalette, isDark } = useTheme();
  const palette = getCurrentPalette();

  const variants = {
    primary: {
      gradient: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
      hoverGradient: `linear-gradient(135deg, ${palette.secondary}, ${palette.primary})`,
      text: 'text-white',
      shadow: isDark ? 'shadow-dark-lg' : 'shadow-lg',
    },
    secondary: {
      gradient: isDark 
        ? 'linear-gradient(135deg, #475569, #64748b)' 
        : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
      hoverGradient: isDark 
        ? 'linear-gradient(135deg, #64748b, #94a3b8)' 
        : 'linear-gradient(135deg, #cbd5e1, #94a3b8)',
      text: isDark ? 'text-white' : 'text-gray-700',
      shadow: isDark ? 'shadow-dark' : 'shadow-md',
    },
    success: {
      gradient: 'linear-gradient(135deg, #10b981, #34d399)',
      hoverGradient: 'linear-gradient(135deg, #059669, #10b981)',
      text: 'text-white',
      shadow: isDark ? 'shadow-dark-lg' : 'shadow-lg',
    },
    danger: {
      gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
      hoverGradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
      text: 'text-white',
      shadow: isDark ? 'shadow-dark-lg' : 'shadow-lg',
    },
    glass: {
      gradient: isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(255, 255, 255, 0.2)',
      hoverGradient: isDark 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'rgba(255, 255, 255, 0.3)',
      text: isDark ? 'text-white' : 'text-gray-700',
      backdrop: true,
      border: isDark ? 'border border-white/20' : 'border border-black/20',
    },
    outline: {
      gradient: 'transparent',
      hoverGradient: isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : `rgba(${palette.primary}, 0.1)`,
      text: isDark ? 'text-white' : `text-[${palette.primary}]`,
      border: `border-2 border-[${palette.primary}]`,
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const selectedVariant = variants[variant];
  const selectedSize = sizes[size];

  const handleClick = (e) => {
    if (!animated) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);

    props.onClick?.(e);
  };

  const buttonStyle = {
    background: isHovered ? selectedVariant.hoverGradient : selectedVariant.gradient,
    ...(selectedVariant.backdrop && {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }),
  };

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-xl font-semibold
        transition-all duration-300 ease-out
        transform hover:scale-105 active:scale-95 hover-lift
        ${selectedVariant.text}
        ${selectedSize}
        ${selectedVariant.border || ''}
        ${selectedVariant.shadow || ''}
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        ${animated ? 'animate-glow' : ''}
        ${className}
      `}
      style={{
        ...buttonStyle,
        boxShadow: isHovered && variant === 'primary' 
          ? `0 10px 30px rgba(${palette.primary.replace('#', '')}, 0.4)` 
          : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      {...props}
    >
      {/* Enhanced Shimmer effect */}
      {animated && (
        <div 
          className={`
            absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
            transform -skew-x-12 transition-transform duration-1000 ease-out
            ${isHovered ? 'translate-x-full' : '-translate-x-full'}
          `}
        />
      )}

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      {/* Glow effect for primary variant */}
      {variant === 'primary' && animated && (
        <div 
          className="absolute inset-0 rounded-xl opacity-75 blur-xl"
          style={{
            background: palette.gradient,
            transform: 'scale(1.1)',
            zIndex: -1,
          }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default GradientButton;
