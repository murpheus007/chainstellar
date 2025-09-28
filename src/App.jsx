import React from 'react';
import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import Skills from './sections/Skills.jsx';
import Bestworks from './sections/Bestworks.jsx';
import Recognitions from './sections/Recognition.jsx';
import WhyMe from './sections/WhyMe.jsx';
import Footer from './sections/Footer.jsx';

function App() {
   return (
      <div className='bg-background'>
         <Navbar />
         <Hero />
         <Skills />
         <Bestworks />
         <Recognitions />
         <WhyMe />
         <Footer />
      </div>
   );
}

export default App;
