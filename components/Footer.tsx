"use client";

import React from "react";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/" },
  { name: "Github", url: "https://github.com/" },
  { name: "Instagram", url: "https://www.instagram.com/developer.saim/" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative font-bungee bg-[#0a0a0a] pt-24 pb-10 overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <h2 className="text-[25vw] font-black text-white/[0.02] leading-none uppercase tracking-tighter">
          Saim Ali
        </h2>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          {/* Big Call to Action */}
          <div>
            <span className="text-[#ff4d00] font-mono text-xs uppercase tracking-[0.3em] mb-6 block">
              // Project Inquiry
            </span>
            <h3 className="text-[clamp(40px,6vw,100px)] font-black text-white leading-[0.9] uppercase tracking-tighter mb-10">
              Ready to start <br /> 
              <span className="text-transparent [-webkit-text-stroke:1px_#ff4d00]">the shift?</span>
            </h3>
          </div>

          {/* Socials Section */}
          <div className="flex flex-col md:items-end">
            <div className="w-full md:w-auto">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-6 block">Socials</span>
              <ul className="space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm uppercase font-bold tracking-wider inline-block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
              © {currentYear} Saim Ali
            </p>
            <p className="text-zinc-400  text-[10px] uppercase">
              Multan, PK [30.15° N]
            </p>
          </div>

          {/* Magnetic-style Top Button */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-10 bg-zinc-800 group-hover:bg-[#ff4d00] group-hover:h-14 transition-all duration-500" />
            <span className="text-[9px] font-bungee uppercase text-zinc-500 group-hover:text-white tracking-[0.3em]">Back to top</span>
          </button>

          <div className="text-zinc-600 text-[10px] uppercase tracking-widest hidden md:block">
            Built with Passion & Caffeine
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;