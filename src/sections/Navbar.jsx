import React, { useState, useEffect } from 'react';
import {
   Menu,
   X,
   Sun,
   Moon,
   MessageCircle,
   FileText,
   PenTool,
   Newspaper,
   ArrowRight,
   Github,
   Twitter,
   Linkedin,
} from 'lucide-react';

function Navbar() {
   const [isOpen, setIsOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   const [darkMode, setDarkMode] = useState(false);

   // ✅ Initial check on mount
   useEffect(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);

      const handleScroll = () => {
         setScrolled(window.scrollY > 20);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   // ✅ Sync manual toggle with <html> class + localStorage
   const toggleTheme = () => {
      const newMode = !darkMode;
      setDarkMode(newMode);
      
      const root = document.documentElement;
      if (newMode) {
         root.classList.add('dark');
         localStorage.setItem('theme', 'dark');
      } else {
         root.classList.remove('dark');
         localStorage.setItem('theme', 'light');
      }
   };

   return (
      <>
         {/* Navbar Container */}
         <div className='fixed top-0 left-0 w-full z-[100] md:px-4 md:py-4'>
            <nav 
               className={`w-full md:max-w-6xl md:mx-auto flex items-center justify-between px-6 py-3 rounded-none md:rounded-md transition-all duration-500 ${
                  scrolled 
                  ? 'bg-surface/80 backdrop-blur-xl shadow-soft border-b md:border border-border/50' 
                  : 'bg-transparent'
               }`}
            >
               {/* Logo */}
               <div className='flex items-center gap-2 group cursor-pointer'>
                  <div className='w-8 h-8 bg-primary rounded-sm flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300'>
                     <span className='text-white font-black text-lg'>C</span>
                  </div>
                  <h1 className='text-lg font-black tracking-tight text-text'>
                     chain<span className='text-primary'>stellar</span>
                  </h1>
               </div>

               {/* Right Side Tools */}
               <div className='flex items-center gap-4'>
                  {/* Theme Toggle */}
                  <button
                     onClick={toggleTheme}
                     className={`p-2.5 rounded-md transition-all duration-300 shadow-lg ${
                        darkMode 
                        ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20 hover:bg-amber-400/20' 
                        : 'bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 hover:bg-indigo-600/20'
                     }`}
                     aria-label='Toggle theme'
                  >
                     {darkMode ? <Sun size={20} className="fill-amber-400/20" /> : <Moon size={20} className="fill-indigo-600/20" />}
                  </button>

                  {/* Hamburger */}
                  <button
                     onClick={() => setIsOpen(true)}
                     className='p-2.5 rounded-md bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 relative z-[110]'
                     aria-label='Open menu'
                  >
                     <Menu size={20} />
                  </button>
               </div>
            </nav>
         </div>

         {/* Overlay Menu */}
         <div
            className={`fixed inset-0 z-[120] transition-all duration-700 ${
               isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
            }`}
         >
            {/* Blurry Backdrop */}
            <div 
               className='absolute inset-0 bg-background/60 backdrop-blur-2xl'
               onClick={() => setIsOpen(false)}
            />

            {/* Content Drawer */}
            <div
               className={`absolute top-0 right-0 h-full w-full md:w-[450px] bg-surface shadow-2xl transition-transform duration-700 ease-out border-l border-border/50 ${
                  isOpen ? 'translate-x-0' : 'translate-x-full'
               }`}
            >
               {/* Close Header */}
               <div className='flex justify-between items-center p-8 border-b border-border/50'>
                  <div className='flex items-center gap-2'>
                     <div className='w-8 h-8 bg-primary rounded-sm flex items-center justify-center rotate-3'>
                        <span className='text-white font-black text-lg'>C</span>
                     </div>
                     <span className='font-black text-text uppercase tracking-tight'>
                        chain<span className='text-primary'>stellar</span>
                     </span>
                  </div>
                  <button
                     onClick={() => setIsOpen(false)}
                     className='p-3 rounded-md bg-surface-muted text-text hover:text-primary transition-all rotate-0 hover:rotate-90 duration-500'
                  >
                     <X size={24} />
                  </button>
               </div>

               {/* Menu Links */}
               <div className='p-8 flex flex-col gap-4'>
                  <p className='text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-2'>Digital Footprint</p>
                  
                  <MenuLink 
                     href='https://medium.com/@linchpinremainstheboss'
                     icon={<PenTool size={20} />}
                     label='Medium Profile'
                     desc='Technical articles and creative thoughts'
                     onClick={() => setIsOpen(false)}
                  />
                  <MenuLink 
                     href='https://substack.com/@chainstellar'
                     icon={<Newspaper size={20} />}
                     label='Substack'
                     desc='Deep dives and newsletters'
                     onClick={() => setIsOpen(false)}
                  />
                  <MenuLink 
                     href='https://wa.me/2347044085646'
                     icon={<MessageCircle size={20} />}
                     label='WhatsApp'
                     desc='Direct messaging for inquiries'
                     onClick={() => setIsOpen(false)}
                  />
                  <MenuLink 
                     href='https://drive.google.com/file/d/1zybt3MRw0e3dVw64XWedls_GqnoOjssq'
                     icon={<FileText size={20} />}
                     label='Curriculum Vitae'
                     desc='My professional journey'
                     accent={true}
                     onClick={() => setIsOpen(false)}
                  />

                  <div className='mt-8 pt-8 border-t border-border/50'>
                     <p className='text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase mb-6'>Let's Connect</p>
                     <div className='flex gap-4'>
                        <SocialIcon href='https://x.com/chainstellar' icon={<Twitter size={20} />} />
                        <SocialIcon href='https://ng.linkedin.com/in/damian-david-chidera-39b18b214' icon={<Linkedin size={20} />} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

// Helper Components for Cleaner Drawer
function MenuLink({ href, icon, label, desc, onClick, accent }) {
   return (
      <a
         href={href}
         target='_blank'
         rel='noopener noreferrer'
         onClick={onClick}
         className={`group flex items-center justify-between px-4 py-3 rounded-md transition-all duration-300 ${
            accent 
            ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20' 
            : 'bg-surface-muted dark:bg-white/5 hover:bg-primary/10 hover:translate-x-2'
         }`}
      >
         <div className='flex items-center gap-4'>
            <div className={`p-2 rounded-md ${accent ? 'bg-white/20' : 'bg-surface dark:bg-white/5 text-primary'}`}>
               {icon}
            </div>
            <div className='flex flex-col'>
               <span className='font-bold text-sm tracking-tight'>{label}</span>
               <span className={`text-[11px] ${accent ? 'text-white/70' : 'text-text-muted'}`}>{desc}</span>
            </div>
         </div>
         <ArrowRight size={18} className='opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300' />
      </a>
   );
}

function SocialIcon({ href, icon }) {
   return (
      <a 
         href={href} 
         target='_blank' 
         rel='noopener noreferrer'
         className='w-12 h-12 rounded-md bg-surface-muted dark:bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-primary transition-all duration-300'
      >
         {icon}
      </a>
   );
}

export default Navbar;
