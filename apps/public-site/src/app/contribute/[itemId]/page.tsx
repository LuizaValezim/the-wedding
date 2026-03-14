'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '../../i18n';

export default function ContributePage({ params }: { params: { itemId: string } }) {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const suggestedAmount = searchParams.get('amount') || '0';
  
  const [formData, setFormData] = useState({
    amount: suggestedAmount,
    guestEmail: '',
    isAnonymous: false,
    message: '',
    paymentMethod: 'stripe',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fundItemId: params.itemId,
          amount: parseFloat(formData.amount),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to payment
        if (formData.paymentMethod === 'stripe' && data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          setMessage('✅ Donation processed! Thank you for your generosity!');
        }
      } else {
        setMessage(`❌ Error: ${data.message || 'Failed to process donation'}`);
      }
    } catch (error) {
      setMessage('❌ Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center text-[#2F2F2F]">{t('contribute.title')}</h1>
        <p className="text-center text-[#6B6B6B] mb-12">{t('contribute.subtitle')}</p>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-[#F1ECE6]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('contribute.amount')}</label>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-[#F1ECE6] text-[#2F2F2F] rounded-lg">$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="1"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="flex-1 px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('contribute.email')}</label>
              <input
                type="email"
                required
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('contribute.payment')}</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              >
                <option value="stripe">{t('contribute.payment_stripe')}</option>
                <option value="mercado-pago">{t('contribute.payment_pix')}</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-4 h-4 accent-[#8FAF9A]"
              />
              <label htmlFor="anonymous" className="font-semibold text-[#2F2F2F]">
                {t('contribute.anonymous')}
              </label>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">{t('contribute.message')}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('contribute.message.placeholder')}
                rows={4}
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
              {loading ? t('contribute.processing') : t('contribute.cta', { amount: `$${formData.amount}` })}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/honeymoon" 
            className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold"
          >
            {t('contribute.back')}
          </a>
        </div>
      </div>
    </main>
  );
}
