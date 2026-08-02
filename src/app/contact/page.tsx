import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Contact Us | 50 Best Wines',
  description: 'Get in touch with the 50 Best Wines team. Questions about our methodology, wine suggestions, corrections, or partnership opportunities.',
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">Contact Us</h1>
          <p className="mt-3 text-text/50">We&apos;d love to hear from you. Get in touch with our team.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <form
              action="https://formspree.io/f/xvzvdjwa"
              method="POST"
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-text/70">
                    Name <span className="text-wine">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-text/70">
                    Email <span className="text-wine">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-text/70">
                  Subject <span className="text-wine">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-wine/40"
                >
                  <option value="">Select a subject...</option>
                  <option value="General">General Inquiry</option>
                  <option value="Methodology">Methodology Question</option>
                  <option value="Wine Suggestion">Wine Suggestion</option>
                  <option value="Correction">Correction / Error Report</option>
                  <option value="Partnership">Partnership / Business</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text/70">
                  Message <span className="text-wine">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40 resize-y"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-wine to-wine-light px-8 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-card-border bg-card-bg p-6">
              <h2 className="mb-4 font-serif text-lg font-bold text-text">50 Best Limited</h2>
              <div className="space-y-4 text-sm text-text/60">
                <p>
                  50 Best Wines is operated by 50 Best Limited, an independent media company focused on curating the world&apos;s best through data-driven, meta-aggregated rankings.
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-1">Email</p>
                  <p>info@50bestwines.com</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-1">Response Time</p>
                  <p>We typically respond within 1-2 business days.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-card-border bg-card-bg p-6">
              <h2 className="mb-4 font-serif text-lg font-bold text-text">Quick Links</h2>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="text-text/60 hover:text-wine transition-colors">About Our Methodology</a></li>
                <li><a href="/submit" className="text-text/60 hover:text-wine transition-colors">Submit a Wine for Review</a></li>
                <li><a href="/privacy-policy" className="text-text/60 hover:text-wine transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-text/60 hover:text-wine transition-colors">Terms of Use</a></li>
              </ul>
            </div>

            <AdUnit format="rectangle" />
          </div>
        </div>
      </div>
    </>
  );
}
