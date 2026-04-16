import { motion } from "framer-motion";
import { MoveDown } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20 overflow-hidden">
      
      <motion.div 
        className="absolute top-20 left-10 md:left-40 opacity-70"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.7, rotate: 0 }}
        transition={{ duration: 1 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-accent animate-wiggle">
          <path d="M10 32C10 32 20 12 32 12C44 12 54 32 54 32C54 32 44 52 32 52C20 52 10 32 10 32Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="32" cy="32" r="6" fill="currentColor"/>
        </svg>
      </motion.div>

      <motion.div 
        className="absolute bottom-40 right-10 md:right-32 opacity-70"
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 0.7, rotate: 20 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-ink animate-wiggle" style={{animationDelay: '1s'}}>
          <path d="M20 50C20 50 30 20 50 20C70 20 80 50 80 50S70 80 50 80C30 80 20 50 20 50Z" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6"/>
          <path d="M30 40 L70 60 M30 60 L70 40" stroke="currentColor" strokeWidth="2" />
        </svg>
      </motion.div>

      <div className="z-10 text-center max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block"
        >
          <h1 className="text-6xl md:text-8xl font-handwriting font-bold tracking-tight text-ink relative z-10">
            Hi, I'm Neptune
          </h1>
          <div className="absolute -bottom-4 -right-8 -left-8 h-8 bg-accent/40 border-[3px] border-ink -rotate-2 z-0 border-sketch-full" />
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl text-ink/80 mt-8 font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          I draw outside the lines and code outside the box.<br/>
          Crafting digital experiences with a human touch.
        </motion.p>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-ink/60 hover:text-ink transition-colors cursor-pointer group">
          <span className="font-handwriting text-xl">Scroll down</span>
          <MoveDown className="w-5 h-5 group-hover:translate-y-2 transition-transform" />
        </a>
      </motion.div>

    </section>
  )
}
