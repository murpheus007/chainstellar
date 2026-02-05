import React from 'react';
import { SquareArrowRight } from 'lucide-react';

const recognitions = [
   {
      id: 1,
      title: '10x SuperteamEarn Bounty Winner',
      year: '2025',
      link: 'https://earn.superteam.fun/',
   },
   {
      id: 2,
      title: '6x ScribbleDAO Bounty Winner',
      year: '2025',
      link: 'https://app.mirror.scribbledao.com/dashboard',
   },
   {
      id: 3,
      title: 'Honored by the Commissioner for Digital Economy and e-Governance, Imo State, for creative excellence in video content creation',
      year: '2023',
      link: 'https://www.facebook.com/share/p/16SJUDC9dg/?mibextid=wwXIfr',
   },
   {
      id: 4,
      title: 'Special recognition from SkillUp Imo for outstanding video content creation',
      year: '2023',
      link: 'https://www.facebook.com/share/v/1BSAupYJ6k/?mibextid=wwXIfr',
   },
   {
      id: 5,
      title: '1st Runner-Up in the My Dream Imo State by 2040 Essay Competition (Topic: Rural Economy)',
      year: '2023',
      link: 'https://www.facebook.com/share/17CxQn2Nbu/?mibextid=wwXIfr',
   },
];

function Recognitions() {
   return (
      <section className='py-16 bg-background text-gray-200'>
         <div className='max-w-6xl mx-auto px-3 md:px-6'>
            {/* Section Heading */}
            <p className='inline bg-neutral-600 p-2 text-sm text-white uppercase rounded-sm mb-1'>
               His
            </p>
            <h2 className='text-2xl md:text-3xl font-bold text-text mt-2 mb-12'>
               Recognitions
            </h2>

            {/* Cards Grid */}
            <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2'>
               {recognitions.map((recog) => (
                  <div
                     key={recog.id}
                     className='flex justify-between items-center p-4 bg-neutral-900 rounded-lg shadow hover:shadow-lg transition'>
                     <div className='flex flex-col'>
                        <span className='text-white font-bold max-w-11/12'>
                           {recog.title}
                        </span>
                        <span className='text-sm text-gray-400 mt-1'>
                           {recog.year}
                        </span>
                     </div>
                     <a
                        href={recog.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center rounded-md bg-primary hover:bg-neutral-600 transition p-4'>
                        <SquareArrowRight
                           size={20}
                           className='text-white'
                        />
                     </a>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default Recognitions;
