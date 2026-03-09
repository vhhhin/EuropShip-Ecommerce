
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const questions = [
  {
    q: "What makes EuropShip's logistics network unique? ",
    a: "Our extensive network connects over 30 strategic hubs across Europe, enabling next-day delivery to major cities and 24-48 hours coverage for most European regions. We combine AI-powered route optimization with local expertise to ensure your shipments always take the most efficient path to their destination."
  },
  {
    q: "Which shipping solutions do you offer for different business needs?",
    a: "We provide tailored shipping solutions for businesses of all sizes. This includes same-day express delivery for urgent shipments, cost-effective standard shipping with 24-48 hours delivery, and specialized bulk transportation services with dedicated vehicles. Each option comes with real-time tracking and guaranteed delivery windows."
  },
  {
    q: "How do you simplify international customs clearance?",
    a: "Our dedicated customs team has over 20 years of experience handling cross-border shipments. We manage all documentation, classification, and compliance requirements, while our automated systems pre-clear shipments to prevent delays. Plus, our Brexit-ready processes ensure smooth UK-EU transitions."
  },
  {
    q: "What advanced features do your warehousing facilities offer?",
    a: "Our smart warehouses feature IoT-enabled temperature monitoring (-30°C to +30°C), AI-powered inventory management with 99.9% accuracy, and advanced security systems including 24/7 surveillance. We offer flexible storage solutions from single pallet spaces to dedicated warehouse sections, all managed through our real-time client portal."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading font-bold mb-12"
        >
          Frequently asked questions
        </motion.h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl overflow-hidden border-white/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-base font-semibold">{item.q}</span>
                {openIndex === i ? <Minus size={20} className="text-orange-500" /> : <Plus size={20} />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="p-6 pt-0 text-gray-400 border-t border-white/5 mt-4"
                    >
                      {item.a}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;