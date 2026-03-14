'use client';

import { useI18n } from '../i18n';

export default function InspirationsPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">{t('inspirations.page_title')}</h1>
        <p className="text-[#6B6B6B] mb-8">{t('inspirations.subtitle')}</p>

        <div className="space-y-6">
      <div className="wedding-card">
        <h2 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">{t('inspirations.card_title')}</h2>
        <p className="text-[#6B6B6B] mb-6 leading-relaxed">
          {t('inspirations.card_body')}
        </p>
        <button className="wedding-button-primary">
          + {t('inspirations.add')}
        </button>
      </div>

      {/* Empty State */}
      <div className="wedding-card text-center py-12">
        <div className="text-5xl mb-4">🎨</div>
        <h3 className="font-display text-2xl font-light text-[#2F2F2F] mb-2">{t('inspirations.empty_title')}</h3>
        <p className="text-[#6B6B6B]">{t('inspirations.empty_body')}</p>
      </div>
        </div>
        </div>
      </div>
  );
}
