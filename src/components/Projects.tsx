import { motion } from "framer-motion";
import { ExternalLink, Code, ChevronDown } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "sinister.wtf",
    description: "An immersive tool-hub that initially started as a biolink but transpired into a lot of other tools for power users.",
    tags: ["Next.js", "React", "TypeScript"],
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
  },
  {
    id: 3,
    title: "Discord Developer (since 2016)",
    description: "Various discord-related tools and configurations crafted over the years.",
    details: [
      "Hundreds of AIO Bots for Server Owners",
      "Hundreds of tools for automation for power-users",
      "Custom UserScript for Larping"
    ],
    tags: ["Discord API", "Node.js", "Python"],
    color: "bg-ink/5",
    liveDemo: null,
    source: null
  },
  {
    id: 4,
    title: "Minecraft Plugins",
    description: "Developed a lot of Custom Minecraft Plugins for Server Owners on Demand.",
    tags: ["Java", "Spigot", "Paper"],
    color: "bg-accent/40",
    liveDemo: null,
    source: null
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative cursor-default">
      <svg className="absolute right-0 top-40 w-32 h-64 text-ink/5 -z-10 pointer-events-none" viewBox="0 0 100 200" fill="none">
        <path d="M10 10C50 30 90 10 90 50C90 90 10 70 10 110C10 150 90 130 90 170" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* ZigZag */}
      <motion.svg
        className="absolute left-6 top-32 w-20 h-20 text-ink opacity-70 pointer-events-none rotate-[15deg]"
        viewBox="0 0 100 100" fill="none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.7, scale: 1 }}
        viewport={{ once: true }}
      >
        <path d="M 10,50 L 30,30 L 50,70 L 70,30 L 90,50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>

      {/* Arrow pointing at works */}
      <motion.svg
        className="absolute left-[25%] top-10 w-16 h-16 text-ink opacity-70 pointer-events-none -rotate-12 animate-wiggle"
        viewBox="0 0 100 100" fill="none"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.7, x: 0 }}
        viewport={{ once: true }}
      >
        <path d="M 20,20 Q 40,60 80,80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 60,85 L 80,80 L 75,60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>

      <div className="mb-16 text-center z-10 relative">
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
              <p className={`text-ink/70 ${project.details ? "mb-2" : "mb-6"} flex-grow`}>{project.description}</p>

              {project.details && (
                <details className="mb-6 group/details cursor-pointer relative z-20">
                  <summary className="font-handwriting font-bold flex items-center gap-2 select-none text-amber-900 overflow-hidden hover:text-amber-700 transition-colors list-none">
                    View Works
                    <ChevronDown className="w-4 h-4 group-open/details:rotate-180 transition-transform" />
                  </summary>
                  <ul className="list-disc pl-5 mt-3 text-sm text-ink/80 space-y-1 font-medium pb-2 border-l-2 border-ink/10 ml-1">
                    {project.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="mb-6 flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 border-2 border-ink/40 border-sketch text-ink/70 bg-gray-50 group-hover:border-ink transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t-2 border-dashed border-ink/20">
                {project.source ? (
                  <a href={project.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold hover:text-accent transition-colors"><Code className="w-4 h-4" /> Source</a>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ink/40 cursor-not-allowed"><Code className="w-4 h-4" /> Closed Source</span>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold hover:text-accent transition-colors"><ExternalLink className="w-4 h-4" /> Visit</a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

