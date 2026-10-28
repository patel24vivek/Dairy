import React, { useState, useMemo } from 'react';
import XLSX from 'xlsx-js-style';
import { 
  Receipt, 
  Plus, 
  Calendar, 
  Download, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  IndianRupee, 
  Trash2, 
  Edit3, 
  Filter, 
  CheckCircle2, 
  X, 
  Clock, 
  FileText, 
  Tag, 
  Layers, 
  Zap, 
  Wifi, 
  Users, 
  HeartPulse, 
  Wrench, 
  Landmark, 
  Wheat, 
  PieChart, 
  Printer, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  CalendarRange,
  ArrowUpRight,
  FileSpreadsheet
} from 'lucide-react';

export default function ExpenseManagementView() {
  // Period Selection: '2026-ALL' for Whole Yearly view, or '2026-01' through '2026-12' for monthly view
  const [selectedMonth, setSelectedMonth] = useState('2026-10'); // Default to October 2026
  const [lastActiveMonth, setLastActiveMonth] = useState('2026-10'); // Remember last viewed month when toggling
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  // Graphical Chart interaction states
  const [hoveredChartMonth, setHoveredChartMonth] = useState(null);
  const [hoveredCategorySlice, setHoveredCategorySlice] = useState(null);

  // Modal custom item & category states
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [isCustomItem, setIsCustomItem] = useState(false);
  const [customItemInput, setCustomItemInput] = useState('');

  // Quick Add Custom Category Modal state
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryNameInput, setNewCategoryNameInput] = useState('');

  // Period Options: Whole Yearly + 12 Individual Months of 2026
  const monthsList = [
    { id: '2026-ALL', name: '📅 Whole Year 2026 (Annual Master)', isAnnual: true },
    { id: '2026-01', name: 'January 2026' },
    { id: '2026-02', name: 'February 2026' },
    { id: '2026-03', name: 'March 2026' },
    { id: '2026-04', name: 'April 2026' },
    { id: '2026-05', name: 'May 2026' },
    { id: '2026-06', name: 'June 2026' },
    { id: '2026-07', name: 'July 2026' },
    { id: '2026-08', name: 'August 2026' },
    { id: '2026-09', name: 'September 2026' },
    { id: '2026-10', name: 'October 2026 (Current)' },
    { id: '2026-11', name: 'November 2026' },
    { id: '2026-12', name: 'December 2026' },
  ];

  const isAnnualView = selectedMonth === '2026-ALL';

  // Formatted Period Title (e.g. "Whole Year 2026 (Annual Master)", "October 2026", "June 2026")
  const formattedMonthName = useMemo(() => {
    if (selectedMonth === '2026-ALL') {
      return 'Whole Year 2026 (Annual Master)';
    }
    const [year, month] = selectedMonth.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [selectedMonth]);

  // Stepper functions for Previous and Next period
  const handlePrevMonth = () => {
    const currentIndex = monthsList.findIndex(m => m.id === selectedMonth);
    if (currentIndex > 0) {
      const nextId = monthsList[currentIndex - 1].id;
      setSelectedMonth(nextId);
      if (nextId !== '2026-ALL') {
        setLastActiveMonth(nextId);
      }
    }
  };

  const handleNextMonth = () => {
    const currentIndex = monthsList.findIndex(m => m.id === selectedMonth);
    if (currentIndex < monthsList.length - 1) {
      const nextId = monthsList[currentIndex + 1].id;
      setSelectedMonth(nextId);
      if (nextId !== '2026-ALL') {
        setLastActiveMonth(nextId);
      }
    }
  };

  // Switch between Monthly and Whole Yearly views
  const handleTogglePeriodType = (type) => {
    if (type === 'year') {
      setSelectedMonth('2026-ALL');
    } else {
      setSelectedMonth(lastActiveMonth || '2026-10');
    }
  };

  // Default Standard Categories with English + Gujarati labels and icons
  const defaultCategories = [
    { 
      id: 'All', 
      label: 'All Expenses', 
      sublabel: 'બધા ફાર્મ ખર્ચ',
      icon: Layers, 
      inactiveIconBg: 'bg-slate-100 text-slate-700',
      isCustom: false 
    },
    { 
      id: 'Feed & Nutrition', 
      label: 'Feed & Fodder', 
      sublabel: 'ખોરાક અને ભૂસું',
      icon: Wheat, 
      inactiveIconBg: 'bg-amber-50 text-amber-600',
      isCustom: false 
    },
    { 
      id: 'Labor & Salaries', 
      label: 'Labor & Wages', 
      sublabel: 'મજૂરી અને પગાર',
      icon: Users, 
      inactiveIconBg: 'bg-indigo-50 text-indigo-600',
      isCustom: false 
    },
    { 
      id: 'Utilities & Bills', 
      label: 'Utilities & Bills', 
      sublabel: 'લાઇટ / ઇન્ટરનેટ',
      icon: Zap, 
      inactiveIconBg: 'bg-cyan-50 text-cyan-600',
      isCustom: false 
    },
    { 
      id: 'Veterinary & Health', 
      label: 'Veterinary & Med', 
      sublabel: 'તબીબી અને સારવાર',
      icon: HeartPulse, 
      inactiveIconBg: 'bg-rose-50 text-rose-600',
      isCustom: false 
    },
    { 
      id: 'Hardware & Maint', 
      label: 'Hardware & Maint', 
      sublabel: 'સાંકળ અને સાધન',
      icon: Wrench, 
      inactiveIconBg: 'bg-orange-50 text-orange-600',
      isCustom: false 
    },
    { 
      id: 'Loans & EMI', 
      label: 'Loans & EMI', 
      sublabel: 'લોન અને હપ્તા',
      icon: Landmark, 
      inactiveIconBg: 'bg-purple-50 text-purple-600',
      isCustom: false 
    },
  ];

  // User-defined Custom Categories (Users can give ANY name to categories!)
  const [customCategories, setCustomCategories] = useState([
    { 
      id: 'Diesel & Machinery', 
      label: 'Diesel & Fuel', 
      sublabel: 'કસ્ટમ કેટેગરી', 
      isCustom: true 
    }
  ]);

  // Combined Categories for Filter Deck & Selectors
  const allCategories = useMemo(() => {
    return [
      ...defaultCategories,
      ...customCategories.map(c => ({
        ...c,
        icon: Tag,
        inactiveIconBg: 'bg-emerald-50 text-emerald-600'
      }))
    ];
  }, [customCategories]);

  // Preset items matching expance.md
  const presetItems = [
    { item: 'Khod - Bhusu (ખોળ અને ભૂસું)', category: 'Feed & Nutrition', defaultPrice: 34000 },
    { item: 'Tuver Chunni (તુવેર ચૂની)', category: 'Feed & Nutrition', defaultPrice: 18500 },
    { item: 'Green Charo (લીલો ચારો)', category: 'Feed & Nutrition', defaultPrice: 8500 },
    { item: 'Bear Charo (બહારનો ચારો)', category: 'Feed & Nutrition', defaultPrice: 16000 },
    { item: 'Sarso Nu Tel (સરસવનું તેલ)', category: 'Feed & Nutrition', defaultPrice: 2400 },
    { item: 'Black Salt (સંચળ / સિંધવ મીઠું)', category: 'Feed & Nutrition', defaultPrice: 1200 },
    { item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', defaultPrice: 4800 },
    { item: 'Monthly Salary (સ્ટાફનો માસિક પગાર)', category: 'Labor & Salaries', defaultPrice: 55000 },
    { item: 'Light Bill / Electricity (લાઇટ બિલ)', category: 'Utilities & Bills', defaultPrice: 18450 },
    { item: 'Internet Bill (ઇન્ટરનેટ બિલ)', category: 'Utilities & Bills', defaultPrice: 1499 },
    { item: 'Madicin (દવાઓ / સારવાર)', category: 'Veterinary & Health', defaultPrice: 3600 },
    { item: 'Doctor Fees (પશુ ડૉક્ટર ફી)', category: 'Veterinary & Health', defaultPrice: 2500 },
    { item: 'Chain (સાંકળ / પશુ બાંધવાની ચેન)', category: 'Hardware & Maint', defaultPrice: 4200 },
    { item: 'EMI (લોન / સાધન હપ્તા)', category: 'Loans & EMI', defaultPrice: 22500 },
    { item: 'Diesel for Silage Cutter & Tractor (50L)', category: 'Diesel & Machinery', defaultPrice: 4800 },
    { item: 'Other / Custom Expense', category: 'Custom', defaultPrice: 2500 },
  ];

  // Helper to generate realistic farm bills for all 12 months of 2026
  const generateInitialExpenses = () => {
    const list = [
      // October 2026 (Actual current master data)
      { id: 101, date: '2026-10-02', item: 'Tuver Chunni (તુવેર ચૂની)', category: 'Feed & Nutrition', amount: 18500, paidTo: 'Patel Agro Feeds, Anand', paymentMode: 'UPI / GPay', status: 'Paid', notes: '10 bags high-protein tuver chunni' },
      { id: 102, date: '2026-10-05', item: 'Khod - Bhusu (ખોળ અને ભૂસું)', category: 'Feed & Nutrition', amount: 34000, paidTo: 'Kisan Oil Mill & Grain Store', paymentMode: 'Bank Transfer', status: 'Paid', notes: '20 bags cottonseed/mustard cake + wheat straw' },
      { id: 103, date: '2026-10-07', item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew (6 workers)', paymentMode: 'Cash', status: 'Paid', notes: 'Week 1 green fodder harvesting & chaffing' },
      { id: 104, date: '2026-10-08', item: 'Sarso Nu Tel (સરસવનું તેલ)', category: 'Feed & Nutrition', amount: 2400, paidTo: 'Shreeji Grocery & Provisions', paymentMode: 'UPI', status: 'Paid', notes: '15L cold-pressed mustard oil for buffalo coat & digestive fat boost' },
      { id: 105, date: '2026-10-10', item: 'Doctor Fees (પશુ ડૉક્ટર ફી)', category: 'Veterinary & Health', amount: 2500, paidTo: 'Dr. R. K. Mehta (Veterinary Surgeon)', paymentMode: 'Cash', status: 'Paid', notes: 'Routine herd fertility checkup & pregnancy diagnosis (PD)' },
      { id: 106, date: '2026-10-12', item: 'Green Charo (લીલો ચારો)', category: 'Feed & Nutrition', amount: 8500, paidTo: 'Mahadev Fodder Suppliers', paymentMode: 'UPI', status: 'Paid', notes: 'Fresh Napier & Lucerne grass lot (2.5 Tons)' },
      { id: 107, date: '2026-10-14', item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew', paymentMode: 'Cash', status: 'Paid', notes: 'Week 2 harvesting & feeding operations' },
      { id: 108, date: '2026-10-15', item: 'Chain (સાંકળ / પશુ બાંધવાની ચેન)', category: 'Hardware & Maint', amount: 4200, paidTo: 'Ambica Hardware & Steel', paymentMode: 'UPI', status: 'Paid', notes: 'Heavy-duty galvanised tethering chains and O-rings for Shed B stalls' },
      { id: 109, date: '2026-10-16', item: 'Madicin (દવાઓ / સારવાર)', category: 'Veterinary & Health', amount: 3600, paidTo: 'Sanjivani Vet Pharma', paymentMode: 'UPI', status: 'Paid', notes: 'Calcium bolus, mastitis intramammary tubes & deworming doses' },
      { id: 110, date: '2026-10-18', item: 'Bear Charo (બહારનો ચારો)', category: 'Feed & Nutrition', amount: 16000, paidTo: 'Kutch Dry Grass Logistics', paymentMode: 'Bank Transfer', status: 'Paid', notes: 'Dry sorghum & hay stock (4 Tons)' },
      { id: 111, date: '2026-10-20', item: 'Internet Bill (ઇન્ટરનેટ બિલ)', category: 'Utilities & Bills', amount: 1499, paidTo: 'Jio Fiber Broadband', paymentMode: 'Auto-Debit', status: 'Paid', notes: 'High-speed shed fiber internet for IoT collars, milk meter & CCTV' },
      { id: 112, date: '2026-10-22', item: 'Light Bill / Electricity (લાઇટ બિલ)', category: 'Utilities & Bills', amount: 18450, paidTo: 'UGVCL / Electricity Board', paymentMode: 'Net Banking', status: 'Paid', notes: 'Commercial 3-phase power for 2000L Chiller, Milking Parlor & Chaff Cutter' },
      { id: 113, date: '2026-10-25', item: 'Monthly Salary (સ્ટાફનો માસિક પગાર)', category: 'Labor & Salaries', amount: 55000, paidTo: 'Shed Milkers & Permanent Hands', paymentMode: 'Bank Transfer', status: 'Paid', notes: 'Salaries for Ramesh Kumar (Head Milker), Suresh Yadav, and 2 assistants' },
      { id: 114, date: '2026-10-26', item: 'EMI (લોન / સાધન હપ્તા)', category: 'Loans & EMI', amount: 22500, paidTo: 'HDFC Bank Agri Finance', paymentMode: 'Auto-Debit', status: 'Paid', notes: 'Monthly loan installment for Tractor & Chiller tank' },
      { id: 115, date: '2026-10-27', item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew', paymentMode: 'Cash', status: 'Paid', notes: 'Week 4 fodder operations' },
      { id: 116, date: '2026-10-27', item: 'Tuver Chunni (તુવેર ચૂની)', category: 'Feed & Nutrition', amount: 18500, paidTo: 'Patel Agro Feeds', paymentMode: 'UPI', status: 'Paid', notes: 'Second fortnightly feed restock (10 bags)' },
      { id: 117, date: '2026-10-28', item: 'Diesel for Silage Cutter & Tractor (50L)', category: 'Diesel & Machinery', amount: 4750, paidTo: 'Nayara Energy / Highway Bunk', paymentMode: 'UPI / GPay', status: 'Paid', notes: 'Fuel for silage harvesting machine & shed generator' },

      // June 2026 (Summer peak feeding & power bills)
      { id: 201, date: '2026-06-02', item: 'Tuver Chunni (તુવેર ચૂની)', category: 'Feed & Nutrition', amount: 18000, paidTo: 'Patel Agro Feeds, Anand', paymentMode: 'UPI / GPay', status: 'Paid', notes: '10 bags high-protein tuver chunni' },
      { id: 202, date: '2026-06-04', item: 'Khod - Bhusu (ખોળ અને ભૂસું)', category: 'Feed & Nutrition', amount: 33500, paidTo: 'Kisan Oil Mill & Grain Store', paymentMode: 'Bank Transfer', status: 'Paid', notes: 'Cottonseed cake and wheat straw bulk delivery' },
      { id: 203, date: '2026-06-06', item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew', paymentMode: 'Cash', status: 'Paid', notes: 'Summer grass harvest week 1' },
      { id: 204, date: '2026-06-08', item: 'Sarso Nu Tel (સરસવનું તેલ)', category: 'Feed & Nutrition', amount: 2400, paidTo: 'Shreeji Grocery & Provisions', paymentMode: 'UPI', status: 'Paid', notes: '15L cold-pressed mustard oil' },
      { id: 205, date: '2026-06-10', item: 'Doctor Fees (પશુ ડૉક્ટર ફી)', category: 'Veterinary & Health', amount: 2300, paidTo: 'Dr. R. K. Mehta (Vet Surgeon)', paymentMode: 'Cash', status: 'Paid', notes: 'Routine pregnancy diagnosis & vaccination' },
      { id: 206, date: '2026-06-12', item: 'Green Charo (લીલો ચારો)', category: 'Feed & Nutrition', amount: 8000, paidTo: 'Mahadev Fodder Suppliers', paymentMode: 'UPI', status: 'Paid', notes: 'Summer Napier grass lot (2.5 Tons)' },
      { id: 207, date: '2026-06-14', item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew', paymentMode: 'Cash', status: 'Paid', notes: 'Week 2 harvesting & feeding' },
      { id: 208, date: '2026-06-15', item: 'Chain (સાંકળ / પશુ બાંધવાની ચેન)', category: 'Hardware & Maint', amount: 3850, paidTo: 'Ambica Hardware & Steel', paymentMode: 'UPI', status: 'Paid', notes: 'Calf tethering chains and replacement hooks' },
      { id: 209, date: '2026-06-16', item: 'Madicin (દવાઓ / સારવાર)', category: 'Veterinary & Health', amount: 3500, paidTo: 'Sanjivani Vet Pharma', paymentMode: 'UPI', status: 'Paid', notes: 'Electrolyte powders & deworming doses' },
      { id: 210, date: '2026-06-18', item: 'Bear Charo (બહારનો ચારો)', category: 'Feed & Nutrition', amount: 15200, paidTo: 'Kutch Dry Grass Logistics', paymentMode: 'Bank Transfer', status: 'Paid', notes: 'Dry sorghum & hay stock (3.8 Tons)' },
      { id: 211, date: '2026-06-20', item: 'Internet Bill (ઇન્ટરનેટ બિલ)', category: 'Utilities & Bills', amount: 1499, paidTo: 'Jio Fiber Broadband', paymentMode: 'Auto-Debit', status: 'Paid', notes: 'High-speed shed fiber internet' },
      { id: 212, date: '2026-06-22', item: 'Light Bill / Electricity (લાઇટ બિલ)', category: 'Utilities & Bills', amount: 19200, paidTo: 'UGVCL / Electricity Board', paymentMode: 'Net Banking', status: 'Paid', notes: '3-phase power for Chiller & cooling fans during peak heat' },
      { id: 213, date: '2026-06-25', item: 'Monthly Salary (સ્ટાફનો માસિક પગાર)', category: 'Labor & Salaries', amount: 55000, paidTo: 'Shed Milkers & Permanent Hands', paymentMode: 'Bank Transfer', status: 'Paid', notes: 'Salaries for Ramesh Kumar and 3 farm hands' },
      { id: 214, date: '2026-06-26', item: 'EMI (લોન / સાધન હપ્તા)', category: 'Loans & EMI', amount: 22500, paidTo: 'HDFC Bank Agri Finance', paymentMode: 'Auto-Debit', status: 'Paid', notes: 'Tractor & Chiller monthly installment' },
      { id: 215, date: '2026-06-27', item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew', paymentMode: 'Cash', status: 'Paid', notes: 'Week 4 fodder operations' },
      { id: 216, date: '2026-06-28', item: 'Diesel for Silage Cutter & Tractor (50L)', category: 'Diesel & Machinery', amount: 5100, paidTo: 'Nayara Energy / Highway Bunk', paymentMode: 'UPI / GPay', status: 'Paid', notes: 'Silage cutter and emergency generator diesel' },
      { id: 217, date: '2026-06-29', item: 'Tuver Chunni (તુવેર ચૂની)', category: 'Feed & Nutrition', amount: 18000, paidTo: 'Patel Agro Feeds', paymentMode: 'UPI', status: 'Paid', notes: 'Feed restock lot 2' },
    ];

    // Seed remaining months of 2026 with consistent authentic recurring OPEX
    const otherMonths = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-07', '2026-08', '2026-09', '2026-11', '2026-12'];
    otherMonths.forEach((mId, mIdx) => {
      const pId = (mIdx + 3) * 100;
      list.push(
        { id: pId + 1, date: `${mId}-02`, item: 'Tuver Chunni (તુવેર ચૂની)', category: 'Feed & Nutrition', amount: 18200, paidTo: 'Patel Agro Feeds, Anand', paymentMode: 'UPI / GPay', status: 'Paid', notes: 'Fortnightly feed ration' },
        { id: pId + 2, date: `${mId}-05`, item: 'Khod - Bhusu (ખોળ અને ભૂસું)', category: 'Feed & Nutrition', amount: 33800, paidTo: 'Kisan Oil Mill & Grain Store', paymentMode: 'Bank Transfer', status: 'Paid', notes: 'Concentrate & dry wheat straw' },
        { id: pId + 3, date: `${mId}-07`, item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew', paymentMode: 'Cash', status: 'Paid', notes: 'Harvesting & chaffing wages' },
        { id: pId + 4, date: `${mId}-08`, item: 'Sarso Nu Tel (સરસવનું તેલ)', category: 'Feed & Nutrition', amount: 2400, paidTo: 'Shreeji Grocery & Provisions', paymentMode: 'UPI', status: 'Paid', notes: 'Mustard oil fat booster' },
        { id: pId + 5, date: `${mId}-10`, item: 'Doctor Fees (પશુ ડૉક્ટર ફી)', category: 'Veterinary & Health', amount: 2400, paidTo: 'Dr. R. K. Mehta', paymentMode: 'Cash', status: 'Paid', notes: 'Monthly herd health visit' },
        { id: pId + 6, date: `${mId}-12`, item: 'Green Charo (લીલો ચારો)', category: 'Feed & Nutrition', amount: 8400, paidTo: 'Mahadev Fodder Suppliers', paymentMode: 'UPI', status: 'Paid', notes: 'Fresh green fodder delivery' },
        { id: pId + 7, date: `${mId}-14`, item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew', paymentMode: 'Cash', status: 'Paid', notes: 'Harvesting wages week 2' },
        { id: pId + 8, date: `${mId}-15`, item: 'Chain (સાંકળ / પશુ બાંધવાની ચેન)', category: 'Hardware & Maint', amount: 4100, paidTo: 'Ambica Hardware & Steel', paymentMode: 'UPI', status: 'Paid', notes: 'Tethering maintenance & chains' },
        { id: pId + 9, date: `${mId}-16`, item: 'Madicin (દવાઓ / સારવાર)', category: 'Veterinary & Health', amount: 3500, paidTo: 'Sanjivani Vet Pharma', paymentMode: 'UPI', status: 'Paid', notes: 'Deworming & calcium gel' },
        { id: pId + 10, date: `${mId}-18`, item: 'Bear Charo (બહારનો ચારો)', category: 'Feed & Nutrition', amount: 15800, paidTo: 'Kutch Dry Grass Logistics', paymentMode: 'Bank Transfer', status: 'Paid', notes: 'Dry sorghum & hay lot' },
        { id: pId + 11, date: `${mId}-20`, item: 'Internet Bill (ઇન્ટરનેટ બિલ)', category: 'Utilities & Bills', amount: 1499, paidTo: 'Jio Fiber Broadband', paymentMode: 'Auto-Debit', status: 'Paid', notes: 'Monthly shed internet' },
        { id: pId + 12, date: `${mId}-22`, item: 'Light Bill / Electricity (લાઇટ બિલ)', category: 'Utilities & Bills', amount: 18600, paidTo: 'UGVCL / Electricity Board', paymentMode: 'Net Banking', status: 'Paid', notes: 'Commercial chilling & parlor power' },
        { id: pId + 13, date: `${mId}-25`, item: 'Monthly Salary (સ્ટાફનો માસિક પગાર)', category: 'Labor & Salaries', amount: 55000, paidTo: 'Shed Milkers & Permanent Hands', paymentMode: 'Bank Transfer', status: 'Paid', notes: 'Monthly staff salaries' },
        { id: pId + 14, date: `${mId}-26`, item: 'EMI (લોન / સાધન હપ્તા)', category: 'Loans & EMI', amount: 22500, paidTo: 'HDFC Bank Agri Finance', paymentMode: 'Auto-Debit', status: 'Paid', notes: 'Tractor loan installment' },
        { id: pId + 15, date: `${mId}-27`, item: 'Daily Labour for Cutting Charo (ઘાસ કાપવાની દૈનિક મજૂરી)', category: 'Labor & Salaries', amount: 4800, paidTo: 'Farm Daily Crew', paymentMode: 'Cash', status: 'Paid', notes: 'Week 4 fodder wages' },
        { id: pId + 16, date: `${mId}-28`, item: 'Diesel for Silage Cutter & Tractor (50L)', category: 'Diesel & Machinery', amount: 4900, paidTo: 'Nayara Energy', paymentMode: 'UPI / GPay', status: 'Paid', notes: 'Tractor diesel & cutter fuel' },
        { id: pId + 17, date: `${mId}-29`, item: 'Tuver Chunni (તુવેર ચૂની)', category: 'Feed & Nutrition', amount: 18100, paidTo: 'Patel Agro Feeds', paymentMode: 'UPI', status: 'Paid', notes: 'Second half feed restock' }
      );
    });

    return list;
  };

  const [expenses, setExpenses] = useState(generateInitialExpenses);

  // Active Expenses: if '2026-ALL', include all 12 months; otherwise filter to specific selected month
  const monthExpenses = useMemo(() => {
    if (selectedMonth === '2026-ALL') {
      return expenses;
    }
    return expenses.filter(e => e.date.startsWith(selectedMonth));
  }, [expenses, selectedMonth]);

  // Form State for Log / Edit Expense (defaults date cleanly)
  const defaultDateValue = selectedMonth === '2026-ALL' ? '2026-10-28' : `${selectedMonth}-15`;

  const [formData, setFormData] = useState({
    item: presetItems[0].item,
    category: presetItems[0].category,
    amount: presetItems[0].defaultPrice,
    date: defaultDateValue,
    paidTo: '',
    paymentMode: 'UPI / GPay',
    status: 'Paid',
    notes: ''
  });

  // Handle Preset Item Change
  const handleItemSelect = (selectedItemName) => {
    if (selectedItemName.includes('Other / Custom Expense')) {
      setIsCustomItem(true);
      setCustomItemInput('');
      setIsCustomCategory(true);
      setCustomCategoryInput('');
      setFormData(prev => ({
        ...prev,
        amount: ''
      }));
      return;
    }

    const preset = presetItems.find(p => p.item === selectedItemName);
    if (preset) {
      setIsCustomItem(false);
      setIsCustomCategory(false);
      setFormData(prev => ({
        ...prev,
        item: preset.item,
        category: preset.category,
        amount: preset.defaultPrice
      }));
    } else {
      setIsCustomItem(true);
      setCustomItemInput(selectedItemName);
      setFormData(prev => ({ ...prev, item: selectedItemName }));
    }
  };

  // Open Modal for New or Edit
  const handleOpenModal = (expense = null) => {
    if (expense) {
      setEditingExpenseId(expense.id);
      
      const isCustomCat = !defaultCategories.some(c => c.id === expense.category);
      const isCustomIt = !presetItems.some(p => p.item === expense.item);

      setIsCustomCategory(isCustomCat);
      setCustomCategoryInput(isCustomCat ? expense.category : '');
      setIsCustomItem(isCustomIt);
      setCustomItemInput(isCustomIt ? expense.item : '');

      setFormData({
        item: expense.item,
        category: expense.category,
        amount: expense.amount,
        date: expense.date,
        paidTo: expense.paidTo,
        paymentMode: expense.paymentMode,
        status: expense.status,
        notes: expense.notes || ''
      });
    } else {
      setEditingExpenseId(null);
      setIsCustomCategory(false);
      setCustomCategoryInput('');
      setIsCustomItem(false);
      setCustomItemInput('');

      setFormData({
        item: presetItems[0].item,
        category: presetItems[0].category,
        amount: presetItems[0].defaultPrice,
        date: selectedMonth === '2026-ALL' ? '2026-10-28' : `${selectedMonth}-15`,
        paidTo: '',
        paymentMode: 'UPI / GPay',
        status: 'Paid',
        notes: ''
      });
    }
    setShowAddModal(true);
  };

  // Save Modal
  const handleSaveExpense = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount) || 0;

    const resolvedCategory = isCustomCategory 
      ? (customCategoryInput.trim() || 'Custom Category')
      : formData.category;

    const resolvedItem = isCustomItem 
      ? (customItemInput.trim() || 'Custom Farm Expense')
      : formData.item;

    // Automatically register any new custom category into customCategories list
    if (
      resolvedCategory && 
      !defaultCategories.some(c => c.id.toLowerCase() === resolvedCategory.toLowerCase()) && 
      !customCategories.some(c => c.id.toLowerCase() === resolvedCategory.toLowerCase())
    ) {
      setCustomCategories(prev => [
        ...prev, 
        { id: resolvedCategory, label: resolvedCategory, sublabel: 'કસ્ટમ કેટેગરી', isCustom: true }
      ]);
    }

    if (editingExpenseId) {
      setExpenses(prev => prev.map(exp => exp.id === editingExpenseId ? {
        ...exp,
        ...formData,
        item: resolvedItem,
        category: resolvedCategory,
        amount: amountNum
      } : exp));
    } else {
      const newEntry = {
        id: Date.now(),
        ...formData,
        item: resolvedItem,
        category: resolvedCategory,
        amount: amountNum
      };
      setExpenses(prev => [newEntry, ...prev]);
    }

    setShowAddModal(false);
  };

  // Create Custom Category directly from Filter Bar
  const handleCreateCustomCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategoryNameInput.trim();
    if (!trimmed) return;

    if (
      !defaultCategories.some(c => c.id.toLowerCase() === trimmed.toLowerCase()) &&
      !customCategories.some(c => c.id.toLowerCase() === trimmed.toLowerCase())
    ) {
      setCustomCategories(prev => [
        ...prev, 
        { id: trimmed, label: trimmed, sublabel: 'કસ્ટમ કેટેગરી', isCustom: true }
      ]);
    }
    setSelectedCategory(trimmed);
    setNewCategoryNameInput('');
    setShowNewCategoryModal(false);
  };

  // Remove a custom category filter
  const handleDeleteCustomCategory = (catId, e) => {
    e.stopPropagation();
    if (window.confirm(`Remove custom category "${catId}" from filters? Existing records will remain intact.`)) {
      setCustomCategories(prev => prev.filter(c => c.id !== catId));
      if (selectedCategory === catId) {
        setSelectedCategory('All');
      }
    }
  };

  // Delete Expense
  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense record?')) {
      setExpenses(prev => prev.filter(e => e.id !== id));
    }
  };

  // Filtered Expenses by Month, Category, and Search
  const filteredExpenses = useMemo(() => {
    return monthExpenses.filter(e => {
      const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
      const matchesSearch = 
        e.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.paidTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.notes && e.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [monthExpenses, selectedCategory, searchQuery]);

  // Monthly Milk Revenue Map for all 12 months in 2026 (matching DailyMilkSheetView)
  const monthlyMilkRevenueMap = useMemo(() => ({
    '2026-01': 1035480,
    '2026-02': 967800,
    '2026-03': 1107770,
    '2026-04': 1066800,
    '2026-05': 993950,
    '2026-06': 955560,
    '2026-07': 1025850,
    '2026-08': 1081200,
    '2026-09': 1053120,
    '2026-10': 944358,
    '2026-11': 996075,
    '2026-12': 1047750,
  }), []);

  // Total Annual Milk Revenue (sum of 12 months = ₹1,22,75,913 (~₹1.23 Cr))
  const totalAnnualMilkRevenue = useMemo(() => {
    return Object.values(monthlyMilkRevenueMap).reduce((sum, val) => sum + val, 0);
  }, [monthlyMilkRevenueMap]);

  // Aggregated Category Metrics for Selected Period (Month or Whole Year)
  const expenseMetrics = useMemo(() => {
    const totalOPEX = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

    const feedTotal = monthExpenses.filter(e => e.category === 'Feed & Nutrition').reduce((sum, e) => sum + e.amount, 0);
    const laborTotal = monthExpenses.filter(e => e.category === 'Labor & Salaries').reduce((sum, e) => sum + e.amount, 0);
    const utilityTotal = monthExpenses.filter(e => e.category === 'Utilities & Bills').reduce((sum, e) => sum + e.amount, 0);
    const vetTotal = monthExpenses.filter(e => e.category === 'Veterinary & Health').reduce((sum, e) => sum + e.amount, 0);
    const hardwareTotal = monthExpenses.filter(e => e.category === 'Hardware & Maint').reduce((sum, e) => sum + e.amount, 0);
    const emiTotal = monthExpenses.filter(e => e.category === 'Loans & EMI').reduce((sum, e) => sum + e.amount, 0);
    
    // Custom Categories Total (anything not in standard 6 categories)
    const defaultIds = ['Feed & Nutrition', 'Labor & Salaries', 'Utilities & Bills', 'Veterinary & Health', 'Hardware & Maint', 'Loans & EMI'];
    const customTotal = monthExpenses.filter(e => !defaultIds.includes(e.category)).reduce((sum, e) => sum + e.amount, 0);

    // Dynamic Milk Revenue: Full Year revenue if '2026-ALL', or month revenue
    const periodMilkRevenue = selectedMonth === '2026-ALL'
      ? totalAnnualMilkRevenue
      : (monthlyMilkRevenueMap[selectedMonth] || 944358);

    const netProfit = periodMilkRevenue - totalOPEX;
    const profitMargin = ((netProfit / (periodMilkRevenue || 1)) * 100).toFixed(1);

    return {
      totalOPEX,
      feedTotal,
      laborTotal,
      utilityTotal,
      vetTotal,
      hardwareTotal,
      emiTotal,
      customTotal,
      monthlyMilkRevenue: periodMilkRevenue,
      netProfit,
      profitMargin,
      feedShare: ((feedTotal / (totalOPEX || 1)) * 100).toFixed(1),
      laborShare: ((laborTotal / (totalOPEX || 1)) * 100).toFixed(1),
      utilityShare: ((utilityTotal / (totalOPEX || 1)) * 100).toFixed(1),
      vetShare: ((vetTotal / (totalOPEX || 1)) * 100).toFixed(1),
      hardwareShare: ((hardwareTotal / (totalOPEX || 1)) * 100).toFixed(1),
      emiShare: ((emiTotal / (totalOPEX || 1)) * 100).toFixed(1),
      customShare: ((customTotal / (totalOPEX || 1)) * 100).toFixed(1),
      count: monthExpenses.length
    };
  }, [monthExpenses, selectedMonth, totalAnnualMilkRevenue, monthlyMilkRevenueMap]);

  // Annual 12-Month Matrix Breakdown (for Whole Year 2026 View)
  const annualMonthlyBreakdown = useMemo(() => {
    const monthsMeta = [
      { id: '2026-01', name: 'January 2026', short: 'Jan', days: 31 },
      { id: '2026-02', name: 'February 2026', short: 'Feb', days: 28 },
      { id: '2026-03', name: 'March 2026', short: 'Mar', days: 31 },
      { id: '2026-04', name: 'April 2026', short: 'Apr', days: 30 },
      { id: '2026-05', name: 'May 2026', short: 'May', days: 31 },
      { id: '2026-06', name: 'June 2026', short: 'Jun', days: 30 },
      { id: '2026-07', name: 'July 2026', short: 'Jul', days: 31 },
      { id: '2026-08', name: 'August 2026', short: 'Aug', days: 31 },
      { id: '2026-09', name: 'September 2026', short: 'Sep', days: 30 },
      { id: '2026-10', name: 'October 2026', short: 'Oct', days: 31 },
      { id: '2026-11', name: 'November 2026', short: 'Nov', days: 30 },
      { id: '2026-12', name: 'December 2026', short: 'Dec', days: 31 },
    ];

    return monthsMeta.map((m) => {
      const mBills = expenses.filter(e => e.date.startsWith(m.id));
      const feed = mBills.filter(e => e.category === 'Feed & Nutrition').reduce((s, e) => s + e.amount, 0);
      const labor = mBills.filter(e => e.category === 'Labor & Salaries').reduce((s, e) => s + e.amount, 0);
      const utilities = mBills.filter(e => e.category === 'Utilities & Bills').reduce((s, e) => s + e.amount, 0);
      const vet = mBills.filter(e => e.category === 'Veterinary & Health').reduce((s, e) => s + e.amount, 0);
      const hardware = mBills.filter(e => e.category === 'Hardware & Maint').reduce((s, e) => s + e.amount, 0);
      const emi = mBills.filter(e => e.category === 'Loans & EMI').reduce((s, e) => s + e.amount, 0);
      const custom = mBills.filter(e => !['Feed & Nutrition', 'Labor & Salaries', 'Utilities & Bills', 'Veterinary & Health', 'Hardware & Maint', 'Loans & EMI'].includes(e.category)).reduce((s, e) => s + e.amount, 0);
      
      const totalOpex = mBills.reduce((s, e) => s + e.amount, 0);
      const revenue = monthlyMilkRevenueMap[m.id] || 0;
      const netProfit = revenue - totalOpex;
      const margin = ((netProfit / (revenue || 1)) * 100).toFixed(1);

      return {
        id: m.id,
        name: m.name,
        short: m.short,
        shortName: m.short,
        days: m.days,
        billsCount: mBills.length,
        feed,
        labor,
        utilities,
        vet,
        hardware,
        emi,
        custom,
        totalOpex,
        revenue,
        netProfit,
        margin
      };
    });
  }, [expenses, monthlyMilkRevenueMap]);

  // Category breakdown for graphical visualization
  const categoryChartData = useMemo(() => {
    const categoriesConfig = [
      { id: 'Feed & Nutrition', label: 'Feed & Fodder', gujarati: 'ખોરાક અને ભૂસું', color: '#F59E0B', bg: 'bg-amber-500', lightBg: 'bg-amber-50', textColor: 'text-amber-800' },
      { id: 'Labor & Salaries', label: 'Labor & Wages', gujarati: 'મજૂરી અને પગાર', color: '#6366F1', bg: 'bg-indigo-500', lightBg: 'bg-indigo-50', textColor: 'text-indigo-800' },
      { id: 'Utilities & Bills', label: 'Utilities & Power', gujarati: 'લાઇટ બિલ અને નેટ', color: '#06B6D4', bg: 'bg-cyan-500', lightBg: 'bg-cyan-50', textColor: 'text-cyan-800' },
      { id: 'Loans & EMI', label: 'Loans & EMI', gujarati: 'લોન અને હપ્તા', color: '#A855F7', bg: 'bg-purple-500', lightBg: 'bg-purple-50', textColor: 'text-purple-800' },
      { id: 'Veterinary & Health', label: 'Veterinary & Med', gujarati: 'તબીબી અને દવાઓ', color: '#F43F5E', bg: 'bg-rose-500', lightBg: 'bg-rose-50', textColor: 'text-rose-800' },
      { id: 'Hardware & Maint', label: 'Hardware & Maint', gujarati: 'સાધન અને રીપેરિંગ', color: '#F97316', bg: 'bg-orange-500', lightBg: 'bg-orange-50', textColor: 'text-orange-800' },
      { id: 'Diesel & Machinery', label: 'Diesel & Fuel', gujarati: 'ડીઝલ અને ટ્રેક્ટર', color: '#10B981', bg: 'bg-emerald-500', lightBg: 'bg-emerald-50', textColor: 'text-emerald-800' },
    ];

    // Include custom categories if any
    customCategories.forEach(customCat => {
      categoriesConfig.push({
        id: customCat.id,
        label: customCat.label,
        gujarati: 'કસ્ટમ કેટેગરી',
        color: '#14B8A6',
        bg: 'bg-teal-500',
        lightBg: 'bg-teal-50',
        textColor: 'text-teal-800'
      });
    });

    const activeList = isAnnualView ? expenses : monthExpenses;
    const total = activeList.reduce((s, e) => s + e.amount, 0) || 1;

    let accumulatedPct = 0;
    const C = 2 * Math.PI * 60; // circumference for r=60 (~376.99)

    return categoriesConfig.map(cat => {
      const catSpend = activeList.filter(e => e.category === cat.id).reduce((s, e) => s + e.amount, 0);
      const billsCount = activeList.filter(e => e.category === cat.id).length;
      const share = ((catSpend / total) * 100).toFixed(1);
      const percentage = parseFloat(share);

      const strokeDasharray = `${(percentage / 100) * C} ${C}`;
      const strokeDashoffset = `-${(accumulatedPct / 100) * C}`;
      accumulatedPct += percentage;

      return {
        ...cat,
        amount: catSpend,
        billsCount,
        percentage,
        strokeDasharray,
        strokeDashoffset
      };
    }).filter(cat => cat.amount > 0).sort((a, b) => b.amount - a.amount);
  }, [expenses, monthExpenses, isAnnualView, customCategories]);

  // Payment Mode breakdown for cashflow analytics
  const paymentModeData = useMemo(() => {
    const activeList = isAnnualView ? expenses : monthExpenses;
    const total = activeList.reduce((s, e) => s + e.amount, 0) || 1;
    const modes = [
      { name: 'Bank Transfer', label: 'બેંક ટ્રાન્સફર', color: '#3B82F6', bg: 'bg-blue-500', text: 'text-blue-700', lightBg: 'bg-blue-50' },
      { name: 'UPI / GPay', label: 'UPI / ઓનલાઇન', color: '#10B981', bg: 'bg-emerald-500', text: 'text-emerald-700', lightBg: 'bg-emerald-50' },
      { name: 'Cash', label: 'રોકડ ચૂકવણી', color: '#F59E0B', bg: 'bg-amber-500', text: 'text-amber-700', lightBg: 'bg-amber-50' },
      { name: 'Auto-Debit', label: 'ઓટો ડેબિટ EMI', color: '#8B5CF6', bg: 'bg-purple-500', text: 'text-purple-700', lightBg: 'bg-purple-50' }
    ];

    return modes.map(m => {
      const bills = activeList.filter(e => (e.paymentMode || '').includes(m.name) || (m.name === 'UPI / GPay' && (e.paymentMode === 'UPI' || e.paymentMode === 'UPI / GPay')));
      const amount = bills.reduce((s, e) => s + e.amount, 0);
      const share = ((amount / total) * 100).toFixed(1);
      return {
        ...m,
        amount,
        count: bills.length,
        percentage: parseFloat(share)
      };
    }).filter(m => m.amount > 0).sort((a, b) => b.amount - a.amount);
  }, [expenses, monthExpenses, isAnnualView]);

  // Max value for 12-Month Bar Chart
  const maxChartValue = useMemo(() => {
    return Math.max(...annualMonthlyBreakdown.map(r => Math.max(r.revenue, r.totalOpex)), 1000000);
  }, [annualMonthlyBreakdown]);

  // Helper to cleanly separate English and Gujarati item labels
  const parseExpenseItem = (itemText) => {
    if (!itemText) return { english: '', gujarati: '', full: '' };
    const gujaratiMatch = itemText.match(/\(([^)]*[\u0A80-\u0AFF][^)]*)\)/);
    if (gujaratiMatch) {
      const gujarati = gujaratiMatch[1].trim();
      const english = itemText.replace(gujaratiMatch[0], '').trim();
      return { english, gujarati, full: itemText };
    }
    return { english: itemText, gujarati: '-', full: itemText };
  };

  // CSV Export for Selected Period (Enhanced with UTF-8 BOM for Excel & Structured Executive Financial Layout)
  const handleDownloadCSV = () => {
    let csvLines = [];
    const exportDateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    if (selectedMonth === '2026-ALL') {
      // Annual 2026 Consolidated CSV
      csvLines.push('"================================================================================================================="');
      csvLines.push('"KALP BUFFALO FARM - ANNUAL OPEX REGISTER & FINANCIAL PERFORMANCE (FY 2026)"');
      csvLines.push(`"Report Type:","Consolidated 12-Month Matrix","Financial Year:","2026 (Jan - Dec)","Generated:","${exportDateStr}"`);
      csvLines.push(`"Category Filter:","${selectedCategory}","Total Annual OPEX:","₹ ${annualMonthlyBreakdown.reduce((s, r) => s + r.totalOpex, 0).toLocaleString('en-IN')}","Annual Net Profit:","+₹ ${annualMonthlyBreakdown.reduce((s, r) => s + r.netProfit, 0).toLocaleString('en-IN')}"`);
      csvLines.push('"================================================================================================================="');
      csvLines.push('""');

      if (selectedCategory === 'All') {
        csvLines.push('"Sr. No.","Month","Feed & Fodder (₹)","Labor & Wages (₹)","Utilities (₹)","Veterinary & Med (₹)","Hardware & Maint (₹)","Loans & EMI (₹)","Custom / Other (₹)","Total Monthly OPEX (₹)","Milk Revenue (₹)","Net Farm Profit (₹)","Margin (%)"');

        annualMonthlyBreakdown.forEach((row, idx) => {
          csvLines.push([
            idx + 1,
            `"${row.name}"`,
            row.feed,
            row.labor,
            row.utilities,
            row.vet,
            row.hardware,
            row.emi,
            row.custom,
            row.totalOpex,
            row.revenue,
            row.netProfit,
            `"${row.margin}%"`
          ].join(','));
        });

        const totalFeed = annualMonthlyBreakdown.reduce((s, r) => s + r.feed, 0);
        const totalLabor = annualMonthlyBreakdown.reduce((s, r) => s + r.labor, 0);
        const totalUtilities = annualMonthlyBreakdown.reduce((s, r) => s + r.utilities, 0);
        const totalVet = annualMonthlyBreakdown.reduce((s, r) => s + r.vet, 0);
        const totalHardware = annualMonthlyBreakdown.reduce((s, r) => s + r.hardware, 0);
        const totalEmi = annualMonthlyBreakdown.reduce((s, r) => s + r.emi, 0);
        const totalCustom = annualMonthlyBreakdown.reduce((s, r) => s + r.custom, 0);
        const totalAnnualOpex = annualMonthlyBreakdown.reduce((s, r) => s + r.totalOpex, 0);
        const totalAnnualRevenue = annualMonthlyBreakdown.reduce((s, r) => s + r.revenue, 0);
        const totalAnnualProfit = annualMonthlyBreakdown.reduce((s, r) => s + r.netProfit, 0);
        const annualMargin = ((totalAnnualProfit / (totalAnnualRevenue || 1)) * 100).toFixed(1);

        csvLines.push('""');
        csvLines.push('"-----------------------------------------------------------------------------------------------------------------"');
        csvLines.push([
          '"TOTAL"',
          '"Whole Year 2026 (Consolidated)"',
          totalFeed,
          totalLabor,
          totalUtilities,
          totalVet,
          totalHardware,
          totalEmi,
          totalCustom,
          totalAnnualOpex,
          totalAnnualRevenue,
          totalAnnualProfit,
          `"${annualMargin}%"`
        ].join(','));
        csvLines.push('"-----------------------------------------------------------------------------------------------------------------"');
      } else {
        // Filtered by specific category in yearly view
        csvLines.push('"Sr. No.","Month","Category","Monthly Expense (₹)","Bills Count"');
        let totalCatAmount = 0;
        let totalCatBills = 0;

        annualMonthlyBreakdown.forEach((row, idx) => {
          const mBills = expenses.filter(e => e.date.startsWith(row.id) && e.category === selectedCategory);
          const catSum = mBills.reduce((s, e) => s + e.amount, 0);
          totalCatAmount += catSum;
          totalCatBills += mBills.length;

          csvLines.push([
            idx + 1,
            `"${row.name}"`,
            `"${selectedCategory}"`,
            catSum,
            mBills.length
          ].join(','));
        });

        csvLines.push('""');
        csvLines.push(['"TOTAL"', '"Whole Year 2026"', `"${selectedCategory}"`, totalCatAmount, totalCatBills].join(','));
      }

      const csvContent = csvLines.join('\n');
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Kalp_Dairy_Annual_Expenses_2026.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    // Monthly View Detailed CSV with UTF-8 BOM & Clean Separated Gujarati Names
    csvLines.push('"================================================================================================================="');
    csvLines.push('"KALP BUFFALO FARM - MONTHLY OPEX REGISTER & EXPENSE LEDGER"');
    csvLines.push(`"Report Period:","${formattedMonthName}","Generated Date:","${exportDateStr}","Category:","${selectedCategory}"`);
    csvLines.push(`"Total Farm OPEX:","₹ ${expenseMetrics.totalOPEX.toLocaleString('en-IN')}","Gross Milk Sales:","₹ ${expenseMetrics.monthlyMilkRevenue.toLocaleString('en-IN')}","Net Farm Profit:","+₹ ${expenseMetrics.netProfit.toLocaleString('en-IN')} (${expenseMetrics.profitMargin}%)"`);
    csvLines.push('"================================================================================================================="');
    csvLines.push('""');

    // Headers with separated English & Gujarati columns
    csvLines.push('"Sr. No.","Date","Expense Item (English)","Gujarati Label (ગુજરાતી નામ)","Category","Paid To / Vendor","Payment Mode","Amount (₹)","Status","Notes"');

    filteredExpenses.forEach((e, idx) => {
      const parsed = parseExpenseItem(e.item);
      csvLines.push([
        idx + 1,
        `"${e.date}"`,
        `"${parsed.english.replace(/"/g, '""')}"`,
        `"${parsed.gujarati.replace(/"/g, '""')}"`,
        `"${e.category}"`,
        `"${(e.paidTo || '').replace(/"/g, '""')}"`,
        `"${e.paymentMode || ''}"`,
        e.amount,
        `"${e.status}"`,
        `"${(e.notes || '').replace(/"/g, '""')}"`
      ].join(','));
    });

    csvLines.push('""');
    csvLines.push('"-----------------------------------------------------------------------------------------------------------------"');
    csvLines.push([
      '"TOTAL"',
      `"${formattedMonthName}"`,
      '"ALL FILTERED EXPENSES"',
      '"બધા ફિલ્ટર કરેલા ખર્ચ"',
      `"${selectedCategory}"`,
      '""',
      '""',
      expenseMetrics.totalOPEX,
      '"VERIFIED & PAID"',
      '""'
    ].join(','));
    csvLines.push('"-----------------------------------------------------------------------------------------------------------------"');
    csvLines.push('""');

    // Executive Summary Section in CSV
    csvLines.push('"================================================================================================================="');
    csvLines.push(`"EXECUTIVE P&L RECONCILIATION SUMMARY (${formattedMonthName})"`);
    csvLines.push('"Financial Head","Amount (₹)","Operational Remarks"');
    csvLines.push(`"Gross Realized Milk Sales Revenue","₹ ${expenseMetrics.monthlyMilkRevenue.toLocaleString('en-IN')}","Total Realized Income"`);
    csvLines.push(`"Total Farm Operating Expenses (OPEX)","₹ ${expenseMetrics.totalOPEX.toLocaleString('en-IN')}","Farm Bills & Running Costs"`);
    csvLines.push(`"Net Farm Operating Profit","+₹ ${expenseMetrics.netProfit.toLocaleString('en-IN')}","Farm Operational Return"`);
    csvLines.push(`"Net Farm Margin (%)","${expenseMetrics.profitMargin}%","Operational Margin"`);
    csvLines.push('""');
    csvLines.push(`"COST CENTER EXPENSE BREAKDOWN (${formattedMonthName})"`);
    csvLines.push('"Category Cost Center","Gujarati (ગુજરાતી)","Amount (₹)","OPEX Share (%)"');
    csvLines.push(`"Feed & Nutrition","ખોરાક અને ભૂસું","₹ ${expenseMetrics.feedTotal.toLocaleString('en-IN')}","${expenseMetrics.feedShare}%"`);
    csvLines.push(`"Labor & Salaries","મજૂરી અને પગાર","₹ ${expenseMetrics.laborTotal.toLocaleString('en-IN')}","${expenseMetrics.laborShare}%"`);
    csvLines.push(`"Utilities & Bills","લાઇટ બિલ અને ઇન્ટરનેટ","₹ ${expenseMetrics.utilityTotal.toLocaleString('en-IN')}","${expenseMetrics.utilityShare}%"`);
    csvLines.push(`"Veterinary & Healthcare","તબીબી અને દવાઓ","₹ ${expenseMetrics.vetTotal.toLocaleString('en-IN')}","${expenseMetrics.vetShare}%"`);
    csvLines.push(`"Hardware & Maintenance","સાધનો અને રીપેરિંગ","₹ ${expenseMetrics.hardwareTotal.toLocaleString('en-IN')}","${expenseMetrics.hardwareShare}%"`);
    csvLines.push(`"Loans & Capital EMI","લોન અને સાધન હપ્તા","₹ ${expenseMetrics.emiTotal.toLocaleString('en-IN')}","${expenseMetrics.emiShare}%"`);
    csvLines.push('"================================================================================================================="');

    const csvContent = csvLines.join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Kalp_Dairy_Expenses_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Live Formula-Powered Styled Excel (.xlsx) Export with Auto-Recalculation
  const handleDownloadExcel = () => {
    const exportDateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const wb = XLSX.utils.book_new();

    // Reusable Cell Styles
    const titleStyle = {
      font: { name: 'Segoe UI', sz: 14, bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '0F172A' } },
      alignment: { horizontal: 'center', vertical: 'center' }
    };

    const subtitleStyle = {
      font: { name: 'Segoe UI', sz: 10, bold: false, color: { rgb: '94A3B8' } },
      fill: { fgColor: { rgb: '1E293B' } },
      alignment: { horizontal: 'center', vertical: 'center' }
    };

    const kpiTitleStyle = (bgRgb, textRgb) => ({
      font: { name: 'Segoe UI', sz: 9, bold: true, color: { rgb: textRgb } },
      fill: { fgColor: { rgb: bgRgb } },
      alignment: { horizontal: 'center', vertical: 'center' }
    });

    const kpiValStyle = (bgRgb, textRgb, isPercent = false) => ({
      font: { name: 'Segoe UI', sz: 14, bold: true, color: { rgb: textRgb } },
      fill: { fgColor: { rgb: bgRgb } },
      alignment: { horizontal: 'center', vertical: 'center' },
      numFmt: isPercent ? '0.0%' : '"₹"#,##0'
    });

    const tableHeaderStyle = (bgRgb = '0F172A') => ({
      font: { name: 'Segoe UI', sz: 11, bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: bgRgb } },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
      border: {
        top: { style: 'thin', color: { rgb: '334155' } },
        bottom: { style: 'thin', color: { rgb: '334155' } },
        left: { style: 'thin', color: { rgb: '334155' } },
        right: { style: 'thin', color: { rgb: '334155' } }
      }
    });

    const dataCellStyle = (isAlt, align = 'left', isBold = false, isCurrency = false, isPercent = false, textColor = '1E293B') => ({
      font: { name: 'Segoe UI', sz: 10, bold: isBold, color: { rgb: textColor } },
      fill: { fgColor: { rgb: isAlt ? 'F8FAFC' : 'FFFFFF' } },
      alignment: { horizontal: align, vertical: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: 'E2E8F0' } },
        bottom: { style: 'thin', color: { rgb: 'E2E8F0' } },
        left: { style: 'thin', color: { rgb: 'E2E8F0' } },
        right: { style: 'thin', color: { rgb: 'E2E8F0' } }
      },
      numFmt: isCurrency ? '"₹"#,##0' : isPercent ? '0.0%' : undefined
    });

    const statusPaidStyle = {
      font: { name: 'Segoe UI', sz: 9, bold: true, color: { rgb: '166534' } },
      fill: { fgColor: { rgb: 'DCFCE7' } },
      alignment: { horizontal: 'center', vertical: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: 'BBF7D0' } },
        bottom: { style: 'thin', color: { rgb: 'BBF7D0' } },
        left: { style: 'thin', color: { rgb: 'BBF7D0' } },
        right: { style: 'thin', color: { rgb: 'BBF7D0' } }
      }
    };

    const totalRowStyle = (align = 'left', isCurrency = false, isPercent = false, bgRgb = '0F172A', textRgb = 'FFFFFF') => ({
      font: { name: 'Segoe UI', sz: 11, bold: true, color: { rgb: textRgb } },
      fill: { fgColor: { rgb: bgRgb } },
      alignment: { horizontal: align, vertical: 'center' },
      border: {
        top: { style: 'medium', color: { rgb: '0F172A' } },
        bottom: { style: 'medium', color: { rgb: '0F172A' } },
        left: { style: 'thin', color: { rgb: '334155' } },
        right: { style: 'thin', color: { rgb: '334155' } }
      },
      numFmt: isCurrency ? '"₹"#,##0' : isPercent ? '0.0%' : undefined
    });

    let ws = {};

    if (selectedMonth === '2026-ALL') {
      // ==========================================
      // ANNUAL 2026 CONSOLIDATED EXCEL WITH LIVE FORMULAS
      // ==========================================
      const rows = [];
      rows.push(['🐄 KALP BUFFALO FARM - ANNUAL OPEX REGISTER & FINANCIAL MATRIX (FY 2026)']);
      rows.push([`Period: Whole Year 2026 | Category: ${selectedCategory} | Generated: ${exportDateStr} | Live Formulas Active`]);
      rows.push([]);

      const annualTotalExpenses = annualMonthlyBreakdown.reduce((s, r) => s + r.totalOpex, 0);
      const annualTotalMilkSales = annualMonthlyBreakdown.reduce((s, r) => s + r.revenue, 0);
      const annualNetProfit = annualTotalMilkSales - annualTotalExpenses;
      const annualMargin = annualTotalMilkSales > 0 ? (annualNetProfit / annualTotalMilkSales) : 0;

      // Top KPI Cards (Row 4 & 5) - Real Live Auto-Recalculating Formulas
      rows.push([
        'ANNUAL FARM OPEX', '', '',
        'ANNUAL GROSS MILK SALES', '', '',
        'NET ANNUAL FARM PROFIT', '', '',
        'ANNUAL NET PROFIT MARGIN', '', '', ''
      ]);
      rows.push([
        { t: 'n', f: 'J20', v: annualTotalExpenses, z: '"₹"#,##0' }, '', '',
        { t: 'n', f: 'K20', v: annualTotalMilkSales, z: '"₹"#,##0' }, '', '',
        { t: 'n', f: 'L20', v: annualNetProfit, z: '"₹"#,##0' }, '', '',
        { t: 'n', f: 'M20', v: annualMargin, z: '0.0%' }, '', '', ''
      ]);
      rows.push([]);

      // Headers (Row 7)
      rows.push([
        'Sr.', 'Month', 'Feed & Fodder (₹)', 'Labor & Wages (₹)', 'Utilities (₹)', 
        'Vet & Med (₹)', 'Hardware (₹)', 'Loans & EMI (₹)', 'Custom (₹)', 
        'Total OPEX (₹)', 'Milk Revenue (₹)', 'Net Profit (₹)', 'Margin'
      ]);

      // 12 Months Rows (Rows 8 to 19)
      annualMonthlyBreakdown.forEach((m, idx) => {
        const rowNum = 8 + idx;
        const monthProfit = m.revenue - m.totalOpex;
        const monthMargin = m.revenue > 0 ? (monthProfit / m.revenue) : 0;
        rows.push([
          idx + 1,
          m.name,
          m.feed,
          m.labor,
          m.utilities,
          m.vet,
          m.hardware,
          m.emi,
          m.custom,
          { t: 'n', f: `SUM(C${rowNum}:I${rowNum})`, v: m.totalOpex, z: '"₹"#,##0' },
          m.revenue,
          { t: 'n', f: `K${rowNum}-J${rowNum}`, v: monthProfit, z: '"₹"#,##0' },
          { t: 'n', f: `L${rowNum}/K${rowNum}`, v: monthMargin, z: '0.0%' }
        ]);
      });

      // Annual Totals Row (Row 20)
      rows.push([
        'TOTAL',
        'Whole Year 2026',
        { t: 'n', f: 'SUM(C8:C19)', v: annualMonthlyBreakdown.reduce((s, r) => s + r.feed, 0), z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(D8:D19)', v: annualMonthlyBreakdown.reduce((s, r) => s + r.labor, 0), z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(E8:E19)', v: annualMonthlyBreakdown.reduce((s, r) => s + r.utilities, 0), z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(F8:F19)', v: annualMonthlyBreakdown.reduce((s, r) => s + r.vet, 0), z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(G8:G19)', v: annualMonthlyBreakdown.reduce((s, r) => s + r.hardware, 0), z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(H8:H19)', v: annualMonthlyBreakdown.reduce((s, r) => s + r.emi, 0), z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(I8:I19)', v: annualMonthlyBreakdown.reduce((s, r) => s + r.custom, 0), z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(J8:J19)', v: annualTotalExpenses, z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(K8:K19)', v: annualTotalMilkSales, z: '"₹"#,##0' },
        { t: 'n', f: 'SUM(L8:L19)', v: annualNetProfit, z: '"₹"#,##0' },
        { t: 'n', f: 'L20/K20', v: annualMargin, z: '0.0%' }
      ]);

      ws = XLSX.utils.aoa_to_sheet(rows);

      // Merges
      ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 12 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 12 } },
        { s: { r: 3, c: 0 }, e: { r: 3, c: 2 } },
        { s: { r: 4, c: 0 }, e: { r: 4, c: 2 } },
        { s: { r: 3, c: 3 }, e: { r: 3, c: 5 } },
        { s: { r: 4, c: 3 }, e: { r: 4, c: 5 } },
        { s: { r: 3, c: 6 }, e: { r: 3, c: 8 } },
        { s: { r: 4, c: 6 }, e: { r: 4, c: 8 } },
        { s: { r: 3, c: 9 }, e: { r: 3, c: 12 } },
        { s: { r: 4, c: 9 }, e: { r: 4, c: 12 } }
      ];

      // Column widths
      ws['!cols'] = [
        { wch: 6 }, { wch: 18 }, { wch: 17 }, { wch: 17 }, { wch: 15 },
        { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 14 },
        { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 12 }
      ];

      // Apply Styles
      ws['A1'].s = titleStyle;
      ws['A2'].s = subtitleStyle;

      // KPI styles
      ws['A4'].s = kpiTitleStyle('FFF1F2', 'BE123C');
      ws['A5'].s = kpiValStyle('FFF1F2', 'BE123C');
      ws['D4'].s = kpiTitleStyle('EFF6FF', '1D4ED8');
      ws['D5'].s = kpiValStyle('EFF6FF', '1D4ED8');
      ws['G4'].s = kpiTitleStyle('F0FDF4', '15803D');
      ws['G5'].s = kpiValStyle('F0FDF4', '15803D');
      ws['J4'].s = kpiTitleStyle('FEF3C7', 'B45309');
      ws['J5'].s = kpiValStyle('FEF3C7', 'B45309', true);

      // Header style
      for (let c = 0; c <= 12; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: 6, c });
        if (ws[cellRef]) ws[cellRef].s = tableHeaderStyle(c === 9 ? 'BE123C' : c === 11 ? '15803D' : '0F172A');
      }

      // Data Rows styles
      for (let r = 7; r <= 18; r++) {
        const isAlt = (r % 2 === 0);
        for (let c = 0; c <= 12; c++) {
          const cellRef = XLSX.utils.encode_cell({ r, c });
          if (!ws[cellRef]) continue;
          if (c === 0) ws[cellRef].s = dataCellStyle(isAlt, 'center');
          else if (c === 1) ws[cellRef].s = dataCellStyle(isAlt, 'left', true);
          else if (c >= 2 && c <= 8) ws[cellRef].s = dataCellStyle(isAlt, 'right', false, true);
          else if (c === 9) ws[cellRef].s = dataCellStyle(isAlt, 'right', true, true, false, 'BE123C');
          else if (c === 10) ws[cellRef].s = dataCellStyle(isAlt, 'right', true, true);
          else if (c === 11) ws[cellRef].s = dataCellStyle(isAlt, 'right', true, true, false, '15803D');
          else if (c === 12) ws[cellRef].s = dataCellStyle(isAlt, 'center', true, false, true, '15803D');
        }
      }

      // Total Row styles
      for (let c = 0; c <= 12; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: 19, c });
        if (!ws[cellRef]) continue;
        if (c <= 1) ws[cellRef].s = totalRowStyle('left');
        else if (c >= 2 && c <= 8) ws[cellRef].s = totalRowStyle('right', true);
        else if (c === 9) ws[cellRef].s = totalRowStyle('right', true, false, 'BE123C', 'FFFFFF');
        else if (c === 10) ws[cellRef].s = totalRowStyle('right', true);
        else if (c === 11) ws[cellRef].s = totalRowStyle('right', true, false, '15803D', 'FFFFFF');
        else if (c === 12) ws[cellRef].s = totalRowStyle('center', false, true, '0F172A', '86EFAC');
      }

      XLSX.utils.book_append_sheet(wb, ws, 'FY 2026 Annual Master');

    } else {
      // ==========================================
      // MONTHLY DETAILED EXCEL WITH LIVE FORMULAS
      // ==========================================
      const rows = [];
      const totalBills = filteredExpenses.length;
      const startDataRow = 8; // Row 8 in Excel (1-based)
      const endDataRow = totalBills > 0 ? (startDataRow + totalBills - 1) : startDataRow;
      const totalRowIndex = endDataRow + 1; // 1-based row number of grand total
      const netProfit = expenseMetrics.monthlyMilkRevenue - expenseMetrics.totalExpense;
      const netMargin = expenseMetrics.monthlyMilkRevenue > 0 ? (netProfit / expenseMetrics.monthlyMilkRevenue) : 0;

      // Row 1: Title
      rows.push(['🐄 KALP BUFFALO FARM - FARM OPEX REGISTER & FINANCIAL LEDGER']);
      // Row 2: Subtitle
      rows.push([`Period: ${formattedMonthName} | Category: ${selectedCategory} | Generated: ${exportDateStr} | Live Formulas Active`]);
      // Row 3: Blank
      rows.push([]);

      // Row 4 & 5: Top KPI Cards (Live Formulas!)
      rows.push([
        'TOTAL FARM OPEX', '',
        'GROSS MILK SALES', '',
        'NET FARM PROFIT', '', '',
        'NET PROFIT MARGIN', '', ''
      ]);
      rows.push([
        { t: 'n', f: `H${totalRowIndex}`, v: expenseMetrics.totalExpense, z: '"₹"#,##0' }, '',
        { t: 'n', v: expenseMetrics.monthlyMilkRevenue, z: '"₹"#,##0' }, '',
        { t: 'n', f: 'C5-A5', v: netProfit, z: '"₹"#,##0' }, '', '',
        { t: 'n', f: 'E5/C5', v: netMargin, z: '0.0%' }, '', ''
      ]);
      // Row 6: Blank
      rows.push([]);

      // Row 7: Table Headers
      rows.push([
        'Sr. No.', 'Date', 'Expense Item (English)', 'Gujarati Name (ગુજરાતી નામ)',
        'Category', 'Paid To / Vendor', 'Payment Mode', 'Amount (INR)', 'Status', 'Notes'
      ]);

      // Rows 8 to N: Bills Data
      filteredExpenses.forEach((e, idx) => {
        const parsed = parseExpenseItem(e.item);
        rows.push([
          idx + 1,
          e.date,
          parsed.english,
          parsed.gujarati,
          e.category,
          e.paidTo || '-',
          e.paymentMode || '-',
          e.amount,
          e.status,
          e.notes || ''
        ]);
      });

      // Grand Total Row (Row N+1)
      rows.push([
        'TOTAL MONTHLY OPEX (LIVE SUM):', '', '', '', '', '', '',
        { t: 'n', f: totalBills > 0 ? `SUM(H${startDataRow}:H${endDataRow})` : '0', v: expenseMetrics.totalExpense, z: '"₹"#,##0' },
        'ALL PAID', ''
      ]);

      // Blank row
      rows.push([]);

      // Category Breakdown Table with SUMIF Formulas!
      const catStartRow = totalRowIndex + 3; // 1-based Excel row
      rows.push([`📊 Cost Center Category Breakdown (${formattedMonthName}) - Auto-Calculated via SUMIF`]);
      rows.push(['Cost Center / Category', 'Gujarati (ગુજરાતી)', 'Monthly Spend (INR)', 'Share of OPEX (%)']);

      const standardCats = defaultCategories
        .filter(c => c.id !== 'All')
        .concat(customCategories)
        .map(c => ({
          id: c.id,
          label: c.label,
          gujarati: c.sublabel || 'કસ્ટમ કેટેગરી'
        }));

      const firstCatRow = catStartRow + 1; // row with first category data
      standardCats.forEach((cat, cIdx) => {
        const currentRow = firstCatRow + cIdx;
        const catSpent = filteredExpenses.filter(e => e.category === cat.id).reduce((s, e) => s + e.amount, 0);
        const catShare = expenseMetrics.totalExpense > 0 ? (catSpent / expenseMetrics.totalExpense) : 0;
        rows.push([
          cat.label,
          cat.gujarati,
          { t: 'n', f: totalBills > 0 ? `SUMIF($E$${startDataRow}:$E$${endDataRow}, "${cat.id}", $H$${startDataRow}:$H$${endDataRow})` : '0', v: catSpent, z: '"₹"#,##0' },
          { t: 'n', f: `C${currentRow}/$H$${totalRowIndex}`, v: catShare, z: '0.0%' }
        ]);
      });

      const lastCatRow = firstCatRow + standardCats.length - 1;
      const catTotalRow = lastCatRow + 1;

      // Category Total Row
      rows.push([
        'TOTAL CATEGORY OPEX:', '',
        { t: 'n', f: `SUM(C${firstCatRow}:C${lastCatRow})`, v: expenseMetrics.totalExpense, z: '"₹"#,##0' },
        { t: 'n', f: `SUM(D${firstCatRow}:D${lastCatRow})`, v: 1.0, z: '0.0%' }
      ]);

      ws = XLSX.utils.aoa_to_sheet(rows);

      // Merges
      ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }, // Title
        { s: { r: 1, c: 0 }, e: { r: 1, c: 9 } }, // Subtitle
        { s: { r: 3, c: 0 }, e: { r: 3, c: 1 } }, // KPI 1 title
        { s: { r: 4, c: 0 }, e: { r: 4, c: 1 } }, // KPI 1 val
        { s: { r: 3, c: 2 }, e: { r: 3, c: 3 } }, // KPI 2 title
        { s: { r: 4, c: 2 }, e: { r: 4, c: 3 } }, // KPI 2 val
        { s: { r: 3, c: 4 }, e: { r: 3, c: 6 } }, // KPI 3 title
        { s: { r: 4, c: 4 }, e: { r: 4, c: 6 } }, // KPI 3 val
        { s: { r: 3, c: 7 }, e: { r: 3, c: 9 } }, // KPI 4 title
        { s: { r: 4, c: 7 }, e: { r: 4, c: 9 } }, // KPI 4 val
        { s: { r: totalRowIndex - 1, c: 0 }, e: { r: totalRowIndex - 1, c: 6 } }, // Table Grand Total label
        { s: { r: catStartRow - 2, c: 0 }, e: { r: catStartRow - 2, c: 3 } }, // Category section title
        { s: { r: catTotalRow - 1, c: 0 }, e: { r: catTotalRow - 1, c: 1 } }  // Category Total label
      ];

      // Column widths (Generous width to prevent truncation)
      ws['!cols'] = [
        { wch: 8 },  // A: Sr. No.
        { wch: 13 }, // B: Date
        { wch: 34 }, // C: Expense Item
        { wch: 34 }, // D: Gujarati Name
        { wch: 22 }, // E: Category
        { wch: 30 }, // F: Paid To / Vendor
        { wch: 16 }, // G: Payment Mode
        { wch: 18 }, // H: Amount (INR)
        { wch: 13 }, // I: Status
        { wch: 42 }  // J: Notes
      ];

      // Apply Styles
      ws['A1'].s = titleStyle;
      ws['A2'].s = subtitleStyle;

      // KPI styles
      ws['A4'].s = kpiTitleStyle('FFF1F2', 'BE123C');
      ws['A5'].s = kpiValStyle('FFF1F2', 'BE123C');
      ws['C4'].s = kpiTitleStyle('EFF6FF', '1D4ED8');
      ws['C5'].s = kpiValStyle('EFF6FF', '1D4ED8');
      ws['E4'].s = kpiTitleStyle('F0FDF4', '15803D');
      ws['E5'].s = kpiValStyle('F0FDF4', '15803D');
      ws['H4'].s = kpiTitleStyle('FEF3C7', 'B45309');
      ws['H5'].s = kpiValStyle('FEF3C7', 'B45309', true);

      // Table Header Row Style (Row 7, r=6)
      for (let c = 0; c <= 9; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: 6, c });
        if (ws[cellRef]) ws[cellRef].s = tableHeaderStyle(c === 7 ? 'BE123C' : '0F172A');
      }

      // Data Rows Styles (r=7 to endDataRow-1)
      for (let r = 7; r <= endDataRow - 1; r++) {
        const isAlt = (r % 2 === 0);
        for (let c = 0; c <= 9; c++) {
          const cellRef = XLSX.utils.encode_cell({ r, c });
          if (!ws[cellRef]) continue;
          if (c === 0 || c === 1 || c === 6) ws[cellRef].s = dataCellStyle(isAlt, 'center');
          else if (c === 2) ws[cellRef].s = dataCellStyle(isAlt, 'left', true);
          else if (c === 3) ws[cellRef].s = dataCellStyle(isAlt, 'left', true, false, false, '047857');
          else if (c === 7) ws[cellRef].s = dataCellStyle(isAlt, 'right', true, true, false, 'BE123C');
          else if (c === 8) ws[cellRef].s = statusPaidStyle;
          else ws[cellRef].s = dataCellStyle(isAlt, 'left');
        }
      }

      // Grand Total Row Style (r=totalRowIndex - 1)
      const trIdx = totalRowIndex - 1;
      for (let c = 0; c <= 9; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: trIdx, c });
        if (!ws[cellRef]) continue;
        if (c <= 6) ws[cellRef].s = totalRowStyle('right');
        else if (c === 7) ws[cellRef].s = totalRowStyle('right', true, false, 'BE123C', 'FFFFFF');
        else if (c >= 8) ws[cellRef].s = totalRowStyle('center', false, false, '0F172A', '86EFAC');
      }

      // Category Section Title (r=catStartRow - 2)
      const catTitleRef = XLSX.utils.encode_cell({ r: catStartRow - 2, c: 0 });
      if (ws[catTitleRef]) {
        ws[catTitleRef].s = {
          font: { name: 'Segoe UI', sz: 12, bold: true, color: { rgb: '0F172A' } },
          fill: { fgColor: { rgb: 'F1F5F9' } },
          alignment: { horizontal: 'left', vertical: 'center' }
        };
      }

      // Category Headers (r=catStartRow - 1)
      for (let c = 0; c <= 3; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: catStartRow - 1, c });
        if (ws[cellRef]) ws[cellRef].s = tableHeaderStyle('1E293B');
      }

      // Category Data Rows
      for (let r = firstCatRow - 1; r <= lastCatRow - 1; r++) {
        const isAlt = (r % 2 === 0);
        for (let c = 0; c <= 3; c++) {
          const cellRef = XLSX.utils.encode_cell({ r, c });
          if (!ws[cellRef]) continue;
          if (c === 0) ws[cellRef].s = dataCellStyle(isAlt, 'left', true);
          else if (c === 1) ws[cellRef].s = dataCellStyle(isAlt, 'left', false, false, false, '047857');
          else if (c === 2) ws[cellRef].s = dataCellStyle(isAlt, 'right', true, true);
          else if (c === 3) ws[cellRef].s = dataCellStyle(isAlt, 'center', true, false, true, 'B45309');
        }
      }

      // Category Total Row
      const catTotIdx = catTotalRow - 1;
      for (let c = 0; c <= 3; c++) {
        const cellRef = XLSX.utils.encode_cell({ r: catTotIdx, c });
        if (!ws[cellRef]) continue;
        if (c <= 1) ws[cellRef].s = totalRowStyle('left');
        else if (c === 2) ws[cellRef].s = totalRowStyle('right', true, false, '0F172A', 'FFFFFF');
        else if (c === 3) ws[cellRef].s = totalRowStyle('center', false, true, '0F172A', '86EFAC');
      }

      XLSX.utils.book_append_sheet(wb, ws, `${formattedMonthName} Expenses`);
    }

    // Write file with Array buffer and download as real .xlsx
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kalp_Dairy_Expenses_${selectedMonth === '2026-ALL' ? 'Annual_2026' : selectedMonth}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* ========================================================================= */}
      {/* TOP CONTROLS & ACTIONS BAR WITH BALANCED SPACING */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        
        {/* Quick Segmented Mode Toggle on the Left */}
        <div className="flex items-center bg-slate-200/60 p-1 rounded-2xl border border-slate-300/70 shadow-2xs">
          <button
            onClick={() => handleTogglePeriodType('month')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              !isAnnualView
                ? 'bg-white text-slate-900 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to Monthly breakdown"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-700" />
            <span>Monthly</span>
          </button>

          <button
            onClick={() => handleTogglePeriodType('year')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              isAnnualView
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="View Consolidated Whole Year 2026 Data"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Whole Year 2026</span>
          </button>
        </div>

        {/* Stepper, CSV & New Expense on the Right */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Enhanced Month Selector Dropdown with Prev/Next Steppers */}
          <div className="flex items-center bg-white border border-slate-200/90 rounded-2xl shadow-sm p-0.5 hover:border-slate-300 transition-all">
            <button
              onClick={handlePrevMonth}
              title="Previous Month / Period"
              disabled={selectedMonth === monthsList[0].id}
              className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1">
              <CalendarRange className={`w-3.5 h-3.5 shrink-0 ${isAnnualView ? 'text-amber-500' : 'text-emerald-600'}`} />
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value !== '2026-ALL') {
                    setLastActiveMonth(e.target.value);
                  }
                }}
                className="text-xs font-black text-slate-800 bg-transparent focus:outline-none cursor-pointer pr-1"
              >
                {monthsList.map(m => (
                  <option key={m.id} value={m.id} className={m.isAnnual ? 'font-black text-emerald-800 bg-emerald-50' : ''}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleNextMonth}
              title="Next Month / Period"
              disabled={selectedMonth === monthsList[monthsList.length - 1].id}
              className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Export Excel (.xlsx) - Live Formula Engine with Auto-Recalculation */}
          <button 
            onClick={handleDownloadExcel}
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-black px-3.5 py-2 rounded-2xl shadow-sm transition-all cursor-pointer hover:shadow-xs"
            title="Download Live Formula-Powered Excel Spreadsheet (.xlsx) with Auto-Recalculating Totals, SUMIF & Clean Gujarati"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Excel (.xlsx)</span>
          </button>

          {/* Download CSV (.csv) - Formatted with UTF-8 BOM & Clean Gujarati */}
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-2xl shadow-sm transition-all cursor-pointer"
            title={`Download Formatted UTF-8 CSV (.csv) with Gujarati fix`}
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>CSV</span>
          </button>

          {/* Log New Expense */}
          <button 
            onClick={() => handleOpenModal(null)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-md shadow-rose-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Expense</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SPATIOUS EXECUTIVE OPEX KPI CARDS (2 ROWS OF 4 EXPANDED VERTICAL BOXES) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Card 1: Total OPEX */}
        <div 
          onClick={() => setSelectedCategory('All')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:border-slate-300"
          title={`Click to view all ${formattedMonthName} expenses`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-600"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              {isAnnualView ? 'Annual Farm OPEX' : 'Total Farm OPEX'}
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none block">
              ₹{expenseMetrics.totalOPEX.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-semibold block mt-2">
              {expenseMetrics.count} bills recorded in {formattedMonthName}
            </span>
          </div>
        </div>

        {/* Card 2: Feed & Fodder Cost */}
        <div 
          onClick={() => setSelectedCategory('Feed & Nutrition')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:border-amber-300"
          title="Click to filter Feed & Fodder expenses"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Feed & Fodder (ખોરાક)
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Wheat className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight leading-none block">
              ₹{expenseMetrics.feedTotal.toLocaleString()}
            </span>
            <span className="inline-block bg-amber-50 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md mt-2">
              {expenseMetrics.feedShare}% of OPEX • Khod, bhusu, charo
            </span>
          </div>
        </div>

        {/* Card 3: Labor & Salaries */}
        <div 
          onClick={() => setSelectedCategory('Labor & Salaries')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:border-indigo-300"
          title="Click to filter Labor & Salaries"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Labor & Wages (મજૂરી)
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight leading-none block">
              ₹{expenseMetrics.laborTotal.toLocaleString()}
            </span>
            <span className="inline-block bg-indigo-50 text-indigo-800 text-[11px] font-bold px-2 py-0.5 rounded-md mt-2">
              {expenseMetrics.laborShare}% of OPEX • Milkers & wages
            </span>
          </div>
        </div>

        {/* Card 4: Utilities & Bills */}
        <div 
          onClick={() => setSelectedCategory('Utilities & Bills')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:border-cyan-300"
          title="Click to filter Utilities & Power"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Utilities (લાઇટ/નેટ)
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none block">
              ₹{expenseMetrics.utilityTotal.toLocaleString()}
            </span>
            <span className="inline-block text-slate-500 text-[11px] font-bold mt-2">
              {expenseMetrics.utilityShare}% • Power & internet bills
            </span>
          </div>
        </div>

        {/* Card 5: Veterinary & Healthcare */}
        <div 
          onClick={() => setSelectedCategory('Veterinary & Health')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:border-rose-300"
          title="Click to filter Veterinary & Medical"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-red-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Veterinary & Med (તબીબી)
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-rose-950 tracking-tight leading-none block">
              ₹{expenseMetrics.vetTotal.toLocaleString()}
            </span>
            <span className="inline-block text-rose-700 text-[11px] font-bold mt-2">
              {expenseMetrics.vetShare}% • Doctor fees & medicine
            </span>
          </div>
        </div>

        {/* Card 6: Hardware & Maintenance */}
        <div 
          onClick={() => setSelectedCategory('Hardware & Maint')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:border-orange-300"
          title="Click to filter Hardware & Maintenance"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Hardware & Maint (સાધન)
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-orange-950 tracking-tight leading-none block">
              ₹{expenseMetrics.hardwareTotal.toLocaleString()}
            </span>
            <span className="inline-block text-orange-800 text-[11px] font-bold mt-2">
              {expenseMetrics.hardwareShare}% • Chains & stall fittings
            </span>
          </div>
        </div>

        {/* Card 7: Loans & Capital EMI */}
        <div 
          onClick={() => setSelectedCategory('Loans & EMI')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:border-purple-300"
          title="Click to filter Loans & EMI"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-violet-600"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Loans & EMI (હપ્તા)
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-purple-950 tracking-tight leading-none block">
              ₹{expenseMetrics.emiTotal.toLocaleString()}
            </span>
            <span className="inline-block text-purple-800 text-[11px] font-bold mt-2">
              {expenseMetrics.emiShare}% • Tractor & Chiller loan installment
            </span>
          </div>
        </div>

        {/* Card 8+: Custom Categories / Diesel */}
        {customCategories.length > 0 ? (
          customCategories.slice(0, 1).map((customCat) => {
            const customSpend = monthExpenses
              .filter(e => e.category === customCat.id)
              .reduce((sum, e) => sum + e.amount, 0);
            const customShare = ((customSpend / (expenseMetrics.totalOPEX || 1)) * 100).toFixed(1);
            const customCount = monthExpenses.filter(e => e.category === customCat.id).length;

            return (
              <div 
                key={customCat.id}
                onClick={() => setSelectedCategory(customCat.id)}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:border-emerald-300"
                title={`Click to filter ${customCat.label}`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    {customCat.label}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight leading-none block">
                    ₹{customSpend.toLocaleString()}
                  </span>
                  <span className="inline-block text-emerald-700 text-[11px] font-bold mt-2">
                    {customShare}% of OPEX • {customCount} bills
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div 
            onClick={() => {
              setNewCategoryNameInput('');
              setShowNewCategoryModal(true);
            }}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-dashed border-emerald-300 shadow-xs relative overflow-hidden group hover:shadow-md transition-all cursor-pointer hover:bg-emerald-50/30 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">Custom Category</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Plus className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-base font-black text-emerald-900 block">+ Add Custom</span>
              <span className="text-xs text-slate-400 font-semibold block mt-1">Create new cost center</span>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* SPATIOUS EXECUTIVE P&L RECONCILIATION BAR (CLEAN SINGLE ROW) */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#181A1E] rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-white shadow-lg flex items-center justify-between gap-4 border border-slate-700/80 flex-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden">
        
        {/* Left: Clean Title & Net Margin */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <h3 className="text-sm sm:text-base font-black tracking-tight text-white whitespace-nowrap">
            {isAnnualView ? 'Whole Year 2026 Annual P&L' : `${formattedMonthName} P&L`}
          </h3>
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-400/30 whitespace-nowrap">
            {expenseMetrics.profitMargin}% Net Margin
          </span>
        </div>

        {/* Right: Live Calculation Formula Chips in One Row */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block whitespace-nowrap leading-none">
              {isAnnualView ? 'Annual Gross Milk Sales' : 'Gross Milk Sales'}
            </span>
            <span className="text-base sm:text-lg font-black text-white whitespace-nowrap mt-1 block">
              ₹{expenseMetrics.monthlyMilkRevenue.toLocaleString()}
            </span>
          </div>

          <span className="text-slate-500 font-black text-base">−</span>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-rose-300 block whitespace-nowrap leading-none">
              {isAnnualView ? 'Annual Farm OPEX' : 'Total Expenses'}
            </span>
            <span className="text-base sm:text-lg font-black text-rose-400 whitespace-nowrap mt-1 block">
              ₹{expenseMetrics.totalOPEX.toLocaleString()}
            </span>
          </div>

          <span className="text-slate-500 font-black text-base">=</span>

          <div className="bg-emerald-500/15 border border-emerald-500/35 px-4 py-1.5 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block whitespace-nowrap leading-none">
              {isAnnualView ? 'Net Annual Profit' : 'Net Farm Profit'}
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-400 whitespace-nowrap mt-0.5 block">
              +₹{expenseMetrics.netProfit.toLocaleString()}
            </span>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* WHOLE YEAR 2026: 12-MONTH FINANCIAL PERFORMANCE MATRIX TABLE */}
      {/* ========================================================================= */}
      {isAnnualView && (
        <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-sm overflow-hidden animate-in fade-in zoom-in-98 duration-200">
          
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-emerald-50/50 via-teal-50/30 to-slate-50/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  12-Month Annual Financial Performance Matrix (FY 2026)
                </h3>
                <p className="text-[11px] text-slate-500 font-semibold">
                  Consolidated monthly breakdown of Feed, Labor, Utilities, Vet, EMI, Milk Sales and Net Profits
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full">
                12 Months Consolidated
              </span>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px] scrollbar-thin">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-20 shadow-xs border-b border-slate-200 text-[11px] font-extrabold text-slate-600">
                <tr>
                  <th className="py-3 px-3.5 bg-slate-50/80">Month</th>
                  <th className="py-3 px-3 text-center">Days</th>
                  <th className="py-3 px-3 text-center">Bills</th>
                  <th className="py-3 px-3.5 text-right bg-amber-50/40 text-amber-950">Feed & Fodder (₹)</th>
                  <th className="py-3 px-3.5 text-right bg-indigo-50/40 text-indigo-950">Labor & Wages (₹)</th>
                  <th className="py-3 px-3 text-right bg-cyan-50/40 text-cyan-950">Utilities (₹)</th>
                  <th className="py-3 px-3.5 text-right">Vet/Maint/EMI (₹)</th>
                  <th className="py-3 px-3.5 text-right bg-rose-50/50 text-rose-950 font-black">Total OPEX (₹)</th>
                  <th className="py-3 px-3.5 text-right bg-slate-50 text-slate-900 font-black">Milk Revenue (₹)</th>
                  <th className="py-3 px-3.5 text-right bg-emerald-50 text-emerald-950 font-black">Net Profit (₹)</th>
                  <th className="py-3 px-2.5 text-center">Margin</th>
                  <th className="py-3 px-3 text-center bg-slate-50/80">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium">
                {annualMonthlyBreakdown.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/90 transition-colors bg-white">
                    <td className="py-2.5 px-3.5 whitespace-nowrap font-extrabold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{row.name}</span>
                        {row.id === '2026-10' && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">Current</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500 font-bold">{row.days}d</td>
                    <td className="py-2.5 px-3 text-center text-slate-600 font-semibold">{row.billsCount}</td>
                    <td className="py-2.5 px-3.5 text-right font-bold text-amber-900 bg-amber-50/20">₹{row.feed.toLocaleString()}</td>
                    <td className="py-2.5 px-3.5 text-right font-bold text-indigo-900 bg-indigo-50/20">₹{row.labor.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-cyan-900 bg-cyan-50/20">₹{row.utilities.toLocaleString()}</td>
                    <td className="py-2.5 px-3.5 text-right text-slate-700">₹{(row.vet + row.hardware + row.emi + row.custom).toLocaleString()}</td>
                    <td className="py-2.5 px-3.5 text-right font-black text-rose-600 bg-rose-50/30">₹{row.totalOpex.toLocaleString()}</td>
                    <td className="py-2.5 px-3.5 text-right font-black text-slate-900 bg-slate-50/50">₹{row.revenue.toLocaleString()}</td>
                    <td className="py-2.5 px-3.5 text-right font-black text-emerald-700 bg-emerald-50/40">+₹{row.netProfit.toLocaleString()}</td>
                    <td className="py-2.5 px-2.5 text-center">
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                        {row.margin}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedMonth(row.id);
                          setLastActiveMonth(row.id);
                        }}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-200/80 transition-all flex items-center justify-center gap-1 mx-auto cursor-pointer"
                        title={`Open ${row.name} in Monthly View`}
                      >
                        <span>Open Month</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Annual Matrix Footer */}
              <tfoot className="sticky bottom-0 bg-[#181A1E] text-white font-extrabold border-t-2 border-slate-900 z-20 shadow-2xl">
                <tr className="text-xs">
                  <td className="py-3 px-3.5 text-[11px] uppercase tracking-wider text-rose-400 font-black">
                    ANNUAL TOTALS (FY 2026)
                  </td>
                  <td className="py-3 px-3 text-center text-slate-400 text-[10px]">365 Days</td>
                  <td className="py-3 px-3 text-center text-slate-300 text-[11px] font-bold">
                    {expenses.length} bills
                  </td>
                  <td className="py-3 px-3.5 text-right text-amber-300 font-black">
                    ₹{annualMonthlyBreakdown.reduce((s, r) => s + r.feed, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-3.5 text-right text-indigo-300 font-black">
                    ₹{annualMonthlyBreakdown.reduce((s, r) => s + r.labor, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-cyan-300 font-black">
                    ₹{annualMonthlyBreakdown.reduce((s, r) => s + r.utilities, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-3.5 text-right text-slate-300 font-bold">
                    ₹{annualMonthlyBreakdown.reduce((s, r) => s + (r.vet + r.hardware + r.emi + r.custom), 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-3.5 text-right bg-rose-600 text-white font-black text-sm">
                    ₹{annualMonthlyBreakdown.reduce((s, r) => s + r.totalOpex, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-3.5 text-right bg-slate-800 text-white font-black text-sm">
                    ₹{annualMonthlyBreakdown.reduce((s, r) => s + r.revenue, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-3.5 text-right bg-emerald-700 text-white font-black text-sm">
                    +₹{annualMonthlyBreakdown.reduce((s, r) => s + r.netProfit, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-2.5 text-center text-emerald-300 text-[11px] font-black">
                    {expenseMetrics.profitMargin}%
                  </td>
                  <td className="py-3 px-3 text-center text-[10px] text-emerald-400 font-bold">
                    Verified
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CATEGORY SELECTOR DECK (SPACIOUS PILLS, NAMES ONLY WITHOUT NUMBERS) */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        
        {/* Sub-header row */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Cost Centers & Categories
            </span>
            <span className="text-[10px] font-extrabold bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full">
              {allCategories.length - 1} Categories
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-[11px] font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-full border border-rose-200/80 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Filter</span>
              </button>
            )}

            <button
              onClick={() => {
                setNewCategoryNameInput('');
                setShowNewCategoryModal(true);
              }}
              className="text-[11px] font-black text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/90 px-3 py-1 rounded-full transition-all flex items-center gap-1 shadow-2xs hover:shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              <span>+ Add Custom Category</span>
            </button>
          </div>
        </div>

        {/* Categories Horizontal Carousel (Spacious, Generous Height & Touch Target) */}
        <div 
          className="bg-slate-200/50 p-2 sm:p-2.5 rounded-[24px] border border-slate-300/60 shadow-inner flex items-center gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allCategories.map((cat) => {
            const Icon = cat.isCustom ? Tag : cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <div key={cat.id} className="relative group shrink-0">
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all duration-200 text-left cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-br from-slate-900 to-[#181A1E] text-white shadow-md shadow-slate-900/25 ring-1 ring-slate-900/10 scale-[1.02]'
                      : 'bg-white hover:bg-slate-50/90 text-slate-800 border border-slate-200/90 shadow-2xs hover:shadow-sm'
                  }`}
                >
                  {/* Category Colored Icon Badge */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-white/15 text-orange-400' 
                      : cat.isCustom 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : cat.inactiveIconBg
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Title & Gujarati Translation (Clean Names Only) */}
                  <div className="flex flex-col pr-1">
                    <span className="font-extrabold text-xs tracking-tight leading-tight whitespace-nowrap">
                      {cat.label}
                    </span>
                    <span className={`text-[10px] font-medium leading-tight whitespace-nowrap ${
                      isActive ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {cat.sublabel || (cat.isCustom ? 'કસ્ટમ કેટેગરી' : '')}
                    </span>
                  </div>
                </button>

                {/* Remove button for custom categories */}
                {cat.isCustom && (
                  <button
                    onClick={(e) => handleDeleteCustomCategory(cat.id, e)}
                    title="Remove custom category filter"
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-800 hover:bg-rose-500 text-white text-[10px] items-center justify-center hidden group-hover:flex shadow-md transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* EXPENSE MASTER REGISTER TABLE (FILTERED BY SELECTED PERIOD) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* Table Filter / Search Subtitle Bar */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/40">
          
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              Expense Ledger ({filteredExpenses.length} Records)
            </h3>
            <span className="text-[11px] font-bold text-slate-400">
              • Category: <span className="text-slate-700 font-bold">{selectedCategory}</span>
              {' • '}Period: <span className="text-emerald-700 font-black">{formattedMonthName}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search item, vendor, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white pl-8 pr-3 py-1.5 rounded-full text-xs text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 w-44 sm:w-60 shadow-xs"
              />
            </div>

            <button 
              onClick={() => window.print()}
              className="text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-full shadow-2xs flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print</span>
            </button>
          </div>

        </div>

        {/* Master Table */}
        <div className="overflow-x-auto max-h-[560px] scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            
            <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-20 shadow-xs border-b border-slate-200 text-[11px] font-extrabold text-slate-600">
              <tr>
                <th className="py-3 px-3 text-center w-12 bg-slate-50/80">#</th>
                <th className="py-3 px-3.5 w-32 bg-slate-50/80">Date</th>
                <th className="py-3 px-3.5">Expense Item</th>
                <th className="py-3 px-3 text-center">Category</th>
                <th className="py-3 px-3.5">Paid To / Vendor</th>
                <th className="py-3 px-3 text-center">Payment Mode</th>
                <th className="py-3 px-4 text-right bg-rose-50/40 text-rose-950 font-black">Amount (₹)</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center w-20 bg-slate-50/80">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((exp, idx) => {
                  const dateObj = new Date(exp.date + 'T00:00:00');
                  const dayFormatted = `${dateObj.getDate()} ${dateObj.toLocaleDateString('en-US', { month: 'short' })} (${dateObj.toLocaleDateString('en-US', { weekday: 'short' })})`;
                  const monthBadge = dateObj.toLocaleDateString('en-US', { month: 'short' });
                  const isCustom = !['Feed & Nutrition', 'Labor & Salaries', 'Utilities & Bills', 'Veterinary & Health', 'Hardware & Maint', 'Loans & EMI'].includes(exp.category);

                  return (
                    <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors bg-white">
                      
                      {/* Index */}
                      <td className="py-2.5 px-3 text-center font-bold text-slate-300">
                        {idx + 1}
                      </td>

                      {/* Date (with Month Tag in Annual View) */}
                      <td className="py-2.5 px-3.5 whitespace-nowrap font-bold text-slate-800">
                        <div className="flex items-center gap-1.5">
                          {isAnnualView && (
                            <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md border border-slate-200">
                              {monthBadge}
                            </span>
                          )}
                          <span>{dayFormatted}</span>
                        </div>
                      </td>

                      {/* Item */}
                      <td className="py-2.5 px-3.5">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-slate-900">{exp.item}</span>
                          {exp.notes && (
                            <span className="text-[10px] text-slate-400 mt-0.5">{exp.notes}</span>
                          )}
                        </div>
                      </td>

                      {/* Category Pill */}
                      <td className="py-2.5 px-3 text-center">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                          exp.category === 'Feed & Nutrition' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200/60'
                            : exp.category === 'Labor & Salaries'
                              ? 'bg-indigo-100 text-indigo-800 border border-indigo-200/60'
                              : exp.category === 'Utilities & Bills'
                                ? 'bg-cyan-100 text-cyan-800 border border-cyan-200/60'
                                : exp.category === 'Veterinary & Health'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200/60'
                                  : exp.category === 'Hardware & Maint'
                                    ? 'bg-orange-100 text-orange-800 border border-orange-200/60'
                                    : exp.category === 'Loans & EMI'
                                      ? 'bg-purple-100 text-purple-800 border border-purple-200/60'
                                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold shadow-2xs'
                        }`}>
                          {isCustom && <Tag className="w-2.5 h-2.5 text-emerald-600" />}
                          <span>{exp.category}</span>
                        </span>
                      </td>

                      {/* Paid To */}
                      <td className="py-2.5 px-3.5 text-slate-700 font-semibold">
                        {exp.paidTo}
                      </td>

                      {/* Payment Mode */}
                      <td className="py-2.5 px-3 text-center">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
                          {exp.paymentMode}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-2.5 px-4 text-right font-black text-rose-600 bg-rose-50/20 text-xs sm:text-sm">
                        ₹{exp.amount.toLocaleString()}
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{exp.status}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleOpenModal(exp)}
                            className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Expense"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(exp.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Expense"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-bold text-slate-600">No expenses recorded for {formattedMonthName} in this filter.</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Log New Expense" to record a bill for this period.</p>
                  </td>
                </tr>
              )}
            </tbody>

            {/* Table Grand Totals Footer */}
            <tfoot className="sticky bottom-0 bg-[#181A1E] text-white font-extrabold border-t-2 border-slate-900 z-20 shadow-2xl">
              <tr className="text-xs">
                <td colSpan={3} className="py-3 px-4 uppercase tracking-wider text-[11px] text-rose-400 font-black">
                  TOTAL OPEX ({filteredExpenses.length} BILLS IN {isAnnualView ? 'WHOLE YEAR 2026' : formattedMonthName.toUpperCase()})
                </td>
                <td colSpan={3} className="py-3 px-3 text-slate-400 text-center text-[10px]">
                  Filtered Selection Total
                </td>
                <td className="py-3 px-4 text-right bg-rose-600 text-white font-black text-sm">
                  ₹{filteredExpenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                </td>
                <td colSpan={2} className="py-3 px-3 text-center text-[10px] text-emerald-400 font-bold">
                  Reconciled
                </td>
              </tr>
            </tfoot>

          </table>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SECTION: GRAPHICAL EXPENSE ANALYTICS & VISUAL LEDGER */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[28px] p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                  Farm Expense Visual Analytics & Graphical Ledger
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200/70">
                  {isAnnualView ? 'Annual FY 2026' : formattedMonthName}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Visual breakdown of operating cost centers, monthly seasonality trend, and cash flow payment channels
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-2xl self-start sm:self-auto">
            <BarChart3 className="w-4 h-4 text-slate-700" />
            <span>Interactive Chart Engine</span>
          </div>
        </div>

        {/* Dual Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Cost Center Distribution (Donut & Breakdown Bars) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50/80 to-white rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    OPEX Allocation by Cost Center
                  </h4>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    Category spend percentage & budget share
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-2xs">
                  {categoryChartData.length} Cost Centers
                </span>
              </div>

              {/* Donut Chart & Center Stats */}
              <div className="py-4 relative flex items-center justify-center">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {/* Background Track */}
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      className="text-slate-100"
                      strokeWidth="18"
                      stroke="currentColor"
                      fill="transparent"
                    />

                    {/* Category Slices */}
                    {categoryChartData.map((cat) => {
                      const isHovered = hoveredCategorySlice === cat.id;
                      return (
                        <circle
                          key={cat.id}
                          cx="80"
                          cy="80"
                          r="60"
                          stroke={cat.color}
                          strokeWidth={isHovered ? "22" : "18"}
                          strokeDasharray={cat.strokeDasharray}
                          strokeDashoffset={cat.strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-300 cursor-pointer"
                          onMouseEnter={() => setHoveredCategorySlice(cat.id)}
                          onMouseLeave={() => setHoveredCategorySlice(null)}
                          onClick={() => setSelectedCategory(cat.id)}
                        />
                      );
                    })}
                  </svg>

                  {/* Center Metric */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                      {hoveredCategorySlice ? 'Category Spend' : (isAnnualView ? 'Annual OPEX' : 'Total OPEX')}
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none mt-0.5">
                      {hoveredCategorySlice 
                        ? `₹${(categoryChartData.find(c => c.id === hoveredCategorySlice)?.amount || 0).toLocaleString()}`
                        : `₹${expenseMetrics.totalOPEX.toLocaleString()}`}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full mt-1 border border-emerald-200/60">
                      {hoveredCategorySlice 
                        ? `${categoryChartData.find(c => c.id === hoveredCategorySlice)?.percentage}% share`
                        : `${filteredExpenses.length} bills`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Breakdown Progress Bars List */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              {categoryChartData.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const isHovered = hoveredCategorySlice === cat.id;
                return (
                  <div 
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? 'All' : cat.id)}
                    onMouseEnter={() => setHoveredCategorySlice(cat.id)}
                    onMouseLeave={() => setHoveredCategorySlice(null)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-900 text-white shadow-xs' 
                        : isHovered 
                          ? 'bg-slate-100/90' 
                          : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className={`font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                          {cat.label}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                          ({cat.gujarati})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          ₹{cat.amount.toLocaleString()}
                        </span>
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {cat.percentage}%
                        </span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(cat.percentage, 100)}%`,
                          backgroundColor: cat.color 
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Card 2: 12-Month Financial Reconciliation Trend (Bar Chart) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-slate-50/80 to-white rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between space-y-4">
            
            {/* Header & Legend */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    12-Month Farm OPEX vs Gross Milk Revenue
                  </h4>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    Monthly operating expenditure vs realized milk income (FY 2026)
                  </p>
                </div>

                {/* Legend Chips */}
                <div className="flex items-center gap-3 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-slate-800 to-slate-900"></span>
                    <span className="text-slate-600 text-[11px]">Milk Sales (₹)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-rose-600 to-red-500"></span>
                    <span className="text-slate-600 text-[11px]">Total OPEX (₹)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-emerald-700 text-[11px] font-extrabold">Net Profit</span>
                  </div>
                </div>
              </div>

              {/* Top Guidance Ribbon */}
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                  <span className="text-emerald-600">💡</span> Hover over any month column to inspect live P&L metrics below
                </span>
                <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/80">
                  Annual Net Margin: {expenseMetrics.profitMargin}%
                </span>
              </div>
            </div>

            {/* Interactive Bar Chart Canvas */}
            <div className="pt-2">
              <div className="h-60 w-full bg-white/80 rounded-2xl p-3 border border-slate-200/70 flex items-end gap-1.5 sm:gap-2 justify-between">
                {annualMonthlyBreakdown.map((m) => {
                  const isCurrent = m.id === selectedMonth;
                  const isHovered = hoveredChartMonth?.id === m.id;
                  const revHeightPct = Math.max((m.revenue / maxChartValue) * 100, 6);
                  const opexHeightPct = Math.max((m.totalOpex / maxChartValue) * 100, 6);

                  return (
                    <div
                      key={m.id}
                      onMouseEnter={() => setHoveredChartMonth(m)}
                      onMouseLeave={() => setHoveredChartMonth(null)}
                      onClick={() => {
                        setSelectedMonth(m.id);
                        setLastActiveMonth(m.id);
                      }}
                      className={`flex-1 h-full flex flex-col justify-end items-center group cursor-pointer transition-all rounded-xl p-1 ${
                        isCurrent 
                          ? 'bg-emerald-50/70 ring-2 ring-emerald-500/80 shadow-xs' 
                          : isHovered 
                            ? 'bg-slate-100/80' 
                            : 'hover:bg-slate-50'
                      }`}
                      title={`${m.name}: Sales ₹${m.revenue.toLocaleString()} | OPEX ₹${m.totalOpex.toLocaleString()}`}
                    >
                      {/* Paired Bar Columns */}
                      <div className="w-full flex items-end justify-center gap-1 h-44 mb-1.5">
                        
                        {/* Milk Revenue Bar */}
                        <div 
                          className="w-1/2 rounded-t-md bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 group-hover:from-slate-800 group-hover:to-slate-600 transition-all duration-300 relative"
                          style={{ height: `${revHeightPct}%` }}
                        >
                          {isHovered && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black bg-slate-900 text-white px-1 rounded whitespace-nowrap z-30 shadow-md">
                              ₹{(m.revenue / 1000).toFixed(0)}k
                            </span>
                          )}
                        </div>

                        {/* Farm OPEX Bar */}
                        <div 
                          className="w-1/2 rounded-t-md bg-gradient-to-t from-rose-600 to-red-500 group-hover:from-rose-500 group-hover:to-red-400 transition-all duration-300 relative"
                          style={{ height: `${opexHeightPct}%` }}
                        >
                          {isHovered && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black bg-rose-600 text-white px-1 rounded whitespace-nowrap z-30 shadow-md">
                              ₹{(m.totalOpex / 1000).toFixed(0)}k
                            </span>
                          )}
                        </div>

                      </div>

                      {/* Month Label & Indicator */}
                      <div className="w-full text-center border-t border-slate-200/70 pt-1.5 pb-0.5">
                        <span className={`text-[11px] font-black block leading-none transition-all ${
                          isCurrent 
                            ? 'text-emerald-800 bg-emerald-100/90 rounded px-1 py-0.5' 
                            : isHovered 
                              ? 'text-slate-950 font-black scale-105' 
                              : 'text-slate-600'
                        }`}>
                          {m.short || m.shortName || m.name.slice(0, 3)}
                        </span>
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mx-auto mt-1 block"></span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Hover / Active Month Inspection Panel in Balanced Grid */}
            {(() => {
              const activeMonth = hoveredChartMonth || annualMonthlyBreakdown.find(m => m.id === selectedMonth) || annualMonthlyBreakdown[9];
              return (
                <div className={`p-4 rounded-2xl border transition-all duration-200 ${
                  hoveredChartMonth 
                    ? 'bg-slate-50/95 border-emerald-300 ring-2 ring-emerald-500/20 shadow-sm' 
                    : 'bg-slate-50/80 border-slate-200/80 shadow-2xs'
                } space-y-3`}>
                  
                  {/* Card Header: Month Title, Status Badge & Guidance */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 pb-2 border-b border-slate-200/70">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        hoveredChartMonth ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'
                      }`} />
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                          {activeMonth.name}
                        </span>
                        <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border ${
                          hoveredChartMonth 
                            ? 'bg-amber-100 text-amber-800 border-amber-300' 
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}>
                          {hoveredChartMonth ? 'Inspecting' : 'Selected Period'}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-semibold">
                      {hoveredChartMonth 
                        ? 'Hovering over month bar • Click bar to switch to this period' 
                        : 'Click any month bar above to switch period, or hover to inspect'}
                    </span>
                  </div>

                  {/* 4-Column Balanced Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                    
                    {/* 1. Gross Milk Sales */}
                    <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-500 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Gross Milk Sales</span>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">🥛 Income</span>
                      </div>
                      <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                        ₹{activeMonth.revenue.toLocaleString()}
                      </span>
                    </div>

                    {/* 2. Farm OPEX */}
                    <div className="bg-rose-50/70 rounded-xl p-3 border border-rose-200/80 shadow-2xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-rose-600 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Total Farm OPEX</span>
                        <span className="text-[10px] font-black text-rose-700 bg-rose-100/80 px-1.5 py-0.5 rounded">🔻 Expenses</span>
                      </div>
                      <span className="text-sm sm:text-base font-black text-rose-700 tracking-tight">
                        ₹{activeMonth.totalOpex.toLocaleString()}
                      </span>
                    </div>

                    {/* 3. Net Farm Profit */}
                    <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-200/80 shadow-2xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-emerald-600 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Net Farm Profit</span>
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">💰 Profit</span>
                      </div>
                      <span className="text-sm sm:text-base font-black text-emerald-700 tracking-tight">
                        +{activeMonth.netProfit >= 0 ? '' : '-'}₹{Math.abs(activeMonth.netProfit).toLocaleString()}
                      </span>
                    </div>

                    {/* 4. Net Margin */}
                    <div className="bg-teal-50/70 rounded-xl p-3 border border-teal-200/80 shadow-2xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-teal-600 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Net Profit Margin</span>
                        <span className="text-[10px] font-black text-teal-700 bg-teal-100/80 px-1.5 py-0.5 rounded">📈 Margin</span>
                      </div>
                      <span className="text-sm sm:text-base font-black text-teal-800 tracking-tight">
                        {activeMonth.margin}%
                      </span>
                    </div>

                  </div>

                </div>
              );
            })()}

            {/* Quick Summary Footnote - Prominently Highlighted */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-1 border-t border-slate-200/90">
              {/* Highlighted Consolidated OPEX Badge */}
              <div className="flex items-center gap-2.5 bg-rose-50 hover:bg-rose-100/90 border border-rose-200/90 px-3.5 py-2 rounded-xl shadow-2xs transition-all">
                <span className="p-1 rounded-lg bg-rose-100/90 text-rose-600 shrink-0">
                  <TrendingDown className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-rose-800">
                  Consolidated 12-Month OPEX:
                </span>
                <span className="text-xs sm:text-sm font-black text-rose-700">
                  ₹{annualMonthlyBreakdown.reduce((s, r) => s + r.totalOpex, 0).toLocaleString()}
                </span>
              </div>

              {/* Highlighted Consolidated Net Profit Badge */}
              <div className="flex items-center gap-2.5 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200/90 px-3.5 py-2 rounded-xl shadow-2xs transition-all">
                <span className="p-1 rounded-lg bg-emerald-100/90 text-emerald-600 shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  Consolidated Net Profit:
                </span>
                <span className="text-xs sm:text-sm font-black text-emerald-700">
                  +₹{annualMonthlyBreakdown.reduce((s, r) => s + r.netProfit, 0).toLocaleString()}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Section 3: Payment Modes & Settlement Channels (Full Width Horizontal Ribbon) */}
        <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                Payment Modes & Settlement Channels ({isAnnualView ? 'FY 2026' : formattedMonthName})
              </h4>
            </div>
            <span className="text-[11px] text-slate-400 font-bold">
              Cash flow distribution across banking, online UPI & direct cash
            </span>
          </div>

          {/* Segmented Multi-Color Progress Ribbon */}
          <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
            {paymentModeData.map((m) => (
              <div
                key={m.name}
                style={{ width: `${m.percentage}%`, backgroundColor: m.color }}
                className="h-full transition-all duration-500 relative group cursor-pointer"
                title={`${m.name} (${m.label}): ₹${m.amount.toLocaleString()} (${m.percentage}%)`}
              />
            ))}
          </div>

          {/* Payment Mode Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {paymentModeData.map((m) => (
              <div 
                key={m.name} 
                className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-2xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: m.color }}></span>
                  <div>
                    <span className="text-xs font-black text-slate-900 block leading-tight">
                      {m.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {m.label} • {m.count} bills
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900 block leading-tight">
                    ₹{m.amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-500 block">
                    {m.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD CUSTOM CATEGORY (GIVE ANY NAME) */}
      {/* ========================================================================= */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowNewCategoryModal(false)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Create Custom Category
                </h3>
                <p className="text-xs text-slate-400">Give any custom name to organize your farm expenses</p>
              </div>
            </div>

            <form onSubmit={handleCreateCustomCategory} className="space-y-4">
              <div>
                <label className="font-extrabold text-slate-700 text-xs block mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diesel & Fuel, Shed Construction, Transportation..."
                  value={newCategoryNameInput}
                  onChange={(e) => setNewCategoryNameInput(e.target.value)}
                  className="w-full border-2 border-emerald-400 bg-emerald-50/20 rounded-2xl p-3 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  autoFocus
                />
              </div>

              {/* Suggestions */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">
                  Quick Ideas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Diesel & Fuel', 'Shed Construction', 'Transportation', 'Silage Bagging', 'Land Lease', 'Organic Fertilizer', 'Legal & Tax'].map(suggestion => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setNewCategoryNameInput(suggestion)}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    >
                      + {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewCategoryModal(false)}
                  className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold py-2.5 rounded-2xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-2.5 rounded-2xl text-xs shadow-md transition-colors cursor-pointer"
                >
                  Add Category
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: LOG NEW EXPENSE / EDIT EXPENSE (WITH CUSTOM NAME SUPPORT) */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingExpenseId ? 'Edit Farm Expense' : 'Log New Farm Expense'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isAnnualView 
                    ? 'Record bill or cash payment for FY 2026' 
                    : `Record bill or cash payment for ${formattedMonthName}`}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-4 text-xs">
              
              {/* Item Selection (Preset or Custom) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-extrabold text-slate-700 block">Expense Item</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomItem(!isCustomItem);
                      if (!isCustomItem && !customItemInput) {
                        setCustomItemInput(formData.item);
                      }
                    }}
                    className="text-[11px] font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isCustomItem ? 'Choose from Presets' : '+ Type Custom Item'}</span>
                  </button>
                </div>

                {!isCustomItem ? (
                  <select
                    value={formData.item}
                    onChange={(e) => handleItemSelect(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl p-2.5 font-bold text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  >
                    {presetItems.map((preset) => (
                      <option key={preset.item} value={preset.item}>
                        {preset.item}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    placeholder="Type any custom item (e.g. Silage Bags, Engine Oil, Shed Fan)"
                    value={customItemInput}
                    onChange={(e) => setCustomItemInput(e.target.value)}
                    className="w-full border-2 border-sky-400 bg-sky-50/20 rounded-2xl p-2.5 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    autoFocus
                  />
                )}
              </div>

              {/* Category Selection (Standard, Custom, or Type New) & Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-extrabold text-slate-700 block">Category</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCategory(!isCustomCategory);
                        if (!isCustomCategory && !customCategoryInput) {
                          setCustomCategoryInput('');
                        }
                      }}
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{isCustomCategory ? 'Select from list' : '+ Any Name'}</span>
                    </button>
                  </div>

                  {!isCustomCategory ? (
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        if (e.target.value === '__NEW_CUSTOM_CATEGORY__') {
                          setIsCustomCategory(true);
                          setCustomCategoryInput('');
                        } else {
                          setFormData({ ...formData, category: e.target.value });
                        }
                      }}
                      className="w-full border border-slate-200 rounded-2xl p-2.5 font-bold text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    >
                      <optgroup label="Standard Categories">
                        <option value="Feed & Nutrition">Feed & Nutrition (ખોરાક)</option>
                        <option value="Labor & Salaries">Labor & Salaries (મજૂરી)</option>
                        <option value="Utilities & Bills">Utilities & Bills (બિલ)</option>
                        <option value="Veterinary & Health">Veterinary & Health (તબીબી)</option>
                        <option value="Hardware & Maint">Hardware & Maint</option>
                        <option value="Loans & EMI">Loans & EMI (હપ્તા)</option>
                      </optgroup>
                      {customCategories.length > 0 && (
                        <optgroup label="Your Custom Categories">
                          {customCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.id}</option>
                          ))}
                        </optgroup>
                      )}
                      <optgroup label="Custom Category">
                        <option value="__NEW_CUSTOM_CATEGORY__">➕ Type Any Custom Name...</option>
                      </optgroup>
                    </select>
                  ) : (
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Give ANY category name..."
                        value={customCategoryInput}
                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                        className="w-full border-2 border-emerald-400 bg-emerald-50/30 rounded-2xl p-2.5 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        autoFocus
                      />
                      <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                        ✓ Saved & added to filters
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <input 
                      type="number"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full border border-slate-200 rounded-2xl py-2.5 pl-8 pr-3 font-black text-rose-700 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Payment Mode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">Date</label>
                  <input 
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-slate-200 rounded-2xl p-2.5 font-bold text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">Payment Mode</label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                    className="w-full border border-slate-200 rounded-2xl p-2.5 font-bold text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none"
                  >
                    <option>UPI / GPay</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>Auto-Debit</option>
                    <option>Cheque</option>
                  </select>
                </div>
              </div>

              {/* Paid To / Vendor */}
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Paid To / Vendor Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Nayara Energy / Patel Agro / Ramesh Kumar"
                  required
                  value={formData.paidTo}
                  onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })}
                  className="w-full border border-slate-200 rounded-2xl p-2.5 font-bold text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Notes / Description (Optional)</label>
                <input 
                  type="text"
                  placeholder="e.g. Invoice #402, 50 Liters delivered"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-slate-200 rounded-2xl p-2.5 text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold py-2.5 rounded-2xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-[#181A1E] hover:bg-slate-800 text-white font-extrabold py-2.5 rounded-2xl shadow-md transition-colors cursor-pointer"
                >
                  {editingExpenseId ? 'Update Expense' : 'Save Expense'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
