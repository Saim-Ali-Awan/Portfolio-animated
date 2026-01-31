"use client";

import { motion, MotionValue, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState, useMemo } from "react";

const images = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/remix/remix-original.svg",
];

const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  // Reduce parallax intensity on mobile to prevent jank
  const parallaxIntensity = isMobile ? 0.3 : 1;
  
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2 * parallaxIntensity]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3 * parallaxIntensity]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25 * parallaxIntensity]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3 * parallaxIntensity]);

  useEffect(() => {
    setIsMobile(isTouchDevice());
    
    // Initialize Lenis with mobile-optimized settings
    const lenis = new Lenis({
      lerp: isTouchDevice() ? 0.1 : 0.05,
      smoothWheel: !isTouchDevice(),
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    const resize = () => {
      // Use visual viewport height if available (handles mobile toolbar changes)
      const vh = window.visualViewport?.height || window.innerHeight;
      setDimension({ 
        width: window.innerWidth, 
        height: vh 
      });
    };
    
    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();
    
    // Handle orientation change
    window.addEventListener("orientationchange", resize);
    
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      lenis.destroy();
    };
  }, []);

  // Memoize columns to prevent re-renders
  const columnData = useMemo(() => [
    { images: [images[0], images[1], images[2]], y, title: "Logic" },
    { images: [images[3], images[4], images[5]], y: y2, title: "Structure" },
    { images: [images[6], images[7], images[8]], y: y3, title: "Motion" },
    { images: [images[9], images[10], images[11]], y: y4, title: "DevOps" },
  ], [y, y2, y3, y4]);

  return (
    <main className="w-full bg-white text-[#050505] font-bungee selection:bg-[#ff4d00] font-bold selection:text-black contain-paint">
      {/* --- ENGAGING HEADER --- */}
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 md:py-0">
        <div className="z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 0.5, letterSpacing: "0.2em" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-bungee text-[#ff4d00] text-[10px] md:text-xs uppercase mb-4"
          >
            Terminal 02 // Tech Stack
          </motion.p>
          <motion.h2 
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-bungee text-[15vw] md:text-[12vw] font-extrabold leading-[0.9] tracking-tighter uppercase"
          >
            THE <span className="text-[#ff4d00]">CORE</span>
          </motion.h2>
          <motion.h2 
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-bungee text-[15vw] md:text-[12vw] leading-[0.9] tracking-tighter uppercase text-transparent mt-2"
            style={{ 
              WebkitTextStroke: isMobile ? "1px #ff4d00" : "2px #ff4d00" 
            } as React.CSSProperties}
          >
            ENGINE
          </motion.h2>
        </div>

        {/* Scroll Indicator - Hidden on mobile for cleaner look */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#ff4d00] to-transparent" />
          <span className="font-bungee text-[9px] uppercase tracking-[0.4em] animate-pulse text-[#ff4d00]">
            Initiate Scroll
          </span>
        </div>
      </div>

      {/* --- PARALLAX GALLERY --- */}
      {/* Adjusted height for mobile to prevent excessive scrolling */}
      <div
        ref={gallery}
        className="relative box-border flex flex-col md:flex-row h-auto md:h-[200vh] gap-4 md:gap-[2vw] overflow-hidden bg-white p-4 md:p-[2vw]"
      >
        {/* Mobile: Stack columns vertically with less parallax, Desktop: Side by side */}
        {isMobile ? (
          // Mobile layout: 2x2 grid with simplified animations
          <div className="grid grid-cols-2 gap-4 w-full">
            {columnData.map((col, idx) => (
              <MobileColumn key={idx} images={col.images} title={col.title} index={idx} />
            ))}
          </div>
        ) : (
          // Desktop layout: Horizontal parallax columns
          columnData.map((col, idx) => (
            <Column 
              key={idx} 
              images={col.images} 
              y={col.y} 
              title={col.title} 
            />
          ))
        )}
      </div>

      <div className="h-[30vh] md:h-[50vh] flex items-center justify-center bg-white">
        <div className="font-bungee text-lg md:text-4xl flex text-center opacity-10 tracking-[0.5em] md:tracking-[1em] uppercase">
          Tech Stack Ended
        </div>
      </div>
      
      <style jsx global>{`
        .contain-paint {
          contain: paint;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </main>
  );
};

// Desktop Column Component with parallax
const Column = ({ images, y, title }: { images: string[], y: MotionValue<number>, title: string }) => {
  return (
    <motion.div
      className="relative flex h-full w-1/4 min-w-[180px] md:min-w-[300px] flex-col gap-[2vw] [&:nth-child(1)]:-top-[30%] [&:nth-child(2)]:-top-[80%] [&:nth-child(3)]:-top-[40%] [&:nth-child(4)]:-top-[60%] will-change-transform"
      style={{ y }}
    >
      <div className="absolute -top-10 left-0 font-bungee text-[10px] uppercase text-[#ff4d00] tracking-widest opacity-50 hidden md:block">
        [{title}]
      </div>
      {images.map((src, i) => (
        <TechCard key={i} src={src} index={i} />
      ))}
    </motion.div>
  );
};

// Mobile Column Component without parallax for better performance
const MobileColumn = ({ images, title, index }: { images: string[], title: string, index: number }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bungee text-[10px] uppercase text-[#ff4d00] tracking-widest opacity-50 mb-2">
        [{title}]
      </div>
      {images.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1 + index * 0.1 }}
        >
          <TechCard src={src} index={i} isMobile={true} />
        </motion.div>
      ))}
    </div>
  );
};

// Shared Tech Card Component
const TechCard = ({ src, index, isMobile = false }: { src: string, index: number, isMobile?: boolean }) => {
  return (
    <div className={`group relative overflow-hidden border border-black/5 bg-zinc-50 flex items-center justify-center ${isMobile ? 'p-6 aspect-square' : 'p-12 h-full'} will-change-transform`}>
      {!isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff4d00]/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      )}
      
      <span className="absolute top-2 left-2 md:top-4 md:left-4 font-bungee text-[6px] md:text-[8px] text-black/20 uppercase">
        00{index + 1} // 0xFA
      </span>
      
      <img
        src={src}
        alt="tech"
        loading="lazy"
        decoding="async"
        className={`w-full object-contain transition-all duration-500 ${isMobile ? 'max-w-[50px] scale-100' : 'max-w-[100px] scale-90 group-hover:scale-110'} drop-shadow-[0_0_30px_rgba(255,77,0,0)] ${!isMobile && 'group-hover:drop-shadow-[0_0_30px_rgba(255,77,0,0.3)]'}`}
      />

      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/10 group-hover:border-[#ff4d00] transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/10 group-hover:border-[#ff4d00] transition-colors" />
    </div>
  );
};

export { Skiper30 };