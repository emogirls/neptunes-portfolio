import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, Terminal, Cpu } from "lucide-react";

const SKILLS = [
  { name: "React", description: "Extensive experience building interactive and performant user interfaces. Proficient in functional components, hooks, state management, and modern React patterns." },
  { name: "TypeScript", description: "Strong background in building type-safe applications. Leveraging advanced static typing to catch errors early, improve code maintainability, and enhance developer experience." },
  { name: "Next.js", description: "Experienced in building server-rendered and statically generated applications. Utilizing Next.js for optimized performance, SEO, and full-stack capabilities." },
  { name: "JavaScript", description: "Deep knowledge of core JavaScript concepts, asynchronous programming, and modern ES6+ features. Capable of building complex logic and highly interactive client-side applications." },
  { name: "Tailwind CSS", description: "Highly proficient in utility-first CSS frameworks. Used extensively to build responsive, consistent, and highly customized UI components rapidly." },
  { name: "Python", description: "Used for writing scalable backend services, automation scripts, and data processing tools with a focus on clean, idiomatic code." },
  { name: "Java", description: "Solid foundation in object-oriented programming. Experienced in developing robust backend applications and system architectures." },
  { name: "HTML & CSS", description: "Deep understanding of semantic HTML and modern CSS architectures. Specialized in creating responsive, accessible, and pixel-perfect layouts." },
  { name: "Docker", description: "Proficient in containerization and orchestration. Experienced in building optimized Docker images, managing multi-container setups, and streamlining deployment pipelines." },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 8,
    scale: 0.97,
    transition: { delay: i * 0.02, duration: 0.2, ease: "easeIn" as const },
  }),
};

function SkillCard({ name, description, index }: { name: string; description: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center font-bold text-sm tracking-wide cursor-pointer text-white/90 p-5 hover:text-white transition-all rounded-xl focus:outline-none"
      >
        {name}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
          <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${open ? "text-white/70" : "text-white/30"}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-white/60 font-light text-sm">
              <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-4" />
              <p className="leading-relaxed">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Skills() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative cursor-default">
      <div className="mb-12 border-l-2 border-white/20 pl-6 py-2 relative z-10 flex items-center justify-between">
        <div>
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
        <Cpu className="w-12 h-12 text-white/10 hidden md:block" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-3xl p-1 md:p-2 relative overflow-hidden"
      >
        <motion.button
          onClick={() => setDetailsOpen(!detailsOpen)}
          whileTap={{ scale: 0.99 }}
          className="w-full flex justify-between items-center font-bold text-lg md:text-xl cursor-pointer text-white p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors select-none focus:outline-none"
        >
          <span className="flex items-center gap-4 tracking-wide">
            <motion.div animate={{ color: detailsOpen ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)" }}>
              <Terminal className="w-5 h-5" />
            </motion.div>
            View Details
          </span>
          <motion.div animate={{ rotate: detailsOpen ? 180 : 0 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <ChevronDown className="w-6 h-6 text-white/70" />
          </motion.div>
        </motion.button>

        <AnimatePresence initial={false}>
          {detailsOpen && (
            <motion.div
              key="skills-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }, opacity: { duration: 0.2 } } }}
              exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.35, ease: [0.55, 0.06, 0.68, 0.19] }, opacity: { duration: 0.2 } } }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 mt-4 px-2 pb-2">
                <div className="flex flex-col gap-2 flex-1">
                  {SKILLS.filter((_, i) => i % 2 === 0).map((skill, i) => (
                    <SkillCard key={skill.name} name={skill.name} description={skill.description} index={i} />
                  ))}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {SKILLS.filter((_, i) => i % 2 === 1).map((skill, i) => (
                    <SkillCard key={skill.name} name={skill.name} description={skill.description} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
