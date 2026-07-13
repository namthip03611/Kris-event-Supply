import { useState, useEffect } from 'react';
import { Users, Calendar, Calculator, Plus, Minus, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations, STAFF_CALC_RATES } from '../translations';

interface InteractiveCalculatorProps {
  currentLanguage: Language;
  onApplyEstimate: (estimateText: string, calculatedValue: string) => void;
}

export default function InteractiveCalculator({
  currentLanguage,
  onApplyEstimate
}: InteractiveCalculatorProps) {
  const t = translations[currentLanguage];

  // State to hold quantities for each staff type
  const [quantities, setQuantities] = useState<Record<string, number>>({
    mc: 0,
    pretty: 2,
    ba_pc: 4,
    staff: 2
  });

  const [days, setDays] = useState<number>(3);
  const [hasApplied, setHasApplied] = useState<boolean>(false);

  const handleQtyChange = (key: string, amount: number) => {
    setQuantities(prev => {
      const current = prev[key] || 0;
      const next = Math.max(0, current + amount);
      return { ...prev, [key]: next };
    });
    setHasApplied(false);
  };

  const handleDaysChange = (value: number) => {
    setDays(Math.max(1, Math.min(30, value)));
    setHasApplied(false);
  };

  // Calculations
  const totalStaff = (Object.values(quantities) as number[]).reduce((acc, curr) => acc + curr, 0);
  
  const estimatedTotal = STAFF_CALC_RATES.reduce((acc, item) => {
    const qty = quantities[item.key] || 0;
    return acc + (qty * item.rate * days);
  }, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(currentLanguage === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleApply = () => {
    const staffBreakdown = STAFF_CALC_RATES
      .filter(item => (quantities[item.key] || 0) > 0)
      .map(item => `${currentLanguage === 'th' ? item.labelTh : item.labelEn} x${quantities[item.key]}`)
      .join(', ');

    const summaryText = currentLanguage === 'th'
      ? `ต้องการจัดทีมสตาฟ: [${staffBreakdown}] จำนวน ${days} วัน (รวมประมาณการงบประมาณสตาฟ: ${formatCurrency(estimatedTotal)})`
      : `Staffing Sourced: [${staffBreakdown}] for ${days} days. (Estimated staffing budget: ${formatCurrency(estimatedTotal)})`;

    const cleanValue = `Staff count: ${totalStaff}, Days: ${days}, Est Budget: ${estimatedTotal} THB`;

    onApplyEstimate(summaryText, cleanValue);
    setHasApplied(true);

    // Reset applied visual state after 3 seconds
    setTimeout(() => {
      setHasApplied(false);
    }, 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-lg overflow-hidden" id="staff-calculator">
      {/* Calculator Header */}
      <div className="bg-gradient-to-r from-accent/5 to-accent/15 p-6 sm:p-8 border-b border-neutral-200/60">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-accent/10 text-accent rounded-lg">
            <Calculator className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-xs uppercase tracking-widest text-accent font-semibold font-mono">
            Interactive Tool
          </span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-navy leading-tight">
          {t.calcTitle}
        </h3>
        <p className="text-sm text-charcoal mt-2 leading-relaxed max-w-2xl">
          {t.calcSubtitle}
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Staff Sourcing list */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="font-display text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
            {currentLanguage === 'th' ? '1. ปรับทีมบุคลากรของคุณ' : '1. Adjust Your Ideal Team'}
          </h4>
          
          <div className="space-y-3.5">
            {STAFF_CALC_RATES.map((item) => {
              const qty = quantities[item.key] || 0;
              return (
                <div
                  key={item.key}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    qty > 0
                      ? 'border-accent/40 bg-accent/[0.04]'
                      : 'border-neutral-200/60 bg-off-white hover:border-neutral-300'
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-navy block">
                      {currentLanguage === 'th' ? item.labelTh : item.labelEn}
                    </span>
                    <span className="text-xs text-charcoal mt-1 font-mono block">
                      {t.calcRate}: {formatCurrency(item.rate)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.key, -1)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-charcoal border border-neutral-200/60 hover:border-neutral-400 hover:text-navy transition-all ${
                        qty === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:scale-95'
                      }`}
                      disabled={qty === 0}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    
                    <span className="w-8 text-center font-display text-base font-bold text-navy font-mono">
                      {qty}
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.key, 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal border border-neutral-200/60 hover:border-neutral-400 hover:text-navy transition-all cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Days selector */}
          <div className="mt-6 pt-5 border-t border-neutral-200/60">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-navy flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span>{currentLanguage === 'th' ? '2. จำนวนวันที่จัดกิจกรรม' : '2. Campaign Duration (Days)'}</span>
              </label>
              <span className="text-sm font-bold text-accent font-mono bg-accent/5 px-3 py-1 rounded-md border border-accent/10">
                {days} {currentLanguage === 'th' ? 'วัน' : 'Days'}
              </span>
            </div>
            
            <input
              type="range"
              min="1"
              max="30"
              value={days}
              onChange={(e) => handleDaysChange(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200/60 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
              <span>1 Day</span>
              <span>10 Days</span>
              <span>20 Days</span>
              <span>30 Days</span>
            </div>
          </div>
        </div>

        {/* Right column: Results & Apply */}
        <div className="lg:col-span-5 bg-off-white rounded-xl border border-neutral-200/60 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="font-display text-xs font-semibold text-charcoal uppercase tracking-wider">
              {currentLanguage === 'th' ? 'สรุปข้อมูลประเมินราคา' : 'Estimated Pricing Summary'}
            </h4>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-neutral-200/60 shadow-sm">
                <span className="text-xs text-charcoal block">
                  {t.calcTotalStaff}
                </span>
                <span className="text-2xl font-bold text-navy font-mono mt-1 block flex items-center gap-2">
                  <Users className="w-5 h-5 text-neutral-400" />
                  {totalStaff}
                </span>
              </div>

              <div className="p-4 bg-white rounded-lg border border-neutral-200/60 shadow-sm">
                <span className="text-xs text-charcoal block">
                  {t.calcTotalDays}
                </span>
                <span className="text-2xl font-bold text-navy font-mono mt-1 block flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-neutral-400" />
                  {days}
                </span>
              </div>
            </div>

            {/* Total price Display */}
            <div className="py-6 border-y border-neutral-200/60">
              <span className="text-xs text-charcoal block uppercase tracking-wider mb-1">
                {t.calcEstTotal}
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-accent font-mono block">
                {formatCurrency(estimatedTotal)}
              </span>
              <span className="text-[10px] text-neutral-400 mt-2 block leading-normal">
                * {currentLanguage === 'th' 
                  ? 'ราคานี้เป็นค่าจ้างสตาฟเฉลี่ยโดยประมาณ ไม่รวมค่าดำเนินการจัดหา ประสานงาน ประกันภัย และภาษีมูลค่าเพิ่ม' 
                  : 'This is an estimated average staffing cost. Excludes vetting coordination, logistics, insurance, and VAT.'}
              </span>
            </div>

            {/* Staff details list */}
            {totalStaff > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-charcoal block">
                  {currentLanguage === 'th' ? 'ทีมบุคลากรที่คุณเลือก:' : 'Your Selected Crew:'}
                </span>
                <div className="max-h-28 overflow-y-auto space-y-1.5 pr-2">
                  {STAFF_CALC_RATES.map(item => {
                    const qty = quantities[item.key] || 0;
                    if (qty === 0) return null;
                    return (
                      <div key={item.key} className="flex justify-between items-center text-xs">
                        <span className="text-charcoal">
                          {currentLanguage === 'th' ? item.labelTh.split(' / ')[0] : item.labelEn.split(' / ')[0]}
                        </span>
                        <span className="text-navy font-semibold font-mono">
                          x{qty}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleApply}
              disabled={totalStaff === 0}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 shadow-sm ${
                totalStaff === 0
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
                  : hasApplied
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-accent hover:bg-accent-hover text-navy font-bold shadow-md cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {hasApplied ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" />
                  <span>{currentLanguage === 'th' ? 'ส่งประเมินราคาไปยังแบบฟอร์มแล้ว!' : 'Details Applied to Form!'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.calcApplyForm}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
