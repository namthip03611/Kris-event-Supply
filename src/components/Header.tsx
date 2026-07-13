import { useState } from 'react';
import { Menu, X, Phone, FileText, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ViewType } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onContactClick: () => void;
}

export default function Header({
  currentLanguage,
  setLanguage,
  activeView,
  setActiveView,
  onContactClick
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLanguage];

  const menuItems = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'services', label: t.navServices },
    { id: 'portfolio', label: t.navPortfolio },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId as ViewType);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'th' ? 'en' : 'th');
  };

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-navy/40 text-off-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="font-display text-xl sm:text-2xl font-black tracking-[0.15em] text-white">
              KRIS<span className="text-accent">.</span>
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-400 ml-2.5 border-l border-white/20 pl-2.5 hidden sm:inline-block mt-1">
              Event Solutions
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-1.5 items-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-xs uppercase tracking-[0.15em] font-bold transition-all ${
                  activeView === item.id
                    ? 'text-accent bg-accent/10 border border-accent/25'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-accent/40 text-[10px] font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition-all bg-white/5"
              id="lang-switcher-desktop"
            >
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span>{t.langToggle}</span>
            </button>

            {/* Direct Quote Button */}
            <button
              onClick={() => {
                onContactClick();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest text-navy bg-accent hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              id="btn-nav-quote"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.btnQuote}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-white/10 text-xs font-bold text-neutral-300 bg-white/5"
              id="lang-switcher-mobile"
            >
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span>{t.langToggle}</span>
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-navy/40 bg-navy"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                    activeView === item.id
                      ? 'bg-accent/10 text-accent border-l-4 border-accent pl-3'
                      : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 pb-2 border-t border-white/10 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onContactClick();
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }}
                  className="flex w-full items-center justify-center space-x-2 px-4 py-3 rounded-lg text-xs font-black uppercase tracking-widest text-navy bg-accent hover:bg-accent-hover shadow-md"
                  id="mobile-btn-nav-quote"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.btnQuote}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
