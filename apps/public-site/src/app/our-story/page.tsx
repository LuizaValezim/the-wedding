export default function OurStory() {
  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-8 text-[#2F2F2F]">Our Love Story</h1>
        
        <div className="space-y-8 text-lg text-[#6B6B6B]">
          <p>
            Once upon a time, two souls found each other in the most unexpected way. 
            What started as a chance meeting has blossomed into the greatest adventure 
            of our lives.
          </p>
          
          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">💫 How We Met</h2>
            <p>
              Our story began in a moment that felt like destiny. Through mutual friends 
              and shared interests, we were introduced to each other. From the very first 
              conversation, there was an undeniable spark.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">❤️ Falling in Love</h2>
            <p>
              As days turned into weeks and weeks into months, our connection deepened. 
              We discovered that we were each other&apos;s missing puzzle piece. Every 
              moment together felt magical, and every challenge we faced only made us stronger.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">💍 The Proposal</h2>
            <p>
              When the moment came to ask the most important question of our lives, 
              it was perfect because it was us. A simple, heartfelt moment that 
              confirmed what we already knew—we were meant to be together forever.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F1ECE6] shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#2F2F2F]">📸 Moments Along the Way</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-[4/3] rounded-lg border border-[#E6DED5] bg-gradient-to-br from-[#F1ECE6] to-[#FAF8F4] flex items-center justify-center text-sm text-[#6B6B6B]">
                Photo Placeholder
              </div>
              <div className="aspect-[4/3] rounded-lg border border-[#E6DED5] bg-gradient-to-br from-[#F1ECE6] to-[#FAF8F4] flex items-center justify-center text-sm text-[#6B6B6B]">
                Photo Placeholder
              </div>
              <div className="aspect-[4/3] rounded-lg border border-[#E6DED5] bg-gradient-to-br from-[#F1ECE6] to-[#FAF8F4] flex items-center justify-center text-sm text-[#6B6B6B]">
                Photo Placeholder
              </div>
              <div className="aspect-[4/3] rounded-lg border border-[#E6DED5] bg-gradient-to-br from-[#F1ECE6] to-[#FAF8F4] flex items-center justify-center text-sm text-[#6B6B6B]">
                Photo Placeholder
              </div>
            </div>
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
            className="text-[#8FAF9A] hover:text-[#7A9988] font-semibold"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
