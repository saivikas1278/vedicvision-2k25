import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({ 
  children, 
  content, 
  position = "top", 
  delay = 300,
  className = "",
  interactive = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  const positions = {
    top: {
      tooltip: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      arrow: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900"
    },
    bottom: {
      tooltip: "top-full left-1/2 transform -translate-x-1/2 mt-2",
      arrow: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900"
    },
    left: {
      tooltip: "right-full top-1/2 transform -translate-y-1/2 mr-2",
      arrow: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900"
    },
    right: {
      tooltip: "left-full top-1/2 transform -translate-y-1/2 ml-2",
      arrow: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900"
    }
  };

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    if (!interactive) {
      setIsVisible(false);
    }
  };

  const handleTooltipMouseEnter = () => {
    if (interactive) {
      setIsVisible(true);
    }
  };

  const handleTooltipMouseLeave = () => {
    if (interactive) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const selectedPosition = positions[position];

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg
            transition-all duration-200 ease-out
            ${selectedPosition.tooltip}
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {content}
          <div 
            className={`absolute w-0 h-0 border-4 ${selectedPosition.arrow}`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
