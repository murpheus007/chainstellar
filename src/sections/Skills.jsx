import React from "react";
import { Bitcoin, NotebookPen, Video, Laptop, ChartPie, Users } from "lucide-react";

const skills = [
  { id: 1, title: "Web3 & Crypto Writing", icon: <Bitcoin size={20} /> },
  { id: 2, title: "Storytelling & Copywriting", icon: <NotebookPen size={20} /> },
  { id: 3, title: "Video Content Creation", icon: <Video size={20} /> },
  { id: 4, title: "Basic HTML & CSS", icon: <Laptop size={20} /> },
  { id: 5, title: "Content Strategy", icon: <ChartPie size={20} /> },
  { id: 6, title: "Community Management & Engagements ", icon: <Users size={20} /> },
];

function Skills() {
  return (
    <section className="py-16 bg-primary text-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-serif">
          Skills
        </h2>

        <div className="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(500px,1fr))]">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-6 bg-neutral-900 rounded-lg shadow hover:shadow-lg transition"
            >
              <span className="text-md text-white font-bold">{skill.title}</span>
              <span className="flex items-center justify-center w-10 h-10 bg-primary rounded-sm">
                {React.cloneElement(skill.icon, { color: "white" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
