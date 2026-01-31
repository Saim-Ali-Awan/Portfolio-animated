"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";

interface NavLink {
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "Tech stack", href: "/techstack" },
  { title: "About", href: "/about" },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Contact", href: "/contact" },
];

/* ------------------ ANIMATION VARIANTS ------------------ */

const layerVariants: Variants = {
  initial: { y: "-100%" },
  animate: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.65, 0, 0.35, 1],
      delay: i * 0.1,
    },
  }),
  exit: (i: number) => ({
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1],
      delay: i * 0.1,
    },
  }),
};

const linkVariants: Variants = {
  initial: { y: 60, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 0.3 + i * 0.08,
    },
  }),
  exit: (i: number) => ({
    y: -30,
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.04,
    },
  }),
};

const AwesomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[120] px-5 md:px-12 py-6 md:py-8 flex justify-between items-center pointer-events-none">
        <Link href={"/"} className="pointer-events-auto">
          <motion.h1
            className={`text-2xl md:text-5xl font-black tracking-tighter uppercase transition-colors duration-500 ${
              isOpen ? "text-white" : "text-black"
            }`}
          >
            Saim <span className="text-[#ff4d00]">Ali</span>
          </motion.h1>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className={`
            group pointer-events-auto relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full transition-all duration-500 overflow-hidden
            ${isOpen ? "bg-[#ff4d00] scale-110" : "bg-black"}
          `}
        >
          <div className="flex flex-col gap-1.5 items-center justify-center z-10">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="w-5 md:w-6 h-0.5 block bg-white"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="w-5 md:w-6 h-0.5 block bg-white"
            />
          </div>
          <motion.div 
            className="absolute inset-0 bg-[#ff4d00] translate-y-full group-hover:translate-y-0 transition-transform duration-300" 
            style={{ display: isOpen ? 'none' : 'block' }}
          />
        </button>
      </header>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden">
            <motion.div
              custom={1}
              variants={layerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-[#ff4d00] z-10"
            />
            <motion.div
              custom={0}
              variants={layerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-[#0a0a0a] z-20"
            />

            <motion.nav 
              className="relative z-30 w-full h-full flex flex-col justify-center items-center px-6"
            >
              <div className="flex flex-col gap-1 md:gap-2 w-full">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="overflow-hidden py-1">
                    <motion.div
                      custom={index}
                      variants={linkVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      // Changed: Always justify-center for desktop and mobile
                      className="group flex items-center justify-center gap-4 md:gap-8"
                    >
                      {/* Desktop Index Number - Positioned to the left */}
                      <span className="hidden md:block text-[#ff4d00] font-mono text-2xl opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-300">
                        0{index + 1}
                      </span>
                      
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        // Changed: Always text-center
                        className="block text-[12vw] md:text-[90px] lg:text-[110px] font-black uppercase tracking-tighter text-white hover:text-[#ff4d00] active:text-[#ff4d00] transition-colors duration-200 leading-[1.1] md:leading-tight text-center"
                      >
                        {link.title}
                      </Link>

                      {/* Ghost spacer to keep the text perfectly centered even with the number on the left */}
                      <span className="hidden md:block text-transparent font-mono text-2xl pointer-events-none select-none">
                        0{index + 1}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2, transition: { delay: 1 } }}
                className="absolute bottom-10 text-white font-mono text-[10px] uppercase tracking-[0.5em]"
              >
                System_Access_Authorized
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AwesomeNav;