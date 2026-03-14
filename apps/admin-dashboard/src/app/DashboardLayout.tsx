'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Overview', icon: '📊' },
    { href: '/guests', label: 'Guests', icon: '👥' },
    { href: '/budget', label: 'Budget', icon: '💰' },
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
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
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
              <h2 className="font-display text-2xl font-light text-[#2F2F2F]">{title}</h2>
              <p className="text-sm text-[#6B6B6B] mt-1">Manage your wedding details</p>
            </div>
            <button className="px-4 py-2 border border-[#F1ECE6] text-[#2F2F2F] rounded-lg hover:bg-[#FAF8F4] transition-colors text-sm font-medium">
              Settings
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
}
