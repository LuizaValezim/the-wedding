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
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center text-[#2F2F2F]">RSVP to Our Wedding</h1>
        <p className="text-center text-[#6B6B6B] mb-12">
          We can't wait to celebrate with you!
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-[#F1ECE6]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">Will You Be Attending? *</label>
              <select
                value={formData.rsvpStatus}
                onChange={(e) => setFormData({ ...formData, rsvpStatus: e.target.value })}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              >
                <option value="confirmed">Yes, I'll Be There! 🎉</option>
                <option value="declined">Sorry, I Can't Make It 😢</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">Plus Ones</label>
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
              <label className="block font-semibold mb-2 text-[#2F2F2F]">Dietary Restrictions</label>
              <input
                type="text"
                placeholder="e.g. vegetarian, vegan, allergies..."
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
              {loading ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
