import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative cursor-default">
      <motion.svg
        className="absolute -top-16 -right-16 md:-right-32 w-48 h-48 md:w-56 md:h-56 text-ink opacity-60 pointer-events-none rotate-[20deg] animate-jitter"
        viewBox="0 0 1024 1024" fill="none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.6, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <path d="M526.294 824.994c-0.796 0-1.61-0.124-2.39-0.344a8.02 8.02 0 0 1-5.484-6.216c-5.374-29.624-20.59-79.834-38.526-88.428a8.03 8.03 0 0 1-3.75-10.686 8.02 8.02 0 0 1 10.688-3.75c23.996 11.532 38.212 59.68 44.18 85.02 93.754-100.924 51.37-164.976 50.916-165.632a7.982 7.982 0 0 1 2.032-11.124c3.578-2.5 8.624-1.624 11.124 2.032 2.234 3.218 53.384 80.366-63.132 196.788a7.99 7.99 0 0 1-5.658 2.34zM348.038 594.618a8.03 8.03 0 0 1-6.876-3.906c-11.67-19.652-67.35-33.588-87.816-37.306a8.016 8.016 0 0 1-6.218-5.5 7.994 7.994 0 0 1 1.984-8.03c116.486-116.508 193.646-65.422 196.85-63.172a7.99 7.99 0 0 1 2.032 11.124c-2.5 3.64-7.466 4.516-11.092 2.062-2.75-1.89-65.586-42.228-165.728 50.924 24.496 5.75 70.38 19.214 83.738 41.712a7.988 7.988 0 0 1-2.782 10.966 8.12 8.12 0 0 1-4.092 1.126zM189.338 893.64c-4.03 0-6.56-1.688-7.982-3.094-18.076-18.09 78.178-123.42 79.194-124.452 12.092-12.06 33.166-12.06 45.26 0.032a31.702 31.702 0 0 1 9.358 22.59c0 8.562-3.328 16.592-9.374 22.624-0.83 0.844-92.926 82.3-116.456 82.3z m93.832-120.89a15.924 15.924 0 0 0-11.31 4.656c-11.56 11.56-60.96 72.428-74.302 96.926 24.496-13.344 85.364-62.742 96.924-74.304a15.796 15.796 0 0 0 4.688-11.31 15.78 15.78 0 0 0-4.672-11.28 15.892 15.892 0 0 0-11.328-4.688z" fill="currentColor" />
        <path d="M158.014 943.478c-9.42 0-16.792-2.594-21.902-7.686-15.358-15.374-7.89-49.932 22.824-105.644 22.966-41.68 53.026-83.3 67.696-97.956 15.092-15.124 35.166-23.434 56.524-23.434s41.448 8.31 56.554 23.434c31.168 31.184 31.2 81.928 0.046 113.112-24.512 24.496-132.014 98.174-181.742 98.174z m125.14-218.72c-17.092 0-33.136 6.654-45.212 18.746-13.966 13.938-43.416 55.182-64.992 94.364-29.418 53.336-32.134 79.99-25.528 86.614 2 2 5.562 3 10.592 3 41.918 0 144.78-67.866 170.432-93.488 24.918-24.934 24.886-65.552-0.046-90.488-12.094-12.094-28.154-18.748-45.246-18.748zM446.476 767.72a7.996 7.996 0 0 1-5.654-13.654l441.16-441.17c38.776-38.776 50.682-81.272 54.322-103.142 5.638-33.84-0.75-58.226-9.078-66.554-7.874-7.874-34.636-12.092-70.552-4.906-38.932 7.78-75.068 26.06-99.142 50.134L316.37 629.614l-11.31-11.31L746.22 177.118c26.246-26.262 65.368-46.12 107.33-54.508 30.496-6.092 68.88-6.858 84.99 9.28 25.246 25.246 27.278 119.796-45.246 192.318l-441.16 441.17a7.98 7.98 0 0 1-5.658 2.342z" fill="currentColor" />
        <path d="M797.12 190.772a7.992 7.992 0 0 1-6.86-3.876 8.024 8.024 0 0 1 2.734-10.982c56.398-33.95 106.83-37.542 122.922-21.404a8 8 0 0 1-11.31 11.312c-7.078-7.062-46.792-10.25-103.364 23.808a8.08 8.08 0 0 1-4.122 1.142zM378.58 699.822a8 8 0 0 1-5.656-13.654l135.686-135.67a7.996 7.996 0 1 1 11.31 11.31l-135.686 135.672a7.97 7.97 0 0 1-5.654 2.342zM355.958 677.202a7.972 7.972 0 0 1-5.654-2.344l-45.244-45.244a7.996 7.996 0 1 1 11.31-11.31l45.244 45.244a7.996 7.996 0 0 1-5.656 13.654zM446.476 767.72a7.968 7.968 0 0 1-5.654-2.344l-45.276-45.276a7.996 7.996 0 1 1 11.31-11.31l45.276 45.276a7.996 7.996 0 0 1-5.656 13.654zM717.942 408.478c-14.966 0-29.012-5.828-39.588-16.404-10.576-10.578-16.404-24.638-16.404-39.59 0-14.966 5.828-29.028 16.404-39.604 21.152-21.168 58.04-21.168 79.194-0.016 10.576 10.576 16.402 24.636 16.402 39.588 0 14.966-5.826 29.028-16.402 39.606-10.58 10.576-24.656 16.42-39.606 16.42z m0.016-96.02c-10.686 0-20.73 4.172-28.292 11.732a39.74 39.74 0 0 0-11.716 28.292 39.728 39.728 0 0 0 11.716 28.278c15.092 15.092 41.448 15.108 56.57-0.016a39.74 39.74 0 0 0 11.718-28.294 39.738 39.738 0 0 0-11.718-28.278 39.73 39.73 0 0 0-28.278-11.714zM604.832 521.588c-14.968 0-29.028-5.826-39.59-16.404-10.576-10.576-16.404-24.636-16.404-39.588 0-14.966 5.828-29.028 16.404-39.588 21.124-21.122 58.024-21.154 79.178 0 10.576 10.578 16.404 24.638 16.404 39.588s-5.828 29.012-16.404 39.588c-10.576 10.578-24.638 16.404-39.588 16.404z m0-95.988c-10.688 0-20.732 4.156-28.278 11.718-7.562 7.544-11.718 17.59-11.718 28.278a39.734 39.734 0 0 0 11.718 28.278c15.074 15.108 41.416 15.138 56.554 0a39.74 39.74 0 0 0 11.716-28.278 39.74 39.74 0 0 0-11.716-28.278 39.728 39.728 0 0 0-28.276-11.718z" fill="currentColor" />
      </motion.svg>

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
          <svg
            className="absolute -top-12 -left-16 w-20 h-20 text-accent hidden md:block animate-jitter"
            style={{ animationDelay: '0.9s' }}
            viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M80 20C60 40 30 60 20 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M20 80L35 75M20 80L25 65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
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