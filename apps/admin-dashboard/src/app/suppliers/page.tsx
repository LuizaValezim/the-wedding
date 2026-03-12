'use client';

export default function SuppliersPage() {
  return (
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">Suppliers & Vendors</h1>
        <p className="text-[#6B6B6B] mb-8">Manage your wedding vendors and suppliers</p>

        <div className="space-y-6">
      <div className="wedding-card">
        <h2 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">Suppliers & Vendors</h2>
        <p className="text-[#6B6B6B] mb-6 leading-relaxed">
          Manage your wedding vendors and suppliers here. Add venues, caterers, florists, photographers, and more.
        </p>
        <button className="wedding-button-primary">
          + Add Supplier
        </button>
      </div>

      {/* Empty State */}
      <div className="wedding-card text-center py-12">
        <div className="text-5xl mb-4">🏢</div>
        <h3 className="font-display text-2xl font-light text-[#2F2F2F] mb-2">No Suppliers Added Yet</h3>
        <p className="text-[#6B6B6B]">Start adding vendors to organize your wedding team</p>
      </div>
        </div>
        </div>
      </div>
  );
}
