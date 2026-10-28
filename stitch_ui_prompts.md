# Google Stitch UI Design Prompts: Kalp Buffalo Dairy Management Platform

This document contains copy-paste ready design prompts for **Google Stitch** to generate all subsequent screens of the **Kalp Buffalo Dairy OS**. 

Each prompt strictly adheres to the established visual design system and contains **only the functional fields** defined in [`dairy_management_system_blueprint.md`](./dairy_management_system_blueprint.md).

---

## Global Design System & Layout Guidelines (For All Screens)

When generating any screen, maintain these core visual rules:
- **Outer Canvas**: Cool muted slate-grey background (`#9DA9B7`).
- **Main Container**: Expansive, soft off-white surface (`#F3F5F7`, `border-radius: 32px`, subtle border `#FFFFFF`, soft shadow).
- **Navigation Layout**: **Left vertical collapsible sidebar** (`w-64` expanded, `w-20` collapsed) featuring:
  - Top: Gradient orange circular logo badge with letter "K" + "KALP OS" + toggle button (`PanelLeftClose`).
  - Vertical menu items: Dashboard, Daily Milk Collection, Shift Milking, Milk Sales & Pricing, Feed & OPEX, Breeding & Health.
  - Active item: Deep charcoal/black rounded pill (`#181A1E`) with crisp white text.
  - Bottom: Shed IoT pulse indicator + Farm Owner profile card.
- **Card Elements**: Pure white floating cards (`#FFFFFF`, `border-radius: 24px`, subtle border `#E8EBEF`, soft diffused box-shadows).
- **Color Accents**: Warm terracotta/amber-orange (`#FF5722`), soft cerulean blue (`#3B82F6`), emerald green (`#10B981`), and warning amber (`#F59E0B`).

---

## Screen 1: Herd Master & Buffalo Dossier (`Module 1: Animal Master`)

### Prompt for Stitch:
```markdown
Generate a new screen titled "Herd Master & Buffalo Dossier" adhering to the Surabhi Buffalo OS design system with a left vertical navigation sidebar and soft off-white main canvas.

Left Vertical Sidebar:
- Active navigation item: "Daily Milk Collection" highlighted with deep charcoal/black pill (#181A1E), white text, and badge [64].

Top Header Controls:
- Title: "Herd Master Profile & Roster"
- Search input pill: "Search Tag #, RFID, or Buffalo Name..."
- Breed dropdown selector: [All Breeds ⌄] (Murrah, Mehsani, Jaffarabadi, Banni, Nili-Ravi, Surti)
- Status filter pills: [All (64) - Active Black Pill] [Milking (42)] [Dry (14)] [Pregnant & Milking (6)] [Pregnant & Dry (2)] [Heifer (0)] [Sick / Under Treatment (2)]
- Primary Action Button: [+ Register Buffalo] (Terracotta Orange pill button #FF5722)

Main Layout - 2-Column Split:

Column 1: Main Animal Roster Table Card (Left 8 Cols):
- Table Header: Tag Number, Name/Alias, Breed, Parity, Days in Milk (DIM), Today's Yield, Quality (Fat/SNF), Status, Stall #, Actions.
- Row 1 (High Yielder):
  * Tag: #MUR-104 (Avatar circle) | Name: Kalyani | Breed: Murrah
  * Parity: 3rd Lactation | DIM: 62 Days
  * Yield: 16.2 L (AM: 8.8L / PM: 7.4L) | Fat: 7.8% | SNF: 9.2%
  * Status Pill: [Milking] (Soft green pill) | Stall: Bay A-04
- Row 2 (Mastitis / Sickness Alert):
  * Tag: #MEH-078 | Name: Shama | Breed: Mehsani
  * Parity: 2nd Lactation | DIM: 145 Days
  * Yield: 5.5 L (AM: 2.1L -31% drop) | Fat: 6.9% | SNF: 8.7%
  * Status Pill: [Under Treatment - Mastitis] (Amber alert pill) | Stall: Bay B-02
  * Inline Action: [View Treatment] button
- Row 3:
  * Tag: #BAN-112 | Name: Ganga | Breed: Banni
  * Parity: 4th Lactation | DIM: 90 Days
  * Yield: 15.8 L | Fat: 8.1% | SNF: 9.4%
  * Status Pill: [Milking] | Stall: Bay A-02
- Row 4 (Dry & Pregnant):
  * Tag: #JAF-045 | Name: Radha | Breed: Jaffarabadi
  * Parity: 5th Lactation | DIM: Dry (Resting)
  * Yield: 0.0 L | Purchase Cost: ₹1,25,000
  * Status Pill: [Pregnant & Dry - Calving Due 20 Nov] (Soft blue pill) | Stall: Bay C-01

Column 2: Selected Buffalo Deep-Dive Dossier Card (Right 4 Cols):
- Header: Buffalo #MUR-104 (Kalyani) - 5 Years 2 Months
- Key Metrics Ribbon:
  * Purchase Cost: ₹1,20,000 | DOB: 14 Aug 2021 | Acquisition: 10 Jan 2023
  * Lifetime Milk Yield: 3,420 Liters | Total Revenue Generated: ₹2,87,280
- Lactation Persistence Curve:
  * Clean line chart plotting Days in Milk (Day 1 to 305) vs Daily Yield (Liters), highlighting the Peak Yield window (Day 45–70).
- Lineage & Breeding:
  * Sire: Buland-A1 (High Genetic Merit) | Dam: Tag #MUR-012 (4,200 L record)
  * Last Calving Date: 26 Aug 2026 | Next Breeding Check: Heat observation active
- Health Summary:
  * All 4 teats certified healthy | Vaccinated: FMD Booster (12 Sep 2026)
```

