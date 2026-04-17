import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SKILLS = [
  { name: "React", description: "I started using React once I first discovered web design properly besides basic HTML and CSS.\nIf I remember correctly, the first time using it was when I hosted a project on Vercel for the first time, which was a crazy discovery for me back in 2021.\nI now love using React in the mix when I want to build a cool Next.js project." },
  { name: "TypeScript", description: "Damn, I first discovered TypeScript by accident while watching a YouTube video back when I was pretty little (like 12-13).\nI remember trying to build a simple button component and basically rage-quit when I didn't get it the first time. \nI came back to it a year later and since then it's been in my repository of tools :)" },
  { name: "Python", description: "This is my childhood right here lol. I pretty much touched Python for the first time around the time I turned 5.\nI loved it since day one and used it to make my first proper auto-walk script for Transformice (sorry TFM devs lol).\nI won't flex too much but I pretty much know EVERYTHING about this language and I've been obsessed with it for over 12 years now." },
  { name: "Java", description: "Well, I first tried Java out when building a Minecraft Plugin for my Factions Server because I couldn't afford Kore (Kore devs hit me up I still use your cracked plugin lol) so I just tried making my own Factions Plugin, but since I had little-to-no knowledge of how exploits work on Minecraft, my server got griefed in a maximum of 24 hours LOL.\nNowadays, I just use it to build apps randomly when I'm bored and I've grown into Java more and more recently." },
  { name: "HTML", description: "The school language we all love and enjoy.\nWell, I first discovered HTML around the time I turned 6, and I actually still have the first website I've ever built but I can't link it here because my stupid self thought it was a good idea to name it my FULL NAME and also INCLUDE MY ADDRESS just because I saw a website that had a Contact section and found it cool xD.\nNow I pretty much do something with it every day in some way or another." },
  { name: "CSS", description: "Found out about it pretty much at the same time as HTML and had a VERY hard time understanding it for some reason (I'm just dumb).\nBut I can center a div so I'm goated." },
  { name: "Tailwind", description: "I don't remember how I found out about Tailwind but I had the same issues with it and nowadays I finally understood more than 5% of it, idk why CSS is so weird for me bruh." },
  { name: "Next.JS", description: "I'll be completely honest with this statement right here. I found out about Next.js FROM CHATGPT.\nYeah, pretty much tried vibe-coding, found out about it, liked it, learned it, using it, why am I using so many commas." },
  { name: "JavaScript", description: "Well well well, JS. Okay, well I found out about JS at the same time as CSS and around the time I found out about HTML. I first used it to make a console script that edited my PayPal balance to $500,000.00 just because I felt rich that way (I'm sorry PayPal, even though y'all banned me for no reason over $20).\nNow I use it constantly and I recommend it fully to any new programmer. It teaches you a lot of stuff that helped me personally understand coding more logically rather than mechanically remembering stuff." },
  { name: "Docker", description: "WE LOVE CONTAINERS!\n\nYeah, pretty much first touched Docker when I got annoyed at Bot-Hosting (Jesus, they are full nowadays, congrats guys!) for not having slots. Decided to try using Docker myself, had a hard time installing it on Windows via the CLI, finding out they had an APP, stared at my monitor for a whole 5 minutes before continuing to actually use it, and actually started enjoying it.\nIt's a great tool and it's a must-have for people like me who always have 10-15 things at the same time running (I still have bots running since 2022 that I have not touched or used. Why do I still have them? I'm a failure)." },
  { name: "LLM", description: "I love AI. It's great, it's cool, it's a helping hand.\n\nWHAT I DO NOT LOVE ABOUT IT is people that use AI to build websites, pretend it's not vibe-coded, and then go harass others for using AI.\n\nAI should be used as a tool to make stuff easier, NOT REPLACE HUMAN INTELLIGENCE.\n\nAnyways, I've trained my own agent based on my codebase to catch up on my coding habits and make my life easier.\nTrained it to patch security flaws instantly and double-audit every single change so that I don't run into common vibe-code flaws that LLMs like Claude or Gemini sometimes forget to catch or just miss." },
  { name: "Gaming", description: "Been gaming since 4. Started on Minecraft, still playing it after 14 years, which is insane, and I still remember my first launcher was TechnicLauncher. \n\nFun story: I stopped playing Minecraft for a period of 2 years only because I thought my PC couldn't handle it anymore. Found out after 2 years (when I turned like 8 or something) that I just didn't have updated graphics card drivers.\n\nNowadays I just play Minecraft, CS, Valorant, Roblox, Brawl Stars (yes, u read that right) and that's pretty much it." },
  { name: "Discord Config", description: "I started using Discord in the fall of 2016, and made my first server around 2017.\nIt got wizzed pretty much in a week and I was so confused at the time because I thought I set it up properly.\nFound out about permissions and realized I could make a buck out of this because surely there are other people that don't know how to set these up and they can't be bothered to learn.\nThat's how I started doing Server Configs as a Service.\nThen moved on to Discord Bots, built custom bots for communities all around the world." },
  { name: "Game Scripting", description: "I first got myself into this niche in Roblox.\n\nI remember playing Bee Swarm Simulator, a game where you live the life of a beekeeper that has to make a living and progress through the game by buying different tools and more bees. \nI first touched a Lua executor in 2019, specifically DanSploit, which I used to inject scripts into my game to give me flyhacks, auto-farm, teleports, stuff like that.\nI then built my own script that could do all of that, called it BeeAIO, and designed a nice purple UI for it.\nIt got patched in 2 days. Thanks Onett." }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative cursor-default">
      <div className="mb-12 text-center z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-handwriting font-bold inline-block relative"
        >
          My Skills
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-ink opacity-30 rounded-full" style={{ filter: "url(#rough-edge)" }} />
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border-3 border-ink shadow-sketch p-6 md:p-8 relative"
      >
        <details className="group">
          <summary className="flex justify-between items-center font-handwriting font-bold text-2xl md:text-3xl cursor-pointer list-none hover:text-amber-700 transition-colors select-none text-ink pb-2 border-b-2 border-dashed border-ink/20">
            <span>Explore my Skillset</span>
            <ChevronDown className="w-8 h-8 group-open:rotate-180 transition-transform" />
          </summary>

          <div className="grid md:grid-cols-2 gap-4 mt-8 items-start">
            {SKILLS.map((skill) => (
              <details key={skill.name} className="group/skill border-2 border-ink border-sketch p-4 bg-ink/5 hover:bg-ink/10 transition-colors">
                <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none select-none text-ink/80 hover:text-ink transition-colors">
                  {skill.name}
                  <ChevronDown className="w-5 h-5 group-open/skill:rotate-180 transition-transform" />
                </summary>
                <div className="mt-3 text-ink/70 font-medium text-sm pt-3 border-t-2 border-dashed border-ink/20">
                  <p className="whitespace-pre-wrap">{skill.description}</p>
                </div>
              </details>
            ))}
          </div>
        </details>
      </motion.div>
    </section>
  );
}
