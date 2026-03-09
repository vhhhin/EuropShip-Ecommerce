import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ImageIcon, MessageSquare, Mic, ArrowUp, UserCircle } from 'lucide-react';

const Playground: React.FC = () => {
  const [activeTab, setActiveTab] = useState('text');

  const tabs = [
    { id: 'text', icon: MessageSquare, label: 'Text Generate' },
    { id: 'image', icon: ImageIcon, label: 'Generate Image' },
    { id: 'avatar', icon: UserCircle, label: 'Avatar Generate' },
    { id: 'speech', icon: Mic, label: 'Speech recognition' }
  ];

  return (
    <section
      className="py-24 md:py-40 bg-transparent flex flex-col items-center"
      data-theme-trigger="light"
    >
      <div className="max-w-7xl mx-auto px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block text-[11px] font-black uppercase tracking-[0.4em] mb-4 opacity-70"
        >
          Playground
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-heading mb-6 tracking-tighter"
        >
          Experience it now
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="opacity-50 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-20"
        >
          Try EuropShip Inference at the Edge for yourself using our playground.
        </motion.p>

        <div className="max-w-5xl mx-auto w-full">
          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-7 py-3.5 rounded-full whitespace-nowrap text-[13px] font-black transition-all border focus:outline-none
                  ${activeTab === tab.id
                    ? 'bg-orange-500 text-white border-orange-500 shadow-xl'
                    : 'bg-gray-200/80 dark:bg-white/20 text-gray-900 dark:text-white border-gray-300 dark:border-white/30 hover:bg-gray-200 dark:hover:bg-orange-500/20 hover:text-orange-600 dark:hover:text-orange-400'}
                `}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Card */}
          <motion.div 
             key={activeTab}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-current/[0.03] rounded-[4rem] p-10 md:p-24 border border-current/5 relative overflow-hidden flex flex-col items-center"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-20 h-20 bg-[#ff4d00] rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-orange-600/40"
            >
              <Sparkles size={40} className="text-white" />
            </motion.div>
            
            <h3 className="section-heading font-black mb-6 tracking-tight">Discover the Al Realm</h3>
            <p className="opacity-50 text-lg max-w-lg font-medium leading-relaxed mb-16">
              Enter your prompt below to see the lightning fast response of our global edge infrastructure.
            </p>

            <div className="relative group w-full max-w-2xl">
              <input 
                type="text" 
                placeholder="A white rabbit on a black Harley Davidson..."
                className="w-full bg-current/5 border border-current/10 rounded-full py-7 px-10 pr-24 text-lg font-semibold focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:opacity-30"
              />
              <button className="absolute right-3 top-3 w-14 h-14 bg-current text-white invert rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl">
                <ArrowUp size={28} />
              </button>
            </div>
            
            <p className="mt-12 text-[10px] opacity-40 text-center uppercase tracking-[0.4em] font-black max-w-xl">
              Free Release of Preview. Evaluate AI model performance about people, places, or facts.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Playground;