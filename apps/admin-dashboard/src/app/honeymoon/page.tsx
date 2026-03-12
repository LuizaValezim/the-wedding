'use client';

export default function HoneymoonPage() {
  return (
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">Honeymoon Fund</h1>
        <p className="text-[#6B6B6B] mb-8">Manage your honeymoon fund and donations</p>

        <div className="grid md:grid-cols-2 gap-6">
      <div className="wedding-card">
        <h3 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">Destination Activities</h3>
        <p className="text-[#6B6B6B] mb-6 leading-relaxed">
          Plan and track honeymoon activities and attractions at your destination.
        </p>
        <button className="wedding-button-primary">
          + Add Activity
        </button>
      </div>
      <div className="wedding-card">
        <h3 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">Fund Progress</h3>
        <p className="text-[#6B6B6B] mb-6 leading-relaxed">
          View contributions toward your honeymoon fund and track progress.
        </p>
        <button className="wedding-button-primary">
          View Donations
        </button>
        </div>
        </div>
      </div>
    </div>
  );
}