---

## Screen 2: Shift Milking Operator Fast Logger (`Module 1 & 2: Shift Logging`)

### Prompt for Stitch:
```markdown
Generate a new screen titled "Shift Milking Operator Fast Logger" tailored for shed-floor speed and touchscreen operation, using the Surabhi Buffalo OS design system with left vertical collapsible sidebar.

Left Vertical Sidebar:
- Active navigation item: "Shift Milking" highlighted in deep charcoal/black pill (#181A1E) with badge [AM].

Top Session Header & Context Bar:
- Shift Selector Toggle: [Morning AM (Active Black Pill)] [Evening PM]
- Date Selector: [27 Oct 2026 ⌄]
- Milker on Duty: "Ramesh Kumar (Head Milker - Shed Bay A)"
- Milking Method Filter: [All] [Machine Milking] [Manual Strip]

Top KPI Ribbon (3 Floating Cards):
1. Card 1: Shift Yield Completed: "248.5 Liters" (42 / 42 Buffaloes logged)
2. Card 2: Weighted Shift Quality: "Fat: 7.45% | SNF: 9.18% | CLR: 29.5"
3. Card 3: Shed Reconciliation Variance: "Individual Sum: 248.5 L vs Bulk Tank Sensor: 247.2 L" -> Variance: -1.3 L (-0.52% Line Shrinkage) [Status: Reconciled - Green Badge]

Main Rapid Data Entry Sheet Card:
- High-contrast, large-touch input table containing only blueprint fields:
  * Columns: Tag Number, Milking Method, Yield (Liters, 0.1 precision), Fat %, SNF %, Corrected Lactometer Reading (CLR), Conductivity / Mastitis Indicator, Action.
- High-Priority Alert Highlight Row:
  * Row for Buffalo #078 highlighted with soft amber background:
    "⚠️ MASTITIS / YIELD DROP ALERT: AM yield dropped by 31% (2.1 L vs 7.2 L 7-day average). Electrical Conductivity spike: 6.9 mS/cm. Milk withheld from bulk cooler."
    Button: [Open CMT Strip Test Protocol]
- Normal Entry Rows:
  * #MUR-104 | Machine | 8.8 L | Fat 7.8% | SNF 9.2% | CLR 29.6 | 4.3 mS/cm (Normal) | [Saved]
  * #BAN-112 | Machine | 8.2 L | Fat 8.1% | SNF 9.4% | CLR 30.1 | 4.7 mS/cm (Normal) | [Saved]
  * #JAF-055 | Manual  | 7.4 L | Fat 7.6% | SNF 9.0% | CLR 29.2 | 4.2 mS/cm (Normal) | [Saved]
  * #MUR-089 | Machine | 6.9 L | Fat 7.9% | SNF 8.9% | CLR 29.4 | 4.0 mS/cm (Normal) | [Saved]

Bottom Session Controls:
- Left: "Logged 42 animals in 1h 14m"
- Right: Secondary button [Clear Entries], Primary button [Finalize & Lock Shift Data →]
```

---

## Screen 3: Milk Sales & Dynamic Quality Pricing (`Module 2: Sales Ledger`)

### Prompt for Stitch:
```markdown
Generate a new screen titled "Milk Sales & Dynamic Quality Pricing Engine" following the Surabhi Buffalo OS design system with left vertical collapsible sidebar.

Left Vertical Sidebar:
- Active navigation item: "Milk Sales & Pricing" highlighted in deep charcoal/black pill (#181A1E).

Top Section - Interactive Two-Axis Quality Pricing Simulator Card:
- Header: "Two-Axis Quality Pricing Engine"
- Mathematical Formula Display Pill:
  "Price per Liter = (Fat % × Rate_fat) + (SNF % × Rate_snf)"
- Interactive Sliders & Number Boxes:
  * Tested Fat %: [7.5 %] (Range: 6.0% - 9.5%)
  * Tested SNF %: [9.0 %] (Range: 8.0% - 10.5%)
  * Rate Fat Coefficient: [₹700 / kg-fat]
  * Rate SNF Coefficient: [₹350 / kg-snf]
- Real-Time Live Price Output Hero Card:
  * Hero Price: "₹84.00" per Liter
  * Sub-breakdown: Fat component: ₹52.50 (62.5%) + SNF component: ₹31.50 (37.5%)
  * Formula sample: (0.075 × 700) + (0.090 × 350) = ₹84.00/L

Bottom Section - 2-Column Split:

Column 1: Daily Milk Allocation & Utilization Ledger (Left 5 Cols):
- Total Production Today: 485.5 Liters (100%)
- Categorized Stream Cards with percentage bars:
  1. Commercial Sales Dispatch: 420.0 L (86.5%) - Blue bar
  2. Calf Whole Milk Feeding: 35.0 L (7.2%) - Orange bar
  3. Farm & Household Consumption: 15.0 L (3.1%) - Slate bar
  4. Value-Added Processing (Ghee / Paneer / Curd): 12.0 L (2.5%) - Amber bar
  5. Mastitis / Antibiotic Discard: 3.5 L (0.7%) - Red bar

Column 2: Commercial Sales & Dispatch Records Table (Right 7 Cols):
- Filter pills: [All Dispatches] [Dairy Cooperative] [Direct Retail D2C] [Bulk Private Dairy]
- Primary Action: [+ Log Sales Dispatch]
- Table Columns: Dispatch Date & Shift, Buyer / Cooperative Name, Slip Reference #, Volume (L), Avg Fat & SNF, Rate / Liter, Total Invoice Amount, Payment Status.
- Records:
  * Row 1: 27 Oct AM | Mother Dairy Chilling Hub | Slip #MD-882 | 245.0 L | Fat: 7.4% / SNF: 9.1% | Rate: ₹84.10/L | Total: ₹20,619.00 | Status: [Verified - Pending 10d Payout]
  * Row 2: 27 Oct AM | City D2C Fresh Glass Bottles | Slip #D2C-104 | 45.0 L | Flat Retail Rate | Rate: ₹90.00/L | Total: ₹4,050.00 | Status: [Paid Cash]
  * Row 3: 26 Oct PM | Amul Collection Center | Slip #AML-509 | 230.0 L | Fat: 7.5% / SNF: 9.2% | Rate: ₹84.85/L | Total: ₹19,515.50 | Status: [Settled Direct Bank]
```

