"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const aboutText = [
  "I don't just build websites.",
  "I engineer digital experiences",
  "that command attention.",
  "By blending raw technical power",
  "with refined visuals"
];

const Skiper28 = () => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="relative bg-white font-bungee selection:bg-[#ff4d00] selection:text-white">
      
      {/* HEADER: Fixes padding and ensures it doesn't overlap on mobile */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          className="text-[10px] md:text-xs uppercase mb-6 text-[#ff4d00] tracking-[0.3em]"
        >
           Terminal 03 // About the Craft
        </motion.p>
        
        <div className="space-y-[-0.5rem] md:space-y-[-1.5rem]">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[11vw] font-black uppercase tracking-tighter text-[#050505] leading-none">
            ABOUT <span className="text-[#ff4d00]">THE</span>
          </h2>
          <h2 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[11vw] font-black uppercase tracking-tighter text-transparent leading-none"
            style={{ WebkitTextStroke: "1.5px #ff4d00" }}
          >
            CRAFT
          </h2>
        </div>
      </section>

      {/* PINNED SECTION: h-[300vh] provides better mobile scroll control than 140vh */}
      <section className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-[10vw]">
          <div className="flex flex-col gap-6 md:gap-4 w-full max-w-7xl">
            {aboutText.map((line, i) => (
              <AnimatedLine 
                key={i} 
                text={line} 
                index={i} 
                total={aboutText.length} 
                progress={scrollYProgress} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER: Massive padding to prevent the last text line from sticking to the footer */}
      <section className="relative h-[40vh] flex flex-col items-center justify-center bg-white border-t border-black/5 z-10">
        <div className="opacity-10 text-xl md:text-4xl tracking-[1em] uppercase text-center pl-[1em]">
          About Ended
        </div>
        <div className="mt-8 h-20 w-px bg-gradient-to-b from-[#ff4d00] to-transparent" />
      </section>
    </main>
  );
};

const AnimatedLine = ({ text, index, total, progress }: { 
  text: string, 
  index: number, 
  total: number, 
  progress: MotionValue<number> 
}) => {
  // Logic: Each line gets a specific window of the scroll to be "Active"
  const start = index / total;
  const end = (index + 0.5) / total;
  
  // Opacity: Dim (0.1) -> Bright (1.0) -> Dim (0.1)
  const opacity = useTransform(progress, [start, start + 0.05, end, end + 0.05], [0.1, 1, 1, 0.1]);
  const x = useTransform(progress, [start, start + 0.05], [-15, 0]);

  return (
    <motion.div style={{ opacity, x }} className="origin-left">
      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5vw] font-black uppercase text-[#050505] tracking-tighter break-words">
        {text}
      </h3>
    </motion.div>
  );
};

export { Skiper28 };