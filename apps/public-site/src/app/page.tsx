import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-pink-600">💍 The Wedding</div>
          <div className="flex gap-6">
            <Link href="/" className="font-medium hover:text-pink-600">Home</Link>
            <Link href="/our-story" className="font-medium hover:text-pink-600">Our Story</Link>
            <Link href="/details" className="font-medium hover:text-pink-600">Details</Link>
            <Link href="/gallery" className="font-medium hover:text-pink-600">Gallery</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold text-pink-500">
            We&apos;re Getting Married!
          </h1>
          <p className="text-3xl italic text-white font-semibold">
            It&apos;s not going to be a wedding, it&apos;s going to be{" "}
            <span className="font-bold text-pink-500">The Wedding</span>
          </p>
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            Join us for the celebration of our love
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/rsvp" 
              className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition"
            >
              RSVP to Wedding
            </Link>
            <Link 
              href="/honeymoon" 
              className="px-8 py-3 border-2 border-pink-600 text-pink-600 hover:bg-pink-50 font-semibold rounded-lg transition"
            >
              Honeymoon Fund
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Wedding Highlights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Date & Time</h3>
            <p className="text-gray-600 dark:text-gray-400">
              June 12, 2027 at 5:00 PM
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-gray-600 dark:text-gray-400">
              São Paulo, Brazil
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Celebration</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Reception & Dancing
            </p>
          </div>
        </div>
      </section>

      {/* Honeymoon Fund CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Honeymoon Fund</h2>
          <p className="text-xl mb-8 opacity-90">
            Help us create unforgettable memories on our dream honeymoon
          </p>
          <Link 
            href="/honeymoon" 
            className="inline-block px-8 py-3 bg-white text-pink-600 hover:bg-gray-100 font-semibold rounded-lg transition"
          >
            Browse Gift Items
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>With love ❤️ | © 2027 Wedding Celebration</p>
        </div>
      </footer>
    </main>
  );
}
