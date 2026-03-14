import Link from "next/link";
import Countdown from "./components/Countdown";

export default function Home() {
  const adminDashboardUrl =
    process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ?? "http://localhost:3001";

  return (
    <main className="bg-[#FAF8F4] text-[#2F2F2F]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#F1ECE6]">
        <div className="wedding-container py-4 flex justify-between items-center">
          <Link href="/" className="font-display text-2xl font-semibold">
            The Wedding
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/" className="wedding-nav-link wedding-nav-link-active">Home</Link>
            <Link href="/our-story" className="wedding-nav-link">Our Story</Link>
            <Link href="/details" className="wedding-nav-link">Details</Link>
            <Link href="/rsvp" className="wedding-nav-link">RSVP</Link>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <Link
              href="/admin"
              className="wedding-button-primary"
              title="Bride and Groom only"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="wedding-section">
        <div className="wedding-container space-y-8 md:space-y-12 text-center">
          {/* Main heading */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="font-display text-6xl md:text-7xl font-light tracking-tight">
                Luiza & Raphael
              </h1>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8FAF9A] to-transparent max-w-xs mx-auto" />
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-[#6B6B6B] font-light">
                June 12th, 2027
              </p>
              <p className="text-lg md:text-xl text-[#6B6B6B] font-light italic max-w-2xl mx-auto leading-relaxed">
                It's not going to be a wedding,<br />
                <span className="font-semibold not-italic">it's going to be The Wedding</span>
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/rsvp" className="wedding-button-primary-lg">
              RSVP
            </Link>
            <Link href="/honeymoon" className="wedding-button-secondary-lg">
              Honeymoon Fund
            </Link>
          </div>
        </div>
      </section>

      {/* Countdown (simple visual) */}
      <section className="bg-white/50 border-y border-[#F1ECE6]">
        <div className="wedding-container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-sm text-[#6B6B6B] mb-2">Days until</p>
              <p className="text-4xl font-display font-semibold text-[#8FAF9A]">
                <Countdown />
              </p>
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-2">Location</p>
              <p className="text-lg font-medium">São Paulo</p>
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-2">Time</p>
              <p className="text-lg font-medium">4:00 PM</p>
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-2">Status</p>
              <p className="text-lg font-medium">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="wedding-section">
        <div className="wedding-container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-display text-5xl font-light">What To Expect</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8FAF9A] to-transparent max-w-xs mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="wedding-card">
              <div className="text-5xl mb-6">📅</div>
              <h3 className="font-display text-2xl mb-4">Ceremony</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Join us for an intimate ceremony celebrating our love, followed by an elegant reception with good food, music, and dancing.
              </p>
            </div>

            {/* Card 2 */}
            <div className="wedding-card">
              <div className="text-5xl mb-6">🎉</div>
              <h3 className="font-display text-2xl mb-4">Celebration</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                A beautiful evening of celebration with family and friends. Expect good vibes, great food, and unforgettable moments.
              </p>
            </div>

            {/* Card 3 */}
            <div className="wedding-card">
              <div className="text-5xl mb-6">✈️</div>
              <h3 className="font-display text-2xl mb-4">Honeymoon</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                Help us create unforgettable memories on our dream honeymoon. Every contribution brings us closer to paradise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Honeymoon Fund CTA */}
      <section className="wedding-section bg-white border-t border-[#F1ECE6]">
        <div className="wedding-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-5xl font-light">
                Our Honeymoon
              </h2>
              <div className="h-px bg-[#8FAF9A] w-16" />
              <p className="text-lg text-[#6B6B6B] leading-relaxed">
                Instead of a traditional registry, we're putting together a honeymoon fund. Help us create the memories of a lifetime by contributing to specific experiences we want to share.
              </p>
              <div className="pt-4">
                <Link href="/honeymoon" className="wedding-button-primary-lg">
                  Browse Honeymoon Items
                </Link>
              </div>
            </div>
            <div className="bg-[#F1ECE6] rounded-2xl p-8 text-center">
              <p className="text-sm text-[#6B6B6B] mb-2">Dream Destination</p>
              <h3 className="font-display text-4xl mb-4">Italy</h3>
              <p className="text-[#6B6B6B]">
                A romantic journey through tuscany, Venice, and the Amalfi Coast filled with love, culture, and unforgettable moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="text-center space-y-8 mb-12">
            <h2 className="font-display text-5xl font-light">Please Join Us</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-[#8FAF9A] to-transparent max-w-xs mx-auto" />
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              Your presence is the greatest gift. Please join us for an unforgettable celebration of love.
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/rsvp" className="wedding-button-primary-lg">
              RSVP Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#F1ECE6] mt-20">
        <div className="wedding-container py-12 text-center space-y-4">
          <p className="font-display text-2xl font-light">The Wedding</p>
          <p className="text-sm text-[#6B6B6B]">
            Luiza & Raphael • June 12th, 2027 • São Paulo, Brazil
          </p>
          <p className="text-xs text-[#6B6B6B]">
            With love ❤️
          </p>
        </div>
      </footer>
    </main>
  );
}
