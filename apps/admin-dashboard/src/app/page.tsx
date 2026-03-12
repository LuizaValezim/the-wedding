'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load guests and budget data from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
  const rsvpDeclined = guests.filter((g) => g.rsvpStatus === 'declined').length;
  const rsvpPending = guests.filter((g) => g.rsvpStatus === 'pending').length;
  const rsvpResponded = rsvpConfirmed + rsvpDeclined;
  const rsvpResponsePercentage = totalGuests > 0 ? Math.round((rsvpResponded / totalGuests) * 100) : 0;
  const totalPlusOnes = guests.reduce((sum, g) => sum + g.plusOnes, 0);
  const totalPeople = totalGuests + totalPlusOnes;
  const totalEstimatedCost = budgetItems.reduce((sum, item) => sum + item.estimated, 0) || 0;
  const totalActualCost = budgetItems.reduce((sum, item) => sum + item.actual, 0) || 0;

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
    { href: '/', label: 'Overview', icon: '📊' },
    { href: '/guests', label: 'Guests', icon: '👥' },
    { href: '/budget', label: 'Budget', icon: '💰' },
    { href: '/tables', label: 'Tables', icon: '🪑' },
    { href: '/venues', label: 'Venues', icon: '🏛️' },
    { href: '/suppliers', label: 'Suppliers', icon: '🏢' },
    { href: '/tasks', label: 'Checklist', icon: '✓' },
    { href: '/inspirations', label: 'Inspirations', icon: '🎨' },
    { href: '/honeymoon', label: 'Honeymoon', icon: '✈️' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold text-[#2F2F2F]">The Wedding</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">Planning Dashboard</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all cursor-pointer ${
                isActive(item.href)
                  ? 'bg-[#F1ECE6] text-[#8FAF9A]'
                  : 'text-[#6B6B6B] hover:bg-[#FAF8F4] hover:text-[#8FAF9A]'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[#F1ECE6] mt-8 pt-8">
          <p className="text-xs text-[#6B6B6B] font-semibold mb-4 uppercase">Account</p>
          <button className="w-full text-left px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors font-medium">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-display text-2xl font-light text-[#2F2F2F]">Welcome</h2>
              <p className="text-sm text-[#6B6B6B] mt-1">Bride & Groom Dashboard</p>
            </div>
            <div className="flex gap-3">
              <a 
                href="http://localhost:3000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[#8FAF9A] text-[#8FAF9A] rounded-lg hover:bg-[#F1ECE6] transition-colors text-sm font-medium"
              >
                View Public Site
              </a>
              <button className="px-4 py-2 border border-[#F1ECE6] text-[#2F2F2F] rounded-lg hover:bg-[#FAF8F4] transition-colors text-sm font-medium">
                Settings
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="dashboard-content space-y-8">
          {/* Stats Grid */}
          <div>
            <h3 className="font-display text-xl font-semibold text-[#2F2F2F] mb-6">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Cost Card */}
              <div className="stat-card">
                <div className="stat-card-header">Total Budget</div>
                <div className="stat-card-value">
                  ${totalEstimatedCost.toLocaleString()}
                </div>
                <div className="stat-card-change">
                  {totalActualCost > 0 && `Spent: $${totalActualCost.toLocaleString()}`}
                </div>
              </div>

              {/* Guests Card */}
              <div className="stat-card">
                <div className="stat-card-header">Total Guests</div>
                <div className="stat-card-value">{totalPeople}</div>
                <div className="stat-card-change">
                  {rsvpConfirmed} confirmed, {totalPlusOnes} plus ones
                </div>
              </div>

              {/* RSVP Card */}
              <div className="stat-card">
                <div className="stat-card-header">RSVP Status</div>
                <div className="stat-card-value">{rsvpResponsePercentage}%</div>
                <div className="stat-card-change">
                  {totalGuests > 0 
                    ? `${rsvpConfirmed} confirmed, ${rsvpDeclined} declined, ${rsvpPending} pending`
                    : 'No guests yet'
                  }
                </div>
              </div>

              {/* Honeymoon Fund Card */}
              <div className="stat-card">
                <div className="stat-card-header">Honeymoon Fund</div>
                <div className="stat-card-value">${stats.honeymoonFunded.toLocaleString()}</div>
                <div className="stat-card-change">
                  ${stats.honeymoonGoal.toLocaleString()} goal
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-display text-xl font-semibold text-[#2F2F2F] mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/guests"
                className="wedding-card hover:border-[#8FAF9A] cursor-pointer text-center py-8 hover:shadow-lg"
              >
                <div className="text-3xl mb-3">👥</div>
                <h4 className="font-semibold text-[#2F2F2F] mb-1">Manage Guests</h4>
                <p className="text-sm text-[#6B6B6B]">Add & track guests</p>
              </Link>
              
              <Link
                href="/budget"
                className="wedding-card hover:border-[#8FAF9A] cursor-pointer text-center py-8 hover:shadow-lg"
              >
                <div className="text-3xl mb-3">💰</div>
                <h4 className="font-semibold text-[#2F2F2F] mb-1">Budget Planning</h4>
                <p className="text-sm text-[#6B6B6B]">Track expenses</p>
              </Link>

              <Link
                href="/honeymoon"
                className="wedding-card hover:border-[#8FAF9A] cursor-pointer text-center py-8 hover:shadow-lg"
              >
                <div className="text-3xl mb-3">✈️</div>
                <h4 className="font-semibold text-[#2F2F2F] mb-1">Honeymoon Fund</h4>
                <p className="text-sm text-[#6B6B6B]">Manage donations</p>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          {guests.length > 0 && (
            <div>
              <h3 className="font-display text-xl font-semibold text-[#2F2F2F] mb-6">Recent Guests</h3>
              <div className="wedding-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#F1ECE6]">
                        <th className="text-left py-3 px-4 font-semibold text-[#2F2F2F]">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2F2F2F]">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2F2F2F]">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2F2F2F]">Plus Ones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.slice(0, 5).map((guest) => (
                        <tr key={guest.id} className="border-b border-[#F1ECE6] hover:bg-[#FAF8F4]">
                          <td className="py-3 px-4 text-[#2F2F2F]">{guest.name}</td>
                          <td className="py-3 px-4 text-[#6B6B6B]">{guest.email || '—'}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              guest.rsvpStatus === 'confirmed' 
                                ? 'bg-green-50 text-green-700'
                                : guest.rsvpStatus === 'declined'
                                ? 'bg-red-50 text-red-700'
                                : 'bg-gray-50 text-gray-700'
                            }`}>
                              {guest.rsvpStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#2F2F2F]">{guest.plusOnes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {guests.length === 0 && budgetItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">👋</div>
              <h3 className="font-display text-2xl font-light text-[#2F2F2F] mb-2">
                Welcome to Your Wedding Dashboard
              </h3>
              <p className="text-[#6B6B6B] mb-6 max-w-md mx-auto">
                Start planning your wedding by adding guests, managing your budget, and organizing your honeymoon fund.
              </p>
              <Link href="/guests" className="wedding-button-primary">
                Add Your First Guest
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
