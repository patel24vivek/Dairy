import React, { useState } from 'react';
import HerdMasterView from './components/HerdMasterView.jsx';
import DailyMilkSheetView from './components/DailyMilkSheetView.jsx';
import ExpenseManagementView from './components/ExpenseManagementView.jsx';
import MilkSalesDispatchView from './components/MilkSalesDispatchView.jsx';
import { 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Search, 
  Bell, 
  Settings, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Snowflake, 
  FileText, 
  Heart, 
  Boxes, 
  IndianRupee, 
  Printer, 
  ArrowRight, 
  Calendar,
  X,
  Calculator,
  LayoutDashboard,
  Users,
  Droplets,
  HeartPulse,
  PanelLeftClose,
  PanelLeftOpen,
  Wifi,
  Shield,
  Receipt
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedDayIdx, setSelectedDayIdx] = useState(6); // Default to Oct 27 (Today)
  const [expandedBuffalo, setExpandedBuffalo] = useState(104);
  const [activeShift, setActiveShift] = useState('AM');
  const [milkSubView, setMilkSubView] = useState('sheet'); // 'sheet' (physical format) or 'profiles'
  
  // Modals state
  const [showQuickLogModal, setShowQuickLogModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showStripTestModal, setShowStripTestModal] = useState(false);

  // Dynamic Two-Axis Pricing Calculator state
  const [calcFat, setCalcFat] = useState(7.8);
  const [calcSnf, setCalcSnf] = useState(9.0);
  const [rateFat, setRateFat] = useState(700);
  const [rateSnf, setRateSnf] = useState(350);

  const calculatedPricePerLiter = (
    (calcFat / 100) * rateFat + (calcSnf / 100) * rateSnf
  ).toFixed(2);

  // Navigation Items
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, target: '#top-dashboard', badge: null },
    { id: 'Buffalo Management', label: 'Buffalo Management', icon: Shield, target: null, badge: '64 Head' },
    { id: 'Daily Milk Collection', label: 'Daily Milk Collection', icon: Droplets, target: null, badge: 'Daily Sheet' },
    { id: 'Milk Sales & Dispatch', label: 'Milk Sales & Dispatch', icon: IndianRupee, target: null, badge: 'Buyers' },
    { id: 'Expense Management', label: 'Expense Management', icon: Receipt, target: null, badge: 'OPEX' },
    { id: 'Shift Milking', label: 'Shed Shift Milking', icon: Activity, target: '#shift-milking', badge: 'AM' },
    { id: 'Food & OPEX', label: 'Feed & OPEX', icon: Boxes, target: '#feed-runway', badge: 'Alert' },
    { id: 'Breeding & Health', label: 'Breeding & Health', icon: HeartPulse, target: '#breeding-health', badge: '3' },
  ];

  // Last 7 days collection synced with DailyMilkSheetView (Oct 21 – Oct 27, 2026)
  const weekData = [
    { day: 'W', dateLabel: '21 Oct', yieldL: 471.1, buffaloL: 261.7, cowL: 209.4, amL: 252.6, pmL: 218.5, rev: 34547 },
    { day: 'T', dateLabel: '22 Oct', yieldL: 474.0, buffaloL: 267.4, cowL: 206.6, amL: 253.2, pmL: 220.8, rev: 34858 },
    { day: 'F', dateLabel: '23 Oct', yieldL: 476.9, buffaloL: 273.1, cowL: 203.8, amL: 253.8, pmL: 223.1, rev: 35646 },
    { day: 'S', dateLabel: '24 Oct', yieldL: 471.2, buffaloL: 263.8, cowL: 207.4, amL: 252.4, pmL: 218.8, rev: 34603 },
    { day: 'S', dateLabel: '25 Oct', yieldL: 474.1, buffaloL: 269.5, cowL: 204.6, amL: 253.0, pmL: 221.1, rev: 34914 },
    { day: 'M', dateLabel: '26 Oct', yieldL: 477.0, buffaloL: 275.2, cowL: 201.8, amL: 253.6, pmL: 223.4, rev: 35702 },
    { day: 'T', dateLabel: '27 Oct', yieldL: 480.1, buffaloL: 265.9, cowL: 214.2, amL: 252.2, pmL: 227.9, rev: 35188 },
  ];
  const activeDayData = weekData[selectedDayIdx] || weekData[6];

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    if (
      item.id !== 'Daily Milk Collection' &&
      item.id !== 'Buffalo Management' &&
      item.id !== 'Expense Management' &&
      item.id !== 'Milk Sales & Dispatch' &&
      item.target
    ) {
      setTimeout(() => {
        const el = document.querySelector(item.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <div className="w-full h-full bg-[#F3F5F7] rounded-[32px] p-3 sm:p-5 shadow-2xl border border-white/80 flex flex-col lg:flex-row gap-5 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* LEFT STICKY SIDEBAR (DOES NOT SCROLL WITH PAGE) */}
      {/* ========================================================================= */}
      <aside 
        className={`bg-white rounded-[24px] border border-slate-200/80 shadow-sm flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 h-full overflow-hidden ${
          isSidebarCollapsed ? 'w-20 p-3 items-center' : 'w-full lg:w-64 p-5'
        }`}
      >
        {/* Top: Logo & Toggle */}
        <div className="w-full">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center flex-col gap-3' : 'justify-between'} pb-4 border-b border-slate-100`}>
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E65100] to-[#FF5722] flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
                <span className="font-extrabold text-lg">K</span>
              </div>
              {!isSidebarCollapsed && (
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-slate-900">KALP</span>
                    <span className="bg-[#FF5722] text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">OS</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Enterprise v2.4</p>
                </div>
              )}
            </div>

            {/* Collapse Toggle */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={isSidebarCollapsed ? "Expand Menu" : "Collapse Menu"}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-slate-600" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-4 space-y-1 w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`group relative w-full flex items-center gap-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                    isSidebarCollapsed 
                      ? 'justify-center p-3 h-11' 
                      : 'px-3.5 py-2.5'
                  } ${
                    isActive
                      ? 'bg-[#181A1E] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`} />

                  {!isSidebarCollapsed && (
                    <>
                      <span className="truncate flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : item.badge === 'Alert'
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {/* Tooltip in collapsed mode */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#181A1E] text-white text-xs font-semibold rounded-xl shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile / Status */}
        <div className="w-full pt-3 border-t border-slate-100">
          {!isSidebarCollapsed ? (
            <div className="space-y-2">
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-bold text-emerald-800">IoT Online</span>
                </div>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              </div>

              <div className="flex items-center gap-2.5 p-1 rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                  alt="Vivek Patel"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200 shrink-0"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 truncate">Vivek Patel</p>
                  <p className="text-[10px] text-slate-400">Admin</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" title="IoT Online"></span>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                alt="Vivek Patel"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                title="Vivek Patel (Admin)"
              />
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* RIGHT MAIN CONTENT AREA (INDEPENDENTLY SCROLLABLE) */}
      {/* ========================================================================= */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto pr-1 sm:pr-3 space-y-6 scrollbar-thin scroll-smooth">
        
        {/* Sticky Minimal Header */}
        <header className="sticky top-0 z-20 bg-[#F3F5F7]/95 backdrop-blur-sm pt-1 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/70">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>
                {activeTab === 'Buffalo Management' 
                  ? 'Buffalo Management & Dossier' 
                  : activeTab === 'Daily Milk Collection' 
                    ? 'Daily Milk Collection & Monthly Sheet' 
                    : activeTab === 'Milk Sales & Dispatch'
                      ? 'Milk Sales, Buyers & Dispatch Ledger'
                      : activeTab === 'Expense Management'
                        ? 'Farm Expense Management & Ledger'
                        : 'Producer Dairy Cockpit'}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {activeTab === 'Buffalo Management' 
                  ? '64 Animals' 
                  : activeTab === 'Daily Milk Collection' 
                    ? 'Monthly Register' 
                    : activeTab === 'Milk Sales & Dispatch'
                      ? 'Buyers & Offtake'
                      : activeTab === 'Expense Management'
                        ? 'Live OPEX & P&L'
                        : 'Own Production'}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Search Pill */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white pl-8 pr-3 py-1.5 rounded-full text-xs text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none w-36 sm:w-48 shadow-sm"
              />
            </div>

            {/* Date Pill */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 border border-slate-200 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>27 Oct 2026</span>
            </div>

            <button className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm relative hover:bg-slate-50">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#FF5722] absolute top-1 right-1 ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {activeTab === 'Buffalo Management' ? (
          <HerdMasterView />
        ) : activeTab === 'Daily Milk Collection' ? (
          <DailyMilkSheetView />
        ) : activeTab === 'Milk Sales & Dispatch' ? (
          <MilkSalesDispatchView />
        ) : activeTab === 'Expense Management' ? (
          <ExpenseManagementView />
        ) : (
          <div className="space-y-6">

        {/* ======================================================================= */}
        {/* TOP EXECUTIVE SYNC STRIP (DAILY MILK COLLECTION + FARM EXPENSE LEDGER)  */}
        {/* ======================================================================= */}
        <div id="top-dashboard" className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Monthly Milk Collection */}
          <div 
            onClick={() => setActiveTab('Daily Milk Collection')}
            className="bg-white rounded-[22px] p-4 sm:p-5 shadow-sm border border-slate-200/80 hover:border-orange-300 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E65100] to-[#FF5722]"></div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Oct 2026 Milk Collection</span>
              <span className="p-1.5 rounded-xl bg-orange-50 text-[#E65100] group-hover:scale-105 transition-transform">
                <Droplets className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              12,817.0 L
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
              <span className="bg-orange-50 text-orange-800 px-2 py-0.5 rounded-md border border-orange-200/60">🐃 7,239.6 L</span>
              <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md border border-blue-200/60">🐄 5,577.4 L</span>
            </div>
          </div>

          {/* Card 2: Gross Milk Sales Revenue */}
          <div 
            onClick={() => setActiveTab('Milk Sales & Dispatch')}
            className="bg-white rounded-[22px] p-4 sm:p-5 shadow-sm border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Gross Milk Revenue (Oct)</span>
              <span className="p-1.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-105 transition-transform">
                <IndianRupee className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              ₹9,44,358
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">🐃 ₹84/L • 🐄 ₹60/L</span>
              <span className="text-blue-700">Today: ₹35,188</span>
            </div>
          </div>

          {/* Card 3: Total Farm OPEX */}
          <div 
            onClick={() => setActiveTab('Expense Management')}
            className="bg-white rounded-[22px] p-4 sm:p-5 shadow-sm border border-slate-200/80 hover:border-rose-300 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 to-red-500"></div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Farm OPEX (Oct)</span>
              <span className="p-1.5 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-105 transition-transform">
                <Receipt className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-rose-700 mt-2 tracking-tight">
              ₹2,24,799
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
              <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md border border-rose-200/60">17 Bills Paid</span>
              <span className="text-slate-500">Feed 43.6% • Labor 30.9%</span>
            </div>
          </div>

          {/* Card 4: Net Farm Profit */}
          <div 
            onClick={() => setActiveTab('Expense Management')}
            className="bg-white rounded-[22px] p-4 sm:p-5 shadow-sm border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Net Farm Profit (Oct)</span>
              <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-700 mt-2 tracking-tight">
              +₹7,19,559
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
              <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200/60">76.2% Margin</span>
              <span className="text-slate-500">FY26: +₹95.92L</span>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* ROW 1: DAILY MILK COLLECTION TRACKER & TOP PRODUCERS                    */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Left: Daily Milk Collection & Monthly Sheet Sync (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#E65100]" />
                  <h2 className="text-base font-bold text-slate-900">Daily Milk Collection Tracker</h2>
                  <span className="bg-orange-50 text-[#E65100] text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200/60">
                    {activeDayData.dateLabel} 2026
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('Daily Milk Collection')}
                  className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  <span>Open Monthly Sheet</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Big Stat synced with DailyMilkSheetView */}
                <div className="sm:col-span-5 space-y-2">
                  <div>
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {activeDayData.yieldL} L
                    </span>
                    <span className="ml-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ₹{activeDayData.rev.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Combined Herd (92 Head) • {activeDayData.dateLabel}
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between bg-orange-50/70 border border-orange-200/70 px-2.5 py-1.5 rounded-xl text-[11px]">
                      <span className="font-bold text-orange-950">🐃 Buffalo (64)</span>
                      <span className="font-black text-[#E65100]">{activeDayData.buffaloL} L • 7.8% Fat</span>
                    </div>
                    <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200/70 px-2.5 py-1.5 rounded-xl text-[11px]">
                      <span className="font-bold text-blue-950">🐄 Cow (28)</span>
                      <span className="font-black text-blue-700">{activeDayData.cowL} L • 4.4% Fat</span>
                    </div>
                  </div>
                </div>

                {/* 7-Day Interactive Collection Chart (Oct 21 – Oct 27) */}
                <div className="sm:col-span-7 flex items-end justify-between px-2 pt-7 pb-1 relative h-40 bg-slate-50/70 rounded-2xl border border-slate-200/60">
                  {weekData.map((item, idx) => {
                    const isSelected = idx === selectedDayIdx;
                    const heightPercent = Math.round(((item.yieldL - 440) / 50) * 100);

                    return (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedDayIdx(idx)}
                        className="flex flex-col items-center relative group cursor-pointer flex-1 h-full justify-end"
                      >
                        <div className={`mb-1 px-1.5 py-0.5 rounded text-[9px] font-black transition-all ${
                          isSelected 
                            ? 'bg-[#181A1E] text-white shadow-xs scale-105' 
                            : 'text-slate-500 opacity-0 group-hover:opacity-100 bg-white border border-slate-200'
                        }`}>
                          {item.yieldL}L
                        </div>
                        <div 
                          className={`w-3 sm:w-4 rounded-t-lg transition-all ${
                            isSelected 
                              ? 'bg-gradient-to-t from-[#E65100] to-[#FF5722] shadow-sm' 
                              : 'bg-slate-300 group-hover:bg-slate-400'
                          }`}
                          style={{ height: `${Math.max(heightPercent, 25)}%` }}
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedDayIdx(idx)}
                          className={`mt-2 px-1.5 py-0.5 rounded-lg text-[10px] font-extrabold flex flex-col items-center leading-tight ${
                            isSelected ? 'bg-[#181A1E] text-white shadow-xs' : 'text-slate-500 hover:bg-slate-200/70'
                          }`}
                        >
                          <span>{item.dateLabel.split(' ')[0]}</span>
                          <span className="text-[8px] opacity-75">Oct</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
              <span>
                Shift Sync ({activeDayData.dateLabel}): <strong className="text-amber-700">☀️ AM ({activeDayData.amL} L)</strong> + <strong className="text-indigo-700">🌙 PM ({activeDayData.pmL} L)</strong>
              </span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Oct Avg: 474.7 L/day (27 Days Logged)
              </span>
            </div>
          </div>

          {/* Right: Top Producing Buffaloes (5 Cols) */}
          <div id="top-producing" className="lg:col-span-5 bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900">Top Producers</h2>
                <button 
                  onClick={() => setActiveTab('Buffalo Management')}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-900 flex items-center gap-0.5 cursor-pointer transition-colors"
                >
                  See all <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5">
                {/* Buffalo #104 */}
                <div className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/50">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedBuffalo(expandedBuffalo === 104 ? null : 104)}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FF5722] text-white font-bold text-[11px] flex items-center justify-center">
                        #104
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-xs text-slate-900">Buffalo #104 (Murrah)</h3>
                          <span className="bg-[#181A1E] text-white text-[9px] font-semibold px-1.5 py-0.2 rounded-full">High</span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-800">16.2 L / day</p>
                      </div>
                    </div>
                    {expandedBuffalo === 104 ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                  </div>

                  {expandedBuffalo === 104 && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Lactation 3 • 62 DIM</span>
                      <span className="font-bold text-[#E65100]">Fat: 7.8%</span>
                      <span>Bay A</span>
                    </div>
                  )}
                </div>

                {/* Buffalo #078 (Drop Alert) */}
                <div 
                  className="border border-amber-200 bg-amber-50/50 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-amber-100/50"
                  onClick={() => setShowStripTestModal(true)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#181A1E] text-white font-bold text-[11px] flex items-center justify-center">
                      #078
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-slate-900">Buffalo #078 (Mehsani)</h4>
                        <span className="bg-amber-200 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded-full">Drop -24%</span>
                      </div>
                      <p className="text-xs text-amber-900 font-semibold">5.5 L (Check Udder)</p>
                    </div>
                  </div>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                </div>

                {/* Buffalo #112 */}
                <div className="border border-slate-200/80 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-500 text-white font-bold text-[11px] flex items-center justify-center">
                      #112
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Buffalo #112 (Banni)</h4>
                      <p className="text-xs text-slate-700 font-semibold">15.8 L / day</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">Stable</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* ROW 2: SHED MILKERS & LABOR, FEED OPEX STATUS, HERD BREAKDOWN           */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Milkers & Labor (Synced with Labor & Wages ₹69,400) */}
          <div className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Shed Milkers & Staff</h3>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">₹69,400 / mo</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80" 
                      alt="Rameshbhai" 
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <p className="font-bold text-xs text-slate-900">Rameshbhai & Team</p>
                      <p className="text-[10px] text-slate-400">Daily Labour for Cutting Charo • ₹14,400</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('Expense Management')} className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600" title="View in Expense Ledger">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80" 
                      alt="Sureshbhai" 
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <p className="font-bold text-xs text-slate-900">Sureshbhai & 4 Milkers</p>
                      <p className="text-[10px] text-slate-400">Monthly Staff Salary • ₹55,000</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('Expense Management')} className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600" title="View in Expense Ledger">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
              <span>30.9% of Monthly OPEX</span>
              <span className="text-emerald-700 font-bold">4 Bills Paid</span>
            </div>
          </div>

          {/* 2. Feed & Fodder OPEX Summary (Synced with Feed & Fodder ₹97,900) */}
          <div className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-amber-700 uppercase">Top Cost Center (43.6%)</span>
                </div>
                <span className="text-xs font-black text-amber-800">₹97,900</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2">Feed & Fodder (ખોરાક અને ભૂસું)</h3>
              <p className="text-xs text-slate-600 mt-1">
                Khod-Bhusu (<strong className="text-slate-900">₹34,000</strong>), Tuver Chunni (<strong className="text-slate-900">₹37,000</strong>) &amp; Charo (<strong className="text-slate-900">₹24,500</strong>).
              </p>
            </div>

            <div className="mt-3">
              <button 
                onClick={() => setActiveTab('Expense Management')}
                className="w-full bg-[#181A1E] hover:bg-slate-800 text-white font-semibold text-xs py-2 px-3 rounded-xl flex items-center justify-between transition-colors shadow-sm cursor-pointer"
              >
                <span>Manage Feed Expenses</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 3. Herd Lactation Breakdown */}
          <div className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Herd Breakdown</h3>
                <span className="text-[10px] font-bold text-slate-500">64🐃 + 28🐄 = 92 Head</span>
              </div>

              <div className="grid grid-cols-3 gap-1 text-center py-2">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">In Milk</p>
                  <p className="text-xl font-extrabold text-slate-900">68</p>
                </div>
                <div className="border-x border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Dry</p>
                  <p className="text-xl font-extrabold text-slate-900">16</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Due</p>
                  <p className="text-xl font-extrabold text-slate-900">8</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 py-1.5">
                {[10, 16, 12, 18, 14, 20, 12, 16, 18, 10, 14, 20, 12, 18, 14, 16, 20, 12, 10, 16].map((h, i) => (
                  <div key={i} className={`w-1 rounded-full ${i >= 6 && i <= 11 ? 'bg-[#FF5722]' : 'bg-slate-800'}`} style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Today Rev: <strong className="text-slate-900">₹35,188</strong></span>
              <span className="text-emerald-600 font-bold">76.2% Margin</span>
              <span className="text-slate-700 font-bold">Avg: ₹73.7/L</span>
            </div>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* ROW 3: BULK MILK CHILLER (BMC) & TELEMETRY */}
        {/* ======================================================================= */}
        <div className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Snowflake className="w-4 h-4 text-sky-600" />
              <h3 className="font-bold text-sm text-slate-900">Bulk Milk Chiller (BMC) & Cold Chain</h3>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.2 rounded-full border border-emerald-200">
                Live IoT
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                CIP: 04:30 AM (Passed)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Chiller 1 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Chiller Unit #1</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">3.8°C</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 mt-2">840 L <span className="text-xs font-normal text-slate-400">/ 1,200 L</span></p>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '70%' }}></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Agitator: 18 RPM • 70% Full</p>
            </div>

            {/* Chiller 2 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Farm Chiller Unit #2</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.2 rounded">4.2°C</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 mt-2">420 L <span className="text-xs font-normal text-slate-400">/ 600 L</span></p>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#FF5722] h-full rounded-full" style={{ width: '70%' }}></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Evening Batch Holding • 70% Full</p>
            </div>

            {/* Quality Assay */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400">Acidity</span>
                  <p className="font-bold text-slate-800">0.13% LA</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">MBRT Time</span>
                  <p className="font-bold text-slate-800">&gt;6.5 Hrs</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">SCC</span>
                  <p className="font-bold text-slate-800">185k / ml</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Adulteration</span>
                  <p className="font-bold text-emerald-700">Clean</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs mt-2">
                <span className="text-slate-500">Spot Rate:</span>
                <span className="font-extrabold text-[#E65100]">₹83.97 / L</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* ROW 4: SHIFT MILKING OPERATOR SHEET */}
        {/* ======================================================================= */}
        <div id="shift-milking" className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-800" />
              <h3 className="font-bold text-sm text-slate-900">Shift Milking Sheet</h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-slate-100 p-0.5 rounded-full text-xs">
                <button 
                  onClick={() => setActiveShift('AM')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all ${
                    activeShift === 'AM' ? 'bg-[#181A1E] text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Morning AM
                </button>
                <button 
                  onClick={() => setActiveShift('PM')}
                  className={`px-3 py-1 rounded-full font-semibold transition-all ${
                    activeShift === 'PM' ? 'bg-[#181A1E] text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Evening PM
                </button>
              </div>

              <button 
                onClick={() => setShowQuickLogModal(true)}
                className="bg-[#FF5722] hover:bg-[#E65100] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" /> Log Animal
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 pb-2">
                  <th className="py-2">Tag</th>
                  <th className="py-2">Breed</th>
                  <th className="py-2">Yield</th>
                  <th className="py-2">Fat</th>
                  <th className="py-2">SNF</th>
                  <th className="py-2">Milker</th>
                  <th className="py-2">EC / Mastitis</th>
                  <th className="py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 font-bold text-slate-900">#MUR-104</td>
                  <td className="py-2.5 text-slate-600">Murrah (Bay A)</td>
                  <td className="py-2.5 font-bold text-slate-900">8.8 L</td>
                  <td className="py-2.5 text-slate-700">7.8%</td>
                  <td className="py-2.5 text-slate-700">9.2%</td>
                  <td className="py-2.5 text-slate-600">Ramesh K.</td>
                  <td className="py-2.5"><span className="text-emerald-700 font-semibold text-[11px]">4.3 mS/cm • Normal</span></td>
                  <td className="py-2.5 text-right"><span className="bg-[#181A1E] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">High</span></td>
                </tr>

                <tr className="bg-amber-50/50">
                  <td className="py-2.5 font-bold text-amber-950">#MEH-078</td>
                  <td className="py-2.5 text-slate-700">Mehsani (Bay B)</td>
                  <td className="py-2.5 font-bold text-amber-800">2.1 L <span className="text-[10px] text-red-600">(-31%)</span></td>
                  <td className="py-2.5 text-slate-700">6.9%</td>
                  <td className="py-2.5 text-slate-700">8.7%</td>
                  <td className="py-2.5 text-slate-700">Suresh Y.</td>
                  <td className="py-2.5"><span className="text-amber-900 font-bold text-[11px]">6.9 mS/cm • Suspect</span></td>
                  <td className="py-2.5 text-right">
                    <button onClick={() => setShowStripTestModal(true)} className="bg-[#FF5722] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Strip Test
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 font-bold text-slate-900">#BAN-112</td>
                  <td className="py-2.5 text-slate-600">Banni (Bay A)</td>
                  <td className="py-2.5 font-bold text-slate-900">8.2 L</td>
                  <td className="py-2.5 text-slate-700">8.1%</td>
                  <td className="py-2.5 text-slate-700">9.4%</td>
                  <td className="py-2.5 text-slate-600">Ramesh K.</td>
                  <td className="py-2.5"><span className="text-emerald-700 font-semibold text-[11px]">4.7 mS/cm • Normal</span></td>
                  <td className="py-2.5 text-right"><span className="bg-sky-100 text-sky-800 text-[9px] font-bold px-2 py-0.5 rounded-full">Optimal</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-[11px] text-slate-600">
            <span>Buckets Total: <strong className="text-slate-900">248.5 L</strong> | Bulk Tank: <strong className="text-slate-900">247.2 L</strong></span>
            <span className="font-semibold text-emerald-700">Variance: -1.3 L (-0.52%) OK</span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* ROW 5: BREEDING & FEED RUNWAY */}
        {/* ======================================================================= */}
        <div id="breeding-health" className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Breeding */}
          <div className="lg:col-span-6 bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <h3 className="font-bold text-sm text-slate-900">Breeding & Vet Protocols</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Compliance: 98%</span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">#119 (Banni)</span>
                    <span className="ml-2 bg-orange-100 text-orange-800 text-[9px] font-bold px-1.5 py-0.2 rounded">60d PD Due</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Semen: Elite Murrah RM-72</p>
                  </div>
                  <button className="text-[10px] font-bold bg-white border border-slate-300 px-2.5 py-1 rounded-lg hover:bg-slate-100">Confirm</button>
                </div>

                <div className="p-2.5 bg-rose-50/50 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">#042 (Murrah)</span>
                    <span className="ml-2 bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Heat Detected</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Prime AI window: Next 8h</p>
                  </div>
                  <button className="text-[10px] font-bold bg-[#FF5722] text-white px-2.5 py-1 rounded-lg">AI Ready</button>
                </div>
              </div>
            </div>

            <p className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
              FMD Booster due for 14 heifers in 3 days
            </p>
          </div>

          {/* Feed & Fodder Spend Breakdown (Synced with ExpenseManagementView) */}
          <div id="feed-runway" className="lg:col-span-6 bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-amber-700" />
                  <h3 className="font-bold text-sm text-slate-900">Feed &amp; Fodder Ledger (ખોરાક અને ભૂસું)</h3>
                </div>
                <button 
                  onClick={() => setActiveTab('Expense Management')} 
                  className="text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200 cursor-pointer transition-colors"
                >
                  ₹97,900 Total →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                <div onClick={() => setActiveTab('Expense Management')} className="bg-slate-50 hover:bg-amber-50/40 p-2.5 rounded-xl border border-slate-200/60 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                    <span>Tuver Chunni (તુવેર ચૂની)</span>
                    <span className="text-amber-700 font-bold">2 Bills</span>
                  </div>
                  <p className="text-base font-extrabold text-slate-900 mt-1">₹37,000</p>
                </div>

                <div onClick={() => setActiveTab('Expense Management')} className="bg-slate-50 hover:bg-amber-50/40 p-2.5 rounded-xl border border-slate-200/60 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                    <span>Khod - Bhusu (ખોળ અને ભૂસું)</span>
                    <span className="text-blue-700 font-bold">20 Bags</span>
                  </div>
                  <p className="text-base font-extrabold text-slate-900 mt-1">₹34,000</p>
                </div>

                <div onClick={() => setActiveTab('Expense Management')} className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 cursor-pointer">
                  <div className="flex justify-between items-center text-[10px] text-amber-900 font-semibold">
                    <span>Bear Charo (બહારનો ચારો)</span>
                    <span className="bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded font-bold">Dry Fodder</span>
                  </div>
                  <p className="text-base font-extrabold text-slate-900 mt-1">₹16,000</p>
                </div>

                <div onClick={() => setActiveTab('Expense Management')} className="bg-slate-50 hover:bg-amber-50/40 p-2.5 rounded-xl border border-slate-200/60 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                    <span>Green Charo &amp; Sarso Tel</span>
                    <span className="text-emerald-700 font-bold">2 Bills</span>
                  </div>
                  <p className="text-base font-extrabold text-slate-900 mt-1">₹10,900</p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-[10px] text-slate-500 font-semibold">
              <span>Daily Labour for Cutting Charo: <strong className="text-slate-900">₹14,400 (3 Bills)</strong></span>
              <span className="text-amber-700 font-bold">43.6% of Farm OPEX</span>
            </div>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* ROW 6: FARM EXPENSE MANAGEMENT & MONTHLY P&L RECONCILIATION             */}
        {/* ======================================================================= */}
        <div id="sales-ledger" className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">Farm Expense Management &amp; P&amp;L Reconciliation</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    October 2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Live sync between Daily Milk Collection (₹9,44,358) and Farm Expense Ledger (₹2,24,799)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => setActiveTab('Daily Milk Collection')} 
                className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Droplets className="w-3.5 h-3.5 text-[#E65100]" /> Milk Sheet
              </button>
              <button 
                onClick={() => setActiveTab('Milk Sales & Dispatch')} 
                className="text-[11px] font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
              >
                <IndianRupee className="w-3.5 h-3.5 text-blue-600" /> Sales &amp; Buyers
              </button>
              <button 
                onClick={() => setActiveTab('Expense Management')} 
                className="text-[11px] font-bold text-white bg-[#181A1E] hover:bg-slate-800 px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
              >
                <Receipt className="w-3.5 h-3.5 text-emerald-400" /> Open Expense Ledger <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 4-Column Balanced Financial Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div 
              onClick={() => setActiveTab('Milk Sales & Dispatch')}
              className="bg-slate-50 hover:bg-blue-50/40 p-3.5 rounded-xl border border-slate-200/80 cursor-pointer transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Oct Gross Milk Sales</p>
                <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">🥛 Income</span>
              </div>
              <p className="text-lg font-black text-slate-900 mt-1.5">₹9,44,358</p>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">🐃 ₹6,09,196 • 🐄 ₹3,35,457</p>
            </div>

            <div 
              onClick={() => setActiveTab('Expense Management')}
              className="bg-rose-50/60 hover:bg-rose-50 p-3.5 rounded-xl border border-rose-200/80 cursor-pointer transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-rose-700 font-bold uppercase tracking-wider">Oct Total Farm OPEX</p>
                <span className="text-[10px] font-extrabold text-rose-700 bg-rose-100/80 px-1.5 py-0.5 rounded">🔻 17 Bills</span>
              </div>
              <p className="text-lg font-black text-rose-700 mt-1.5">₹2,24,799</p>
              <p className="text-[10px] text-rose-600 font-semibold mt-0.5">7 Cost Centers • All Paid</p>
            </div>

            <div 
              onClick={() => setActiveTab('Expense Management')}
              className="bg-emerald-50/70 hover:bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 cursor-pointer transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Oct Net Farm Profit</p>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">76.2% Margin</span>
              </div>
              <p className="text-lg font-black text-emerald-700 mt-1.5">+₹7,19,559</p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Sales − Operating Expenses</p>
            </div>

            <div 
              onClick={() => setActiveTab('Expense Management')}
              className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 cursor-pointer transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Whole Year 2026 Net</p>
                <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded">78.1% Margin</span>
              </div>
              <p className="text-lg font-black text-emerald-400 mt-1.5">+₹95,92,475</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Sales ₹1.22Cr − OPEX ₹26.83L</p>
            </div>
          </div>

          {/* 7 Cost Centers Strip synced with ExpenseManagementView */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
            {[
              { label: 'Feed & Fodder', gu: 'ખોરાક', amount: '₹97,900', pct: '43.6%', color: 'text-amber-700 bg-amber-50/70 border-amber-200/70' },
              { label: 'Labor & Wages', gu: 'મજૂરી', amount: '₹69,400', pct: '30.9%', color: 'text-indigo-700 bg-indigo-50/70 border-indigo-200/70' },
              { label: 'Loans & EMI', gu: 'હપ્તા', amount: '₹22,500', pct: '10.0%', color: 'text-purple-700 bg-purple-50/70 border-purple-200/70' },
              { label: 'Utilities', gu: 'લાઇટ/નેટ', amount: '₹19,949', pct: '8.9%', color: 'text-cyan-700 bg-cyan-50/70 border-cyan-200/70' },
              { label: 'Vet & Med', gu: 'તબીબી', amount: '₹6,100', pct: '2.7%', color: 'text-rose-700 bg-rose-50/70 border-rose-200/70' },
              { label: 'Diesel & Fuel', gu: 'ડીઝલ', amount: '₹4,750', pct: '2.1%', color: 'text-emerald-700 bg-emerald-50/70 border-emerald-200/70' },
              { label: 'Hardware', gu: 'સાધન', amount: '₹4,200', pct: '1.9%', color: 'text-orange-700 bg-orange-50/70 border-orange-200/70' },
            ].map((cat, i) => (
              <div 
                key={i}
                onClick={() => setActiveTab('Expense Management')}
                className={`p-2.5 rounded-xl border ${cat.color} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="truncate">{cat.label}</span>
                  <span className="opacity-80">{cat.pct}</span>
                </div>
                <p className="text-xs sm:text-sm font-black mt-1">{cat.amount}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
        )}

        {/* Footer */}
        <footer className="pt-2 pb-6 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
          <p>© 2026 KALP BUFFALO OS</p>
          <div className="flex gap-4">
            <span onClick={() => setShowPricingModal(true)} className="hover:text-slate-700 cursor-pointer text-orange-600 font-semibold">Pricing Calculator</span>
            <span className="hover:text-slate-700 cursor-pointer">Support</span>
          </div>
        </footer>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: PRICING MATRIX SIMULATOR */}
      {/* ========================================================================= */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setShowPricingModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <Calculator className="w-5 h-5 text-orange-600" />
              <h3 className="text-base font-bold text-slate-900">Two-Axis Quality Pricing</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Fat %</span>
                  <span className="text-orange-600 font-bold">{calcFat}%</span>
                </div>
                <input type="range" min="6.0" max="9.5" step="0.1" value={calcFat} onChange={(e) => setCalcFat(parseFloat(e.target.value))} className="w-full accent-[#FF5722]" />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>SNF %</span>
                  <span className="text-sky-600 font-bold">{calcSnf}%</span>
                </div>
                <input type="range" min="8.0" max="10.5" step="0.1" value={calcSnf} onChange={(e) => setCalcSnf(parseFloat(e.target.value))} className="w-full accent-sky-500" />
              </div>

              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 flex justify-between items-center">
                <span className="text-xs text-slate-600 font-medium">Realized Price:</span>
                <span className="text-xl font-extrabold text-[#E65100]">₹{calculatedPricePerLiter} / L</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: QUICK LOG ANIMAL */}
      {/* ========================================================================= */}
      {showQuickLogModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setShowQuickLogModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-4">Quick Log Yield</h3>

            <form onSubmit={(e) => { e.preventDefault(); setShowQuickLogModal(false); }} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Buffalo Tag</label>
                <select className="w-full border border-slate-300 rounded-xl p-2 bg-white font-medium">
                  <option>#MUR-104 (Murrah)</option>
                  <option>#BAN-112 (Banni)</option>
                  <option>#JAF-055 (Jaffarabadi)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Liters</label>
                  <input type="number" step="0.1" defaultValue="8.4" className="w-full border border-slate-300 rounded-xl p-2 font-bold" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Fat %</label>
                  <input type="number" step="0.1" defaultValue="7.6" className="w-full border border-slate-300 rounded-xl p-2 font-bold" />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#181A1E] text-white font-bold py-2.5 rounded-xl mt-2">
                Save Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: RESTOCK BUFFER */}
      {/* ========================================================================= */}
      {showRestockModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setShowRestockModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-4">Restock Feed</h3>

            <form onSubmit={(e) => { e.preventDefault(); setShowRestockModal(false); }} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Item</label>
                <select className="w-full border border-slate-300 rounded-xl p-2 bg-white font-medium">
                  <option>Mustard Cake (Khal)</option>
                  <option>Dry Wheat Straw (Bhusa)</option>
                  <option>Green Fodder (Napier)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Quantity (kg)</label>
                <input type="number" defaultValue="500" className="w-full border border-slate-300 rounded-xl p-2 font-bold" />
              </div>

              <button type="submit" className="w-full bg-[#FF5722] text-white font-bold py-2.5 rounded-xl mt-2">
                Add Stock
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: STRIP TEST ALERT */}
      {/* ========================================================================= */}
      {showStripTestModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setShowStripTestModal(false)} className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-2">Mastitis Protocol #078</h3>
            <p className="text-xs text-red-600 font-semibold mb-3">Yield dropped by 31% AM</p>

            <div className="space-y-2 text-xs text-slate-600">
              <p className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 font-medium">
                EC: <strong>6.9 mS/cm</strong> (Normal: 4.2). Rear-Left quarter suspect.
              </p>
              <div className="pt-2 flex gap-2">
                <button onClick={() => setShowStripTestModal(false)} className="flex-1 bg-slate-100 font-bold py-2 rounded-xl">Dismiss</button>
                <button onClick={() => setShowStripTestModal(false)} className="flex-1 bg-red-600 text-white font-bold py-2 rounded-xl">Withhold Milk</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
