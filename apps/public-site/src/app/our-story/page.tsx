export default function OurStory() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-8">Our Love Story</h1>
        
        <div className="space-y-8 text-lg text-gray-700 dark:text-gray-300">
          <p>
            Once upon a time, two souls found each other in the most unexpected way. 
            What started as a chance meeting has blossomed into the greatest adventure 
            of our lives.
          </p>
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">💫 How We Met</h2>
            <p>
              Our story began in a moment that felt like destiny. Through mutual friends 
              and shared interests, we were introduced to each other. From the very first 
              conversation, there was an undeniable spark.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">❤️ Falling in Love</h2>
            <p>
              As days turned into weeks and weeks into months, our connection deepened. 
              We discovered that we were each other&apos;s missing puzzle piece. Every 
              moment together felt magical, and every challenge we faced only made us stronger.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">💍 The Proposal</h2>
            <p>
              When the moment came to ask the most important question of our lives, 
              it was perfect because it was us. A simple, heartfelt moment that 
              confirmed what we already knew—we were meant to be together forever.
            </p>
          </div>

          <p>
            Now, as we prepare to say &quot;I do,&quot; we invite you to be part of our 
            journey. Thank you for being there for us, and we can&apos;t wait to 
            celebrate our love with everyone who means the most to us.
          </p>
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
