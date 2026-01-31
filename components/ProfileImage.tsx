"use client";

import { motion } from "framer-motion";

const ProfileImage = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="group relative w-64 h-64 md:w-80 md:h-80 overflow-hidden border border-black/5 bg-zinc-50 flex items-center justify-center p-4 shadow-2xl"
      >
        {/* Hover Scanline Overlay - Matches Gallery Style */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff4d00]/20 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />
        
        {/* Background Tech ID Text */}
        <span className="absolute top-4 left-4 font-bungee text-[8px] text-black/20 uppercase z-20">
          User_ID // 0x786
        </span>

        {/* The Image */}
        <img
          src="/saim.jpg" // Ensure the file is in your public folder
          alt="Saim Ali"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />

        {/* Corner Accents - Signature Orange */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black/10 group-hover:border-[#ff4d00] transition-colors z-20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black/10 group-hover:border-[#ff4d00] transition-colors z-20" />
        
        {/* Bottom Tech Label */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="font-bungee text-[8px] bg-[#ff4d00] text-white px-2 py-1">Lead Developer</span>
            <span className="font-bungee text-[8px] text-black/40">Active_Status</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileImage;