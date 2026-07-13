import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { Language, ViewType } from '../types';
import { translations } from '../translations';

interface FooterProps {
  currentLanguage: Language;
  setActiveView: (view: ViewType) => void;
}

export default function Footer({ currentLanguage, setActiveView }: FooterProps) {
  const t = translations[currentLanguage];

  const handleNavClick = (view: ViewType) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F0F0F] text-neutral-400 border-t border-white/10 pt-16 pb-8" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
              <span className="font-display text-2xl font-black tracking-tight text-white uppercase">
                KRIS<span className="text-accent">.</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 ml-2 border-l border-white/10 pl-2">
                Event Solutions
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-500">
              {currentLanguage === 'th'
                ? 'ผู้นำด้านการจัดทีมบุคลากรและทีมรันคิวภาคสนาม พริตตี้สตาฟ และ PC คุณภาพสูง ครอบคลุมกิจกรรมทางการตลาดทุกรูปแบบทั่วประเทศ'
                : 'A premier provider of elite event crews, promotional talents, and Point-of-Sale specialists covering marketing activations nationwide.'}
            </p>
            <div className="flex items-center space-x-2 text-xs text-accent bg-accent/10 px-3 py-1.5 rounded-sm border border-accent/20 w-fit font-mono font-bold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                {currentLanguage === 'th' ? 'ฐานข้อมูลสตาฟที่ได้รับการตรวจสอบประวัติ' : 'Verified Staff Sourcing Database'}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-sm font-black text-white tracking-widest uppercase mb-6">
              {currentLanguage === 'th' ? 'เมนูนำทาง' : 'Navigation'}
            </h3>
            <ul className="space-y-3.5 text-sm font-mono text-[11px] uppercase tracking-wider">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  {t.navServices}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('portfolio')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  {t.navPortfolio}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div>
            <h3 className="font-display text-sm font-black text-white tracking-widest uppercase mb-6">
              {currentLanguage === 'th' ? 'บริการยอดนิยม' : 'Popular Services'}
            </h3>
            <ul className="space-y-3 text-sm text-neutral-500 font-mono text-[11px] uppercase tracking-wider">
              <li>
                {currentLanguage === 'th' ? 'พนักงานแนะนำสินค้า (PC / BA)' : 'Product PC / Beauty Advisors'}
              </li>
              <li>
                {currentLanguage === 'th' ? 'พิธีกรดำเนินรายการ (MC)' : 'Professional Event MC'}
              </li>
              <li>
                {currentLanguage === 'th' ? 'ทีมพริตตี้ดูแลลูกค้า VIP' : 'Pretty Talents & VIP Hospitality'}
              </li>
              <li>
                {currentLanguage === 'th' ? 'กิจกรรมคาราวานส่งเสริมการตลาด' : 'Roadshows & Brand Activation'}
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Office */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-black text-white tracking-widest uppercase mb-6">
              {currentLanguage === 'th' ? 'ฝ่ายบริการลูกค้า' : 'Customer Service'}
            </h3>
            <div className="flex items-start space-x-3 text-sm text-neutral-400">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>{t.contactAddress}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-400">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <a href="tel:0647376445" className="hover:text-white transition-colors font-mono">
                +66 (0) 64-737-6445
              </a>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-400">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <a href="mailto:kakn1144@gmail.com" className="hover:text-white transition-colors font-mono">
                kakn1144@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3 text-sm text-neutral-400">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <span className="font-mono text-xs">{t.contactWorkingHours}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 gap-4 font-mono">
          <p>
            &copy; {new Date().getFullYear()} KRIS Event Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <span>{currentLanguage === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</span>
            <span>{currentLanguage === 'th' ? 'ข้อตกลงการใช้บริการ' : 'Terms of Service'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
