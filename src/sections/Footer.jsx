import React from 'react';
import {
   Twitter,
   Mail,
   MessageCircle,
   ArrowUpRight,
   Newspaper,
   PenTool,
} from 'lucide-react';

function Footer() {
   const currentYear = new Date().getFullYear();

   return (
      <footer className='py-20 bg-surface border-t border-border/50'>
         <div className='max-w-6xl mx-auto px-4 md:px-6'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-12'>
               {/* Left: Branding */}
               <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-2'>
                     <div className='w-10 h-10 bg-primary rounded-sm flex items-center justify-center rotate-3'>
                        <span className='text-white font-black text-xl'>C</span>
                     </div>
                     <span className='text-2xl font-black tracking-tighter text-text'>
                        chain<span className='text-primary'>stellar</span>
                     </span>
                  </div>
                  <p className='text-text-muted max-w-[300px] text-sm font-medium leading-relaxed'>
                     Bridging the gap between technical complexity and creative storytelling in the blockchain ecosystem.
                  </p>
               </div>

               {/* Right Side: Social links */}
               <div className='flex flex-col md:flex-row flex-wrap gap-4 w-full md:w-auto'>
                  <FooterSocial 
                     href='https://x.com/chainstellar' 
                     icon={<Twitter size={20} />} 
                     label='X / Twitter'
                  />
                  <FooterSocial 
                     href='https://medium.com/@linchpinremainstheboss' 
                     icon={<PenTool size={20} />} 
                     label='Medium'
                  />
                  <FooterSocial 
                     href='https://substack.com/@chainstellar' 
                     icon={<Newspaper size={20} />} 
                     label='Substack'
                  />
                  <FooterSocial 
                     href='mailto:damiandchidera@gmail.com' 
                     icon={<Mail size={20} />} 
                     label='Email Me'
                  />
               </div>
            </div>

            {/* Bottom: Analytics & Copyright */}
            <div className='mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center md:text-left'>
               <div className='flex flex-col md:flex-row items-center gap-4'>
                  <span className='text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]'>
                     © {currentYear} ALL RIGHTS RESERVED
                  </span>
                  <div className='h-1 w-1 rounded-full bg-border hidden md:block'></div>
                  <span className='text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]'>
                     Chainstellar Studios
                  </span>
               </div>
               
               <div className='flex flex-row items-center gap-8 md:gap-4'>
                  <a href='#' className='text-[10px] font-bold text-text-muted hover:text-primary transition-colors uppercase tracking-[0.2em]'>Privacy</a>
                  <a href='#' className='text-[10px] font-bold text-text-muted hover:text-primary transition-colors uppercase tracking-[0.2em]'>Terms</a>
               </div>
            </div>
         </div>
      </footer>
   );
}

function FooterSocial({ href, icon, label }) {
   return (
      <a
         href={href}
         target='_blank'
         rel='noopener noreferrer'
         className='group flex items-center gap-3 px-5 py-3 rounded-md bg-surface-muted dark:bg-white/5 border border-border/50 hover:border-primary/50 transition-all duration-300 w-full md:w-auto'
      >
         <span className='text-text-muted group-hover:text-primary transition-colors'>{icon}</span>
         <span className='text-xs font-bold text-text group-hover:text-primary transition-colors'>{label}</span>
         <ArrowUpRight 
            size={16} 
            strokeWidth={3}
            className='ml-auto text-primary dark:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300' 
         />
      </a>
   );
}

export default Footer;
