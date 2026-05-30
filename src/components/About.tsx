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
          className="relative group w-full md:w-1/3"
        >
          <div className="glass-panel rounded-3xl p-6 relative z-10 flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-start pb-4">
              <span className="text-xs tracking-widest text-white/50 font-medium">PROFILE</span>
              <span className="text-xs tracking-widest text-white/70 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                AVAILABLE
              </span>
            </div>
            
            <div className="w-full relative overflow-hidden group my-4 rounded-xl flex items-center justify-center">
              <img src="/favicon.png" alt="Profile" className="w-full h-auto object-contain opacity-90 group-hover:scale-105 transition-transform duration-700 rounded-xl" />
            </div>

            <div className="pt-4 flex justify-between items-end">
              <div className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-medium">
                Location: Global<br/>
                Role: Software Engineer
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