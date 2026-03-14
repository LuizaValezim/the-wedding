'use client';

import { useEffect, useState } from 'react';

const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE;
const ADMIN_DASHBOARD_URL =
  process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ?? 'http://localhost:3001';
const STORAGE_KEY = 'weddingAdminAuthed';

export default function AdminLoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Require code on each browser session (avoid lingering localStorage).
    localStorage.removeItem(STORAGE_KEY);
    const authed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (authed) {
      window.location.href = ADMIN_DASHBOARD_URL;
      return;
    }
    setIsReady(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!ADMIN_CODE) {
      setError('Admin access code is not configured.');
      return;
    }

    if (code.trim() !== ADMIN_CODE) {
      setError('Incorrect access code.');
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, 'true');
    window.location.href = ADMIN_DASHBOARD_URL;
  };

  if (!isReady) return null;

  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold text-center text-[#2F2F2F] mb-4">
          Bride & Groom Login
        </h1>
        <p className="text-center text-[#6B6B6B] mb-10">
          Enter the access code to open the admin dashboard.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-[#F1ECE6]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-[#2F2F2F]">
                Access Code
              </label>
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                placeholder="Enter code"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg border border-[#E6DED5] bg-[#F1ECE6] text-[#2F2F2F]">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#8FAF9A] text-white rounded-lg hover:bg-[#7A9988] transition font-semibold"
            >
              Continue to Dashboard
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
