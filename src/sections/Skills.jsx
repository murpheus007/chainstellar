import React from "react";
import { Bitcoin, NotebookPen, Video, Laptop, ChartPie, Users, Zap } from "lucide-react";

const skills = [
  { 
    id: 1, 
    title: "Web3 & Crypto Writing", 
    desc: "Translating complex blockchain concepts into readable narratives.",
    icon: <Bitcoin size={24} />,
    color: "bg-orange-500/10 text-orange-500"
  },
  { 
    id: 2, 
    title: "Storytelling & Copywriting", 
    desc: "Crafting compelling copies that convert and engage audiences.",
    icon: <NotebookPen size={24} />,
    color: "bg-blue-500/10 text-blue-500"
  },
  { 
    id: 3, 
    title: "Video Content Creation", 
    desc: "Producing high-impact visual content for digital platforms.",
    icon: <Video size={24} />,
    color: "bg-purple-500/10 text-purple-500"
  },
  { 
    id: 4, 
    title: "Basic HTML & CSS", 
    desc: "Building and styling modern web interfaces with precision.",
    icon: <Laptop size={24} />,
    color: "bg-emerald-500/10 text-emerald-500"
  },
  { 
    id: 5, 
    title: "Content Strategy", 
    desc: "Planning and executing long-term content roadmaps for startups.",
    icon: <ChartPie size={24} />,
    color: "bg-amber-500/10 text-amber-500"
  },
  { 
    id: 6, 
    title: "Community Management", 
    desc: "Fostering growth and engagement in Web3 communities.",
    icon: <Users size={24} />,
    color: "bg-rose-500/10 text-rose-500"
  },
];

function Skills() {
  return (
    <section className="py-12 md:py-24 bg-surface-muted relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/5 blur-[100px]"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16'>
               <div className='max-w-xl'>
                  <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-6'>
                     <span>Capabilities</span>
                  </div>
                  <h2 className='text-4xl md:text-6xl font-black text-text leading-tight tracking-tighter mb-4'>
                     His Area of <br /><span className='text-primary'>Excellence</span>
                  </h2>
               </div>
               <p className='text-text-muted text-lg max-w-sm md:text-right font-medium leading-relaxed'>
                  A versatile toolkit designed to bridge the gap between complex technicalities and creative storytelling.
               </p>
            </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="group p-8 bg-surface rounded-md border border-border/50 dark:border-white/15 hover:border-primary/50 transition-all duration-500 hover:shadow-soft flex flex-col items-start gap-4"
            >
              <div className={`p-4 rounded-md ${skill.color} group-hover:scale-110 transition-transform duration-500`}>
                {skill.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-text mb-3 tracking-tight">{skill.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
