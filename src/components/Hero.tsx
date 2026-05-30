import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Layers } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20 overflow-hidden">
      
      {/* Subtle glow behind the main text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 text-center max-w-4xl mx-auto space-y-6 relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tight text-gradient leading-none">
            Neptune
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-white/50 max-w-2xl font-medium tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Software engineer focused on building robust architectures <br className="hidden md:block"/> and crafting elegant digital experiences.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="#projects" className="glass-button px-6 py-3 rounded-xl font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Layers className="w-5 h-5 text-white/70" />
            View Projects
          </a>
          <a href="#contact" className="glass-button px-6 py-3 rounded-xl font-medium text-white/70 flex items-center gap-2 hover:text-white transition-colors">
            <ArrowRight className="w-5 h-5" />
            Contact Me
          </a>
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
