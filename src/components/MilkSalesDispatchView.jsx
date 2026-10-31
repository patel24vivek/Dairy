import React, { useState, useMemo } from 'react';
import XLSX from 'xlsx-js-style';
import {
  IndianRupee,
  Plus,
  Calendar,
  Download,
  Search,
  Droplets,
  Trash2,
  CheckCircle2,
  X,
  Clock,
  Printer,
  Wallet,
  Check,
  UserPlus,
  Users,
  Phone,
  MapPin,
  Eye,
  FileText,
  Share2,
  Copy
} from 'lucide-react';

export default function MilkSalesDispatchView() {
  const [selectedMonth, setSelectedMonth] = useState('2026-10');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Full' | 'Partial' | 'Unpaid'

  // Modals
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);
  const [paymentModalSale, setPaymentModalSale] = useState(null);
  const [paymentAmountInput, setPaymentAmountInput] = useState('');
  const [viewDetailsSale, setViewDetailsSale] = useState(null); // Minimal detail view
  const [monthlySheetCustomer, setMonthlySheetCustomer] = useState(null); // Whole month date-wise sheet
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Available Months
  const availableMonths = [
    { id: '2026-10', name: 'October 2026' },
    { id: '2026-09', name: 'September 2026' },
    { id: '2026-08', name: 'August 2026' },
  ];

  // =========================================================================
  // 1. CUSTOMERS DIRECTORY (ID auto-generated, Name, Address, Mobile)
  // =========================================================================
  const [customers, setCustomers] = useState([
    {
      id: 'CUST-001',
      name: 'Kailash Sweets (કૈલાશ સ્વીટ્સ)',
      type: 'Sweet Shop',
      phone: '94280 44551',
      address: 'Station Road, Opp. Tower Clock, Main Market',
      defaultMilk: 'Buffalo (ભેંસનું દૂધ)',
      defaultRate: 85.0
    },
    {
      id: 'CUST-002',
      name: 'Banas Chilling Plant (દૂધ સંઘ)',
      type: 'Dairy Plant',
      phone: '98250 11234',
      address: 'GIDC Highway Chilling Center, Bayad Route',
      defaultMilk: 'Buffalo (ભેંસનું દૂધ)',
      defaultRate: 84.0
    },
    {
      id: 'CUST-003',
      name: 'Hotel Darshan (દર્શન હોટેલ)',
      type: 'Hotel / Restaurant',
      phone: '98795 22119',
      address: 'National Highway 48, Near Toll Plaza',
      defaultMilk: 'Buffalo (ભેંસનું દૂધ)',
      defaultRate: 85.0
    },
    {
      id: 'CUST-004',
      name: 'Shrinathji Sweets (શ્રીનાથજી સ્વીટ્સ)',
      type: 'Sweet Shop',
      phone: '98242 88990',
      address: 'Bazar Peth, Mandi Chowk',
      defaultMilk: 'Buffalo (ભેંસનું દૂધ)',
      defaultRate: 86.0
    },
    {
      id: 'CUST-005',
      name: 'Gokul Dham Society (સોસાયટી દૂધ બંધારણ)',
      type: 'Retail Customers',
      phone: '99245 33441',
      address: 'Gokul Dham Residency, Main Gate, 42 Houses',
      defaultMilk: 'Buffalo (ભેંસનું દૂધ)',
      defaultRate: 88.0
    },
    {
      id: 'CUST-006',
      name: 'Ramesh Patel (રમેશભાઈ પટેલ)',
      type: 'Retail Customer',
      phone: '98980 55443',
      address: 'Bungalow No. 12, Shanti Niketan Society',
      defaultMilk: 'Cow (ગાયનું દૂધ)',
      defaultRate: 65.0
    }
  ]);

  // Form State for Add Customer (Auto generates Customer ID)
  const nextCustomerId = useMemo(() => {
    const existingNums = customers
      .map((c) => parseInt(c.id.replace('CUST-', ''), 10))
      .filter((n) => !isNaN(n));
    const maxNum = existingNums.length > 0 ? Math.max(...existingNums) : 0;
    return `CUST-${String(maxNum + 1).padStart(3, '0')}`;
  }, [customers]);

  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    type: 'Sweet Shop',
    phone: '',
    address: '',
    defaultMilk: 'Buffalo (ભેંસનું દૂધ)',
    defaultRate: '85.0'
  });

  // =========================================================================
  // 2. SALES LEDGER WITH CUSTOMER ID LINKED
  // =========================================================================
  const [salesList, setSalesList] = useState([
    {
      id: 'SALE-01',
      customerId: 'CUST-001',
      date: '2026-10-27',
      month: '2026-10',
      milkType: 'Buffalo (ભેંસ)',
      litres: 120.0,
      rate: 85.0,
      totalAmount: 10200,
      paidAmount: 5100, // Half paid first
      balanceDue: 5100,
      notes: 'Paid half cash on delivery, remaining due next Monday'
    },
    {
      id: 'SALE-02',
      customerId: 'CUST-002',
      date: '2026-10-27',
      month: '2026-10',
      milkType: 'Buffalo (ભેંસ)',
      litres: 240.0,
      rate: 84.0,
      totalAmount: 20160,
      paidAmount: 20160, // Full paid
      balanceDue: 0,
      notes: 'Full payment received via Bank Transfer'
    },
    {
      id: 'SALE-03',
      customerId: 'CUST-003',
      date: '2026-10-26',
      month: '2026-10',
      milkType: 'Buffalo (ભેંસ)',
      litres: 50.0,
      rate: 85.0,
      totalAmount: 4250,
      paidAmount: 2000, // Partial paid
      balanceDue: 2250,
      notes: 'GPay ₹2,000 paid, remaining ₹2,250 on month-end'
    },
    {
      id: 'SALE-04',
      customerId: 'CUST-002',
      date: '2026-10-26',
      month: '2026-10',
      milkType: 'Cow (ગાય)',
      litres: 180.0,
      rate: 60.0,
      totalAmount: 10800,
      paidAmount: 10800,
      balanceDue: 0,
      notes: 'Morning cow milk bulk dispatch (RTGS received)'
    },
    {
      id: 'SALE-05',
      customerId: 'CUST-004',
      date: '2026-10-25',
      month: '2026-10',
      milkType: 'Buffalo (ભેંસ)',
      litres: 80.0,
      rate: 86.0,
      totalAmount: 6880,
      paidAmount: 3440, // Half paid first
      balanceDue: 3440,
      notes: 'Half paid ₹3,440 first, half balance pending'
    },
    {
      id: 'SALE-06',
      customerId: 'CUST-005',
      date: '2026-10-25',
      month: '2026-10',
      milkType: 'Buffalo (ભેંસ)',
      litres: 85.0,
      rate: 88.0,
      totalAmount: 7480,
      paidAmount: 7480,
      balanceDue: 0,
      notes: 'Cash collected by morning delivery boy'
    },
    {
      id: 'SALE-07',
      customerId: 'CUST-006',
      date: '2026-10-24',
      month: '2026-10',
      milkType: 'Cow (ગાય)',
      litres: 30.0,
      rate: 65.0,
      totalAmount: 1950,
      paidAmount: 0, // Unpaid
      balanceDue: 1950,
      notes: 'Milk delivered, full payment due on 1st'
    }
  ]);

  // Form State for Adding a Simple Sale
  const [newSale, setNewSale] = useState({
    customerId: 'CUST-001',
    date: '2026-10-27',
    milkType: 'Buffalo (ભેંસ)',
    litres: '',
    rate: 85.0,
    paidAmount: '',
    notes: ''
  });

  // Calculate live total & balance in Add Form
  const formTotal = useMemo(() => {
    const l = parseFloat(newSale.litres) || 0;
    const r = parseFloat(newSale.rate) || 0;
    return Math.round(l * r);
  }, [newSale.litres, newSale.rate]);

  const formBalance = useMemo(() => {
    const p = parseFloat(newSale.paidAmount) || 0;
    return Math.max(0, formTotal - p);
  }, [formTotal, newSale.paidAmount]);

  // Quick Payment Preset Buttons in Add Form
  const setQuickPaidAmount = (type) => {
    if (type === 'full') {
      setNewSale({ ...newSale, paidAmount: formTotal.toString() });
    } else if (type === 'half') {
      setNewSale({ ...newSale, paidAmount: Math.round(formTotal / 2).toString() });
    } else if (type === 'zero') {
      setNewSale({ ...newSale, paidAmount: '0' });
    }
  };

  // Enriched Sales List (Merged with Customer Info)
  const enrichedSales = useMemo(() => {
    return salesList.map((sale) => {
      const cust = customers.find((c) => c.id === sale.customerId) || {
        id: sale.customerId || 'CUST-???',
        name: 'Unknown Customer',
        type: 'Retail',
        phone: '—',
        address: '—'
      };
      return {
        ...sale,
        customerName: cust.name,
        customerType: cust.type,
        phone: cust.phone,
        address: cust.address
      };
    });
  }, [salesList, customers]);

  // Filtered Sales List
  const filteredSales = useMemo(() => {
    return enrichedSales.filter((s) => {
      const matchMonth = s.month === selectedMonth;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        s.customerId.toLowerCase().includes(q) ||
        s.customerName.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.customerType.toLowerCase().includes(q) ||
        s.milkType.toLowerCase().includes(q);

      let matchStatus = true;
      if (statusFilter === 'Full') matchStatus = s.balanceDue === 0;
      if (statusFilter === 'Partial') matchStatus = s.paidAmount > 0 && s.balanceDue > 0;
      if (statusFilter === 'Unpaid') matchStatus = s.paidAmount === 0;

      return matchMonth && matchSearch && matchStatus;
    });
  }, [enrichedSales, selectedMonth, searchQuery, statusFilter]);

  // Financial Summary Numbers
  const metrics = useMemo(() => {
    const totalMilk = filteredSales.reduce((sum, s) => sum + (Number(s.litres) || 0), 0);
    const totalSales = filteredSales.reduce((sum, s) => sum + (Number(s.totalAmount) || 0), 0);
    const totalPaid = filteredSales.reduce((sum, s) => sum + (Number(s.paidAmount) || 0), 0);
    const totalBalance = filteredSales.reduce((sum, s) => sum + (Number(s.balanceDue) || 0), 0);

    return { totalMilk, totalSales, totalPaid, totalBalance };
  }, [filteredSales]);

  // Date-wise Monthly Breakdown for the Selected Customer Sheet (Multi-day data for any customer)
  const customerMonthlyBreakdown = useMemo(() => {
    if (!monthlySheetCustomer) return null;

    const cust = monthlySheetCustomer;
    const rate = cust.defaultRate || 85.0;
    const milk = cust.defaultMilk || 'Buffalo (ભેંસનું દૂધ)';

    // Determine baseline daily quantity based on customer category
    let baseL = 45.0;
    if (cust.type === 'Dairy Plant') baseL = 220.0;
    else if (cust.type === 'Sweet Shop') baseL = 50.0;
    else if (cust.type === 'Hotel / Restaurant') baseL = 45.0;
    else if (cust.name.includes('Gokul Dham') || cust.name.includes('Society')) baseL = 80.0;
    else if (cust.type === 'Retail Customer') baseL = 3.0;

    // Build 27 continuous days for the month (01 Oct to 27 Oct 2026)
    const daysInPeriod = selectedMonth === '2026-10' ? 27 : 30;
    const dateEntries = [];

    // Check if user has recorded manual sales in salesList for this customer
    const manualSales = salesList.filter(
      (s) => s.customerId === cust.id && s.month === selectedMonth
    );

    for (let day = 1; day <= daysInPeriod; day++) {
      const dayStr = day < 10 ? `0${day}` : `${day}`;
      const dateStr = `${selectedMonth}-${dayStr}`;

      // Check if a manual sale matches this date
      const matchedManual = manualSales.find((s) => s.date === dateStr);

      let dayLitres = 0;
      let dayRate = rate;
      let dayAmount = 0;
      let dayPaid = 0;
      let dayBalance = 0;
      let dayNotes = '';

      if (matchedManual) {
        dayLitres = matchedManual.litres;
        dayRate = matchedManual.rate;
        dayAmount = matchedManual.totalAmount;
        dayPaid = matchedManual.paidAmount;
        dayBalance = matchedManual.balanceDue;
        dayNotes = matchedManual.notes || '';
      } else {
        // Generate realistic daily delivery variation (+/- a few litres)
        const pseudoVariance = ((day * 7 + 3) % 5) - 2;
        dayLitres = parseFloat(Math.max(1, baseL + pseudoVariance * (baseL > 10 ? 1.5 : 0.2)).toFixed(1));
        dayAmount = Math.round(dayLitres * dayRate);

        // Realistic payment collection schedule:
        // Day 1 to 15: Settled in full (first fortnightly bill paid)
        // Day 16 to 22: Paid or partially settled
        // Day 23 to 27: Current cycle due / half paid
        if (day <= 15) {
          dayPaid = dayAmount;
          dayBalance = 0;
          dayNotes = 'Settled in fortnightly cycle';
        } else if (day <= 22) {
          dayPaid = Math.round(dayAmount * 0.7); // 70% paid
          dayBalance = dayAmount - dayPaid;
          dayNotes = 'Partially settled';
        } else {
          // Recent days (half or pending)
          dayPaid = Math.round(dayAmount * 0.4); // 40% paid or half
          dayBalance = dayAmount - dayPaid;
          dayNotes = 'Current week balance due';
        }
      }

      dateEntries.push({
        srNo: day,
        date: dateStr,
        dayLabel: `${dayStr} ${selectedMonth.slice(5) === '10' ? 'Oct' : selectedMonth.slice(5) === '09' ? 'Sep' : 'Aug'} 2026`,
        milkType: milk,
        litres: dayLitres,
        rate: dayRate,
        amount: dayAmount,
        paid: dayPaid,
        balance: dayBalance,
        notes: dayNotes
      });
    }

    const totalMilk = dateEntries.reduce((sum, e) => sum + e.litres, 0);
    const totalBill = dateEntries.reduce((sum, e) => sum + e.amount, 0);
    const totalPaid = dateEntries.reduce((sum, e) => sum + e.paid, 0);
    const totalPending = dateEntries.reduce((sum, e) => sum + e.balance, 0);

    return {
      customer: cust,
      month: selectedMonth,
      entries: dateEntries,
      totalMilk,
      totalBill,
      totalPaid,
      totalPending
    };
  }, [monthlySheetCustomer, salesList, selectedMonth]);

  // =========================================================================
  // ACTIONS: SAVE CUSTOMER, SAVE SALE, COLLECT BALANCE, DELETE
  // =========================================================================

  // Handle Save New Customer
  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!newCustomerForm.name.trim()) return;

    const newCust = {
      id: nextCustomerId,
      name: newCustomerForm.name.trim(),
      type: newCustomerForm.type,
      phone: newCustomerForm.phone.trim() || '—',
      address: newCustomerForm.address.trim() || 'Local Area',
      defaultMilk: newCustomerForm.defaultMilk,
      defaultRate: parseFloat(newCustomerForm.defaultRate) || 85.0
    };

    setCustomers([...customers, newCust]);
    setShowAddCustomerModal(false);

    setNewSale((prev) => ({
      ...prev,
      customerId: newCust.id,
      rate: newCust.defaultRate,
      milkType: newCust.defaultMilk
    }));

    setNewCustomerForm({
      name: '',
      type: 'Sweet Shop',
      phone: '',
      address: '',
      defaultMilk: 'Buffalo (ભેંસનું દૂધ)',
      defaultRate: '85.0'
    });
  };

  // Submit New Sale
  const handleSaveSale = (e) => {
    e.preventDefault();
    if (!newSale.customerId || !newSale.litres) return;

    const litresNum = parseFloat(newSale.litres) || 0;
    const rateNum = parseFloat(newSale.rate) || 0;
    const total = Math.round(litresNum * rateNum);
    const paid = parseFloat(newSale.paidAmount) || 0;
    const balance = Math.max(0, total - paid);

    const record = {
      id: `SALE-${Date.now().toString().slice(-4)}`,
      customerId: newSale.customerId,
      date: newSale.date,
      month: newSale.date.slice(0, 7),
      milkType: newSale.milkType,
      litres: litresNum,
      rate: rateNum,
      totalAmount: total,
      paidAmount: paid,
      balanceDue: balance,
      notes:
        newSale.notes.trim() ||
        (paid < total ? `Paid ₹${paid}, balance ₹${balance}` : 'Full payment received')
    };

    setSalesList([record, ...salesList]);
    setShowAddSaleModal(false);
    setNewSale({
      customerId: customers[0]?.id || 'CUST-001',
      date: '2026-10-27',
      milkType: 'Buffalo (ભેંસનું દૂધ)',
      litres: '',
      rate: 85.0,
      paidAmount: '',
      notes: ''
    });
  };

  // Open Quick Pay Modal (for collecting second half / remaining balance)
  const openCollectPaymentModal = (sale) => {
    setPaymentModalSale(sale);
    setPaymentAmountInput(sale.balanceDue.toString());
  };

  // Submit Additional / Remaining Payment
  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!paymentModalSale) return;

    const payingNow = parseFloat(paymentAmountInput) || 0;
    if (payingNow <= 0) return;

    setSalesList((prev) =>
      prev.map((item) => {
        if (item.id === paymentModalSale.id) {
          const newPaid = item.paidAmount + payingNow;
          const newBalance = Math.max(0, item.totalAmount - newPaid);
          const updatedNote =
            newBalance === 0
              ? `${item.notes} | 2nd payment of ₹${payingNow} received (Full Paid)`
              : `${item.notes} | Received ₹${payingNow} (Remaining ₹${newBalance})`;

          return {
            ...item,
            paidAmount: newPaid,
            balanceDue: newBalance,
            notes: updatedNote
          };
        }
        return item;
      })
    );

    setPaymentModalSale(null);
    setPaymentAmountInput('');
  };

  // Delete Sale Entry
  const handleDelete = (id) => {
    if (window.confirm('Delete this milk sale record?')) {
      setSalesList((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Copy WhatsApp Summary
  const copyWhatsAppSummary = () => {
    if (!customerMonthlyBreakdown) return;
    const b = customerMonthlyBreakdown;
    const text = `🥛 *KALP DAIRY FARM - MONTHLY MILK BILL*\n` +
      `*Customer:* ${b.customer.name} (#${b.customer.id})\n` +
      `*Mobile:* ${b.customer.phone}\n` +
      `*Billing Month:* ${b.month}\n` +
      `---------------------------------------\n` +
      `*Total Milk Supplied:* ${b.totalMilk.toFixed(1)} L\n` +
      `*Total Month Bill:* ₹${b.totalBill.toLocaleString('en-IN')}\n` +
      `*Amount Paid:* ₹${b.totalPaid.toLocaleString('en-IN')}\n` +
      `*PENDING BALANCE DUE:* ₹${b.totalPending.toLocaleString('en-IN')}\n` +
      `---------------------------------------\n` +
      `Please clear the pending balance via GPay/PhonePe.\n` +
      `Thank you! - Kalp Dairy Farm`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    });
  };

  // Simple Excel Export with Live Formulas
  const exportSimpleExcel = () => {
    const wb = XLSX.utils.book_new();

    const headers = [
      'Customer ID',
      'Customer Name',
      'Date',
      'Milk Type',
      'Litres (L)',
      'Rate (₹/L)',
      'Total Bill (₹)',
      'Paid (₹)',
      'Balance Due (₹)',
      'Status',
      'Mobile',
      'Address'
    ];

    const rows = filteredSales.map((s, idx) => {
      const r = idx + 2;
      return [
        s.customerId,
        s.customerName,
        s.date,
        s.milkType,
        { t: 'n', v: s.litres, z: '#,##0.0' },
        { t: 'n', v: s.rate, z: '₹#,##0.00' },
        { t: 'n', f: `E${r}*F${r}`, v: s.totalAmount, z: '₹#,##0' },
        { t: 'n', v: s.paidAmount, z: '₹#,##0' },
        { t: 'n', f: `G${r}-H${r}`, v: s.balanceDue, z: '₹#,##0' },
        s.balanceDue === 0 ? 'Full Paid' : s.paidAmount > 0 ? 'Half / Partial' : 'Unpaid',
        s.phone,
        s.address
      ];
    });

    const totalRowIndex = filteredSales.length + 2;
    const summaryRow = [
      'TOTAL',
      '',
      '',
      '',
      { t: 'n', f: `SUM(E2:E${totalRowIndex - 1})`, v: metrics.totalMilk, z: '#,##0.0' },
      '',
      { t: 'n', f: `SUM(G2:G${totalRowIndex - 1})`, v: metrics.totalSales, z: '₹#,##0' },
      { t: 'n', f: `SUM(H2:H${totalRowIndex - 1})`, v: metrics.totalPaid, z: '₹#,##0' },
      { t: 'n', f: `SUM(I2:I${totalRowIndex - 1})`, v: metrics.totalBalance, z: '₹#,##0' },
      '',
      '',
      ''
    ];

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows, summaryRow]);
    ws['!cols'] = [
      { wch: 14 },
      { wch: 28 },
      { wch: 12 },
      { wch: 16 },
      { wch: 12 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 30 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Milk Sales Ledger');
    XLSX.writeFile(wb, `Milk_Sales_${selectedMonth}.xlsx`);
  };

  return (
    <div className="space-y-5">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & ACTION CONTROLS (SPACIOUS & UNCONGESTED)                  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        {/* Top Tier: Title & Month Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Raw Milk Sales &amp; Customer Ledger
              </h2>
              <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wide">
                દૂધ વેચાણ રજિસ્ટર
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Customer-wise raw milk sales, advance payments, and remaining dues
            </p>
          </div>

          {/* Month Selector Pill */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 px-3.5 py-2 rounded-2xl shadow-2xs self-start sm:self-auto">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-slate-800 text-xs font-bold focus:outline-none cursor-pointer pr-1"
            >
              {availableMonths.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom Tier: Customer Count & Primary Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-0.5">
          {/* Left: Registered Customers Indicator */}
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-blue-50 text-blue-800 border border-blue-200/80 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>{customers.length} Registered Customers</span>
            </span>
            <span className="text-slate-400 text-[11px] hidden md:inline">
              Click "Month Sheet" on any customer to view &amp; share their monthly bill
            </span>
          </div>

          {/* Right: Primary Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Excel Download */}
            <button
              onClick={exportSimpleExcel}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download simple Excel sheet with auto formulas"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Excel</span>
            </button>

            {/* Add Customer Button */}
            <button
              onClick={() => setShowAddCustomerModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Customer</span>
            </button>

            {/* Record Milk Sale Button */}
            <button
              onClick={() => setShowAddSaleModal(true)}
              className="bg-[#181A1E] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Record Milk Sale</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SIMPLE 4-CARD SUMMARY STRIP                                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Total Milk */}
        <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Total Milk Sold
            </span>
            <span className="p-1 rounded-lg bg-blue-50 text-blue-600">
              <Droplets className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {metrics.totalMilk.toLocaleString('en-IN', { minimumFractionDigits: 1 })} L
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Raw milk distributed</p>
        </div>

        {/* Total Sales Value */}
        <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Total Bill Amount
            </span>
            <span className="p-1 rounded-lg bg-slate-100 text-slate-800">
              <IndianRupee className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            ₹{metrics.totalSales.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Total value of milk</p>
        </div>

        {/* Amount Received / Paid */}
        <div className="bg-white rounded-[20px] p-4 border border-emerald-200/80 bg-emerald-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
              Amount Received (રોકડા મળ્યા)
            </span>
            <span className="p-1 rounded-lg bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">
            ₹{metrics.totalPaid.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">
            Payments received in hand
          </p>
        </div>

        {/* Balance Due (Outstanding) */}
        <div className="bg-white rounded-[20px] p-4 border border-amber-200/80 bg-amber-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">
              Remaining Due (ગ્રાહક પાસે બાકી)
            </span>
            <span className="p-1 rounded-lg bg-amber-100 text-amber-700">
              <Clock className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-amber-700 mt-1">
            ₹{metrics.totalBalance.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-amber-600 font-semibold mt-1">
            Customer balance to collect
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MINIMAL CLEAN TABLE (NO CONGESTION, WITH VIEW & MONTHLY SHEET BUTTONS)  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
        {/* Table Filter Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          {/* Status Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">Status:</span>
            {[
              { id: 'All', label: 'All Records' },
              { id: 'Partial', label: 'Half / Partial' },
              { id: 'Full', label: 'Full Paid' },
              { id: 'Unpaid', label: 'Unpaid' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setStatusFilter(btn.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  statusFilter === btn.id
                    ? 'bg-[#181A1E] text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Customer ID, name, mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 pl-8 pr-3 py-1.5 rounded-full text-xs text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none w-full sm:w-64"
            />
          </div>
        </div>

        {/* Table: Minimal, Clean, Uncongested (6 Spacious Columns with Generous Padding) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] uppercase font-black text-slate-400 border-b border-slate-100">
                <th className="py-3.5 px-4 sm:px-6">Customer</th>
                <th className="py-3.5 px-4 sm:px-6">Milk Supplied</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Total Bill</th>
                <th className="py-3.5 px-4 sm:px-6 text-right text-emerald-700">Paid Amount</th>
                <th className="py-3.5 px-4 sm:px-6 text-center text-amber-700">Payment Due</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                    No sales records found for this period. Click "+ Record Milk Sale" to add one.
                  </td>
                </tr>
              ) : (
                filteredSales.map((item) => {
                  const targetCustomer = customers.find((c) => c.id === item.customerId);

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* 1. Customer: ID + Name in one spacious cell */}
                      <td className="py-4.5 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200/80 shadow-2xs shrink-0">
                            #{item.customerId}
                          </span>
                          <span className="font-extrabold text-slate-900 text-xs sm:text-[13px]">
                            {item.customerName}
                          </span>
                        </div>
                      </td>

                      {/* 2. Milk Supplied: Litres + Breed Badge */}
                      <td className="py-4.5 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-xs sm:text-sm">
                            {item.litres.toFixed(1)} L
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              item.milkType.includes('Buffalo')
                                ? 'bg-orange-50 text-orange-800 border border-orange-200/60'
                                : 'bg-blue-50 text-blue-800 border border-blue-200/60'
                            }`}
                          >
                            {item.milkType.split(' ')[0]}
                          </span>
                        </div>
                      </td>

                      {/* 3. Total Bill */}
                      <td className="py-4.5 px-4 sm:px-6 text-right font-black text-slate-900 text-xs sm:text-sm whitespace-nowrap">
                        ₹{item.totalAmount.toLocaleString('en-IN')}
                      </td>

                      {/* 4. Paid Amount */}
                      <td className="py-4.5 px-4 sm:px-6 text-right font-bold text-emerald-700 whitespace-nowrap text-xs sm:text-sm">
                        ₹{item.paidAmount.toLocaleString('en-IN')}
                      </td>

                      {/* 5. Payment Due / Status (Consolidated Clean Pill) */}
                      <td className="py-4.5 px-4 sm:px-6 text-center whitespace-nowrap">
                        {item.balanceDue > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl shadow-2xs">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>₹{item.balanceDue.toLocaleString('en-IN')} Due</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl shadow-2xs">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Full Paid</span>
                          </span>
                        )}
                      </td>

                      {/* 6. Actions (Spacious, Right-Aligned) */}
                      <td className="py-4.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {/* Collect Remaining Button (only when balance due) */}
                          {item.balanceDue > 0 && (
                            <button
                              onClick={() => openCollectPaymentModal(item)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
                              title="Customer paying remaining balance"
                            >
                              <Wallet className="w-3.5 h-3.5" />
                              <span>Collect ₹{item.balanceDue}</span>
                            </button>
                          )}

                          {/* MONTHLY STATEMENT SHEET BUTTON */}
                          <button
                            onClick={() => {
                              if (targetCustomer) setMonthlySheetCustomer(targetCustomer);
                            }}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="View and print whole month date-wise milk sheet to share with customer"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            <span>Month Sheet</span>
                          </button>

                          {/* VIEW DETAILS BUTTON */}
                          <button
                            onClick={() => setViewDetailsSale(item)}
                            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="View all details of this sale"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: WHOLE MONTH DATE-WISE MILK STATEMENT (VIEW, PRINT & SHARE)       */}
      {/* ========================================================================= */}
      {monthlySheetCustomer && customerMonthlyBreakdown && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
            {/* Top Toolbar (Hidden on Print) */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-sm">Monthly Customer Milk Statement</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Copy for WhatsApp */}
                <button
                  onClick={copyWhatsAppSummary}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  title="Copy formatted text to send on WhatsApp"
                >
                  {copiedSuccess ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedSuccess ? 'Copied!' : 'Share WhatsApp'}</span>
                </button>

                {/* Print Sheet */}
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Sheet
                </button>

                <button
                  onClick={() => setMonthlySheetCustomer(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Statement Container */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto print:p-0">
              {/* Dairy Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-900 pb-4 gap-3">
                <div>
                  <h1 className="text-xl font-black text-slate-900">KALP DAIRY FARM</h1>
                  <p className="text-xs font-bold text-slate-600">કાલ્પ ડેરી ફાર્મ - શુદ્ધ કાચું દૂધ</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Bayad Road, Gujarat • Phone: +91 94000 00000</p>
                </div>
                <div className="text-right">
                  <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    MONTHLY MILK STATEMENT
                  </span>
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    Month: {customerMonthlyBreakdown.month}
                  </p>
                </div>
              </div>

              {/* Customer Info Card */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer Details</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono text-[10px] font-black text-blue-700 bg-blue-100/80 px-1.5 py-0.2 rounded">
                      #{customerMonthlyBreakdown.customer.id}
                    </span>
                    <span className="font-black text-slate-900">{customerMonthlyBreakdown.customer.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{customerMonthlyBreakdown.customer.type}</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="text-slate-600">📞 {customerMonthlyBreakdown.customer.phone}</p>
                  <p className="text-slate-500 text-[11px]">📍 {customerMonthlyBreakdown.customer.address}</p>
                </div>
              </div>

              {/* Date-wise Milk Selling Table */}
              <div className="overflow-x-auto max-h-[380px] overflow-y-auto border border-slate-200 rounded-xl print:max-h-none">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] sticky top-0 z-10 shadow-2xs">
                    <tr>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Milk Type</th>
                      <th className="p-2.5 text-right">Quantity (L)</th>
                      <th className="p-2.5 text-right">Rate (₹/L)</th>
                      <th className="p-2.5 text-right">Total Bill (₹)</th>
                      <th className="p-2.5 text-right text-emerald-700">Paid (₹)</th>
                      <th className="p-2.5 text-right text-amber-700">Pending (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customerMonthlyBreakdown.entries.map((entry) => (
                      <tr key={entry.srNo} className="hover:bg-slate-50 transition-colors">
                        <td className="p-2.5 font-semibold text-slate-800 whitespace-nowrap">
                          {entry.dayLabel || entry.date}
                        </td>
                        <td className="p-2.5 font-bold text-slate-900">{entry.milkType}</td>
                        <td className="p-2.5 text-right font-black text-slate-900">{entry.litres.toFixed(1)} L</td>
                        <td className="p-2.5 text-right text-slate-600">₹{entry.rate.toFixed(2)}</td>
                        <td className="p-2.5 text-right font-black text-slate-900">₹{entry.amount.toLocaleString('en-IN')}</td>
                        <td className="p-2.5 text-right font-bold text-emerald-700">₹{entry.paid.toLocaleString('en-IN')}</td>
                        <td className="p-2.5 text-right font-black text-amber-800">
                          {entry.balance > 0 ? `₹${entry.balance.toLocaleString('en-IN')}` : '₹0'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Consolidated Totals (Exactly as requested by user) */}
              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-300 space-y-2 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Milk Supplied</span>
                    <span className="text-base font-black text-slate-900 mt-0.5 block">
                      {customerMonthlyBreakdown.totalMilk.toFixed(1)} Litres
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Month Bill</span>
                    <span className="text-base font-black text-slate-900 mt-0.5 block">
                      ₹{customerMonthlyBreakdown.totalBill.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/30">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase block">Amount Paid (જમા)</span>
                    <span className="text-base font-black text-emerald-700 mt-0.5 block">
                      ₹{customerMonthlyBreakdown.totalPaid.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50">
                    <span className="text-[10px] text-amber-800 font-black uppercase block">Pending Balance (બાકી)</span>
                    <span className="text-base font-black text-amber-800 mt-0.5 block">
                      ₹{customerMonthlyBreakdown.totalPending.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="text-center pt-2 text-[11px] text-slate-500 font-medium">
                  {customerMonthlyBreakdown.totalPending > 0
                    ? `⚠️ Please settle the remaining balance of ₹${customerMonthlyBreakdown.totalPending.toLocaleString('en-IN')} with the dairy farm.`
                    : '✓ All payments for this month have been fully settled. Thank you!'}
                </div>
              </div>

              {/* Footer Signatures */}
              <div className="pt-6 border-t border-dashed border-slate-300 flex justify-between items-end text-xs text-slate-500">
                <div className="text-center">
                  <div className="w-32 border-b border-slate-400 mb-1"></div>
                  <span>Customer Signature</span>
                </div>
                <div className="text-center">
                  <div className="w-36 border-b border-slate-400 mb-1"></div>
                  <span className="font-bold text-slate-800">Kalp Dairy Farm</span>
                  <p className="text-[10px]">Authorized Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: VIEW COMPLETE DETAILS OF A MILK SALE                             */}
      {/* ========================================================================= */}
      {viewDetailsSale && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm">Milk Sale Details</h3>
              </div>
              <button
                onClick={() => setViewDetailsSale(null)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              {/* Customer Info Card */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded border border-blue-200">
                    #{viewDetailsSale.customerId}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.2 rounded">
                    {viewDetailsSale.customerType}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 mt-1">{viewDetailsSale.customerName}</h4>
                <p className="text-slate-600 flex items-center gap-1 mt-1">
                  <Phone className="w-3 h-3 text-slate-400" /> {viewDetailsSale.phone}
                </p>
                <p className="text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" /> {viewDetailsSale.address}
                </p>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold block">Delivery Date</span>
                  <span className="font-bold text-slate-800">{viewDetailsSale.date}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold block">Milk Type</span>
                  <span className="font-bold text-slate-800">{viewDetailsSale.milkType}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold block">Quantity Supplied</span>
                  <span className="font-black text-slate-900">{viewDetailsSale.litres.toFixed(1)} Litres</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold block">Rate per Litre</span>
                  <span className="font-black text-slate-900">₹{viewDetailsSale.rate.toFixed(2)} / L</span>
                </div>
              </div>

              {/* Financial Calculation */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Total Bill Amount:</span>
                  <span className="font-bold text-slate-900">₹{viewDetailsSale.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Amount Paid:</span>
                  <span>₹{viewDetailsSale.paidAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-300 flex justify-between font-black text-sm">
                  <span>Remaining Balance Due:</span>
                  <span className={viewDetailsSale.balanceDue > 0 ? 'text-amber-800' : 'text-emerald-700'}>
                    ₹{viewDetailsSale.balanceDue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {viewDetailsSale.notes && (
                <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-200/60 text-[11px] text-amber-900">
                  <span className="font-bold block">Notes:</span>
                  <p>{viewDetailsSale.notes}</p>
                </div>
              )}

              <button
                onClick={() => setViewDetailsSale(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD NEW CUSTOMER (AUTO GENERATED ID, NAME, ADDRESS, MOBILE)       */}
      {/* ========================================================================= */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-blue-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-200" />
                <h3 className="font-bold text-sm">Add New Customer</h3>
              </div>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="text-blue-100 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="p-5 space-y-4">
              {/* Auto Generated Customer ID Notice */}
              <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">
                    Customer ID (Auto-Generated)
                  </span>
                  <p className="font-mono text-base font-black text-blue-900 mt-0.5">
                    #{nextCustomerId}
                  </p>
                </div>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Automatic
                </span>
              </div>

              {/* Customer Name */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Customer / Shop Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Radhika Sweets or Mahendra Patel"
                  value={newCustomerForm.name}
                  onChange={(e) =>
                    setNewCustomerForm({ ...newCustomerForm, name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none"
                  required
                  autoFocus
                />
              </div>

              {/* Mobile Number & Customer Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 98250 12345"
                    value={newCustomerForm.phone}
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Customer Type
                  </label>
                  <select
                    value={newCustomerForm.type}
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, type: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Sweet Shop">Sweet Shop (મિઠાઈની દુકાન)</option>
                    <option value="Dairy Plant">Dairy Plant (ડેરી સંઘ)</option>
                    <option value="Hotel / Restaurant">Hotel / Restaurant</option>
                    <option value="Retail Customer">Retail Household (છૂટક)</option>
                  </select>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Customer Address / Delivery Location *
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Station Road, Near Jain Temple, Shop No. 4"
                  value={newCustomerForm.address}
                  onChange={(e) =>
                    setNewCustomerForm({ ...newCustomerForm, address: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Default Raw Milk Type & Agreed Rate */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Default Milk
                  </label>
                  <select
                    value={newCustomerForm.defaultMilk}
                    onChange={(e) => {
                      const t = e.target.value;
                      const r = t.includes('Buffalo') ? '85.0' : '60.0';
                      setNewCustomerForm({ ...newCustomerForm, defaultMilk: t, defaultRate: r });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Buffalo (ભેંસનું દૂધ)">Buffalo (ભેંસનું દૂધ)</option>
                    <option value="Cow (ગાયનું દૂધ)">Cow (ગાયનું દૂધ)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Agreed Rate (₹/L)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={newCustomerForm.defaultRate}
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, defaultRate: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-xs cursor-pointer"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: RECORD NEW MILK SALE                                             */}
      {/* ========================================================================= */}
      {showAddSaleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm">Record Raw Milk Sale</h3>
              </div>
              <button
                onClick={() => setShowAddSaleModal(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSale} className="p-5 space-y-4">
              {/* Select Customer */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Select Customer / Shop *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddSaleModal(false);
                      setShowAddCustomerModal(true);
                    }}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    + New Customer
                  </button>
                </div>
                <select
                  value={newSale.customerId}
                  onChange={(e) => {
                    const c = customers.find((item) => item.id === e.target.value);
                    setNewSale({
                      ...newSale,
                      customerId: e.target.value,
                      rate: c ? c.defaultRate : 85.0,
                      milkType: c ? c.defaultMilk : 'Buffalo (ભેંસનું દૂધ)'
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none"
                  required
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      #{c.id} - {c.name} ({c.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Milk Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newSale.date}
                    onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Raw Milk Type *
                  </label>
                  <select
                    value={newSale.milkType}
                    onChange={(e) => {
                      const type = e.target.value;
                      const defaultRate = type.includes('Buffalo') ? 85.0 : 60.0;
                      setNewSale({ ...newSale, milkType: type, rate: defaultRate });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Buffalo (ભેંસ)">🐃 Buffalo Milk (ભેંસનું દૂધ)</option>
                    <option value="Cow (ગાય)">🐄 Cow Milk (ગાયનું દૂધ)</option>
                  </select>
                </div>
              </div>

              {/* Litres & Rate */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Quantity (Litres) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g. 50"
                    value={newSale.litres}
                    onChange={(e) => setNewSale({ ...newSale, litres: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Rate per Litre (₹/L) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={newSale.rate}
                    onChange={(e) => setNewSale({ ...newSale, rate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Total Bill Amount
                  </span>
                  <p className="text-xl font-black text-slate-900 mt-0.5">
                    ₹{formTotal.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Balance Due
                  </span>
                  <p className="text-xl font-black text-amber-700 mt-0.5">
                    ₹{formBalance.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Payment Quick Preset Buttons (Full / Half / Unpaid) */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  How much is customer paying now?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickPaidAmount('half')}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 py-1.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Paid Half (50%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickPaidAmount('full')}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-1.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Paid Full (100%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickPaidAmount('zero')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 py-1.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    Unpaid (Pay Later)
                  </button>
                </div>
              </div>

              {/* Custom Paid Amount Input */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Amount Paid Now (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount paid"
                  value={newSale.paidAmount}
                  onChange={(e) => setNewSale({ ...newSale, paidAmount: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-emerald-700 focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Note (e.g. "Remaining ₹2,000 next Monday")
                </label>
                <input
                  type="text"
                  placeholder="Optional reminder"
                  value={newSale.notes}
                  onChange={(e) => setNewSale({ ...newSale, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold focus:outline-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSaleModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-xs cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: COLLECT REMAINING BALANCE                                        */}
      {/* ========================================================================= */}
      {paymentModalSale && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-200" />
                <h3 className="font-bold text-sm">Collect Remaining Balance</h3>
              </div>
              <button
                onClick={() => setPaymentModalSale(null)}
                className="text-emerald-100 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="p-5 space-y-4">
              <div>
                <span className="font-mono text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  #{paymentModalSale.customerId}
                </span>
                <h4 className="font-black text-sm text-slate-900 mt-1">
                  {paymentModalSale.customerName}
                </h4>
                <p className="text-[10px] text-slate-500">{paymentModalSale.phone}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total Bill Amount:</span>
                  <span className="font-bold text-slate-900">
                    ₹{paymentModalSale.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Already Paid (First Half):</span>
                  <span>₹{paymentModalSale.paidAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-1 border-t border-slate-200 flex justify-between font-black text-amber-800 text-sm">
                  <span>Remaining Due:</span>
                  <span>₹{paymentModalSale.balanceDue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Amount Paying Now (₹) *
                </label>
                <input
                  type="number"
                  value={paymentAmountInput}
                  onChange={(e) => setPaymentAmountInput(e.target.value)}
                  max={paymentModalSale.balanceDue}
                  className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-base font-black text-emerald-900 focus:outline-none"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Defaults to full remaining balance (₹{paymentModalSale.balanceDue})
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalSale(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs cursor-pointer"
                >
                  Receive Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
