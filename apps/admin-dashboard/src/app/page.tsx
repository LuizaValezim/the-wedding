'use client';

import { useState, useEffect } from 'react';

interface Guest {
  id: string;
  name: string;
  email: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOnes: number;
  dietary: string;
}

interface BudgetItem {
  id: string;
  category: string;
  description: string;
  estimated: number;
  actual: number;
}

export default function Dashboard() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load guests and budget data from localStorage on mount
  useEffect(() => {
    const savedGuests = localStorage.getItem('weddingGuests');
    if (savedGuests) {
      try {
        setGuests(JSON.parse(savedGuests));
      } catch (e) {
        console.error('Failed to load guests from localStorage', e);
      }
    }

    const savedBudget = localStorage.getItem('weddingBudget');
    if (savedBudget) {
      try {
        setBudgetItems(JSON.parse(savedBudget));
      } catch (e) {
        console.error('Failed to load budget from localStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Calculate statistics
  const totalGuests = guests.length;
  const rsvpConfirmed = guests.filter((g) => g.rsvpStatus === 'confirmed').length;
  const totalPlusOnes = guests.reduce((sum, g) => sum + g.plusOnes, 0);
  const totalPeople = totalGuests + totalPlusOnes;
  const totalEstimatedCost = budgetItems.reduce((sum, item) => sum + item.estimated, 0);
  const totalActualCost = budgetItems.reduce((sum, item) => sum + item.actual, 0);

  const stats = {
    totalEstimatedCost,
    totalActualCost,
    totalGuests,
    totalPlusOnes,
    totalPeople,
    rsvpConfirmed,
    honeymoonFunded: 8500,
    honeymoonGoal: 15000,
  };

  const menuItems = [
    { href: '/guests', label: 'Guests', icon: '👥' },
    { href: '/budget', label: 'Budget', icon: '💰' },
    { href: '/inspirations', label: 'Inspiration', icon: '🎨' },
    { href: '/tasks', label: 'Checklist', icon: '✓' },
    { href: '/venues', label: 'Venues', icon: '🏛️' },
    { href: '/suppliers', label: 'Suppliers', icon: '🏢' },
    { href: '/honeymoon', label: 'Honeymoon', icon: '✈️' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-pink-500">💍 The Wedding</span>{' '}
            <span className="text-white">Bride and Groom's Dashboard</span>
          </h1>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-pink-600 text-white p-6 rounded-lg shadow">
            <h3 className="text-white/80 text-sm font-semibold">Total Cost</h3>
            <p className="text-3xl font-bold mt-2">${stats.totalEstimatedCost.toLocaleString()}</p>
            <p className="text-xs text-white/80 mt-1">Budget estimated</p>
          </div>
          <div className="bg-pink-600 text-white p-6 rounded-lg shadow">
            <h3 className="text-white/80 text-sm font-semibold">Number of People</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalPeople}</p>
            <p className="text-xs text-white/80 mt-1">{stats.totalGuests} guests + {stats.totalPlusOnes} plus ones</p>
          </div>
          <div className="bg-pink-600 text-white p-6 rounded-lg shadow">
            <h3 className="text-white/80 text-sm font-semibold">RSVP Confirmed</h3>
            <p className="text-3xl font-bold mt-2">{stats.rsvpConfirmed}</p>
            <p className="text-xs text-white/80 mt-1">of {stats.totalGuests}</p>
          </div>
          <div className="bg-pink-600 text-white p-6 rounded-lg shadow">
            <h3 className="text-white/80 text-sm font-semibold">Honeymoon Fund</h3>
            <p className="text-3xl font-bold mt-2">${stats.honeymoonFunded.toLocaleString()}</p>
            <p className="text-xs text-white/80 mt-1">of ${stats.honeymoonGoal.toLocaleString()}</p>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.label}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage {item.label.toLowerCase()}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
