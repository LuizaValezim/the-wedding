export default function Dashboard() {
  const stats = {
    totalGuests: 156,
    rsvpConfirmed: 142,
    honeymoonFunded: 8500,
    honeymoonGoal: 15000,
    tasksCompleted: 23,
    tasksTotal: 45,
  };

  const menuItems = [
    { href: '/guests', label: 'Guests', icon: '👥' },
    { href: '/budget', label: 'Budget', icon: '💰' },
    { href: '/tables', label: 'Seating', icon: '🪑' },
    { href: '/tasks', label: 'Checklist', icon: '✓' },
    { href: '/suppliers', label: 'Suppliers', icon: '🏢' },
    { href: '/venues', label: 'Venues', icon: '🏛️' },
    { href: '/inspirations', label: 'Inspiration', icon: '🎨' },
    { href: '/honeymoon', label: 'Honeymoon', icon: '✈️' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">💍 The Wedding Admin Dashboard</h1>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Total Guests</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalGuests}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">RSVP Confirmed</h3>
            <p className="text-3xl font-bold mt-2">{stats.rsvpConfirmed}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Honeymoon Fund</h3>
            <p className="text-3xl font-bold mt-2">${stats.honeymoonFunded}/${stats.honeymoonGoal}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Tasks Completed</h3>
            <p className="text-3xl font-bold mt-2">{stats.tasksCompleted}/{stats.tasksTotal}</p>
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

        {/* Recent Activity */}
        <div className="mt-12 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 py-3 border-b dark:border-slate-700">
              <div className="text-2xl">✅</div>
              <div>
                <p className="font-semibold">Guest RSVP'd</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-3 border-b dark:border-slate-700">
              <div className="text-2xl">💰</div>
              <div>
                <p className="font-semibold">$500 donation received</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-3">
              <div className="text-2xl">📝</div>
              <div>
                <p className="font-semibold">Budget updated</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
