import React, { useEffect, useState } from 'react';

const BackgroundHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newHeart = {
        id,
        left: Math.random() * 100,
        size: Math.random() * (30 - 10) + 10,
        duration: Math.random() * (15 - 5) + 5,
        opacity: Math.random() * (0.8 - 0.2) + 0.2,
      };
      setHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation duration
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, newHeart.duration * 1000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-particle flex items-center justify-center text-neonPink"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationName: 'heart-rise',
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};

export default BackgroundHearts;
