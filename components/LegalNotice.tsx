import { motion } from "framer-motion";
import Navbar from "./Navbar";
import BackButton from "./BackButton";

const LegalNotice = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
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
            LEGAL NOTICE
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
            <p className="text-gray-700 leading-relaxed font-medium">
              <strong>Last updated: January 2026</strong>
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              Welcome to Europship. This Legal Notice governs your access to and use of the Europship platform, warehousing infrastructure, and logistics services across Europe and Eastern Europe. By accessing our website, dashboard, or using any of our services, you acknowledge that you have read, understood, and agreed to the legal framework described below.
            </p>
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
                1. COMPANY INFORMATION
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>Europship is a European logistics and fulfillment company operating three strategically located warehouses to support the growth of e-commerce businesses.</p>
                <p>Europship acts as:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Service Provider for warehousing and logistics services</li>
                  <li>Data Controller for website and account-related data</li>
                  <li>Data Processor when handling customer data on behalf of its clients</li>
                </ul>
                <p>For any legal or data protection inquiries, please contact:<br />contact@europship.com<br />(Subject: Legal Inquiry)</p>
              </div>
            </motion.section>
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
                2. INTELLECTUAL PROPERTY
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>All content available on this website, including but not limited to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Logos</li>
                  <li>Branding elements</li>
                  <li>Text, graphics, layouts</li>
                  <li>Platform architecture</li>
                  <li>Visual assets and warehouse imagery</li>
                </ul>
                <p>are the exclusive property of Europship unless otherwise stated.</p>
                <p>Any reproduction, distribution, modification, or unauthorized commercial use without prior written consent is strictly prohibited and may result in legal action.</p>
              </div>
            </motion.section>
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
                3. DATA PROTECTION & PRIVACY COMPLIANCE
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>Europship is committed to full compliance with:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>The General Data Protection Regulation (GDPR)</li>
                  <li>Applicable European data protection laws</li>
                  <li>International data transfer safeguards within the EEA</li>
                </ul>
                <p>We process personal data strictly for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Contract execution</li>
                  <li>Legal compliance</li>
                  <li>Legitimate business interests</li>
                  <li>Consent-based communications</li>
                </ul>
                <p>Security measures include:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>SSL/TLS encryption</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Controlled access to logistics data</li>
                  <li>Internal compliance and monitoring procedures</li>
                </ul>
                <p>Data retention periods are determined by contractual necessity and legal obligations (up to 10 years where applicable).</p>
                <p>Users have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access their data</li>
                  <li>Rectify inaccurate information</li>
                  <li>Request erasure</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p>Requests may be sent to: contact@europship.com</p>
              </div>
            </motion.section>
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
                4. SERVICE DISCLAIMERS
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>Europship provides logistics, warehousing, and fulfillment infrastructure. While we maintain high operational standards, we cannot guarantee:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Carrier delivery timelines</li>
                  <li>Customs clearance delays</li>
                  <li>Force majeure events</li>
                  <li>Indirect or consequential business losses</li>
                </ul>
                <p>Users remain responsible for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Compliance of their products with EU regulations</li>
                  <li>Accurate customs documentation</li>
                  <li>Appropriate insurance coverage</li>
                </ul>
              </div>
            </motion.section>
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
                5. REGULATORY COMPLIANCE (KYC & AML)
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>Europship complies with European Anti-Money Laundering (AML) and Know Your Customer (KYC) obligations.</p>
                <p>We may require:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Valid VAT numbers</li>
                  <li>EORI numbers</li>
                  <li>Corporate registration documents</li>
                  <li>Identity verification</li>
                </ul>
                <p>Failure to provide required documentation may result in suspension or termination of services.</p>
              </div>
            </motion.section>
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
                6. LIMITATION OF LIABILITY
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>To the fullest extent permitted by law:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Europship’s liability is limited to the value of the contracted service.</li>
                  <li>We are not liable for indirect, incidental, or consequential damages.</li>
                  <li>Warehouse services are provided under agreed operational terms and storage conditions.</li>
                </ul>
                <p>Nothing in this Legal Notice excludes liability where prohibited by applicable law.</p>
              </div>
            </motion.section>
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
                7. PLATFORM AVAILABILITY
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>Europship reserves the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Modify platform features</li>
                  <li>Improve infrastructure</li>
                  <li>Suspend services for maintenance</li>
                  <li>Update legal documentation</li>
                </ul>
                <p>without prior notice when necessary for operational or security reasons.</p>
              </div>
            </motion.section>
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
                8. GOVERNING LAW
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>These Legal provisions are governed by applicable European law.<br />Any dispute shall be subject to the competent jurisdiction as determined by applicable regulations.</p>
              </div>
            </motion.section>
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
                9. POLICY UPDATES
              </motion.h2>
              <div className="space-y-3 text-gray-700">
                <p>Europship may update this Legal Notice periodically to reflect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Regulatory changes</li>
                  <li>Operational updates</li>
                  <li>Security enhancements</li>
                </ul>
                <p>The latest version will always be available on this page.</p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LegalNotice;