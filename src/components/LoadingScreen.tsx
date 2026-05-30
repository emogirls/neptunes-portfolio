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
        return Math.min(p + Math.floor(Math.random() * 10) + 3, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#05050f' }}
    >
      <div className="flex flex-col items-center gap-10">

        {/* Cross spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer rotating cross */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          >
            {/* Horizontal bar */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/60 -translate-y-1/2" />
            {/* Vertical bar */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/60 -translate-x-1/2" />
            {/* Corner dots */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-white/40 rounded-full" />
            <div className="absolute top-0 right-0 w-1 h-1 bg-white/40 rounded-full" />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-white/40 rounded-full" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/40 rounded-full" />
          </motion.div>

          {/* Inner counter-rotating cross — slightly smaller, offset */}
          <motion.div
            className="absolute inset-3"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/25 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/25 -translate-x-1/2" />
          </motion.div>

          {/* Center dot */}
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white relative z-10"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Progress counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/30 tabular-nums"
        >
          {String(Math.min(progress, 100)).padStart(3, '0')}
        </motion.span>

      </div>
    </motion.div>
  );
}