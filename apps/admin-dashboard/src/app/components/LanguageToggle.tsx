'use client';

import { useI18n } from '../i18n';

export default function LanguageToggle() {
  const { lang, toggleLang } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-[#8FAF9A] text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-[#7A9988] transition"
      aria-label="Toggle language"
    >
      {lang === 'en' ? 'PT-BR' : 'EN'}
    </button>
  );
}
