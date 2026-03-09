import React from 'react';
import { motion } from 'framer-motion';

const TabletShowcase: React.FC = () => {
  return (
    <section className="py-10 md:py-16 relative flex flex-col items-center justify-center bg-transparent">
      <div className="max-w-3xl mx-auto px-2 relative z-10 text-center flex flex-col items-center w-full">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-heading mb-4 tracking-tighter leading-tight">
            #Enterprise Ready
          </h2>
          <p className="text-base md:text-lg opacity-60 font-medium">
            Unleash your AI full infrastructure
          </p>
        </motion.div>

        {/* Tablet Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl"
        >
          {/* Tablet Container */}
          <div className="relative w-full aspect-[16/10]">
            {/* Tablet Frame Shadow */}
            <div className="absolute inset-0 bg-black/40 blur-2xl rounded-3xl -z-10" />
            
            {/* Tablet Physical Frame */}
            <div className="relative w-full h-full bg-black rounded-2xl p-2 shadow-xl" style={{
              boxShadow: '0 16px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)'
            }}>
              {/* Screen Bezel */}
              <div className="relative w-full h-full bg-white rounded-xl overflow-hidden">
                {/* Tablet Screen Image */}
                <img 
                  src="/Tablet.png" 
                  alt="Tablet Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Screen Camera Notch */}
              <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-black rounded-full z-10"></div>

            </div>

            {/* Tablet Bottom Reflection */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-gradient-to-t from-white/20 to-transparent rounded-full blur-2xl"></div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default TabletShowcase;
