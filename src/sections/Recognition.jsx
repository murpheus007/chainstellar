import React from 'react';
import { Trophy, ExternalLink } from 'lucide-react';

const recognitions = [
   {
      id: 1,
      title: '10x plus SuperteamEarn Bounty Winner',
      year: '2025',
      desc: 'Recognized for excellence in technical and creative tasks across the Superteam ecosystem.',
      link: 'https://earn.superteam.fun/',
   },
   {
      id: 2,
      title: '6x plus ScribbleDAO Bounty Winner',
      year: '2025',
      desc: 'Distinguished for high-impact creative and technical writing',
      link: 'https://app.mirror.scribbledao.com/dashboard',
   },
   {
      id: 3,
      title: 'State-Level Commendation',
      year: '2023',
      desc: 'Honored by the Commissioner for Digital Economy and e-Governance, Imo State, for creative excellence in video content creation',
      link: 'https://www.facebook.com/share/p/16SJUDC9dg/?mibextid=wwXIfr',
   },
   {
      id: 4,
      title: 'SkillUp Imo Outstanding Creator',
      year: '2023',
      desc: 'Special recognition for creating high-impact educational video content.',
      link: 'https://www.facebook.com/share/v/1BSAupYJ6k/?mibextid=wwXIfr',
   },
   {
      id: 5,
      title: 'Essay Competition Runner-Up',
      year: '2023',
      desc: 'Achieved 1st Runner-Up in the My Dream Imo State by 2040 Essay Competition (Topic: Rural Economy)',
      link: 'https://www.facebook.com/share/17CxQn2Nbu/?mibextid=wwXIfr',
   },
];

function Recognitions() {
   return (
      <section className='py-12 md:py-24 bg-background'>
         <div className='max-w-6xl mx-auto px-4 md:px-6'>
               <div className='max-w-xl mb-16'>
                  <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-6'>
                     <span>Milestones</span>
                  </div>
                  <h2 className='text-4xl md:text-6xl font-black text-text leading-[0.9] tracking-tighter transition-all'>
                     His Notable <br /><span className='text-primary'>Recognitions</span>
                  </h2>
               </div>

            <div className='flex flex-col gap-4'>
               {recognitions.map((recog) => (
                  <a
                     key={recog.id}
                     href={recog.link}
                     target='_blank'
                     rel='noopener noreferrer'
                     className='group flex flex-col md:flex-row md:items-center justify-between p-4 md:p-8 bg-surface rounded-md border border-text/20 dark:border-white/20 hover:border-primary transition-all duration-300 hover:shadow-soft'
                  >
                     <div className='flex flex-col md:flex-row md:items-start gap-4 md:gap-8'>
                        <div className='text-4xl md:text-5xl font-black transition-all duration-500 text-primary-light group-hover:text-primary dark:text-white/30 dark:group-hover:text-white'>
                           {recog.year}
                        </div>
                        <div className='flex flex-col'>
                           <h3 className='text-xl md:text-2xl font-bold text-text group-hover:text-primary transition-colors'>
                              {recog.title}
                           </h3>
                           <p className='text-text-muted mt-2 text-sm max-w-xl'>
                              {recog.desc}
                           </p>
                        </div>
                     </div>
                     
                     <div className='mt-6 md:mt-0 flex items-center gap-2 text-text-muted font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-all'>
                        <span>Proof of Work</span>
                        <div className='w-10 h-10 rounded-md bg-surface-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all'>
                           <ExternalLink size={16} />
                        </div>
                     </div>
                  </a>
               ))}
            </div>
         </div>
      </section>
   );
}

export default Recognitions;
