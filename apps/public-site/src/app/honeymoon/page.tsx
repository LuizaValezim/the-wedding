'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FundItem {
  id: string;
  name: string;
  price: number;
  quantityFunded: number;
  fundedAmount: string;
}

export default function HoneymoonPage() {
  const [items, setItems] = useState<FundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    // Fetch honeymoon items
    const mockItems: FundItem[] = [
      { id: '1', name: 'Flight to Maldives', price: 4500, quantityFunded: 1, fundedAmount: '4500' },
      { id: '2', name: 'Beach Resort (5 nights)', price: 3500, quantityFunded: 0, fundedAmount: '0' },
      { id: '3', name: 'Dinner by the Beach', price: 400, quantityFunded: 2, fundedAmount: '800' },
      { id: '4', name: 'Spa & Massage Package', price: 600, quantityFunded: 1, fundedAmount: '600' },
      { id: '5', name: 'Diving Excursion', price: 350, quantityFunded: 0, fundedAmount: '0' },
      { id: '6', name: 'Island Hopping Tour', price: 800, quantityFunded: 1, fundedAmount: '800' },
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
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center">Honeymoon Fund</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-xl">
          Help us create unforgettable memories on our dream honeymoon to the Maldives
        </p>

        {/* Overall Progress */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg mb-12 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Overall Progress</h2>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-pink-600 to-purple-600 h-4 rounded-full transition-all"
              style={{ width: `${Math.min(totalProgress, 100)}%` }}
            />
          </div>
          <p className="text-center text-gray-700 dark:text-gray-300">
            {Math.round(totalProgress)}% funded
          </p>
        </div>

        {/* Gift Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">🌴</div>
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ${item.price.toLocaleString()}
              </p>
              
              {/* Item Progress */}
              {parseInt(item.fundedAmount) > 0 && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-pink-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (parseFloat(item.fundedAmount) / item.price) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ${parseFloat(item.fundedAmount).toLocaleString()} contributed
                  </p>
                </div>
              )}

              <Link
                href={`/contribute/${item.id}?amount=${item.price}`}
                className="block w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-center font-semibold"
              >
                Contribute
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
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
