import React, { useState, useEffect } from 'react';
import { Bitcoin, NotebookPen, Video, Laptop, ChartPie, Users } from 'lucide-react';

const skillsCSS = `
.skills-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;padding:28px;display:flex;flex-direction:column;gap:16px;overflow:hidden;transition:border-color .3s,box-shadow .3s}
.skills-card:hover{border-color:#155dfc;box-shadow:0 8px 32px rgba(21,93,252,.08)}
.skills-icon{width:48px;height:48px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
.skills-card:hover .skills-icon{transform:scale(1.1) rotate(-3deg)}
.skills-title{font-size:18px;font-weight:700;color:var(--color-text);line-height:1.3;margin:0}
.skills-desc-text{font-size:14px;line-height:1.65;color:var(--color-text-muted);margin:0}

/* Bento: alternating large/small */
.skills-row{display:flex;flex-direction:column;gap:12px}
@media(min-width:768px){.skills-row{flex-direction:row}}
.skills-card-large{flex:2}
.skills-card-small{flex:1}

/* Fly-in animations */
.skills-fly-left{opacity:0;transform:translateX(-60px)}
.skills-fly-right{opacity:0;transform:translateX(60px)}
.skills-fly-in{opacity:1;transform:translateX(0);transition:opacity .7s ease-out,transform .7s cubic-bezier(.22,1,.36,1)}

/* Stagger delays */
.skills-delay-0{transition-delay:0s}
.skills-delay-1{transition-delay:.12s}
.skills-delay-2{transition-delay:.24s}
.skills-delay-3{transition-delay:.36s}
.skills-delay-4{transition-delay:.48s}
.skills-delay-5{transition-delay:.6s}

/* Dark mode borders */
.dark .skills-card{border-color:rgba(255,255,255,.12)}
.dark .skills-card:hover{border-color:rgba(21,93,252,.6);box-shadow:0 8px 40px rgba(21,93,252,.2)}
`;

const skills = [
  { id: 1, title: 'Web3 & Crypto Writing', desc: 'Translating complex blockchain concepts into readable narratives.', icon: <Bitcoin size={24} />, iconBg: 'rgba(249, 115, 22, 0.1)', iconColor: '#f97316' },
  { id: 2, title: 'Storytelling & Copywriting', desc: 'Crafting compelling copies that convert and engage audiences.', icon: <NotebookPen size={24} />, iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3b82f6' },
  { id: 3, title: 'Video Content Creation', desc: 'Producing high-impact visual content for digital platforms.', icon: <Video size={24} />, iconBg: 'rgba(168, 85, 247, 0.1)', iconColor: '#a855f7' },
  { id: 4, title: 'Basic HTML & CSS', desc: 'Building and styling modern web interfaces with precision.', icon: <Laptop size={24} />, iconBg: 'rgba(16, 185, 129, 0.1)', iconColor: '#10b981' },
  { id: 5, title: 'Content Strategy', desc: 'Planning and executing long-term content roadmaps for startups.', icon: <ChartPie size={24} />, iconBg: 'rgba(245, 158, 11, 0.1)', iconColor: '#f59e0b' },
  { id: 6, title: 'Community Management', desc: 'Fostering growth and engagement in Web3 communities.', icon: <Users size={24} />, iconBg: 'rgba(244, 63, 94, 0.1)', iconColor: '#f43f5e' },
];

function Skills() {
  return (
    <>
      <style>{skillsCSS}</style>
      <section style={{ padding: '80px 0', background: 'var(--color-surface-muted)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '30%', background: 'rgba(21, 93, 252, 0.05)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }} className="skills-header">
            <div style={{ maxWidth: '480px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '100px', background: 'rgba(21, 93, 252, 0.1)', border: '1px solid rgba(21, 93, 252, 0.2)', color: '#155dfc', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'Space Mono, monospace' }}><span>Capabilities</span></div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--color-text)' }}>His Area of<br /><span style={{ color: '#155dfc' }}>Excellence</span></h2>
            </div>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--color-text-muted)', maxWidth: '380px', fontWeight: 500 }} className="skills-desc">A versatile toolkit designed to bridge the gap between complex technicalities and creative storytelling.</p>
          </div>

          {/* Bento Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Row 1: Large | Small */}
            <div className="skills-row">
              <div className="skills-card skills-card-large skills-fly-left skills-delay-0">
                <div className="skills-icon" style={{ background: skills[0].iconBg, color: skills[0].iconColor }}>{skills[0].icon}</div>
                <h3 className="skills-title">{skills[0].title}</h3>
                <p className="skills-desc-text">{skills[0].desc}</p>
              </div>
              <div className="skills-card skills-card-small skills-fly-right skills-delay-1">
                <div className="skills-icon" style={{ background: skills[1].iconBg, color: skills[1].iconColor }}>{skills[1].icon}</div>
                <h3 className="skills-title">{skills[1].title}</h3>
                <p className="skills-desc-text">{skills[1].desc}</p>
              </div>
            </div>

            {/* Row 2: Small | Large */}
            <div className="skills-row">
              <div className="skills-card skills-card-small skills-fly-left skills-delay-2">
                <div className="skills-icon" style={{ background: skills[2].iconBg, color: skills[2].iconColor }}>{skills[2].icon}</div>
                <h3 className="skills-title">{skills[2].title}</h3>
                <p className="skills-desc-text">{skills[2].desc}</p>
              </div>
              <div className="skills-card skills-card-large skills-fly-right skills-delay-3">
                <div className="skills-icon" style={{ background: skills[3].iconBg, color: skills[3].iconColor }}>{skills[3].icon}</div>
                <h3 className="skills-title">{skills[3].title}</h3>
                <p className="skills-desc-text">{skills[3].desc}</p>
              </div>
            </div>

            {/* Row 3: Large | Small */}
            <div className="skills-row">
              <div className="skills-card skills-card-large skills-fly-left skills-delay-4">
                <div className="skills-icon" style={{ background: skills[4].iconBg, color: skills[4].iconColor }}>{skills[4].icon}</div>
                <h3 className="skills-title">{skills[4].title}</h3>
                <p className="skills-desc-text">{skills[4].desc}</p>
              </div>
              <div className="skills-card skills-card-small skills-fly-right skills-delay-5">
                <div className="skills-icon" style={{ background: skills[5].iconBg, color: skills[5].iconColor }}>{skills[5].icon}</div>
                <h3 className="skills-title">{skills[5].title}</h3>
                <p className="skills-desc-text">{skills[5].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;
