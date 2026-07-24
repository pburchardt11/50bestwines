'use client';

import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'it', label: 'Italian', flag: '🇮🇹' },
  { code: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', label: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'th', label: 'Thai', flag: '🇹🇭' },
  { code: 'vi', label: 'Vietnamese', flag: '🇻🇳' },
  { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  { code: 'nl', label: 'Dutch', flag: '🇳🇱' },
  { code: 'pl', label: 'Polish', flag: '🇵🇱' },
  { code: 'sv', label: 'Swedish', flag: '🇸🇪' },
  { code: 'da', label: 'Danish', flag: '🇩🇰' },
  { code: 'no', label: 'Norwegian', flag: '🇳🇴' },
  { code: 'fi', label: 'Finnish', flag: '🇫🇮' },
  { code: 'id', label: 'Indonesian', flag: '🇮🇩' },
  { code: 'cs', label: 'Czech', flag: '🇨🇿' },
];

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name: string): string {
  const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return v ? v.pop()! : '';
}

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('preferredLang');
    if (saved) {
      setCurrentLang(saved);
    } else {
      const googtrans = getCookie('googtrans');
      if (googtrans) {
        const lang = googtrans.split('/').pop();
        if (lang) setCurrentLang(lang);
      }
    }
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function switchLanguage(langCode: string) {
    setCurrentLang(langCode);
    localStorage.setItem('preferredLang', langCode);
    setIsOpen(false);

    if (langCode === 'en') {
      setCookie('googtrans', '', -1);
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
      window.location.reload();
    } else {
      setCookie('googtrans', `/en/${langCode}`, 365);
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname}`;
      window.location.reload();
    }
  }

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-[9999]">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-72 rounded-xl border border-card-border bg-[#111] p-4 shadow-2xl">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text/40">
            Select Language
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-wine/10 ${
                  lang.code === currentLang
                    ? 'bg-wine/10 text-wine'
                    : 'text-text/70'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="truncate">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-card-border bg-[#111] text-xl shadow-lg transition-all hover:border-wine/40 hover:shadow-wine/10"
        aria-label="Change language"
        title="Change language"
      >
        {current.flag}
      </button>
    </div>
  );
}
