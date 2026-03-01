import React from 'react';
import { Mail, ArrowRight, MessageSquareCode } from 'lucide-react';

function WhyMe() {
   return (
      <section className='py-12 md:py-24 bg-surface-muted relative overflow-hidden'>
         {/* Background Shapes */}
         <div className='absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]'></div>
         
         <div className='max-w-6xl mx-auto px-4 md:px-6 relative z-10'>
            <div className='bg-primary rounded-md p-4 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden shadow-2xl shadow-primary/20 relative group'>
               {/* Animated Background Overlay */}
               <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")] opacity-[0.1] mix-blend-overlay'></div>
               
               {/* Left: Text */}
               <div className='flex-1 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left'>
                  <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-8'>
                     <MessageSquareCode size={14} />
                     <span>Partnership</span>
                  </div>

                  <h2 className='text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-6'>
                     Why Work <br /><span className='text-white/60'>With Him?</span>
                  </h2>
                  
                  <p className='text-white/80 text-lg mb-10 max-w-md font-medium leading-relaxed'>
                     Because you want to win. And Chainstellar is obsessed with delivering results that move the needle.
                  </p>

                  <a
                     href='mailto:damiandchidera@gmail.com'
                     className='group flex items-center gap-3 px-10 py-3 bg-white text-primary font-black rounded-md transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10'
                  >
                     <span>GET IN TOUCH</span>
                     <ArrowRight size={20} className='group-hover:translate-x-1 transition-transform' />
                  </a>
               </div>

               {/* Right: Visual */}
               <div className='flex-1 relative z-10 w-full md:w-auto overflow-hidden rounded-md border border-white/20 shadow-2xl rotate-2 group-hover:rotate-0 transition-all duration-700'>
                  <img
                     src='/whyme.jpg'
                     alt="Let's work together"
                     loading='lazy'
                     className='w-full h-[400px] object-cover scale-110 group-hover:scale-100 transition-transform duration-1000'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent'></div>
                  <div className='absolute bottom-8 left-8'>
                     <p className='text-white font-black text-2xl uppercase tracking-tighter'>Chainstellar</p>
                     <p className='text-white/60 text-xs font-bold uppercase tracking-widest'>Creator, Writer</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default WhyMe;
