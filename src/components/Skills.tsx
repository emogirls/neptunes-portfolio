import { motion } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";

const SKILLS = [
  { name: "React", description: "Extensive experience building interactive and performant user interfaces. Proficient in functional components, hooks, state management, and modern React patterns." },
  { name: "TypeScript", description: "Strong background in building type-safe applications. Leveraging advanced static typing to catch errors early, improve code maintainability, and enhance developer experience." },
  { name: "Next.js", description: "Experienced in building server-rendered and statically generated applications. Utilizing Next.js for optimized performance, SEO, and full-stack capabilities." },
  { name: "JavaScript", description: "Deep knowledge of core JavaScript concepts, asynchronous programming, and modern ES6+ features. Capable of building complex logic and highly interactive client-side applications." },
  { name: "Tailwind CSS", description: "Highly proficient in utility-first CSS frameworks. Used extensively to build responsive, consistent, and highly customized UI components rapidly." },
  { name: "Python", description: "Used for writing scalable backend services, automation scripts, and data processing tools with a focus on clean, idiomatic code." },
  { name: "Java", description: "Solid foundation in object-oriented programming. Experienced in developing robust backend applications and system architectures." },
  { name: "HTML & CSS", description: "Deep understanding of semantic HTML and modern CSS architectures. Specialized in creating responsive, accessible, and pixel-perfect layouts." },
  { name: "Docker", description: "Proficient in containerization and orchestration. Experienced in building optimized Docker images, managing multi-container setups, and streamlining deployment pipelines." }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative cursor-default">
      <div className="mb-12 border-l-2 border-white/20 pl-6 py-2 relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white"
        >
          Technical Expertise
        </motion.h2>
        <div className="text-white/40 text-xs tracking-[0.3em] mt-3 font-medium uppercase">CORE TECHNOLOGIES</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-3xl p-1 md:p-2 relative overflow-hidden"
      >
        <details className="group">
          <summary className="flex justify-between items-center font-bold text-lg md:text-xl cursor-pointer list-none text-white p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors select-none">
            <span className="flex items-center gap-4 tracking-wide"><Terminal className="w-5 h-5 text-white/70"/> View Details</span>
            <ChevronDown className="w-6 h-6 group-open:rotate-180 transition-transform text-white/70" />
          </summary>

          <div className="grid md:grid-cols-2 gap-2 mt-4 px-2 pb-2">
            {SKILLS.map((skill) => (
              <details key={skill.name} className="group/skill bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors duration-300">
                <summary className="flex justify-between items-center font-bold text-sm tracking-wide cursor-pointer list-none select-none text-white/90 p-5 hover:text-white transition-all rounded-xl">
                  {skill.name}
                  <ChevronDown className="w-4 h-4 group-open/skill:rotate-180 transition-transform text-white/30 group-hover/skill:text-white/70" />
                </summary>
                <div className="p-5 pt-0 text-white/60 font-light text-sm">
                  <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-4" />
                  <p className="whitespace-pre-wrap leading-relaxed">{skill.description}</p>
                </div>
              </details>
            ))}
          </div>
        </details>
      </motion.div>
    </section>
  );
}
