import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Shield, Map, TrendingUp, User, AlertCircle, Check, Users, Calendar, CreditCard, MessageSquare, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// helper to post to the Node proxy via Vite proxy
// Vite automatically rewrites /api/* to http://localhost:4001
async function submitBookDemo(data: {
  fullName: string;
  phone: string;
  hearAboutUs: string;
  experience: string;
  budgetRange: string;
  meetingTime: string;
  additionalNotes?: string;
}) {
  const payload = { ...data, formType: 'bookDemo' };
  console.log('[submitBookDemo] 📤 Sending to /api/book-demo:', payload);
  
  const res = await fetch('/api/book-demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  
  console.log('[submitBookDemo] 📡 Response status:', res.status);
  console.log('[submitBookDemo] 📡 Response headers:', res.headers);
  
  const responseData = await res.json().catch((err) => {
    console.error('[submitBookDemo] ⚠️  Failed to parse JSON:', err);
    return {};
  });
  
  console.log('[submitBookDemo] 📥 Response body:', responseData);
  
  if (!res.ok || !responseData.ok) {
    const errorMsg = responseData.error || 'Submission failed';
    console.error('[submitBookDemo] ❌ Error thrown:', errorMsg);
    throw new Error(errorMsg);
  }
  
  console.log('[submitBookDemo] ✅ Success!');
  return responseData;
}

const checklist = [
  "Generating €30K+ monthly revenue",
  "Shipping across Europe or planning expansion",
  "Looking to reduce delivery times",
  "Need scalable 3PL infrastructure",
];

const valueProps = [
  {
    icon: <Shield size={32} className="text-primary" />,
    title: "Operational Audit",
    desc: "Comprehensive review of your logistics and fulfillment operations to identify bottlenecks and opportunities.",
  },
  {
    icon: <TrendingUp size={32} className="text-primary" />,
    title: "Cost Optimization Strategy",
    desc: "Actionable plan to reduce shipping costs and improve margins across your European supply chain.",
  },
  {
    icon: <Map size={32} className="text-primary" />,
    title: "Warehouse & Fulfillment Mapping",
    desc: "Tailored roadmap for scaling your brand with our 3 strategically located European warehouses.",
  },
];

const BookDemo: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  // Submission state
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  /**
   * Handle form submission via our Node proxy (/api/book-demo)
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const formElement = e.currentTarget;
      console.log('[BookDemo] 📝 Form submission started');
      
      const formData = new FormData(formElement);
      const fullName = formData.get("fullName") as string || "";
      const phone = formData.get("phone") as string || "";
      const source = formData.get("source") as string || "";
      const experience = formData.get("experience") as string || "";
      const budget = formData.get("budget") as string || "";
      const meetingTime = formData.get("meetingTime") as string || "";
      const notes = formData.get("notes") as string || "";

      console.log('[BookDemo] 📋 Form values extracted:', {
        fullName, phone, source, experience, budget, meetingTime, notes
      });

      try {
        console.log('[BookDemo] 🚀 Calling submitBookDemo...');
        const result = await submitBookDemo({
          fullName,
          phone,
          hearAboutUs: source,
          experience,
          budgetRange: budget,
          meetingTime,
          additionalNotes: notes || undefined,
        });
        console.log('[BookDemo] ✅ Success response:', result);
        setSubmitStatus({
          type: "success",
          message: result.message || "✅ Thank you! Your request has been received. We will contact you soon.",
        });
        formElement.reset();
      } catch (err: any) {
        console.error('[BookDemo] ❌ Submit error caught:', err);
        console.error('[BookDemo] Error message:', err.message);
        console.error('[BookDemo] Error stack:', err.stack);
        setSubmitStatus({
          type: "error",
          message: `❌ ${err.message || "Erreur inconnue"}`,
        });
      }
    } catch (error: any) {
      console.error('[BookDemo] 💥 Outer error caught:', error);
      console.error('[BookDemo] Outer error message:', error.message);
      console.error('[BookDemo] Outer error stack:', error.stack);
      setSubmitStatus({
        type: "error",
        message: "❌ Une erreur s'est produite. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // CustomSelect Component
  const CustomSelect: React.FC<{
    name: string;
    placeholder: string;
    options: Array<{ value: string; label: string }>;
    required?: boolean;
  }> = ({ name, placeholder, options, required }) => {
    const [selected, setSelected] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleSelect = (value: string) => {
      setSelected(value);
      setIsOpen(false);
      const hiddenInput = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
      if (hiddenInput) hiddenInput.value = value;
    };

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div ref={selectRef} className="relative w-full">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-primary/80 focus:bg-black/50 focus:ring-2 focus:ring-primary/40 transition-all duration-300 backdrop-blur-sm text-left flex justify-between items-center"
        >
          <span>{selected ? options.find(o => o.value === selected)?.label : placeholder}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-primary"
          >
            ▼
          </motion.span>
        </motion.button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-white/20 rounded-xl overflow-hidden z-50 backdrop-blur-sm shadow-xl"
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#ff6a00";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = selected === option.value ? "#ff6a00" : "transparent";
                }}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left text-white transition-all duration-200 border-b border-white/10 last:border-b-0 ${
                  selected === option.value ? "bg-primary text-white font-semibold" : "hover:bg-primary/60"
                }`}
                style={{
                  backgroundColor: selected === option.value ? "#ff6a00" : "transparent"
                }}
              >
                <span className="flex items-center gap-2">
                  {selected === option.value && <span className="text-white">✓</span>}
                  {option.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={selected} required={required} />
      </div>
    );
  };

  // FormField Component - defini avant le return
  const FormField: React.FC<{
    icon: React.ReactNode;
    label: string;
    required?: boolean;
    children: React.ReactNode;
  }> = ({ icon, label, required, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-3 group"
    >
      <label className="flex items-center gap-2 text-sm font-bold text-white/90 mb-2 group-hover:text-white transition-colors duration-200">
        <motion.span 
          className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 text-primary group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {icon}
        </motion.span>
        <span>{label}</span>
        {required && <motion.span className="text-red-400 font-bold animate-pulse">*</motion.span>}
      </label>
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 px-6 pt-32 pb-20 max-w-7xl mx-auto">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col items-start justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 w-fit hover:bg-primary/20 transition-colors"
          >
            <Users size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Private Strategy Session</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight text-white"
          >
            Scale Across Europe with a <span className="relative">
              <span className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-orange-500/30 blur-2xl" />
              <span className="relative bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Private Strategy</span>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed font-medium"
          >
            We help ambitious e-commerce brands optimize fulfillment, reduce shipping times, and scale across Europe using our 3 strategically positioned warehouses.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, translateY: -4, boxShadow: "0 20px 60px rgba(255, 77, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="px-8 py-4 bg-gradient-to-r from-primary via-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-primary/40 transition-all text-lg relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
            <span className="relative flex items-center gap-2">
              Book Your Session 
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Right - Glass Card */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex items-center justify-center w-full"
        >
          <motion.div
            whileHover={{ translateY: -10, boxShadow: "0 40px 100px rgba(255, 100, 0, 0.3)" }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm bg-gradient-to-br from-white/15 via-white/10 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden relative"
          >
            {/* Card glow */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/30 blur-[60px]" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">What's Included</span>
              </div>

              {[
                { icon: "🎯", label: "30-min Strategy Meeting" },
                { icon: "📊", label: "Personalized Fulfillment Audit" },
                { icon: "💰", label: "Custom Pricing Overview" },
                { icon: "🗺️", label: "European Expansion Roadmap" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/40 transition-all"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToForm}
                className="w-full mt-6 px-6 py-3 bg-white text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Schedule Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="w-full py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/40 bg-primary/10"
          >
            <CheckCircle size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Who This Is For</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-heading mb-4 text-white text-center"
          >
            Is This Strategy Meeting Right for <span className="text-primary">You?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base max-w-2xl mx-auto"
          >
            We work with serious e-commerce brands ready to scale.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {checklist.map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ translateY: -8, boxShadow: "0 30px 60px rgba(255, 100, 0, 0.2)" }}
              className="relative group flex items-start gap-4 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 rounded-2xl p-6 shadow-lg hover:border-primary/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/30 blur-[60px]" />
              </div>
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <CheckCircle className="text-primary" size={24} />
              </div>
              <div className="relative z-10 flex-1">
                <p className="text-base font-semibold text-white leading-relaxed">{item}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05, translateY: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="px-8 py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all text-lg"
          >
            Continue to Booking →
          </motion.button>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="w-full py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-heading mb-4 text-white"
          >
            What You'll Get
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-base max-w-2xl mx-auto"
          >
            A comprehensive strategy session tailored to your business.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ translateY: -12, boxShadow: "0 40px 80px rgba(255, 100, 0, 0.15)" }}
              className="group relative flex flex-col items-center bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 rounded-3xl p-8 shadow-xl hover:border-primary/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/25 blur-[80px]" />
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 + 0.2, duration: 0.5 }}
                className="relative z-10 w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors"
              >
                {v.icon}
              </motion.div>
              <h3 className="relative z-10 text-2xl font-bold mb-4 text-white text-center group-hover:text-primary transition-colors">{v.title}</h3>
              <p className="relative z-10 text-gray-300 text-center text-base font-medium leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section ref={formRef} className="w-full py-20 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-white/10 via-white/[0.05] to-transparent border border-white/20 rounded-3xl shadow-2xl p-12 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/20 blur-[120px] opacity-30" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-orange-600/15 blur-[100px] opacity-20" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr] gap-12">
            {/* Left - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 w-fit mb-4 px-3 py-1 rounded-full border border-primary/40 bg-primary/10"
              >
                <Clock size={14} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">30-Min Strategy Session</span>
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-black mb-4 text-white leading-tight"
              >
                Limited monthly strategy slots to ensure operational <span className="text-primary">excellence</span>.
              </motion.h3>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-300 text-base font-medium leading-relaxed mb-8"
              >
                Our team will review your submission and reach out to schedule your private meeting within 24 hours.
              </motion.p>

              {/* Benefits list */}
              <motion.div className="space-y-3">
                {[
                  "✓ Personalized fulfillment audit",
                  "✓ Custom pricing & ROI projection",
                  "✓ European warehouse mapping",
                  "✓ Exclusive partnership options"
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <span className="text-primary font-bold">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Full Name */}
                <FormField icon={<User size={16} />} label="Full Name" required>
                  <motion.input 
                    name="fullName"
                    type="text" 
                    placeholder=""
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-primary/80 focus:bg-black/50 focus:ring-2 focus:ring-primary/40 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </FormField>

                {/* Phone */}
                <FormField icon={<Phone size={16} />} label="Phone Number" required>
                  <motion.input 
                    name="phone"
                    type="tel" 
                    placeholder="+212 X XX XX XX XX"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-primary/80 focus:bg-black/50 focus:ring-2 focus:ring-primary/40 transition-all duration-300 backdrop-blur-sm"
                    required 
                  />
                </FormField>

                {/* Source (hear about us) - required by backend */}
                <FormField icon={<MessageSquare size={16} />} label="How did you hear about us?" required>
                  <motion.input 
                    name="source"
                    type="text" 
                    placeholder="YouTube, Instagram, ..."
                    required
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-primary/80 focus:bg-black/50 focus:ring-2 focus:ring-primary/40 transition-all duration-300 backdrop-blur-sm"
                  />
                </FormField>

                {/* Experience (required) */}
                <FormField icon={<TrendingUp size={16} />} label="E-commerce Experience" required>
                  <motion.input 
                    name="experience"
                    type="text" 
                    placeholder="E.g., 3+ years, monthly volume..."
                    required
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-primary/80 focus:bg-black/50 focus:ring-2 focus:ring-primary/40 transition-all duration-300 backdrop-blur-sm"
                  />
                </FormField>
                <FormField icon={<CreditCard size={16} />} label="Budget Range" required>
                  <CustomSelect 
                    name="budget"
                    placeholder="Select a budget range"
                    options={[
                      { value: "", label: "Select a budget range" },
                      { value: "<10K", label: "Less than €10K" },
                      { value: "10K-50K", label: "€10K - €50K" },
                      { value: "50K-200K", label: "€50K - €200K" },
                      { value: ">200K", label: "More than €200K" }
                    ]}
                    required
                  />
                </FormField>

                {/* Meeting Time (required) */}
                <FormField icon={<Calendar size={16} />} label="Preferred Meeting Time" required>
                  <motion.input 
                    name="meetingTime"
                    type="time" 
                    required
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/80 focus:bg-black/50 focus:ring-2 focus:ring-primary/40 transition-all duration-300 backdrop-blur-sm" 
                  />
                </FormField>

                {/* Notes */}
                <FormField icon={<MessageSquare size={16} />} label="Additional Notes">
                  <motion.textarea 
                    name="notes"
                    placeholder="Tell us about your logistics goals..."
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-primary/80 focus:bg-black/50 focus:ring-2 focus:ring-primary/40 transition-all duration-300 resize-none backdrop-blur-sm" 
                    rows={3} 
                  />
                </FormField>

                {/* Status Messages */}
                {submitStatus.type === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300"
                  >
                    <Check size={20} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{submitStatus.message}</span>
                  </motion.div>
                )}

                {submitStatus.type === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300"
                  >
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{submitStatus.message}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button 
                  type="submit" 
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  whileHover={{ scale: 1.02, translateY: -4, boxShadow: "0 20px 60px rgba(255, 77, 0, 0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-6 px-8 py-4 bg-gradient-to-r from-primary via-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-xl shadow-primary/40 hover:shadow-primary/60 transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Strategy Meeting</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </div>
                </motion.button>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-gray-400 text-center mt-3 font-medium"
                >
                  ✓ Your information is secure and confidential. We'll respond within 24 hours.
                </motion.p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="w-full py-20 px-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-2 text-white"
          >
            Work Directly with Logistics Experts
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-300 text-base font-medium"
          >
            Our team of logistics professionals brings years of experience in European fulfillment, helping brands scale with confidence and precision.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center overflow-hidden">
            <img src="/founder.jpeg" alt="Founder" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default BookDemo;