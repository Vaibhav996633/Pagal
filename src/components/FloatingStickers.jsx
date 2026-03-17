import React from 'react';
import { motion } from 'framer-motion';

// Import stickers
const stickerModules = import.meta.glob('../assets/stickers/*.{png,jpg,jpeg,svg}', { eager: true });
const stickers = Object.values(stickerModules).map(mod => mod.default);

const FloatingStickers = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden overflow-hidden">
      {stickers.map((src, index) => {
        const randomX = Math.random() * 90 + 5;
        const randomY = Math.random() * 90 + 5;
        const randomDelay = Math.random() * 5;
        const randomDuration = 10 + Math.random() * 10;
        
        return (
          <motion.img
            key={index}
            src={src}
            initial={{ 
              x: `${randomX}vw`, 
              y: `${randomY}vh`, 
              rotate: Math.random() * 360,
              scale: 0.2 + Math.random() * 0.3,
              opacity: 0,
            }}
            animate={{
              y: [`${randomY}vh`, `${randomY - 5}vh`, `${randomY}vh`],
              rotate: [0, 10, -10, 0],
              opacity: [0, 0.6, 0.4, 0.6, 0],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: randomDelay,
            }}
            className="absolute w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          />
        );
      })}
    </div>
  );
};

export default FloatingStickers;
