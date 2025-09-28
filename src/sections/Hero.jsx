import React from 'react';

function Hero() {
   return (
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 px-6 bg-background text-gray-200 py-12 mt-4">
         {/* Left: Image */}
         <div className="flex justify-center md:w-1/2">
            <img
               src="/heroImage.jpg"
               alt="ChainStellar"
               className="w-64 h-64 md:w-96 md:h-96 rounded-full object-cover shadow-lg"
            />
         </div>

         {/* Right: Text */}
         <div className="md:w-1/2 flex flex-col gap-4 text-left">
            <h2 className="text-3xl md:text-4xl text-white font-bold capitalize">
               Obsessed with the third iteration of the web.
            </h2>
            <p className="text-gray-300 leading-relaxed">
               Meet <span className="text-accent">chainstellar</span>, a general
               creative and technical writer with a strong enthusiasm for
               blockchain and its evolving ecosystem.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-row gap-4 md:justify-start mt-4">
               <a
                  href="#book-meeting"
                  className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-sm hover:bg-blue-600 transition"
               >
                  Book Meeting
               </a>
               <a
                  href="#chat"
                  className="px-6 py-2 bg-neutral-800 text-white text-sm font-bold border border-white rounded-sm hover:bg-neutral-500 transition"
               >
                  Chat Me
               </a>
            </div>
         </div>
      </section>
   );
}

export default Hero;
