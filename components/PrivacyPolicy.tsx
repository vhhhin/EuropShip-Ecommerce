import { motion } from "framer-motion";
import Navbar from "./Navbar";
import BackButton from "./BackButton";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center mt-16 mb-8"
        >
          <BackButton className="mb-4 self-start" />
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display section-heading font-bold text-center"
          >
            PRIVACY POLICY
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="bg-surface-elevated rounded-lg p-4 border border-border space-y-4">
            {/* Introduction */}
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Europship. We transform your e-commerce business through seamless logistics solutions for unparalleled growth across Europe and Eastern Europe. With our 3 strategically located warehouses, protecting your data and that of your customers is our top priority.
            </p>
            {/* Section 1 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-lg font-bold text-primary mb-2"
              >
                1. WHO WE ARE
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  The "data controller" of your information is Europship. For any questions regarding data protection, you can contact us at <a href="mailto:contact@europship.com?subject=Data Protection" className="text-primary hover:underline">contact@europship.com</a> with the subject line "Data Protection."
                </p>
              </div>
            </motion.section>
            {/* Section 2 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-primary mb-4"
              >
                2. WHAT WE COLLECT
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  We collect personal data to provide our logistics services and enhance your experience:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    <span className="font-semibold text-foreground">Customer Account Data:</span> Name, email address, phone number, company name, and billing address.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Logistics Data:</span> Recipient delivery addresses, parcel details, tracking information, and customs documents required for shipping within Europe and Eastern Europe.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Browsing Data:</span> IP address, browser type, and data collected via cookies (Google Analytics).
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Communications:</span> Any information submitted via our contact forms or by email.
                  </li>
                </ul>
              </div>
            </motion.section>
            {/* Section 3 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-primary mb-4"
              >
                3. WHY WE COLLECT YOUR DATA
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Contract execution</li>
                  <li>Legal obligation</li>
                  <li>Legitimate interest</li>
                  <li>Consent</li>
                </ul>
              </div>
            </motion.section>
            {/* Section 4 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-primary mb-4"
              >
                4. DATA SHARING AND TRANSFER
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Transport service providers</li>
                  <li>Payment services (e.g., Stripe)</li>
                  <li>Secure hosting</li>
                  <li>Protected international transfers (EEA)</li>
                </ul>
              </div>
            </motion.section>
            {/* Section 5 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-primary mb-4"
              >
                5. SECURITY AND RETENTION
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Security:</span> SSL/TLS encryption
                </p>
                <p>
                  <span className="font-semibold text-foreground">Retention:</span> Legal duration (up to 10 years)
                </p>
              </div>
            </motion.section>
            {/* Section 6 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-primary mb-4"
              >
                6. YOUR RIGHTS (GDPR & DPDPA)
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Right of access and rectification</li>
                  <li>Right to erasure</li>
                  <li>Right to data portability</li>
                  <li>Right to withdraw consent</li>
                </ul>
                <p className="mt-4">
                  <span className="font-semibold text-foreground">Contact:</span> <a href="mailto:contact@europship.com" className="text-primary hover:underline">contact@europship.com</a>
                </p>
              </div>
            </motion.section>
            {/* Section 7 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-primary mb-4"
              >
                7. COOKIES AND ANALYTICS
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Use of cookies and Google Analytics. You can opt-out via your browser.
                </p>
              </div>
            </motion.section>
            {/* Section 8 */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-primary mb-4"
              >
                8. CHANGES
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Policy updated in January 2026.
                </p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
