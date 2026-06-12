import React from 'react';
import { ExternalLink } from 'lucide-react';

const recognitions = [
   { id: 1, title: 'Member SuperteamNG', year: '2026', desc: 'Official member of Superteam affiliated with the SuperteamNG Chapter.', link: 'https://superteam.fun' },
   { id: 2, title: '10x plus SuperteamEarn Bounty Winner', year: '2026', desc: 'Recognized for excellence in technical and creative tasks across the Superteam ecosystem.', link: 'https://earn.superteam.fun/' },
   { id: 3, title: '6x plus ScribbleDAO Bounty Winner', year: '2026', desc: 'Distinguished for high-impact creative and technical writing', link: 'https://app.mirror.scribbledao.com/dashboard' },
   { id: 4, title: 'State-Level Commendation', year: '2023', desc: 'Honored by the Commissioner for Digital Economy and e-Governance, Imo State, for creative excellence in video content creation', link: 'https://www.facebook.com/share/p/16SJUDC9dg/?mibextid=wwXIfr' },
   { id: 5, title: 'SkillUp Imo Outstanding Creator', year: '2023', desc: 'Special recognition for creating high-impact educational video content.', link: 'https://www.facebook.com/share/v/1BSAupYJ6k/?mibextid=wwXIfr' },
   { id: 6, title: 'Awarded Runner-up in a State Level Essay Competition', year: '2023', desc: 'Achieved 1st Runner-Up in the My Dream Imo State by 2040 Essay Competition (Topic: Rural Economy)', link: 'https://www.facebook.com/share/17CxQn2Nbu/?mibextid=wwXIfr' },
];

const recsCSS = `
/* ===== Timeline Container ===== */
.recs-timeline{position:relative;padding:20px 0}
.recs-timeline::before{content:'';position:absolute;top:0;bottom:0;width:2px;background:#155dfc;opacity:.25;left:50%;transform:translateX(-50%)}
.dark .recs-timeline::before{background:#4c8aff;opacity:.35}

/* ===== Year Group ===== */
.recs-year-group{position:relative;margin-bottom:40px}
.recs-year-group:last-child{margin-bottom:0}

/* Year label centered on the line */
.recs-year-label{display:flex;justify-content:center;margin-bottom:24px;position:relative;z-index:2}
.recs-year-badge{display:inline-flex;align-items:center;justify-content:center;padding:6px 20px;border-radius:100px;font-size:20px;font-weight:900;font-family:'Space Mono',monospace;color:#155dfc;background:var(--color-surface);border:2px solid #155dfc;box-shadow:0 0 0 4px var(--color-bg)}
.dark .recs-year-badge{box-shadow:0 0 0 4px #000}

/* ===== Branching Cards ===== */
.recs-cards{display:flex;flex-direction:column;gap:16px}
@media(min-width:768px){
  .recs-cards{flex-direction:row;flex-wrap:wrap;justify-content:space-between}
}

/* Individual card */
.recs-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;padding:24px;display:flex;flex-direction:column;gap:12px;transition:border-color .3s,box-shadow .3s,transform .3s;position:relative}
.recs-card:hover{border-color:#155dfc;box-shadow:0 8px 32px rgba(21,93,252,.08);transform:translateY(-2px)}
.dark .recs-card{border-color:rgba(255,255,255,.1)}
.dark .recs-card:hover{border-color:rgba(21,93,252,.5);box-shadow:0 8px 40px rgba(21,93,252,.15)}

/* Branch connector line — brand colour */
.recs-card::before{content:'';position:absolute;width:24px;height:2px;background:#155dfc;opacity:.35;top:50%;transform:translateY(-50%);transition:opacity .3s}
.recs-card:hover::before{opacity:1}
.dark .recs-card::before{background:#4c8aff;opacity:.3}
.dark .recs-card:hover::before{opacity:1}

/* Left side cards: connector goes right */
.recs-card-left::before{right:-24px}
/* Right side cards: connector goes left */
.recs-card-right::before{left:-24px}

/* Card content */
.recs-card-title{font-size:18px;font-weight:700;color:var(--color-text);line-height:1.3;margin:0;transition:color .2s}
.recs-card:hover .recs-card-title{color:#155dfc}
.recs-card-desc{font-size:14px;line-height:1.6;color:var(--color-text-muted);margin:0}
.recs-card-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#155dfc;text-decoration:none;transition:opacity .2s;margin-top:auto}
.recs-card-link:hover{opacity:.7}
.recs-card-link svg{transition:transform .2s}
.recs-card-link:hover svg{transform:translate(2px,-2px)}

/* ===== Responsive: stack on mobile ===== */
@media(max-width:767px){
  .recs-timeline::before{left:20px}
  .recs-year-label{justify-content:flex-start;padding-left:8px}
  .recs-card{margin-left:44px;width:calc(100% - 44px)}
  .recs-card::before{left:-24px;right:auto;width:24px}
}

/* ===== Desktop: alternating sides ===== */
@media(min-width:768px){
  .recs-card{width:calc(50% - 32px)}
  .recs-card-left{align-self:flex-start}
  .recs-card-right{align-self:flex-end}
  .recs-year-group:nth-child(odd) .recs-cards{flex-direction:row}
  .recs-year-group:nth-child(even) .recs-cards{flex-direction:row-reverse}
}
`;

export default function Recognitions() {
  // Group by year
  const grouped = recognitions.reduce((acc, r) => {
    if (!acc[r.year]) acc[r.year] = [];
    acc[r.year].push(r);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b - a); // newest first

  return (
    <>
      <style>{recsCSS}</style>
      <section style={{ padding: '80px 0', background: 'var(--color-background)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '100px', background: 'rgba(21, 93, 252, 0.1)', border: '1px solid rgba(21, 93, 252, 0.2)', marginBottom: '20px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#155dfc', fontFamily: 'Space Mono, monospace' }}>Milestones</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--color-text)' }}>
              His Notable<br /><span style={{ color: '#155dfc' }}>Recognitions</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="recs-timeline">
            {years.map((year) => (
              <div key={year} className="recs-year-group">
                {/* Year badge on the spine */}
                <div className="recs-year-label">
                  <span className="recs-year-badge">{year}</span>
                </div>

                {/* Cards branching off */}
                <div className="recs-cards">
                  {grouped[year].map((recog, i) => (
                    <a
                      key={recog.id}
                      href={recog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`recs-card ${i % 2 === 0 ? 'recs-card-left' : 'recs-card-right'}`}
                    >
                      <h3 className="recs-card-title">{recog.title}</h3>
                      <p className="recs-card-desc">{recog.desc}</p>
                      <span className="recs-card-link">
                        Proof of Work <ExternalLink size={14} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
