import { motion } from "framer-motion";
import { ExternalLink, Code, ChevronDown, Database } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "sinister.wtf",
    description: "A comprehensive tool-hub designed for power users, initially conceived as a biolink and expanded to offer advanced utilities.",
    tags: ["Next.js", "React", "TypeScript"],
    liveDemo: "https://sinister.wtf",
    source: null
  },
  {
    id: 2,
    title: "Portfolio",
    description: "A modern personal portfolio demonstrating robust architecture and a clean, minimalist aesthetic.",
    tags: ["React", "TypeScript", "Tailwind"],
    liveDemo: null,
    source: "https://github.com/emogirls/neptunes-portfolio"
  },
  {
    id: 3,
    title: "Discord Integrations",
    description: "Developed numerous automation tools, custom Discord integrations, and bots focusing on scalability and user engagement.",
    details: [
      "Custom bots for community management",
      "Automation tools for streamlined operations"
    ],
    tags: ["Discord API", "Node.js", "Python"],
    liveDemo: null,
    source: null
  },
  {
    id: 4,
    title: "Java Ecosystem Solutions",
    description: "Engineered custom Java-based server plugins, focusing on performance optimization and complex game logic.",
    tags: ["Java", "Spigot", "Paper"],
    liveDemo: null,
    source: null
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative cursor-default">
      <div className="mb-16 border-l-2 border-white/20 pl-6 py-2 relative z-10 flex items-center justify-between">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            Featured Work
          </motion.h2>
          <div className="text-white/40 text-xs tracking-[0.3em] mt-3 font-medium uppercase">PORTFOLIO</div>
        </div>
        <Database className="w-12 h-12 text-white/10 hidden md:block" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-8 glass-panel rounded-3xl transition-all duration-500 overflow-hidden hover:border-white/20"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-xs text-white/40 tracking-widest font-medium">0{project.id}</span>
              </div>
              
              <p className={`text-white/60 font-light leading-relaxed ${project.details ? "mb-4" : "mb-8"} flex-grow`}>
                {project.description}
              </p>

              {project.details && (
                <details className="mb-8 group/details cursor-pointer relative z-20">
                  <summary className="font-medium text-xs tracking-wide flex items-center gap-2 select-none text-white/50 hover:text-white/80 transition-colors list-none">
                    <span className="border-b border-white/20 pb-1">View Details</span>
                    <ChevronDown className="w-4 h-4 group-open/details:rotate-180 transition-transform" />
                  </summary>
                  <ul className="list-none pl-0 mt-4 text-sm text-white/50 space-y-2 font-light pb-2 border-l border-white/10 ml-2">
                    {project.details.map((detail, i) => (
                      <li key={i} className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-px before:bg-white/30">{detail}</li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="mb-8 flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/5 group-hover:border-white/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 pt-5 border-t border-white/10 uppercase font-medium text-xs tracking-widest">
                {project.source ? (
                  <a href={project.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <Code className="w-4 h-4" /> Source
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-white/30 cursor-not-allowed">
                    <Code className="w-4 h-4" /> Private
                  </span>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

