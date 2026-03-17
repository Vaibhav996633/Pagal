import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Smile, Frown } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showAngry, setShowAngry] = useState(false);

  const handleNoInteraction = () => {
    // Random move within some bounds
    const randomX = (Math.random() - 0.5) * 400;
    const randomY = (Math.random() - 0.5) * 400;
    setNoPosition({ x: randomX, y: randomY });
    setShowAngry(true);
    setTimeout(() => setShowAngry(false), 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-background z-50 p-4"
    >
      <div className="relative w-full mx-auto max-w-lg">
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-neonPink via-neonPurple to-neonBlue rounded-3xl blur-xl opacity-20 transition duration-1000 animate-pulse"></div>
        
        <div className="relative glass p-10 rounded-3xl flex flex-col items-center">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-10 text-neonPink drop-shadow-[0_0_15px_rgba(255,0,127,0.8)]"
          >
            {showAngry ? <Frown size={80} /> : <Heart size={80} fill="currentColor" />}
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-neonPink via-white to-neonBlue bg-clip-text text-transparent italic leading-[3rem]">
            Do you like to spend time with me?
          </h1>

          <div className="flex gap-8 w-full flex-col sm:flex-row items-center justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255, 0, 127, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogin}
              className="px-12 py-4 bg-gradient-to-r from-neonPink to-neonPurple text-white font-bold rounded-2xl shadow-neon text-xl min-w-[150px] music-sync"
            >
              Yes! 💖
            </motion.button>

            <motion.button
              animate={{ 
                x: noPosition.x,
                y: noPosition.y,
              }}
              onMouseEnter={handleNoInteraction}
              onClick={handleNoInteraction}
              className="px-12 py-4 border-2 border-white/20 text-white/50 font-bold rounded-2xl text-xl min-w-[150px] relative overflow-hidden group"
            >
              No {showAngry ? '😠' : '😢'}
            </motion.button>
          </div>

          <AnimatePresence>
            {showAngry && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10 text-neonPink font-medium text-lg italic"
              >
                Incorrect answer! Try again 😈
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
