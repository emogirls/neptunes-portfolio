import { motion } from "framer-motion";
import { Mail, Globe, MessageCircle, PenTool } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden mt-12 border-t-2 border-dashed border-ink/20">
      <svg className="absolute left-0 top-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="squiggle" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20 C 10 10, 30 30, 40 20" stroke="currentColor" strokeWidth="2" fill="none" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#squiggle)" />
      </svg>

      <motion.svg
        className="absolute bottom-16 left-[10%] w-28 h-28 text-ink opacity-70 pointer-events-none -rotate-45"
        viewBox="0 0 100 100" fill="none"
        initial={{ opacity: 0, rotate: -90 }}
        whileInView={{ opacity: 0.7, rotate: -45 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <path d="M 20,50 C 20,20 80,20 80,50 C 80,80 40,80 40,50 C 40,30 60,30 60,50 C 60,60 50,60 50,50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>

      <motion.svg
        className="absolute top-20 right-[15%] w-16 h-16 text-ink opacity-70 pointer-events-none rotate-12 animate-wiggle"
        viewBox="0 0 100 100" fill="none"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.7, x: 0 }}
        viewport={{ once: true }}
      >
        <polygon points="50,20 80,80 20,80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 35,70 L 65,70 M 50,40 L 50,60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-4 bg-accent/20 border-3 border-ink rounded-full mb-8 transform -rotate-3"
        >
          <PenTool className="w-8 h-8 text-ink" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-handwriting font-bold mb-6"
        >
          Let's draw up something great.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-ink/70 mb-12 max-w-xl mx-auto"
        >
          I'm currently available for freelance work and full-time opportunities.
          If you have a project that needs a creative touch, drop a message.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <a
            href="mailto:neptune@muslim.com"
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-ink text-paper font-semibold border-3 border-ink border-sketch-full hover:bg-white hover:text-ink hover:-translate-y-1 hover:shadow-sketch transition-all cursor-pointer group"
          >
            <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Say hello
          </a>

          <div className="flex gap-4">
            <a href="https://desync.wtf" target="_blank" rel="noopener noreferrer" className="p-4 bg-paper border-3 border-ink border-sketch hover:bg-accent/20 hover:-translate-y-1 hover:shadow-sketch transition-all cursor-pointer" aria-label="Website">
              <Globe className="w-6 h-6" />
            </a>
            <a href="https://t.me/mightbeneptune" target="_blank" rel="noopener noreferrer" className="p-4 bg-paper border-3 border-ink border-sketch hover:bg-accent/20 hover:-translate-y-1 hover:shadow-sketch transition-all cursor-pointer" aria-label="Telegram">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-handwriting text-ink/50">
        <p>© {new Date().getFullYear()} Neptune. Sketched with code.</p>
      </div>
    </section>
  )
}