---

## Screen 4: Operational Expenses & Feed Inventory (`Module 3: OPEX & Inventory`)

### Prompt for Stitch:
```markdown
Generate a new screen titled "Operational Expenses & Feed Inventory (OPEX)" following the Surabhi Buffalo OS design system with left vertical collapsible sidebar.

Left Vertical Sidebar:
- Active navigation item: "Feed & OPEX" highlighted in deep charcoal/black pill (#181A1E) with badge [Alert].

Top Executive Financial Health KPIs (4 Cards):
1. Today's Total OPEX: "₹2,840.00" (Feed 69%, Labor 15%, Utilities 9%, Meds 7%)
2. Cost of Production per Liter: "₹66.57 / L" (Benchmark: Must remain below ₹76.50 realized price)
3. Net Profit Margin per Liter: "+₹9.93 / L" (Healthy profit margin)
4. Income Over Feed Cost (IOFC): "₹18,450.00" (Evaluating daily nutrition profitability)

Main Section - 2-Column Split:

Column 1: Feed Stock Levels & Buffer Monitor (Left 6 Cols):
- Header: "Feed & Nutrition Inventory Runway" with [+ Restock Purchase] button
- Inventory Items (with visual depletion meters and buffer days remaining):
  * Item 1: Green Fodder (Hybrid Napier / Maize):
    - Stock: 1,450 kg | Daily Herd Burn: 250 kg/day | Buffer Remaining: 5.8 Days
    - Status Badge: [Healthy Buffer - Green pill]
  * Item 2: Dry Wheat Straw (Bhusa / Dry Fodder):
    - Stock: 820 kg | Daily Herd Burn: 200 kg/day | Buffer Remaining: 4.1 Days
    - Status Badge: [Low Warning - Blue pill]
  * Item 3: Concentrates (Mustard Cake / Cottonseed Khal):
    - Stock: 340 kg | Daily Herd Burn: 140 kg/day | Buffer Remaining: 2.4 Days
    - Status Badge: [CRITICAL BUFFER ALERT - Red pill] -> Reorder buffer is 5 days
    - Action: [Quick Reorder Khal] button
  * Item 4: Chelated Mineral Mixture & Calcium Gel:
    - Stock: 45 kg | Daily Herd Burn: 4.0 kg/day | Buffer Remaining: 11.2 Days
    - Status Badge: [Safe - Purple pill]
- Unit Economics Footer:
  * Ration Cost: ₹142.50 / buffalo-day | Feed Conversion Ratio (FCR): 1.18 kg DMI / L milk

Column 2: Categorized Operating Expense (OPEX) Ledger (Right 6 Cols):
- Header: "Operating Expenses Ledger" with [+ Add Expense] button
- Filter pills: [All Expenses] [Feed & Nutrition] [Veterinary] [Breeding] [Labor] [Utilities & Fuel] [Depreciation]
- Expense Records Table:
  * Date, Category Badge, Sub-Category & Item, Amount (₹), Vendor / Payee, Payment Mode.
- Sample Rows:
  * 27 Oct | Feed & Nutrition | 10 Bags Mustard Khal | ₹12,500 | Kisan Agro | UPI [Paid]
  * 26 Oct | Veterinary | FMD Vaccine Booster Doses | ₹1,400 | Dr. Sharma Vet | Cash [Paid]
  * 25 Oct | Utilities | Shed Tube-well Electricity Bill | ₹3,200 | State Discom | NetBanking [Paid]
  * 24 Oct | Labor | Shed Staff Weekly Advance | ₹4,500 | Ramesh Kumar | Cash [Paid]
  * 20 Oct | Breeding | 10 Semen Straws (Murrah RM-72) | ₹3,500 | NDDB Bull Station | Bank [Paid]
```

