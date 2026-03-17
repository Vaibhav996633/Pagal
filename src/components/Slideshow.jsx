import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slideshow = ({ images, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = [
    "You're the best thing that ever happened to me 💖",
    "I love you more than words can say ✨",
    "You make every day brighter ☀️",
    "Forever grateful for you ❤️",
    "You're my favorite person in the world 🌎",
    "Thinking of you... always 💭",
    "You're simply amazing 🌟",
    "My heart belongs to you 🔐"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < messages.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        clearInterval(timer);
        setTimeout(onComplete, 2500);
      }
    }, 4500); 

    return () => clearInterval(timer);
  }, [currentIndex, messages.length, onComplete]);

  return (
    <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2 }}
          className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
        >
          {/* Main Image */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(255,45,85,0.4)] border border-white/10 glass">
            <img
              src={images[currentIndex % images.length]}
              alt="Romantic Memory"
              className="w-full h-full object-contain"
            />
            
            {/* Darker Overlay for Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
            
            {/* Text Message */}
            <div className="absolute inset-x-0 bottom-0 p-10 md:p-16 flex flex-col items-center">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                className="text-2xl md:text-5xl font-bold text-white text-center italic drop-shadow-[0_2px_20px_rgba(0,0,0,1)] leading-snug"
              >
                {messages[currentIndex]}
              </motion.h2>
              
              {/* Progress Bar */}
              <div className="mt-12 flex gap-3 w-full max-w-sm justify-center">
                {messages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-700 ${
                      i === currentIndex ? 'bg-neonPink w-12' : 'bg-white/20 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Slideshow;
