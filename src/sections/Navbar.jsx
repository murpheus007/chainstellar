import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

function Navbar() {
   const [isOpen, setIsOpen] = useState(false);

   // ✅ Smarter dark mode initialization (localStorage + system preference)
   const [darkMode, setDarkMode] = useState(() => {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
   });

   // ✅ Sync theme with <html> class + localStorage
   useEffect(() => {
      const root = document.documentElement;
      if (darkMode) {
         root.classList.add('dark');
         localStorage.setItem('theme', 'dark');
      } else {
         root.classList.remove('dark');
         localStorage.setItem('theme', 'light');
      }
   }, [darkMode]);

   return (
      <>
         {/* Navbar */}
         <nav className='fixed top-0 left-0 w-full bg-primary z-50 px-3 md:px-6 py-1'>
            <div className='max-w-6xl mx-auto flex items-center justify-between'>
               {/* Logo */}
               <h1 className='text-md font-bold text-white'>chainstellar</h1>

               {/* Hamburger */}
               <button
                  onClick={() => setIsOpen(true)}
                  className='p-2 rounded-md cursor-pointer'
                  aria-label='Open menu'>
                  <Menu
                     className='text-white hover:text-gray-50 transition'
                     size={20}
                  />
               </button>
            </div>
         </nav>

         {/* Overlay */}
         {isOpen && (
            <div
               className='fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40'
               onClick={() => setIsOpen(false)}
            />
         )}

         {/* Slide-in board */}
         <div
            className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-50 transform transition-transform duration-300 ${
               isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
            {/* Close button */}
            <div className='flex justify-end p-4'>
               <button
                  onClick={() => setIsOpen(false)}
                  className='p-2 rounded-md cursor-pointer'
                  aria-label='Close menu'>
                  <X className='text-text font-bold transition' size={20} />
               </button>
            </div>

            {/* Board content */}
            <div className='flex flex-col items-center gap-2 px-4'>
               {/* ✅ Close drawer on link click */}
               <a
                  href='https://medium.com/@linchpinremainstheboss/about'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setIsOpen(false)}
                  className='w-full py-2 bg-neutral-400 text-white text-[12px] text-center font-bold rounded-sm hover:bg-neutral-500 transition'>
                  Medium
               </a>
               <a
                  href='https://wa.me/2347044085646'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setIsOpen(false)}
                  className='w-full py-2 bg-emerald-600 text-white text-[12px] text-center font-bold rounded-sm hover:bg-emerald-700 transition'>
                  Chat him
               </a>
               <a
                  href='https://drive.google.com/drive/u/0/folders/1RPgPg80m7XjUxiCxc02WlYFeos6bBEcZ'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setIsOpen(false)}
                  className='w-full py-2 bg-primary text-white text-[12px] text-center font-bold rounded-sm hover:bg-blue-600 transition'>
                  Resume
               </a>

               {/* Dark/Light Toggle */}
               <button
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label='Toggle dark mode'
                  className={`w-full mt-4 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-bold rounded-md transition
                     ${
                        darkMode
                           ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-md'
                           : 'bg-gray-800 text-white hover:bg-gray-700 shadow-md'
                     }`}>
                  {darkMode ? (
                     <>
                        <Sun size={16} className='text-yellow-900' /> Light Mode
                     </>
                  ) : (
                     <>
                        <Moon size={16} className='text-blue-300' /> Dark Mode
                     </>
                  )}
               </button>
            </div>
         </div>
      </>
   );
}

export default Navbar;
