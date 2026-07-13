import React, { useState } from 'react';
import { Award, Users, Globe, Store, Sparkles, Truck, Phone, Mail, Clock, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, ViewType } from '../types';
import { translations, SERVICES_DATA, PORTFOLIO_DATA } from '../translations';

interface HomeViewProps {
  currentLanguage: Language;
  setActiveView: (view: ViewType) => void;
  onSubmitContact: (formData: { name: string; phone: string; email: string; service: string; message: string }) => void;
  appliedStaffEstimate: string;
  appliedStaffValue: string;
}

export default function HomeView({
  currentLanguage,
  setActiveView,
  onSubmitContact,
  appliedStaffEstimate,
  appliedStaffValue
}: HomeViewProps) {
  const t = translations[currentLanguage];

  // Contact form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize applied staffing estimate to the message box
  useState(() => {
    if (appliedStaffEstimate) {
      setFormData(prev => ({
        ...prev,
        message: appliedStaffEstimate,
        service: 'staffing'
      }));
    }
  });

  // Sync estimate if it changes
  const handleSyncEstimate = () => {
    if (appliedStaffEstimate) {
      setFormData(prev => ({
        ...prev,
        message: appliedStaffEstimate,
        service: 'staffing'
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.service) {
      alert(currentLanguage === 'th' ? 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' : 'Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      onSubmitContact({
        ...formData,
        message: formData.message + (appliedStaffValue ? `\n(Tech Metrics: ${appliedStaffValue})` : '')
      });
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div id="home-view-container">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] text-white" id="hero-section">
        {/* Background Image Hotlink with modern dark overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc0D-Qa-lKasFfA5PWJnd96awS8AA0L7Tsf2a_HWBYuRDUCWKJIrLUVkwk4G-fQcdCPRJSD8r-kU5ChLCuN3Qs20FQGBkb_UTWxSahjLxyKx6Syh5u-K5NOId05Uofj6FXGCTIQTbAuQf38gZQuDYwsCameHl6L2fRoxLCPs_hYPlFUlEyYbM8wArciZxHZN7VbQMdMkosd4cG2xkKc3bd5dWp8UKladC3OJFFSdjSzJUbZlIDObpU"
            alt="KRIS Event Field Team Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 filter brightness-45 contrast-110 saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/30" />
          <div className="absolute inset-0 bg-radial-at-c from-accent/15 via-transparent to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent/15 border border-accent/35 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-accent">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-accent" />
              <span>{currentLanguage === 'th' ? 'พาร์ทเนอร์สตาฟอันดับ 1 ของคุณ' : 'YOUR NO.1 STAFFING PARTNER'}</span>
            </div>

            {/* Headline with Bold Typographic Pairing */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight max-w-5xl mx-auto leading-[0.85] text-white drop-shadow-sm">
              <span className="block">{currentLanguage === 'th' ? 'ทีมงานภาคสนาม' : 'PROFESSIONAL'}</span>
              <span className="block outline-text-thick my-2">{currentLanguage === 'th' ? 'มืออาชีพ' : 'FIELD STAFFING'}</span>
              <span className="block text-accent">{currentLanguage === 'th' ? 'เพื่อแบรนด์ของคุณ' : 'FOR YOUR BRAND'}</span>
            </h1>

            {/* Subheading */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveView('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-10 py-4.5 rounded-lg text-xs font-black uppercase tracking-widest text-white bg-accent hover:bg-accent-hover shadow-xl shadow-accent/20 transition-all cursor-pointer"
                id="hero-btn-quote"
              >
                {t.btnQuote}
              </button>
              <a
                href="#contact-section"
                className="w-full sm:w-auto px-10 py-4.5 rounded-lg text-xs font-black uppercase tracking-widest text-neutral-300 bg-black/40 border border-white/10 hover:text-white hover:bg-white/5 hover:border-white/25 transition-all text-center"
                id="hero-btn-contact"
              >
                {t.btnContact}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Diagonal cut effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0A0A0A] clip-path-diagonal" />
      </section>

      {/* 2. Key Metrics Row */}
      <section className="bg-[#0A0A0A] py-12 border-b border-white/10" id="metrics-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Metric 1 */}
            <div className="p-6 rounded-lg bg-[#0F0F0F] border border-white/10 flex flex-col items-center">
              <Award className="w-8 h-8 text-accent mb-3" />
              <span className="font-display text-2xl font-black text-white tracking-tight">{t.statExp}</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-mono mt-1">
                {currentLanguage === 'th' ? 'ความเชี่ยวชาญการดำเนินงาน' : 'OPERATIONAL EXPERTISE'}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-6 rounded-lg bg-[#0F0F0F] border border-white/10 flex flex-col items-center">
              <Users className="w-8 h-8 text-accent mb-3" />
              <span className="font-display text-2xl font-black text-white tracking-tight">{t.statDb}</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-mono mt-1">
                {currentLanguage === 'th' ? 'ครอบคลุมทุกโปรไฟล์งาน' : 'MULTIPLE TALENT PROFILES'}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-6 rounded-lg bg-[#0F0F0F] border border-white/10 flex flex-col items-center">
              <Globe className="w-8 h-8 text-accent mb-3" />
              <span className="font-display text-2xl font-black text-white tracking-tight">{t.statCoverage}</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-mono mt-1">
                {currentLanguage === 'th' ? 'รวดเร็ว ทุกภูมิภาค' : 'FAST PROVINCIAL DISPATCH'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Us Brief Section */}
      <section className="bg-[#0A0A0A] py-24 text-white" id="about-brief-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono bg-accent/10 px-3.5 py-1.5 rounded-md">
                {t.navAbout}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none uppercase">
                {t.aboutBriefTitle}
              </h2>
              <p className="font-sans text-neutral-300 text-base leading-relaxed">
                {t.aboutBriefSubtitle}
              </p>
              <p className="font-sans text-neutral-400 text-sm leading-relaxed">
                {currentLanguage === 'th'
                  ? 'เราเชื่อว่าทีมงานภาคสนามคือเสาหลักในการถ่ายทอดเอกลักษณ์ของแบรนด์ ดังนั้นทุกสตาฟ พริตตี้ และเอ็มซีในความดูแลของเรา จึงได้รับการอบรมความรู้สุขอนามัย มารยาทสังคม และทักษะการโน้มน้าวใจเป็นพิเศษก่อนลงพื้นที่จริง'
                  : 'We believe field staff represents the vital core of your brand experience. Hence, every crew member, model, and PC undergoes strict brand briefs, hospitality reviews, and sanitation protocol training before stepping foot on-site.'}
              </p>
              <div>
                <button
                  onClick={() => {
                    setActiveView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors group"
                  id="about-learn-more"
                >
                  <span>{currentLanguage === 'th' ? 'ทำความรู้จักพาร์ทเนอร์ของเรา' : 'Learn more about us'}</span>
                  <span className="transform group-hover:translate-x-1.5 transition-all">→</span>
                </button>
              </div>
            </div>

            {/* Event Coordinator Image hotlink as mockup */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-accent rounded-lg transform rotate-2 scale-102 opacity-10 blur-lg" />
              <div className="relative bg-[#0F0F0F] border border-white/10 rounded-lg overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFbC6O2LPQE9vU9xHrCH9JF-zVxdtNOu0o__42jcJCBEtuY64NqSmdwlkdjL0N1rFLjx6mYF6SKjiY2tmvbZxPdfJl7jnYaBpAM0OMMb2BnwQKEFG26B7so5xljL_KhT1-JRksYXqjTpVGAU-oWLbZ6V-4IyvIK1XPRP79DXAO1gxT0wvMr97OGcghChwNtrUuR-vVKPAIYmbNgwhf_vcRN1r1ikyEvLxfVppfrCbRtoRv1EtUokxj"
                  alt="KRIS Event solutions smiling coordinator"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 saturate-75 transform hover:scale-105 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#0F0F0F]/95 backdrop-blur border border-white/10">
                  <span className="text-[9px] text-neutral-500 font-mono block tracking-wider">STAFF COORDINATOR</span>
                  <span className="text-xs font-bold text-white mt-1 block">
                    {currentLanguage === 'th' ? 'คุณกฤษณา และทีมฝ่ายสรรหาภาคสนาม' : 'Kritsana & Sourcing Management Team'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bento Grid Services Summary Section */}
      <section className="bg-[#0A0A0A] py-24 text-white border-b border-white/10" id="services-summary-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              {t.navServices}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {t.servicesBentoTitle}
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              {t.servicesBentoSubtitle}
            </p>
          </div>

          {/* Bento layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1: Event Staffing (Large card, image bg) */}
            <div className="md:col-span-8 group relative bg-[#0F0F0F] rounded-lg border border-white/10 overflow-hidden aspect-[16/9] md:aspect-auto md:min-h-[350px] flex flex-col justify-end p-6 sm:p-8 shadow-lg transition-all duration-500 hover:border-accent">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPQi2APOltxllcnJSITA2ABozof6lb2XOMuIyERHAjDpGN04iawn6RL_nhbI-GUvteMISortvnic2xxApChJW4GR7HK9Q3x25XmwYoOuR_cgYBNo_ZFVwW1I3eNF_5q1mxu3axFP6pyOrOKA3hP1nr-rH8cwY-uXOAbcDfcUNvllTR_TXXR0EV625HbAPwg4TmMmUMJa3V75Lsr3KqEvXOCO4ug3GAo94dNmBhogsIYfWGPa5vzmPP"
                  alt="Event Staffing talent team"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 saturate-50 brightness-[0.25] group-hover:scale-102 group-hover:grayscale-0 group-hover:brightness-[0.4] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
              </div>

              <div className="relative z-10 space-y-3">
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-md border border-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase">
                  {currentLanguage === 'th' ? SERVICES_DATA[0].titleTh : SERVICES_DATA[0].titleEn}
                </h3>
                <p className="text-sm text-neutral-300 max-w-xl">
                  {currentLanguage === 'th' ? SERVICES_DATA[0].descriptionTh : SERVICES_DATA[0].descriptionEn}
                </p>
                <button
                  onClick={() => {
                    setActiveView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] font-bold uppercase tracking-wider text-accent hover:text-white flex items-center space-x-1.5 pt-2"
                >
                  <span>{currentLanguage === 'th' ? 'ดูรายละเอียดบริการนี้' : 'Learn more about staffing'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Card 2: Retail Support (Solid block accent) */}
            <div className="md:col-span-4 bg-[#0F0F0F] rounded-lg border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all hover:border-accent min-h-[300px]">
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-md border border-accent/20 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <div className="space-y-3 mt-12 md:mt-0">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase">
                  {currentLanguage === 'th' ? SERVICES_DATA[1].titleTh : SERVICES_DATA[1].titleEn}
                </h3>
                <p className="text-sm text-neutral-400">
                  {currentLanguage === 'th' ? SERVICES_DATA[1].descriptionTh : SERVICES_DATA[1].descriptionEn}
                </p>
                <button
                  onClick={() => {
                    setActiveView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] font-bold uppercase tracking-wider text-accent hover:text-white flex items-center space-x-1"
                >
                  <span>{currentLanguage === 'th' ? 'ดูรายละเอียด' : 'Details'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Card 3: Exhibition Support */}
            <div className="md:col-span-4 bg-[#0F0F0F] rounded-lg border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all hover:border-accent min-h-[300px]">
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-md border border-accent/20 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-3 mt-12 md:mt-0">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase">
                  {currentLanguage === 'th' ? SERVICES_DATA[2].titleTh : SERVICES_DATA[2].titleEn}
                </h3>
                <p className="text-sm text-neutral-400">
                  {currentLanguage === 'th' ? SERVICES_DATA[2].descriptionTh : SERVICES_DATA[2].descriptionEn}
                </p>
                <button
                  onClick={() => {
                    setActiveView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] font-bold uppercase tracking-wider text-accent hover:text-white flex items-center space-x-1"
                >
                  <span>{currentLanguage === 'th' ? 'ดูรายละเอียด' : 'Details'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Card 4: KOL Coordination (Image bg) */}
            <div className="md:col-span-8 group relative bg-[#0F0F0F] rounded-lg border border-white/10 overflow-hidden aspect-[16/9] md:aspect-auto md:min-h-[300px] flex flex-col justify-end p-6 sm:p-8 shadow-lg transition-all duration-500 hover:border-accent">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9BL1s4RxyAwuJ14nYpsWObyaPkfTcv_2jiJa6klgjQlbe_RdCsEpfrbJI9Hv9maZdgmmbXxISZ-j4iG5ssJKBzxU56xinv9q25kQHLQSN5aqcWXSznAKALTH8av1ZSrOOiXdKqQeAr1ycl8inbmMJdLox_DtRjMFykqRLlJl_hA9SGQX0Y1BmITzpbTrdbwkxuHqP1F1LR2p4q5fz-95Afl3_uHJbLZ9IwA-ig4D2rZCA0-S-tFp9"
                  alt="KOL Coordination & influencer agency"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 saturate-50 brightness-[0.25] group-hover:scale-102 group-hover:grayscale-0 group-hover:brightness-[0.4] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
              </div>

              <div className="relative z-10 space-y-3">
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-md border border-accent/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-white uppercase">
                  {currentLanguage === 'th' ? SERVICES_DATA[3].titleTh : SERVICES_DATA[3].titleEn}
                </h3>
                <p className="text-sm text-neutral-300 max-w-xl">
                  {currentLanguage === 'th' ? SERVICES_DATA[3].descriptionTh : SERVICES_DATA[3].descriptionEn}
                </p>
                <button
                  onClick={() => {
                    setActiveView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] font-bold uppercase tracking-wider text-accent hover:text-white flex items-center space-x-1.5 pt-2"
                >
                  <span>{currentLanguage === 'th' ? 'ดูบริการออนไลน์โคดิเนชัน' : 'Details'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="bg-[#0A0A0A] py-24 text-white border-b border-white/10" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              Value Proposition
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {t.whyTitle}
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              {t.whySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-[#0F0F0F] rounded-lg border border-white/10 hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-md flex items-center justify-center mb-6 border border-accent/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-3 uppercase">
                {t.whyReason1Title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t.whyReason1Desc}
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-[#0F0F0F] rounded-lg border border-white/10 hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-md flex items-center justify-center mb-6 border border-accent/20">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-3 uppercase">
                {t.whyReason2Title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t.whyReason2Desc}
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-[#0F0F0F] rounded-lg border border-white/10 hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-md flex items-center justify-center mb-6 border border-accent/20">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-3 uppercase">
                {t.whyReason3Title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t.whyReason3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Portfolio Preview Section */}
      <section className="bg-[#0A0A0A] py-24 text-white border-b border-white/10" id="portfolio-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
                Recent Portfolios
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
                {t.portTitle}
              </h2>
              <p className="text-sm text-neutral-400 mt-2">
                {t.portSubtitle}
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  setActiveView('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest border border-white/10 hover:border-white/20 hover:bg-[#0F0F0F] text-white transition-all cursor-pointer inline-block"
              >
                {t.portViewMore}
              </button>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PORTFOLIO_DATA.map((item) => (
              <div
                key={item.id}
                className="group bg-[#0F0F0F] rounded-lg border border-white/10 overflow-hidden hover:border-accent transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={currentLanguage === 'th' ? item.titleTh : item.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 saturate-50 group-hover:grayscale-0 group-hover:saturate-100 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-black uppercase tracking-widest font-mono text-white bg-accent px-2.5 py-1 rounded-sm">
                      {currentLanguage === 'th' ? item.categoryTh : item.categoryEn}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{currentLanguage === 'th' ? item.locationTh : item.locationEn}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-accent transition-colors uppercase">
                    {currentLanguage === 'th' ? item.titleTh : item.titleEn}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {currentLanguage === 'th' ? item.descriptionTh : item.descriptionEn}
                  </p>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-neutral-500 font-mono">
                    <span>{currentLanguage === 'th' ? 'ขนาดทีมงาน:' : 'Staff Deploy:'}</span>
                    <span className="text-white font-semibold">
                      {currentLanguage === 'th' ? item.staffCountTh : item.staffCountEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section className="bg-[#0A0A0A] py-24 text-white relative overflow-hidden" id="contact-section">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-radial-at-r from-accent/15 to-transparent pointer-events-none opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column: Contact details card */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
                  {t.navContact}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
                  {t.contactTitle}
                </h2>
                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  {t.contactSubtitle}
                </p>
              </div>

              {/* Live Calculator indicator helper */}
              {appliedStaffEstimate && (
                <div className="p-5 rounded-lg bg-[#0F0F0F] border border-accent/30 text-white text-xs flex flex-col gap-2.5 shadow-xl">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-accent">
                    <CheckCircle className="w-4 h-4" />
                    <span>{currentLanguage === 'th' ? 'แนบใบเสนอราคาสตาฟแล้ว' : 'Sourced staffing estimate attached'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-neutral-300 font-mono bg-black/40 p-2.5 rounded border border-white/5">
                    {appliedStaffEstimate}
                  </p>
                  <button
                    type="button"
                    onClick={handleSyncEstimate}
                    className="self-start text-[10px] font-black uppercase tracking-wider underline cursor-pointer text-accent hover:text-white"
                  >
                    {currentLanguage === 'th' ? 'ใส่ข้อมูลนี้ในฟอร์มอีกครั้ง' : 'Re-insert details into form'}
                  </button>
                </div>
              )}

              {/* Details card */}
              <div className="p-8 bg-[#0F0F0F] rounded-lg border border-white/10 space-y-6">
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wide">
                  {t.contactCardTitle}
                </h3>
                <p className="text-xs text-neutral-400">
                  {t.contactCardDesc}
                </p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 text-sm text-neutral-300">
                    <Phone className="w-5 h-5 text-accent shrink-0" />
                    <a href="tel:0647376445" className="hover:text-accent transition-colors font-mono">
                      +66 (0) 64-737-6445
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-neutral-300">
                    <Mail className="w-5 h-5 text-accent shrink-0" />
                    <a href="mailto:kakn1144@gmail.com" className="hover:text-accent transition-colors font-mono">
                      kakn1144@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-neutral-300">
                    <Clock className="w-5 h-5 text-accent shrink-0" />
                    <span>{t.contactWorkingHours}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm text-neutral-300">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{t.contactAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive contact form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-[#0F0F0F] p-8 sm:p-10 rounded-lg border border-white/10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono block">
                      {t.formName} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-neutral-700"
                      placeholder={currentLanguage === 'th' ? 'กรุณากรอกชื่อของคุณ' : 'Enter your name'}
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono block">
                      {t.formPhone} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-neutral-700 font-mono"
                      placeholder={currentLanguage === 'th' ? 'เช่น 081-234-5678' : 'e.g. 0812345678'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono block">
                      {t.formEmail} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-neutral-700 font-mono"
                      placeholder="email@company.com"
                    />
                  </div>

                  {/* Service dropdown */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono block">
                      {t.formService} <span className="text-accent">*</span>
                    </label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                    >
                      <option value="" disabled>{t.formServicePlaceholder}</option>
                      <option value="staffing">{currentLanguage === 'th' ? 'Event Staffing (สตาฟ, พริตตี้, เอ็มซี)' : 'Event Staffing'}</option>
                      <option value="retail">{currentLanguage === 'th' ? 'Retail Support (Merchandiser / PC)' : 'Retail Support'}</option>
                      <option value="roadshows">{currentLanguage === 'th' ? 'Roadshows & Brand Troops (คาราวานโปรโมท)' : 'Roadshows & Troops'}</option>
                      <option value="onsite">{currentLanguage === 'th' ? 'On-site Management (ควบคุมดูแลหน้างาน)' : 'On-site Management'}</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono block">
                    {t.formMessage}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-neutral-700"
                    placeholder={currentLanguage === 'th' ? 'ระบุข้อมูลเพิ่มเติมเพื่อให้ทีมงานตอบกลับคุณได้รวดเร็วขึ้น...' : 'Provide specific details (optional)...'}
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4.5 rounded-lg text-xs font-black uppercase tracking-widest text-white bg-accent hover:bg-accent-hover shadow-xl shadow-accent/25 transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      isSubmitting ? 'opacity-85 cursor-not-allowed' : ''
                    }`}
                    id="btn-form-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t.formSubmitting}</span>
                      </>
                    ) : (
                      <span>{t.formSubmit}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
