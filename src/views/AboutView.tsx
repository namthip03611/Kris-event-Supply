import { Award, ShieldCheck, Zap, TrendingUp, Quote, CheckCircle, Compass, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations, VALUES_DATA } from '../translations';

interface AboutViewProps {
  currentLanguage: Language;
}

export default function AboutView({ currentLanguage }: AboutViewProps) {
  const t = translations[currentLanguage];

  const valueIcons: Record<string, any> = {
    prof: Award,
    reliable: ShieldCheck,
    fast: Zap,
    flexible: TrendingUp,
  };

  const steps = [
    {
      num: '01',
      title: t.processStep1Title,
      desc: t.processStep1Desc,
    },
    {
      num: '02',
      title: t.processStep2Title,
      desc: t.processStep2Desc,
    },
    {
      num: '03',
      title: t.processStep3Title,
      desc: t.processStep3Desc,
    },
    {
      num: '04',
      title: t.processStep4Title,
      desc: t.processStep4Desc,
    },
    {
      num: '05',
      title: t.processStep5Title,
      desc: t.processStep5Desc,
    },
    {
      num: '06',
      title: t.processStep6Title,
      desc: t.processStep6Desc,
    },
  ];

  return (
    <div id="about-view-container" className="bg-[#0A0A0A] text-white">
      {/* 1. Page Header / Hero */}
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
              {currentLanguage === 'th' ? 'เกี่ยวกับเรา' : 'ABOUT US'}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight max-w-5xl mx-auto text-white leading-[0.85] drop-shadow-sm">
              <span className="block">{currentLanguage === 'th' ? 'ก้าวสู่การจัดการ' : 'SCALE YOUR'}</span>
              <span className="block outline-text-thick my-2">{currentLanguage === 'th' ? 'ทีมงานที่ไร้รอยต่อ' : 'FIELD OPERATIONS'}</span>
              <span className="block text-accent">{currentLanguage === 'th' ? 'เพื่อทุกความสำเร็จ' : 'WITH PRECISION'}</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed pt-2">
              {t.aboutHeroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Core Values Section */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              Our Foundations
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {t.valuesTitle}
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              {t.valuesSubtitle}
            </p>
          </div>

          {/* Grid Layout of Core Values */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Value blocks */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES_DATA.map((value) => {
                const IconComp = valueIcons[value.id] || Award;
                return (
                  <div
                    key={value.id}
                    className="p-6 rounded-lg border border-white/10 bg-[#0F0F0F] flex flex-col justify-between hover:border-accent transition-all shadow-md"
                  >
                    <div>
                      <div className="w-10 h-10 bg-accent/10 text-accent rounded-md border border-accent/20 flex items-center justify-center mb-5">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-base font-bold text-white mb-2.5 uppercase tracking-wide">
                        {currentLanguage === 'th' ? value.titleTh : value.titleEn}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {currentLanguage === 'th' ? value.descriptionTh : value.descriptionEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Featured Flexible Image in column right */}
            <div className="lg:col-span-5 relative flex flex-col justify-between">
              <div className="absolute inset-0 bg-accent rounded-lg transform rotate-1 scale-101 opacity-5 blur-xl" />
              <div className="relative bg-[#0F0F0F] border border-white/10 rounded-lg overflow-hidden flex-1 flex flex-col shadow-xl">
                <div className="h-60 sm:h-72 overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrfMjNJHsEvxsxR005dz4nhBq7v4viZ7OiA0dPbnZTFCFo3CRH_pxG9szEnAtwGgrDhO9qVyL49aetsbvj9x77kU_eh8zJLUycYDoODvg_jaT5nQN-fwr76Wn9PoYPKQmL1tujfPLL1YHJeouIojoiTtYNndE7FwHamsp8EkzXti6zeSt5A96UcnvC6jSG7t6VX1zwLl_gs8Vp-okc5jAKT0uIwkvbL_l5Uy9f1kjhWdVa1wEWIrX-"
                    alt="Flexible Activation Support"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 saturate-50 hover:grayscale-0 hover:saturate-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/10 to-transparent" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-accent font-mono uppercase block tracking-widest">
                    {currentLanguage === 'th' ? 'การสนับสนุนที่ปรับแต่งได้' : 'TAILORED SUPPORT'}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mt-2 uppercase tracking-wide">
                    {currentLanguage === 'th' ? 'ความยืดหยุ่นในการปฏิบัติงานสูงสุด' : 'Maximum Operational Agility'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">
                    {currentLanguage === 'th'
                      ? 'เราเข้าใจว่าหน้างานอีเวนต์สามารถเปลี่ยนแปลงได้ตลอดเวลา โครงสร้างการทำงานของเราจึงเอื้อต่อการปรับเปลี่ยนขนาดทีมงาน สลับตัวบุคลากร หรือแก้ไขโปรไฟล์ได้อย่างคล่องตัว ทันต่อเหตุการณ์'
                      : 'We understand that live field activations can be highly dynamic. Our operational workflows are optimized to scale up crew, substitute profiles, or amend briefs on extremely short notice.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sourcing Process Steps */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10" id="sourcing-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              The Blueprint
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {t.processTitle}
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              {t.processSubtitle}
            </p>
          </div>

          {/* Stepper Grid (6 Steps) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className="relative p-8 rounded-lg bg-[#0F0F0F] border border-white/10 hover:border-accent transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-display text-4xl font-black text-accent/30 font-mono tracking-tighter">
                      {step.num}
                    </span>
                    {index < 5 && (
                      <span className="hidden lg:block text-neutral-600 text-lg font-mono">
                        →
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-3 uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision Section */}
      <section className="py-24 bg-[#0A0A0A]" id="mission-vision">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Image hotlink from HTML 2 */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-accent rounded-lg transform rotate-2 scale-102 opacity-5 blur-xl" />
              <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-[#0F0F0F] border border-white/10 shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV3d9Wqq2TE8359FIEFVZC8WtzYsj27JACi18_63KaRF_fqtmhNIYlI2rww7ACh6Mld-mHDDz-cIMveRerUSNHo0RjvmnTVYyafMORGi7dK2Md2Y6eMWwaIE-l_qoGc8Mn2TvirP7S7jT11wXhNhsiVPVH4DocDCi8lv_6ZlJ4xz8K5Tktfxd2Wj2kdfCxitwryAMV70GtLClfwHEDn0krbxfXbh47FMe477nXn-ijAYo_yxQbRIDI"
                  alt="KRIS Staff Training Session"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 saturate-50 hover:grayscale-0 hover:saturate-100 transform hover:scale-102 transition-all duration-700"
                />
                {/* Badge top-right */}
                <div className="absolute top-4 right-4 bg-accent text-white font-semibold px-3 py-1.5 rounded-sm text-[10px] font-mono border border-white/10 shadow-md uppercase tracking-wider">
                  {t.missionBadge}
                </div>
              </div>
            </div>

            {/* Right text detail */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono bg-accent/10 px-3 py-1 rounded-md">
                  {currentLanguage === 'th' ? 'พันธกิจและวิสัยทัศน์' : 'MISSION & VISION'}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">
                  {currentLanguage === 'th' ? 'สร้างคุณค่าให้กับทุกหน้างาน' : 'Creating Value For Every Field Activation'}
                </h2>
                <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {t.missionDesc1}
                </p>
                <p className="font-sans text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {currentLanguage === 'th'
                    ? 'เป้าหมายหลักของเราในอีก 5 ปีข้างหน้าคือการพัฒนาแพลตฟอร์มบริหารบุคลากรดิจิทัล เพื่อให้ลูกค้าของเราติดตามเวลางาน เช็คโปรไฟล์สตาฟ และตรวจสอบประเมินราคาได้อย่างสะดวกรวดเร็ว ยกระดับอุตสาหกรรมด้วยความแม่นยำ'
                    : 'Our key target for the upcoming years is to develop digitized staff scheduling tools, allowing clients to monitor check-ins, approve timesheets, and source backup candidates with transparent, systemized precision.'}
                </p>
              </div>

              {/* Quote card */}
              <div className="border-l-4 border-accent pl-6 space-y-3 py-1 bg-accent/[0.02] rounded-r-lg pr-4">
                <Quote className="w-8 h-8 text-accent opacity-40" />
                <p className="text-sm font-medium italic text-neutral-300 leading-relaxed font-display">
                  {t.missionQuote}
                </p>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-mono">
                  {currentLanguage === 'th' ? '— ผู้บริหารฝ่ายปฏิบัติการ' : '— CHIEF OPERATING OFFICER'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
