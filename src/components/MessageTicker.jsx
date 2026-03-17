import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageTicker = () => {
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

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
          transition={{ duration: 1 }}
          className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10"
        >
          <p className="text-white/80 italic text-sm md:text-base font-light">
            {messages[index]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MessageTicker;
