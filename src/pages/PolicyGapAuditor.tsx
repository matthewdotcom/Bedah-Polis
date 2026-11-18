import React, { useMemo, useState } from "react";
import {
  ShieldCheck,
  HeartPulse,
  Umbrella,
  Building2,
  TrendingUp,
  FileText,
  Printer,
  Copy,
  Check,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  X,
} from "lucide-react";

// ============================================================================
// PRESET SKENARIO KONSULTASI (Untuk Demo Cepat di Depan Klien)
// ============================================================================

const PRESET_SCENARIOS = {
  keluargaMapan: {
    label: "Keluarga Mapan",
    badge: "KPR + 2 Anak",
    description: "Punya polis lama, tapi UP Jiwa & limit RS belum disesuaikan",
    data: {
      clientName: "Bpk. Hendra Wijaya",
      advisorName: "Rina Kartika, CFP®",
      hospitalAnnualLimit: 300_000_000,
      criticalIllnessUP: 250_000_000,
      lifeInsuranceUP: 600_000_000,
      debtAndEducationNeed: 1_850_000_000,
      monthlyIncome: 30_000_000,
      recoveryMonths: 18,
      familyLivingYears: 5,
      medicalInflationRate: 12,
      baseMajorMedicalCost: 650_000_000,
    },
  },
  keluargaMuda: {
    label: "Keluarga Muda",
    badge: "1 Balita",
    description: "Mengandalkan asuransi kantor & polis awal karier",
    data: {
      clientName: "Ibu Nadia Pratama",
      advisorName: "Rina Kartika, CFP®",
      hospitalAnnualLimit: 150_000_000,
      criticalIllnessUP: 100_000_000,
      lifeInsuranceUP: 300_000_000,
      debtAndEducationNeed: 950_000_000,
      monthlyIncome: 18_000_000,
      recoveryMonths: 12,
      familyLivingYears: 5,
      medicalInflationRate: 12,
      baseMajorMedicalCost: 550_000_000,
    },
  },
  proteksiOptimal: {
    label: "Proteksi Optimal",
    badge: "Portofolio Ideal",
    description: "Simulasi struktur polis yang sudah terkalibrasi rapi",
    data: {
      clientName: "Bpk. Dimas Saputra",
      advisorName: "Rina Kartika, CFP®",
      hospitalAnnualLimit: 2_000_000_000,
      criticalIllnessUP: 900_000_000,
      lifeInsuranceUP: 3_500_000_000,
      debtAndEducationNeed: 1_500_000_000,
      monthlyIncome: 35_000_000,
      recoveryMonths: 24,
      familyLivingYears: 5,
      medicalInflationRate: 12,
      baseMajorMedicalCost: 650_000_000,
    },
  },
};

// ============================================================================
// HELPER FORMATTING RUPIAH INDONESIA
// ============================================================================

function formatRupiah(amount) {
  const safe = Math.max(0, Math.round(Number(amount) || 0));
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(safe);
}

function formatRupiahCompact(amount) {
  const safe = Math.max(0, Number(amount) || 0);
  if (safe >= 1_000_000_000) {
    const val = safe / 1_000_000_000;
    return `Rp ${val.toLocaleString("id-ID", {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })} M`;
  }
  if (safe >= 1_000_000) {
    const val = safe / 1_000_000;
    return `Rp ${val.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })} Jt`;
  }
  return formatRupiah(safe);
}

