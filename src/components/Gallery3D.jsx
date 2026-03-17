import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery3D = ({ images }) => {
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setTilt({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (!isHovered && !selectedImage) {
        rotationRef.current += 0.08; // Aesthetic slow rotation
        setRotation(rotationRef.current);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, selectedImage]);

  const radius = window.innerWidth < 768 ? 800 : 1500; // Large radius for single ring
  const itemCount = images.length;
  
  // Single layer horizontal ring
  const layers = 1;

  return (
    <div className="relative w-full h-screen flex items-center justify-center perspective-container overflow-hidden">
      {/* Birthday Title Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 z-20 text-center pointer-events-none px-4"
      >
        <h1 className="text-2xl md:text-5xl font-bold neon-pink italic tracking-tight drop-shadow-[0_0_15px_rgba(255,0,127,0.8)] leading-tight">
          Happy Birthday Gorgeous ✨
        </h1>
      </motion.div>

      <motion.div
        className="gallery-3d w-28 h-40 md:w-40 md:h-56" // Smaller items to fit in ring
        style={{
          transform: `rotateY(${rotation}deg) rotateX(${-tilt.y}deg)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((img, index) => {
          const angle = index * (360 / itemCount);
          
          return (
            <div
              key={index}
              className="gallery-item w-full h-full cursor-pointer transition-all duration-300 hover:scale-125 hover:z-50"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                marginTop: '-50%',
                marginLeft: '-50%',
              }}
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative group w-full h-full">
                <div className="w-full h-full bg-white/5 p-1 rounded-lg glass border border-white/20 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-neonPink/50 transition-colors">
                  <img
                    src={img}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                    loading="lazy"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-neonPink to-neonBlue opacity-0 group-hover:opacity-40 blur-xl transition-opacity rounded-xl -z-10"></div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Selected Image Zoomed View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              layoutId={selectedImage}
              initial={{ scale: 0.5, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: -90 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden glass shadow-[0_0_50px_rgba(255,0,127,0.3)]"
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xl font-medium italic text-center">
                   Every moment with you is a gift 💖
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 text-white/40 text-sm animate-pulse">
        Hover to pause • Click to zoom
      </div>
    </div>
  );
};

export default Gallery3D;
