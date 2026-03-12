'use client';

export default function VenuesPage() {
  return (
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">Venue Management</h1>
        <p className="text-[#6B6B6B] mb-8">Compare and manage potential wedding venues</p>

        <div className="space-y-6">
      <div className="wedding-card">
        <h2 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">Venue Management</h2>
        <p className="text-[#6B6B6B] mb-6 leading-relaxed">
          Compare and manage potential wedding venues. Track capacity, pricing, and availability.
        </p>
        <button className="wedding-button-primary">
          + Add Venue
        </button>
      </div>

      {/* Empty State */}
      <div className="wedding-card text-center py-12">
        <div className="text-5xl mb-4">🏛️</div>
        <h3 className="font-display text-2xl font-light text-[#2F2F2F] mb-2">No Venues Added Yet</h3>
        <p className="text-[#6B6B6B]">Start adding venues to compare and track your options</p>
      </div>
        </div>
      </div>
    </div>
  );
}
