import React from 'react';
import { Sparkles, Calendar, Send, MousePointer2 } from 'lucide-react';

function Hero() {
   return (
      <section className='relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-background dark:bg-black'>
         {/* Very dark background gradient for Dark Mode */}
         <div className='absolute inset-0 z-0 hidden dark:block bg-[radial-gradient(circle_at_50%_50%,rgba(21,93,252,0.15),rgba(0,0,0,1))]'></div>
         {/* Background Elements */}
         <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
            <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px]'></div>
            <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-dark/10 dark:bg-primary-dark/5 rounded-full blur-[120px]'></div>
            <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")] opacity-[0.03] dark:opacity-[0.05]'></div>
         </div>

         <div className='relative z-10 max-w-6xl mx-auto px-4 md:px-6 w-full'>
            <div className='flex flex-col lg:flex-row items-center gap-16'>
               {/* Left: Text Content */}
               <div className='flex-1 text-center lg:text-left'>
                  <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8 animate-fade-in'>
                     <Sparkles size={14} />
                     <span>Available for Work</span>
                  </div>

                  <h1 className='text-5xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter text-text mb-8'>
                     Creative <span className='text-primary'>Writer</span> 
                     <br /> 
                     & <span className='text-primary-dark dark:text-primary-light'>Technical Analyst</span>
                  </h1>

                  <p className='text-lg md:text-xl text-text-muted dark:text-white/80 leading-relaxed max-w-[700px] mx-auto lg:mx-0 mb-12 font-medium'>
                     Meet <span className='text-text dark:text-white font-bold decoration-primary decoration-4 underline-offset-4 underline'>Chainstellar</span>, a general creative and technical writer, as well as a product tester and analyst, with a strong enthusiasm for blockchain and its evolving ecosystem.
                  </p>

                  <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
                     <a
                        href='https://calendly.com/damiandchidera/30min'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group relative px-8 py-3 bg-primary text-white font-bold rounded-md flex items-center gap-3 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 overflow-hidden'
                     >
                        <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                        <Calendar size={20} />
                        <span>Book Meeting</span>
                     </a>
                     
                     <a
                        href='https://t.me/chainstellar1'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group px-8 py-3 bg-surface-muted dark:bg-white/10 text-primary dark:text-white border border-primary dark:border-white/20 font-bold rounded-md flex items-center gap-3 transition-all hover:bg-surface hover:border-primary/50'
                     >
                        <Send size={20} className='text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                        <span>Chat Him</span>
                     </a>
                  </div>

                  {/* Trust Signals */}
                  <div className='mt-16 pt-8 border-t border-border/50 flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-60 dark:opacity-100 lg:grayscale lg:hover:grayscale-0 transition-all duration-500'>
                     <span className='text-[10px] font-black tracking-widest uppercase text-text-muted dark:text-white/60'>Trusted Writer at</span>
                     <div className='flex items-center gap-1 font-black text-xs text-text dark:text-white'>
                        <div className='w-4 h-4 bg-primary rounded-sm'></div>
                        <span>SUPERTEAM</span>
                     </div>
                     <div className='flex items-center gap-1 font-black text-xs text-text dark:text-white'>
                        <div className='w-4 h-4 bg-orange-500 rounded-sm'></div>
                        <span>SCRIBBLEDAO</span>
                     </div>
                     <div className='flex items-center gap-1 font-black text-xs text-text dark:text-white'>
                        <div className='w-4 h-4 bg-text dark:bg-white rounded-sm'></div>
                        <span>ICOVERAGE.XYZ</span>
                     </div>
                  </div>
               </div>

               {/* Right: Visual Element */}
               <div className='flex-1 relative'>
                  <div className='relative max-w-[450px] mx-auto'>
                     {/* Decorative Elements */}
                     <div className='absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse'></div>
                     <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-primary-dark/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
                     
                     {/* Main Image Container */}
                     <div className='relative rounded-md overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 group'>
                        <div className='absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
                        <img
                           src='/heroImage2.svg'
                           alt='ChainStellar'
                           fetchpriority='high'
                           loading='eager'
                           className='w-full aspect-[4/5] object-cover scale-110 group-hover:scale-100 transition-transform duration-1000'
                        />
                        
                        {/* Floating Interaction Label */}
                        <div className='absolute bottom-6 left-6 right-6 p-4 bg-black/40 backdrop-blur-xl rounded-md flex items-center gap-4 border border-white/20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                           <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0'>
                              <MousePointer2 size={18} className='text-white' />
                           </div>
                           <div>
                              <p className='text-white text-xs font-bold leading-tight'>Damian D. Chidera</p>
                              <p className='text-white/60 text-[10px] uppercase tracking-widest'>Chainstellar, Creator</p>
                           </div>
                        </div>
                     </div>
                     
                     {/* Secondary floating image or stat? - using a card for now */}
                     <div className='absolute -left-12 bottom-20 hidden md:block animate-bounce-slow'>
                        <div className='bg-black/40 backdrop-blur-xl px-6 py-4 rounded-md border border-white/20 shadow-2xl'>
                           <span className='block text-3xl font-black text-white'>10x plus</span>
                           <span className='text-[10px] font-bold text-white/60 uppercase tracking-widest'>Superteam Wins</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Hero;
