"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const ContactPage = () => {
  const container = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const email = "saimalimalikawan786@gmail.com";

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"] as const, // Add 'as const' for tuple typing
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <main ref={container} className="relative w-full bg-white text-[#050505] font-bungee selection:bg-[#ff4d00] font-bold selection:text-black">
      
      {/* --- HEADER (Matches THE CORE ENGINE) --- */}
      <div className="relative flex h-[100vh] flex-col items-center justify-center overflow-hidden px-4">
        <div className="z-20 text-center">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 0.5, letterSpacing: "0.3em" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-bungee text-[10px] md:text-xs uppercase mb-4 text-[#ff4d00]"
          >
            Terminal 05 // Outreach
          </motion.p>
          <motion.h2 
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[12vw] font-extrabold leading-none tracking-tighter uppercase"
          >
            SAY <span className="text-[#ff4d00]">HELLO</span>
          </motion.h2>
          <motion.h2 
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[12vw] leading-none tracking-tighter uppercase text-transparent"
            style={{ webkitTextStroke: "2px #ff4d00" } as React.CSSProperties} // Fix: lowercase 'w' + type assertion
          >
            DIRECT
          </motion.h2>
        </div>

        {/* Scroll Indicator Line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff4d00] to-transparent" />
        </div>
      </div>

      {/* --- CONTACT BODY (Matches Tech Gallery Width) --- */}
      <div className="flex flex-col items-center pb-40 px-[4vw]">
        <motion.div 
          style={{ y }}
          className="w-full max-w-[1200px]"
        >
          <div className="group relative w-full border border-black/5 bg-zinc-50 flex flex-col items-center justify-center p-12 md:p-32 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden">
            
            {/* Hover Scanline Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff4d00]/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-black/10 group-hover:border-[#ff4d00] transition-colors m-8 md:m-12" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-black/10 group-hover:border-[#ff4d00] transition-colors m-8 md:m-12" />

            <span className="font-bungee text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-black/20 mb-8">
              Transmission_ID: 0x786 // SAIM ALI
            </span>

            <h3 className="text-xl md:text-5xl text-center break-all mb-14 lowercase tracking-tight leading-tight">
              {email}
            </h3>

            {/* BUTTON */}
            <button
              onClick={copyToClipboard}
              className="relative px-12 py-6 bg-[#050505] text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
            >
              <AnimatePresence mode="wait">
                {!copied ? (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 font-bungee text-[10px] md:text-xs tracking-widest"
                  >
                    <span className="w-1.5 h-1.5 bg-[#ff4d00] rounded-full animate-pulse" />
                    COPY ADDRESS
                  </motion.span>
                ) : (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[#ff4d00] font-bungee text-[10px] md:text-xs tracking-widest"
                  >
                    ✓ COPIED
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        {/* Footer info */}
         <div className="h-[20vh] flex items-center justify-center bg-white">
        <div className="font-bungee text-2xl flex text-center md:text-4xl opacity-10 tracking-[1em] uppercase">Multan pk // 2026</div>
      </div>
      </div>
    </main>
  );
};

export default ContactPage;