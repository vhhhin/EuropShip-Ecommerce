import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Twitter, Linkedin, Github, Youtube, Send, Globe, User, Instagram, MessageCircle, X as XIcon } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#ffffff';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <div className="min-h-screen text-gray-900" style={{ backgroundColor: '#ffffff' }}>
      {/* Light Mode Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-xl bg-white/90" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-center">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/')}
          >
            <motion.div 
              className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1 }}
            >
              <img src="/gcore----mark.png" alt="EuropShip logo" className="w-full h-full object-contain" />
            </motion.div>
            <span className="font-bold text-base tracking-tight">EuropShip</span>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Hero Text */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900">
                  Start your journey with <span className="relative">
                    <span className="absolute -inset-2 bg-orange-600/30 blur-2xl" />
                    <span className="relative text-orange-600">us</span>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-lg">
                  Join Europe's fastest-growing fulfillment network and scale your e-commerce business effortlessly.
                </p>
              </motion.div>

              {/* Testimonial */}
              <motion.div 
                className="contact-ceo-card space-y-4 p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: '#ffffff' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <blockquote className="text-base text-gray-700 leading-relaxed italic font-medium">
                  "Helping the seller is essential—you can't maintain reliable service without prioritizing their needs. It's a true WIN-WIN, but many fail to see this value."
                </blockquote>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <motion.img
                    src="/founder.jpeg"
                    alt="Aassim El Kihel"
                    className="w-16 h-16 rounded-full object-cover border-3 border-orange-600 shadow-lg"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-base">Aassim El Kihel</p>
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">CEO & Founder</p>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  { label: 'Active Users', value: '170+' },
                  { label: 'Satisfaction', value: '95%' },
                  { label: '24/7 Support', value: 'Always' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ translateY: -8, boxShadow: "0 20px 40px rgba(234, 88, 12, 0.15)" }}
                    className="text-center p-4 rounded-xl bg-white border border-gray-200 hover:border-orange-600/40 transition-all group"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <p className="text-2xl md:text-3xl font-black text-orange-600 group-hover:scale-110 transition-transform">{stat.value}</p>
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:sticky lg:top-20"
            >
              <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow" style={{ backgroundColor: '#ffffff' }}>
                <ContactForm hideFooter={true} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      

    </div>
  );
};

export default ContactPage;