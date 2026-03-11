'use client';

export default function HoneymoonPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Honeymoon Planning</h1>
          <a href="/" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Back to Dashboard
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Destination Activities</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Plan and track honeymoon activities and attractions at your destination.
            </p>
            <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
              Add Activity
            </button>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Fund Progress</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              View contributions toward your honeymoon fund and track progress.
            </p>
            <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
              View Donations
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