function parseRupiahInput(raw) {
  const digits = String(raw).replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

// ============================================================================
// KOMPONEN INPUT RUPIAH MINIMALIS GAYA CUPERTINO
// ============================================================================

function AppleCurrencyInput({
  label,
  helper,
  value,
  onChange,
  quickAdds,
  categoryTag,
}) {
  const formattedDisplay =
    value === 0
      ? ""
      : new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(
          value
        );

  return (
    <div className="group rounded-2xl border border-black/[0.06] bg-[#F5F5F7]/75 p-4 transition-all duration-200 focus-within:border-[#0071E3] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0071E3]/10">
      <div className="mb-2 flex items-center justify-between gap-2">
        <label className="text-[13px] font-semibold tracking-[-0.01em] text-[#1D1D1F]">
          {label}
        </label>
        {categoryTag && (
          <span className="shrink-0 rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#6E6E73]">
            {categoryTag}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5 text-sm font-semibold text-[#86868B]">
          Rp
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={formattedDisplay}
          placeholder="0"
          onChange={(e) => onChange(parseRupiahInput(e.target.value))}
          className="w-full rounded-xl border border-black/[0.08] bg-white py-2.5 pr-3.5 pl-10 text-right text-[17px] font-semibold tabular-nums tracking-[-0.02em] text-[#1D1D1F] transition-colors placeholder:text-[#86868B]/50 focus:border-[#0071E3] focus:outline-none"
        />
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        {helper ? (
          <p className="text-[11px] leading-snug text-[#86868B]">{helper}</p>
        ) : (
          <span />
        )}
        {quickAdds && (
          <div className="flex items-center gap-1.5">
            {quickAdds.map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={() => onChange(Math.max(0, value + btn.amount))}
                className="rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[11px] font-medium text-[#1D1D1F] transition hover:border-[#0071E3] hover:text-[#0071E3] active:scale-95"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONEN PROGRESS BAR TERSEGMENTASI GAYA APPLE HEALTH / FITNESS
// ============================================================================

function AppleSegmentedBar({ ratio, dark = false }) {
  const segments = 24;
  const clampedRatio = Math.min(100, Math.max(0, ratio));
  const filledCount = Math.round((clampedRatio / 100) * segments);

  const activeColor =
    clampedRatio >= 95
      ? "bg-[#34C759]"
      : clampedRatio >= 60
      ? "bg-[#FF9F0A]"
      : "bg-[#0071E3]";

  const unfilledColor = dark ? "bg-[#FF3B30]/35" : "bg-[#FF3B30]/20";

  return (
    <div className="grid grid-cols-24 gap-1" role="progressbar" aria-valuenow={clampedRatio} aria-valuemin={0} aria-valuemax={100}>
      {Array.from({ length: segments }, (_, idx) => (
        <span
          key={idx}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            idx < filledCount ? activeColor : unfilledColor
          }`}
        />
      ))}
    </div>
  );
}

// ============================================================================
// KOMPONEN GRAFIK PROYEKSI INFLASI MEDIS 5 TAHUN (INTERAKTIF SVG / APPLE STAGE)
// ============================================================================

function AppleMedicalInflationChart({
  currentLimit,
  baseMedicalCost,
  inflationRate,
}) {
  const [selectedIdx, setSelectedIdx] = useState(5);
  const currentYear = 2026;

  const years = useMemo(
    () =>
      Array.from({ length: 6 }, (_, idx) => {
        const projectedCost = Math.round(
          baseMedicalCost * Math.pow(1 + inflationRate / 100, idx)
        );
        const covered = Math.min(projectedCost, currentLimit);
        const outOfPocket = Math.max(0, projectedCost - currentLimit);
        return {
          idx,
          year: currentYear + idx,
          label: idx === 0 ? "Saat Ini" : `Thn +${idx}`,
          projectedCost,
          covered,
          outOfPocket,
        };
      }),
    [baseMedicalCost, inflationRate, currentLimit]
  );

  const activePoint = years[selectedIdx] || years[5];

  const maxVal = Math.max(
    currentLimit * 1.15,
    years[years.length - 1].projectedCost * 1.18,
    100_000_000
  );

  const limitPercent = Math.min(95, Math.max(4, (currentLimit / maxVal) * 100));

  return (
    <div className="mt-6 rounded-[24px] bg-[#F5F5F7] p-5 sm:p-7">
      {/* Header Grafik & Legenda */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#0071E3]" />
            <h4 className="text-[15px] font-semibold tracking-[-0.015em] text-[#1D1D1F]">
              Proyeksi Biaya Tindakan Medis Mayor (2026 – 2031)
            </h4>
          </div>
          <p className="mt-1 text-xs text-[#6E6E73]">
            Ketuk tahun pada grafik untuk melihat simulasi selisih biaya dengan
            asumsi inflasi medis {inflationRate}% per tahun.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-[#6E6E73]">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#34C759]" />
            Ditanggung Polis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF3B30]" />
            Risiko Nombok Pribadi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 border-t-2 border-dashed border-[#0071E3]" />
            Plafon Polis
          </span>
        </div>
      </div>

      {/* Stage Grafik Batang Apple */}
      <div className="mt-6 rounded-2xl border border-black/[0.05] bg-white px-3 pt-8 pb-4 sm:px-7">
        <div className="relative h-48 w-full">
          {/* Garis Horizontal Batas Limit Polis */}
          <div
            style={{ bottom: `${limitPercent}%` }}
            className="pointer-events-none absolute inset-x-0 z-10 flex items-center justify-between border-t border-dashed border-[#0071E3] transition-all duration-300"
          >
            <span className="-mt-6 rounded-full bg-[#0071E3] px-2.5 py-0.5 text-[10px] font-semibold tabular-nums text-white">
              Limit Polis: {formatRupiahCompact(currentLimit)}
            </span>
          </div>

          <div className="grid h-full grid-cols-6 items-end gap-2 sm:gap-5">
            {years.map((item) => {
              const totalHeightPct = Math.min(
                100,
                (item.projectedCost / maxVal) * 100
              );
              const coveredRatioInBar =
                item.projectedCost > 0
                  ? (item.covered / item.projectedCost) * 100
                  : 100;
              const gapRatioInBar = 100 - coveredRatioInBar;
              const isSelected = item.idx === selectedIdx;

              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => setSelectedIdx(item.idx)}
                  className="group flex h-full flex-col items-center justify-end focus:outline-none"
                >
                  <span
                    className={`mb-1.5 text-center text-[10px] font-semibold tabular-nums transition-colors sm:text-[11px] ${
                      isSelected ? "text-[#0071E3]" : "text-[#6E6E73]"
                    }`}
                  >
                    {formatRupiahCompact(item.projectedCost)}
                  </span>

                  <div
                    style={{ height: `${Math.max(8, totalHeightPct)}%` }}
                    className={`flex w-full max-w-[46px] flex-col overflow-hidden rounded-t-xl transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-[#0071E3] ring-offset-2"
                        : "opacity-90 group-hover:opacity-100"
                    }`}
                  >
                    {gapRatioInBar > 0 && (
                      <div
                        style={{ height: `${gapRatioInBar}%` }}
                        className="w-full bg-[#FF3B30] transition-all duration-300"
                      />
                    )}
                    <div
                      style={{ height: `${coveredRatioInBar}%` }}
                      className="w-full bg-[#34C759] transition-all duration-300"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sumbu X Tahun */}
        <div className="mt-2.5 grid grid-cols-6 gap-2 border-t border-black/[0.06] pt-2.5 sm:gap-5">
          {years.map((item) => {
            const isSelected = item.idx === selectedIdx;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setSelectedIdx(item.idx)}
                className="text-center focus:outline-none"
              >
                <div
                  className={`text-xs font-semibold tabular-nums ${
                    isSelected ? "text-[#0071E3]" : "text-[#1D1D1F]"
                  }`}
                >
                  {item.year}
                </div>
                <div className="text-[10px] text-[#86868B]">{item.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ringkasan Interaktif Tahun Terpilih */}
      <div className="mt-4 flex flex-col justify-between gap-3 rounded-2xl border border-black/[0.05] bg-white px-4 py-3.5 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6E6E73]">
          <span>
            Simulasi Tahun{" "}
            <strong className="font-semibold text-[#1D1D1F]">
              {activePoint.year} ({activePoint.label})
            </strong>
          </span>
          <span>•</span>
          <span>
            Estimasi Biaya RS:{" "}
            <strong className="font-semibold tabular-nums text-[#1D1D1F]">
              {formatRupiah(activePoint.projectedCost)}
            </strong>
          </span>
        </div>

        <div>
          {activePoint.outOfPocket > 0 ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF3B30]/10 px-3 py-1 text-xs font-semibold tabular-nums text-[#FF3B30]">
              Potensi Nombok: {formatRupiah(activePoint.outOfPocket)}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#34C759]/15 px-3 py-1 text-xs font-semibold text-[#248A3D]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Limit Polis Mencukupi
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONEN UTAMA: POLICY GAP & RISK AUDITOR (CUPERTINO EDITION)
// ============================================================================

export default function PolicyGapAuditor() {
  const [inputs, setInputs] = useState(PRESET_SCENARIOS.keluargaMapan.data);
  const [activeTab, setActiveTab] = useState("audit");
  const [showAdvancedParams, setShowAdvancedParams] = useState(false);
  const [scenarioMenuOpen, setScenarioMenuOpen] = useState(false);
  const [copiedWA, setCopiedWA] = useState(false);

  const updateField = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const scrollToSection = (elementId) => {
    setActiveTab("audit");
    setScenarioMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  // ==========================================================================
  // PERHITUNGAN BENCHMARK FINANSIAL & 3 CELAH PROTEKSI UTAMA
  // ==========================================================================
  const analysis = useMemo(() => {
    // 1. Pilar 01: Income Replacement Masa Pemulihan Penyakit Kritis (1–2 Tahun)
    const idealCriticalIllness = inputs.monthlyIncome * inputs.recoveryMonths;
    const gapCriticalIllness = Math.max(
      0,
      idealCriticalIllness - inputs.criticalIllnessUP
    );
    const ratioCI =
      idealCriticalIllness > 0
        ? Math.round((inputs.criticalIllnessUP / idealCriticalIllness) * 100)
        : 100;

    // 2. Pilar 02: Kecukupan UP Jiwa (Pelunasan Utang/Pendidikan + Biaya Hidup Keluarga)
    const familyLivingBuffer =
      inputs.monthlyIncome * 12 * inputs.familyLivingYears;
    const idealLifeInsurance = inputs.debtAndEducationNeed + familyLivingBuffer;
    const gapLifeInsurance = Math.max(
      0,
      idealLifeInsurance - inputs.lifeInsuranceUP
    );
    const ratioLife =
      idealLifeInsurance > 0
        ? Math.round((inputs.lifeInsuranceUP / idealLifeInsurance) * 100)
        : 100;

    // 3. Pilar 03: Risiko Nombok Selisih Biaya RS Akibat Inflasi Medis (Proyeksi 5 Tahun)
    const projected5YrMedicalNeed = Math.round(
      inputs.baseMajorMedicalCost *
        Math.pow(1 + inputs.medicalInflationRate / 100, 5)
    );
    const gapMedicalInflation = Math.max(
      0,
      projected5YrMedicalNeed - inputs.hospitalAnnualLimit
    );
    const ratioMedical =
      projected5YrMedicalNeed > 0
        ? Math.round(
            (inputs.hospitalAnnualLimit / projected5YrMedicalNeed) * 100
          )
        : 100;

    const getStatus = (ratio) => {
      if (ratio >= 95) return { status: "aman", label: "Terproteksi Baik" };
      if (ratio >= 60) return { status: "waspada", label: "Perlu Penyesuaian" };
      return { status: "kritis", label: "Celah Proteksi Kritis" };
    };

    const ciStatus = getStatus(ratioCI);
    const lifeStatus = getStatus(ratioLife);
    const medStatus = getStatus(ratioMedical);

    const gaps = [
      {
        id: "critical-illness",
        pillarNumber: "01",
        title: "Dana Pengganti Penghasilan",
        headline: "Masa Pemulihan Penyakit Kritis.",
        shortTitle: "Income Replacement Penyakit Kritis",
        existing: inputs.criticalIllnessUP,
        benchmark: idealCriticalIllness,
        gap: gapCriticalIllness,
        coverageRatio: ratioCI,
        status: ciStatus.status,
        statusLabel: ciStatus.label,
        benchmarkNote: `${inputs.recoveryMonths} bln × ${formatRupiahCompact(
          inputs.monthlyIncome
        )}/bln`,
        insight:
          gapCriticalIllness > 0
            ? `Asuransi kesehatan hanya membayar tagihan ke rumah sakit. Selama ${inputs.recoveryMonths} bulan masa pemulihan tanpa bekerja optimal, keluarga membutuhkan dana tunai tambahan sebesar ${formatRupiah(
                gapCriticalIllness
              )} agar arus kas harian tetap berjalan normal.`
            : "UP Penyakit Kritis telah memadai untuk menopang biaya hidup keluarga selama seluruh masa pemulihan.",
      },
      {
        id: "life-inheritance",
        pillarNumber: "02",
        title: "Uang Pertanggungan Jiwa",
        headline: "Pelunasan Cicilan & Pendidikan Anak.",
        shortTitle: "UP Jiwa & Jaminan Masa Depan Anak",
        existing: inputs.lifeInsuranceUP,
        benchmark: idealLifeInsurance,
        gap: gapLifeInsurance,
        coverageRatio: ratioLife,
        status: lifeStatus.status,
        statusLabel: lifeStatus.label,
        benchmarkNote: `Utang & Kuliah (${formatRupiahCompact(
          inputs.debtAndEducationNeed
        )}) + Biaya Hidup ${inputs.familyLivingYears} Thn (${formatRupiahCompact(
          familyLivingBuffer
        )})`,
        insight:
          gapLifeInsurance > 0
            ? `Apabila pencari nafkah utama tutup usia, santunan polis eksisting masih menyisakan beban defisit sebesar ${formatRupiah(
                gapLifeInsurance
              )} untuk melunasi sisa cicilan serta menjamin dana pendidikan dan biaya hidup keluarga.`
            : "Nilai UP Jiwa sudah mencukupi untuk melunasi seluruh kewajiban utang serta menjamin biaya kuliah anak.",
      },
      {
        id: "medical-inflation",
        pillarNumber: "03",
        title: "Ketahanan Limit Rumah Sakit",
        headline: "Antisipasi Lonjakan Inflasi Medis.",
        shortTitle: "Proteksi Tagihan RS & Inflasi Medis",
        existing: inputs.hospitalAnnualLimit,
        benchmark: projected5YrMedicalNeed,
        gap: gapMedicalInflation,
        coverageRatio: ratioMedical,
        status: medStatus.status,
        statusLabel: medStatus.label,
        benchmarkNote: `Tindakan mayor ${formatRupiahCompact(
          inputs.baseMajorMedicalCost
        )} + inflasi medis ${inputs.medicalInflationRate}%/thn (5 tahun)`,
        insight:
          gapMedicalInflation > 0
            ? `Dengan laju inflasi medis ${inputs.medicalInflationRate}% per tahun, limit kamar dan tahunan saat ini berisiko terlampaui dalam 3–5 tahun mendatang, menciptakan potensi nombok pribadi hingga ${formatRupiah(
                gapMedicalInflation
              )}.`
            : "Plafon tahunan rumah sakit memiliki ruang perlindungan yang sangat kuat terhadap inflasi biaya medis 5 tahun ke depan.",
      },
    ];

    const totalBenchmark =
      idealCriticalIllness + idealLifeInsurance + projected5YrMedicalNeed;
    const totalGap =
      gapCriticalIllness + gapLifeInsurance + gapMedicalInflation;

    const cappedScore = Math.round(
      Math.min(100, ratioCI) * 0.35 +
        Math.min(100, ratioLife) * 0.4 +
        Math.min(100, ratioMedical) * 0.25
    );

    const priorityActions = [...gaps]
      .filter((g) => g.gap > 0)
      .sort((a, b) => b.gap - a.gap);

    return {
      gaps,
      totalBenchmark,
      totalGap,
      cappedScore,
      familyLivingBuffer,
      projected5YrMedicalNeed,
      priorityActions,
    };
  }, [inputs]);

  // ==========================================================================
  // SALIN RINGKASAN UNTUK WHATSAPP KLIEN
  // ==========================================================================
  const handleCopyWhatsApp = async () => {
    const todayStr = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const lines = [
      `*RINGKASAN AUDIT PROTEKSI FINANSIAL*`,
      `Klien: *${inputs.clientName || "Bapak/Ibu"}*`,
      `Tanggal Audit: ${todayStr}`,
      `Skor Kesiapan Proteksi: *${analysis.cappedScore}/100*`,
      ``,
      `*1. Dana Pengganti Penghasilan (Penyakit Kritis ${inputs.recoveryMonths} Bln)*`,
      `• Polis Saat Ini: ${formatRupiah(inputs.criticalIllnessUP)}`,
      `• Kebutuhan Ideal: ${formatRupiah(analysis.gaps[0].benchmark)}`,
      `• Celah Proteksi: *${formatRupiah(analysis.gaps[0].gap)}*`,
      ``,
      `*2. Uang Pertanggungan Jiwa & Warisan*`,
      `• Polis Saat Ini: ${formatRupiah(inputs.lifeInsuranceUP)}`,
      `• Kebutuhan Ideal: ${formatRupiah(analysis.gaps[1].benchmark)}`,
      `• Celah Proteksi: *${formatRupiah(analysis.gaps[1].gap)}*`,
      ``,
      `*3. Ketahanan Limit RS (Proyeksi Inflasi Medis ${inputs.medicalInflationRate}%/thn)*`,
      `• Limit Saat Ini: ${formatRupiah(inputs.hospitalAnnualLimit)}`,
      `• Proyeksi Kebutuhan 5 Thn: ${formatRupiah(analysis.gaps[2].benchmark)}`,
      `• Risiko Nombok: *${formatRupiah(analysis.gaps[2].gap)}*`,
      ``,
      `Total Akumulasi Celah Proteksi: *${formatRupiah(analysis.totalGap)}*`,
      `Disiapkan oleh: ${inputs.advisorName || "Konsultan Finansial"}`,
    ];

    const textToCopy = lines.join("\n");

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedWA(true);
      setTimeout(() => setCopiedWA(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        setCopiedWA(true);
        setTimeout(() => setCopiedWA(false), 2500);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const formattedAuditDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Parameter cincin Apple Watch Activity Readiness Ring
  const ringRadius = 46;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset =
    ringCircumference - (ringCircumference * analysis.cappedScore) / 100;
  const ringStrokeColor =
    analysis.cappedScore >= 85
      ? "#34C759"
      : analysis.cappedScore >= 55
      ? "#FF9F0A"
      : "#FF3B30";

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif',
      }}
      className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] antialiased selection:bg-[#0071E3]/15 selection:text-[#0071E3]"
    >
      {/* Print Styles untuk Cetak / Simpan PDF Bersih */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
          body {
            background: #ffffff !important;
            color: #1D1D1F !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            border: 1px solid #d2d2d7 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* ====================================================================
          APPLE-STYLE FROSTED GLOBAL NAVIGATION BAR (h-12)
      ==================================================================== */}
      <header className="no-print sticky top-0 z-40 h-12 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4 sm:px-6">
          {/* Brand Emblem Minimalis */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("audit");
              setScenarioMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <svg
              className="h-4 w-4 text-[#1D1D1F]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2L4 5.5v6.2c0 5.25 3.41 10.16 8 11.3 4.59-1.14 8-6.05 8-11.3V5.5L12 2zm0 4.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zm0 11.6c-2.3 0-4.32-1.18-5.48-2.96.03-1.82 3.65-2.82 5.48-2.82 1.82 0 5.45 1 5.48 2.82A6.56 6.56 0 0112 17.8z" />
            </svg>
            <span className="text-xs font-semibold tracking-[-0.01em] text-[#1D1D1F]">
              Policy Auditor
            </span>
          </button>

          {/* Centered Clean Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-7">
            <button
              type="button"
              onClick={() => scrollToSection("input-polis")}
              className={`text-xs font-normal tracking-[-0.01em] transition-colors ${
                activeTab === "audit" && !scenarioMenuOpen
                  ? "font-medium text-[#1D1D1F]"
                  : "text-[#1D1D1F]/75 hover:text-[#1D1D1F]"
              }`}
            >
              Audit Polis
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("simulasi-inflasi")}
              className="hidden text-xs font-normal tracking-[-0.01em] text-[#1D1D1F]/75 transition-colors hover:text-[#1D1D1F] sm:inline-block"
            >
              Simulasi Inflasi
            </button>

            <button
              type="button"
              onClick={() => setScenarioMenuOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 text-xs tracking-[-0.01em] transition-colors ${
                scenarioMenuOpen
                  ? "font-medium text-[#0071E3]"
                  : "font-normal text-[#1D1D1F]/75 hover:text-[#1D1D1F]"
              }`}
            >
              <span>Skenario Klien</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${
                  scenarioMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("summary");
                setScenarioMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`text-xs tracking-[-0.01em] transition-colors ${
                activeTab === "summary"
                  ? "font-semibold text-[#0071E3]"
                  : "font-normal text-[#1D1D1F]/75 hover:text-[#1D1D1F]"
              }`}
            >
              Ringkasan Audit
            </button>
          </nav>

          {/* Status Pill Kanan */}
          <div className="hidden items-center sm:flex">
            <span className="text-[11px] font-medium text-[#86868B]">
              ID • Konsultasi
            </span>
          </div>
        </div>

        {/* ==================================================================
            APPLE-STYLE FROSTED MEGA-DROPDOWN PANEL (SKENARIO KLIEN)
        ================================================================== */}
        {scenarioMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <div
              onClick={() => setScenarioMenuOpen(false)}
              className="fixed inset-x-0 top-12 bottom-0 z-30 bg-black/20 backdrop-blur-md transition-opacity"
            />

            {/* Dropdown Panel */}
            <div className="relative z-40 border-b border-black/[0.08] bg-white/95 backdrop-blur-2xl">
              <div className="mx-auto max-w-5xl px-6 py-9 sm:px-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#86868B]">
                    Jelajahi Profil Klien
                  </span>
                  <button
                    type="button"
                    onClick={() => setScenarioMenuOpen(false)}
                    className="rounded-full p-1.5 text-[#86868B] transition hover:bg-black/5 hover:text-[#1D1D1F]"
                    aria-label="Tutup menu skenario"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
                  {/* Kolom Utama: Typographic Large Links ala Apple */}
                  <div className="space-y-3 sm:col-span-7">
                    {Object.entries(PRESET_SCENARIOS).map(([key, preset]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setInputs(preset.data);
                          setActiveTab("audit");
                          setScenarioMenuOpen(false);
                        }}
                        className="group flex w-full items-baseline justify-between text-left transition"
                      >
                        <span className="text-[22px] font-semibold tracking-[-0.025em] text-[#1D1D1F] transition-colors group-hover:text-[#0071E3] sm:text-[26px]">
                          {preset.label}
                        </span>
                        <span className="text-xs font-medium text-[#86868B] group-hover:text-[#0071E3]">
                          {preset.badge}
                        </span>
                      </button>
                    ))}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setInputs({
                            ...inputs,
                            hospitalAnnualLimit: 0,
                            criticalIllnessUP: 0,
                            lifeInsuranceUP: 0,
                            debtAndEducationNeed: 0,
                          });
                          setActiveTab("audit");
                          setScenarioMenuOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E6E73] transition hover:text-[#FF3B30]"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Kosongkan Semua Nominal Polis</span>
                      </button>
                    </div>
                  </div>

                  {/* Kolom Kanan: Opsi Parameter Cepat */}
                  <div className="border-t border-black/[0.06] pt-5 sm:col-span-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
                    <div className="mb-3 text-[11px] font-medium text-[#86868B]">
                      Kalibrasi Cepat
                    </div>
                    <ul className="space-y-2.5 text-xs font-semibold text-[#1D1D1F]">
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            updateField("recoveryMonths", 12);
                            setScenarioMenuOpen(false);
                          }}
                          className="transition hover:text-[#0071E3]"
                        >
                          Pemulihan Kritis: 12 Bulan (1 Tahun)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            updateField("recoveryMonths", 18);
                            setScenarioMenuOpen(false);
                          }}
                          className="transition hover:text-[#0071E3]"
                        >
                          Pemulihan Kritis: 18 Bulan (1,5 Tahun)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            updateField("recoveryMonths", 24);
                            setScenarioMenuOpen(false);
                          }}
                          className="transition hover:text-[#0071E3]"
                        >
                          Pemulihan Kritis: 24 Bulan (2 Tahun)
                        </button>
                      </li>
                      <li className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("summary");
                            setScenarioMenuOpen(false);
                          }}
                          className="inline-flex items-center gap-1 text-[#0071E3] hover:underline"
                        >
                          <span>Buka Lembar Ringkasan Audit</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* ====================================================================
          MAIN CONTENT FLOW
      ==================================================================== */}
      {activeTab === "audit" ? (
        <main className="space-y-4 pb-16">
          {/* ================================================================
              SECTION 1: HERO DIAGNOSTIC BANNER (PITCH-BLACK #000000 PRO TILE)
          ================================================================ */}
          <section className="w-full bg-[#000000] px-4 py-14 text-center text-[#F5F5F7] sm:px-6 sm:py-20">
            <div className="mx-auto max-w-4xl">
              {/* Badge Klien */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-[#86868B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0071E3]" />
                <span>Profil Audit:</span>
                <span className="font-semibold text-[#F5F5F7]">
                  {inputs.clientName || "Klien Konsultasi"}
                </span>
              </div>

              {/* Hero Display Headline ala Apple Pro */}
              <h1 className="text-[38px] leading-[1.06] font-semibold tracking-[-0.03em] text-[#F5F5F7] sm:text-[54px]">
                Audit Proteksi.
              </h1>
              <p className="mt-1.5 text-[21px] leading-[1.2] font-medium tracking-[-0.02em] text-[#86868B] sm:text-[26px]">
                Jauh lebih jelas.
              </p>

              {/* Signature Apple Pill CTA Buttons */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("summary");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#0077ED] active:scale-[0.98]"
                >
                  Lihat Ringkasan Audit
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("input-polis")}
                  className="rounded-full border border-[#0071E3] px-6 py-2.5 text-sm font-medium text-[#2997FF] transition hover:bg-[#0071E3] hover:text-white active:scale-[0.98]"
                >
                  Sesuaikan Data Polis
                </button>
              </div>

              {/* Stage Metrik Utama: Total Celah Proteksi + Apple Watch Activity Ring */}
              <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 items-center gap-6 rounded-[28px] border border-white/10 bg-[#111113] p-6 sm:grid-cols-12 sm:p-8">
                {/* Kiri: Total Akumulasi Celah Proteksi */}
                <div className="text-center sm:col-span-8 sm:text-left">
                  <span className="text-xs font-medium tracking-wide text-[#86868B]">
                    Total Akumulasi Celah Proteksi
                  </span>
                  <div
                    className={`mt-1.5 text-[32px] leading-tight font-semibold tabular-nums tracking-[-0.03em] sm:text-[42px] ${
                      analysis.totalGap > 0
                        ? "text-[#F5F5F7]"
                        : "text-[#34C759]"
                    }`}
                  >
                    {formatRupiah(analysis.totalGap)}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#86868B] sm:text-[13px]">
                    {analysis.totalGap > 0
                      ? "Selisih antara manfaat polis eksisting dengan standar ketahanan finansial ideal keluarga Anda."
                      : "Seluruh pos risiko utama telah terlindungi secara optimal sesuai benchmark."}
                  </p>
                </div>

                {/* Kanan: Apple Watch Style Circular Readiness Ring */}
                <div className="flex flex-col items-center justify-center border-t border-white/10 pt-5 sm:col-span-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                  <div className="relative flex h-28 w-28 items-center justify-center">
                    <svg
                      className="h-28 w-28 -rotate-90"
                      viewBox="0 0 112 112"
                    >
                      <circle
                        cx="56"
                        cy="56"
                        r={ringRadius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r={ringRadius}
                        stroke={ringStrokeColor}
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={ringCircumference}
                        strokeDashoffset={ringOffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="block text-2xl font-semibold tabular-nums tracking-[-0.02em] text-[#F5F5F7]">
                        {analysis.cappedScore}%
                      </span>
                    </div>
                  </div>
                  <span className="mt-2 text-xs font-semibold text-[#F5F5F7]">
                    Skor Kesiapan
                  </span>
                  <span className="text-[11px] text-[#86868B]">
                    {analysis.cappedScore >= 85
                      ? "Proteksi Prima"
                      : analysis.cappedScore >= 55
                      ? "Perlu Penguatan"
                      : "Celah Signifikan"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 2: BENTO GRID — INPUT DATA POLIS & KEWAJIBAN KLIEN
          ================================================================ */}
          <section
            id="input-polis"
            className="mx-auto max-w-6xl scroll-mt-16 px-4 pt-4 sm:px-6"
          >
            <div className="rounded-[28px] border border-black/[0.06] bg-white p-6 sm:p-10">
              {/* Section Header */}
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold tracking-wide text-[#0071E3]">
                  Data Polis Eksisting
                </span>
                <h2 className="mt-1 text-[28px] leading-[1.12] font-semibold tracking-[-0.025em] text-[#1D1D1F] sm:text-[36px]">
                  Masukkan detail polis saat ini.
                </h2>
                <p className="mt-2 text-sm text-[#6E6E73] sm:text-[17px]">
                  Seluruh perbandingan benchmark dan proyeksi risiko diperbarui
                  secara langsung.
                </p>
              </div>

              {/* Identitas Klien & Konsultan */}
              <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/[0.06] bg-[#F5F5F7]/75 px-4 py-3">
                  <label className="block text-[11px] font-medium text-[#86868B]">
                    Nama Klien
                  </label>
                  <input
                    type="text"
                    value={inputs.clientName}
                    onChange={(e) => updateField("clientName", e.target.value)}
                    placeholder="Contoh: Bpk. Hendra Wijaya"
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none"
                  />
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-[#F5F5F7]/75 px-4 py-3">
                  <label className="block text-[11px] font-medium text-[#86868B]">
                    Konsultan Finansial
                  </label>
                  <input
                    type="text"
                    value={inputs.advisorName}
                    onChange={(e) => updateField("advisorName", e.target.value)}
                    placeholder="Nama Konsultan"
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none"
                  />
                </div>
              </div>

              {/* 4 Input Utama Polis & Tanggungan dalam Grid 2x2 Bersih */}
              <div className="mx-auto mt-4 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
                <AppleCurrencyInput
                  label="1. Limit Kamar Rumah Sakit / Tahunan (Rp)"
                  categoryTag="Kesehatan"
                  helper="Plafon tahunan rawat inap polis saat ini"
                  value={inputs.hospitalAnnualLimit}
                  onChange={(v) => updateField("hospitalAnnualLimit", v)}
                  quickAdds={[
                    { label: "+100 Jt", amount: 100_000_000 },
                    { label: "+500 Jt", amount: 500_000_000 },
                  ]}
                />

                <AppleCurrencyInput
                  label="2. Uang Pertanggungan (UP) Penyakit Kritis (Rp)"
                  categoryTag="Critical Illness"
                  helper="Santunan tunai saat terdiagnosis penyakit kritis"
                  value={inputs.criticalIllnessUP}
                  onChange={(v) => updateField("criticalIllnessUP", v)}
                  quickAdds={[
                    { label: "+100 Jt", amount: 100_000_000 },
                    { label: "+250 Jt", amount: 250_000_000 },
                  ]}
                />

                <AppleCurrencyInput
                  label="3. Uang Pertanggungan (UP) Jiwa / Warisan (Rp)"
                  categoryTag="Jiwa"
                  helper="Santunan meninggal dunia untuk ahli waris"
                  value={inputs.lifeInsuranceUP}
                  onChange={(v) => updateField("lifeInsuranceUP", v)}
                  quickAdds={[
                    { label: "+250 Jt", amount: 250_000_000 },
                    { label: "+500 Jt", amount: 500_000_000 },
                  ]}
                />

                <AppleCurrencyInput
                  label="4. Total Utang/Cicilan & Biaya Pendidikan Anak (Rp)"
                  categoryTag="Kewajiban"
                  helper="Sisa KPR/kredit + estimasi dana kuliah anak"
                  value={inputs.debtAndEducationNeed}
                  onChange={(v) => updateField("debtAndEducationNeed", v)}
                  quickAdds={[
                    { label: "+250 Jt", amount: 250_000_000 },
                    { label: "+500 Jt", amount: 500_000_000 },
                  ]}
                />
              </div>

              {/* Input Penghasilan Bulanan & Drawer Parameter Benchmark */}
              <div className="mx-auto mt-4 max-w-4xl">
                <AppleCurrencyInput
                  label="Penghasilan / Biaya Hidup Keluarga per Bulan (Rp)"
                  categoryTag="Acuan Arus Kas"
                  helper="Dasar perhitungan dana pengganti penghasilan saat pemulihan"
                  value={inputs.monthlyIncome}
                  onChange={(v) => updateField("monthlyIncome", v)}
                  quickAdds={[
                    { label: "+5 Jt", amount: 5_000_000 },
                    { label: "+10 Jt", amount: 10_000_000 },
                  ]}
                />

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedParams(!showAdvancedParams)}
                    className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-[#F5F5F7] px-4 py-2 text-xs font-medium text-[#1D1D1F] transition hover:border-[#0071E3] hover:text-[#0071E3]"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#0071E3]" />
                    <span>
                      {showAdvancedParams
                        ? "Tutup Parameter & Asumsi Benchmark"
                        : "Parameter & Asumsi Benchmark"}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        showAdvancedParams ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {showAdvancedParams && (
                  <div className="mt-4 grid grid-cols-1 gap-4 rounded-2xl border border-black/[0.06] bg-[#F5F5F7] p-5 md:grid-cols-2">
                    {/* Masa Pemulihan Penyakit Kritis */}
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-[#1D1D1F]">
                        Masa Pemulihan Penyakit Kritis
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[12, 18, 24].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => updateField("recoveryMonths", m)}
                            className={`rounded-full py-2 text-xs font-medium transition ${
                              inputs.recoveryMonths === m
                                ? "bg-[#0071E3] text-white"
                                : "border border-black/[0.08] bg-white text-[#1D1D1F] hover:border-[#0071E3]"
                            }`}
                          >
                            {m} Bulan
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Buffer Biaya Hidup Keluarga pada UP Jiwa */}
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-[#1D1D1F]">
                        Buffer Biaya Hidup Keluarga (UP Jiwa)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[0, 3, 5].map((yr) => (
                          <button
                            key={yr}
                            type="button"
                            onClick={() => updateField("familyLivingYears", yr)}
                            className={`rounded-full py-2 text-xs font-medium transition ${
                              inputs.familyLivingYears === yr
                                ? "bg-[#0071E3] text-white"
                                : "border border-black/[0.08] bg-white text-[#1D1D1F] hover:border-[#0071E3]"
                            }`}
                          >
                            {yr === 0 ? "Tanpa Buffer" : `${yr} Tahun`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slider Inflasi Medis */}
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#1D1D1F]">
                        <span>Asumsi Inflasi Medis Tahunan</span>
                        <span className="tabular-nums text-[#0071E3]">
                          {inputs.medicalInflationRate}% / tahun
                        </span>
                      </div>
                      <input
                        type="range"
                        min={8}
                        max={16}
                        step={1}
                        value={inputs.medicalInflationRate}
                        onChange={(e) =>
                          updateField(
                            "medicalInflationRate",
                            Number(e.target.value)
                          )
                        }
                        className="h-1.5 w-full cursor-pointer accent-[#0071E3]"
                      />
                      <div className="mt-1 flex justify-between text-[10px] text-[#86868B]">
                        <span>8% Konservatif</span>
                        <span>12% Rata-rata RI</span>
                        <span>16% Agresif</span>
                      </div>
                    </div>

                    {/* Estimasi Biaya Tindakan Medis Mayor */}
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-[#1D1D1F]">
                        Acuan Biaya Tindakan Medis Mayor Saat Ini
                      </label>
                      <div className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-white px-3.5 py-2">
                        <span className="text-xs font-semibold tabular-nums text-[#1D1D1F]">
                          {formatRupiah(inputs.baseMajorMedicalCost)}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateField(
                                "baseMajorMedicalCost",
                                Math.max(
                                  100_000_000,
                                  inputs.baseMajorMedicalCost - 100_000_000
                                )
                              )
                            }
                            className="rounded-full border border-black/10 px-2.5 py-0.5 text-[11px] font-medium hover:border-[#0071E3]"
                          >
                            -100 Jt
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateField(
                                "baseMajorMedicalCost",
                                inputs.baseMajorMedicalCost + 100_000_000
                              )
                            }
                            className="rounded-full border border-black/10 px-2.5 py-0.5 text-[11px] font-medium hover:border-[#0071E3]"
                          >
                            +100 Jt
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 3: BENTO GRID — 3 PILAR CELAH PROTEKSI (APPLE PROMO TILES)
          ================================================================ */}
          <section className="mx-auto max-w-6xl space-y-4 px-4 pt-2 sm:px-6">
            {/* 2-COLUMN BENTO ROW: PILAR 01 (LIGHT) & PILAR 02 (JET-BLACK PRO) */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* PILAR 01: DANA PENGGANTI PENGHASILAN (WHITE BENTO TILE) */}
              {(() => {
                const p1 = analysis.gaps[0];
                const badgeColor =
                  p1.status === "aman"
                    ? "bg-[#34C759]/15 text-[#248A3D]"
                    : p1.status === "waspada"
                    ? "bg-[#FF9F0A]/15 text-[#B25000]"
                    : "bg-[#FF3B30]/10 text-[#FF3B30]";

                return (
                  <article className="flex flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-6 sm:p-9">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86868B]">
                          <HeartPulse className="h-4 w-4 text-[#FF3B30]" />
                          <span>Pilar 01 • Penyakit Kritis</span>
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${badgeColor}`}
                        >
                          {p1.statusLabel}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[26px] leading-[1.12] font-semibold tracking-[-0.025em] text-[#1D1D1F] sm:text-[32px]">
                        {p1.title}.
                      </h3>
                      <p className="mt-1 text-base font-medium text-[#6E6E73]">
                        {p1.headline}
                      </p>
                      <p className="mt-1 text-xs text-[#86868B]">
                        Acuan: {p1.benchmarkNote}
                      </p>

                      {/* Angka Perbandingan */}
                      <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-[#F5F5F7] p-4">
                        <div>
                          <span className="block text-[11px] text-[#86868B]">
                            Polis Saat Ini
                          </span>
                          <span className="mt-0.5 block text-xs font-semibold tabular-nums text-[#1D1D1F] sm:text-sm">
                            {formatRupiahCompact(p1.existing)}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[11px] text-[#86868B]">
                            Ideal ({inputs.recoveryMonths} Bln)
                          </span>
                          <span className="mt-0.5 block text-xs font-semibold tabular-nums text-[#0071E3] sm:text-sm">
                            {formatRupiahCompact(p1.benchmark)}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[11px] text-[#86868B]">
                            Celah Proteksi
                          </span>
                          <span
                            className={`mt-0.5 block text-xs font-semibold tabular-nums sm:text-sm ${
                              p1.gap > 0 ? "text-[#FF3B30]" : "text-[#34C759]"
                            }`}
                          >
                            {p1.gap > 0
                              ? formatRupiahCompact(p1.gap)
                              : "Terpenuhi"}
                          </span>
                        </div>
                      </div>

                      {/* Segmented Progress Bar */}
                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs font-medium">
                          <span className="text-[#1D1D1F]">
                            Terproteksi {p1.coverageRatio}%
                          </span>
                          {p1.gap > 0 && (
                            <span className="tabular-nums text-[#FF3B30]">
                              Defisit {formatRupiah(p1.gap)}
                            </span>
                          )}
                        </div>
                        <AppleSegmentedBar ratio={p1.coverageRatio} />
                      </div>
                    </div>

                    <p className="mt-6 border-t border-black/[0.06] pt-4 text-xs leading-relaxed text-[#6E6E73]">
                      {p1.insight}
                    </p>
                  </article>
                );
              })()}

              {/* PILAR 02: KECUKUPAN UP JIWA & PENDIDIKAN ANAK (JET-BLACK #000000 TILE) */}
              {(() => {
                const p2 = analysis.gaps[1];
                const badgeColor =
                  p2.status === "aman"
                    ? "bg-[#34C759]/20 text-[#34C759]"
                    : p2.status === "waspada"
                    ? "bg-[#FF9F0A]/20 text-[#FF9F0A]"
                    : "bg-[#FF3B30]/20 text-[#FF453A]";

                return (
                  <article className="flex flex-col justify-between rounded-[28px] bg-[#000000] p-6 text-[#F5F5F7] sm:p-9">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86868B]">
                          <Umbrella className="h-4 w-4 text-[#2997FF]" />
                          <span>Pilar 02 • Jiwa & Warisan</span>
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${badgeColor}`}
                        >
                          {p2.statusLabel}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[26px] leading-[1.12] font-semibold tracking-[-0.025em] text-[#F5F5F7] sm:text-[32px]">
                        {p2.title}.
                      </h3>
                      <p className="mt-1 text-base font-medium text-[#86868B]">
                        {p2.headline}
                      </p>
                      <p className="mt-1 text-xs text-[#86868B]">
                        {p2.benchmarkNote}
                      </p>

                      {/* Angka Perbandingan Dark Mode */}
                      <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-[#1C1C1E] p-4">
                        <div>
                          <span className="block text-[11px] text-[#86868B]">
                            Polis Saat Ini
                          </span>
                          <span className="mt-0.5 block text-xs font-semibold tabular-nums text-[#F5F5F7] sm:text-sm">
                            {formatRupiahCompact(p2.existing)}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[11px] text-[#86868B]">
                            Kebutuhan Ideal
                          </span>
                          <span className="mt-0.5 block text-xs font-semibold tabular-nums text-[#2997FF] sm:text-sm">
                            {formatRupiahCompact(p2.benchmark)}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[11px] text-[#86868B]">
                            Celah Proteksi
                          </span>
                          <span
                            className={`mt-0.5 block text-xs font-semibold tabular-nums sm:text-sm ${
                              p2.gap > 0 ? "text-[#FF453A]" : "text-[#34C759]"
                            }`}
                          >
                            {p2.gap > 0
                              ? formatRupiahCompact(p2.gap)
                              : "Terpenuhi"}
                          </span>
                        </div>
                      </div>

                      {/* Segmented Progress Bar Dark */}
                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs font-medium">
                          <span className="text-[#F5F5F7]">
                            Terproteksi {p2.coverageRatio}%
                          </span>
                          {p2.gap > 0 && (
                            <span className="tabular-nums text-[#FF453A]">
                              Defisit {formatRupiah(p2.gap)}
                            </span>
                          )}
                        </div>
                        <AppleSegmentedBar ratio={p2.coverageRatio} dark />
                      </div>
                    </div>

                    <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#86868B]">
                      {p2.insight}
                    </p>
                  </article>
                );
              })()}
            </div>

            {/* FULL-WIDTH BENTO TILE: PILAR 03 — RISIKO NOMBOK INFLASI MEDIS */}
            {(() => {
              const p3 = analysis.gaps[2];
              const badgeColor =
                p3.status === "aman"
                  ? "bg-[#34C759]/15 text-[#248A3D]"
                  : p3.status === "waspada"
                  ? "bg-[#FF9F0A]/15 text-[#B25000]"
                  : "bg-[#FF3B30]/10 text-[#FF3B30]";

              return (
                <article
                  id="simulasi-inflasi"
                  className="scroll-mt-16 rounded-[28px] border border-black/[0.06] bg-white p-6 sm:p-10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[#0071E3]" />
                        <span className="text-xs font-semibold text-[#86868B]">
                          Pilar 03 • Kesehatan & Inflasi Medis
                        </span>
                      </div>
                      <h3 className="mt-3 text-[28px] leading-[1.1] font-semibold tracking-[-0.025em] text-[#1D1D1F] sm:text-[36px]">
                        {p3.title}.{" "}
                        <span className="text-[#6E6E73]">{p3.headline}</span>
                      </h3>
                      <p className="mt-1.5 text-xs text-[#86868B]">
                        {p3.benchmarkNote}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3.5 py-1 text-xs font-semibold ${badgeColor}`}
                    >
                      {p3.statusLabel} ({p3.coverageRatio}%)
                    </span>
                  </div>

                  {/* Ringkasan Angka 3 Kolom */}
                  <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl bg-[#F5F5F7] p-4 sm:grid-cols-3 sm:p-5">
                    <div>
                      <span className="block text-xs text-[#86868B]">
                        Limit Tahunan RS Saat Ini
                      </span>
                      <span className="mt-1 block text-lg font-semibold tabular-nums text-[#1D1D1F]">
                        {formatRupiah(p3.existing)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-[#86868B]">
                        Proyeksi Biaya RS 5 Tahun ({inputs.medicalInflationRate}
                        %/thn)
                      </span>
                      <span className="mt-1 block text-lg font-semibold tabular-nums text-[#0071E3]">
                        {formatRupiah(p3.benchmark)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-[#86868B]">
                        Risiko Nombok Selisih Biaya RS
                      </span>
                      <span
                        className={`mt-1 block text-lg font-semibold tabular-nums ${
                          p3.gap > 0 ? "text-[#FF3B30]" : "text-[#34C759]"
                        }`}
                      >
                        {p3.gap > 0
                          ? formatRupiah(p3.gap)
                          : "Rp 0 (Terlindungi)"}
                      </span>
                    </div>
                  </div>

                  {/* Segmented Bar */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs font-medium">
                      <span className="text-[#1D1D1F]">
                        Daya Tahan Limit Polis: {p3.coverageRatio}%
                      </span>
                      {p3.gap > 0 && (
                        <span className="tabular-nums text-[#FF3B30]">
                          Selisih Nombok Thn +5: {formatRupiah(p3.gap)}
                        </span>
                      )}
                    </div>
                    <AppleSegmentedBar ratio={p3.coverageRatio} />
                  </div>

                  {/* Grafik Proyeksi Inflasi Medis 5 Tahun */}
                  <AppleMedicalInflationChart
                    currentLimit={inputs.hospitalAnnualLimit}
                    baseMedicalCost={inputs.baseMajorMedicalCost}
                    inflationRate={inputs.medicalInflationRate}
                  />

                  <p className="mt-5 text-xs leading-relaxed text-[#6E6E73] sm:text-[13px]">
                    {p3.insight}
                  </p>
                </article>
              );
            })()}

            {/* BOTTOM EXECUTIVE CTA BANNER */}
            <div className="rounded-[28px] bg-[#000000] px-6 py-10 text-center text-[#F5F5F7] sm:px-10">
              <h3 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                Siap dibagikan kepada klien.
              </h3>
              <p className="mx-auto mt-2 max-w-lg text-sm text-[#86868B]">
                Tampilkan lembar Ringkasan Audit beresolusi tinggi di layar
                tablet, cetak PDF, atau kirim langsung via WhatsApp.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("summary");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#0077ED]"
                >
                  Buka Ringkasan Audit
                </button>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* ==================================================================
            VIEW 2: RINGKASAN AUDIT (EXECUTIVE TABLET PRESENTATION MODE)
        ================================================================== */
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          {/* Action Toolbar (Disembunyikan saat Cetak/PDF) */}
          <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("audit")}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#1D1D1F] transition hover:border-[#0071E3] hover:text-[#0071E3]"
            >
              <span>← Kembali ke Simulasi</span>
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyWhatsApp}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#1D1D1F] transition hover:border-[#34C759] hover:text-[#248A3D]"
              >
                {copiedWA ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#34C759]" />
                    <span className="text-[#248A3D]">Tersalin ke Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#6E6E73]" />
                    <span>Salin Ringkasan WhatsApp</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0071E3] px-5 py-2 text-xs font-medium text-white transition hover:bg-[#0077ED]"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </div>

          {/* LEMBAR LAPORAN AUDIT EKSEKUTIF */}
          <article className="print-container overflow-hidden rounded-[28px] border border-black/[0.06] bg-white">
            {/* Header Dokumen Hitam Pekat Apple Pro */}
            <div className="bg-[#000000] px-6 py-9 text-[#F5F5F7] sm:px-10">
              <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-7">
                <div>
                  <span className="text-xs font-medium text-[#86868B]">
                    Laporan Evaluasi Polis & Risiko Finansial
                  </span>
                  <h2 className="mt-1.5 text-[28px] leading-tight font-semibold tracking-[-0.03em] sm:text-[36px]">
                    Ringkasan Audit Proteksi.
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#1C1C1E] px-5 py-3 text-right">
                  <span className="block text-[11px] text-[#86868B]">
                    Skor Kesiapan
                  </span>
                  <span className="text-2xl font-semibold tabular-nums text-[#F5F5F7]">
                    {analysis.cappedScore}
                    <span className="text-sm font-normal text-[#86868B]">
                      /100
                    </span>
                  </span>
                </div>
              </div>

              {/* Metadata Klien */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
                <div>
                  <span className="block text-[#86868B]">Disiapkan Untuk</span>
                  <span className="mt-1 block font-semibold text-[#F5F5F7]">
                    {inputs.clientName || "Klien Konsultasi"}
                  </span>
                </div>
                <div>
                  <span className="block text-[#86868B]">Konsultan</span>
                  <span className="mt-1 block font-semibold text-[#F5F5F7]">
                    {inputs.advisorName || "Financial Risk Advisor"}
                  </span>
                </div>
                <div>
                  <span className="block text-[#86868B]">Tanggal Audit</span>
                  <span className="mt-1 block font-semibold text-[#F5F5F7]">
                    {formattedAuditDate}
                  </span>
                </div>
                <div>
                  <span className="block text-[#86868B]">
                    Total Celah Proteksi
                  </span>
                  <span className="mt-1 block font-semibold tabular-nums text-[#FF453A]">
                    {formatRupiah(analysis.totalGap)}
                  </span>
                </div>
              </div>
            </div>

            {/* Body Laporan */}
            <div className="space-y-8 p-6 sm:p-10">
              {/* I. Parameter Acuan Finansial */}
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wide text-[#86868B]">
                  I. Parameter Acuan Finansial Klien
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#F5F5F7] p-4">
                    <span className="text-[11px] text-[#86868B]">
                      Penghasilan / Biaya Hidup Bulanan
                    </span>
                    <div className="mt-1 text-sm font-semibold tabular-nums text-[#1D1D1F]">
                      {formatRupiah(inputs.monthlyIncome)} / bln
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#F5F5F7] p-4">
                    <span className="text-[11px] text-[#86868B]">
                      Tanggungan Utang & Dana Pendidikan
                    </span>
                    <div className="mt-1 text-sm font-semibold tabular-nums text-[#1D1D1F]">
                      {formatRupiah(inputs.debtAndEducationNeed)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#F5F5F7] p-4">
                    <span className="text-[11px] text-[#86868B]">
                      Asumsi Inflasi Medis Tahunan
                    </span>
                    <div className="mt-1 text-sm font-semibold tabular-nums text-[#1D1D1F]">
                      {inputs.medicalInflationRate}% / thn (Proyeksi 5 Thn)
                    </div>
                  </div>
                </div>
              </div>

              {/* II. Matriks Audit Polis vs Benchmark */}
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wide text-[#86868B]">
                  II. Perbandingan Polis Eksisting vs Kebutuhan Ideal
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-black/[0.06]">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/[0.06] bg-[#F5F5F7] text-[#6E6E73]">
                        <th className="px-4 py-3.5 font-semibold">
                          Area Proteksi
                        </th>
                        <th className="px-4 py-3.5 text-right font-semibold">
                          Polis Saat Ini
                        </th>
                        <th className="px-4 py-3.5 text-right font-semibold">
                          Kebutuhan Ideal
                        </th>
                        <th className="px-4 py-3.5 text-right font-semibold">
                          Celah Proteksi
                        </th>
                        <th className="px-4 py-3.5 text-center font-semibold">
                          Rasio
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.06]">
                      {analysis.gaps.map((g) => (
                        <tr key={g.id}>
                          <td className="px-4 py-4">
                            <div className="font-semibold text-[#1D1D1F]">
                              {g.shortTitle}
                            </div>
                            <div className="mt-0.5 text-[11px] text-[#86868B]">
                              {g.benchmarkNote}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right font-medium tabular-nums text-[#1D1D1F]">
                            {formatRupiah(g.existing)}
                          </td>
                          <td className="px-4 py-4 text-right font-semibold tabular-nums text-[#0071E3]">
                            {formatRupiah(g.benchmark)}
                          </td>
                          <td
                            className={`px-4 py-4 text-right font-semibold tabular-nums ${
                              g.gap > 0 ? "text-[#FF3B30]" : "text-[#248A3D]"
                            }`}
                          >
                            {g.gap > 0 ? formatRupiah(g.gap) : "Rp 0 (Aman)"}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                                g.status === "aman"
                                  ? "bg-[#34C759]/15 text-[#248A3D]"
                                  : g.status === "waspada"
                                  ? "bg-[#FF9F0A]/15 text-[#B25000]"
                                  : "bg-[#FF3B30]/10 text-[#FF3B30]"
                              }`}
                            >
                              {g.coverageRatio}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-black/10 bg-[#F5F5F7] font-semibold text-[#1D1D1F]">
                        <td className="px-4 py-4" colSpan={3}>
                          Total Akumulasi Celah Proteksi yang Perlu Ditutup
                        </td>
                        <td className="px-4 py-4 text-right text-sm tabular-nums text-[#FF3B30]">
                          {formatRupiah(analysis.totalGap)}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* III. Rekomendasi Prioritas Penutupan Celah */}
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wide text-[#86868B]">
                  III. Rekomendasi Prioritas Penutupan Celah Risiko
                </h3>

                {analysis.priorityActions.length > 0 ? (
                  <div className="space-y-3">
                    {analysis.priorityActions.map((act, index) => (
                      <div
                        key={act.id}
                        className="flex items-start gap-3.5 rounded-2xl bg-[#F5F5F7] p-4 sm:p-5"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1D1D1F] text-[11px] font-semibold text-white">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold text-[#1D1D1F]">
                              {act.shortTitle}
                            </h4>
                            <span className="rounded-full bg-[#FF3B30]/10 px-3 py-0.5 text-xs font-semibold tabular-nums text-[#FF3B30]">
                              Rekomendasi: +{formatRupiah(act.gap)}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#6E6E73]">
                            {act.insight}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-2xl bg-[#34C759]/10 p-4 text-xs font-medium text-[#248A3D]">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-[#34C759]" />
                    <span>
                      Seluruh struktur manfaat polis klien saat ini telah
                      memenuhi standar perlindungan finansial yang
                      direkomendasikan.
                    </span>
                  </div>
                )}
              </div>

              {/* Footer Disclaimer */}
              <div className="border-t border-black/[0.06] pt-4 text-[11px] leading-relaxed text-[#86868B]">
                Catatan: Hasil audit ini merupakan simulasi edukasi perencanaan
                keuangan berdasarkan data yang disampaikan saat sesi konsultasi.
                Nilai proyeksi inflasi medis bersifat estimasi untuk membantu
                pemetaan kecukupan plafon perlindungan.
              </div>
            </div>
          </article>
        </main>
      )}
    </div>
  );
}
