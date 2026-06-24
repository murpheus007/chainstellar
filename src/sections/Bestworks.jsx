import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { works } from '../static/works';

const WORKS_PER_PAGE = 6;

const bestWorksCSS = `
.bw-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;overflow:hidden;transition:border-color .3s,box-shadow .3s,transform .3s,opacity .6s}
.bw-card:hover{border-color:#155dfc;box-shadow:0 8px 32px rgba(21,93,252,.08);transform:translateY(-2px)}
.bw-img-wrap{position:relative;aspect-ratio:16/10;overflow:hidden}
.bw-img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.22,1,.36,1)}
.bw-card:hover .bw-img{transform:scale(1.05)}
.bw-content{padding:24px;display:flex;flex-direction:column;gap:12px}
.bw-tag{display:inline-flex;align-self:flex-start;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-family:'Space Mono',monospace;color:#155dfc;background:rgba(21,93,252,.06);padding:4px 10px;border-radius:4px}
.bw-title{font-size:20px;font-weight:800;color:var(--color-text);line-height:1.25;margin:0;transition:color .2s}
.bw-card:hover .bw-title{color:#155dfc}
.bw-desc{font-size:14px;line-height:1.6;color:var(--color-text-muted);margin:0}
.bw-link{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:#155dfc;text-decoration:none;transition:opacity .2s;margin-top:auto}
.bw-link:hover{opacity:.8}
.bw-link svg{transition:transform .2s}
.bw-link:hover svg{transform:translate(2px,-2px)}
.bw-grid{display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:768px){.bw-grid{grid-template-columns:1fr 1fr}}
@media(min-width:1024px){.bw-grid{grid-template-columns:1fr 1fr 1fr}}
.bw-pagination{display:flex;justify-content:center;align-items:center;gap:8px;margin-top:48px;flex-wrap:wrap}
.bw-page-btn{display:inline-flex;align-items:center;justify-content:center;min-width:40px;height:40px;padding:0 12px;border-radius:6px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);font-size:14px;font-weight:600;cursor:pointer;transition:all .2s}
.bw-page-btn:hover:not(:disabled){border-color:#155dfc;color:#155dfc;background:rgba(21,93,252,.04)}
.bw-page-btn.active{background:#155dfc;border-color:#155dfc;color:#fff}
.bw-page-btn.active:hover{background:#155dfc;border-color:#155dfc;color:#fff}
.bw-page-btn:disabled{opacity:.4;cursor:not-allowed}
.bw-page-dots{display:inline-flex;align-items:center;justify-content:center;min-width:40px;height:40px;color:var(--color-text-muted);font-size:14px}
.dark .bw-card{border-color:rgba(255,255,255,.1)}
.dark .bw-card:hover{border-color:rgba(21,93,252,.5);box-shadow:0 8px 40px rgba(21,93,252,.15)}
`;

function getTag(link) {
  if (link.includes('medium.com')) return 'Medium';
  if (link.includes('substack.com')) return 'Substack';
  if (link.includes('x.com') || link.includes('twitter.com')) return 'Twitter';
  return 'Article';
}

function getLink(work) {
  // Articles (Substack/Medium) link in-site to blog
  if (work.link.includes('substack.com') || work.link.includes('medium.com')) {
    const slug = work.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80);
    return `/blog/${slug}`;
  }
  // Twitter threads and others link externally
  return work.link;
}

function isExternal(work) {
  // Only Twitter threads and other non-article links are external
  return work.link.includes('x.com') || work.link.includes('twitter.com');
}


function getLinkText(work) {
  if (work.link.includes('x.com') || work.link.includes('twitter.com')) return 'View Thread';
  if (work.link.includes('substack.com') || work.link.includes('medium.com')) return 'Read Article';
  return 'View Project';
}

export default function BestWorks() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(works.length / WORKS_PER_PAGE);
  const startIdx = (currentPage - 1) * WORKS_PER_PAGE;
  const visibleWorks = works.slice(startIdx, startIdx + WORKS_PER_PAGE);

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setTimeout(() => window._reobserveCards && window._reobserveCards(), 50);
  }

  // Build page numbers with ellipsis
  function getPageNumbers() {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <>
      <style>{bestWorksCSS}</style>
      <section style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '100px', background: 'rgba(21, 93, 252, 0.1)', border: '1px solid rgba(21, 93, 252, 0.2)', marginBottom: '20px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#155dfc', fontFamily: 'Space Mono, monospace' }}>Proof of Work</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--color-text)' }}>
              His Selective<br /><span style={{ color: '#155dfc' }}>Best Works</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="bw-grid">
            {visibleWorks.map((work) => {
              const href = getLink(work);
              const external = isExternal(work);
              return (
              <article key={work.id} className="bw-card">
                <div className="bw-img-wrap">
                  <img src={work.image} alt={work.title} loading="lazy" className="bw-img" />
                </div>
                <div className="bw-content">
                  <span className="bw-tag">{getTag(work.link)}</span>
                  <h3 className="bw-title">{work.title}</h3>
                  <p className="bw-desc">{work.description}</p>
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="bw-link">
                    {getLinkText(work)} <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bw-pagination">
              <button
                className="bw-page-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>
              {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                  <span key={`dots-${idx}`} className="bw-page-dots">…</span>
                ) : (
                  <button
                    key={page}
                    className={`bw-page-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="bw-page-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
