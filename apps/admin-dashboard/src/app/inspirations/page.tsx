'use client';

export default function InspirationsPage() {
  return (
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">Wedding Inspirations</h1>
        <p className="text-[#6B6B6B] mb-8">Save ideas and inspirations for your wedding design</p>

        <div className="space-y-6">
      <div className="wedding-card">
        <h2 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">Wedding Inspiration</h2>
        <p className="text-[#6B6B6B] mb-6 leading-relaxed">
          Create a mood board and save inspiration images for decorations, themes, and design ideas.
        </p>
        <button className="wedding-button-primary">
          + Add Inspiration
        </button>
      </div>

      {/* Empty State */}
      <div className="wedding-card text-center py-12">
        <div className="text-5xl mb-4">🎨</div>
        <h3 className="font-display text-2xl font-light text-[#2F2F2F] mb-2">No Inspiration Added Yet</h3>
        <p className="text-[#6B6B6B]">Start saving images and ideas to build your wedding vision</p>
      </div>
        </div>
        </div>
      </div>
  );
}
