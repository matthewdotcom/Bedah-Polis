import React, { Component, useMemo, useState } from 'react';

// ============================================================================
// KOMPONEN IKON SVG INLINE (RINGAN & BEBAS DEPENDENSI EKSTERNAL)
// ============================================================================

function AppleGeometricMark({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M15.4 3.2C14.3 3.3 13 4 12.3 4.9C11.7 5.6 11.2 6.8 11.4 8C12.6 8.1 13.9 7.4 14.6 6.5C15.2 5.7 15.6 4.5 15.4 3.2Z" />
      <path d="M19.2 12.6C19.2 10.2 21.1 9 21.2 8.9C20.1 7.3 18.4 7.1 17.8 7C16.4 6.9 15 7.9 14.3 7.9C13.6 7.9 12.5 7 11.3 7C9.8 7 8.4 7.9 7.6 9.3C6 12.1 7.2 16.2 8.7 18.4C9.5 19.5 10.4 20.7 11.6 20.7C12.7 20.6 13.2 20 14.5 20C15.8 20 16.2 20.7 17.4 20.7C18.6 20.7 19.4 19.6 20.1 18.5C21 17.2 21.3 16 21.4 15.9C21.3 15.8 19.2 15 19.2 12.6Z" />
    </svg>
  );
}

function IconSearch({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16L20.5 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconHeartGlow({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 20.4L10.65 19.17C5.85 14.82 2.7 11.96 2.7 8.45C2.7 5.59 4.94 3.35 7.8 3.35C9.41 3.35 10.96 4.1 12 5.29C13.04 4.1 14.59 3.35 16.2 3.35C19.06 3.35 21.3 5.59 21.3 8.45C21.3 11.96 18.15 14.82 13.35 19.18L12 20.4Z" />
    </svg>
  );
}

function IconShield({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.8L19.2 6.2V12.1C19.2 16.7 16.1 20.3 12 21.5C7.9 20.3 4.8 16.7 4.8 12.1V6.2L12 2.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 12.2L11 14.4L15.4 9.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconActivity({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 12H7L10 4L14 20L17 12H21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 11V7.5C8 5.29086 9.79086 3.5 12 3.5C14.2091 3.5 16 5.29086 16 7.5V11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCheckCircle({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 12.2L10.8 14.5L15.5 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClose({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ============================================================================
// ERROR BOUNDARY PELINDUNG PRATINJAU
// ============================================================================

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Terjadi gangguan tampilan.' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex items-center justify-center p-6">
          <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
            <h2 className="text-lg font-bold">Memuat Ulang Halaman</h2>
            <p className="mt-2 text-xs text-[#6E6E73]">{this.state.message}</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, message: '' })}
              className="mt-5 rounded-full bg-[#0071E3] px-5 py-2 text-xs font-medium text-white"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// DATA NAVIGASI & MEGA-MENU FLYOUT APPLE INDONESIA
// ============================================================================

const NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda', href: '#hero-duo', hasFlyout: false },
  { id: 'skor', label: 'Skor Ketahanan', href: '#diagnostik', hasFlyout: true },
  { id: 'inflasi', label: 'Inflasi Medis', href: '#hero-inflasi', hasFlyout: true },
  { id: 'pilar', label: '3 Pilar', href: '#hero-pro', hasFlyout: true },
  { id: 'darurat', label: 'Dana Darurat', href: '#promo-grid', hasFlyout: false },
  { id: 'kalkulator', label: 'Kalkulator', href: '#kalkulator', hasFlyout: true },
  { id: 'konsultasi', label: 'Konsultasi', href: '#lead-gate', hasFlyout: false },
];

const MEGA_MENUS = {
  pilar: {
    leftHeader: 'Jelajahi 3 Pilar Proteksi',
    leftPrimary: [
      { label: 'Jelajahi Semua Audit Proteksi', href: '#hero-pro' },
      { label: 'Pilar Kesehatan', href: '#promo-grid' },
      { label: 'Pilar Penyakit Kritis', href: '#promo-grid' },
      { label: 'Pilar Proteksi Jiwa', href: '#promo-grid' },
      { label: 'Proyeksi Inflasi Medis 13%', href: '#hero-inflasi' },
    ],
    leftSecondary: [
      { label: 'Bandingkan Kebutuhan Ideal', href: '#lead-gate' },
      { label: 'Mengapa Audit 3 Pilar', href: '#diagnostik' },
    ],
    rightHeader: 'Lainnya dari WealthResilience',
    rightLinks: [
      { label: 'Kalkulator Arus Kas', href: '#kalkulator' },
      { label: 'Simulasi Dana Darurat', href: '#kalkulator' },
      { label: 'Benchmark Uang Pertanggungan', href: '#lead-gate' },
      { label: 'Konsultasi Tanpa Komitmen', href: '#lead-gate' },
    ],
  },
  skor: {
    leftHeader: 'Jelajahi Skor Ketahanan',
    leftPrimary: [
      { label: 'Skor Ketahanan Finansial (0–100)', href: '#diagnostik' },
      { label: 'Rasio Dana Darurat 6–12 Bulan', href: '#diagnostik' },
      { label: 'Analisis Surplus & Beban Cicilan', href: '#kalkulator' },
      { label: 'Peta Jalan Penguatan Keluarga', href: '#lead-gate' },
    ],
    leftSecondary: [
      { label: 'Metodologi Perhitungan Skor', href: '#diagnostik' },
      { label: 'Standar Ketahanan Optimal', href: '#diagnostik' },
    ],
    rightHeader: 'Indikator Utama',
    rightLinks: [
      { label: 'Likuiditas Darurat', href: '#promo-grid' },
      { label: 'Proteksi Rawat Inap', href: '#promo-grid' },
      { label: 'Buffer Sakit Kritis 36 Bln', href: '#promo-grid' },
    ],
  },
  inflasi: {
    leftHeader: 'Jelajahi Inflasi Medis 13%',
    leftPrimary: [
      { label: 'Proyeksi Inflasi Medis 13%/Tahun', href: '#hero-inflasi' },
      { label: 'Simulasi Biaya Medis +20 Tahun', href: '#diagnostik' },
      { label: 'Proteksi Sesuai Tagihan (On-Bill)', href: '#promo-grid' },
      { label: 'Cegah Risiko Nombok Plafon', href: '#lead-gate' },
    ],
    leftSecondary: [
      { label: 'Basis Biaya Tindakan Rp 150 Jt', href: '#hero-inflasi' },
      { label: 'Dampak Pada Tabungan Keluarga', href: '#diagnostik' },
    ],
    rightHeader: 'Alat Simulasi',
    rightLinks: [
      { label: 'Ubah Usia & Limit Medis', href: '#kalkulator' },
      { label: 'Audit Pilar Kesehatan', href: '#promo-grid' },
    ],
  },
  kalkulator: {
    leftHeader: 'Konfigurator Finansial',
    leftPrimary: [
      { label: 'Konfigurator Arus Kas Bulanan', href: '#kalkulator' },
      { label: 'Audit 3 Pilar Proteksi Saat Ini', href: '#kalkulator' },
      { label: 'Simulasi Keluarga Muda & Anak', href: '#kalkulator' },
      { label: 'Buka Laporan Rincian Celah', href: '#lead-gate' },
    ],
    leftSecondary: [
      { label: 'Reset ke Profil Standar', href: '#kalkulator' },
      { label: 'Privasi Data 100% Terjaga', href: '#lead-gate' },
    ],
    rightHeader: 'Pintasan Cepat',
    rightLinks: [
      { label: 'Lihat Skor Real-Time', href: '#diagnostik' },
      { label: 'Grafik Inflasi 13%', href: '#diagnostik' },
      { label: 'Peta Celah 3 Pilar', href: '#lead-gate' },
    ],
  },
};

// ============================================================================
// KONSTANTA & ENGINE KALKULASI FINANSIAL REAL-TIME
// ============================================================================

const MEDICAL_INFLATION_RATE = 0.13;
const BASE_HOSPITAL_COST_TODAY = 150_000_000;

const INITIAL_FORM = {
  clientName: '',
  clientContact: '',
  age: 29,
  maritalStatus: 'married_with_kids',
  monthlyIncome: 18_000_000,
  monthlyExpense: 10_000_000,
  monthlyDebt: 3_000_000,
  emergencyFund: 45_000_000,
  medicalAnnualLimit: 300_000_000,
  criticalIllnessCover: 0,
  lifeInsuranceCover: 250_000_000,
  totalOutstandingDebt: 400_000_000,
};

function formatIDR(val) {
  const safe = Math.round(Number.isFinite(val) ? val : 0);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(safe);
}

function formatCompactIDR(val) {
  const safe = Math.max(0, Number.isFinite(val) ? val : 0);
  if (safe >= 1_000_000_000) {
    return `Rp ${(safe / 1_000_000_000).toFixed(2).replace('.', ',')} M`;
  }
  if (safe >= 1_000_000) {
    return `Rp ${Math.round(safe / 1_000_000)} Jt`;
  }
  return formatIDR(safe);
}

function calculateResilienceAudit(input) {
  const age = Math.max(18, Math.min(75, Number(input.age) || 29));
  const maritalStatus = input.maritalStatus || 'married_with_kids';
  const monthlyIncome = Math.max(0, Number(input.monthlyIncome) || 0);
  const monthlyExpense = Math.max(0, Number(input.monthlyExpense) || 0);
  const monthlyDebt = Math.max(0, Number(input.monthlyDebt) || 0);
  const emergencyFund = Math.max(0, Number(input.emergencyFund) || 0);
  const medicalAnnualLimit = Math.max(0, Number(input.medicalAnnualLimit) || 0);
  const criticalIllnessCover = Math.max(0, Number(input.criticalIllnessCover) || 0);
  const lifeInsuranceCover = Math.max(0, Number(input.lifeInsuranceCover) || 0);
  const totalOutstandingDebt = Math.max(0, Number(input.totalOutstandingDebt) || 0);

  const safeIncome = Math.max(monthlyIncome, 1);
  const safeExpense = Math.max(monthlyExpense, 1);

  // 1. Rasio Arus Kas & Tabungan
  const monthlySurplus = Math.max(0, monthlyIncome - monthlyExpense - monthlyDebt);
  const savingRatioPercent = Number(((monthlySurplus / safeIncome) * 100).toFixed(1));
  const debtServiceRatioPercent = Number(((monthlyDebt / safeIncome) * 100).toFixed(1));

  // 2. Kecukupan Dana Darurat (6 / 9 / 12 Bulan)
  const idealEmergencyMonths =
    maritalStatus === 'single' ? 6 : maritalStatus === 'married' ? 9 : 12;
  const idealEmergencyFund = safeExpense * idealEmergencyMonths;
  const emergencyMonths = Number((emergencyFund / safeExpense).toFixed(1));
  const emergencyShortfall = Math.max(0, idealEmergencyFund - emergencyFund);
  const emergencyAdequacyPercent = Math.min(
    100,
    Math.round((emergencyFund / Math.max(idealEmergencyFund, 1)) * 100)
  );

  // 3. Proyeksi Inflasi Biaya Medis 13%/Tahun (Hari Ini, +5, +10, +15, +20 Thn)
  const baseYear = 2026;
  const horizonPoints = [
    { yr: 0, label: 'Hari Ini' },
    { yr: 5, label: '+5 Thn' },
    { yr: 10, label: '+10 Thn' },
    { yr: 15, label: '+15 Thn' },
    { yr: 20, label: '+20 Thn' },
  ];

  const medicalTimeline = horizonPoints.map(({ yr, label }) => ({
    yr,
    label,
    calendarYear: baseYear + yr,
    age: age + yr,
    estimatedCost: Math.round(
      BASE_HOSPITAL_COST_TODAY * Math.pow(1 + MEDICAL_INFLATION_RATE, yr)
    ),
  }));

  // 4. Audit 3 Pilar Proteksi
  // Pilar 1: Kesehatan (Ideal Rp 1.000.000.000)
  const idealMedicalLimit = 1_000_000_000;
  const medicalGap = Math.max(0, idealMedicalLimit - medicalAnnualLimit);
  const pillar1 = {
    id: 'kesehatan',
    pillar: 'Kesehatan',
    subtitle: 'Hospital & Medical Bill Protection',
    status:
      medicalAnnualLimit >= idealMedicalLimit
        ? 'Terlindungi'
        : medicalAnnualLimit > 0
        ? 'Perlu Upgrade'
        : 'Belum Terproteksi',
    idealAmount: idealMedicalLimit,
    currentAmount: medicalAnnualLimit,
    gapAmount: medicalGap,
    coveragePercent: Math.min(100, Math.round((medicalAnnualLimit / idealMedicalLimit) * 100)),
    note:
      medicalAnnualLimit >= idealMedicalLimit
        ? 'Limit tahunan memadai untuk meredam inflasi biaya rumah sakit 13%/tahun.'
        : 'Tabungan investasi berisiko tergerus jika terjadi rawat inap mayor atau tindakan spesialis.',
  };

  // Pilar 2: Penyakit Kritis (Ideal 36x monthlyIncome = 3 tahun income replacement)
  const idealCriticalIllness = safeIncome * 36;
  const criticalGap = Math.max(0, idealCriticalIllness - criticalIllnessCover);
  const pillar2 = {
    id: 'kritis',
    pillar: 'Penyakit Kritis',
    subtitle: '36-Month Income Replacement Buffer',
    status:
      criticalIllnessCover >= idealCriticalIllness
        ? 'Terlindungi'
        : criticalIllnessCover > 0
        ? 'Perlu Upgrade'
        : 'Belum Terproteksi',
    idealAmount: idealCriticalIllness,
    currentAmount: criticalIllnessCover,
    gapAmount: criticalGap,
    coveragePercent: Math.min(
      100,
      Math.round((criticalIllnessCover / Math.max(idealCriticalIllness, 1)) * 100)
    ),
    note:
      criticalIllnessCover >= idealCriticalIllness
        ? 'Dana pengganti penghasilan selama 36 bulan masa pemulihan telah terlindungi.'
        : 'Risiko terhentinya arus kas keluarga saat pencari nafkah fokus menjalani pemulihan.',
  };

  // Pilar 3: Jiwa (Ideal 60x monthlyExpense + totalOutstandingDebt)
  const dependencyMonths = maritalStatus !== 'single' ? 60 : 24;
  const idealLifeCover = safeExpense * dependencyMonths + totalOutstandingDebt;
  const lifeGap = Math.max(0, idealLifeCover - lifeInsuranceCover);
  const pillar3 = {
    id: 'jiwa',
    pillar: 'Jiwa',
    subtitle: '5-Year Family Living & Debt Settlement',
    status:
      lifeInsuranceCover >= idealLifeCover
        ? 'Terlindungi'
        : lifeInsuranceCover > 0
        ? 'Perlu Upgrade'
        : 'Belum Terproteksi',
    idealAmount: idealLifeCover,
    currentAmount: lifeInsuranceCover,
    gapAmount: lifeGap,
    coveragePercent: Math.min(
      100,
      Math.round((lifeInsuranceCover / Math.max(idealLifeCover, 1)) * 100)
    ),
    note:
      lifeInsuranceCover >= idealLifeCover
        ? 'Biaya hidup tanggungan 5 tahun dan pelunasan sisa KPR telah ter-cover penuh.'
        : 'Terdapat celah likuiditas bagi keluarga untuk melunasi sisa utang dan kebutuhan hidup.',
  };

  const pillars = [pillar1, pillar2, pillar3];

  // 5. Skor Ketahanan Finansial (0 - 100)
  const emergencyScore = Math.min(30, (emergencyMonths / idealEmergencyMonths) * 30);
  const savingScore = Math.min(25, (savingRatioPercent / 20) * 25);
  const debtScore =
    debtServiceRatioPercent <= 30
      ? 20
      : Math.max(0, 20 - (debtServiceRatioPercent - 30) * 0.8);

  const p1Ratio = Math.min(1, medicalAnnualLimit / idealMedicalLimit);
  const p2Ratio = Math.min(1, criticalIllnessCover / Math.max(idealCriticalIllness, 1));
  const p3Ratio = Math.min(1, lifeInsuranceCover / Math.max(idealLifeCover, 1));
  const protectionScore = Number((((p1Ratio + p2Ratio + p3Ratio) / 3) * 25).toFixed(1));

  const resilienceScore = Math.min(
    100,
    Math.max(0, Math.round(emergencyScore + savingScore + debtScore + protectionScore))
  );

  const resilienceCategory =
    resilienceScore >= 80
      ? 'Optimal'
      : resilienceScore >= 60
      ? 'Stabil'
      : resilienceScore >= 40
      ? 'Rentan'
      : 'Kritis';

  // 6. Langkah Prioritas Konsultatif
  const recommendations = [];
  if (emergencyShortfall > 0) {
    recommendations.push(
      `Lengkapi Dana Darurat sebesar ${formatIDR(emergencyShortfall)} agar mencapai batas aman ${idealEmergencyMonths} bulan pengeluaran (${formatIDR(idealEmergencyFund)}).`
    );
  }
  if (debtServiceRatioPercent > 30) {
    recommendations.push(
      `Rasio cicilan bulanan berada di ${debtServiceRatioPercent}% (batas sehat ≤ 30%). Prioritaskan pelunasan kewajiban berbunga tinggi.`
    );
  }
  if (pillar1.status !== 'Terlindungi') {
    recommendations.push(
      `Pilar Kesehatan: Gunakan proteksi rawat inap sesuai tagihan (on-bill) dengan limit minimal ${formatIDR(idealMedicalLimit)} untuk meredam inflasi medis 13%/tahun.`
    );
  }
  if (pillar2.status !== 'Terlindungi') {
    recommendations.push(
      `Pilar Penyakit Kritis: Siapkan dana tunai pengganti penghasilan minimal ${formatIDR(idealCriticalIllness)} (36 bulan income) agar arus kas tetap berjalan.`
    );
  }
  if (pillar3.status !== 'Terlindungi') {
    recommendations.push(
      `Pilar Jiwa: Lengkapi uang pertanggungan sebesar ${formatIDR(idealLifeCover)} (5 tahun biaya hidup + pelunasan sisa KPR) demi ketenangan keluarga.`
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      'Pondasi ketahanan finansial dan 3 pilar proteksi keluarga berada pada level Optimal. Fokuskan surplus bulanan untuk akselerasi portofolio aset.'
    );
  }

  return {
    resilienceScore,
    resilienceCategory,
    ratios: {
      savingRatioPercent,
      debtServiceRatioPercent,
      emergencyMonths,
      idealEmergencyMonths,
      emergencyAdequacyPercent,
    },
    emergencyFundAnalysis: {
      current: emergencyFund,
      ideal: idealEmergencyFund,
      shortfall: emergencyShortfall,
    },
    medicalTimeline,
    pillars,
    recommendations,
  };
}

// ============================================================================
// KOMPONEN UTAMA APLIKASI (APPLE.COM INDONESIA ARCHITECTURE)
// ============================================================================

function WealthResilienceAppleApp() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [activeFlyout, setActiveFlyout] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicalBar, setSelectedMedicalBar] = useState(2); // Default +10 Thn

  // Lead Capture Gate state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [savedTag, setSavedTag] = useState(null);

  const audit = useMemo(() => calculateResilienceAudit(form), [form]);

  const maxMedicalCost = Math.max(
    ...audit.medicalTimeline.map((item) => item.estimatedCost),
    1
  );
  const activeMedicalPoint =
    audit.medicalTimeline[selectedMedicalBar] || audit.medicalTimeline[2];

  // Radial SVG ring calculations
  const ringRadius = 54;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringDashOffset =
    ringCircumference - (audit.resilienceScore / 100) * ringCircumference;

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    if (!leadName.trim()) return;
    setForm((prev) => ({
      ...prev,
      clientName: leadName.trim(),
      clientContact: leadContact.trim(),
    }));
    setSavedTag(`WR-${String(Date.now()).slice(-5)}`);
    setIsUnlocked(true);
  };

  const quickSearchItems = [
    { label: 'Skor Ketahanan Finansial (0–100)', href: '#diagnostik' },
    { label: 'Proyeksi Inflasi Biaya Medis 13%/Tahun', href: '#hero-inflasi' },
    { label: 'Audit 3 Pilar Proteksi Keluarga', href: '#hero-pro' },
    { label: 'Pilar Kesehatan — Rawat Inap Sesuai Tagihan', href: '#promo-grid' },
    { label: 'Pilar Penyakit Kritis — Buffer 36 Bulan', href: '#promo-grid' },
    { label: 'Dana Darurat 6–12 Bulan Pengeluaran', href: '#promo-grid' },
    { label: 'Pilar Proteksi Jiwa & Pelunasan KPR', href: '#promo-grid' },
    { label: 'Konfigurator Kalkulator Finansial', href: '#kalkulator' },
  ].filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif',
      }}
      className="min-h-screen bg-white text-[#1D1D1F] antialiased selection:bg-[#0071E3] selection:text-white"
    >
      {/* ====================================================================
          1. GLOBAL APPLE TOP NAVIGATION BAR (44PX) + HOVER MEGA-MENU FLYOUT
         ==================================================================== */}
      <div
        onMouseLeave={() => setActiveFlyout(null)}
        className="sticky top-0 z-50"
      >
        <header className="h-[44px] bg-[#F5F5F7]/85 backdrop-blur-xl border-b border-black/[0.08]">
          <nav
            aria-label="Global Navigation"
            className="max-w-[1024px] mx-auto h-full px-4 flex items-center justify-between text-[12px] font-normal tracking-[-0.01em] text-[#1D1D1F]"
          >
            {/* Left Minimal Geometric Apple-Style Emblem */}
            <a
              href="#hero-duo"
              onMouseEnter={() => setActiveFlyout(null)}
              aria-label="WealthResilience Beranda"
              className="flex items-center gap-1.5 text-[#1D1D1F] opacity-90 hover:opacity-100 transition-opacity"
            >
              <AppleGeometricMark className="w-[15px] h-[15px]" />
            </a>

            {/* Centered 12px Crisp Navigation Items */}
            <div className="hidden md:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() =>
                    setActiveFlyout(item.hasFlyout ? item.id : null)
                  }
                  onClick={() => setActiveFlyout(null)}
                  className={`py-2 transition-colors ${
                    activeFlyout === item.id
                      ? 'text-black font-medium'
                      : 'text-[#1D1D1F]/80 hover:text-black'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Quick Pills + Right Search Icon */}
            <div className="flex items-center gap-3">
              <a
                href="#kalkulator"
                className="md:hidden text-[11px] font-medium text-[#0071E3]"
              >
                Kalkulator
              </a>
              <a
                href="#diagnostik"
                className="md:hidden text-[11px] text-[#1D1D1F]/80"
              >
                Skor ({audit.resilienceScore})
              </a>
              <button
                type="button"
                aria-label="Cari di WealthResilience"
                onMouseEnter={() => setActiveFlyout(null)}
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-1 text-[#1D1D1F]/80 hover:text-black transition-colors"
              >
                <IconSearch className="w-[14px] h-[14px]" />
              </button>
            </div>
          </nav>
        </header>

        {/* Interactive Hover Mega-Menu Dropdown Flyout (Apple Watch Reference Style) */}
        {activeFlyout && MEGA_MENUS[activeFlyout] && (
          <div className="hidden md:block bg-[#F5F5F7] border-b border-black/[0.08] shadow-sm transition-all duration-200">
            <div className="max-w-[1024px] mx-auto px-6 pt-8 pb-12 grid grid-cols-12 gap-8">
              {/* Left Column: Large Bold 22px Links + Smaller Secondary Links */}
              <div className="col-span-6">
                <p className="text-[11px] font-normal text-[#6E6E73] mb-3">
                  {MEGA_MENUS[activeFlyout].leftHeader}
                </p>
                <ul className="space-y-2">
                  {MEGA_MENUS[activeFlyout].leftPrimary.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setActiveFlyout(null)}
                        className="block text-[22px] font-bold tracking-[-0.02em] leading-[1.2] text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 space-y-1.5">
                  {MEGA_MENUS[activeFlyout].leftSecondary.map((sub) => (
                    <li key={sub.label}>
                      <a
                        href={sub.href}
                        onClick={() => setActiveFlyout(null)}
                        className="text-[12px] font-medium text-[#1D1D1F]/85 hover:text-[#0071E3] transition-colors"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Muted 12px Header + 13px Quick Links */}
              <div className="col-span-6">
                <p className="text-[11px] font-normal text-[#6E6E73] mb-3">
                  {MEGA_MENUS[activeFlyout].rightHeader}
                </p>
                <ul className="space-y-2">
                  {MEGA_MENUS[activeFlyout].rightLinks.map((qLink) => (
                    <li key={qLink.label}>
                      <a
                        href={qLink.href}
                        onClick={() => setActiveFlyout(null)}
                        className="text-[13px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
                      >
                        {qLink.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Quick Search Flyout Panel */}
        {searchOpen && (
          <div className="bg-[#F5F5F7] border-b border-black/[0.08]">
            <div className="max-w-[680px] mx-auto px-4 py-6">
              <div className="flex items-center gap-3 border-b border-black/10 pb-3">
                <IconSearch className="w-4 h-4 text-[#6E6E73]" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari simulasi, inflasi medis, atau pilar proteksi..."
                  className="w-full bg-transparent text-base font-medium text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-[#6E6E73] hover:text-[#1D1D1F]"
                >
                  <IconClose className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4">
                <p className="text-[11px] text-[#6E6E73] mb-2">Tautan Cepat</p>
                <ul className="space-y-1.5">
                  {quickSearchItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="block rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#1D1D1F] hover:bg-black/[0.05] hover:text-[#0071E3] transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blurred Page Backdrop Overlay when Mega-Menu or Search is Open */}
      {(activeFlyout || searchOpen) && (
        <div
          onClick={() => {
            setActiveFlyout(null);
            setSearchOpen(false);
          }}
          className="fixed inset-0 top-[44px] z-40 backdrop-blur-md bg-black/20 transition-opacity"
        />
      )}

      {/* ====================================================================
          2. ALTERNATING FULL-BLEED HERO SECTIONS + 12PX PURE WHITE GUTTERS
         ==================================================================== */}
      <main>
        {/* HERO 1: Crisp Off-White #F5F5F7 (iPhone Duo Reference Style) */}
        <section
          id="hero-duo"
          className="bg-[#F5F5F7] pt-14 sm:pt-20 px-4 sm:px-6 text-center overflow-hidden"
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-[#1D1D1F] leading-[1.05]">
              WealthResilience
            </h1>
            <p className="mt-2 text-lg sm:text-2xl font-normal tracking-[-0.01em] text-[#1D1D1F]">
              Seberapa tangguh finansial keluarga Anda?
            </p>

            {/* Dual Signature Apple Pill CTA Buttons */}
            <div className="mt-5 flex items-center justify-center gap-3.5">
              <a
                href="#kalkulator"
                className="rounded-full bg-[#0071E3] hover:bg-[#0077ED] px-5 py-2.5 text-[14px] font-medium text-white transition-all"
              >
                Mulai Cek Skor
              </a>
              <a
                href="#diagnostik"
                className="rounded-full border border-[#0071E3] text-[#0071E3] hover:bg-[#0071E3] hover:text-white px-5 py-2.5 text-[14px] font-medium transition-all"
              >
                Lihat Simulasi
              </a>
            </div>
          </div>

          {/* Sleek Centered iPad / Duo Horizontal Display Resting at Bottom Edge */}
          <div className="mt-10 sm:mt-12 max-w-[640px] mx-auto">
            <div className="rounded-t-[30px] border-[8px] border-b-0 border-[#1D1D1F] bg-gradient-to-br from-[#EDE9DF] via-[#E5DFD2] to-[#D4CCC0] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              {/* Top Mini Status Bar inside Display */}
              <div className="flex items-center justify-between text-[10px] font-semibold text-[#1D1D1F]/70 mb-3 px-1">
                <span>WealthOS • Audit Keluarga</span>
                <span>Skor Real-Time: {audit.resilienceScore}/100</span>
              </div>

              {/* iPadOS Live Interactive Widget Grid */}
              <div className="grid grid-cols-12 gap-3 text-left">
                {/* Left Large Widget: Resilience Score */}
                <a
                  href="#diagnostik"
                  className="col-span-12 sm:col-span-5 rounded-2xl bg-white/95 p-3.5 shadow-sm hover:scale-[1.01] transition-transform flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E6E73]">
                      Ketahanan
                    </span>
                    <span className="rounded-full bg-[#0071E3]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0071E3]">
                      {audit.resilienceCategory}
                    </span>
                  </div>
                  <div className="my-2">
                    <div className="text-3xl font-bold tracking-tight text-[#1D1D1F] tabular-nums">
                      {audit.resilienceScore}
                      <span className="text-xs font-normal text-[#6E6E73]">/100</span>
                    </div>
                    <p className="text-[11px] text-[#6E6E73] mt-0.5">
                      Dana darurat {audit.ratios.emergencyMonths} bln
                    </p>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#F5F5F7] overflow-hidden">
                    <div
                      style={{ width: `${audit.resilienceScore}%` }}
                      className="h-full rounded-full bg-[#0071E3]"
                    />
                  </div>
                </a>

                {/* Right Column Widgets */}
                <div className="col-span-12 sm:col-span-7 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Mini Widget: Inflasi Medis +13%/thn */}
                    <a
                      href="#hero-inflasi"
                      className="rounded-2xl bg-[#1D1D1F] p-3 text-white shadow-sm hover:scale-[1.01] transition-transform"
                    >
                      <span className="block text-[10px] text-zinc-400">Inflasi +13%/thn</span>
                      <span className="mt-1 block text-sm font-bold tabular-nums text-[#2997FF]">
                        {formatCompactIDR(audit.medicalTimeline[2].estimatedCost)}
                      </span>
                      <div className="mt-2 flex items-end gap-1 h-6">
                        {audit.medicalTimeline.map((pt, i) => (
                          <div
                            key={pt.yr}
                            style={{ height: `${28 + i * 18}%` }}
                            className={`flex-1 rounded-sm ${
                              i === 2 ? 'bg-[#0071E3]' : 'bg-white/25'
                            }`}
                          />
                        ))}
                      </div>
                    </a>

                    {/* Mini Widget: Dana Darurat */}
                    <a
                      href="#promo-grid"
                      className="rounded-2xl bg-white/95 p-3 shadow-sm hover:scale-[1.01] transition-transform"
                    >
                      <span className="block text-[10px] text-[#6E6E73]">Dana Darurat</span>
                      <span className="mt-1 block text-sm font-bold text-[#1D1D1F] tabular-nums">
                        {audit.ratios.emergencyMonths} / {audit.ratios.idealEmergencyMonths} Bln
                      </span>
                      <div className="mt-2.5 w-full h-1.5 rounded-full bg-[#F5F5F7] overflow-hidden">
                        <div
                          style={{ width: `${audit.ratios.emergencyAdequacyPercent}%` }}
                          className="h-full rounded-full bg-emerald-500"
                        />
                      </div>
                      <span className="mt-1 block text-[10px] text-[#6E6E73] tabular-nums">
                        {audit.ratios.emergencyAdequacyPercent}% terpenuhi
                      </span>
                    </a>
                  </div>

                  {/* 3-Pillar Interactive App Tiles */}
                  <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/80 p-2 backdrop-blur-md">
                    {audit.pillars.map((p) => (
                      <a
                        key={p.id}
                        href="#lead-gate"
                        className="rounded-xl bg-white px-2.5 py-2 text-center shadow-2xs hover:bg-[#0071E3] hover:text-white group transition-colors"
                      >
                        <span className="block text-[10px] font-semibold truncate">
                          {p.pillar}
                        </span>
                        <span className="block text-[9px] text-[#6E6E73] group-hover:text-white/90 tabular-nums">
                          {p.coveragePercent}%
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12PX PURE WHITE (#FFFFFF) GUTTER */}
        <div className="h-3 bg-white" />

        {/* HERO 2: Pure OLED Black #000000 (iPhone 18 Pro / Giant PRO Chrome Reference) */}
        <section
          id="hero-pro"
          className="bg-[#000000] pt-14 sm:pt-20 pb-14 sm:pb-16 px-4 sm:px-6 text-center text-white overflow-hidden"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.05]">
              Audit 3 Pilar Pro
            </h2>
            <p className="mt-2 text-lg sm:text-2xl font-normal text-[#F5F5F7]">
              Proteksi keluarga. Jauh lebih terukur.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3.5">
              <a
                href="#lead-gate"
                className="rounded-full bg-[#0071E3] hover:bg-[#0077ED] px-5 py-2.5 text-[14px] font-medium text-white transition-all"
              >
                Selengkapnya
              </a>
              <a
                href="#kalkulator"
                className="rounded-full border border-[#0071E3] text-[#2997FF] hover:bg-[#0071E3] hover:text-white px-5 py-2.5 text-[14px] font-medium transition-all"
              >
                Cek Celah
              </a>
            </div>
          </div>

          {/* Giant Metallic Chrome / Iridescent "PRO" Typography Behind Titanium Bar */}
          <div className="relative mt-8 sm:mt-10 max-w-4xl mx-auto flex items-center justify-center py-4">
            <div
              aria-hidden="true"
              className="text-[112px] sm:text-[185px] md:text-[230px] font-black tracking-[-0.04em] leading-none select-none bg-gradient-to-r from-[#E5E7EB] via-[#FDE68A] via-[#93C5FD] to-[#E5E7EB] bg-clip-text text-transparent opacity-90 drop-shadow-[0_0_35px_rgba(255,255,255,0.18)]"
            >
              PRO
            </div>

            {/* Sleek Dark Titanium Horizontal Hardware Bar Overlay */}
            <div className="absolute inset-x-2 sm:inset-x-8 rounded-full border border-white/20 bg-gradient-to-b from-[#2C2C2E]/95 via-[#18181B]/95 to-[#09090B]/95 px-4 sm:px-8 py-3.5 sm:py-4 shadow-[0_24px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl">
              <div className="grid grid-cols-3 divide-x divide-white/15 text-center">
                {audit.pillars.map((p, idx) => (
                  <div key={p.id} className="px-2 sm:px-4">
                    <span className="block text-[10px] uppercase tracking-widest text-zinc-400">
                      Pilar 0{idx + 1}
                    </span>
                    <span className="mt-0.5 block text-xs sm:text-sm font-semibold text-white truncate">
                      {p.pillar}
                    </span>
                    <span className="mt-0.5 inline-block text-[10px] font-medium text-[#2997FF] tabular-nums">
                      {p.coveragePercent}% Terpenuhi
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 12PX PURE WHITE (#FFFFFF) GUTTER */}
        <div className="h-3 bg-white" />

        {/* HERO 3: Pure OLED Black #000000 (MacBook Pro / Layar PROLED XDR Reference) */}
        <section
          id="hero-inflasi"
          className="bg-[#000000] pt-14 sm:pt-20 px-4 sm:px-6 text-center text-white overflow-hidden"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.05]">
              Inflasi Medis 13%
            </h2>
            <p className="mt-2 text-lg sm:text-2xl font-medium bg-gradient-to-r from-[#F5D076] via-[#BAE6FD] to-[#2997FF] bg-clip-text text-transparent">
              Layar Proyeksi Biaya Medis
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-[#86868B]">
              Estimasi tindakan medis mayor Rp 150 Jt hari ini melonjak setiap tahun.
            </p>

            <div className="mt-5 flex justify-center">
              <a
                href="#diagnostik"
                className="rounded-full bg-[#0071E3] hover:bg-[#0077ED] px-5 py-2.5 text-[14px] font-medium text-white transition-all"
              >
                Simulasi Proyeksi
              </a>
            </div>
          </div>

          {/* Glowing Display Screen Frame with Luminous Vertical Light-Beam Bars */}
          <div className="mt-10 sm:mt-12 max-w-[680px] mx-auto">
            <div className="rounded-t-[24px] border-[6px] border-b-0 border-[#2C2C2E] bg-[#05060A] px-5 sm:px-8 pt-6 pb-5 shadow-[0_-10px_60px_rgba(41,151,255,0.16)]">
              <div className="grid grid-cols-5 gap-3 sm:gap-5 items-end h-44 sm:h-52">
                {audit.medicalTimeline.map((point, idx) => {
                  const heightPct = Math.max(
                    22,
                    Math.round((point.estimatedCost / maxMedicalCost) * 100)
                  );
                  return (
                    <div
                      key={point.yr}
                      className="h-full flex flex-col items-center justify-end gap-2"
                    >
                      <span className="text-[10px] sm:text-[11px] font-medium text-sky-200/90 tabular-nums">
                        {formatCompactIDR(point.estimatedCost)}
                      </span>
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          idx === 4
                            ? 'bg-gradient-to-t from-[#0071E3] via-[#60A5FA] to-[#E0F2FE] shadow-[0_0_28px_rgba(96,165,250,0.65)]'
                            : idx >= 2
                            ? 'bg-gradient-to-t from-[#0A2540] via-[#1D4ED8] to-[#93C5FD]'
                            : 'bg-gradient-to-t from-[#0F172A] via-[#1E3A8A] to-[#60A5FA]/80'
                        }`}
                      />
                      <span className="text-[10px] text-zinc-400">{point.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 12PX PURE WHITE (#FFFFFF) GUTTER */}
        <div className="h-3 bg-white" />

        {/* ====================================================================
            3. 2x2 EDGE-TO-EDGE APPLE PROMO GRID WITH 12PX WHITE (#FFFFFF) GUTTERS
           ==================================================================== */}
        <section id="promo-grid" className="bg-white md:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white">
            {/* TILE 1: Pure Black #000000 (Apple Watch Series 12 Dial Reference) */}
            <div className="bg-[#000000] text-white px-6 pt-12 pb-10 flex flex-col items-center justify-between text-center min-h-[480px]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xl sm:text-2xl font-bold tracking-tight">
                  <AppleGeometricMark className="w-5 h-5" />
                  <span>PILAR KESEHATAN</span>
                </div>
              </div>

              {/* Apple Watch OLED Biometric Heart & Emerald Ring Dial Visual */}
              <div className="my-6 flex items-center justify-center gap-4">
                <div className="w-32 h-36 rounded-[30px] border-[3px] border-[#3A3A3C] bg-[#09090B] p-3 flex flex-col items-center justify-between shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                  <div className="w-full flex justify-between text-[9px] text-zinc-500">
                    <span>ON-BILL</span>
                    <span className="tabular-nums">13%</span>
                  </div>
                  <div className="text-rose-500 drop-shadow-[0_0_16px_rgba(244,63,94,0.85)]">
                    <IconHeartGlow className="w-9 h-9" />
                  </div>
                  <div className="text-center">
                    <span className="block text-xs font-bold text-white tabular-nums">
                      {formatCompactIDR(form.medicalAnnualLimit)}
                    </span>
                    <span className="block text-[9px] text-zinc-400">Limit Tahunan</span>
                  </div>
                </div>

                <div className="w-32 h-36 rounded-[30px] border-[3px] border-[#3A3A3C] bg-[#09090B] p-3 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.18)]">
                  <div className="w-20 h-20 rounded-full border-[5px] border-emerald-500/80 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.45)]">
                    <span className="text-sm font-bold text-emerald-400 tabular-nums">
                      {audit.pillars[0].coveragePercent}%
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-zinc-400">
                      Ideal 1M
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="max-w-xs mx-auto text-xs sm:text-sm text-[#F5F5F7]/90 leading-relaxed">
                  Perlindungan biaya rawat inap sesuai tagihan rumah sakit.*
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <a
                    href="#lead-gate"
                    className="rounded-full bg-[#0071E3] hover:bg-[#0077ED] px-4 py-2 text-xs font-medium text-white transition"
                  >
                    Selengkapnya
                  </a>
                  <a
                    href="#kalkulator"
                    className="rounded-full border border-[#0071E3] text-[#2997FF] hover:bg-[#0071E3] hover:text-white px-4 py-2 text-xs font-medium transition"
                  >
                    Cek Celah
                  </a>
                </div>
              </div>
            </div>

            {/* TILE 2: Pure Black #000000 (Apple Watch Ultra 4 Titanium Reference) */}
            <div className="bg-[#000000] text-white px-6 pt-12 pb-10 flex flex-col items-center justify-between text-center min-h-[480px]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xl sm:text-2xl font-bold tracking-tight">
                  <AppleGeometricMark className="w-5 h-5" />
                  <span>PENYAKIT KRITIS</span>
                  <span className="text-xs font-bold tracking-widest text-[#FF6B00] ml-1">
                    BUFFER
                  </span>
                </div>
                <p className="mt-1.5 text-sm sm:text-base text-[#F5F5F7]">
                  Dana pengganti penghasilan 3 tahun.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <a
                    href="#lead-gate"
                    className="rounded-full bg-[#0071E3] hover:bg-[#0077ED] px-4 py-2 text-xs font-medium text-white transition"
                  >
                    Selengkapnya
                  </a>
                  <a
                    href="#kalkulator"
                    className="rounded-full border border-[#0071E3] text-[#2997FF] hover:bg-[#0071E3] hover:text-white px-4 py-2 text-xs font-medium transition"
                  >
                    Hitung UP
                  </a>
                </div>
              </div>

              {/* Sleek Horizontal Titanium Bezel Display showing "36 BLN" */}
              <div className="mt-8 w-full max-w-[340px]">
                <div className="rounded-[26px] border-[4px] border-[#8E8E93] bg-gradient-to-b from-[#1C1C1E] to-[#09090B] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center justify-between text-[10px] text-[#FF6B00] font-semibold tracking-wider uppercase">
                    <span>Income Replacement</span>
                    <span>Target 36x</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-4xl font-extrabold tracking-tight text-white tabular-nums">
                      36 BLN
                    </span>
                    <span className="text-sm font-semibold text-[#2997FF] tabular-nums">
                      {formatCompactIDR(audit.pillars[1].idealAmount)}
                    </span>
                  </div>
                  <div className="mt-3 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      style={{ width: `${audit.pillars[1].coveragePercent}%` }}
                      className="h-full rounded-full bg-[#FF6B00]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* TILE 3: Editorial Warm-to-Cool Atmospheric Gradient (Dana Darurat) */}
            <div className="bg-gradient-to-tr from-[#131C2E] via-[#4A3B32] to-[#D4A373] text-white px-6 pt-12 pb-10 flex flex-col items-center justify-between text-center min-h-[460px]">
              <div className="max-w-sm">
                <span className="inline-block rounded-full bg-black/30 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white/90">
                  Likuiditas Fondasi Keluarga
                </span>
                <h3 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  DANA DARURAT
                </h3>
                <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
                  Likuiditas 6 hingga 12 bulan pengeluaran keluarga.
                </p>
              </div>

              <div className="w-full max-w-xs rounded-2xl bg-black/35 backdrop-blur-xl border border-white/15 p-4 text-left">
                <div className="flex justify-between text-xs">
                  <span className="text-white/75">Ketahanan Saat Ini</span>
                  <span className="font-bold text-white tabular-nums">
                    {audit.ratios.emergencyMonths} / {audit.ratios.idealEmergencyMonths} Bulan
                  </span>
                </div>
                <div className="mt-2 w-full h-2 rounded-full bg-white/15 overflow-hidden">
                  <div
                    style={{ width: `${audit.ratios.emergencyAdequacyPercent}%` }}
                    className="h-full rounded-full bg-white"
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-white/80 tabular-nums">
                  <span>Tersedia: {formatCompactIDR(form.emergencyFund)}</span>
                  <span>Ideal: {formatCompactIDR(audit.emergencyFundAnalysis.ideal)}</span>
                </div>
              </div>

              <div>
                <a
                  href="#kalkulator"
                  className="inline-block rounded-full bg-[#0071E3] hover:bg-[#0077ED] px-5 py-2 text-xs font-medium text-white transition"
                >
                  Cek Kecukupan
                </a>
              </div>
            </div>

            {/* TILE 4: Crisp Off-White #F5F5F7 (iPad mini Reference Style) */}
            <div className="bg-[#F5F5F7] text-[#1D1D1F] px-6 pt-12 pb-10 flex flex-col items-center justify-between text-center min-h-[460px]">
              <div className="max-w-sm">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
                  Proteksi{' '}
                  <span className="italic font-serif font-semibold bg-gradient-to-r from-[#0071E3] to-[#38BDF8] bg-clip-text text-transparent">
                    Jiwa
                  </span>
                </h3>
                <p className="mt-1.5 text-base sm:text-lg font-medium text-[#1D1D1F]">
                  Tenang yang begitu pasti.
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#6E6E73]">
                  5 tahun biaya hidup keluarga + pelunasan sisa KPR.
                </p>
                <div className="mt-4">
                  <a
                    href="#lead-gate"
                    className="inline-block rounded-full bg-[#0071E3] hover:bg-[#0077ED] px-5 py-2 text-xs font-medium text-white transition"
                  >
                    Audit Sekarang
                  </a>
                </div>
              </div>

              {/* Clean Benchmark Card Visual */}
              <div className="mt-6 w-full max-w-xs rounded-2xl bg-white border border-black/[0.06] p-4 shadow-sm text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6E6E73]">Benchmark UP Ideal</span>
                  <span className="font-bold text-[#0071E3] tabular-nums">
                    {formatCompactIDR(audit.pillars[2].idealAmount)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-[#6E6E73]">UP Jiwa Terdaftar</span>
                  <span className="font-semibold text-[#1D1D1F] tabular-nums">
                    {formatCompactIDR(form.lifeInsuranceCover)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12PX PURE WHITE (#FFFFFF) GUTTER */}
        <div className="h-3 bg-white" />

        {/* ====================================================================
            4. APPLE STORE-STYLE INTERACTIVE CONFIGURATOR CALCULATOR (#F5F5F7)
           ==================================================================== */}
        <section id="kalkulator" className="bg-[#F5F5F7] py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">
                Konfigurator Audit Keluarga
              </p>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[#1D1D1F]">
                Sesuaikan dengan kondisi finansial Anda.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6E6E73]">
                Setiap perubahan angka langsung memperbarui Skor Ketahanan, proyeksi inflasi
                medis 13%, dan celah 3 pilar proteksi secara otomatis.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Module 1: Profil & Arus Kas */}
              <div className="rounded-[28px] bg-white border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-black/[0.06] pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
                    Langkah 01
                  </span>
                  <h3 className="text-lg font-bold text-[#1D1D1F]">
                    Profil &amp; Arus Kas Bulanan
                  </h3>
                </div>

                {/* Status Keluarga Segmented Pill Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-2">
                    Status Keluarga
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#F5F5F7] p-1">
                    {[
                      { id: 'single', label: 'Single' },
                      { id: 'married', label: 'Menikah' },
                      { id: 'married_with_kids', label: 'Menikah + Anak' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setForm({ ...form, maritalStatus: opt.id })}
                        className={`rounded-xl py-2 text-xs font-semibold transition-all ${
                          form.maritalStatus === opt.id
                            ? 'bg-white text-[#1D1D1F] shadow-xs'
                            : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                      Usia Saat Ini (Tahun)
                    </label>
                    <input
                      type="number"
                      min={18}
                      max={75}
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                      className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-[#1D1D1F]">Dana Darurat Likuid</span>
                      <span className="text-[#0071E3] font-medium tabular-nums">
                        {formatCompactIDR(form.emergencyFund)}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={1000000}
                      min={0}
                      value={form.emergencyFund}
                      onChange={(e) =>
                        setForm({ ...form, emergencyFund: Number(e.target.value) })
                      }
                      className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#1D1D1F]">Penghasilan Bersih / Bulan</span>
                    <span className="text-[#0071E3] font-medium tabular-nums">
                      {formatIDR(form.monthlyIncome)}
                    </span>
                  </div>
                  <input
                    type="number"
                    step={500000}
                    min={0}
                    value={form.monthlyIncome}
                    onChange={(e) => setForm({ ...form, monthlyIncome: Number(e.target.value) })}
                    className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-[#1D1D1F]">Pengeluaran Rutin / Bln</span>
                      <span className="text-[#6E6E73] tabular-nums">
                        {formatCompactIDR(form.monthlyExpense)}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={500000}
                      min={0}
                      value={form.monthlyExpense}
                      onChange={(e) =>
                        setForm({ ...form, monthlyExpense: Number(e.target.value) })
                      }
                      className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-[#1D1D1F]">Cicilan / Bulan</span>
                      <span className="text-[#6E6E73] tabular-nums">
                        {formatCompactIDR(form.monthlyDebt)}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={250000}
                      min={0}
                      value={form.monthlyDebt}
                      onChange={(e) => setForm({ ...form, monthlyDebt: Number(e.target.value) })}
                      className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                    />
                  </div>
                </div>
              </div>

              {/* Module 2: Audit 3 Pilar Proteksi Saat Ini */}
              <div className="rounded-[28px] bg-white border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-black/[0.06] pb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
                    Langkah 02
                  </span>
                  <h3 className="text-lg font-bold text-[#1D1D1F]">
                    Kepemilikan 3 Pilar Proteksi
                  </h3>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#1D1D1F]">
                      Pilar 1 — Limit Tahunan Medis
                    </span>
                    <span className="text-[#0071E3] font-medium tabular-nums">
                      {formatCompactIDR(form.medicalAnnualLimit)}
                    </span>
                  </div>
                  <input
                    type="number"
                    step={50000000}
                    min={0}
                    value={form.medicalAnnualLimit}
                    onChange={(e) =>
                      setForm({ ...form, medicalAnnualLimit: Number(e.target.value) })
                    }
                    className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#1D1D1F]">
                      Pilar 2 — UP Penyakit Kritis
                    </span>
                    <span className="text-[#0071E3] font-medium tabular-nums">
                      {formatCompactIDR(form.criticalIllnessCover)}
                    </span>
                  </div>
                  <input
                    type="number"
                    step={50000000}
                    min={0}
                    value={form.criticalIllnessCover}
                    onChange={(e) =>
                      setForm({ ...form, criticalIllnessCover: Number(e.target.value) })
                    }
                    className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#1D1D1F]">
                      Pilar 3 — UP Proteksi Jiwa
                    </span>
                    <span className="text-[#0071E3] font-medium tabular-nums">
                      {formatCompactIDR(form.lifeInsuranceCover)}
                    </span>
                  </div>
                  <input
                    type="number"
                    step={50000000}
                    min={0}
                    value={form.lifeInsuranceCover}
                    onChange={(e) =>
                      setForm({ ...form, lifeInsuranceCover: Number(e.target.value) })
                    }
                    className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#1D1D1F]">
                      Total Sisa Utang / KPR
                    </span>
                    <span className="text-[#6E6E73] font-medium tabular-nums">
                      {formatCompactIDR(form.totalOutstandingDebt)}
                    </span>
                  </div>
                  <input
                    type="number"
                    step={50000000}
                    min={0}
                    value={form.totalOutstandingDebt}
                    onChange={(e) =>
                      setForm({ ...form, totalOutstandingDebt: Number(e.target.value) })
                    }
                    className="w-full rounded-2xl bg-[#F5F5F7] px-4 py-3 text-sm font-semibold text-[#1D1D1F] tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            5. LIVE DIAGNOSTIC DASHBOARD & NON-PUSHY LEAD CAPTURE GATE
           ==================================================================== */}
        <section id="diagnostik" className="bg-white py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">
                  Diagnostik Real-Time
                </p>
                <h2 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
                  {isUnlocked && form.clientName
                    ? `Hasil Audit Keluarga ${form.clientName}`
                    : 'Skor Ketahanan & Proyeksi Inflasi Medis'}
                </h2>
              </div>

              {savedTag && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-semibold text-emerald-700">
                  <IconCheckCircle className="w-3.5 h-3.5" />
                  <span>Laporan Tersimpan ({savedTag})</span>
                </span>
              )}
            </div>

            {/* Bento Row: Radial Score Gauge (5 Cols) + 13% Medical Inflation Chart (7 Cols) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Radial Resilience Score Card */}
              <div className="md:col-span-5 rounded-[28px] bg-[#F5F5F7] p-7 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#6E6E73]">
                    Skor Ketahanan Finansial
                  </span>
                  <span className="rounded-full bg-[#0071E3]/10 px-3 py-1 text-xs font-semibold text-[#0071E3]">
                    {audit.resilienceCategory}
                  </span>
                </div>

                <div className="my-6 flex items-center gap-5">
                  <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                      <circle
                        cx="64"
                        cy="64"
                        r={ringRadius}
                        stroke="#E5E5EA"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r={ringRadius}
                        stroke="#0071E3"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={ringCircumference}
                        strokeDashoffset={ringDashOffset}
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold tracking-tight text-[#1D1D1F] tabular-nums">
                        {audit.resilienceScore}
                      </span>
                      <span className="text-[11px] text-[#6E6E73]">dari 100</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="text-[#6E6E73]">Dana Darurat</p>
                      <p className="text-sm font-bold text-[#1D1D1F] tabular-nums">
                        {audit.ratios.emergencyMonths} / {audit.ratios.idealEmergencyMonths} Bulan
                      </p>
                    </div>
                    <div>
                      <p className="text-[#6E6E73]">Rasio Tabungan / Cicilan</p>
                      <p className="text-sm font-bold text-[#1D1D1F] tabular-nums">
                        {audit.ratios.savingRatioPercent}% / {audit.ratios.debtServiceRatioPercent}%
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  Kekurangan dana darurat:{' '}
                  <strong className="text-[#1D1D1F] tabular-nums">
                    {formatIDR(audit.emergencyFundAnalysis.shortfall)}
                  </strong>
                </p>
              </div>

              {/* Interactive Medical Inflation 13%/Year Chart Card */}
              <div className="md:col-span-7 rounded-[28px] bg-[#000000] text-white p-7 flex flex-col justify-between">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-[#2997FF]">
                      Proyeksi Inflasi Biaya Medis 13% / Tahun
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {activeMedicalPoint.label} (Usia {activeMedicalPoint.age} Thn):{' '}
                      <span className="text-[#2997FF] tabular-nums">
                        {formatIDR(activeMedicalPoint.estimatedCost)}
                      </span>
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#86868B] tabular-nums">
                    Base: Rp 150 Jt
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 sm:gap-3 items-end h-44 pt-8 pb-2">
                  {audit.medicalTimeline.map((pt, idx) => {
                    const heightPct = Math.max(
                      18,
                      Math.round((pt.estimatedCost / maxMedicalCost) * 100)
                    );
                    const isSelected = idx === selectedMedicalBar;
                    return (
                      <button
                        key={pt.yr}
                        type="button"
                        onClick={() => setSelectedMedicalBar(idx)}
                        onMouseEnter={() => setSelectedMedicalBar(idx)}
                        className="h-full flex flex-col items-center justify-end gap-2 focus:outline-none group"
                      >
                        <span
                          className={`text-[10px] sm:text-[11px] font-medium tabular-nums transition ${
                            isSelected ? 'text-[#2997FF]' : 'text-zinc-400'
                          }`}
                        >
                          {formatCompactIDR(pt.estimatedCost)}
                        </span>
                        <div className="w-full max-w-[44px] h-28 rounded-2xl bg-white/[0.06] p-1 flex items-end">
                          <div
                            style={{ height: `${heightPct}%` }}
                            className={`w-full rounded-xl transition-all duration-500 ${
                              isSelected
                                ? 'bg-[#0071E3] shadow-[0_0_20px_rgba(0,113,227,0.65)]'
                                : 'bg-white/25 group-hover:bg-white/40'
                            }`}
                          />
                        </div>
                        <div className="text-center">
                          <span className="block text-[11px] font-medium text-white">
                            {pt.label}
                          </span>
                          <span className="block text-[10px] text-[#86868B] tabular-nums">
                            Usia {pt.age}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-[#86868B]">
                  Ketuk atau arahkan kursor pada batang grafik untuk melihat eskalasi biaya
                  tindakan medis sesuai usia Anda.
                </p>
              </div>
            </div>

            {/* NON-PUSHY LEAD CAPTURE GATE OR UNLOCKED 3-PILLAR GAP BREAKDOWN */}
            <div id="lead-gate" className="pt-2">
              {!isUnlocked ? (
                <div className="rounded-[28px] bg-[#F5F5F7] border border-black/[0.06] p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-5">
                  <div className="mx-auto w-11 h-11 rounded-full bg-white text-[#0071E3] flex items-center justify-center shadow-xs">
                    <IconLock className="w-5 h-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
                      Buka Rincian Celah 3 Pilar Proteksi Keluarga
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E6E73] max-w-xl mx-auto leading-relaxed">
                      Masukkan nama panggilan dan kontak WhatsApp/Email opsional untuk menyimpan
                      ringkasan ini dan melihat nominal ideal{' '}
                      <strong className="text-[#1D1D1F]">Kesehatan</strong>,{' '}
                      <strong className="text-[#1D1D1F]">Penyakit Kritis</strong>, dan{' '}
                      <strong className="text-[#1D1D1F]">Jiwa</strong>.
                    </p>
                  </div>

                  <form
                    onSubmit={handleUnlockSubmit}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto pt-1"
                  >
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Nama Panggilan / Keluarga"
                      className="w-full sm:flex-1 rounded-full bg-white border border-black/10 px-4 py-3 text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#0071E3] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={leadContact}
                      onChange={(e) => setLeadContact(e.target.value)}
                      placeholder="No. WhatsApp / Email (Opsional)"
                      className="w-full sm:flex-1 rounded-full bg-white border border-black/10 px-4 py-3 text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#0071E3] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto rounded-full bg-[#0071E3] hover:bg-[#0077ED] px-6 py-3 text-sm font-medium text-white whitespace-nowrap transition"
                    >
                      Lihat Laporan
                    </button>
                  </form>

                  <div>
                    <button
                      type="button"
                      onClick={() => setIsUnlocked(true)}
                      className="text-xs font-medium text-[#6E6E73] hover:text-[#0071E3] underline underline-offset-4 transition"
                    >
                      Lewati &amp; lihat rincian edukasi tanpa menyimpan data
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#1D1D1F]">
                      Pemetaan Celah 3 Pilar Proteksi
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUnlocked(false);
                        setSavedTag(null);
                      }}
                      className="rounded-full border border-black/10 px-3.5 py-1 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F]"
                    >
                      Kunci Ulang
                    </button>
                  </div>

                  {/* 3 Equal Bento Pillar Breakdown Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {audit.pillars.map((p, idx) => {
                      const PillarIcon =
                        idx === 0
                          ? IconHeartGlow
                          : idx === 1
                          ? IconActivity
                          : IconShield;
                      return (
                        <div
                          key={p.id}
                          className="rounded-[28px] bg-[#F5F5F7] p-6 flex flex-col justify-between space-y-5"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="w-9 h-9 rounded-full bg-white text-[#0071E3] flex items-center justify-center shadow-2xs">
                                <PillarIcon className="w-4 h-4" />
                              </div>
                              <span
                                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                                  p.status === 'Terlindungi'
                                    ? 'bg-emerald-500/15 text-emerald-700'
                                    : p.status === 'Perlu Upgrade'
                                    ? 'bg-[#0071E3]/10 text-[#0071E3]'
                                    : 'bg-rose-500/10 text-rose-700'
                                }`}
                              >
                                {p.status}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-lg font-bold text-[#1D1D1F]">
                                Pilar {p.pillar}
                              </h4>
                              <p className="text-xs text-[#6E6E73]">{p.subtitle}</p>
                            </div>

                            {/* Coverage Progress Bar */}
                            <div className="space-y-1.5 pt-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-[#6E6E73]">Terpenuhi</span>
                                <span className="font-bold text-[#1D1D1F] tabular-nums">
                                  {p.coveragePercent}%
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-black/[0.08] overflow-hidden">
                                <div
                                  style={{ width: `${p.coveragePercent}%` }}
                                  className="h-full rounded-full bg-[#0071E3] transition-all duration-500"
                                />
                              </div>
                            </div>

                            <div className="pt-2 space-y-1.5 text-xs">
                              <div className="flex justify-between">
                                <span className="text-[#6E6E73]">Kebutuhan Ideal</span>
                                <span className="font-semibold text-[#1D1D1F] tabular-nums">
                                  {formatCompactIDR(p.idealAmount)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#6E6E73]">Proteksi Saat Ini</span>
                                <span className="font-semibold text-[#1D1D1F] tabular-nums">
                                  {formatCompactIDR(p.currentAmount)}
                                </span>
                              </div>
                              <div className="flex justify-between pt-1.5 border-t border-black/[0.08]">
                                <span className="text-[#6E6E73]">Celah Proteksi</span>
                                <span className="font-bold text-[#0071E3] tabular-nums">
                                  {formatCompactIDR(p.gapAmount)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-[#6E6E73] leading-relaxed">{p.note}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Prioritized Consultative Recommendations */}
                  <div className="rounded-[28px] bg-[#F5F5F7] p-6 sm:p-8 space-y-4">
                    <h4 className="text-base font-bold text-[#1D1D1F]">
                      Langkah Prioritas yang Disarankan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {audit.recommendations.map((rec, i) => (
                        <div
                          key={i}
                          className="rounded-2xl bg-white p-4 text-xs text-[#1D1D1F] leading-relaxed flex gap-3 shadow-2xs"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center shrink-0 font-bold tabular-nums">
                            {i + 1}
                          </span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Apple-Style Minimalist Footnote Footer */}
      <footer className="bg-[#F5F5F7] border-t border-black/[0.08] py-8 px-4 sm:px-6 text-[11px] text-[#6E6E73]">
        <div className="max-w-[1024px] mx-auto space-y-3">
          <p>
            *Simulasi proyeksi inflasi biaya medis menggunakan asumsi kenaikan rata-rata 13% per
            tahun dari estimasi tindakan medis mayor Rp 150.000.000 saat ini. Perhitungan Uang
            Pertanggungan dan Dana Darurat disusun sebagai panduan edukasi perencanaan risiko
            keluarga secara objektif.
          </p>
          <div className="border-t border-black/[0.08] pt-3 flex flex-col sm:flex-row justify-between gap-2">
            <span>Hak Cipta © 2026 WealthResilience Indonesia. Seluruh hak dilindungi.</span>
            <span>Indonesia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CekKetahananFinansial() {
  return (
    <AppErrorBoundary>
      <WealthResilienceAppleApp />
    </AppErrorBoundary>
  );
}
