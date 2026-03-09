
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Workflow, TrendingUp, Cpu, Zap, ArrowUpRight } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-40 bg-transparent" data-theme-trigger="light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 bg-current/5 border border-current/10 rounded-full text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-8"
          >
            #Enterprise Ready
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-heading leading-none mb-4 tracking-tighter"
          >
            Unleash your Al <br />
            <span className="opacity-40">full infrastructure</span>
          </motion.h2>
        </div>

        <div className="bento-grid">
          <BentoCard 
            title="Data privacy & legal" 
            desc="Sovereign European infrastructure ensuring full compliance and local data residency."
            icon={Shield}
            className="col-span-1 row-span-1"
          />
          
          <BentoCard 
            title="S3 Object Storage" 
            desc="Blazing fast S3 storage with native edge acceleration for model weights."
            icon={Layers}
            className="col-span-1 row-span-1"
          />
          
          <BentoCard 
            title="Smart Packaging" 
            desc="Auto-scaling inference that adapts to peak demand without cold starts."
            icon={TrendingUp}
            className="col-span-1 row-span-2"
            hasImage
          />
          
          <BentoCard 
            title="NVIDIA H100/L40S" 
            desc="Access premium GPU clusters optimized for transformer architectures."
            icon={Cpu}
            className="md:col-span-2 row-span-1"
          />
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ title, desc, icon: Icon, className = "", hasImage = false }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className={`glass rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative group ${className}`}
  >
    {hasImage && (
       <div className="absolute inset-0 -z-10 opacity-20 group-hover:opacity-40 transition-opacity">
         <div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 via-transparent to-purple-600/40" />
         <div className="absolute inset-0 bg-black animate-pulse" style={{ animationDuration: '6s' }} />
       </div>
    )}
    
    <div>
      <div className="w-10 h-10 bg-current/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-all duration-500 shadow-lg">
        <Icon size={18} />
      </div>
      <h3 className="text-lg font-black mb-2 tracking-tight leading-tight">{title}</h3>
      <p className="opacity-60 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
    
    <div className="mt-10 flex justify-end">
       <div className="w-14 h-14 rounded-full border border-current/10 flex items-center justify-center group-hover:bg-current group-hover:text-transparent transition-all">
         <ArrowUpRight size={24} />
       </div>
    </div>
  </motion.div>
);

export default Features;