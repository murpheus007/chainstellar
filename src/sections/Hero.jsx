import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Send, MousePointer2 } from 'lucide-react';
import styles from './Hero.module.css';

const headingWords = ['Creative', 'Writer', '&', 'Technical', 'Analyst'];

function Hero() {
   const [imageRotate, setImageRotate] = useState(2);
   const [labelVisible, setLabelVisible] = useState(false);
   const [statVisible, setStatVisible] = useState(false);
   const [activeWord, setActiveWord] = useState(-1);

   // Word-by-word scale animation
   useEffect(() => {
      let cancelled = false;
      let wordIndex = 0;

      const animateWords = () => {
         if (cancelled) return;
         setActiveWord(wordIndex);
         wordIndex++;
         if (wordIndex < headingWords.length) {
            setTimeout(animateWords, 350);
         } else {
            setTimeout(() => {
               if (cancelled) return;
               wordIndex = 0;
               setActiveWord(-1);
               setTimeout(animateWords, 1500);
            }, 2000);
         }
      };

      const startTimeout = setTimeout(animateWords, 800);
      return () => { cancelled = true; clearTimeout(startTimeout); };
   }, []);

   // Image tilt + overlay animation cycle
   useEffect(() => {
      let cancelled = false;
      const sleep = (ms) => new Promise(r => setTimeout(r, ms));

      const runCycle = async () => {
         if (cancelled) return;
         setImageRotate(0);
         if (cancelled) return;
         await sleep(1000);
         if (cancelled) return;
         setLabelVisible(true);
         setStatVisible(true);
         if (cancelled) return;
         await sleep(3000);
         if (cancelled) return;
         setImageRotate(2);
         setLabelVisible(false);
         setStatVisible(false);
         if (cancelled) return;
         await sleep(2000);
         if (cancelled) return;
         runCycle();
      };

      const startTimeout = setTimeout(() => runCycle(), 1500);
      return () => { cancelled = true; clearTimeout(startTimeout); };
   }, []);

   return (
      <section className={styles.section}>
         {/* Background */}
         <div className={styles.bgGradient} />
         <div className={styles.bgGlows}>
            <div className={styles.glowTop} />
            <div className={styles.glowBottom} />
            <div className={styles.bgTexture} />
         </div>

         <div className={styles.container}>
            <div className={styles.grid}>

               {/* Left: Text */}
               <div className={styles.textContent}>
                  <div className={styles.badge}>
                     <Sparkles size={14} />
                     <span>Available for Work</span>
                  </div>

                  <span className={styles.nameLabelSEO} aria-hidden="false" style={{ fontSize:'14px', fontWeight:600, color:'var(--color-text-muted)', letterSpacing:'0.05em', display:'block', marginBottom:'8px' }}>
                     Damian David Chidera
                  </span>
                  <h1 className={styles.heading}>
                     <span className={styles.headingWord}>
                        <motion.span
                           animate={activeWord === 0 ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                           className={styles.headingWord}
                        >Creative</motion.span>{' '}
                        <motion.span
                           animate={activeWord === 1 ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                           className={`${styles.headingWord} ${styles.brandBlue}`}
                        >Writer</motion.span>
                     </span>
                     <br />
                     <span className={styles.headingWord}>
                        <motion.span
                           animate={activeWord === 2 ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                           className={styles.headingWord}
                        >&</motion.span>{' '}
                        <motion.span
                           animate={activeWord === 3 ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                           className={`${styles.headingWord} ${styles.brandDark}`}
                        >Technical</motion.span>{' '}
                        <motion.span
                           animate={activeWord === 4 ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                           className={`${styles.headingWord} ${styles.brandDark}`}
                        >Analyst</motion.span>
                     </span>
                  </h1>

                  <p className={styles.description}>
                     Meet <span className={styles.brandUnderline}>Damian D. Chidera</span> (<span className={styles.brandUnderline}>Chainstellar</span>), a general creative and technical writer, as well as a product tester and analyst, with a strong enthusiasm for blockchain and its evolving ecosystem.
                  </p>

                  <div className={styles.ctaGroup}>
                     <a
                        href="https://calendly.com/damiandchidera/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnPrimary}
                     >
                        <div className={styles.btnPrimaryShine} />
                        <Calendar size={20} />
                        <span>Book Meeting</span>
                     </a>

                     <motion.a
                        href="https://t.me/chainstellar1"
                        target="_blank"
                        rel="noopener noreferrer"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.97 }}
                        className={styles.btnSecondary}
                     >
                        <Send size={20} />
                        <span>Chat Him</span>
                     </motion.a>
                  </div>

                  <div className={styles.trustSignals}>
                     <span className={styles.trustLabel}>Trusted Writer at</span>
                     {[
                        { label: 'SUPERTEAM', dotClass: styles.dotBlue },
                        { label: 'SCRIBBLEDAO', dotClass: styles.dotOrange },
                        { label: 'ICOVERAGE.XYZ', dotClass: styles.dotDark },
                     ].map((item) => (
                        <div key={item.label} className={styles.trustItem}>
                           <span className={`${styles.trustDot} ${item.dotClass}`} />
                           <span>{item.label}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right: Image */}
               <div className={styles.imageArea}>
                  <div className={styles.imageContainer}>
                     <div className={styles.imageGlowTop} />
                     <div className={styles.imageGlowBottom} />

                     <motion.div
                        animate={{ rotate: imageRotate }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: 'bottom center' }}
                        className={styles.imageWrapper}
                     >
                        <div className={styles.imageOverlay} />
                        <img
                           src="/heroImage2.svg"
                           alt="ChainStellar"
                           fetchpriority="high"
                           loading="eager"
                           className={styles.heroImage}
                        />

                        <motion.div
                           animate={labelVisible ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                           className={styles.nameLabel}
                        >
                           <div className={styles.nameLabelIcon}>
                              <MousePointer2 size={18} style={{ color: '#fff' }} />
                           </div>
                           <div>
                              <p className={styles.nameLabelTitle}>Damian D. Chidera</p>
                              <p className={styles.nameLabelSubtitle}>Chainstellar, Creator</p>
                           </div>
                        </motion.div>
                     </motion.div>

                     <motion.div
                        animate={statVisible ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className={styles.statCard}
                     >
                        <span className={styles.statNumber}>10x plus</span>
                        <span className={styles.statLabel}>Superteam Wins</span>
                     </motion.div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Hero;
