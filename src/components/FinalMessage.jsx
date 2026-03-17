import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const FinalMessage = () => {
  useEffect(() => {
    // Burst of confetti on enter
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut" 
          }}
          className="space-y-8"
        >
          <h1 className="text-6xl md:text-9xl font-black bg-gradient-to-r from-neonPink via-neonPurple to-neonBlue bg-clip-text text-transparent italic drop-shadow-[0_0_30px_rgba(255,0,127,0.5)]">
            HAPPY BIRTHDAY! 🎂
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold neon-blue italic">
            You are truly special 💖
          </h2>
          <p className="text-xl md:text-3xl text-white/80 font-light italic max-w-2xl mx-auto">
            This magical journey was made just for you, with all my love. May your day be as beautiful as you are.
          </p>
          
          <div className="pt-12">
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                filter: ['drop-shadow(0 0 20px rgba(255, 0, 127, 0.5))', 'drop-shadow(0 0 50px rgba(255, 0, 127, 1))', 'drop-shadow(0 0 20px rgba(255, 0, 127, 0.5))']
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-9xl"
            >
              ❤️
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating background hearts extra burst */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0.5],
              x: Math.random() * 400 - 200,
              y: Math.random() * -400 - 100
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute left-1/2 top-1/2 text-4xl"
          >
            💖
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinalMessage;
