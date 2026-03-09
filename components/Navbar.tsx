import React, { useState, useEffect } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { ChevronDown, Globe, User, Menu } from 'lucide-react';
import { useMotionValue } from 'framer-motion';

interface NavbarProps {
  scrollYProgress?: MotionValue<number>;
}

const Navbar: React.FC<NavbarProps> = ({ scrollYProgress }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Correction : utiliser un vrai MotionValue si scrollYProgress n'est pas fourni
  const fallbackMotionValue = useMotionValue(0);
  const safeScrollY = scrollYProgress ?? fallbackMotionValue;

  // Theme-aware colors
  const navTextColor = useTransform(
    safeScrollY,
    [0, 0.15, 0.2, 0.35, 0.4, 0.55, 0.6, 0.75, 0.8],
    ["#ffffff", "#ffffff", "#000000", "#000000", "#ffffff", "#ffffff", "#000000", "#000000", "#ffffff"]
  );

  const navBgColor = useTransform(
    safeScrollY,
    [0, 0.15, 0.2, 0.35, 0.4, 0.55, 0.6, 0.75, 0.8],
    [
      "rgba(0,0,0,0.4)", 
      "rgba(0,0,0,0.7)", 
      "rgba(255,255,255,0.7)", 
      "rgba(255,255,255,0.7)", 
      "rgba(0,0,0,0.7)", 
      "rgba(0,0,0,0.7)", 
      "rgba(255,255,255,0.7)", 
      "rgba(255,255,255,0.7)", 
      "rgba(0,0,0,0.7)"
    ]
  );

  const borderColor = useTransform(
    safeScrollY,
    [0, 0.15, 0.2, 0.35, 0.4, 0.55, 0.6, 0.75, 0.8],
    [
      "rgba(255,255,255,0.1)", 
      "rgba(255,255,255,0.15)", 
      "rgba(0,0,0,0.1)", 
      "rgba(0,0,0,0.1)", 
      "rgba(255,255,255,0.15)", 
      "rgba(255,255,255,0.15)", 
      "rgba(0,0,0,0.1)", 
      "rgba(0,0,0,0.1)", 
      "rgba(255,255,255,0.15)"
    ]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0)';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    };
  }, [mobileMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-2 left-0 right-0 z-[60] transition-all duration-500`}
    >
      <div className="max-w-6xl mx-auto px-2">
        <motion.div 
          style={{ backgroundColor: navBgColor, borderColor, color: navTextColor }}
          className="flex items-center justify-between backdrop-blur-3xl rounded-full px-4 py-2 border shadow-2xl hover:shadow-3xl transition-all"
        >
          {/* Logo Section */}
          <motion.div 
            className="flex items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-transparent flex items-center justify-center shadow-2xl ring-1 ring-white/20 group-hover:scale-110 transition-transform"
              whileHover={{ rotate: 5 }}
            >
              <img src="/gcore----mark.png" alt="EuropShip mark" className="w-full h-full object-contain block" />
            </motion.div>
            <motion.span 
              className="site-logo-text uppercase font-black tracking-wider"
              whileHover={{ letterSpacing: "0.15em" }}
            >
              EuropShip
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3 font-bold tracking-tight">
            <NavItem label="Products" href="#features" hasChevron />
            <NavItem label="Resources" href="#playground" hasChevron />
            <NavItem label="Partners" href="#network" hasChevron />
            <NavItem label="Why EuropShip" href="#hero" hasChevron />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 12px 36px rgba(255, 77, 0, 0.35)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-full site-cta-text transition-all shadow-lg shadow-orange-600/40 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Sign up for free</span>
            </motion.button>
            <motion.button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              className="lg:hidden z-[61] relative"
              style={{ pointerEvents: 'auto' }}
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: mobileMenuOpen ? 0 : '100%', opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed top-0 right-0 w-full h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 backdrop-blur-2xl z-[999] lg:hidden overflow-y-auto pointer-events-auto"
        style={{
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        {/* Close button area - matching navbar height */}
        <div className="h-16 flex items-center justify-end px-4 border-b border-white/5">
          <motion.button
            onClick={() => setMobileMenuOpen(false)}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Menu Content */}
        <div className="py-8 px-6 flex flex-col gap-8">
          {/* Navigation Links */}
          <div className="flex flex-col gap-6">
            <MobileNavItem
              label="Products"
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileNavItem
              label="Resources"
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileNavItem
              label="Partners"
              href="#network"
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileNavItem
              label="Why EuropShip"
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 20px 48px rgba(255, 77, 0, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/40 group overflow-hidden relative"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Sign up for free</span>
          </motion.button>

          {/* Decorative Footer */}
          <div className="pt-8 border-t border-white/5 text-center text-sm text-white/40">
            <p>Experience European logistics</p>
            <p className="text-xs mt-2">Powered by advanced AI</p>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

const NavItem = ({ label, href, hasChevron }: { label: string; href?: string; hasChevron?: boolean }) => (
  <motion.a 
    href={href ?? '#'} 
    className="flex items-center gap-1 site-nav-link hover:opacity-100 transition-opacity"
    whileHover={{ scale: 1.05 }}
  >
    {label} {hasChevron && <ChevronDown size={14} strokeWidth={3} />}
  </motion.a>
);

const MobileNavItem = ({ label, href, onClick }: { label: string; href: string; onClick: () => void }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className="text-xl font-bold text-white hover:text-orange-400 transition-colors py-3 block"
    whileHover={{ x: 8, color: '#fb923c' }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.a>
);

export default Navbar;