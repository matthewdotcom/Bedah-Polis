import React, { useEffect, useState } from 'react';
import CekKetahananFinansial from './pages/CekKetahananFinansial';
import PolicyGapAuditor from './pages/PolicyGapAuditor';

type AppMode = 'ketahanan' | 'auditor';

function getInitialMode(): AppMode {
  if (typeof window === 'undefined') return 'ketahanan';
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  if (path.includes('auditor') || params.get('app') === 'auditor') {
    return 'auditor';
  }
  return 'ketahanan';
}

export default function App() {
  const [mode, setMode] = useState<AppMode>(getInitialMode);

  useEffect(() => {
    const handlePopState = () => {
      setMode(getInitialMode());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const switchMode = (nextMode: AppMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    const nextPath = nextMode === 'auditor' ? '/auditor' : '/';
    window.history.pushState({}, '', nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {mode === 'ketahanan' ? <CekKetahananFinansial /> : <PolicyGapAuditor />}

      {/* Floating Frosted Glass Switcher Pill (Tersembunyi otomatis saat Print/PDF) */}
      <div
        className="no-print fixed bottom-5 right-5 z-50 flex items-center gap-1 rounded-full border border-black/10 bg-white/85 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl"
        role="tablist"
        aria-label="Pilih Modul Aplikasi"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'ketahanan'}
          onClick={() => switchMode('ketahanan')}
          className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[-0.01em] transition-all ${
            mode === 'ketahanan'
              ? 'bg-[#1D1D1F] text-white shadow-xs'
              : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          Cek Ketahanan
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'auditor'}
          onClick={() => switchMode('auditor')}
          className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[-0.01em] transition-all ${
            mode === 'auditor'
              ? 'bg-[#0071E3] text-white shadow-xs'
              : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          Policy Auditor
        </button>
      </div>
    </>
  );
}
