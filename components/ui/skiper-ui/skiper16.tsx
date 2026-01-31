"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";
import Link from "next/link";

const projects = [
  {
    title: "BITLINKS",
    id: "PROJ_01",
    src: "/bitlinks.png",
    url: "https://bitlinks.vercel.app",
    tech: ["Next.js", "Tailwind", "Framer"],
  },
  {
    title: "K72 PLATFORM",
    id: "PROJ_02",
    src: "/k72.png",
    url: "https://k72agency.vercel.app",
    tech: ["React", "Motion", "Three.js"],
  },
  {
    title: "CORE PORTFOLIO",
    id: "PROJ_03",
    src: "/portfolio.png",
    url: "https://saimaliportfolio.vercel.app",
    tech: ["Industrial UI", "GSAP", "Next"],
  },
];

const ProfileSection = () => (
  <div className="flex flex-col items-center justify-center pt-24 pb-20 md:pb-32 px-4">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="group relative w-56 h-56 md:w-80 md:h-80 overflow-hidden border border-black/10 bg-zinc-100 flex items-center justify-center p-2 md:p-4 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff4d00]/20 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />
      <span className="absolute top-2 left-2 md:top-4 md:left-4 font-bungee text-[7px] md:text-[8px] text-black/20 uppercase z-20">User_ID // 0x786</span>
      
      <img
        src="/saim.jpg"
        alt="Saim Ali"
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
      />

      <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-black/10 group-hover:border-[#ff4d00] transition-colors z-20" />
      <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-black/10 group-hover:border-[#ff4d00] transition-colors z-20" />
    </motion.div>
    
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="mt-8 md:mt-10 font-bungee text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-center leading-none"
    >
      SAIM <span className="text-[#ff4d00]">ALI</span>
    </motion.h1>
  </div>
);

const StickyCard_001 = ({
  i,
  title,
  id,
  src,
  url,
  tech,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  id: string;
  src: string;
  url: string;
  tech: string[];
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center h-screen px-4 md:px-0">
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 25}px)`,
        }}
        className="group relative flex h-[400px] md:h-[480px] w-full max-w-[850px] origin-top flex-col overflow-hidden bg-white border border-black/10 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-5 shadow-2xl hover:border-[#ff4d00]/30 transition-colors"
      >
        <div className="flex justify-between items-center mb-4 md:mb-5 px-2 md:px-5 py-2 md:py-3 border-b border-black/5 font-bungee">
            <div className="flex items-center gap-2 md:gap-3">
               <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ff4d00] rounded-full animate-pulse" />
               <span className="text-[#ff4d00] text-[10px] md:text-xs tracking-widest">{id}</span>
            </div>
            <div className="flex gap-2 md:gap-4">
               {tech.map((t, index) => (
                 <span key={index} className="text-[7px] md:text-[8px] uppercase opacity-40 font-bold">[{t}]</span>
               ))}
            </div>
        </div>

        <Link href={url} target="_blank" className="relative flex-1 overflow-hidden rounded-xl md:rounded-2xl">
            <div className="absolute inset-0 bg-[#ff4d00]/0 group-hover:bg-[#ff4d00]/10 transition-colors z-10 flex items-center justify-center">
               <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="bg-[#ff4d00] text-white font-bungee text-[8px] md:text-[10px] px-4 md:px-6 py-2 md:py-3 rounded-full shadow-xl"
               >
                  OPEN PROJECT
               </motion.div>
            </div>
            <img src={src} alt={title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        </Link>

        <div className="mt-4 md:mt-5 px-2 md:px-5 flex justify-between items-center">
            <div className="flex flex-col">
               <h3 className="font-bungee text-xl md:text-4xl uppercase tracking-tighter leading-none">{title}</h3>
               <span className="text-[7px] md:text-[9px] opacity-40 uppercase tracking-widest mt-1">Status: Operational</span>
            </div>
            <Link href={url} target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#ff4d00] hover:text-white transition-all duration-300">
               <span className="text-lg md:text-xl">→</span>
            </Link>
        </div>
      </motion.div>
    </div>
  );
};

const Skiper16 = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main ref={container} className="relative w-full font-bungee selection:bg-[#ff4d00] selection:text-white">
        
        {/* SOLID TERMINAL HEADER - Glassy effect removed */}
        <div className="fixed top-42 md:top-34 lg:54 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" px-4 md:px-6 py-2 rounded-full"
          >
             <p className="font-bungee text-[8px] md:text-xs uppercase text-[#ff4d00] tracking-widest m-0">
               Terminal 04 // Archive_Index
             </p>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden text-center min-h-screen flex items-center justify-center flex-col">
             <ProfileSection />
             <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center gap-4 text-center">
                <span className="text-[8px] md:text-[10px] uppercase opacity-40 tracking-widest animate-bounce">
                  Scroll for Archive
                </span>
                <div className="h-16 md:h-32 w-px bg-gradient-to-b from-[#ff4d00] to-transparent" />
             </div>
        </div>

        <div className="px-4 md:px-[6vw] pt-10 pb-[10vh] max-w-screen-2xl mx-auto">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.04;
            return (
              <StickyCard_001
                key={`p_${i}`}
                i={i}
                {...project}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>

        <div className="h-[40vh] md:h-[60vh] flex items-center justify-center bg-white border-t border-black/5">
           <div className="font-bungee text-xl md:text-4xl opacity-10 tracking-[0.5em] md:tracking-[1em] uppercase text-center">
             Portfolio Ended
           </div>
        </div>
      </main>
    </ReactLenis>
  );
};

export default Skiper16;