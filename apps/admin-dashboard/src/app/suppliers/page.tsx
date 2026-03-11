'use client';

export default function SuppliersPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Suppliers & Vendors</h1>
          <a href="/" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Back to Dashboard
          </a>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your wedding vendors and suppliers here. Add venues, caterers, florists, photographers, and more.
          </p>
          <button className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
            Add Supplier
          </button>
        </div>
      </div>
    </main>
  );
}
