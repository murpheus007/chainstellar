import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { works } from '../static/works';

function BestWorks() {
   const [activeIndex, setActiveIndex] = useState(0);

   const handleNext = () => {
      setActiveIndex((prev) => (prev + 1) % works.length);
   };

   const handlePrev = () => {
      setActiveIndex((prev) => (prev - 1 + works.length) % works.length);
   };

   const getCardStyle = (index) => {
      if (index === activeIndex) {
         return 'z-30 left-1/2 -translate-x-1/2 scale-100 opacity-100 blur-0';
      }

      const len = works.length;
      const prevIndex = (activeIndex - 1 + len) % len;
      const nextIndex = (activeIndex + 1) % len;

      if (index === prevIndex) {
         return 'z-20 left-[5%] md:left-[20%] -translate-x-1/2 scale-90 opacity-40 blur-[2px] cursor-pointer hover:opacity-60';
      }

      if (index === nextIndex) {
         return 'z-20 left-[95%] md:left-[80%] -translate-x-1/2 scale-90 opacity-40 blur-[2px] cursor-pointer hover:opacity-60';
      }

      return 'z-10 left-1/2 -translate-x-1/2 scale-50 opacity-0 pointer-events-none';
   };

   return (
      <section className='py-16 bg-background text-gray-200 overflow-hidden'>
         <div className='max-w-6xl mx-auto px-3 md:px-6 relative'>
            {/* Section Heading */}
            <p className='inline bg-neutral-600 p-2 text-sm text-white uppercase rounded-sm mb-2'>
               His
            </p>
            <h2 className='text-2xl md:text-3xl font-bold text-text mt-2 mb-12'>
               Best Works
            </h2>

            {/* Slider Container */}
            <div className='relative h-[600px] md:h-[450px] w-full flex items-center justify-center'>
               {works.map((work, index) => (
                  <div
                     key={work.id}
                     onClick={() => {
                        const len = works.length;
                        if (index === (activeIndex - 1 + len) % len) handlePrev();
                        if (index === (activeIndex + 1) % len) handleNext();
                     }}
                     className={`absolute h-full transition-all duration-500 ease-in-out w-[90%] md:w-[70%] lg:w-[60%] bg-neutral-900/50 rounded-xl overflow-hidden shadow-2xl border border-white/5 ${getCardStyle(
                        index
                     )}`}>
                     <div className='flex flex-col md:flex-row h-full'>
                        {/* Image */}
                        <div className='w-full md:w-1/2 h-64 md:h-auto'>
                           <img
                              src={work.image}
                              alt={work.title}
                              className='w-full h-full object-cover'
                           />
                        </div>

                        {/* Content */}
                        <div className='w-full md:w-1/2 p-6 flex flex-col justify-center gap-4 bg-background/95 backdrop-blur-sm'>
                           <h3 className='text-xl md:text-2xl font-bold text-text line-clamp-2'>
                              {work.title}
                           </h3>
                           <p className='text-gray-400 text-sm md:text-base line-clamp-3 md:line-clamp-none'>
                              {work.description}
                           </p>
                           <a
                              href={work.link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex items-center gap-2 text-accent font-medium hover:gap-4 transition-all mt-2 w-fit'>
                              Read More
                              <ArrowRight size={20} />
                           </a>
                        </div>
                     </div>
                  </div>
               ))}

               {/* Navigation Buttons (Floating) */}
               <button
                  onClick={handlePrev}
                  className='absolute left-0 z-40 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm transition hidden md:block'
                  aria-label='Previous'>
                  <ChevronLeft size={32} />
               </button>
               <button
                  onClick={handleNext}
                  className='absolute right-0 z-40 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm transition hidden md:block'
                  aria-label='Next'>
                  <ChevronRight size={32} />
               </button>
            </div>

            {/* Ellipsis Indicators */}
            <div className='flex justify-center items-center gap-2 mt-8 flex-wrap px-4'>
               {works.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => setActiveIndex(index)}
                     className={`rounded-full transition-all duration-300 ${
                        index === activeIndex
                           ? 'w-8 h-2 bg-primary shadow-[0_0_10px_rgba(21,93,252,0.5)]'
                           : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                     }`}
                     aria-label={`Go to slide ${index + 1}`}
                  />
               ))}
            </div>
         </div>
      </section>
   );
}

export default BestWorks;
