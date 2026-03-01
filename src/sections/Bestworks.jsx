import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, NotebookText } from 'lucide-react';
import { works } from '../static/works';

function BestWorks() {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;
   
   const totalPages = Math.ceil(works.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentWorks = works.slice(startIndex, startIndex + itemsPerPage);

   const goToPage = (page) => {
      setCurrentPage(page);
      document.getElementById('best-works-section')?.scrollIntoView({ behavior: 'smooth' });
   };

   return (
      <section id="best-works-section" className='py-12 md:py-24 bg-surface-muted dark:bg-black relative overflow-hidden'>
         {/* Decorative background element */}
         <div className='absolute bottom-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]'></div>

         <div className='max-w-6xl mx-auto px-4 md:px-6 relative z-10'>
            {/* Section Header */}
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16'>
                  <div className='max-w-xl'>
                     <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary dark:bg-primary/20 dark:border-primary/40 dark:text-primary-light text-[10px] font-bold tracking-[0.2em] uppercase mb-6'>
                        <span>Proof of Work</span>
                     </div>
                     <h2 className='text-4xl md:text-6xl font-black text-text leading-[0.9] tracking-tighter'>
                        His Selective <br /><span className='text-primary'>Best Works</span>
                     </h2>
                  </div>
               <div className='hidden md:block text-right'>
                  <p className='text-text-muted text-sm font-medium'>Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, works.length)} of {works.length} projects</p>
               </div>
            </div>

            {/* Grid Container */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
               {currentWorks.map((work) => (
                  <div
                     key={work.id}
                     className='group flex flex-col bg-surface rounded-md overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-soft'
                  >
                     {/* Image Container */}
                     <div className='relative aspect-[4/3] overflow-hidden m-4 rounded-md'>
                        <img
                           src={work.image}
                           alt={work.title}
                           loading='lazy'
                           className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110'
                        />
                        <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700'></div>
                        
                        {/* Type Badge */}
                        <div className='absolute top-4 right-4'>
                           <span className='px-4 py-1.5 text-[10px] font-black bg-surface text-text rounded-full border border-border/50 uppercase tracking-widest shadow-xl'>
                              {work.link.includes('medium.com') ? 'Medium' : work.link.includes('substack.com') ? 'Substack' : 'Thread'}
                           </span>
                        </div>
                     </div>

                     {/* Content */}
                     <div className='flex-1 px-8 pb-8 pt-2 flex flex-col'>
                        <h3 className='text-xl font-bold text-text mb-4 line-clamp-2 leading-[1.2] group-hover:text-primary transition-colors'>
                           {work.title}
                        </h3>
                        {/* Legibility fix: Using text-text-muted with font-medium */}
                        <p className='text-text-muted text-sm line-clamp-3 mb-8 flex-1 font-medium leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity'>
                           "{work.description}"
                        </p>
                        
                        <a
                           href={work.link}
                           target='_blank'
                           rel='noopener noreferrer'
                           className='flex items-center justify-between w-full p-2 pr-6 rounded-md bg-surface-muted group/btn hover:bg-primary transition-all duration-500'
                        >
                           <div className='w-10 h-10 rounded-sm bg-surface flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-primary transition-all'>
                              <ArrowUpRight size={20} className='group-hover/btn:rotate-45 transition-transform duration-500' />
                           </div>
                           <span className='text-sm font-black uppercase tracking-widest group-hover/btn:text-white transition-colors'>View Project</span>
                        </a>
                     </div>
                  </div>
               ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
               <div className='flex justify-center items-center gap-4 mt-20'>
                  <button
                     onClick={() => goToPage(currentPage - 1)}
                     disabled={currentPage === 1}
                     className='w-14 h-14 rounded-md bg-surface border border-border/50 text-text hover:text-primary hover:border-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg'
                     aria-label='Previous page'
                  >
                     <ChevronLeft size={24} />
                  </button>
                  
                  <div className='flex gap-3'>
                     {[...Array(totalPages)].map((_, i) => (
                        <button
                           key={i}
                           onClick={() => goToPage(i + 1)}
                           className={`w-14 h-14 rounded-md font-black text-sm transition-all shadow-lg ${
                              currentPage === i + 1
                                 ? 'bg-primary text-white scale-110'
                                 : 'bg-surface border border-border/50 text-text-muted hover:text-text hover:border-border'
                           }`}
                        >
                           {String(i + 1).padStart(2, '0')}
                        </button>
                     ))}
                  </div>

                  <button
                     onClick={() => goToPage(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     className='w-14 h-14 rounded-md bg-surface border border-border/50 text-text hover:text-primary hover:border-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg'
                     aria-label='Next page'
                  >
                     <ChevronRight size={24} />
                  </button>
               </div>
            )}
         </div>
      </section>
   );
}

export default BestWorks;
