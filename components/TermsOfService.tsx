import { motion } from "framer-motion";
import Navbar from "./Navbar";
import BackButton from "./BackButton";

const TermsOfService = () => {
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
            TERMS OF SERVICE
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
              Welcome to Europship. These Terms of Service (the "Terms") constitute a legal agreement between you and Europship, governing the use of our logistics platform, warehousing services, and distribution solutions across Europe and Eastern Europe.
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
                1. ABOUT US
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">1.1.</span> Europship provides seamless logistics solutions, including warehousing and fulfillment services, to help e-commerce businesses scale.
                </p>
                <p>
                  <span className="font-semibold text-foreground">1.2.</span> To contact us, please use <a href="mailto:contact@europship.com?subject=Terms of Service" className="text-primary hover:underline">contact@europship.com</a> with "Terms of Service" in the subject line.
                </p>
                <p>
                  <span className="font-semibold text-foreground">1.3.</span> These Terms are the current and valid version.
                </p>
                <p>
                  <span className="font-semibold text-foreground">1.4.</span> The following also apply to these Terms:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Our Privacy Policy;</li>
                  <li>Our Cookie Policy;</li>
                  <li>Our Shipping & Handling Guidelines.</li>
                </ul>
                <p>
                  <span className="font-semibold text-foreground">1.5.</span> The Europship logo, marks, and images are the copyright of Europship. All Rights Reserved.
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
                2. SERVICES AND PLATFORM USE
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">2.1.</span> Europship operates 3 strategically located warehouses to facilitate e-commerce growth in Europe and Eastern Europe.
                </p>
                <p>
                  <span className="font-semibold text-foreground">2.2.</span> These Terms govern your access to our logistics dashboard and the use of our physical warehousing services.
                </p>
                <p>
                  <span className="font-semibold text-foreground">2.3.</span> We reserve the right to modify, suspend, or discontinue any portion of our services or platform at any time to improve operational efficiency.
                </p>
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
                3. USER REPRESENTATIONS
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">3.1.</span> By using Europship, you represent and warrant that:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>You are a legal business entity or an individual entrepreneur aged 18 or over;</li>
                  <li>All business and inventory information provided is accurate and complete;</li>
                  <li>Your products comply with all European safety, import/export, and trade regulations;</li>
                  <li>You will not use our warehouses to store prohibited, hazardous, or illegal goods.</li>
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
                4. ACCOUNT AND SECURITY
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">4.1.</span> Access to logistics tracking and inventory management is provided via a dedicated account.
                </p>
                <p>
                  <span className="font-semibold text-foreground">4.2.</span> You are responsible for maintaining the confidentiality of your account credentials.
                </p>
                <p>
                  <span className="font-semibold text-foreground">4.3.</span> You must notify Europship immediately of any unauthorized access to your business account.
                </p>
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
                5. LOGISTICS AND WAREHOUSING RULES
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">5.1. Inventory Management:</span> Europship provides the infrastructure for storage and shipping.
                </p>
                <p>
                  <span className="font-semibold text-foreground">5.2. Prohibited Items:</span> We reserve the right to refuse or remove any inventory that violates safety standards or local laws without prior notice.
                </p>
                <p>
                  <span className="font-semibold text-foreground">5.3. Shipping Obligations:</span> Europship acts as a fulfillment partner.
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
                6. PRICES, FEES, AND PAYMENTS
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">6.1.</span> Service Fees are based on the selected logistics plan.
                </p>
                <p>
                  <span className="font-semibold text-foreground">6.2.</span> Monthly fees depend on storage volume and shipment count.
                </p>
                <p>
                  <span className="font-semibold text-foreground">6.3.</span> Payments are due according to the agreed billing cycle.
                </p>
                <p>
                  <span className="font-semibold text-foreground">6.4.</span> In case of non-payment, Europship may suspend services.
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
                7. LIMITATION OF LIABILITY
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">7.1.</span> Europship is not liable for indirect business losses or carrier delays.
                </p>
                <p>
                  <span className="font-semibold text-foreground">7.2.</span> Users are encouraged to insure their inventory.
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
                8. KYC AND COMPLIANCE
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">8.1.</span> Europship complies with AML and KYC regulations.
                </p>
                <p>
                  <span className="font-semibold text-foreground">8.2.</span> Valid VAT/EORI numbers may be required.
                </p>
              </div>
            </motion.section>
            {/* Section 9 */}
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
                9. TERMINATION
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">9.1.</span> Services may be cancelled with prior written notice.
                </p>
                <p>
                  <span className="font-semibold text-foreground">9.2.</span> Outstanding fees must be settled before inventory release.
                </p>
              </div>
            </motion.section>
            {/* Section 10 */}
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
                10. DATA PROTECTION (GDPR)
              </motion.h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">10.1.</span> Europship processes personal data for order fulfillment only.
                </p>
                <p>
                  <span className="font-semibold text-foreground">10.2.</span> Europship acts as Data Processor, users as Data Controller.
                </p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;
