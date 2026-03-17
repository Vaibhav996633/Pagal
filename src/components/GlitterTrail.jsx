import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlitterTrail = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 2,
        color: Math.random() > 0.5 ? '#ff007f' : '#00e5ff',
      };
      
      setPoints((prev) => [...prev.slice(-20), newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {points.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: point.y + 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'fixed',
              left: point.x,
              top: point.y,
              width: point.size,
              height: point.size,
              backgroundColor: point.color,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${point.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlitterTrail;
