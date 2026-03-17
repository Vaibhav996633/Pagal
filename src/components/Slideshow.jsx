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
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        if (currentIndex < messages.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          onComplete();
        }
      }, 3500); // Faster interval (was 5000)
      return () => clearTimeout(timer);
    }
  }, [currentIndex, messages.length, onComplete]);

  return (
    <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
           key={currentIndex}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1.0, ease: "easeInOut" }} // Faster fade (was 1.5)
           className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
        >
          {/* Aesthetic Background Blur for depth */}
          <div 
             className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110"
             style={{ backgroundImage: `url(${images[currentIndex % images.length]})` }}
          />

          {/* Main Photo Frame */}
          <div className="relative w-full h-full max-w-5xl max-h-[80vh] rounded-3xl overflow-hidden glass border border-white/10 shadow-[0_0_80px_rgba(255,45,85,0.2)]">
            {/* Ken-burns zoom */}
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3.5, ease: "linear" }} // Match interval
              className="w-full h-full"
            >
              <img
                src={images[currentIndex % images.length]}
                alt="Memory"
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            {/* Text & Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 flex flex-col items-center">
              <motion.h2
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                className="text-2xl md:text-5xl font-bold text-white text-center italic drop-shadow-[0_4px_30px_rgba(0,0,0,1)] leading-snug px-4"
              >
                {messages[currentIndex]}
              </motion.h2>

              {/* Progress indicator */}
              <div className="mt-12 flex gap-4 w-full max-w-xs justify-center opacity-50">
                {messages.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                       scale: i === currentIndex ? 1.4 : 1,
                       backgroundColor: i === currentIndex ? "#ff2d55" : "rgba(255,255,255,0.2)" 
                    }}
                    className="h-1.5 w-1.5 rounded-full"
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
