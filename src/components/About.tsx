import { motion } from "framer-motion";
import { SpotifyPresence } from "./SpotifyPresence";

export function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-6xl mx-auto relative cursor-default">
      
      <div className="flex flex-col md:flex-row gap-16 items-start">
        
        {/* Left Column - Visual / Identifier */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative w-full md:w-1/3"
        >
          {/* Premium Unified Profile Card */}
          <div className="glass-panel p-2 rounded-[32px] relative z-10 flex flex-col gap-2">
            
            {/* Image Container */}
            <div className="w-full aspect-[4/5] md:aspect-square rounded-[24px] overflow-hidden relative group">
              <img 
                src="/favicon.png" 
                alt="Profile" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
              />
              {/* Inner vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 pointer-events-none opacity-80" />
            </div>

            {/* Typography Section */}
            <div className="flex justify-between items-start px-4 py-3">
              <div className="space-y-1">
                <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-semibold">Location</p>
                <p className="text-white/90 text-sm font-medium">Global</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-semibold">Role</p>
                <p className="text-white/90 text-sm font-medium">Software Engineer</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right Column - Data/Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8 w-full md:w-2/3"
        >
          <div className="pl-6 py-2 border-l-2 border-white/20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">About Me</h2>
            <div className="text-white/40 text-xs tracking-[0.3em] mt-3 font-medium uppercase">Background & Experience</div>
          </div>

          <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed glass-panel rounded-3xl p-8 md:p-10">
            <p className="text-white">
              I am a software engineer specializing in scalable front-end architectures and modern web technologies.
            </p>
            <p>
              I build precise, performant, and elegant digital products. Focusing on modern web technologies, I strive to create robust solutions that deliver exceptional user experiences.
            </p>
            <p className="text-sm opacity-80 border-l border-white/10 pl-4 text-white/50">
              My core stack includes TypeScript, React, Next.js, and modern CSS frameworks, with a strong emphasis on clean code and maintainability.
            </p>
            
            <div className="pt-6 border-t border-white/10">
              <SpotifyPresence />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-6">
            <a href="#contact" className="glass-button px-8 py-3 rounded-xl text-white font-medium flex items-center justify-center text-sm">
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}