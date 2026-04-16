import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "sinister.wtf",
    description: "An immersive tool-hub that initially started as a biolink but transpired into a lot of other tools for power users.",
    tags: ["Next.js", "React", "TSX"],
    color: "bg-ink/5",
    liveDemo: "https://sinister.wtf",
    source: null
  },
  {
    id: 2,
    title: "this portfolio",
    description: "A sketch-book respresentation of what I draw during boring classes, my mind at its full boredom.",
    tags: ["React", "TypeScript", "Tailwind"],
    color: "bg-accent/40",
    liveDemo: null,
    source: "https://github.com/emogirls/neptunes-portfolio"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative cursor-default">
      <svg className="absolute right-0 top-40 w-32 h-64 text-ink/5 -z-10" viewBox="0 0 100 200" fill="none">
        <path d="M10 10C50 30 90 10 90 50C90 90 10 70 10 110C10 150 90 130 90 170" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-handwriting font-bold inline-block relative"
        >
          Selected Works
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-ink opacity-30 rounded-full" style={{ filter: "url(#rough-edge)" }} />
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative p-8 bg-white border-3 border-ink shadow-sketch hover:shadow-sketch-hover transition-all duration-300 hover:-translate-y-2 border-sketch cursor-pointer ${project.id % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'}`}
          >
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold font-handwriting mb-3 mt-2 group-hover:text-amber-700 transition-colors">{project.title}</h3>
              <p className="text-ink/70 mb-6 flex-grow">{project.description}</p>
              
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 border-2 border-ink/40 border-sketch text-ink/70 bg-gray-50 group-hover:border-ink transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t-2 border-dashed border-ink/20">
                {project.source ? (
                  <a href={project.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold hover:text-accent transition-colors"><Code className="w-4 h-4"/> Source</a>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ink/40 cursor-not-allowed"><Code className="w-4 h-4"/> Closed Source</span>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold hover:text-accent transition-colors"><ExternalLink className="w-4 h-4"/> Live Demo</a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
