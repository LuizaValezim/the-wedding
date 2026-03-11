'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ContributePage({ params }: { params: { itemId: string } }) {
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
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center">Make a Contribution</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Help us create magical memories together
        </p>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Contribution Amount *</label>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg">$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="1"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Your Email *</label>
              <input
                type="email"
                required
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Payment Method *</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
              >
                <option value="stripe">Credit/Debit Card (Stripe)</option>
                <option value="mercado-pago">Pix / Brazilian Cards (Mercado Pago)</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="anonymous" className="font-semibold">
                Make this contribution anonymous
              </label>
            </div>

            <div>
              <label className="block font-semibold mb-2">Message (Optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Leave a message for the couple..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
              />
            </div>

            {message && (
              <div className="p-4 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 transition font-semibold"
            >
              {loading ? 'Processing...' : `Contribute $${formData.amount}`}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/honeymoon" 
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            ← Back to Honeymoon Fund
          </a>
        </div>
      </div>
    </main>
  );
}
