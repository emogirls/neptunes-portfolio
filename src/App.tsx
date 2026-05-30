import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { Projects } from "./components/Projects"
import { Skills } from "./components/Skills"
import { Contact } from "./components/Contact"
import { LoadingScreen } from "./components/LoadingScreen"
import { Background } from "./components/Background"
import { SmoothScroll } from "./components/SmoothScroll"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Shorter loading for cleaner feel
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen text-text-primary overflow-x-hidden pb-10 relative z-0">
      <Background />
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-40 px-2 py-2 glass-panel rounded-full flex justify-between md:justify-center items-center gap-8 transition-all duration-300">
        
        {/* Mobile Left */}
        <div className="md:hidden px-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            <img src="/favicon.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-lg tracking-wide text-white">Neptune</span>
        </div>

        {/* Desktop Left Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
        </nav>

        {/* Center Image (Desktop) */}
        <a href="#" className="hidden md:flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
            <img src="/favicon.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </a>

        {/* Desktop Right Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Mobile Right */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors p-2 mr-2"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-30 pt-32 px-6 md:hidden h-[100dvh] overflow-hidden bg-space/60"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8 text-xl font-medium tracking-wide">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-white text-white/70 transition-colors">About</a>
              <a href="#skills" onClick={() => setIsMenuOpen(false)} className="hover:text-white text-white/70 transition-colors">Skills</a>
              <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-white text-white/70 transition-colors">Projects</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-white text-white/70 transition-colors">Contact</a>
              
              <div className="flex gap-4 mt-8">
                 <a href="https://github.com/emogirls" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass-button flex items-center justify-center text-white/70 hover:text-white font-bold">
                  GH
                 </a>
                 <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass-button flex items-center justify-center text-white/70 hover:text-white font-bold">
                  X
                 </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SmoothScroll>
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </SmoothScroll>
    </div>
  )
}

export default App