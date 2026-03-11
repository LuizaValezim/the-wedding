export default function Details() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-12">Wedding Details</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">📍 Ceremony</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold">Location</p>
                <p>São Paulo, Brazil</p>
              </div>
              <div>
                <p className="font-semibold">Date</p>
                <p>June 12, 2027</p>
              </div>
              <div>
                <p className="font-semibold">Time</p>
                <p>5:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Dress Code</p>
                <p>Black Tie</p>
              </div>
            </div>
          </div>

          {/* Reception */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">🎉 Reception</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold">Location</p>
                <p>Grand Ballroom, São Paulo</p>
              </div>
              <div>
                <p className="font-semibold">Time</p>
                <p>7:00 PM - Late Night</p>
              </div>
              <div>
                <p className="font-semibold">Menu</p>
                <p>Brazilian & International Cuisine</p>
              </div>
              <div>
                <p className="font-semibold">Entertainment</p>
                <p>Live Band & DJ</p>
              </div>
            </div>
          </div>
        </div>

        {/* RSVP Info */}
        <div className="mt-12 bg-pink-50 dark:bg-slate-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">RSVP Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We would love for you to celebrate with us! Please confirm your attendance 
            at your earliest convenience.
          </p>
          <a 
            href="/rsvp" 
            className="inline-block px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            RSVP Now
          </a>
        </div>

        <div className="mt-12 text-center">
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
