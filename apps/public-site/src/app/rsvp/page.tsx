'use client';

import { useState } from 'react';

export default function RSVPPage({ params }: { params: { token: string } }) {
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
        setMessage('✅ RSVP submitted successfully! See you at the wedding!');
        setFormData({ name: '', email: '', rsvpStatus: 'confirmed', plusOneCount: '0', dietary: '' });
      } else {
        setMessage(`❌ Error: ${data.message || 'Failed to submit RSVP'}`);
      }
    } catch (error) {
      setMessage('❌ Failed to submit RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center">RSVP to Our Wedding</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          We can't wait to celebrate with you!
        </p>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Will You Be Attending? *</label>
              <select
                value={formData.rsvpStatus}
                onChange={(e) => setFormData({ ...formData, rsvpStatus: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
              >
                <option value="confirmed">Yes, I'll Be There! 🎉</option>
                <option value="declined">Sorry, I Can't Make It 😢</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Plus Ones</label>
              <select
                value={formData.plusOneCount}
                onChange={(e) => setFormData({ ...formData, plusOneCount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Dietary Restrictions</label>
              <input
                type="text"
                placeholder="e.g. vegetarian, vegan, allergies..."
                value={formData.dietary}
                onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
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
              {loading ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
