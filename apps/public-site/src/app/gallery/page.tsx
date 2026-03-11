export default function Gallery() {
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Memory ${i + 1}`,
    description: 'Our special moments'
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center">Photo Gallery</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Moments that mean everything to us
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div 
              key={photo.id}
              className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="aspect-square bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-4xl">
                📷
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{photo.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{photo.description}</p>
              </div>
            </div>
          ))}
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
