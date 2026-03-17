import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Intro from './components/Intro';
import Gallery3D from './components/Gallery3D';
import FloatingPhotos from './components/FloatingPhotos';
import BackgroundHearts from './components/BackgroundHearts';
import MusicPlayer from './components/MusicPlayer';
import Slideshow from './components/Slideshow';
import FinalMessage from './components/FinalMessage';
import GlitterTrail from './components/GlitterTrail';
import MessageTicker from './components/MessageTicker';
import StarField from './components/StarField';
import FloatingStickers from './components/FloatingStickers';

// Dynamic image loading
const imageModules = import.meta.glob('./assets/photos/*.{png,jpg,jpeg,svg}', { eager: true });
const images = Object.values(imageModules).map(mod => mod.default);

const image2Modules = import.meta.glob('./assets/photos_2/*.{png,jpg,jpeg,svg}', { eager: true });
const images2 = Object.values(image2Modules).map(mod => mod.default);

function App() {
  const [gameState, setGameState] = useState('login'); // login -> intro -> gallery -> slideshow -> final
  const [userName, setUserName] = useState('Beautiful');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Timer for automatic slideshow trigger
  useEffect(() => {
    if (gameState === 'gallery') {
      const timer = setTimeout(() => {
        // Automatically move to slideshow after 30 seconds of gallery exploration
        // setGameState('slideshow');
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-neonPink/30">
      {/* Background elements constant across app */}
      <BackgroundHearts />
      <StarField />
      <GlitterTrail />
      
      {/* Custom Cursor Glow */}
      <div 
        className="cursor-glow hidden md:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <AnimatePresence mode="wait">
        {gameState === 'login' && (
          <Login key="login" onLogin={() => setGameState('intro')} />
        )}

        {gameState === 'intro' && (
          <Intro 
            key="intro" 
            name={userName} 
            onComplete={() => setGameState('gallery')} 
          />
        )}

        {gameState === 'gallery' && (
          <div key="gallery" className="relative">
            <FloatingPhotos images={images} />
            <FloatingStickers />
            <Gallery3D images={images} />
            <MessageTicker />
            
            {/* Action button to switch to slideshow */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100]">
               <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 0, 127, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameState('slideshow')}
                  className="px-8 py-3 bg-gradient-to-r from-neonPink via-neonPurple to-neonBlue rounded-full text-white font-bold tracking-widest transition-all shadow-[0_0_20px_rgba(255,0,127,0.4)] flex items-center gap-3 group border border-white/20"
               >
                  EXPERIENCE THE JOURNEY
                  <motion.span 
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-xl"
                  >
                    ✨
                  </motion.span>
               </motion.button>
            </div>
          </div>
        )}

        {gameState === 'slideshow' && (
          <Slideshow 
            key="slideshow" 
            images={images2} 
            onComplete={() => setGameState('final')} 
          />
        )}

        {gameState === 'final' && (
          <FinalMessage key="final" />
        )}
      </AnimatePresence>

      {(gameState !== 'login') && (
        <MusicPlayer autoStart={gameState === 'intro'} />
      )}
    </div>
  );
}

export default App;
