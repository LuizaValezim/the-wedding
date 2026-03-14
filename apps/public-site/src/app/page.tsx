'use client';

import Link from "next/link";
import Countdown from "./components/Countdown";
import { useI18n } from "./i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="bg-[#FAF8F4] text-[#2F2F2F]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#F1ECE6]">
        <div className="wedding-container py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-2xl font-semibold">
            The Wedding
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/" className="wedding-nav-link wedding-nav-link-active">{t('nav.home')}</Link>
            <Link href="/our-story" className="wedding-nav-link">{t('nav.our_story')}</Link>
            <Link href="/details" className="wedding-nav-link">{t('nav.details')}</Link>
            <Link href="/rsvp" className="wedding-nav-link">{t('nav.rsvp')}</Link>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <Link
              href="/admin"
              className="wedding-button-primary"
              title={t('nav.admin_title')}
            >
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="wedding-section">
        <div className="wedding-container space-y-8 md:space-y-12 text-center">
          {/* Main heading */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="font-display text-6xl md:text-7xl font-light tracking-tight">
                Luiza & Raphael
              </h1>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8FAF9A] to-transparent max-w-xs mx-auto" />
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-[#6B6B6B] font-light">
                {t('hero.date')}
              </p>
              <p className="text-lg md:text-xl text-[#6B6B6B] font-light italic max-w-2xl mx-auto leading-relaxed">
                {t('hero.slogan.line1')}<br />
                <span className="font-semibold not-italic">{t('hero.slogan.line2')}</span>
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/rsvp" className="wedding-button-primary-lg">
              {t('cta.rsvp')}
            </Link>
            <Link href="/honeymoon" className="wedding-button-secondary-lg">
              {t('cta.honeymoon')}
            </Link>
          </div>
        </div>
      </section>

      {/* Countdown (simple visual) */}
      <section className="bg-white/50 border-y border-[#F1ECE6]">
        <div className="wedding-container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-sm text-[#6B6B6B] mb-2">{t('countdown.days_until')}</p>
              <p className="text-4xl font-display font-semibold text-[#8FAF9A]">
                <Countdown />
              </p>
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-2">{t('countdown.location')}</p>
              <p className="text-lg font-medium">São Paulo</p>
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-2">{t('countdown.time')}</p>
              <p className="text-lg font-medium">4:00 PM</p>
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-2">{t('countdown.status')}</p>
              <p className="text-lg font-medium">{t('countdown.status_value')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="wedding-section">
        <div className="wedding-container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-display text-5xl font-light">{t('section.expect')}</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8FAF9A] to-transparent max-w-xs mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="wedding-card">
              <div className="text-5xl mb-6">📅</div>
              <h3 className="font-display text-2xl mb-4">{t('card.ceremony.title')}</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                {t('card.ceremony.body')}
              </p>
            </div>

            {/* Card 2 */}
            <div className="wedding-card">
              <div className="text-5xl mb-6">🎉</div>
              <h3 className="font-display text-2xl mb-4">{t('card.celebration.title')}</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                {t('card.celebration.body')}
              </p>
            </div>

            {/* Card 3 */}
            <div className="wedding-card">
              <div className="text-5xl mb-6">✈️</div>
              <h3 className="font-display text-2xl mb-4">{t('card.honeymoon.title')}</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                {t('card.honeymoon.body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Honeymoon Fund CTA */}
      <section className="wedding-section bg-white border-t border-[#F1ECE6]">
        <div className="wedding-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-5xl font-light">{t('section.honeymoon.title')}</h2>
              <div className="h-px bg-[#8FAF9A] w-16" />
              <p className="text-lg text-[#6B6B6B] leading-relaxed">
                {t('section.honeymoon.body')}
              </p>
              <div className="pt-4">
                <Link href="/honeymoon" className="wedding-button-primary-lg">
                  {t('section.honeymoon.cta')}
                </Link>
              </div>
            </div>
            <div className="bg-[#F1ECE6] rounded-2xl p-8 text-center">
              <p className="text-sm text-[#6B6B6B] mb-2">{t('section.honeymoon.destination.label')}</p>
              <h3 className="font-display text-4xl mb-4">{t('section.honeymoon.destination.value')}</h3>
              <p className="text-[#6B6B6B]">
                {t('section.honeymoon.destination.body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="text-center space-y-8 mb-12">
            <h2 className="font-display text-5xl font-light">{t('section.join.title')}</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8FAF9A] to-transparent max-w-xs mx-auto" />
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              {t('section.join.body')}
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/rsvp" className="wedding-button-primary-lg">
              {t('section.join.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#F1ECE6] mt-20">
        <div className="wedding-container py-12 text-center space-y-4">
          <p className="font-display text-2xl font-light">{t('footer.title')}</p>
          <p className="text-sm text-[#6B6B6B]">
            {t('footer.subtitle')}
          </p>
          <p className="text-xs text-[#6B6B6B]">
            {t('footer.love')} ❤️
          </p>
        </div>
      </footer>
    </main>
  );
}
