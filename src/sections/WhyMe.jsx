import React from 'react';
import { Mail } from 'lucide-react';

function WhyMe() {
   return (
      <section className='py-16 bg-background text-gray-200'>
         <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8'>
            {/* Left: Text */}
            <div className='flex-1 flex flex-col gap-4 w-full'>
               <div>
                  <p className='w-fit bg-neutral-600 p-2 text-sm text-white uppercase rounded-sm mb-1'>
                     Why
                  </p>
                  <h2 className='text-2xl md:text-3xl font-bold text-text'>
                     Work With Him?
                  </h2>
               </div>
               <p className='text-text max-w-[400px]'>
                  Because you want to win. And guess who else obviously loves
                  winning?
               </p>

               <a
                  href='mailto:damiandchidera@gmail.com'
                  className=' w-fit inline-flex items-start gap-2 px-6 py-2 bg-primary text-white text-sm font-bold rounded-sm hover:bg-blue-600 transition'>
                  <Mail size={18} />
                  Email Him
               </a>
            </div>

            {/* Right: Image */}
            <div className='flex-1'>
               <img
                  src='/whyme.jpg'
                  alt='Why work with me'
                  className='aspect-video md:w-full md:max-h-80 rounded-lg object-cover'
               />
            </div>
         </div>
      </section>
   );
}

export default WhyMe;
