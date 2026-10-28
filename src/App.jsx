import React, { useState } from 'react';
import HerdMasterView from './components/HerdMasterView.jsx';
import DailyMilkSheetView from './components/DailyMilkSheetView.jsx';
import ExpenseManagementView from './components/ExpenseManagementView.jsx';
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
  const [activeDay, setActiveDay] = useState('T'); // Thursday
  const [expandedBuffalo, setExpandedBuffalo] = useState(104);
  const [activeShift, setActiveShift] = useState('AM');
  const [milkSubView, setMilkSubView] = useState('sheet'); // 'sheet' (physical format) or 'profiles'
  
  // Modals state
  const [showQuickLogModal, setShowQuickLogModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showStripTestModal, setShowStripTestModal] = useState(false);

  // Dynamic Two-Axis Pricing Calculator state
  const [calcFat, setCalcFat] = useState(7.5);
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
    { id: 'Expense Management', label: 'Expense Management', icon: Receipt, target: null, badge: 'OPEX' },
    { id: 'Shift Milking', label: 'Shed Shift Milking', icon: Activity, target: '#shift-milking', badge: 'AM' },
    { id: 'Milk Sales & Dispatch', label: 'Milk Sales & Dispatch', icon: IndianRupee, target: '#sales-ledger', badge: null },
    { id: 'Food & OPEX', label: 'Feed & OPEX', icon: Boxes, target: '#feed-runway', badge: 'Alert' },
    { id: 'Breeding & Health', label: 'Breeding & Health', icon: HeartPulse, target: '#breeding-health', badge: '3' },
  ];

  // 7-day yield data
  const weekData = [
    { day: 'S', yieldL: 210 },
    { day: 'M', yieldL: 235 },
    { day: 'T', yieldL: 242 },
    { day: 'W', yieldL: 255 },
    { day: 'T', yieldL: 268, active: true },
    { day: 'F', yieldL: 248 },
    { day: 'S', yieldL: 240 },
  ];

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    if (item.id !== 'Daily Milk Collection' && item.id !== 'Buffalo Management' && item.id !== 'Expense Management' && item.target) {
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
                    : activeTab === 'Expense Management'
                      ? 'Farm Expense Management & Ledger'
                      : 'Producer Dairy Cockpit'}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {activeTab === 'Buffalo Management' 
                  ? '64 Animals' 
                  : activeTab === 'Daily Milk Collection' 
                    ? 'Monthly Register' 
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
        ) : activeTab === 'Expense Management' ? (
          <ExpenseManagementView />
        ) : (
          <div className="space-y-6">

        {/* ======================================================================= */}
        {/* ROW 1: YIELD TRACKER & TOP PRODUCERS */}
        {/* ======================================================================= */}
        <div id="top-dashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Left: Milk Yield Tracker (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-700" />
                  <h2 className="text-base font-bold text-slate-900">Milk Yield Tracker</h2>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 cursor-pointer">
                  <span>Week</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Big Stat */}
                <div className="sm:col-span-5 space-y-1.5">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">+4.2%</span>
                  <p className="text-xs text-slate-500 font-medium">485.5 L Today</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">Fat: 7.42%</span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">SNF: 9.15%</span>
                    <span className="bg-orange-50 text-[#E65100] px-2 py-0.5 rounded text-[10px] font-bold">Avg: 11.6 L/hd</span>
                  </div>
                </div>

                {/* Lollipop Chart */}
                <div className="sm:col-span-7 flex items-end justify-between px-2 pt-6 pb-1 relative h-36">
                  {weekData.map((item, idx) => {
                    const isSelected = item.active;
                    const heightPercent = Math.round((item.yieldL / 280) * 100);

                    return (
                      <div key={idx} className="flex flex-col items-center relative group">
                        {isSelected && (
                          <div className="absolute -top-6 bg-[#181A1E] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                            268 L
                          </div>
                        )}
                        <div 
                          className="w-0.5 bg-slate-300 relative flex justify-center cursor-pointer"
                          style={{ height: `${heightPercent}%` }}
                        >
                          <div className={`w-2 h-2 rounded-full absolute -top-1 ${
                            isSelected ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-sky-400'
                          }`} />
                        </div>
                        <button
                          onClick={() => setActiveDay(item.day)}
                          className={`mt-2.5 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${
                            isSelected ? 'bg-[#181A1E] text-white shadow-sm' : 'text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          {item.day}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Shift Sync: AM (248.5 L) + PM (237.0 L)</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Reconciled
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
        {/* ROW 2: ACTIVE MILKERS, BUFFER ALERT, LACTATION */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Milkers */}
          <div className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Shed Milkers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80" 
                      alt="Ramesh Kumar" 
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <p className="font-bold text-xs text-slate-900">Ramesh Kumar</p>
                      <p className="text-[10px] text-slate-400">Head • Shed A</p>
                    </div>
                  </div>
                  <button onClick={() => setShowQuickLogModal(true)} className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80" 
                      alt="Suresh Yadav" 
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <p className="font-bold text-xs text-slate-900">Suresh Yadav</p>
                      <p className="text-[10px] text-slate-400">Evening • Shed B</p>
                    </div>
                  </div>
                  <button onClick={() => setShowQuickLogModal(true)} className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
              <span>Next Shift: 05:30 PM</span>
              <span className="text-slate-700">4 Active</span>
            </div>
          </div>

          {/* 2. Feed Buffer Alert */}
          <div className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-red-600 uppercase">Critical Inventory</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2">Feed Buffer Depleting</h3>
              <p className="text-xs text-slate-600 mt-1">
                Mustard Cake (Khal) at <strong className="text-red-600">3 days buffer</strong>.
              </p>
            </div>

            <div className="mt-3">
              <button 
                onClick={() => setShowRestockModal(true)}
                className="w-full bg-[#181A1E] hover:bg-slate-800 text-white font-semibold text-xs py-2 px-3 rounded-xl flex items-center justify-between transition-colors shadow-sm"
              >
                <span>Restock Buffer</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 3. Herd Lactation Breakdown */}
          <div className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Herd Breakdown</h3>
                <span className="text-[10px] text-slate-400">Total: 64</span>
              </div>

              <div className="grid grid-cols-3 gap-1 text-center py-2">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">In Milk</p>
                  <p className="text-xl font-extrabold text-slate-900">42</p>
                </div>
                <div className="border-x border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Dry</p>
                  <p className="text-xl font-extrabold text-slate-900">14</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Due</p>
                  <p className="text-xl font-extrabold text-slate-900">6</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-1 py-1.5">
                {[10, 16, 12, 18, 14, 20, 12, 16, 18, 10, 14, 20, 12, 18, 14, 16, 20, 12, 10, 16].map((h, i) => (
                  <div key={i} className={`w-1 rounded-full ${i >= 6 && i <= 11 ? 'bg-[#FF5722]' : 'bg-slate-800'}`} style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Net: <strong className="text-slate-900">₹4,820</strong></span>
              <span className="text-emerald-600 font-bold">+₹9.93/L</span>
              <span className="text-slate-700 font-bold">IOFC: ₹18.5k</span>
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

          {/* Feed Runway */}
          <div id="feed-runway" className="lg:col-span-6 bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-amber-700" />
                  <h3 className="font-bold text-sm text-slate-900">Feed Stock Runway</h3>
                </div>
                <button onClick={() => setShowRestockModal(true)} className="text-[10px] font-bold text-slate-700 hover:text-slate-900">
                  + Restock
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                    <span>Green Napier</span>
                    <span className="text-emerald-700 font-bold">5.8d</span>
                  </div>
                  <p className="text-base font-extrabold text-slate-900 mt-1">1,450 kg</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                    <span>Dry Bhusa</span>
                    <span className="text-blue-700 font-bold">4.1d</span>
                  </div>
                  <p className="text-base font-extrabold text-slate-900 mt-1">820 kg</p>
                </div>

                <div onClick={() => setShowRestockModal(true)} className="bg-amber-50 p-2.5 rounded-xl border border-amber-300 cursor-pointer">
                  <div className="flex justify-between items-center text-[10px] text-amber-900 font-semibold">
                    <span>Mustard Khal</span>
                    <span className="bg-red-500 text-white px-1.5 py-0.2 rounded font-bold">2.4d Alert</span>
                  </div>
                  <p className="text-base font-extrabold text-slate-900 mt-1">340 kg</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                    <span>Minerals</span>
                    <span className="text-purple-700 font-bold">11d</span>
                  </div>
                  <p className="text-base font-extrabold text-slate-900 mt-1">45 kg</p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-[10px] text-slate-500">
              <span>Ration: ₹142.50 / hd-day</span>
              <span>FCR: 1.18 kg DMI/L</span>
            </div>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* ROW 6: COOPERATIVE DISPATCHES & LEDGER */}
        {/* ======================================================================= */}
        <div id="sales-ledger" className="bg-white rounded-[22px] p-5 shadow-sm border border-slate-200/70">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-700" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Outward Milk Sales Ledger</h3>
                <p className="text-[10px] text-slate-400">Direct sales from farm production</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-200 flex items-center gap-1">
                <Printer className="w-3 h-3" /> Gate Pass
              </button>
              <button onClick={() => setShowPricingModal(true)} className="text-[11px] font-semibold text-slate-800 bg-white border border-slate-300 px-3 py-1 rounded-full hover:bg-slate-50 flex items-center gap-1 shadow-sm">
                <Calculator className="w-3 h-3 text-orange-600" /> Pricing Matrix
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Est. Revenue</p>
              <p className="text-lg font-extrabold text-slate-900 mt-1">₹40,416</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-0.5">+8.4% vs lw</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Daily OPEX</p>
              <p className="text-lg font-extrabold text-slate-900 mt-1">₹21,800</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Feed + Labor</p>
            </div>

            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
              <p className="text-[10px] text-emerald-800 font-bold uppercase">Net Profit</p>
              <p className="text-lg font-extrabold text-emerald-800 mt-1">₹18,616</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">46% Margin</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Daily IOFC</p>
              <p className="text-lg font-extrabold text-slate-900 mt-1">₹24,850</p>
              <p className="text-[10px] text-slate-500 mt-0.5">₹591 / in-milk</p>
            </div>
          </div>

          <div className="mt-3 p-3 bg-slate-50 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1">
            <span className="text-slate-600">Mother Dairy AM Offtake: <strong className="text-slate-900">245 L @ ₹84.10 = ₹20,619</strong></span>
            <span className="font-semibold text-emerald-700">Bank Transfer Verified</span>
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
