import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { Projects } from "./components/Projects"
import { Skills } from "./components/Skills"
import { Contact } from "./components/Contact"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { useState } from "react"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen text-ink overflow-x-hidden selection:bg-accent selection:text-ink pb-10 relative z-0">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-2 bg-ink z-50 origin-left"
        style={{ scaleX }} 
      />

      <header className="fixed top-6 left-6 right-6 flex justify-between items-center z-40 px-6 py-4 bg-paper/80 backdrop-blur-sm border-2 border-ink border-sketch-full shadow-sketch">
        <a href="#" className="font-handwriting text-2xl font-bold hover:-rotate-2 transition-transform">Neptune.</a>
        <nav className="hidden md:flex gap-6 font-semibold text-sm">
          <a href="#about" className="hover:text-amber-700 transition-colors">About</a>
          <a href="#skills" className="hover:text-amber-700 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-amber-700 transition-colors">Work</a>
          <a href="#contact" className="hover:text-amber-700 transition-colors">Contact</a>
        </nav>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden font-handwriting text-xl font-bold cursor-pointer"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-32 px-6 md:hidden"
            style={{
              backgroundColor: 'var(--color-paper)',
              backgroundImage: 'linear-gradient(90deg, transparent 4rem, var(--color-accent) 4rem, var(--color-accent) 4.1rem, transparent 4.1rem), linear-gradient(transparent 1.9rem, #d1cfc7 1.9rem, #d1cfc7 2rem, transparent 2rem)',
              backgroundSize: '100% 100%, 100% 2rem'
            }}
          >
            <nav className="flex flex-col items-center gap-8 text-3xl font-handwriting font-bold">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-700 transition-colors">About</a>
              <a href="#skills" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-700 transition-colors">Skills</a>
              <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-700 transition-colors">Work</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-700 transition-colors">Contact</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
