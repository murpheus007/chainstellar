import React from 'react';

function Hero() {
   return (
      <section className='bg-background text-gray-200 py-12 mt-4'>
         <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-center gap-4 px-3 md:px-6'>
            {/* Left: Image */}
            <div className='flex justify-center md:w-1/2'>
               <img
                  src='/heroImage2.jpg'
                  alt='ChainStellar'
                  fetchpriority='high'
                  loading='eager'
                  className='w-64 h-64 md:w-96 md:h-96 rounded-full object-cover shadow-lg'
               />
            </div>

            {/* Right: Text */}
            <div className='md:w-1/2 flex flex-col gap-4 text-left'>
               <h2 className='text-3xl md:text-4xl text-text    font-bold capitalize max-w-[550px]'>
                  Obsessed with the third iteration of the web.
               </h2>
               <p className='text-text leading-relaxed max-w-[600px]'>
                  Meet <span className='text-accent'>chainstellar</span>, a general
                  creative and technical writer with a strong enthusiasm for
                  blockchain and its evolving ecosystem.
               </p>

               {/* Call to Actions */}
               <div className='flex flex-row gap-4 md:justify-start mt-4'>
                  <a
                     href='https://calendly.com/damiandchidera/30min'
                     className='px-6 py-2 bg-primary text-white text-sm font-bold rounded-sm hover:bg-blue-600 transition'>
                     Book Meeting
                  </a>
                  <a
                     href='https://t.me/chainstellar1'
                     className='px-6 py-2 bg-neutral-800 text-white text-sm font-bold border border-white rounded-sm hover:bg-neutral-500 transition'>
                     Chat Him
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Hero;
