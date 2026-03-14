'use client';

import { useI18n } from '../i18n';

export default function HoneymoonPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">{t('honeymoon.page_title')}</h1>
        <p className="text-[#6B6B6B] mb-8">{t('honeymoon.page_subtitle')}</p>

        <div className="grid md:grid-cols-2 gap-6">
      <div className="wedding-card">
        <h3 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">{t('honeymoon.activities_title')}</h3>
        <p className="text-[#6B6B6B] mb-6 leading-relaxed">
          {t('honeymoon.activities_body')}
        </p>
        <button className="wedding-button-primary">
          + {t('honeymoon.activities_add')}
        </button>
      </div>
      <div className="wedding-card">
        <h3 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">{t('honeymoon.fund_title')}</h3>
        <p className="text-[#6B6B6B] mb-6 leading-relaxed">
          {t('honeymoon.fund_body')}
        </p>
        <button className="wedding-button-primary">
          {t('honeymoon.fund_cta')}
        </button>
        </div>
        </div>
      </div>
    </div>
  );
}
