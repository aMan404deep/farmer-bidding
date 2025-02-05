import React from 'react';
import SwipeCarousel from '../component/Swipe_carousel';
import AuroraHero from '../component/AuroraHero';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen">
            
             <div className='flex flex-col items-center justify-center h-screen w-screen'>
                 <AuroraHero />
                {/* <SwipeCarousel /> */}
             </div>  
           
          
        </div>
    );
};

export default Landing;
