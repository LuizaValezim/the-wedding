'use client';

import { useI18n } from "../i18n";

export default function Gallery() {
  const { t } = useI18n();
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: t('gallery.memory', { index: i + 1 }),
    description: t('gallery.description'),
  }));

  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center text-[#2F2F2F]">{t('gallery.title')}</h1>
        <p className="text-center text-[#6B6B6B] mb-12">
          {t('gallery.subtitle')}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div 
              key={photo.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition border border-[#F1ECE6]"
            >
              <div className="aspect-square bg-gradient-to-br from-[#8FAF9A] to-[#6B8A79] flex items-center justify-center text-white text-4xl">
                📷
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#2F2F2F]">{photo.title}</h3>
                <p className="text-[#6B6B6B]">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold"
          >
            {t('gallery.back')}
          </a>
        </div>
      </div>
    </main>
  );
}
