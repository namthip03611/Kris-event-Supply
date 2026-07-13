import { useState } from 'react';
import { Sparkles, MapPin, Search, Filter, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, ViewType } from '../types';
import { translations, PORTFOLIO_DATA, INDUSTRIES_DATA, CLIENT_LOGOS } from '../translations';

interface PortfolioViewProps {
  currentLanguage: Language;
  setActiveView: (view: ViewType) => void;
}

export default function PortfolioView({ currentLanguage, setActiveView }: PortfolioViewProps) {
  const t = translations[currentLanguage];

  // Interactive Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: t.portfolioAll },
    { key: 'exhibition', label: currentLanguage === 'th' ? 'Exhibition Support' : 'Exhibition' },
    { key: 'retail', label: currentLanguage === 'th' ? 'Retail & Sampling' : 'Retail' },
    { key: 'activation', label: currentLanguage === 'th' ? 'Brand Activation' : 'Activation' }
  ];

  // Filter logic
  const filteredPortfolios = PORTFOLIO_DATA.filter((item) => {
    const titleMatch = (currentLanguage === 'th' ? item.titleTh : item.titleEn)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return titleMatch;
    
    // Match logic based on category keys
    if (selectedCategory === 'exhibition') return item.id === 'disney';
    if (selectedCategory === 'retail') return item.id === 'thaifex';
    if (selectedCategory === 'activation') return item.id === 's2o';
    
    return titleMatch;
  });

  return (
    <div id="portfolio-view-container" className="bg-[#0A0A0A] text-white">
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
              {currentLanguage === 'th' ? 'ผลงานและอุตสาหกรรมร่วมงาน' : 'PORTFOLIO & INDUSTRIES'}
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight max-w-5xl mx-auto text-white leading-[0.85] drop-shadow-sm">
              <span className="block">{currentLanguage === 'th' ? 'ประวัติความสำเร็จ' : 'PROVEN FIELD'}</span>
              <span className="block outline-text-thick my-2">{currentLanguage === 'th' ? 'และแบรนด์ที่ไว้วางใจ' : 'ACTIVATION ARCHIVE'}</span>
              <span className="block text-accent">{currentLanguage === 'th' ? 'ของเราทั่วประเทศ' : 'FOR GLOBAL BRANDS'}</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed pt-2">
              {t.portHeroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Industries of Expertise Grid */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10" id="industries-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              Expertise Fields
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {t.industryTitle}
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              {t.industrySubtitle}
            </p>
          </div>

          {/* 5 columns bento-style industry grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {INDUSTRIES_DATA.map((ind) => (
              <div
                key={ind.id}
                className="group relative bg-[#0F0F0F] rounded-lg border border-white/10 overflow-hidden flex flex-col justify-between shadow-lg hover:border-accent transition-all duration-300 h-96"
              >
                {/* Background Image Hotlink from mockup */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={ind.image}
                    alt={currentLanguage === 'th' ? ind.titleTh : ind.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 saturate-50 group-hover:grayscale-0 group-hover:saturate-100 group-hover:scale-105 transition-all duration-500 brightness-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-sm w-fit">
                    SECTOR
                  </span>

                  <div className="space-y-2 mt-auto">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                      {currentLanguage === 'th' ? ind.titleTh : ind.titleEn}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                      {currentLanguage === 'th' ? ind.descriptionTh : ind.descriptionEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Filterable Case Studies Showcase */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10" id="portfolios-showcase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              In-depth Works
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {currentLanguage === 'th' ? 'โครงการล่าสุดของเรา' : 'Our Case Studies'}
            </h2>
          </div>

          {/* Filter & Search controls */}
          <div className="mb-12 bg-[#0F0F0F] p-6 rounded-lg border border-white/10 flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Search inputs */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.portfolioSearch}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-accent transition-all placeholder:text-neutral-700"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
              <div className="text-xs text-neutral-500 font-mono flex items-center mr-2 tracking-wider">
                <Filter className="w-3.5 h-3.5 mr-1" />
                <span>{t.portfolioFilterCategory}:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-accent text-white shadow shadow-accent/25'
                      : 'bg-[#0A0A0A] border border-white/10 text-neutral-400 hover:text-white hover:border-accent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count text */}
          <div className="text-xs text-neutral-500 font-mono mb-6 tracking-wider uppercase">
            {t.portfolioTotalResults.replace('{count}', String(filteredPortfolios.length))}
          </div>

          {/* Portfolios list */}
          {filteredPortfolios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolios.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#0F0F0F] rounded-lg border border-white/10 overflow-hidden hover:border-accent transition-all flex flex-col justify-between"
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
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>{currentLanguage === 'th' ? item.locationTh : item.locationEn}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-accent transition-colors uppercase">
                        {currentLanguage === 'th' ? item.titleTh : item.titleEn}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {currentLanguage === 'th' ? item.descriptionTh : item.descriptionEn}
                      </p>
                    </div>
                    
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
          ) : (
            <div className="text-center py-20 bg-[#0F0F0F] border border-white/10 rounded-lg">
              <p className="text-sm text-neutral-500">{t.portfolioEmpty}</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Trusted Clients Section */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/10" id="trusted-brands">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              Partnerships
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              {t.brandTrustTitle}
            </h2>
            <p className="text-sm text-neutral-400 mt-3">
              {t.brandTrustSubtitle}
            </p>
          </div>

          {/* Client logos grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CLIENT_LOGOS.map((brand) => (
              <div
                key={brand.name}
                className="p-8 bg-[#0F0F0F] rounded-lg border border-white/10 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-[#0F0F0F]/80 transition-all group"
              >
                <span className="font-display text-lg font-black text-neutral-400 group-hover:text-accent transition-colors tracking-tight uppercase">
                  {brand.name}
                </span>
                <span className="text-[9px] font-mono uppercase text-neutral-600 mt-2 tracking-widest">
                  {brand.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call to Action (CTA) */}
      <section className="py-24 bg-[#0F0F0F] text-white border-t border-white/10 text-center relative overflow-hidden" id="portfolio-cta">
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
              id="portfolio-cta-btn-get-quote"
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
