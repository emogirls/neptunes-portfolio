import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollY = window.scrollY;
    const prevStyle = document.body.getAttribute("style") ?? "";
    document.body.setAttribute(
      "style",
      `overflow:hidden!important;position:fixed!important;top:-${scrollY}px!important;left:0!important;width:100%!important;`
    );
    return () => {
      document.body.setAttribute("style", prevStyle);
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return Math.min(p + Math.floor(Math.random() * 12) + 4, 100);
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#0c0810' }}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-xs px-6">
        
        {/* Minimalist Logo / N */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-bold tracking-widest text-white/90"
        >
          N
        </motion.div>

        {/* Progress bar */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50">Initializing</span>
            <span className="text-[10px] font-medium tracking-widest text-white/50">{Math.min(progress, 100)}%</span>
          </div>
          <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/80"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}