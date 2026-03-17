import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro = ({ onComplete, name = "Beautiful" }) => {
  const [step, setStep] = useState(0);
  const texts = [
    `Hey ${name} 💖`,
    "I made something special for you...",
    "Just watch this ✨"
  ];

  useEffect(() => {
    if (step < texts.length) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete, texts.length]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-40 p-6 overflow-hidden">
      {/* Floating particles background (Canvas or simple divs) */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [null, Math.random() * -100]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white italic"
          >
            {texts[step]}
            {step < texts.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            )}
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Intro;
