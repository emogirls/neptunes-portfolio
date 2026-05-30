import { motion } from "framer-motion";
import { Mail, Globe, MessageCircle, Radio } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 relative overflow-hidden mt-12 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-4 glass-panel rounded-full mb-8"
        >
          <Radio className="w-8 h-8 text-white/80 animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-white/50 mb-12 max-w-xl mx-auto font-medium tracking-wide leading-relaxed"
        >
          I'm always open to discussing new projects, creative ideas, or opportunities to collaborate. Feel free to reach out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-md mx-auto"
        >
          <a
            href="mailto:neptune@muslim.com"
            className="flex items-center justify-center gap-3 w-full px-8 py-4 glass-button rounded-xl text-white font-medium text-sm transition-all cursor-pointer"
          >
            <Mail className="w-5 h-5" />
            Send Message
          </a>

          <div className="flex gap-4 w-full sm:w-auto justify-center">
            <a href="https://desync.wtf" target="_blank" rel="noopener noreferrer" className="p-4 glass-button rounded-xl text-white/70 hover:text-white transition-all cursor-pointer" aria-label="Database">
              <Globe className="w-6 h-6" />
            </a>
            <a href="https://t.me/mightbeneptune" target="_blank" rel="noopener noreferrer" className="p-4 glass-button rounded-xl text-white/70 hover:text-white transition-all cursor-pointer" aria-label="Comms">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] font-medium tracking-widest uppercase text-white/30">
        <p>&copy; {new Date().getFullYear()} Neptune. All rights reserved.</p>
      </div>
    </section>
  )
}