import React, { useState, useEffect } from 'react';

const FloatingElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = [];
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          size: Math.random() * 6 + 4,
          left: Math.random() * 100,
          animationDelay: Math.random() * 20,
          animationDuration: Math.random() * 10 + 20,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-float"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.left}%`,
            animationDelay: `${element.animationDelay}s`,
            animationDuration: `${element.animationDuration}s`,
            opacity: element.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
