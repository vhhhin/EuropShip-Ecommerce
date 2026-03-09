import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, User, Mail, Phone, MessageSquare, TrendingUp, Globe } from 'lucide-react';
import CustomSelect, { Option } from './CustomSelect';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  averageSalesVolume: string;
  marketExperience: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ContactFormProps {
  hideFooter?: boolean;
}

// Contact Form Submission Function
// Proxies through Node.js server to avoid CORS issues
async function submitContactForm(payload: FormData) {
  // Note: the legacy Node.js proxy (`api-server.js`) still expects a `formType` field.
  // We can satisfy that requirement here by adding it. Alternatively, you can bypass
  // the proxy entirely and post directly to the Next.js route at `/api/contact`.
  const ENDPOINT = "http://localhost:4001/api/contact"; // Node.js API server

  const body = { ...payload, formType: 'contact' };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");
  return data;
}

const ContactForm: React.FC<ContactFormProps> = ({ hideFooter = false }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    averageSalesVolume: '',
    marketExperience: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [clickEffect, setClickEffect] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.averageSalesVolume) {
      newErrors.averageSalesVolume = 'Please select a sales volume';
    }

    if (!formData.marketExperience) {
      newErrors.marketExperience = 'Please select your market experience';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // helper for custom select updates
  const handleSelectChange = useCallback((field: keyof FormData) => (val: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: val
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    // Activer l'effet orange lumineux
    setClickEffect(true);
    
    if (!validateForm()) {
      // Désactiver l'effet après 300ms même en cas d'erreur
      setTimeout(() => setClickEffect(false), 300);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit form data to Google Sheet via Apps Script
      await submitContactForm(formData);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        averageSalesVolume: '',
        marketExperience: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error('[ContactForm] Submission failed:', errorMsg);
      setSubmitError(`Error: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
      // Désactiver l'effet après 500ms
      setTimeout(() => setClickEffect(false), 500);
    }
  }, [formData]);

  const salesVolumes: Option[] = useMemo(() => [
    { value: '$0 - $1,000', label: '$0 - $1,000' },
    { value: '$1,000 - $5,000', label: '$1,000 - $5,000' },
    { value: '$5,000 - $10,000', label: '$5,000 - $10,000' },
    { value: '$10,000 - $50,000', label: '$10,000 - $50,000' },
    { value: '$50,000+', label: '$50,000+' }
  ], []);

  const markets: Option[] = useMemo(() => [
    { value: 'Europe', label: 'Europe' },
    { value: 'North America', label: 'North America' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Middle East', label: 'Middle East' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Other', label: 'Other' }
  ], []);

  const FormField = useCallback(({ icon, label, error, children, required }: {
    icon: React.ReactNode;
    label: string;
    error?: string;
    children: React.ReactNode;
    required?: boolean;
  }) => (
    <div className="space-y-1">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
        <span className="flex items-center justify-center w-4 h-4 rounded-md bg-orange-100 text-orange-600">
          {icon}
        </span>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle size={12} />
          {error}
        </div>
      )}
    </div>
  ), []);

  return (
    <div 
      ref={formRef}
      className="contact-form-container w-full py-8 md:py-12 flex items-center justify-center relative overflow-hidden transition-all duration-500"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Effet orange lumineux en arrière-plan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: clickEffect ? 0.3 : 0,
          scale: clickEffect ? 1.5 : 1
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0.2) 50%, transparent 100%)',
          filter: 'blur(40px)',
          zIndex: 0
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full px-4 sm:px-6 space-y-4 relative z-10"
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-1"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs md:text-sm text-gray-600"
          >
            Fill out the form below and we'll get back to you shortly.
          </motion.p>
        </motion.div>

        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-3 border border-green-200 flex items-center gap-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white flex-shrink-0">
              <Check size={20} />
            </div>
            <div className="space-y-0">
              <h3 className="font-semibold text-green-900 text-sm">Success!</h3>
              <p className="text-xs text-green-800">Your message has been sent successfully. We'll be in touch soon.</p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg bg-gradient-to-r from-red-50 to-pink-50 p-3 border border-red-200 flex items-center gap-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white flex-shrink-0">
              <AlertCircle size={20} />
            </div>
            <div className="space-y-0">
              <h3 className="font-semibold text-red-900 text-sm">Error</h3>
              <p className="text-xs text-red-800">{submitError}</p>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <FormField
            icon={<User size={16} />}
            label="Full Name"
            error={errors.fullName}
            required
          >
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:border-orange-500 bg-white text-gray-900 text-sm ${
                errors.fullName
                  ? 'border-red-300'
                  : ''
              }`}
            />
          </FormField>

          {/* Email */}
          <FormField
            icon={<Mail size={16} />}
            label="Email"
            error={errors.email}
            required
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className={`w-full px-3 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:border-orange-500 placeholder:text-gray-400 bg-white text-gray-900 text-sm ${
                errors.email
                  ? 'border-red-300'
                  : 'border-gray-200'
              }`}
            />
          </FormField>

          {/* Phone */}
          <FormField
            icon={<Phone size={16} />}
            label="Phone"
            error={errors.phone}
            required
          >
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+212 6X XX XX XX"
              className={`w-full px-3 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:border-orange-500 placeholder:text-gray-400 bg-white text-gray-900 text-sm ${
                errors.phone
                  ? 'border-red-300'
                  : 'border-gray-200'
              }`}
            />
          </FormField>

          {/* Average Sales Volume */}
          <FormField
            icon={<TrendingUp size={16} />}
            label="Average Sales Volume"
            error={errors.averageSalesVolume}
            required
          >
            <CustomSelect
              options={salesVolumes}
              value={formData.averageSalesVolume}
              onChange={handleSelectChange('averageSalesVolume')}
              placeholder="Select sales volume"
            />
          </FormField>

          {/* Market Experience */}
          <FormField
            icon={<Globe size={16} />}
            label="Market Experience"
            error={errors.marketExperience}
            required
          >
            <CustomSelect
              options={markets}
              value={formData.marketExperience}
              onChange={handleSelectChange('marketExperience')}
              placeholder="Select market"
            />
          </FormField>

          {/* Message */}
          <FormField
            icon={<MessageSquare size={16} />}
            label="Message"
            error={errors.message}
            required
          >
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project needs..."
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:border-orange-500 placeholder:text-gray-400 bg-white text-gray-900 resize-none text-sm ${
                errors.message
                  ? 'border-red-300'
                  : 'border-gray-200'
              }`}
            />
          </FormField>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm relative overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </motion.button>

          {/* Privacy Notice */}
          <div className="text-center text-xs text-gray-500 space-y-0.5 py-1">
            <p>By submitting this form, you agree to our</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-semibold">Privacy Policy</Link>
              <span>and</span>
              <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-semibold">Terms of Service</Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;