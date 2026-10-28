import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Download, 
  Plus, 
  Edit3, 
  TrendingUp, 
  Droplets, 
  IndianRupee, 
  CheckCircle2, 
  X, 
  Sun,
  Moon,
  BarChart3,
  Printer,
  Sparkles,
  Percent,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  ChevronRight,
  FileSpreadsheet
} from 'lucide-react';

export default function DailyMilkSheetView() {
  const [selectedMonth, setSelectedMonth] = useState('2026-10'); // YYYY-MM
  const [selectedAnimal, setSelectedAnimal] = useState('buffalo'); // 'buffalo' | 'cow' | 'combined'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDay, setEditingDay] = useState(null);
  const [activeChartTab, setActiveChartTab] = useState('milk'); // 'milk' | 'revenue' | 'fat'
  const [hoveredDay, setHoveredDay] = useState(null);
  const [hoveredAnnualMonth, setHoveredAnnualMonth] = useState(null);

  // Animal Categories Configuration
  const animalCategories = [
    { id: 'buffalo', name: 'Buffalo', label: 'Buffalo Milk', emoji: '🐃', count: '64 Head', defaultRate: 84.0, defaultFat: 7.8, color: 'orange' },
    { id: 'cow', name: 'Cow', label: 'Cow Milk', emoji: '🐄', count: '28 Head', defaultRate: 60.0, defaultFat: 4.4, color: 'blue' },
    { id: 'combined', name: 'Combined Total', label: 'All Farm (Combined)', emoji: '🥛', count: '92 Head', defaultRate: 74.0, defaultFat: 6.4, color: 'emerald' },
  ];

  // Seed Initial Realistic Data for Buffalo (High Fat, 64 Head)
  const initialBuffaloData = useMemo(() => {
    const list = [];
    const baseRates = [84, 84, 85, 84, 84, 83, 84, 85, 84, 84, 84, 85, 83, 84, 84, 85, 84, 84, 83, 85, 84, 84, 85, 84, 84, 85, 84];
    for (let day = 1; day <= 31; day++) {
      const dayStr = day < 10 ? `0${day}` : `${day}`;
      const dateStr = `2026-10-${dayStr}`;
      if (day <= 27) {
        const pseudoRand = (day * 13) % 10;
        const morningMilk = parseFloat((140 + (pseudoRand * 1.5) - 5).toFixed(1));
        const eveningMilk = parseFloat((125 + ((pseudoRand * 7) % 10) * 1.2 - 4).toFixed(1));
        const morningFat = parseFloat((7.6 + ((pseudoRand * 3) % 7) * 0.1).toFixed(1));
        const eveningFat = parseFloat((7.4 + ((pseudoRand * 5) % 6) * 0.1).toFixed(1));
        const ratePerLiter = baseRates[day - 1] || 84.0;
        list.push({ srNo: day, date: dateStr, dayNumber: day, morningMilk, morningFat, eveningMilk, eveningFat, ratePerLiter, isPending: false });
      } else {
        list.push({ srNo: day, date: dateStr, dayNumber: day, morningMilk: null, morningFat: null, eveningMilk: null, eveningFat: null, ratePerLiter: 84.0, isPending: true });
      }
    }
    return list;
  }, []);

  // Seed Initial Realistic Data for Cow (High Volume, Moderate Fat, 28 Head)
  const initialCowData = useMemo(() => {
    const list = [];
    const baseRates = [60, 60, 61, 60, 60, 59, 60, 61, 60, 60, 60, 61, 59, 60, 60, 61, 60, 60, 59, 61, 60, 60, 61, 60, 60, 61, 60];
    for (let day = 1; day <= 31; day++) {
      const dayStr = day < 10 ? `0${day}` : `${day}`;
      const dateStr = `2026-10-${dayStr}`;
      if (day <= 27) {
        const pseudoRand = (day * 17) % 10;
        const morningMilk = parseFloat((108 + (pseudoRand * 1.3) - 4).toFixed(1));
        const eveningMilk = parseFloat((96 + ((pseudoRand * 5) % 8) * 1.1 - 3).toFixed(1));
        const morningFat = parseFloat((4.4 + ((pseudoRand * 3) % 5) * 0.1).toFixed(1));
        const eveningFat = parseFloat((4.2 + ((pseudoRand * 4) % 5) * 0.1).toFixed(1));
        const ratePerLiter = baseRates[day - 1] || 60.0;
        list.push({ srNo: day, date: dateStr, dayNumber: day, morningMilk, morningFat, eveningMilk, eveningFat, ratePerLiter, isPending: false });
      } else {
        list.push({ srNo: day, date: dateStr, dayNumber: day, morningMilk: null, morningFat: null, eveningMilk: null, eveningFat: null, ratePerLiter: 60.0, isPending: true });
      }
    }
    return list;
  }, []);

  // Multi-animal state store
  const [animalStores, setAnimalStores] = useState({
    buffalo: initialBuffaloData,
    cow: initialCowData,
  });

  // Modal Form State
  const [formData, setFormData] = useState({
    animal: 'buffalo',
    date: '2026-10-27',
    morningMilk: '',
    morningFat: '',
    eveningMilk: '',
    eveningFat: '',
    ratePerLiter: '84.0'
  });

  // Active records based on selectedAnimal
  const activeRawRecords = useMemo(() => {
    if (selectedAnimal === 'combined') {
      const bufList = animalStores.buffalo;
      const cowList = animalStores.cow;

      return bufList.map((bRow, i) => {
        const cRow = cowList[i] || {};
        const bPending = bRow.isPending;
        const cPending = cRow.isPending;

        if (bPending && cPending) {
          return {
            srNo: bRow.srNo,
            date: bRow.date,
            dayNumber: bRow.dayNumber,
            morningMilk: null,
            morningFat: null,
            eveningMilk: null,
            eveningFat: null,
            ratePerLiter: 74.0,
            isPending: true
          };
        }

        const bAm = parseFloat(bRow.morningMilk) || 0;
        const bPm = parseFloat(bRow.eveningMilk) || 0;
        const cAm = parseFloat(cRow.morningMilk) || 0;
        const cPm = parseFloat(cRow.eveningMilk) || 0;

        const totalAm = parseFloat((bAm + cAm).toFixed(1));
        const totalPm = parseFloat((bPm + cPm).toFixed(1));

        const bAmFat = parseFloat(bRow.morningFat) || 0;
        const cAmFat = parseFloat(cRow.morningFat) || 0;
        const bPmFat = parseFloat(bRow.eveningFat) || 0;
        const cPmFat = parseFloat(cRow.eveningFat) || 0;

        const weightedAmFat = totalAm > 0 ? parseFloat(((bAm * bAmFat + cAm * cAmFat) / totalAm).toFixed(1)) : 0;
        const weightedPmFat = totalPm > 0 ? parseFloat(((bPm * bPmFat + cPm * cPmFat) / totalPm).toFixed(1)) : 0;

        const bRev = (bAm + bPm) * (parseFloat(bRow.ratePerLiter) || 84);
        const cRev = (cAm + cPm) * (parseFloat(cRow.ratePerLiter) || 60);
        const totalMilkDay = totalAm + totalPm;
        const weightedRate = totalMilkDay > 0 ? parseFloat(((bRev + cRev) / totalMilkDay).toFixed(1)) : 74.0;

        return {
          srNo: bRow.srNo,
          date: bRow.date,
          dayNumber: bRow.dayNumber,
          morningMilk: totalAm,
          morningFat: weightedAmFat,
          eveningMilk: totalPm,
          eveningFat: weightedPmFat,
          ratePerLiter: weightedRate,
          isPending: false
        };
      });
    }

    return animalStores[selectedAnimal] || animalStores.buffalo;
  }, [selectedAnimal, animalStores]);

  // Computed Records with derived amounts
  const computedRecords = useMemo(() => {
    return activeRawRecords.map((rec) => {
      const mMilk = parseFloat(rec.morningMilk) || 0;
      const eMilk = parseFloat(rec.eveningMilk) || 0;
      const rate = parseFloat(rec.ratePerLiter) || 0;
      const totalMilk = parseFloat((mMilk + eMilk).toFixed(1));
      const morningAmount = Math.round(mMilk * rate);
      const eveningAmount = Math.round(eMilk * rate);
      const totalAmount = morningAmount + eveningAmount;

      return {
        ...rec,
        totalMilk,
        morningAmount,
        eveningAmount,
        totalAmount
      };
    });
  }, [activeRawRecords]);

  // Monthly Grand Totals & Analytics
  const monthlyTotals = useMemo(() => {
    const activeEntries = computedRecords.filter(r => r.totalMilk > 0);

    const totalMorningMilk = computedRecords.reduce((sum, r) => sum + (parseFloat(r.morningMilk) || 0), 0);
    const totalEveningMilk = computedRecords.reduce((sum, r) => sum + (parseFloat(r.eveningMilk) || 0), 0);
    const grandTotalMilk = totalMorningMilk + totalEveningMilk;

    const grandTotalAmount = computedRecords.reduce((sum, r) => sum + (r.totalAmount || 0), 0);

    const avgMorningFat = activeEntries.length 
      ? (activeEntries.reduce((sum, r) => sum + (parseFloat(r.morningFat) || 0), 0) / activeEntries.length).toFixed(1)
      : '0.0';
    const avgEveningFat = activeEntries.length 
      ? (activeEntries.reduce((sum, r) => sum + (parseFloat(r.eveningFat) || 0), 0) / activeEntries.length).toFixed(1)
      : '0.0';
    const avgRate = activeEntries.length 
      ? (activeEntries.reduce((sum, r) => sum + (parseFloat(r.ratePerLiter) || 0), 0) / activeEntries.length).toFixed(1)
      : '0.0';
    const avgDailyMilk = activeEntries.length 
      ? (grandTotalMilk / activeEntries.length).toFixed(1)
      : '0.0';

    return {
      totalMorningMilk: parseFloat(totalMorningMilk.toFixed(1)),
      totalEveningMilk: parseFloat(totalEveningMilk.toFixed(1)),
      grandTotalMilk: parseFloat(grandTotalMilk.toFixed(1)),
      avgMorningFat,
      avgEveningFat,
      avgRate,
      avgDailyMilk,
      grandTotalAmount,
      activeDays: activeEntries.length
    };
  }, [computedRecords]);

  // Separate Buffalo Totals for current month
  const buffaloTotals = useMemo(() => {
    const list = animalStores.buffalo || [];
    const active = list.filter(r => (parseFloat(r.morningMilk) || 0) + (parseFloat(r.eveningMilk) || 0) > 0);
    const mAm = list.reduce((sum, r) => sum + (parseFloat(r.morningMilk) || 0), 0);
    const mPm = list.reduce((sum, r) => sum + (parseFloat(r.eveningMilk) || 0), 0);
    const totalMilk = parseFloat((mAm + mPm).toFixed(1));
    const totalRevenue = list.reduce((sum, r) => {
      const milk = (parseFloat(r.morningMilk) || 0) + (parseFloat(r.eveningMilk) || 0);
      const rate = parseFloat(r.ratePerLiter) || 84;
      return sum + Math.round(milk * rate);
    }, 0);
    const avgFat = active.length 
      ? (active.reduce((sum, r) => sum + ((parseFloat(r.morningFat) + parseFloat(r.eveningFat)) / 2 || 0), 0) / active.length).toFixed(1) 
      : '7.8';
    const avgRate = active.length 
      ? (active.reduce((sum, r) => sum + (parseFloat(r.ratePerLiter) || 84), 0) / active.length).toFixed(1) 
      : '84.0';
    const avgDaily = active.length ? (totalMilk / active.length).toFixed(1) : '0.0';

    return {
      mAm: parseFloat(mAm.toFixed(1)),
      mPm: parseFloat(mPm.toFixed(1)),
      totalMilk,
      totalRevenue,
      avgFat,
      avgRate,
      avgDaily,
      activeDays: active.length
    };
  }, [animalStores.buffalo]);

  // Separate Cow Totals for current month
  const cowTotals = useMemo(() => {
    const list = animalStores.cow || [];
    const active = list.filter(r => (parseFloat(r.morningMilk) || 0) + (parseFloat(r.eveningMilk) || 0) > 0);
    const mAm = list.reduce((sum, r) => sum + (parseFloat(r.morningMilk) || 0), 0);
    const mPm = list.reduce((sum, r) => sum + (parseFloat(r.eveningMilk) || 0), 0);
    const totalMilk = parseFloat((mAm + mPm).toFixed(1));
    const totalRevenue = list.reduce((sum, r) => {
      const milk = (parseFloat(r.morningMilk) || 0) + (parseFloat(r.eveningMilk) || 0);
      const rate = parseFloat(r.ratePerLiter) || 60;
      return sum + Math.round(milk * rate);
    }, 0);
    const avgFat = active.length 
      ? (active.reduce((sum, r) => sum + ((parseFloat(r.morningFat) + parseFloat(r.eveningFat)) / 2 || 0), 0) / active.length).toFixed(1) 
      : '4.3';
    const avgRate = active.length 
      ? (active.reduce((sum, r) => sum + (parseFloat(r.ratePerLiter) || 60), 0) / active.length).toFixed(1) 
      : '60.0';
    const avgDaily = active.length ? (totalMilk / active.length).toFixed(1) : '0.0';

    return {
      mAm: parseFloat(mAm.toFixed(1)),
      mPm: parseFloat(mPm.toFixed(1)),
      totalMilk,
      totalRevenue,
      avgFat,
      avgRate,
      avgDaily,
      activeDays: active.length
    };
  }, [animalStores.cow]);

  // Combined Share breakdown
  const combinedShare = useMemo(() => {
    const grandMilk = buffaloTotals.totalMilk + cowTotals.totalMilk || 1;
    const grandRev = buffaloTotals.totalRevenue + cowTotals.totalRevenue || 1;

    const buffaloMilkShare = ((buffaloTotals.totalMilk / grandMilk) * 100).toFixed(1);
    const cowMilkShare = ((cowTotals.totalMilk / grandMilk) * 100).toFixed(1);

    const buffaloRevShare = ((buffaloTotals.totalRevenue / grandRev) * 100).toFixed(1);
    const cowRevShare = ((cowTotals.totalRevenue / grandRev) * 100).toFixed(1);

    return {
      buffaloMilkShare,
      cowMilkShare,
      buffaloRevShare,
      cowRevShare,
      grandMilk,
      grandRev
    };
  }, [buffaloTotals, cowTotals]);

  // =========================================================================
  // 12-MONTH REPORTING DATA ENGINE (MONTH-WISE FOR EVERY MONTH OF 2026)
  // =========================================================================
  const annualMonthlyReport = useMemo(() => {
    const months = [
      { id: '2026-01', name: 'January', days: 31, bTotal: 8120, bFat: 7.9, bRate: 84.0, cTotal: 5890, cFat: 4.4, cRate: 60.0, status: 'Settled', momGrowth: '+2.8%' },
      { id: '2026-02', name: 'February', days: 28, bTotal: 7650, bFat: 7.8, bRate: 84.0, cTotal: 5420, cFat: 4.3, cRate: 60.0, status: 'Settled', momGrowth: '-1.4%' },
      { id: '2026-03', name: 'March', days: 31, bTotal: 8920, bFat: 7.7, bRate: 83.5, cTotal: 6100, cFat: 4.4, cRate: 59.5, status: 'Settled', momGrowth: '+12.5%' },
      { id: '2026-04', name: 'April', days: 30, bTotal: 8450, bFat: 7.6, bRate: 84.0, cTotal: 5950, cFat: 4.3, cRate: 60.0, status: 'Settled', momGrowth: '-2.1%' },
      { id: '2026-05', name: 'May', days: 31, bTotal: 7890, bFat: 7.5, bRate: 85.0, cTotal: 5300, cFat: 4.2, cRate: 61.0, status: 'Settled', momGrowth: '-4.8%' },
      { id: '2026-06', name: 'June', days: 30, bTotal: 7420, bFat: 7.5, bRate: 86.0, cTotal: 5120, cFat: 4.2, cRate: 62.0, status: 'Settled', momGrowth: '-3.2%' },
      { id: '2026-07', name: 'July', days: 31, bTotal: 8050, bFat: 7.7, bRate: 85.0, cTotal: 5600, cFat: 4.3, cRate: 61.0, status: 'Settled', momGrowth: '+6.5%' },
      { id: '2026-08', name: 'August', days: 31, bTotal: 8600, bFat: 7.8, bRate: 84.0, cTotal: 5980, cFat: 4.4, cRate: 60.0, status: 'Settled', momGrowth: '+5.4%' },
      { id: '2026-09', name: 'September', days: 30, bTotal: 8380, bFat: 7.9, bRate: 84.0, cTotal: 5820, cFat: 4.4, cRate: 60.0, status: 'Settled', momGrowth: '-1.2%' },
      { id: '2026-10', name: 'October', days: 31, bTotal: monthlyTotals.grandTotalMilk, bFat: parseFloat(monthlyTotals.avgMorningFat), bRate: parseFloat(monthlyTotals.avgRate), cTotal: 5210, cFat: 4.3, cRate: 60.2, status: 'In Progress', momGrowth: '+3.1%' },
      { id: '2026-11', name: 'November', days: 30, bTotal: 7850, bFat: 7.9, bRate: 84.5, cTotal: 5500, cFat: 4.4, cRate: 60.5, status: 'Projected', momGrowth: '+2.0%' },
      { id: '2026-12', name: 'December', days: 31, bTotal: 8200, bFat: 8.0, bRate: 85.0, cTotal: 5750, cFat: 4.5, cRate: 61.0, status: 'Projected', momGrowth: '+3.5%' },
    ];

    return months.map((m) => {
      let totalLiters = 0;
      let fat = 0;
      let rate = 0;
      let revenue = 0;

      if (selectedAnimal === 'buffalo') {
        totalLiters = m.bTotal;
        fat = m.bFat;
        rate = m.bRate;
        revenue = Math.round(totalLiters * rate);
      } else if (selectedAnimal === 'cow') {
        totalLiters = m.cTotal;
        fat = m.cFat;
        rate = m.cRate;
        revenue = Math.round(totalLiters * rate);
      } else {
        totalLiters = m.bTotal + m.cTotal;
        const bRev = m.bTotal * m.bRate;
        const cRev = m.cTotal * m.cRate;
        revenue = Math.round(bRev + cRev);
        rate = parseFloat((revenue / (totalLiters || 1)).toFixed(1));
        fat = parseFloat(((m.bTotal * m.bFat + m.cTotal * m.cFat) / (totalLiters || 1)).toFixed(1));
      }

      return {
        ...m,
        totalLiters,
        fat,
        rate,
        revenue,
        isCurrent: m.id === selectedMonth
      };
    });
  }, [selectedAnimal, monthlyTotals, selectedMonth]);

  // Annual Summary Metrics
  const annualSummary = useMemo(() => {
    const recordedMonths = annualMonthlyReport.filter(m => m.status !== 'Projected');
    const totalMilk = recordedMonths.reduce((sum, m) => sum + m.totalLiters, 0);
    const totalRevenue = recordedMonths.reduce((sum, m) => sum + m.revenue, 0);
    const avgMonthlyMilk = Math.round(totalMilk / (recordedMonths.length || 1));
    const avgMonthlyRevenue = Math.round(totalRevenue / (recordedMonths.length || 1));
    const avgFat = (recordedMonths.reduce((sum, m) => sum + m.fat, 0) / (recordedMonths.length || 1)).toFixed(1);

    const peakMonth = [...recordedMonths].sort((a, b) => b.totalLiters - a.totalLiters)[0] || recordedMonths[0];

    return {
      totalMilk,
      totalRevenue,
      avgMonthlyMilk,
      avgMonthlyRevenue,
      avgFat,
      peakMonth
    };
  }, [annualMonthlyReport]);

  const maxAnnualMilk = useMemo(() => {
    const max = Math.max(...annualMonthlyReport.map(m => m.totalLiters), 12000);
    return Math.ceil(max / 2000) * 2000;
  }, [annualMonthlyReport]);

  // Open Add / Edit Modal
  const handleOpenAddOrEdit = (record = null) => {
    const targetAnimal = selectedAnimal === 'combined' ? 'buffalo' : selectedAnimal;
    const defaultRate = targetAnimal === 'cow' ? '60.0' : '84.0';

    if (record) {
      setEditingDay(record.date);
      setFormData({
        animal: targetAnimal,
        date: record.date,
        morningMilk: record.morningMilk !== null && record.morningMilk !== undefined ? record.morningMilk : '',
        morningFat: record.morningFat !== null && record.morningFat !== undefined ? record.morningFat : '',
        eveningMilk: record.eveningMilk !== null && record.eveningMilk !== undefined ? record.eveningMilk : '',
        eveningFat: record.eveningFat !== null && record.eveningFat !== undefined ? record.eveningFat : '',
        ratePerLiter: record.ratePerLiter || defaultRate
      });
    } else {
      setEditingDay(null);
      setFormData({
        animal: targetAnimal,
        date: '2026-10-27',
        morningMilk: '',
        morningFat: '',
        eveningMilk: '',
        eveningFat: '',
        ratePerLiter: defaultRate
      });
    }
    setShowAddModal(true);
  };

  // Save Modal Form
  const handleSaveForm = (e) => {
    e.preventDefault();
    const targetAnimal = formData.animal;
    const mMilk = parseFloat(formData.morningMilk) || 0;
    const mFat = parseFloat(formData.morningFat) || 0;
    const eMilk = parseFloat(formData.eveningMilk) || 0;
    const eFat = parseFloat(formData.eveningFat) || 0;
    const rate = parseFloat(formData.ratePerLiter) || (targetAnimal === 'cow' ? 60.0 : 84.0);

    setAnimalStores(prev => {
      const currentList = prev[targetAnimal] || [];
      const updatedList = currentList.map(r => {
        if (r.date === formData.date) {
          return {
            ...r,
            morningMilk: mMilk,
            morningFat: mFat,
            eveningMilk: eMilk,
            eveningFat: eFat,
            ratePerLiter: rate,
            isPending: mMilk === 0 && eMilk === 0
          };
        }
        return r;
      });

      return {
        ...prev,
        [targetAnimal]: updatedList
      };
    });

    setShowAddModal(false);
  };

  // Inline Quick Edit Cell
  const handleInlineChange = (date, field, value) => {
    if (selectedAnimal === 'combined') {
      alert('To edit specific daily entries, please switch to Buffalo or Cow tab directly.');
      return;
    }

    const num = value === '' ? null : parseFloat(value) || 0;
    setAnimalStores(prev => {
      const currentList = prev[selectedAnimal] || [];
      const updatedList = currentList.map(r => {
        if (r.date === date) {
          const updated = { ...r, [field]: num };
          if (updated.morningMilk > 0 || updated.eveningMilk > 0) {
            updated.isPending = false;
          }
          return updated;
        }
        return r;
      });

      return {
        ...prev,
        [selectedAnimal]: updatedList
      };
    });
  };

  // Download Monthly Sheet as CSV
  const handleDownloadCSV = () => {
    const animalLabel = selectedAnimal.toUpperCase();
    const headers = [
      'Sr. No.',
      'Date',
      'Animal Category',
      'Morning Milk (L)',
      'Morning Fat (%)',
      'Evening Milk (L)',
      'Evening Fat (%)',
      'Total Milk (L)',
      'Rate Per Liter (INR)',
      'Total Amount (INR)'
    ];

    const rows = computedRecords.map(r => [
      r.srNo,
      r.date,
      animalLabel,
      r.morningMilk || 0,
      r.morningFat || 0,
      r.eveningMilk || 0,
      r.eveningFat || 0,
      r.totalMilk || 0,
      r.ratePerLiter || 0,
      r.totalAmount || 0
    ]);

    rows.push([
      'TOTALS',
      `Month: ${selectedMonth}`,
      animalLabel,
      monthlyTotals.totalMorningMilk,
      `Avg: ${monthlyTotals.avgMorningFat}%`,
      monthlyTotals.totalEveningMilk,
      `Avg: ${monthlyTotals.avgEveningFat}%`,
      monthlyTotals.grandTotalMilk,
      `Avg: ${monthlyTotals.avgRate}`,
      monthlyTotals.grandTotalAmount
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Kalp_Dairy_Monthly_Milk_Sheet_${animalLabel}_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Annual Report as CSV
  const handleDownloadAnnualCSV = () => {
    const animalLabel = selectedAnimal.toUpperCase();
    const headers = [
      'Month',
      'Year',
      'Animal Category',
      'Days in Month',
      'Total Milk (L)',
      'Average Fat (%)',
      'Average Rate (INR)',
      'Total Revenue (INR)',
      'MoM Growth',
      'Status'
    ];

    const rows = annualMonthlyReport.map(m => [
      m.name,
      '2026',
      animalLabel,
      m.days,
      m.totalLiters,
      m.fat,
      m.rate,
      m.revenue,
      m.momGrowth,
      m.status
    ]);

    rows.push([
      'ANNUAL TOTALS (YTD)',
      '2026',
      animalLabel,
      annualMonthlyReport.reduce((sum, m) => sum + m.days, 0),
      annualSummary.totalMilk,
      `Avg: ${annualSummary.avgFat}%`,
      `Avg: ${(annualSummary.totalRevenue / (annualSummary.totalMilk || 1)).toFixed(1)}`,
      annualSummary.totalRevenue,
      '--',
      'Audit Verified'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Kalp_Dairy_Annual_Report_${animalLabel}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formattedMonthLabel = useMemo(() => {
    const [year, month] = selectedMonth.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [selectedMonth]);

  const activeCategoryObj = useMemo(() => {
    return animalCategories.find(c => c.id === selectedAnimal) || animalCategories[0];
  }, [selectedAnimal]);

  const chartDays = useMemo(() => {
    return computedRecords.filter(r => r.totalMilk > 0);
  }, [computedRecords]);

  const maxMilk = useMemo(() => {
    const max = Math.max(...chartDays.map(d => d.totalMilk), 300);
    return Math.ceil(max / 50) * 50;
  }, [chartDays]);

  const maxRevenue = useMemo(() => {
    const max = Math.max(...chartDays.map(d => d.totalAmount), 25000);
    return Math.ceil(max / 5000) * 5000;
  }, [chartDays]);

  return (
    <div className="space-y-7 animate-in fade-in duration-300 pb-12">
      
      {/* ========================================================================= */}
      {/* TOP HEADER CONTROLS (MINIMALIST BAR + ACTIONS) */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Daily Milk Collection & Monthly Sheet
            </h2>
            <span className="bg-emerald-500/10 text-emerald-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Liter (L)
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Separate shift logging, monthly registers & month-wise annual reporting
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Month Selector Pill */}
          <div className="flex items-center gap-2 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input 
              type="month" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            />
          </div>

          {/* Download Monthly Sheet Button */}
          <button 
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all"
            title="Download CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Download CSV ({activeCategoryObj.name})</span>
          </button>

          {/* Add Daily Data Button */}
          <button 
            onClick={() => handleOpenAddOrEdit(null)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF5722] to-[#F4511E] hover:from-[#F4511E] hover:to-[#E64A19] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md shadow-orange-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Daily Entry</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ANIMAL CATEGORY SELECTOR TABS (BUFFALO vs COW vs COMBINED) */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {animalCategories.map((cat) => {
          const isActive = selectedAnimal === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedAnimal(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                isActive
                  ? 'bg-[#181A1E] text-white shadow-md shadow-slate-900/15 scale-[1.02]'
                  : 'bg-white hover:bg-slate-100/90 text-slate-600 border border-slate-200/90'
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="tracking-tight">{cat.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MINIMAL COLOR-ACCENTED SUMMARY METRICS CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Total Monthly Milk */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className={`absolute top-0 left-0 right-0 h-1 ${
            selectedAnimal === 'cow' 
              ? 'bg-gradient-to-r from-blue-400 to-indigo-500' 
              : selectedAnimal === 'combined'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                : 'bg-gradient-to-r from-orange-400 to-amber-500'
          }`}></div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Month Milk</span>
            <div className="w-7 h-7 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Droplets className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {monthlyTotals.grandTotalMilk.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-orange-600">L</span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px] font-semibold">
              <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md">AM: {monthlyTotals.totalMorningMilk} L</span>
              <span className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-md">PM: {monthlyTotals.totalEveningMilk} L</span>
            </div>
          </div>
        </div>

        {/* Total Monthly Revenue (Vibrant Emerald) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Month Revenue</span>
            <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
                ₹{monthlyTotals.grandTotalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px] font-semibold">
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                ₹{(monthlyTotals.grandTotalAmount / (monthlyTotals.grandTotalMilk || 1)).toFixed(1)} / L effective
              </span>
            </div>
          </div>
        </div>

        {/* Average Daily Milk */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Avg Daily Yield</span>
            <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {monthlyTotals.avgDailyMilk}
              </span>
              <span className="text-xs font-bold text-slate-400">L/day</span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold mt-2 pt-2 border-t border-slate-100">
              {monthlyTotals.activeDays} days recorded ({activeCategoryObj.name})
            </p>
          </div>
        </div>

        {/* Average Fat % */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Average Fat</span>
            <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Percent className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight">
                {((parseFloat(monthlyTotals.avgMorningFat) + parseFloat(monthlyTotals.avgEveningFat)) / 2).toFixed(1)}%
              </span>
              <span className="text-xs font-bold text-amber-500">Avg</span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px] font-semibold">
              <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-md">AM: {monthlyTotals.avgMorningFat}%</span>
              <span className="text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded-md">PM: {monthlyTotals.avgEveningFat}%</span>
            </div>
          </div>
        </div>

        {/* Benchmark Rate */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 to-purple-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Avg Day Rate</span>
            <div className="w-7 h-7 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ₹{monthlyTotals.avgRate}
              </span>
              <span className="text-xs font-bold text-slate-400">/ Liter</span>
            </div>
            <p className="text-[10px] text-purple-700 font-semibold mt-2 pt-2 border-t border-slate-100 bg-purple-50/50 -mx-1 px-1 rounded">
              {activeCategoryObj.name} pricing basis
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SEPARATE BUFFALO & COW BREAKDOWN (SHOWN IN COMBINED TOTAL VIEW) */}
      {/* ========================================================================= */}
      {selectedAnimal === 'combined' && (
        <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-5 animate-in fade-in duration-300">
          
          {/* Header & Shared Ratio Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Species Breakdown: Buffalo vs Cow Contributions
                </h3>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Separate Yield & Revenue
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Bulk herd production separation for {formattedMonthLabel} (64 Buffaloes & 28 Cows)
              </p>
            </div>

            {/* Quick Share Metrics */}
            <div className="flex items-center gap-4 text-xs font-bold bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5722]"></span>
                <span className="text-slate-700">Buffalo: <strong>{combinedShare.buffaloMilkShare}%</strong> Vol (₹{combinedShare.buffaloRevShare}% Rev)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-slate-700">Cow: <strong>{combinedShare.cowMilkShare}%</strong> Vol (₹{combinedShare.cowRevShare}% Rev)</span>
              </div>
            </div>
          </div>

          {/* Side-by-Side 2-Column Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* 1. BUFFALO DETAILS CARD */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white rounded-3xl p-5 border border-amber-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🐃</span>
                    <div>
                      <h4 className="font-black text-base text-slate-900">Buffalo Milk Details</h4>
                      <p className="text-[11px] text-amber-800 font-semibold">64 Head Herd • High Fat A2 Milk</p>
                    </div>
                  </div>
                  <span className="bg-amber-100/80 text-amber-900 border border-amber-200 text-[10px] font-black px-2.5 py-1 rounded-full">
                    {combinedShare.buffaloMilkShare}% Farm Volume
                  </span>
                </div>

                {/* Big Highlights */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Buffalo Month Milk</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-slate-900">{buffaloTotals.totalMilk.toLocaleString()}</span>
                      <span className="text-xs font-bold text-orange-600">Liters</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      AM: <strong className="text-slate-800">{buffaloTotals.mAm} L</strong> • PM: <strong className="text-slate-800">{buffaloTotals.mPm} L</strong>
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Buffalo Month Revenue</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-emerald-700">₹{buffaloTotals.totalRevenue.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-emerald-800 font-bold mt-1">
                      {combinedShare.buffaloRevShare}% of total farm revenue
                    </p>
                  </div>
                </div>

                {/* Micro Metric Grid */}
                <div className="grid grid-cols-3 gap-2.5 mt-3 text-center">
                  <div className="bg-white/60 p-2.5 rounded-xl border border-amber-100/70">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Avg Butterfat</span>
                    <span className="text-sm font-black text-amber-900 mt-0.5 block">{buffaloTotals.avgFat}%</span>
                    <span className="text-[9px] text-amber-700 font-semibold">Premium grade</span>
                  </div>

                  <div className="bg-white/60 p-2.5 rounded-xl border border-amber-100/70">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Daily Yield</span>
                    <span className="text-sm font-black text-slate-900 mt-0.5 block">{buffaloTotals.avgDaily} L</span>
                    <span className="text-[9px] text-slate-400">Avg per day</span>
                  </div>

                  <div className="bg-white/60 p-2.5 rounded-xl border border-amber-100/70">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Day Rate</span>
                    <span className="text-sm font-black text-slate-900 mt-0.5 block">₹{buffaloTotals.avgRate}</span>
                    <span className="text-[9px] text-slate-400">per Liter</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-4 pt-3 border-t border-amber-200/50 flex justify-between items-center">
                <span className="text-[10px] text-amber-900/70 font-semibold">42 Milking • 14 Dry • 8 Heifers</span>
                <button
                  onClick={() => setSelectedAnimal('buffalo')}
                  className="text-xs font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Open Buffalo Daily Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. COW DETAILS CARD */}
            <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-white rounded-3xl p-5 border border-blue-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-blue-200/60">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🐄</span>
                    <div>
                      <h4 className="font-black text-base text-slate-900">Cow Milk Details</h4>
                      <p className="text-[11px] text-blue-800 font-semibold">28 Head Herd • High Volume Dairy Line</p>
                    </div>
                  </div>
                  <span className="bg-blue-100/80 text-blue-900 border border-blue-200 text-[10px] font-black px-2.5 py-1 rounded-full">
                    {combinedShare.cowMilkShare}% Farm Volume
                  </span>
                </div>

                {/* Big Highlights */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-blue-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Cow Month Milk</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-slate-900">{cowTotals.totalMilk.toLocaleString()}</span>
                      <span className="text-xs font-bold text-blue-600">Liters</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      AM: <strong className="text-slate-800">{cowTotals.mAm} L</strong> • PM: <strong className="text-slate-800">{cowTotals.mPm} L</strong>
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-blue-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Cow Month Revenue</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-emerald-700">₹{cowTotals.totalRevenue.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-emerald-800 font-bold mt-1">
                      {combinedShare.cowRevShare}% of total farm revenue
                    </p>
                  </div>
                </div>

                {/* Micro Metric Grid */}
                <div className="grid grid-cols-3 gap-2.5 mt-3 text-center">
                  <div className="bg-white/60 p-2.5 rounded-xl border border-blue-100/70">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Avg Butterfat</span>
                    <span className="text-sm font-black text-indigo-900 mt-0.5 block">{cowTotals.avgFat}%</span>
                    <span className="text-[9px] text-indigo-600 font-semibold">Standard cow</span>
                  </div>

                  <div className="bg-white/60 p-2.5 rounded-xl border border-blue-100/70">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Daily Yield</span>
                    <span className="text-sm font-black text-slate-900 mt-0.5 block">{cowTotals.avgDaily} L</span>
                    <span className="text-[9px] text-slate-400">Avg per day</span>
                  </div>

                  <div className="bg-white/60 p-2.5 rounded-xl border border-blue-100/70">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Day Rate</span>
                    <span className="text-sm font-black text-slate-900 mt-0.5 block">₹{cowTotals.avgRate}</span>
                    <span className="text-[9px] text-slate-400">per Liter</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-4 pt-3 border-t border-blue-200/50 flex justify-between items-center">
                <span className="text-[10px] text-blue-900/70 font-semibold">20 Milking • 5 Dry • 3 Calves</span>
                <button
                  onClick={() => setSelectedAnimal('cow')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Open Cow Daily Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Visual Ratio Progress Bar */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-slate-600">
              <span className="flex items-center gap-1 text-amber-900">
                🐃 Buffalo Production Share: <strong>{combinedShare.buffaloMilkShare}% ({buffaloTotals.totalMilk.toLocaleString()} L)</strong>
              </span>
              <span className="flex items-center gap-1 text-blue-900">
                🐄 Cow Production Share: <strong>{combinedShare.cowMilkShare}% ({cowTotals.totalMilk.toLocaleString()} L)</strong>
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div style={{ width: `${combinedShare.buffaloMilkShare}%` }} className="h-full bg-gradient-to-r from-[#FF5722] to-amber-500"></div>
              <div style={{ width: `${combinedShare.cowMilkShare}%` }} className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MASTER DAILY TABLE (SEPARATE BY ANIMAL) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* Table Subtitle Bar */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/40">
          <div className="flex items-center gap-3">
            <span className="text-xl">{activeCategoryObj.emoji}</span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span>{activeCategoryObj.label} Daily Register</span>
                <span className="text-slate-400 font-normal">({formattedMonthLabel})</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {selectedAnimal === 'combined' 
                  ? 'Auto-aggregated total yield across all buffaloes and cows' 
                  : `Bulk logging for ${activeCategoryObj.count}. Click cells to edit.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200/50">
                <Sun className="w-3 h-3 text-amber-600" /> Morning
              </span>
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded-full border border-indigo-200/50">
                <Moon className="w-3 h-3 text-indigo-600" /> Evening
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200/50">
                ₹ Revenue
              </span>
            </div>

            <button 
              onClick={() => window.print()} 
              className="text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1 rounded-full shadow-2xs flex items-center gap-1"
            >
              <Printer className="w-3 h-3 text-slate-400" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto max-h-[520px] scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            
            <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-20 shadow-xs border-b border-slate-200">
              <tr className="text-[11px] font-extrabold text-slate-600">
                <th className="py-3 px-3 text-center w-12 bg-slate-50/80">#</th>
                <th className="py-3 px-3 w-28 bg-slate-50/80">Date</th>
                
                {/* Morning Shift Group */}
                <th className="py-3 px-2 text-center bg-amber-50/60 text-amber-900 border-l border-amber-100 w-24">
                  <div className="flex items-center justify-center gap-1">
                    <Sun className="w-3 h-3 text-amber-600" />
                    <span>AM Milk (L)</span>
                  </div>
                </th>
                <th className="py-3 px-2 text-center bg-amber-50/60 text-amber-900 w-20">
                  <span>AM Fat %</span>
                </th>

                {/* Evening Shift Group */}
                <th className="py-3 px-2 text-center bg-indigo-50/60 text-indigo-900 border-l border-indigo-100 w-24">
                  <div className="flex items-center justify-center gap-1">
                    <Moon className="w-3 h-3 text-indigo-600" />
                    <span>PM Milk (L)</span>
                  </div>
                </th>
                <th className="py-3 px-2 text-center bg-indigo-50/60 text-indigo-900 w-20">
                  <span>PM Fat %</span>
                </th>

                {/* Total Milk Produced */}
                <th className="py-3 px-2 text-center bg-orange-50/70 text-orange-950 font-black border-l border-orange-200/60 w-24">
                  Total Milk (L)
                </th>

                {/* Day Rate */}
                <th className="py-3 px-2 text-center bg-slate-50/80 text-slate-700 border-l border-slate-200/60 w-24">
                  Price / L
                </th>

                {/* Revenue Column */}
                <th className="py-3 px-3 text-right bg-emerald-50/80 text-emerald-950 font-black w-28 border-l border-emerald-100">
                  Total ₹
                </th>

                <th className="py-3 px-2 text-center w-14 bg-slate-50/80"></th>
              </tr>
            </thead>

            {/* Table Rows */}
            <tbody className="divide-y divide-slate-100 font-medium">
              {computedRecords.map((row) => {
                const isPending = row.totalMilk === 0;
                const dateObj = new Date(row.date + 'T00:00:00');
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                const dayFormatted = `${row.dayNumber} Oct (${dayName})`;

                return (
                  <tr 
                    key={row.date} 
                    className={`hover:bg-slate-50/90 transition-colors ${
                      isPending ? 'bg-slate-50/20 text-slate-300' : 'bg-white text-slate-800'
                    }`}
                  >
                    {/* Sr No */}
                    <td className="py-2 px-3 text-center font-bold text-slate-300 text-[11px]">
                      {row.srNo}
                    </td>

                    {/* Date */}
                    <td className="py-2 px-3 whitespace-nowrap">
                      <span className={`font-bold text-xs ${isPending ? 'text-slate-400' : 'text-slate-900'}`}>
                        {dayFormatted}
                      </span>
                    </td>

                    {/* Morning Milk (L) - Inline editable */}
                    <td className="py-1 px-1.5 text-center bg-amber-50/20">
                      <input 
                        type="number"
                        step="0.1"
                        disabled={selectedAnimal === 'combined'}
                        value={row.morningMilk !== null && row.morningMilk !== undefined ? row.morningMilk : ''}
                        onChange={(e) => handleInlineChange(row.date, 'morningMilk', e.target.value)}
                        placeholder="—"
                        className="w-20 text-center font-bold text-amber-950 bg-amber-50/40 hover:bg-white focus:bg-white border border-transparent hover:border-amber-300 focus:border-amber-500 rounded-lg py-1 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Morning Fat (%) */}
                    <td className="py-1 px-1.5 text-center bg-amber-50/20">
                      <input 
                        type="number"
                        step="0.1"
                        disabled={selectedAnimal === 'combined'}
                        value={row.morningFat !== null && row.morningFat !== undefined ? row.morningFat : ''}
                        onChange={(e) => handleInlineChange(row.date, 'morningFat', e.target.value)}
                        placeholder="—"
                        className="w-16 text-center font-extrabold text-amber-800 bg-amber-100/50 hover:bg-white focus:bg-white border border-transparent hover:border-amber-300 focus:border-amber-500 rounded-lg py-1 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Evening Milk (L) */}
                    <td className="py-1 px-1.5 text-center bg-indigo-50/20">
                      <input 
                        type="number"
                        step="0.1"
                        disabled={selectedAnimal === 'combined'}
                        value={row.eveningMilk !== null && row.eveningMilk !== undefined ? row.eveningMilk : ''}
                        onChange={(e) => handleInlineChange(row.date, 'eveningMilk', e.target.value)}
                        placeholder="—"
                        className="w-20 text-center font-bold text-indigo-950 bg-indigo-50/40 hover:bg-white focus:bg-white border border-transparent hover:border-indigo-300 focus:border-indigo-500 rounded-lg py-1 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Evening Fat (%) */}
                    <td className="py-1 px-1.5 text-center bg-indigo-50/20">
                      <input 
                        type="number"
                        step="0.1"
                        disabled={selectedAnimal === 'combined'}
                        value={row.eveningFat !== null && row.eveningFat !== undefined ? row.eveningFat : ''}
                        onChange={(e) => handleInlineChange(row.date, 'eveningFat', e.target.value)}
                        placeholder="—"
                        className="w-16 text-center font-extrabold text-indigo-800 bg-indigo-100/50 hover:bg-white focus:bg-white border border-transparent hover:border-indigo-300 focus:border-indigo-500 rounded-lg py-1 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Total Milk (L) - Vibrant Pill */}
                    <td className="py-2 px-2 text-center bg-orange-50/30">
                      {row.totalMilk > 0 ? (
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-orange-100/80 text-orange-900 font-black text-xs">
                          {row.totalMilk} L
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Price / Liter (₹) */}
                    <td className="py-1 px-1.5 text-center">
                      <input 
                        type="number"
                        step="0.5"
                        disabled={selectedAnimal === 'combined'}
                        value={row.ratePerLiter || ''}
                        onChange={(e) => handleInlineChange(row.date, 'ratePerLiter', e.target.value)}
                        placeholder="84"
                        className="w-16 text-center font-bold text-slate-700 bg-slate-50 hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-slate-800 rounded-lg py-1 px-1 transition-all focus:outline-none disabled:cursor-not-allowed"
                      />
                    </td>

                    {/* Total Amount (₹) - Emerald Highlight */}
                    <td className="py-2 px-3 text-right bg-emerald-50/40">
                      {row.totalAmount > 0 ? (
                        <span className="font-black text-emerald-700 text-xs">
                          ₹{row.totalAmount.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-2 px-2 text-center">
                      <button 
                        onClick={() => handleOpenAddOrEdit(row)}
                        title="Edit Full Entry"
                        className="p-1 rounded-md text-slate-300 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* End of Month Grand Totals Footer */}
            <tfoot className="sticky bottom-0 bg-[#181A1E] text-white font-extrabold border-t-2 border-slate-900 z-20 shadow-2xl">
              <tr className="text-xs">
                <td colSpan={2} className="py-3 px-3 uppercase tracking-wider text-[11px] text-slate-300 font-black">
                  {activeCategoryObj.name.toUpperCase()} TOTALS
                </td>
                
                {/* Total AM Milk */}
                <td className="py-3 px-2 text-center font-black text-amber-400">
                  {monthlyTotals.totalMorningMilk.toLocaleString()} L
                </td>

                {/* Avg AM Fat */}
                <td className="py-3 px-2 text-center font-bold text-amber-200">
                  <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">
                    {monthlyTotals.avgMorningFat}%
                  </span>
                </td>

                {/* Total PM Milk */}
                <td className="py-3 px-2 text-center font-black text-indigo-400">
                  {monthlyTotals.totalEveningMilk.toLocaleString()} L
                </td>

                {/* Avg PM Fat */}
                <td className="py-3 px-2 text-center font-bold text-indigo-200">
                  <span className="bg-indigo-400/20 text-indigo-300 px-1.5 py-0.5 rounded">
                    {monthlyTotals.avgEveningFat}%
                  </span>
                </td>

                {/* Grand Total Milk (L) */}
                <td className="py-3 px-2 text-center font-black">
                  <span className="bg-[#FF5722] text-white px-2 py-1 rounded-md shadow-sm">
                    {monthlyTotals.grandTotalMilk.toLocaleString()} L
                  </span>
                </td>

                {/* Avg Price */}
                <td className="py-3 px-2 text-center text-slate-300 font-semibold">
                  ₹{monthlyTotals.avgRate}
                </td>

                {/* Grand Total Amount (₹) */}
                <td className="py-3 px-3 text-right">
                  <span className="bg-emerald-600 text-white font-black px-2.5 py-1 rounded-md shadow-sm">
                    ₹{monthlyTotals.grandTotalAmount.toLocaleString()}
                  </span>
                </td>

                <td className="py-3 px-2 text-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: DAILY SHIFT PERFORMANCE & YIELD TRENDS (FIXED PIXEL HEIGHTS) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        
        {/* Chart Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Daily Performance & Shift Trends ({formattedMonthLabel})
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 ml-9">
              Hover over any day to inspect {activeCategoryObj.name} shift volume, fat %, and revenue
            </p>
          </div>

          {/* Toggle Metric Pill */}
          <div className="flex items-center bg-slate-100/80 p-1 rounded-2xl text-xs font-bold self-start sm:self-auto">
            <button 
              onClick={() => setActiveChartTab('milk')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeChartTab === 'milk' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Milk Yield (Litres)
            </button>
            <button 
              onClick={() => setActiveChartTab('revenue')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeChartTab === 'revenue' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Daily Revenue (₹)
            </button>
            <button 
              onClick={() => setActiveChartTab('fat')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeChartTab === 'fat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Fat Content (%)
            </button>
          </div>
        </div>

        {/* Dynamic Chart Area */}
        <div className="relative pt-2">
          {chartDays.length > 0 ? (
            <div className="w-full space-y-3">
              
              {/* Minimal Chart Legend */}
              <div className="flex items-center justify-between text-xs font-semibold px-2">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-extrabold">
                  {activeCategoryObj.name} • {activeChartTab === 'milk' ? 'Morning vs Evening Stacked Yield (L)' : activeChartTab === 'revenue' ? 'Daily Settlement Realized (₹)' : 'AM & PM Butterfat Levels (%)'}
                </span>

                <div className="flex items-center gap-4">
                  {activeChartTab === 'milk' && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span className="text-slate-600 text-xs">Morning Shift</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        <span className="text-slate-600 text-xs">Evening Shift</span>
                      </div>
                    </>
                  )}
                  {activeChartTab === 'revenue' && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-slate-600 text-xs">Daily Revenue</span>
                    </div>
                  )}
                  {activeChartTab === 'fat' && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span className="text-slate-600 text-xs">Morning Fat</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        <span className="text-slate-600 text-xs">Evening Fat</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Graphical Canvas with Explicit Height Containers */}
              <div className="h-64 w-full bg-gradient-to-b from-slate-50/60 to-white rounded-2xl p-4 border border-slate-100 flex flex-col justify-between">
                
                {/* Visual Chart Bars Container */}
                <div className="h-44 w-full flex items-end gap-1 sm:gap-2 px-1">
                  {chartDays.map((d) => {
                    const isHovered = hoveredDay === d.date;

                    if (activeChartTab === 'milk') {
                      const totalBarPx = Math.max(Math.round((d.totalMilk / maxMilk) * 155), 10);
                      const morningRatio = d.morningMilk / d.totalMilk;
                      const eveningRatio = d.eveningMilk / d.totalMilk;

                      return (
                        <div 
                          key={d.date} 
                          onMouseEnter={() => setHoveredDay(d.date)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer min-w-[16px]"
                        >
                          {/* Floating Minimal Tooltip */}
                          {isHovered && (
                            <div className="absolute bottom-full mb-2 bg-[#181A1E] text-white p-3 rounded-2xl shadow-2xl z-30 text-[10px] whitespace-nowrap pointer-events-none border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                              <p className="font-extrabold text-amber-400 text-xs">
                                {d.date} ({activeCategoryObj.name})
                              </p>
                              <div className="mt-1.5 space-y-0.5">
                                <p className="text-white font-black text-xs">Total: {d.totalMilk} L</p>
                                <p className="text-amber-200">AM: {d.morningMilk} L • {d.morningFat}% Fat</p>
                                <p className="text-indigo-200">PM: {d.eveningMilk} L • {d.eveningFat}% Fat</p>
                                <p className="text-emerald-400 font-extrabold pt-1 border-t border-white/10">₹{d.totalAmount.toLocaleString()}</p>
                              </div>
                            </div>
                          )}

                          {/* Stacked Minimal Pill Bar with Explicit Pixel Height */}
                          <div 
                            style={{ height: `${totalBarPx}px` }} 
                            className={`w-full max-w-[24px] rounded-t-lg overflow-hidden flex flex-col justify-end transition-all ${
                              isHovered ? 'scale-110 shadow-md ring-2 ring-slate-900/10' : 'group-hover:opacity-90'
                            }`}
                          >
                            <div style={{ height: `${eveningRatio * 100}%` }} className="w-full bg-gradient-to-t from-indigo-600 to-indigo-500"></div>
                            <div style={{ height: `${morningRatio * 100}%` }} className="w-full bg-gradient-to-t from-amber-500 to-amber-400"></div>
                          </div>

                          <span className={`text-[9px] font-bold mt-2 transition-colors ${
                            isHovered ? 'text-slate-900 font-extrabold' : 'text-slate-400'
                          }`}>
                            {d.dayNumber}
                          </span>
                        </div>
                      );
                    }

                    if (activeChartTab === 'revenue') {
                      const barHeightPx = Math.max(Math.round((d.totalAmount / maxRevenue) * 155), 10);
                      return (
                        <div 
                          key={d.date} 
                          onMouseEnter={() => setHoveredDay(d.date)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer min-w-[16px]"
                        >
                          {isHovered && (
                            <div className="absolute bottom-full mb-2 bg-[#181A1E] text-white p-3 rounded-2xl shadow-2xl z-30 text-[10px] whitespace-nowrap pointer-events-none border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                              <p className="font-extrabold text-emerald-400 text-xs">{d.date} ({activeCategoryObj.name})</p>
                              <p className="text-white font-black text-xs mt-1">₹{d.totalAmount.toLocaleString()}</p>
                              <p className="text-slate-300 mt-0.5">{d.totalMilk} L @ ₹{d.ratePerLiter}/L</p>
                            </div>
                          )}

                          <div 
                            style={{ height: `${barHeightPx}px` }} 
                            className={`w-full max-w-[24px] rounded-t-lg bg-gradient-to-t from-emerald-600 to-teal-400 transition-all ${
                              isHovered ? 'scale-110 shadow-md ring-2 ring-emerald-500/20' : 'group-hover:opacity-90'
                            }`}
                          ></div>
                          <span className="text-[9px] font-bold text-slate-400 mt-2">{d.dayNumber}</span>
                        </div>
                      );
                    }

                    if (activeChartTab === 'fat') {
                      const minFat = selectedAnimal === 'cow' ? 3.0 : 6.0;
                      const maxFat = selectedAnimal === 'cow' ? 6.0 : 9.5;
                      const amFatHeightPx = Math.max(Math.round(((d.morningFat - minFat) / (maxFat - minFat)) * 140), 12);
                      const pmFatHeightPx = Math.max(Math.round(((d.eveningFat - minFat) / (maxFat - minFat)) * 140), 12);

                      return (
                        <div 
                          key={d.date} 
                          onMouseEnter={() => setHoveredDay(d.date)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer min-w-[16px]"
                        >
                          {isHovered && (
                            <div className="absolute bottom-full mb-2 bg-[#181A1E] text-white p-3 rounded-2xl shadow-2xl z-30 text-[10px] whitespace-nowrap pointer-events-none border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                              <p className="font-extrabold text-amber-400 text-xs">{d.date}</p>
                              <p className="text-amber-200 mt-1">Morning Fat: <strong className="text-white">{d.morningFat}%</strong></p>
                              <p className="text-indigo-200">Evening Fat: <strong className="text-white">{d.eveningFat}%</strong></p>
                            </div>
                          )}

                          <div className="w-full flex items-end justify-center gap-1">
                            <div style={{ height: `${amFatHeightPx}px` }} className="w-2 rounded-t-sm bg-gradient-to-t from-amber-600 to-amber-400"></div>
                            <div style={{ height: `${pmFatHeightPx}px` }} className="w-2 rounded-t-sm bg-gradient-to-t from-indigo-600 to-indigo-400"></div>
                          </div>
                          <span className="text-[9px] font-bold text-slate-400 mt-2">{d.dayNumber}</span>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>

                {/* X-Axis Legend */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold px-2">
                  <span>Day 1 ({selectedMonth})</span>
                  <span>Daily Shift Milking Yield (Days 1 — 31)</span>
                  <span>Day {chartDays.length}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              No milk data recorded for this month.
            </div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* NEW COMPONENT: MONTH-WISE REPORTING FOR EVERY MONTH (ANNUAL REGISTER) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[28px] p-6 border border-slate-200/80 shadow-sm space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF5722]">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Monthly Production & Revenue Reports (2026)
              </h3>
              <span className="bg-[#181A1E] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                12 Months Master
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 ml-10">
              Month-by-month comparative analysis, seasonal yield curve, and annual settlement
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownloadAnnualCSV}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-full shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export Full Year Report (CSV)</span>
            </button>
          </div>
        </div>

        {/* Annual Highlights (4 Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Milk Produced (YTD)</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {annualSummary.totalMilk.toLocaleString()} <span className="text-xs font-bold text-orange-600">Liters</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-1">
              Recorded across {annualMonthlyReport.filter(m => m.status !== 'Projected').length} months in 2026
            </p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Gross Revenue (YTD)</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">
              ₹{annualSummary.totalRevenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">
              Average ₹{annualSummary.avgMonthlyRevenue.toLocaleString()} / month
            </p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Peak Production Month</span>
            <p className="text-2xl font-black text-indigo-900 mt-1">
              {annualSummary.peakMonth.name}
            </p>
            <p className="text-[10px] text-slate-500 mt-1 font-semibold">
              {annualSummary.peakMonth.totalLiters.toLocaleString()} Liters • ₹{annualSummary.peakMonth.revenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Annual Average Fat</span>
            <p className="text-2xl font-black text-amber-700 mt-1">
              {annualSummary.avgFat}%
            </p>
            <p className="text-[10px] text-slate-500 mt-1">
              Quality benchmark ({activeCategoryObj.name})
            </p>
          </div>

        </div>

        {/* Month-wise Master Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/80 text-[11px] font-extrabold text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 text-center w-12">#</th>
                <th className="py-3 px-4">Month</th>
                <th className="py-3 px-3 text-center">Days</th>
                <th className="py-3 px-3 text-center">Total Milk (L)</th>
                <th className="py-3 px-3 text-center">Avg Fat (%)</th>
                <th className="py-3 px-3 text-center">Avg Price (₹/L)</th>
                <th className="py-3 px-4 text-right">Total Revenue (₹)</th>
                <th className="py-3 px-3 text-center">MoM Trend</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              {annualMonthlyReport.map((m, idx) => {
                const isSelected = m.id === selectedMonth;

                return (
                  <tr 
                    key={m.id} 
                    className={`transition-colors hover:bg-slate-50/80 ${
                      isSelected ? 'bg-orange-50/30 font-semibold' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-center font-bold text-slate-300">
                      {idx + 1}
                    </td>

                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">{m.name} 2026</span>
                        {isSelected && (
                          <span className="bg-[#FF5722] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                            Active
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-center text-slate-500">
                      {m.days} days
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <span className="font-black text-slate-900 text-xs px-2 py-0.5 rounded bg-slate-100">
                        {m.totalLiters.toLocaleString()} L
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-center font-bold text-amber-800">
                      {m.fat}%
                    </td>

                    <td className="py-2.5 px-3 text-center text-slate-600 font-semibold">
                      ₹{m.rate}
                    </td>

                    <td className="py-2.5 px-4 text-right font-black text-emerald-700 text-xs">
                      ₹{m.revenue.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.momGrowth.startsWith('+') 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {m.momGrowth.startsWith('+') ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                        {m.momGrowth}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.status === 'Settled'
                          ? 'bg-emerald-100/70 text-emerald-800'
                          : m.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-slate-100 text-slate-500'
                      }`}>
                        {m.status}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedMonth(m.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-[11px] font-extrabold text-[#FF5722] hover:text-[#E64A19] flex items-center justify-center gap-0.5 mx-auto hover:underline"
                        title="Open this month's daily sheet"
                      >
                        <span>Open Sheet</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Annual Grand Totals */}
            <tfoot className="bg-[#181A1E] text-white font-extrabold border-t-2 border-slate-900 text-xs">
              <tr>
                <td colSpan={3} className="py-3 px-4 uppercase tracking-wider text-[11px] text-orange-400 font-black">
                  ANNUAL TOTALS (YTD 2026)
                </td>
                <td className="py-3 px-3 text-center font-black text-[#FF5722]">
                  {annualSummary.totalMilk.toLocaleString()} L
                </td>
                <td className="py-3 px-3 text-center text-amber-300 font-bold">
                  {annualSummary.avgFat}%
                </td>
                <td className="py-3 px-3 text-center text-slate-300">
                  ₹{(annualSummary.totalRevenue / (annualSummary.totalMilk || 1)).toFixed(1)}
                </td>
                <td className="py-3 px-4 text-right font-black text-emerald-400 text-sm">
                  ₹{annualSummary.totalRevenue.toLocaleString()}
                </td>
                <td colSpan={3} className="py-3 px-3 text-center text-[10px] text-slate-400">
                  Audit Completed & Reconciled
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* 12-Month Comparative Yield Bar Chart */}
        <div className="bg-slate-50/60 p-4 sm:p-5 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                12-Month Seasonal Production Curve (Jan — Dec 2026)
              </h4>
              <p className="text-[11px] text-slate-400">
                Visualizing seasonal yield volume changes across the lactation cycles
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              Peak: {annualSummary.peakMonth.name} ({annualSummary.peakMonth.totalLiters.toLocaleString()} L)
            </span>
          </div>

          <div className="h-44 w-full flex items-end gap-2 sm:gap-3 pt-2">
            {annualMonthlyReport.map((m) => {
              const barHeightPx = Math.max(Math.round((m.totalLiters / maxAnnualMilk) * 135), 14);
              const isHovered = hoveredAnnualMonth === m.id;
              const isCurrent = m.id === selectedMonth;

              return (
                <div 
                  key={m.id}
                  onMouseEnter={() => setHoveredAnnualMonth(m.id)}
                  onMouseLeave={() => setHoveredAnnualMonth(null)}
                  onClick={() => {
                    setSelectedMonth(m.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer"
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute bottom-full mb-2 bg-[#181A1E] text-white p-2.5 rounded-xl shadow-xl z-30 text-[10px] whitespace-nowrap pointer-events-none border border-slate-700">
                      <p className="font-extrabold text-orange-400">{m.name} 2026</p>
                      <p className="text-white font-black mt-0.5">{m.totalLiters.toLocaleString()} Liters</p>
                      <p className="text-emerald-400 font-bold">₹{m.revenue.toLocaleString()}</p>
                      <p className="text-slate-300">Fat: {m.fat}% • ₹{m.rate}/L</p>
                    </div>
                  )}

                  {/* Bar */}
                  <div 
                    style={{ height: `${barHeightPx}px` }}
                    className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                      isCurrent 
                        ? 'bg-gradient-to-t from-[#FF5722] to-amber-400 shadow-md ring-2 ring-orange-500/30' 
                        : m.status === 'Projected'
                          ? 'bg-slate-200 group-hover:bg-slate-300'
                          : 'bg-gradient-to-t from-slate-700 to-slate-500 group-hover:from-slate-600 group-hover:to-slate-400'
                    }`}
                  ></div>

                  <span className={`text-[9px] font-bold mt-2 truncate w-full text-center ${
                    isCurrent ? 'text-[#FF5722] font-black' : 'text-slate-400'
                  }`}>
                    {m.name.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MINIMAL MODAL: ADD / EDIT DAILY MILK RECORD */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-[#FF5722] flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingDay ? 'Edit Daily Milk Entry' : 'Add Daily Milk Entry'}
                </h3>
                <p className="text-xs text-slate-400">Bulk logging for {formData.animal === 'cow' ? 'Cows' : 'Buffaloes'}</p>
              </div>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              
              {/* Animal Category Selection */}
              <div>
                <label className="font-extrabold text-slate-700 block mb-1.5">Animal Category</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, animal: 'buffalo', ratePerLiter: formData.ratePerLiter === '60.0' ? '84.0' : formData.ratePerLiter })}
                    className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                      formData.animal === 'buffalo'
                        ? 'bg-[#181A1E] text-white border-transparent shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <span>🐃</span> Buffalo
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, animal: 'cow', ratePerLiter: formData.ratePerLiter === '84.0' ? '60.0' : formData.ratePerLiter })}
                    className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                      formData.animal === 'cow'
                        ? 'bg-[#181A1E] text-white border-transparent shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <span>🐄</span> Cow
                  </button>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Entry Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-slate-200 rounded-2xl p-2.5 font-bold text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>

              {/* Morning Shift Fields */}
              <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/50 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-[11px]">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Morning Shift (AM)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Milk (L)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="e.g. 142.5" 
                      required
                      value={formData.morningMilk}
                      onChange={(e) => setFormData({ ...formData, morningMilk: e.target.value })}
                      className="w-full border border-amber-200 rounded-xl p-2 font-black text-amber-950 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Fat (%)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder={formData.animal === 'cow' ? 'e.g. 4.4' : 'e.g. 7.8'} 
                      required
                      value={formData.morningFat}
                      onChange={(e) => setFormData({ ...formData, morningFat: e.target.value })}
                      className="w-full border border-amber-200 rounded-xl p-2 font-black text-amber-950 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Evening Shift Fields */}
              <div className="bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-200/50 space-y-2">
                <div className="flex items-center gap-1.5 text-indigo-900 font-black text-[11px]">
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Evening Shift (PM)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Milk (L)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="e.g. 128.0" 
                      required
                      value={formData.eveningMilk}
                      onChange={(e) => setFormData({ ...formData, eveningMilk: e.target.value })}
                      className="w-full border border-indigo-200 rounded-xl p-2 font-black text-indigo-950 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Fat (%)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder={formData.animal === 'cow' ? 'e.g. 4.2' : 'e.g. 7.6'} 
                      required
                      value={formData.eveningFat}
                      onChange={(e) => setFormData({ ...formData, eveningFat: e.target.value })}
                      className="w-full border border-indigo-200 rounded-xl p-2 font-black text-indigo-950 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Day Price / Liter */}
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Price / Liter (₹)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input 
                    type="number" 
                    step="0.5" 
                    required
                    value={formData.ratePerLiter}
                    onChange={(e) => setFormData({ ...formData, ratePerLiter: e.target.value })}
                    className="w-full border border-slate-200 rounded-2xl py-2.5 pl-8 pr-3 font-black text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
              </div>

              {/* Auto Preview */}
              {formData.morningMilk && formData.eveningMilk && (
                <div className="bg-emerald-50/70 border border-emerald-200/60 p-3 rounded-2xl text-[11px] font-semibold text-emerald-900 space-y-1">
                  <div className="flex justify-between">
                    <span>Total Day Milk ({formData.animal === 'cow' ? 'Cow' : 'Buffalo'}):</span>
                    <strong className="text-emerald-950 font-black">
                      {(parseFloat(formData.morningMilk || 0) + parseFloat(formData.eveningMilk || 0)).toFixed(1)} L
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Daily Revenue:</span>
                    <strong className="text-emerald-800 font-black">
                      ₹{Math.round(((parseFloat(formData.morningMilk || 0) + parseFloat(formData.eveningMilk || 0)) * (parseFloat(formData.ratePerLiter) || 0))).toLocaleString()}
                    </strong>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold py-2.5 rounded-2xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-[#181A1E] hover:bg-slate-800 text-white font-extrabold py-2.5 rounded-2xl shadow-md transition-colors"
                >
                  {editingDay ? 'Update Record' : 'Save Record'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
