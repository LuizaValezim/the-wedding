'use client';

import { useState } from 'react';
import { useI18n } from '../i18n';

export default function RSVPPage({ params }: { params: { token: string } }) {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rsvpStatus: 'confirmed',
    plusOneCount: '0',
    dietary: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rsvpToken: params.token,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(t('rsvp.success'));
        setFormData({ name: '', email: '', rsvpStatus: 'confirmed', plusOneCount: '0', dietary: '' });
      } else {
        setMessage(t('rsvp.error', { message: data.message || t('rsvp.error_generic') }));
      }
    } catch (error) {
      setMessage(t('rsvp.error_generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center text-[#2F2F2F]">{t('rsvp.title')}</h1>
        <p className="text-center text-[#6B6B6B] mb-12">{t('rsvp.subtitle')}</p>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-[#F1ECE6]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('rsvp.name')}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('rsvp.email')}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('rsvp.attending')}</label>
              <select
                value={formData.rsvpStatus}
                onChange={(e) => setFormData({ ...formData, rsvpStatus: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              >
                <option value="confirmed">{t('rsvp.attending_yes')}</option>
                <option value="declined">{t('rsvp.attending_no')}</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('rsvp.plus_ones')}</label>
              <select
                value={formData.plusOneCount}
                onChange={(e) => setFormData({ ...formData, plusOneCount: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('rsvp.dietary')}</label>
              <input
                type="text"
                placeholder={t('rsvp.dietary.placeholder')}
                value={formData.dietary}
                onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
            </div>

            {message && (
              <div className="p-4 bg-[#F1ECE6] text-[#2F2F2F] rounded-lg border border-[#E6DED5]">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#8FAF9A] text-white rounded-lg hover:bg-[#7A9988] disabled:opacity-50 transition font-semibold"
            >
              {loading ? t('rsvp.submitting') : t('rsvp.submit')}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold"
          >
            {t('rsvp.back')}
          </a>
        </div>
      </div>
    </main>
  );
}
