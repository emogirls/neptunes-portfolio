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
    <div className="min-h-screen text-ink overflow-x-hidden selection:bg-accent selection:text-ink pb-10 relative z-0">
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
    </div>
  )
}

export default App
