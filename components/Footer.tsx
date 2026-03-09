console.log("REAL FOOTER RENDERED");
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Youtube, Send, Globe, User, ArrowRight, ArrowUpRight, MessageCircle, X as XIcon } from 'lucide-react';

type FooterProps = {
  /** Hide the large CTA/grid block and keep only the bottom bar. */
  minimal?: boolean;
};

const Footer: React.FC<FooterProps> = ({ minimal = false }) => {
  return (
    <footer className="pt-40 pb-8 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {!minimal && (
          <>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="relative mb-14"
        >
          {/* Ambient background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-black opacity-80" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '72px 72px',
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.985, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
          >
            {/* Soft glows */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[620px] -translate-x-1/2 rounded-full bg-orange-500/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 right-14 h-64 w-64 rounded-full bg-orange-600/18 blur-[80px]" />
            <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-[60px]" />
            <motion.div
              className="pointer-events-none absolute inset-x-[-30%] top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
              initial={{ x: '-45%' }}
              animate={{ x: '45%' }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute left-[14%] top-[22%] h-10 w-10 rounded-full bg-orange-400/35 blur-[26px]"
              animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute right-[12%] bottom-[18%] h-8 w-8 rounded-full bg-white/25 blur-[20px]"
              animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 p-8 md:p-12">
              {/* Copy */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-white/75 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                  <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(255,122,0,0.8)]" />
                  Contact & onboarding
                </div>

                <h2 className="section-heading text-white tracking-tight leading-[1.05] text-[1.45rem] md:text-[2rem] lg:text-[2.3rem]">
                  Build a European delivery edge for your brand.
                </h2>

                <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-2xl">
                  Tell us your logistics goals. We map the right hubs, COD flows, and routes so you scale reliably across Europe with a premium, resilient network.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: 'Fast onboarding', subtitle: 'Live within days, not weeks' },
                    { title: 'COD expertise', subtitle: 'Local payments, reconciled cleanly' },
                    { title: 'Network depth', subtitle: 'Multi-country, premium SLAs' },
                  ].map((item) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    >
                      <p className="text-[13px] font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-[11px] text-white/60 leading-snug">{item.subtitle}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Panel */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                whileHover={{ translateY: -4 }}
                className="relative rounded-2xl border border-white/10 bg-black/45 p-6 md:p-8 overflow-hidden"
              >
                <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-orange-500/22 blur-[70px]" />
                <div className="pointer-events-none absolute -left-28 -bottom-28 h-72 w-72 rounded-full bg-orange-700/14 blur-[90px]" />
                <motion.div
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                />

                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/60">
                  Talk with a specialist
                </p>
                <p className="mt-4 text-lg font-semibold text-white">
                  Schedule a quick meet - you will hear back within 24h.
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-white/70">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Avg. reply: 6h</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Channels: Meet / Email</span>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ translateY: -2, scale: 1.02, boxShadow: '0 22px 70px rgba(0,0,0,0.55)' }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white text-black font-semibold text-sm px-5 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition"
                    >
                      Get started
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black/10 group-hover:bg-black/15 transition">
                        <ArrowRight size={16} />
                      </span>
                    </motion.button>
                  </Link>

                  <a
                    href="#network"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('network');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white/85 font-semibold text-sm px-5 py-3 hover:bg-white/[0.08] transition"
                  >
                    View coverage map
                    <ArrowUpRight size={14} className="opacity-70" />
                  </a>
                </div>

              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-3">
                 <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
                 <img src="/gcore-mark.gif" alt="EuropShip logo" className="w-full h-full object-cover block select-none" />
               </div>
               <span className="font-black text-base tracking-tight">EUROPSHIP</span>
             </div>
             <p className="opacity-40 text-sm mb-4 leading-relaxed font-normal">
               Ready to elevate your online presence? Contact us today to discuss your project and discover how we can bring your vision to life.
             </p>
             <div className="flex gap-2">
                <SocialIcon Icon={XIcon} href="https://x.com/europship9355" />
                <SocialIcon Icon={MessageCircle} href="https://wa.me/447465920962" />
                <SocialIcon Icon={Instagram} href="https://www.instagram.com/europship?igsh=MXBsM3VzZWJsb2podA==" />
                <SocialIcon Icon={Youtube} href="https://www.youtube.com/@EuropShip" />
             </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wide mb-3 opacity-60">Products</h4>
            <ul className="space-y-2 opacity-40 font-medium text-xs">
              <li className="hover:opacity-100 cursor-pointer transition-opacity">CDN</li>
              <li className="hover:opacity-100 cursor-pointer transition-opacity">Hosting</li>
              <li className="hover:opacity-100 cursor-pointer transition-opacity">AI Inference</li>
              <li className="hover:opacity-100 cursor-pointer transition-opacity">Cloud</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wide mb-3 opacity-60">Company</h4>
            <ul className="space-y-2 opacity-40 font-medium text-xs">
              <li>
                <a 
                  href="#hero" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('hero');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:opacity-100 cursor-pointer transition-opacity"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('features');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Services
                </a>
              </li>
              <li><a href="/legal" className="hover:opacity-100 cursor-pointer transition-opacity">Legal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wide mb-3 opacity-60">Contact</h4>
            <div className="flex flex-col gap-2 text-xs">
               <div className="flex items-center gap-1 opacity-40">
                  <Globe size={14} />
                  <span>Via del Gregge, Registered Agents Inc 30 N Gould St Ste R Sheridan, WY 82801 <br /> Phone: <br /> +(44) 7465-920962 <br />Email: <br /> contact@euroship.com</span>
               </div>
               <div className="flex items-center gap-1 opacity-40">
                  <User size={14} />
                  <span>Support Center</span>
               </div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-wide mb-3 opacity-60">Join Us</h4>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email"
                className="w-full bg-current/5 border border-current/10 rounded-full py-2 px-3 text-xs focus:outline-none focus:border-orange-500"
              />
              <button className="absolute right-1 top-1 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white">
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>
          </>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-current/5 text-[8px] opacity-40 font-black uppercase tracking-[0.2em] gap-4">
          <p>© {new Date().getFullYear()} EUROPSHIP S.A. All Rights Reserved.</p>
          <div className="flex gap-6">
             <a href="/privacy" className="hover:opacity-100 cursor-pointer transition-opacity">Privacy Policy</a>
             <a href="/terms" className="hover:opacity-100 cursor-pointer transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ Icon: any; href?: string }> = ({ Icon, href }) => {
  const content = (
    <div className="w-8 h-8 glass rounded-lg flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-current/10 cursor-pointer transition-all border border-current/5">
      <Icon size={14} />
    </div>
  );
  
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  
  return content;
};

export default Footer;