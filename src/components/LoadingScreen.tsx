import { motion } from "framer-motion";
import { PenTool } from "lucide-react";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        backgroundImage: 'linear-gradient(90deg, transparent 4rem, var(--color-accent) 4rem, var(--color-accent) 4.1rem, transparent 4.1rem), linear-gradient(transparent 1.9rem, #d1cfc7 1.9rem, #d1cfc7 2rem, transparent 2rem)',
        backgroundSize: '100% 100%, 100% 2rem'
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center max-w-lg w-full">
        {/* Animated Crayon Icon bouncing */}
        <motion.div
           className="absolute -top-12 z-10 text-accent left-0"
           initial={{ x: "-10%", y: -10, rotate: -45 }}
           animate={{ x: "100%", y: [0, -15, 0], rotate: [-45, -25, -45] }}
           transition={{ 
             x: { duration: 2, ease: "easeInOut" },
             y: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
             rotate: { duration: 0.3, repeat: Infinity, repeatType: "reverse" }
           }}
        >
           <PenTool className="w-12 h-12" />
        </motion.div>

        {/* Squiggly line being drawn */}
        <svg viewBox="0 0 500 100" className="w-full h-32 overflow-visible">
          <motion.path
            d="M 10 50 C 60 0, 90 100, 140 50 C 190 0, 220 100, 270 50 C 320 0, 350 100, 400 50 C 450 0, 480 100, 530 50"
            fill="transparent"
            stroke="var(--color-ink)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        <motion.h2 
          className="font-handwriting text-4xl font-bold mt-8 text-ink"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Drawing something great...
        </motion.h2>
      </div>
    </motion.div>
  );
}
