import React, { useEffect, useRef } from 'react';

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  distance = 50, 
  duration = 600,
  delay = 0,
  once = true,
  className = "" 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.transform = 'translate(0, 0)';
            element.style.opacity = '1';
            
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            // Reset animation if once is false
            switch (direction) {
              case 'up':
                element.style.transform = `translateY(${distance}px)`;
                break;
              case 'down':
                element.style.transform = `translateY(-${distance}px)`;
                break;
              case 'left':
                element.style.transform = `translateX(${distance}px)`;
                break;
              case 'right':
                element.style.transform = `translateX(-${distance}px)`;
                break;
              default:
                element.style.transform = `translateY(${distance}px)`;
            }
            element.style.opacity = '0';
          }
        });
      },
      { threshold: 0.1 }
    );

    // Set initial state
    switch (direction) {
      case 'up':
        element.style.transform = `translateY(${distance}px)`;
        break;
      case 'down':
        element.style.transform = `translateY(-${distance}px)`;
        break;
      case 'left':
        element.style.transform = `translateX(${distance}px)`;
        break;
      case 'right':
        element.style.transform = `translateX(-${distance}px)`;
        break;
      default:
        element.style.transform = `translateY(${distance}px)`;
    }
    
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`;

    observer.observe(element);

    return () => observer.disconnect();
  }, [direction, distance, duration, delay, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
