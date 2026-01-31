"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const techStack = [
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "ThreeJS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "Framer", url: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg" },
  { name: "GSAP", url: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" },
  { name: "Node", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];

const Skiper31 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mobileCheck = isTouchDevice();
    setIsMobile(mobileCheck);

    const ctx = gsap.context(() => {
      // Hero blur effect
      gsap.to(heroTitleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        filter: isMobile ? "none" : "blur(25px)",
        scale: isMobile ? 0.9 : 0.85,
        opacity: 0,
        y: isMobile ? -50 : -100,
        ease: "none",
      });

      // Shutter reveal
      gsap.fromTo(
        ".shutter-overlay",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: ".transition-section",
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Quotes float
      gsap.to(".floating-quote", {
        y: "random(-10, 10)",
        x: "random(-5, 5)",
        duration: isMobile ? 3 : 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3
      });

      // Tech cards stagger animation
      gsap.from(".tech-card", {
        scrollTrigger: {
          trigger: ".tech-section",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: isMobile ? 0.08 : 0.15,
        ease: "power3.out"
      });

      // Tech header animation
      gsap.from(".tech-header", {
        scrollTrigger: {
          trigger: ".tech-section",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: isMobile ? 0.08 : 0.05, 
        syncTouch: true  // Removed smoothTouch, kept syncTouch
      }}
    >
      <div ref={containerRef} className="relative overflow-x-hidden font-bungee bg-[#f2f2f2]">
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <main className="relative selection:bg-[#ff4d00] selection:text-white">
          
          {/* --- HERO SECTION --- */}
          <section ref={heroRef} className="min-h-[90vh] md:min-h-screen flex items-center justify-center relative px-4 pt-20 pb-32 md:py-0">
            <div ref={heroTitleRef} className="relative flex flex-col items-center w-full max-w-screen-2xl mx-auto">
              
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[9px] md:text-sm font-black tracking-[0.4em] uppercase text-zinc-400 mb-6 md:mb-10"
              >
                Digital Architect // 2026
              </motion.span>

              <div className="relative w-full py-8 md:py-10">
                <h1 className="text-[20vw] md:text-[clamp(100px,22vw,420px)] font-black leading-[0.75] uppercase tracking-tighter text-[#ff4d00] text-center">
                  SAIM
                </h1>
                <h1 className="text-[20vw] md:text-[clamp(100px,22vw,420px)] font-black leading-[0.75] uppercase tracking-tighter outline-text -mt-[2vw] md:-mt-[1vw] text-center">
                  ALI
                </h1>

                {/* Manifesto Quotes */}
                <div className="floating-quote absolute -top-4 right-0 md:-right-10 bg-white p-3 md:p-6 shadow-xl md:shadow-2xl border-l-4 border-[#ff4d00] w-32 md:w-64 rotate-3 md:rotate-6 z-20">
                  <p className="text-[7px] md:text-[10px] font-black uppercase mb-1 text-zinc-400 tracking-tighter">Manifesto 01</p>
                  <p className="text-[9px] md:text-sm font-bold italic leading-tight text-zinc-800">"Build for the person, not the browser."</p>
                </div>
                
                <div className="floating-quote absolute -bottom-8 -left-2 md:-left-20 bg-zinc-900 text-white p-3 md:p-6 shadow-xl md:shadow-2xl w-32 md:w-60 -rotate-2 md:-rotate-3 z-20">
                  <p className="text-[7px] md:text-[10px] font-black uppercase text-[#ff4d00] mb-1 tracking-tighter">Manifesto 02</p>
                  <p className="text-[9px] md:text-sm font-bold italic leading-tight">"Function is the foundation of beauty."</p>
                </div>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-16 md:mt-24 max-w-[280px] md:max-w-xl text-[10px] md:text-sm font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-zinc-500 text-center leading-loose"
              >
                Engineering high-performance interfaces for the next web.
              </motion.p>
            </div>
          </section>

          {/* --- LOGICAL FLUIDITY SECTION (Shutter Reveal) --- */}
          <section className="transition-section relative w-full min-h-screen overflow-hidden">
            <div className="shutter-overlay absolute inset-0 bg-[#050505] z-10 will-change-[clip-path]" />

            <div className="relative z-20 min-h-screen flex items-center justify-center py-16 md:py-24 px-4">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
                
                <div className="relative group overflow-hidden rounded-xl md:rounded-2xl aspect-[3/4] md:aspect-square bg-zinc-900 order-2 lg:order-1">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                    alt="Work"
                  />
                </div>

                <div className="text-white text-center lg:text-left order-1 lg:order-2">
                  <span className="text-[#ff4d00] font-mono text-[9px] md:text-xs uppercase tracking-widest mb-3 md:mb-4 block font-bold">
                    01 // THE ARCHITECTURE
                  </span>
                  <h3 className="text-[14vw] md:text-[7vw] font-black uppercase tracking-tighter mb-4 md:mb-6 leading-[0.85]">
                    Logical <br /> <span className="text-[#ff4d00]">Fluidity</span>
                  </h3>
                  <div className="pt-4 md:pt-6 border-t border-white/10">
                    <p className="text-zinc-400 text-xs md:text-lg font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
                      I specialize in the gray area between raw code and pure emotion, ensuring every pixel serves a purpose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- TECH STACK SECTION (Added After Logical Fluidity) --- */}
          <section id="tech-stack" className="tech-section relative bg-[#0a0a0a] py-24 md:py-40 overflow-hidden border-t border-white/5">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
            
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 relative z-10">
              
              {/* Section Header */}
              <div className="tech-header flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-8 md:pb-12 mb-12 md:mb-20 gap-4">
                <div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[#ff4d00] font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block"
                  >
                    [ TECHNOLOGY_STACK ]
                  </motion.span>
                  <h2 className="text-[12vw] md:text-[8vw] font-black text-white uppercase tracking-tighter leading-[0.9]">
                    CORE <span className="text-transparent" style={{ WebkitTextStroke: "1px #ff4d00" } as React.CSSProperties}>TECH</span>
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest block mb-1">
                    Primary Arsenal
                  </span>
                  <span className="text-white/40 font-mono text-xs">
                    v2.6.0
                  </span>
                </div>
              </div>

              {/* Tech Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {techStack.map((tech, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={!isMobile ? { y: -5 } : {}}
                    className="tech-card group relative bg-white/[0.02] hover:bg-[#ff4d00]/10 border border-white/5 hover:border-[#ff4d00]/30 p-4 md:p-8 flex flex-col items-start justify-between h-32 md:h-64 transition-all duration-500 rounded-lg overflow-hidden"
                  >
                    {/* Top: Number & Icon */}
                    <div className="flex justify-between items-start w-full z-10">
                      <span className="text-zinc-700 group-hover:text-[#ff4d00] font-mono text-[10px] md:text-xs font-black transition-colors">
                        0{i + 1}
                      </span>
                      <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                        <img 
                          src={tech.url} 
                          className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                          alt={tech.name}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    {/* Bottom: Name */}
                    <div className="z-10 w-full">
                      <h3 className="text-lg md:text-3xl font-black uppercase text-white group-hover:text-[#ff4d00] transition-colors leading-none mb-2">
                        {tech.name}
                      </h3>
                      <div className="h-[1px] w-0 group-hover:w-full bg-[#ff4d00] transition-all duration-700" />
                    </div>

                    {/* Background Decoration */}
                    <span className="absolute -bottom-4 -right-2 text-[4rem] md:text-[8rem] font-black text-white/[0.02] pointer-events-none select-none group-hover:text-[#ff4d00]/[0.05] transition-colors">
                      {i + 1}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Description */}
              <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                <p className="text-zinc-500 text-[11px] md:text-xs uppercase tracking-widest text-center md:text-left max-w-md">
                  Modern frameworks for building scalable, interactive digital experiences.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {techStack.slice(0, 3).map((tech, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                        <img src={tech.url} className="w-3 h-3 object-contain opacity-70" alt="" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[#ff4d00] text-[10px] font-bold uppercase tracking-wider">
                    +{techStack.length} Technologies
                  </span>
                </div>
              </div>
            </div>
          </section>

          <style jsx global>{`
            .outline-text {
              color: transparent;
              -webkit-text-stroke: 1px #ff4d00;
            }
            @media (min-width: 768px) {
              .outline-text { -webkit-text-stroke: 2px #ff4d00; }
            }
            .will-change-clip {
              will-change: clip-path;
            }
            @media (max-width: 768px) {
              .floating-quote {
                animation: float 6s ease-in-out infinite;
              }
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(3deg); }
                50% { transform: translateY(-5px) rotate(3deg); }
              }
            }
          `}</style>
        </main>
      </div>
    </ReactLenis>
  );
};

export { Skiper31 };