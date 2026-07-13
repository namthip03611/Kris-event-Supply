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
    <div className="bg-[#12141c] rounded-2xl border border-gray-800 shadow-xl overflow-hidden" id="staff-calculator">
      {/* Calculator Header */}
      <div className="bg-gradient-to-r from-red-950/40 to-rose-950/20 p-6 sm:p-8 border-b border-gray-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-red-600/10 text-red-500 rounded-lg">
            <Calculator className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-xs uppercase tracking-widest text-red-400 font-semibold font-mono">
            Interactive Tool
          </span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
          {t.calcTitle}
        </h3>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed max-w-2xl">
          {t.calcSubtitle}
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Staff Sourcing list */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="font-display text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
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
                      ? 'border-red-500/30 bg-red-500/[0.02]'
                      : 'border-gray-800 bg-gray-900/20 hover:border-gray-700'
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-white block">
                      {currentLanguage === 'th' ? item.labelTh : item.labelEn}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 font-mono block">
                      {t.calcRate}: {formatCurrency(item.rate)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.key, -1)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white transition-all ${
                        qty === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:scale-95'
                      }`}
                      disabled={qty === 0}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    
                    <span className="w-8 text-center font-display text-base font-bold text-white font-mono">
                      {qty}
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.key, 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white transition-all cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Days selector */}
          <div className="mt-6 pt-5 border-t border-gray-800">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <span>{currentLanguage === 'th' ? '2. จำนวนวันที่จัดกิจกรรม' : '2. Campaign Duration (Days)'}</span>
              </label>
              <span className="text-sm font-bold text-red-500 font-mono bg-red-500/10 px-3 py-1 rounded-md border border-red-500/20">
                {days} {currentLanguage === 'th' ? 'วัน' : 'Days'}
              </span>
            </div>
            
            <input
              type="range"
              min="1"
              max="30"
              value={days}
              onChange={(e) => handleDaysChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
              <span>1 Day</span>
              <span>10 Days</span>
              <span>20 Days</span>
              <span>30 Days</span>
            </div>
          </div>
        </div>

        {/* Right column: Results & Apply */}
        <div className="lg:col-span-5 bg-gray-900/40 rounded-xl border border-gray-800/80 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="font-display text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {currentLanguage === 'th' ? 'สรุปข้อมูลประเมินราคา' : 'Estimated Pricing Summary'}
            </h4>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#12141c]/50 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-500 block">
                  {t.calcTotalStaff}
                </span>
                <span className="text-2xl font-bold text-white font-mono mt-1 block flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  {totalStaff}
                </span>
              </div>

              <div className="p-4 bg-[#12141c]/50 rounded-lg border border-gray-800">
                <span className="text-xs text-gray-500 block">
                  {t.calcTotalDays}
                </span>
                <span className="text-2xl font-bold text-white font-mono mt-1 block flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  {days}
                </span>
              </div>
            </div>

            {/* Total price Display */}
            <div className="py-6 border-y border-gray-800">
              <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">
                {t.calcEstTotal}
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent font-mono block">
                {formatCurrency(estimatedTotal)}
              </span>
              <span className="text-[10px] text-gray-500 mt-2 block leading-normal">
                * {currentLanguage === 'th' 
                  ? 'ราคานี้เป็นค่าจ้างสตาฟเฉลี่ยโดยประมาณ ไม่รวมค่าดำเนินการจัดหา ประสานงาน ประกันภัย และภาษีมูลค่าเพิ่ม' 
                  : 'This is an estimated average staffing cost. Excludes vetting coordination, logistics, insurance, and VAT.'}
              </span>
            </div>

            {/* Staff details list */}
            {totalStaff > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400 block">
                  {currentLanguage === 'th' ? 'ทีมบุคลากรที่คุณเลือก:' : 'Your Selected Crew:'}
                </span>
                <div className="max-h-28 overflow-y-auto space-y-1.5 pr-2">
                  {STAFF_CALC_RATES.map(item => {
                    const qty = quantities[item.key] || 0;
                    if (qty === 0) return null;
                    return (
                      <div key={item.key} className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">
                          {currentLanguage === 'th' ? item.labelTh.split(' / ')[0] : item.labelEn.split(' / ')[0]}
                        </span>
                        <span className="text-white font-semibold font-mono">
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
              className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg ${
                totalStaff === 0
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none'
                  : hasApplied
                  ? 'bg-emerald-600 text-white shadow-emerald-950/20'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/30 hover:shadow-red-500/20 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0'
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
