'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '../i18n';

interface FundItem {
  id: string;
  name: string;
  price: number;
  quantityFunded: number;
  fundedAmount: string;
}

export default function HoneymoonPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<FundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    // Fetch honeymoon items
    const mockItems: FundItem[] = [
      { id: '1', name: 'Flights to Italy (Round Trip)', price: 3200, quantityFunded: 1, fundedAmount: '3200' },
      { id: '2', name: 'Amalfi Coast Hotel (4 nights)', price: 2200, quantityFunded: 0, fundedAmount: '0' },
      { id: '3', name: 'Romantic Dinner in Rome', price: 250, quantityFunded: 2, fundedAmount: '500' },
      { id: '4', name: 'Tuscan Wine Tasting Tour', price: 450, quantityFunded: 1, fundedAmount: '450' },
      { id: '5', name: 'Vatican Museums Tickets', price: 180, quantityFunded: 0, fundedAmount: '0' },
      { id: '6', name: 'Venice Gondola Ride', price: 220, quantityFunded: 1, fundedAmount: '220' },
    ];

    setItems(mockItems);
    const total = mockItems.reduce((sum, item) => sum + parseFloat(item.fundedAmount), 0);
    const goal = mockItems.reduce((sum, item) => sum + item.price, 0);
    setTotalProgress((total / goal) * 100);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center text-[#2F2F2F]">{t('honeymoon.title')}</h1>
        <p className="text-center text-[#6B6B6B] mb-12 text-xl">{t('honeymoon.subtitle')}</p>

        {/* Overall Progress */}
        <div className="bg-white p-8 rounded-lg mb-12 shadow-lg border border-[#F1ECE6]">
          <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">{t('honeymoon.progress')}</h2>
          <div className="w-full bg-[#E3EDE7] rounded-full h-4 mb-4">
            <div
              className="bg-[#8FAF9A] h-4 rounded-full transition-all"
              style={{ width: `${Math.min(totalProgress, 100)}%` }}
            />
          </div>
          <p className="text-center text-[#6B6B6B]">
            {t('honeymoon.funded', { percent: Math.round(totalProgress) })}
          </p>
        </div>

        {/* Gift Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition border border-[#F1ECE6]"
            >
              <div className="text-5xl mb-4">🇮🇹</div>
              <h3 className="text-xl font-bold mb-2 text-[#2F2F2F]">{item.name}</h3>
              <p className="text-[#6B6B6B] mb-4">
                ${item.price.toLocaleString()}
              </p>
              
              {/* Item Progress */}
              {parseInt(item.fundedAmount) > 0 && (
                <div className="mb-4">
                  <div className="w-full bg-[#E3EDE7] rounded-full h-2">
                    <div
                      className="bg-[#8FAF9A] h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (parseFloat(item.fundedAmount) / item.price) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    {t('honeymoon.contributed', { amount: `$${parseFloat(item.fundedAmount).toLocaleString()}` })}
                  </p>
                </div>
              )}

              <Link
                href={`/contribute/${item.id}?amount=${item.price}`}
                className="block w-full px-4 py-2 bg-[#8FAF9A] text-white rounded-lg hover:bg-[#7A9988] transition text-center font-semibold"
              >
                {t('honeymoon.contribute')}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/" 
            className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold"
          >
            {t('honeymoon.back')}
          </a>
        </div>
      </div>
    </main>
  );
}
