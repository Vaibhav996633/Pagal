import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ autoStart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playMusic = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked, waiting for user interaction", err);
      }
    };

    if (autoStart) {
      playMusic();
      
      // Secondary attempt on any user interaction
      const handleFirstInteraction = () => {
        if (audioRef.current && audioRef.current.paused) {
          playMusic();
        }
        window.removeEventListener('click', handleFirstInteraction);
      };
      
      window.addEventListener('click', handleFirstInteraction);
      return () => window.removeEventListener('click', handleFirstInteraction);
    }
  }, [autoStart]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let animationFrame;
    const analyze = () => {
      if (isPlaying && audioRef.current) {
        // High-frequency pulse simulation or use AudioContext if needed
        // For simplicity, we'll trigger a global CSS variable for beat
        const pulse = Math.sin(Date.now() / 150) * 0.1 + 1;
        document.documentElement.style.setProperty('--music-pulse', pulse);
      } else {
        document.documentElement.style.setProperty('--music-pulse', 1);
      }
      animationFrame = requestAnimationFrame(analyze);
    };
    analyze();
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <audio 
        ref={audioRef} 
        loop
        src="/src/assets/music/song.mp3"
      />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`p-4 rounded-full shadow-[0_0_20px_rgba(255,0,127,0.4)] transition-all flex items-center justify-center ${
          isPlaying ? 'bg-neonPink text-white' : 'bg-black/80 text-white/60 border border-white/20'
        }`}
      >
        {isPlaying ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Volume2 size={24} />
          </motion.div>
        ) : (
          <VolumeX size={24} />
        )}

        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonPink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neonPink"></span>
          </span>
        )}
      </motion.button>
      
      {/* Visualizer bars */}
      {isPlaying && (
        <div className="absolute right-16 bottom-2 flex gap-1 items-end h-8">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [4, 20, 4] }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.5 + i * 0.1,
                ease: "easeInOut" 
              }}
              className="w-1 bg-neonPink/60 rounded-full"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
