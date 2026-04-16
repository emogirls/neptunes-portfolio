import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative group cursor-pointer"
        >
          <div className="aspect-square bg-white border-4 border-ink border-sketch p-6 relative z-10 transform group-hover:-rotate-1 transition-transform duration-300 shadow-sketch group-hover:shadow-sketch-hover">
            <div className="w-full h-full border-2 border-dashed border-ink/30 rounded-2xl flex items-center justify-center bg-white p-2 relative overflow-hidden group-hover:bg-accent/5 transition-colors">
              <img src="/portrait.png" alt="A bored stickman smoking at a PC" className="w-full h-full object-contain grayscale opacity-90 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-2" />
            </div>
          </div>
          <div className="absolute -inset-4 bg-accent/20 border-3 border-ink rounded-[40px] -rotate-3 z-0"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 relative"
        >
          <svg className="absolute -top-12 -left-16 w-20 h-20 text-accent hidden md:block" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 20C60 40 30 60 20 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M20 80L35 75M20 80L25 65" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>

          <h2 className="text-4xl md:text-5xl font-handwriting font-bold">A little about me.</h2>
          <div className="space-y-4 text-lg text-ink/80 border-t-2 border-dashed border-ink/20 pt-6">
            <p>
              Hey there! I'm a random dude that believes the web shouldn't be rigid. I enjoy blending precise code with imperfect, realistic and human design elements to create memorable digital spaces.
            </p>
            <p>
              When I'm not pushing pixels or playing with TypeScript, you can probably find me gaming, spilling coffee on myself and trying to understand why penguins simply can't fly :(.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-ink text-white font-medium border-2 border-ink border-sketch hover:-translate-y-1 hover:shadow-sketch transition-all cursor-pointer">
              Download Resume
            </button>
            <a href="#contact" className="px-6 py-3 bg-transparent text-ink font-handwriting text-2xl hover:text-accent transition-colors flex items-center justify-center cursor-pointer">
              Let's chat!
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
