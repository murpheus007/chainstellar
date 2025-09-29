import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const works = [
   {
      id: 1,
      title: 'Built to Extract',
      description:
         'Why the Average Nigerian Uses Products Differently, and What That Means for Your Solana Startup.',
      link: 'https://medium.com/@linchpinremainstheboss/built-to-extract-why-the-average-nigerian-uses-products-differently-and-what-that-means-for-your-91be26933702',
      image: '/bte.jpg',
   },
   {
      id: 2,
      title: 'The Anatomy of a “Good” Stablecoin',
      description:
         'A breakdown of competing interests — from users to issuers — and how they influence what ‘good’ really means.',
      link: 'https://medium.com/@linchpinremainstheboss/the-anatomy-of-a-good-stablecoin-9cff82cb7e9b',
      image: '/stablecoin.jpg',
   },
   {
      id: 3,
      title: 'Memecoins: Epitomizing Decentralization',
      description:
         'What memecoins are, basic strategies, risks/rewards, and why they level the crypto playing field.',
      link: 'https://medium.com/@linchpinremainstheboss/memecoins-epitomizing-the-essence-of-decentralization-bc3300ffe7ea',
      image: '/memecoins.jpg',
   },
   {
      id: 4,
      title: 'Compressed NFTs on Solana',
      description:
         'A Cultural Adjustment Fostering Economic Viability in Web3. There was a cultural adjustment. But what was the culture?',
      link: 'https://medium.com/@linchpinremainstheboss/compressed-nfts-on-solana-a-cultural-adjustment-fostering-economic-viability-in-web3-18b64a6c2db0',
      image: '/compressed-nfts.jpg',
   },
   {
      id: 5,
      title: 'A Thread on Rumple Labs',
      description:
         '@0xJoshyy’s denied $900k airdrop loss highlights @RumpleLabs’ $23.76M TVL solution for instant point liquidity.',
      link: 'https://x.com/chainstellar/status/1931430685731926190',
      image: '/rumple-labs.jpg',
   },
   {
      id: 6,
      title: 'A Thread on deBridgeFinance',
      description:
         'deBridge aims to hit $100M daily transactions, boosting DeFi with secure cross-chain tech.',
      link: 'https://x.com/chainstellar/status/1861709020848910600',
      image: '/debridge.jpg',
   },
   {
      id: 7,
      title: 'A Thread on MagicBlock',
      description:
         'Likens MagicBlock to an F1 engine, enhancing Solana’s speed and scalability for real-time applications through Ephemeral Rollups technology.',
      link: 'https://x.com/chainstellar/status/1901272546911100969',
      image: '/magicblock.jpg',
   },
   {
      id: 8,
      title: 'A Thread on MAIN AI DEX',
      description:
         'MAIN AI DEX leverages AI to revolutionize DeFi profitability, mirroring ChatGPT’s 2025 image generation surge.',
      link: 'https://x.com/chainstellar/status/1921269518560604193',
      image: '/main-ai-dex.jpg',
   },
   {
      id: 9,
      title: 'A Thread on AgriDex Platform',
      description:
         'AgriDex uses Solana’s blockchain to cut Nigeria’s N3.5 trillion post-harvest losses by 40%, boosting farmer incomes by 50%.',
      link: 'https://x.com/chainstellar/status/1861537600349089953',
      image: '/agridex.jpg',
   },
   {
      id: 10,
      title: 'A Thread on Citrea',
      description:
         'Citrea, a layer-2 ZK rollup, enhances Bitcoin with smart contracts and Ðapps, tapping into its $2.1T idle capital while leveraging BitVM for secure, trust-minimized bridging.',
      link: 'https://x.com/chainstellar/status/1930376951199363403',
      image: '/citrea.jpg',
   },
   {
      id: 11,
      title: 'A Thread on HIO Music App',
      description:
         'HIO Music, a Solana-powered platform, promises 100% royalties to artists, revolutionizing the music industry with blockchain transparency.',
      link: 'https://x.com/chainstellar/status/1889163795026571597',
      image: '/hio-music.jpg',
   },
   {
      id: 12,
      title: 'A Thread on Stabble',
      description:
         'Announces the successful Token Generation Event (TGE) for $STB on May 22, 2025, with trading now live and opportunities for airdrops.',
      link: 'https://x.com/chainstellar/status/1926633157119377544',
      image: '/stabble.jpg',
   },
   {
      id: 13,
      title: 'A Thread on Flare Network',
      description:
         'Flare Network boosts XRP’s utility post-SEC lawsuit, leveraging the Howey Test to enhance decentralization.',
      link: 'https://x.com/chainstellar/status/1934052855461110185',
      image: '/flare-network.jpg',
   },
   {
      id: 14,
      title: 'A Thread on Global Dollar USDG',
      description:
         "Discusses PYUSD's launch, institutional challenges with stablecoins, and USDG's introduction to bridge gaps, timed with recent regulatory and technological advancements.",
      link: 'https://x.com/chainstellar/status/1935798902319681849',
      image: '/usdg.jpg',
   },
   {
      id: 15,
      title: 'A Thread on Token Mill',
      description:
         'Token Mill aims to counter scam-heavy platforms like @pumpdotfun with transparent Solana/Avalanche trading.',
      link: 'https://x.com/chainstellar/status/1858739488698048724',
      image: '/token-mill.jpg',
   },
];

function BestWorks() {
   const [currentPage, setCurrentPage] = useState(1);

   const totalPages = Math.ceil(works.length / ITEMS_PER_PAGE);

   const handlePrev = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
   };

   const handleNext = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
   };

   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
   const currentWorks = works.slice(startIndex, startIndex + ITEMS_PER_PAGE);

   return (
      <section className='py-16 bg-background text-gray-200'>
         <div className='max-w-6xl mx-auto px-6'>
            {/* Section Heading */}
            <p className='inline bg-neutral-600 p-2 text-sm text-white uppercase rounded-sm mb-2'> His </p>
            <h2 className='text-2xl md:text-3xl font-bold text-white mt-2 mb-6 font-serif'>
               Best Works
            </h2>

            {/* Cards */}
            <div className='flex flex-col gap-4'>
               {currentWorks.map((work, index) => (
                  <div
                     key={work.id}
                     className={`flex flex-col md:flex-row items-center gap-6 ${
                        index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                     }`}>
                     {/* Image */}
                     <img
                        src={work.image}
                        alt={work.title}
                        className='w-full md:w-1/2 rounded-lg object-cover shadow-lg'
                     />

                     {/* Text & Arrow */}
                     <div className='md:w-1/2 flex flex-col gap-4'>
                        <h3 className='text-xl md:text-2xl font-bold text-white'>
                           {work.title}
                        </h3>
                        <p className='text-gray-300 leading-relaxed'>
                           {work.description}
                        </p>
                        <a
                           href={work.link}
                           target='_blank'
                           rel='noopener noreferrer'
                           className='flex items-center gap-2 text-white font-medium hover:gap-4 transition-all'>
                           Read More
                           <ArrowRight size={20} />
                        </a>
                     </div>
                  </div>
               ))}
            </div>
            {/* Pagination */}
            <div className='flex justify-center items-center gap-4 mt-12'>
               <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className='px-4 py-2 bg-neutral-900 text-white rounded disabled:opacity-50'>
                  Previous
               </button>
               <span className='text-gray-300'>
                  Page {currentPage} of {totalPages}
               </span>
               <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className='px-4 py-2 bg-neutral-900 text-white rounded disabled:opacity-50'>
                  Next
               </button>
            </div>
         </div>
      </section>
   );
}

export default BestWorks;
