export default function Details() {
  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-12 text-[#2F2F2F]">Wedding Details</h1>
        
        <div className="grid gap-8">
          {/* Ceremony + Reception */}
          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-3xl font-bold mb-4 text-[#2F2F2F]">📍 Ceremony & Reception</h2>
            <div className="space-y-4 text-[#6B6B6B]">
              <div>
                <p className="font-semibold text-[#2F2F2F]">Location</p>
                <p>Fazenda Marambaia</p>
                <p>Rodovia Limeira-Cosmópolis KM3 SP 133 Lopes, Limeira - SP</p>
              </div>
              <div>
                <p className="font-semibold text-[#2F2F2F]">Date</p>
                <p>June 12, 2027</p>
              </div>
              <div>
                <p className="font-semibold text-[#2F2F2F]">Schedule</p>
                <p>Ceremony at 4:00 PM, reception to follow</p>
              </div>
              <div>
                <p className="font-semibold text-[#2F2F2F]">Dress Code</p>
                <p>Black Tie</p>
              </div>
            </div>
          </div>
        </div>

        {/* RSVP Info */}
        <div className="mt-12 bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">RSVP Information</h2>
          <p className="text-[#6B6B6B] mb-4">
            We would love for you to celebrate with us! Please confirm your attendance 
            at your earliest convenience.
          </p>
          <a 
            href="/rsvp" 
            className="inline-block px-6 py-2 bg-[#8FAF9A] text-white rounded-lg hover:bg-[#7A9988] transition"
          >
            RSVP Now
          </a>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
