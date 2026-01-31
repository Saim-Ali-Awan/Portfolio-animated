"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start exit animation after brief pause
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] font-bungee overflow-hidden"
        >
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none" />

          {/* Shutter Panels */}
          <motion.div 
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#050505] border-b border-white/5" 
          />
          <motion.div 
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050505] border-t border-white/5" 
          />

          <div className="relative z-[110] flex flex-col items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="text-[10px] text-[#ff4d00] tracking-[0.5em] mb-4 uppercase"
            >
              Initializing Core // 2.6
            </motion.p>

            <div className="flex items-baseline gap-2">
              <span className="text-7xl md:text-9xl font-black text-white tabular-nums tracking-tighter">
                {progress}
              </span>
              <span className="text-2xl md:text-4xl text-[#ff4d00]">%</span>
            </div>

            <div className="mt-8 w-48 h-[2px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-[#ff4d00]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex gap-4">
              <span className={`text-[8px] uppercase tracking-widest ${progress > 20 ? 'text-[#ff4d00]' : 'text-white/20'}`}>Logic</span>
              <span className={`text-[8px] uppercase tracking-widest ${progress > 50 ? 'text-[#ff4d00]' : 'text-white/20'}`}>Structure</span>
              <span className={`text-[8px] uppercase tracking-widest ${progress > 80 ? 'text-[#ff4d00]' : 'text-white/20'}`}>Motion</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}