---

## Screen 5: Veterinary Health & Breeding Calendar (`Module 1 & 3: Health`)

### Prompt for Stitch:
```markdown
Generate a new screen titled "Breeding & Veterinary Health Protocols" adhering to the Surabhi Buffalo OS design system with left vertical collapsible sidebar.

Left Vertical Sidebar:
- Active navigation item: "Breeding & Health" highlighted in deep charcoal/black pill (#181A1E) with badge [3].

Top Actionable Smart Alerts Banner (Contains strictly blueprint anomaly triggers):
1. 🔴 Sickness / Mastitis Drop Flag:
   "Buffalo #078 AM milk dropped by 31% (2.1 L vs 7.2 L avg). Intramammary antibiotic administered. 72hr milk withholding active until 30 Oct."
2. 🔵 Reproductive Pregnancy Diagnosis (PD) Due:
   "Buffalo #119 completed 60 days post-AI. Ultrasound pregnancy confirmation scheduled for today."
3. 🟢 Preventive Vaccination Reminder:
   "14 Replacement Heifers due for Foot & Mouth Disease (FMD) booster dose on 30 October 2026."

Main Section - 2-Column Split:

Column 1: Reproductive & Breeding Lifecycle Funnel (Left 6 Cols):
- Header: "Herd Reproductive Funnel" with [+ Log AI / Heat Event] button
- Status Funnel Cards:
  * In Estrus / Heat Detected: 2 Buffaloes (#042 Murrah detected at 02:45 AM, Prime AI window next 8h)
  * Inseminated (0–60 Days Observation): 8 Buffaloes (Awaiting 60-day PD confirmation)
  * Confirmed Pregnant: 18 Buffaloes (Healthy gestation)
  * Calving Countdown (< 30 Days): 3 Buffaloes (Buffalo #093 calving in 3 days, moved to Maternity Bay 2)
- Recent Artificial Insemination (AI) Log Table:
  * Buffalo Tag, AI Date, Bull ID / Pedigree Straw, Inseminator Technician, 60-Day PD Due Date, Status.
  * #042 | 27 Oct 2026 | Murrah Buland-A1 | Dr. Sharma | Due 26 Dec 2026 | [Scheduled Today]
  * #119 | 28 Aug 2026 | Elite Murrah RM-72 | Dr. Sharma | Due Today (27 Oct) | [Pending Check]

Column 2: Herd Veterinary & Vaccination Schedule (Right 6 Cols):
- Header: "Mandatory Preventive Healthcare Schedule" with [+ Log Medical Event] button
- Scheduled Healthcare Events List:
  * 30 Oct 2026 | FMD (Foot & Mouth Disease) Booster | 14 Heifers | Status: [Upcoming - In 3 Days]
  * 10 Nov 2026 | Scheduled Deworming Cycle | Entire Herd (64 Buffaloes) | Status: [Scheduled]
  * 15 Sep 2026 | Black Quarter (BQ) & Hemorrhagic Septicemia (HS) Vaccination | Completed | Compliance: 98%
- Medical Treatment & Withholding Ledger:
  * Animal Tag, Treatment Given, Administered By, Cost (₹), Milk Withholding End Date.
  * #078 (Mehsani) | Mastitis Cloxacillin Infusion | Dr. Sharma | ₹850 | Withholding: Active (30 Oct 08:00 AM)
```

---

## How to Use These Prompts in Stitch:

1. Open your Google Stitch canvas project:  
   `https://stitch.withgoogle.com/projects/5623213813278537305`
2. In the bottom input bar (**`What would you like to change or create?`**), copy and paste any of the prompts above.
3. Stitch will generate that exact screen on your canvas next to the main Dashboard, maintaining the visual theme, collapsible sidebar, and blueprint data fields.

