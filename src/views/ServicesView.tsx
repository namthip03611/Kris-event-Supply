import { useState } from 'react';
import { Sparkles, Users, Store, Map, Shield, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, ViewType } from '../types';
import { translations } from '../translations';
import InteractiveCalculator from '../components/InteractiveCalculator';

interface ServicesViewProps {
  currentLanguage: Language;
  setActiveView: (view: ViewType) => void;
  onApplyEstimate: (estimateText: string, calculatedValue: string) => void;
}

export default function ServicesView({
  currentLanguage,
  setActiveView,
  onApplyEstimate
}: ServicesViewProps) {
  const t = translations[currentLanguage];

  const serviceSpecs = [
    {
      id: 'staffing',
      icon: Users,
      title: t.serviceEventDetailTitle,
      desc: t.serviceEventDetailDesc,
      bullets: [
        t.serviceEventDetailBullet1,
        t.serviceEventDetailBullet2,
        t.serviceEventDetailBullet3,
        t.serviceEventDetailBullet4
      ],
      color: 'from-red-600/10 to-rose-600/10 border-red-500/20'
    },
    {
      id: 'retail',
      icon: Store,
      title: t.serviceRetailDetailTitle,
      desc: t.serviceRetailDetailDesc,
      bullets: [
        t.serviceRetailDetailBullet1,
        t.serviceRetailDetailBullet2,
        t.serviceRetailDetailBullet3,
        t.serviceRetailDetailBullet4
      ],
      color: 'from-amber-600/10 to-orange-600/10 border-amber-500/20'
    },
    {
      id: 'roadshows',
      icon: Map,
      title: t.serviceRoadshowDetailTitle,
      desc: t.serviceRoadshowDetailDesc,
      bullets: [
        t.serviceRoadshowDetailBullet1,
        t.serviceRoadshowDetailBullet2,
        t.serviceRoadshowDetailBullet3,
        t.serviceRoadshowDetailBullet4
      ],
      color: 'from-blue-600/10 to-indigo-600/10 border-blue-500/20'
    },
    {
      id: 'onsite',
      icon: Shield,
      title: t.serviceOnsiteDetailTitle,
      desc: t.serviceOnsiteDetailDesc,
      bullets: [
        t.serviceOnsiteDetailBullet1,
        t.serviceOnsiteDetailBullet2,
        t.serviceOnsiteDetailBullet3,
        t.serviceOnsiteDetailBullet4
      ],
      color: 'from-emerald-600/10 to-teal-600/10 border-emerald-500/20'
    }
  ];

  return (
    <div id="services-view-container" className="bg-[#0A0A0A] text-white">
      {/* 1. Page Hero */}
      <section className="relative py-24 sm:py-32 border-b border-white/10 bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F] overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-accent/15 via-transparent to-transparent opacity-80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono bg-accent/10 px-3.5 py-1.5 rounded-md border border-accent/20">
              {currentLanguage === 'th' ? 'ขีดความสามารถการบริการ' : 'OUR CAPABILITIES'}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight max-w-5xl mx-auto text-white leading-[0.85] drop-shadow-sm">
              <span className="block">{currentLanguage === 'th' ? 'บริการจัดหา' : 'ELITE STAFFING'}</span>
              <span className="block outline-text-thick my-2">{currentLanguage === 'th' ? 'บุคลากรและสตาฟอีเวนต์' : 'FOR LIVE ACTIVATIONS'}</span>
              <span className="block text-accent">{currentLanguage === 'th' ? 'ระดับมืออาชีพ' : 'NATIONWIDE'}</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed pt-2">
              {t.servicesHeroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Detailed Services Grid */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {serviceSpecs.map((spec, index) => {
              const IconComp = spec.icon;
              return (
                <div
                  key={spec.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                  id={`service-detail-${spec.id}`}
                >
                  {/* Left block info */}
                  <div className={`lg:col-span-7 space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-md border border-accent/20 flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                    
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                      {spec.title}
                    </h2>
                    
                    <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed">
                      {spec.desc}
                    </p>

                    {/* Bullet capabilities */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      {spec.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right abstract visual placeholder card */}
                  <div className={`lg:col-span-5 relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="absolute inset-0 bg-accent opacity-5 blur-xl scale-105 rounded-lg" />
                    <div className="relative bg-[#0F0F0F] border border-white/10 rounded-lg p-8 shadow-xl min-h-[250px] flex flex-col justify-between hover:border-accent transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-mono text-neutral-500 tracking-widest uppercase font-bold">
                          KRIS EVENT SERVICE MODULE {index + 1}
                        </span>
                        <Sparkles className="w-4 h-4 text-accent/30" />
                      </div>
                      
                      <div className="space-y-3 my-8">
                        <span className="text-[10px] text-accent font-mono font-bold block uppercase tracking-widest">
                          {currentLanguage === 'th' ? 'มาตรฐานทีมงาน' : 'Staffing Benchmark'}
                        </span>
                        <h4 className="font-display text-lg font-bold text-white leading-tight uppercase tracking-wide">
                          {currentLanguage === 'th' 
                            ? 'คัดกรอง 3 ขั้นตอน อบรมตามเอกลักษณ์แบรนด์' 
                            : '3-tier Vetting & Brand-aligned Onboarding'}
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {currentLanguage === 'th'
                            ? 'ทีมงานทุกคนจะต้องผ่านการสัมภาษณ์ความรู้หน้าร้าน ตรวจสอบประวัติอาชญากรรม และจัดทำประวัติการทำงานแบบย่อส่งให้ลูกค้าอนุมัติก่อนลงงาน'
                            : 'Every candidate undergoes direct face-to-face capability vetting, local background checks, and customized brand product brief review.'}
                        </p>
                      </div>

                      <div className="flex items-center text-xs text-accent font-bold gap-1 uppercase tracking-wider font-mono">
                        <span>{currentLanguage === 'th' ? 'รายละเอียดระบบงาน' : 'Operational System'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Pricing & Sourcing Calculator Section */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10" id="pricing-tool-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              Staff Sourcing Tool
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {currentLanguage === 'th' ? 'คำนวณทีมและงบประมาณ' : 'Quotation Estimate Tool'}
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              {currentLanguage === 'th'
                ? 'ร่วมจัดสรรจำนวนสตาฟเพื่อคำนวณราคาเฉลี่ยต่อวัน และส่งข้อมูลใบเสนอราคาตรงเข้าฟอร์มขอข้อมูลด้านล่าง'
                : 'Select different staff classes to estimate operational service costs and apply the team directly to the inquiry form.'}
            </p>
          </div>

          {/* Calculator Embed */}
          <div className="max-w-5xl mx-auto">
            <InteractiveCalculator
              currentLanguage={currentLanguage}
              onApplyEstimate={onApplyEstimate}
            />
          </div>
        </div>
      </section>

      {/* 4. Strategy / QA standards Section */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              Quality Assurance
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {currentLanguage === 'th' ? 'มาตรฐานการควบคุมดูแลงาน' : 'Field Operations Quality Control'}
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              {currentLanguage === 'th'
                ? 'เราไม่เพียงส่งสตาฟไปหน้างาน แต่เราติดตาม ควบคุม และแก้ไขปัญหาระบบเพื่อให้คุณวางใจได้ 100%'
                : 'We do not just dispatch crews. We monitor, evaluate, and systemize processes to guarantee peace of mind.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-[#0F0F0F] border border-white/10 flex flex-col justify-between hover:border-accent transition-all">
              <div>
                <span className="text-xs font-black text-accent font-mono block tracking-widest">STAGE 01</span>
                <h3 className="font-display text-lg font-bold text-white mt-4 mb-3 uppercase tracking-wide">
                  {currentLanguage === 'th' ? 'คัดเลือกโปรไฟล์เข้มข้น' : 'Strict Profile Vetting'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {currentLanguage === 'th'
                    ? 'สตาฟทุกคนในทีมจะได้รับการคัดกรองบุคลิก ประวัติวินัย และทักษะการสนทนาโดยทีมฝ่ายบุคคล เพื่อให้เหมาะสมกับสเปกสินค้าของแบรนด์ที่สุด'
                    : 'Profiles are matched directly by experience. We filter for communicative competence, past brand execution reviews, and punctuality logs.'}
                </p>
              </div>
            </div>

            <div className="p-8 rounded-lg bg-[#0F0F0F] border border-white/10 flex flex-col justify-between hover:border-accent transition-all">
              <div>
                <span className="text-xs font-black text-accent font-mono block tracking-widest">STAGE 02</span>
                <h3 className="font-display text-lg font-bold text-white mt-4 mb-3 uppercase tracking-wide">
                  {currentLanguage === 'th' ? 'การจัดบรีฟงาน 100%' : 'Rigorous Pre-Briefing'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {currentLanguage === 'th'
                    ? 'สตาฟต้องเข้าอบรมและทดสอบความเข้าใจเป้าหมายยอดขาย ความรู้แบรนด์ และระเบียบความสะอาดหน้างานก่อนเริ่มงานจริง ไม่ปล่อยงานหน้าคอมพิวเตอร์'
                    : 'We host interactive briefing sessions detailing active selling points, hygiene constraints, and crowd management rules before they set foot on-site.'}
                </p>
              </div>
            </div>

            <div className="p-8 rounded-lg bg-[#0F0F0F] border border-white/10 flex flex-col justify-between hover:border-accent transition-all">
              <div>
                <span className="text-xs font-black text-accent font-mono block tracking-widest">STAGE 03</span>
                <h3 className="font-display text-lg font-bold text-white mt-4 mb-3 uppercase tracking-wide">
                  {currentLanguage === 'th' ? 'ทีมกำกับดูแลหน้างาน' : 'Active Supervisor Audits'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {currentLanguage === 'th'
                    ? 'ทีม Operation และ Supervisor เข้าสุ่มสแกนพฤติกรรมการแต่งกาย การทำงานหน้าร้าน และคอยให้ความช่วยเหลือฉุกเฉินหรือสลับตัวสตาฟภายใน 2 ชั่วโมงหากมีคนขาด'
                    : 'Our operational managers perform spontaneous on-site check-ins, monitoring hygiene standards and ensuring 2-hour staff backups in emergencies.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-[#0F0F0F] text-white border-t border-white/10 text-center relative overflow-hidden" id="services-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
            {t.ctaTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t.ctaSubtitle}
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setActiveView('home');
                setTimeout(() => {
                  const element = document.getElementById('contact-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 300);
              }}
              className="px-8 py-4.5 rounded-lg text-xs font-black uppercase tracking-widest text-white bg-accent hover:bg-accent-hover shadow-xl shadow-accent/25 transition-all cursor-pointer inline-flex items-center space-x-2"
              id="cta-btn-get-quote"
            >
              <span>{t.btnQuote}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
