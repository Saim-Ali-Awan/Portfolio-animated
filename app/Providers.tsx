"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/Loader";
import AwesomeNav from "@/components/AwesomeNav";
import Stairs from "@/components/AnimationWrapper";
import Footer from "@/components/Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, 
        syncTouch: true, // Replaces smoothTouch
        touchMultiplier: 1.5 
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AwesomeNav />
            <Stairs>{children}</Stairs>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ReactLenis>
  );
}