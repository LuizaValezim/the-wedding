'use client';

import { useI18n } from "../i18n";

export default function OurStory() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-8 text-[#2F2F2F]">{t('story.title')}</h1>
        
        <div className="space-y-8 text-lg text-[#6B6B6B]">
          <p>
            {t('story.intro')}
          </p>
          
          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">{t('story.met.title')}</h2>
            <p>
              {t('story.met.body')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">{t('story.love.title')}</h2>
            <p>
              {t('story.love.body')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">{t('story.proposal.title')}</h2>
            <p>
              {t('story.proposal.body')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#2F2F2F]">{t('story.photos.title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-[4/3] rounded-lg border border-[#E6DED5] bg-gradient-to-br from-[#F1ECE6] to-[#FAF8F4] flex items-center justify-center text-sm text-[#6B6B6B]">
                {t('story.photos.placeholder')}
              </div>
              <div className="aspect-[4/3] rounded-lg border border-[#E6DED5] bg-gradient-to-br from-[#F1ECE6] to-[#FAF8F4] flex items-center justify-center text-sm text-[#6B6B6B]">
                {t('story.photos.placeholder')}
              </div>
              <div className="aspect-[4/3] rounded-lg border border-[#E6DED5] bg-gradient-to-br from-[#F1ECE6] to-[#FAF8F4] flex items-center justify-center text-sm text-[#6B6B6B]">
                {t('story.photos.placeholder')}
              </div>
              <div className="aspect-[4/3] rounded-lg border border-[#E6DED5] bg-gradient-to-br from-[#F1ECE6] to-[#FAF8F4] flex items-center justify-center text-sm text-[#6B6B6B]">
                {t('story.photos.placeholder')}
              </div>
            </div>
          </div>

          <p>
            {t('story.outro')}
          </p>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold"
          >
            {t('story.back')}
          </a>
        </div>
      </div>
    </main>
  );
}
