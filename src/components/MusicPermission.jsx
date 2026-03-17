import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

const MusicPermission = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Safely handle base path for deployment
  const baseUrl = import.meta.env.BASE_URL || '/';
  const songPath = `${baseUrl}music/song.mp3`.replace('//', '/');

  useEffect(() => {
    // Check if user already made a choice
    const musicChoice = localStorage.getItem('musicPermission');
    
    if (!musicChoice) {
      setIsVisible(true);
    } else if (musicChoice === 'allowed') {
      // If previously allowed, we still need one user click to start on this session
      const startOnInteraction = () => {
        handleAllow();
        window.removeEventListener('click', startOnInteraction);
        window.removeEventListener('touchstart', startOnInteraction);
      };
      window.addEventListener('click', startOnInteraction);
      window.addEventListener('touchstart', startOnInteraction);
      return () => {
        window.removeEventListener('click', startOnInteraction);
        window.removeEventListener('touchstart', startOnInteraction);
      };
    }
  }, []);

  const handleAllow = () => {
    if (audioRef.current) {
      // Some browsers require explicit user gesture for play()
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          // Fade in effect
          audioRef.current.volume = 0;
          let vol = 0;
          const interval = setInterval(() => {
            if (vol < 0.3) {
              vol += 0.02;
              audioRef.current.volume = Math.min(vol, 0.3);
            } else {
              clearInterval(interval);
            }
          }, 150);
        }).catch(err => {
          console.log("Autoplay blocked or failed:", err);
          // If blocked, we might want to keep the popup visible or show the toggle
          setIsVisible(true);
        });
      }
    }
    localStorage.setItem('musicPermission', 'allowed');
    setIsVisible(false);
  };

  const handleSkip = () => {
    localStorage.setItem('musicPermission', 'skipped');
    setIsVisible(false);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={songPath} 
        loop 
        preload="auto"
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass p-8 md:p-12 rounded-3xl max-w-md w-full text-center space-y-8 border border-white/20 shadow-2xl"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-br from-neonPink to-neonPurple rounded-full flex items-center justify-center mx-auto shadow-neon"
              >
                <Music size={40} className="text-white" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  This experience includes music 🎵
                </h2>
                <p className="text-white/70 italic text-lg">
                  Click allow for best experience 💖
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAllow}
                  className="flex-1 bg-gradient-to-r from-neonPink to-neonPurple text-white font-bold py-4 rounded-2xl shadow-neon transition-all"
                >
                  Allow 🎶
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSkip}
                  className="flex-1 border border-white/20 text-white/60 font-medium py-4 rounded-2xl hover:bg-white/5 transition-all"
                >
                  Skip
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (Only shows if allowed/skipped or after popup) */}
      {!isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 z-[100]"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMusic}
            className="w-14 h-14 bg-gradient-to-br from-neonPink to-neonPurple rounded-full flex items-center justify-center shadow-neon text-white border border-white/20"
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            
            {/* Visualizer bars when playing */}
            {isPlaying && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 h-8 items-end">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 30, 10] }}
                    transition={{ 
                      duration: 0.5 + Math.random(), 
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                    className="w-1 bg-neonPink rounded-full"
                  />
                ))}
              </div>
            )}
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default MusicPermission;
