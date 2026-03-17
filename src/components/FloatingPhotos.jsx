import React from 'react';
import { motion } from 'framer-motion';

const FloatingPhotos = ({ images }) => {
  // Use a subset of images to avoid lag with 50+ photos
  const displayImages = React.useMemo(() => {
    return [...images].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [images]);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden opacity-40">
      {displayImages.map((img, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 10;
        const randomRotate = -15 + Math.random() * 30;

        return (
          <motion.div
            key={index}
            initial={{ 
              x: `${randomX}vw`, 
              y: `${randomY}vh`, 
              rotate: randomRotate,
              scale: 0.5 + Math.random() * 0.5
            }}
            animate={{
              y: [`${randomY}vh`, `${randomY - 10}vh`, `${randomY}vh`],
              x: [`${randomX}vw`, `${randomX + 5}vw`, `${randomX}vw`],
              rotate: [randomRotate, randomRotate + 10, randomRotate],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: randomDelay,
            }}
            className="absolute p-2 bg-white/10 glass rounded shadow-lg backdrop-blur-sm"
          >
            <div className="w-24 h-32 md:w-32 md:h-40 overflow-hidden rounded border border-white/20">
              <img src={img} alt="floating" className="w-full h-full object-cover grayscale-[0.5]" />
            </div>
            <div className="h-4 w-full mt-1 bg-white/5 rounded-sm"></div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingPhotos;
