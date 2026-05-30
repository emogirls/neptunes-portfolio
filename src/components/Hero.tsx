import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20 overflow-hidden">
      
      {/* Subtle glow behind the main text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col justify-center relative px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start w-full"
        >
          <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter text-white leading-none mb-12 ml-[-4px]">
            Neptune
          </h1>
          
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between border-t border-white/20 pt-8 gap-8">
            <p className="text-xl md:text-2xl text-white/50 font-light tracking-wide max-w-xl leading-relaxed">
              <span className="text-white/90 font-medium">Software engineer</span> focused on building robust architectures and crafting elegant digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 pt-4 md:pt-0">
              <a href="#projects" className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] font-medium text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 group">
                <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/70 transition-colors"></span>
                Projects
              </a>
              <a href="#contact" className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-black font-bold hover:bg-white/80 transition-all duration-300 text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3">
                <span className="w-1 h-1 bg-black rounded-full animate-pulse"></span>
                Contact
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-white/30 hover:text-white transition-colors cursor-pointer group">
          <ChevronDown className="w-6 h-6 group-hover:translate-y-2 transition-transform" />
        </a>
      </motion.div>

    </section>
  )
}
