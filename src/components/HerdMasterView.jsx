import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Heart, 
  Calendar, 
  X, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  Eye, 
  Edit3,
  Dna,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HerdMasterView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All Breeds');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAnimalId, setSelectedAnimalId] = useState(104);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Sample authentic herd data based on the blueprint
  const [animals, setAnimals] = useState([
    {
      id: 104,
      tag: '#MUR-104',
      name: 'Kalyani',
      breed: 'Murrah',
      parity: 3,
      dim: 62,
      yieldDaily: 16.2,
      yieldAm: 8.8,
      yieldPm: 7.4,
      fat: 7.8,
      snf: 9.2,
      status: 'Milking',
      statusType: 'success',
      stall: 'Bay A-04',
      dob: '14 Aug 2021',
      purchaseDate: '10 Jan 2023',
      purchaseCost: 120000,
      lifetimeYield: 3420,
      lifetimeRevenue: 287280,
      sire: 'Buland-A1 (NDDB Elite)',
      dam: 'Tag #MUR-012 (4,200 L)',
      lastCalving: '26 Aug 2026',
      healthNotes: 'All 4 teats healthy. FMD booster administered 12 Sep 2026.'
    },
    {
      id: 78,
      tag: '#MEH-078',
      name: 'Shama',
      breed: 'Mehsani',
      parity: 2,
      dim: 145,
      yieldDaily: 5.5,
      yieldAm: 2.1,
      yieldPm: 3.4,
      fat: 6.9,
      snf: 8.7,
      status: 'Under Treatment',
      statusType: 'alert',
      stall: 'Bay B-02',
      dob: '02 Mar 2022',
      purchaseDate: '15 May 2024',
      purchaseCost: 95000,
      lifetimeYield: 1840,
      lifetimeRevenue: 154560,
      sire: 'Mehsani-Sardar M-4',
      dam: 'Tag #MEH-008 (3,600 L)',
      lastCalving: '04 Jun 2026',
      healthNotes: 'Mastitis suspect in Rear-Left quarter. Electrical conductivity 6.9 mS/cm. Milk withheld.'
    },
    {
      id: 112,
      tag: '#BAN-112',
      name: 'Ganga',
      breed: 'Banni',
      parity: 4,
      dim: 90,
      yieldDaily: 15.8,
      yieldAm: 8.2,
      yieldPm: 7.6,
      fat: 8.1,
      snf: 9.4,
      status: 'Milking',
      statusType: 'success',
      stall: 'Bay A-02',
      dob: '22 Jan 2020',
      purchaseDate: '18 Feb 2022',
      purchaseCost: 135000,
      lifetimeYield: 4120,
      lifetimeRevenue: 346080,
      sire: 'Kutch-Royal B-1',
      dam: 'Tag #BAN-005 (4,500 L)',
      lastCalving: '29 Jul 2026',
      healthNotes: 'High fat line. Teat condition optimal.'
    },
    {
      id: 45,
      tag: '#JAF-045',
      name: 'Radha',
      breed: 'Jaffarabadi',
      parity: 5,
      dim: 0,
      yieldDaily: 0.0,
      yieldAm: 0.0,
      yieldPm: 0.0,
      fat: 0.0,
      snf: 0.0,
      status: 'Pregnant & Dry',
      statusType: 'info',
      stall: 'Bay C-01',
      dob: '10 Nov 2019',
      purchaseDate: '12 Dec 2021',
      purchaseCost: 125000,
      lifetimeYield: 4890,
      lifetimeRevenue: 410760,
      sire: 'Gir-Bahubali J-9',
      dam: 'Tag #JAF-001 (4,800 L)',
      lastCalving: '15 Dec 2025',
      healthNotes: 'Dry resting period. Pregnancy confirmed: Calving due 20 Nov 2026. High calcium diet active.'
    },
    {
      id: 89,
      tag: '#MUR-089',
      name: 'Champa',
      breed: 'Murrah',
      parity: 2,
      dim: 110,
      yieldDaily: 14.2,
      yieldAm: 7.4,
      yieldPm: 6.8,
      fat: 7.9,
      snf: 8.9,
      status: 'Milking',
      statusType: 'success',
      stall: 'Bay A-06',
      dob: '05 Jul 2022',
      purchaseDate: '14 Sep 2024',
      purchaseCost: 115000,
      lifetimeYield: 1980,
      lifetimeRevenue: 166320,
      sire: 'Buland-A1 (NDDB Elite)',
      dam: 'Tag #MUR-034 (3,900 L)',
      lastCalving: '09 Jul 2026',
      healthNotes: 'Stable mid-lactation yield.'
    },
    {
      id: 33,
      tag: '#SUR-033',
      name: 'Laxmi',
      breed: 'Surti',
      parity: 1,
      dim: 40,
      yieldDaily: 11.5,
      yieldAm: 6.0,
      yieldPm: 5.5,
      fat: 7.4,
      snf: 9.1,
      status: 'Milking',
      statusType: 'success',
      stall: 'Bay B-05',
      dob: '18 Aug 2023',
      purchaseDate: '20 Jan 2025',
      purchaseCost: 88000,
      lifetimeYield: 460,
      lifetimeRevenue: 38640,
      sire: 'Surti-Gaurav S-2',
      dam: 'Tag #SUR-003 (3,200 L)',
      lastCalving: '17 Sep 2026',
      healthNotes: 'First lactation heifer. Approaching peak yield window.'
    }
  ]);

  // Status Filter Counts
  const statusCounts = {
    All: animals.length,
    Milking: animals.filter(a => a.status === 'Milking').length,
    Dry: animals.filter(a => a.status === 'Dry').length,
    'Pregnant & Dry': animals.filter(a => a.status === 'Pregnant & Dry').length,
    'Under Treatment': animals.filter(a => a.status === 'Under Treatment').length,
  };

  // Filter Logic
  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = 
      animal.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.stall.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBreed = selectedBreed === 'All Breeds' || animal.breed === selectedBreed;
    
    const matchesStatus = 
      selectedStatus === 'All' || 
      animal.status.toLowerCase().includes(selectedStatus.toLowerCase());

    return matchesSearch && matchesBreed && matchesStatus;
  });

  const selectedAnimal = animals.find(a => a.id === selectedAnimalId) || animals[0];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* TOP HEADER CONTROLS */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/70">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Buffalo Management</span>
            <span className="bg-[#181A1E] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              64 Animals
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Per-head biometric identification, parity, Days in Milk (DIM), lactation curve & pedigree records</p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          {/* Breed Dropdown */}
          <div className="relative">
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="appearance-none bg-white pl-3.5 pr-8 py-2 rounded-full text-xs font-semibold text-slate-700 border border-slate-200 shadow-sm focus:outline-none cursor-pointer"
            >
              <option>All Breeds</option>
              <option>Murrah</option>
              <option>Mehsani</option>
              <option>Banni</option>
              <option>Jaffarabadi</option>
              <option>Surti</option>
              <option>Nili-Ravi</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Tag, Name, Stall..."
              className="bg-white pl-8 pr-4 py-2 rounded-full text-xs text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 w-44 sm:w-56 shadow-sm"
            />
          </div>

          {/* Register Buffalo Button */}
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-[#FF5722] hover:bg-[#E65100] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Register Buffalo
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STATUS FILTER PILLS */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'All', label: 'All Herd', count: animals.length },
          { id: 'Milking', label: 'In Milk', count: statusCounts.Milking },
          { id: 'Dry', label: 'Dry Period', count: 14 },
          { id: 'Pregnant & Dry', label: 'Pregnant & Dry', count: 2 },
          { id: 'Under Treatment', label: 'Under Treatment', count: statusCounts['Under Treatment'] },
        ].map((pill) => {
          const isActive = selectedStatus === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setSelectedStatus(pill.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[#181A1E] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{pill.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {pill.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MAIN 2-COLUMN LAYOUT: ROSTER TABLE (LEFT) + ANIMAL DOSSIER (RIGHT) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* LEFT COLUMN: ANIMAL ROSTER TABLE (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-[24px] p-5 shadow-sm border border-slate-200/70">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">Herd Roster ({filteredAnimals.length})</h3>
            <span className="text-[11px] text-slate-400">Click any row to inspect dossier</span>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 pb-2">
                  <th className="py-2.5 font-bold">Tag & Name</th>
                  <th className="py-2.5 font-bold">Breed</th>
                  <th className="py-2.5 font-bold">Parity</th>
                  <th className="py-2.5 font-bold">DIM</th>
                  <th className="py-2.5 font-bold">Yield (L)</th>
                  <th className="py-2.5 font-bold">Fat / SNF</th>
                  <th className="py-2.5 font-bold">Stall</th>
                  <th className="py-2.5 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAnimals.map((animal) => {
                  const isSelected = animal.id === selectedAnimalId;

                  return (
                    <tr 
                      key={animal.id}
                      onClick={() => setSelectedAnimalId(animal.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-slate-100/90 font-medium' 
                          : 'hover:bg-slate-50/70'
                      }`}
                    >
                      {/* Tag & Name */}
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center ${
                            animal.statusType === 'alert'
                              ? 'bg-amber-100 text-amber-900'
                              : isSelected
                                ? 'bg-[#FF5722] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-800'
                          }`}>
                            #{animal.id}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{animal.tag}</span>
                            <span className="text-[10px] text-slate-400">{animal.name}</span>
                          </div>
                        </div>
                      </td>

                      {/* Breed */}
                      <td className="py-3 text-slate-700 font-medium">
                        {animal.breed}
                      </td>

                      {/* Parity */}
                      <td className="py-3 text-slate-600">
                        Lactation {animal.parity}
                      </td>

                      {/* Days In Milk (DIM) */}
                      <td className="py-3">
                        {animal.dim > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-slate-900">{animal.dim}d</span>
                            <div className="w-10 bg-slate-200 h-1.5 rounded-full overflow-hidden hidden sm:block">
                              <div 
                                className="bg-[#FF5722] h-full rounded-full" 
                                style={{ width: `${Math.min(100, (animal.dim / 305) * 100)}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Dry</span>
                        )}
                      </td>

                      {/* Daily Yield */}
                      <td className="py-3 font-extrabold text-slate-900">
                        {animal.yieldDaily > 0 ? (
                          <span>{animal.yieldDaily} L</span>
                        ) : (
                          <span className="text-slate-400 font-normal">--</span>
                        )}
                      </td>

                      {/* Quality */}
                      <td className="py-3 text-slate-600">
                        {animal.fat > 0 ? (
                          <span>{animal.fat}% / {animal.snf}%</span>
                        ) : (
                          <span className="text-slate-400">--</span>
                        )}
                      </td>

                      {/* Stall */}
                      <td className="py-3 text-slate-500 font-mono text-[11px]">
                        {animal.stall}
                      </td>

                      {/* Status */}
                      <td className="py-3 text-right">
                        {animal.statusType === 'alert' ? (
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                            {animal.status}
                          </span>
                        ) : animal.statusType === 'info' ? (
                          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                            {animal.status}
                          </span>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                            {animal.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED BUFFALO DOSSIER DEEP-DIVE (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-5 shadow-sm border border-slate-200/70 space-y-4">
          
          {/* Header Profile Badge */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E65100] to-[#FF5722] text-white font-extrabold text-base flex items-center justify-center shadow-md shadow-orange-500/20">
                #{selectedAnimal.id}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-base text-slate-900">{selectedAnimal.tag}</h3>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.2 rounded-full">
                    {selectedAnimal.breed}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Alias: "{selectedAnimal.name}" • Parity {selectedAnimal.parity}</p>
              </div>
            </div>

            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              selectedAnimal.statusType === 'alert'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : selectedAnimal.statusType === 'info'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-emerald-100 text-emerald-900'
            }`}>
              {selectedAnimal.status}
            </span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-semibold block">Days in Milk (DIM)</span>
              <span className="text-base font-extrabold text-slate-900">{selectedAnimal.dim} Days</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-semibold block">Today's Yield</span>
              <span className="text-base font-extrabold text-slate-900">
                {selectedAnimal.yieldDaily > 0 ? `${selectedAnimal.yieldDaily} L` : 'Dry'}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-semibold block">Purchase Cost</span>
              <span className="text-base font-extrabold text-slate-900">₹{(selectedAnimal.purchaseCost / 1000).toFixed(0)}k</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-semibold block">Lifetime Revenue</span>
              <span className="text-base font-extrabold text-emerald-700">₹{(selectedAnimal.lifetimeRevenue / 1000).toFixed(0)}k</span>
            </div>
          </div>

          {/* Lactation Persistence Curve Card */}
          <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-orange-600" /> Lactation Curve
              </span>
              <span className="text-[10px] font-semibold text-slate-500">Peak: 45–70d</span>
            </div>

            {/* Visual SVG Curve */}
            <div className="relative h-20 w-full flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                {/* Background Grid Lines */}
                <line x1="0" y1="50" x2="200" y2="50" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="0" y1="20" x2="200" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2,2" />

                {/* Lactation Curve Path */}
                <path 
                  d="M 5,55 Q 40,5 70,12 T 140,30 T 195,50" 
                  fill="none" 
                  stroke="#FF5722" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />

                {/* Shaded Area */}
                <path 
                  d="M 5,55 Q 40,5 70,12 T 140,30 T 195,50 L 195,55 L 5,55 Z" 
                  fill="rgba(255, 87, 34, 0.08)" 
                />

                {/* Current DIM Marker */}
                <circle cx="50" cy="10" r="4" fill="#181A1E" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>Day 1 (Calved)</span>
              <span className="text-slate-900 font-bold">Current: Day {selectedAnimal.dim}</span>
              <span>Day 305 (Dry-off)</span>
            </div>
          </div>

          {/* Lineage & Pedigree */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Dna className="w-3.5 h-3.5 text-sky-600" /> Lineage & Pedigree
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px]">Sire (Bull ID)</span>
                <span className="font-bold text-slate-800">{selectedAnimal.sire}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Dam (Mother)</span>
                <span className="font-bold text-slate-800">{selectedAnimal.dam}</span>
              </div>
            </div>
          </div>

          {/* Health & Teat Condition */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Veterinary & Health Notes
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
              {selectedAnimal.healthNotes}
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex gap-2">
            <button className="flex-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs py-2 rounded-xl transition-colors shadow-sm">
              Edit Profile
            </button>
            <button className="flex-1 bg-[#181A1E] hover:bg-slate-800 text-white font-semibold text-xs py-2 rounded-xl transition-colors shadow-sm">
              Log Health Event
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: REGISTER NEW BUFFALO */}
      {/* ========================================================================= */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowRegisterModal(false)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-orange-50 text-[#FF5722] rounded-2xl">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Register New Buffalo</h3>
                <p className="text-xs text-slate-500">Animal Master Profile (Module 1)</p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setShowRegisterModal(false); }} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tag Number (RFID/Ear)</label>
                  <input type="text" placeholder="#MUR-120" required className="w-full border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nickname / Name</label>
                  <input type="text" placeholder="e.g. Kaveri" className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Breed Classification</label>
                  <select className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800 font-medium">
                    <option>Murrah</option>
                    <option>Mehsani</option>
                    <option>Banni</option>
                    <option>Jaffarabadi</option>
                    <option>Surti</option>
                    <option>Nili-Ravi</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Current Status</label>
                  <select className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800 font-medium">
                    <option>Milking</option>
                    <option>Dry</option>
                    <option>Pregnant & Milking</option>
                    <option>Pregnant & Dry</option>
                    <option>Heifer</option>
                    <option>Sick / Under Treatment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Parity (Calvings)</label>
                  <input type="number" defaultValue="1" min="1" max="10" className="w-full border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Purchase Cost (₹)</label>
                  <input type="number" defaultValue="110000" className="w-full border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Stall / Bay #</label>
                  <input type="text" defaultValue="Bay A-07" className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sire (Father ID)</label>
                  <input type="text" placeholder="e.g. Buland-A1" className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-900" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Last Calving Date</label>
                  <input type="date" className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800" />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#181A1E] hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm">
                  Register Animal to Master Herd
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

