import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { Projects } from "./components/Projects"
import { Contact } from "./components/Contact"
import { motion, useScroll, useSpring } from "framer-motion"

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-paper text-ink overflow-x-hidden selection:bg-accent selection:text-ink pb-10">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-2 bg-ink z-50 origin-left"
        style={{ scaleX }} 
      />

      <header className="fixed top-6 left-6 right-6 flex justify-between items-center z-40 px-6 py-4 bg-paper/80 backdrop-blur-sm border-2 border-ink border-sketch-full shadow-sketch">
        <a href="#" className="font-handwriting text-2xl font-bold hover:-rotate-2 transition-transform">Neptune.</a>
        <nav className="hidden md:flex gap-6 font-semibold text-sm">
          <a href="#about" className="hover:text-amber-700 transition-colors">About</a>
          <a href="#projects" className="hover:text-amber-700 transition-colors">Work</a>
          <a href="#contact" className="hover:text-amber-700 transition-colors">Contact</a>
        </nav>
        <button className="md:hidden font-handwriting text-xl">Menu</button>
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <svg className="fixed top-1/4 left-4 w-12 h-12 text-ink/10 -z-10 pointer-events-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" strokeDasharray="10 20" fill="none" />
      </svg>
      <svg className="fixed bottom-1/4 right-8 w-16 h-16 text-ink/10 -z-10 pointer-events-none rotate-45" viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="4" />
      </svg>
    </div>
  )
}

export default App
