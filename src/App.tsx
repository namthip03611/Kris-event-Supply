import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, ChevronRight, MessageSquare, Info, Sparkles, Send } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Language, ViewType, QuoteRequest } from './types';
import { translations } from './translations';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import ServicesView from './views/ServicesView';
import PortfolioView from './views/PortfolioView';

export default function App() {
  const [currentLanguage, setLanguage] = useState<Language>('th');
  const [activeView, setActiveView] = useState<ViewType>('home');

  // Interactive estimates from calculator
  const [appliedStaffEstimate, setAppliedStaffEstimate] = useState<string>('');
  const [appliedStaffValue, setAppliedStaffValue] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // Submitted lead for Success Modal
  const [submittedLead, setSubmittedLead] = useState<QuoteRequest | null>(null);

  const t = translations[currentLanguage];

  // Handler to capture team estimator results and route to form
  const handleApplyEstimate = (estimateText: string, calculatedValue: string) => {
    setAppliedStaffEstimate(estimateText);
    setAppliedStaffValue(calculatedValue);
    setShowAlert(true);
    
    // Switch to Home page and scroll to contact
    setActiveView('home');

    // Smooth scroll down to contact section after a short delay
    setTimeout(() => {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);

    // Auto-dismiss alert banner after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  // Handler for contact form submissions
  const handleSubmitContact = (formData: {
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
  }) => {
    const lead: QuoteRequest = {
      id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      staffEstimate: appliedStaffEstimate || undefined,
      submittedAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    setSubmittedLead(lead);
    
    // Clear the estimate once applied and submitted
    setAppliedStaffEstimate('');
    setAppliedStaffValue('');
  };

  // Close the Success Modal
  const handleCloseModal = () => {
    setSubmittedLead(null);
  };

  return (
    <div className="min-h-screen bg-off-white text-charcoal flex flex-col font-sans selection:bg-accent selection:text-navy" id="main-layout-wrapper">
      
      {/* 1. Header Component */}
      <Header
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        activeView={activeView}
        setActiveView={setActiveView}
        onContactClick={() => setActiveView('home')}
      />

      {/* 2. Floating Notification Alert Banner */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-2xl flex items-start gap-3.5"
            id="floating-sourcing-alert"
          >
            <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 animate-bounce" />
            </div>
            <div className="flex-1 space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                {currentLanguage === 'th' ? 'นำเข้าทีมงานภาคสนามสำเร็จ!' : 'Staff Estimate Applied!'}
              </span>
              <p className="text-[11px] leading-relaxed text-emerald-800 line-clamp-3">
                {appliedStaffEstimate}
              </p>
              <span className="text-[10px] text-emerald-600 font-mono block mt-1.5">
                {currentLanguage === 'th' ? '*ตรวจจับข้อมูลและแนบลงฟอร์มแล้ว' : '*Inserted into form below'}
              </span>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-emerald-500 hover:text-emerald-700 p-1 rounded-lg hover:bg-emerald-100"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Render Active Views with elegant fade animations */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'home' && (
              <HomeView
                currentLanguage={currentLanguage}
                setActiveView={setActiveView}
                onSubmitContact={handleSubmitContact}
                appliedStaffEstimate={appliedStaffEstimate}
                appliedStaffValue={appliedStaffValue}
              />
            )}

            {activeView === 'about' && (
              <AboutView currentLanguage={currentLanguage} />
            )}

            {activeView === 'services' && (
              <ServicesView
                currentLanguage={currentLanguage}
                setActiveView={setActiveView}
                onApplyEstimate={handleApplyEstimate}
              />
            )}

            {activeView === 'portfolio' && (
              <PortfolioView
                currentLanguage={currentLanguage}
                setActiveView={setActiveView}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Footer Component */}
      <Footer
        currentLanguage={currentLanguage}
        setActiveView={setActiveView}
      />

      {/* 5. Highly Polished Lead Submission Success Modal */}
      <AnimatePresence>
        {submittedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="success-modal-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg overflow-hidden bg-white rounded-xl border border-neutral-200 shadow-2xl p-6 sm:p-8 text-neutral-900"
            >
              {/* Success Backdrop Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header icon */}
              <div className="flex flex-col items-center text-center space-y-4 mb-6">
                <div className="p-3 bg-accent/5 text-accent rounded-full border border-accent/10">
                  <CheckCircle2 className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
                    {t.formSuccessTitle}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
                    TRANSACTION ID: {submittedLead.id} &bull; {submittedLead.submittedAt}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-sm">
                  {t.formSuccessDesc}
                </p>
              </div>

              {/* Lead Request Details Sheet */}
              <div className="p-5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-3.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono block border-b border-neutral-200/60 pb-2">
                  {currentLanguage === 'th' ? 'สรุปข้อมูลโครงการ' : 'Project Sourcing Sheet'}
                </span>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="text-neutral-500">{currentLanguage === 'th' ? 'ชื่อลูกค้า:' : 'Client Name:'}</span>
                  <span className="col-span-2 font-semibold text-neutral-800 truncate">{submittedLead.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="text-neutral-500">{currentLanguage === 'th' ? 'เบอร์ติดต่อ:' : 'Phone No:'}</span>
                  <span className="col-span-2 font-mono text-neutral-800">{submittedLead.phone}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="text-neutral-500">{currentLanguage === 'th' ? 'อีเมล:' : 'Email:'}</span>
                  <span className="col-span-2 text-neutral-800 truncate">{submittedLead.email}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="text-neutral-500">{currentLanguage === 'th' ? 'บริการหลัก:' : 'Service Category:'}</span>
                  <span className="col-span-2 font-black text-accent uppercase tracking-wider">
                    {submittedLead.service}
                  </span>
                </div>

                {submittedLead.staffEstimate && (
                  <div className="pt-2 border-t border-neutral-200/60 space-y-1">
                    <span className="text-[10px] font-mono text-accent flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span>{currentLanguage === 'th' ? 'ประเมินสตาฟที่จัดสรร:' : 'Sourced Staffing Team:'}</span>
                    </span>
                    <p className="text-[11px] leading-relaxed text-neutral-700 pl-4 font-sans italic border-l border-accent/40">
                      {submittedLead.staffEstimate}
                    </p>
                  </div>
                )}

                {submittedLead.message && !submittedLead.staffEstimate && (
                  <div className="pt-2 border-t border-neutral-200/60 space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">
                      {currentLanguage === 'th' ? 'ข้อความเพิ่มเติม:' : 'Message:'}
                    </span>
                    <p className="text-[11px] leading-relaxed text-neutral-600 line-clamp-3">
                      {submittedLead.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full py-3.5 rounded-lg font-black text-xs uppercase tracking-widest text-white bg-accent hover:bg-accent-hover shadow-md cursor-pointer transition-all"
                  id="success-modal-close"
                >
                  {t.formSuccessClose}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
