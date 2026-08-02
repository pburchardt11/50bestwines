import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Submit a Wine for Review | 50 Best Wines',
  description: 'Submit a wine for consideration in our rankings. Tell us about a wine that deserves recognition from the world\'s top critics.',
};

export default function SubmitPage() {
  return (
    <>
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">Submit a Wine</h1>
          <p className="mt-3 text-text/50">Know a wine that deserves recognition? Tell us about it.</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-xl border border-wine/20 bg-wine/5 p-5">
          <h2 className="font-serif text-lg font-bold text-text">How It Works</h2>
          <p className="mt-2 text-sm text-text/60">
            Submit a wine you believe should be included in our rankings. Our editorial team reviews every submission and considers wines that meet our criteria: the wine must have been reviewed by at least one of our tracked critic sources (Wine Spectator, Robert Parker, James Suckling, Decanter, Wine Enthusiast, Vivino, Jancis Robinson, or Tim Atkin). We do not guarantee inclusion, but every submission is reviewed.
          </p>
        </div>

        <form
          action="https://formspree.io/f/xvzvdjwa"
          method="POST"
          className="space-y-6"
        >
          <input type="hidden" name="_subject" value="Wine Submission - 50 Best Wines" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="wine-name" className="mb-2 block text-sm font-medium text-text/70">
                Wine Name <span className="text-wine">*</span>
              </label>
              <input
                type="text"
                id="wine-name"
                name="wine_name"
                required
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
                placeholder="e.g. Opus One"
              />
            </div>
            <div>
              <label htmlFor="producer" className="mb-2 block text-sm font-medium text-text/70">
                Producer / Winery <span className="text-wine">*</span>
              </label>
              <input
                type="text"
                id="producer"
                name="producer"
                required
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
                placeholder="e.g. Opus One Winery"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="vintage" className="mb-2 block text-sm font-medium text-text/70">
                Vintage
              </label>
              <input
                type="number"
                id="vintage"
                name="vintage"
                min="1900"
                max="2030"
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
                placeholder="e.g. 2020"
              />
            </div>
            <div>
              <label htmlFor="wine-type" className="mb-2 block text-sm font-medium text-text/70">
                Wine Type <span className="text-wine">*</span>
              </label>
              <select
                id="wine-type"
                name="wine_type"
                required
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-wine/40"
              >
                <option value="">Select type...</option>
                <option value="Red">Red</option>
                <option value="White">White</option>
                <option value="Rosé">Ros&eacute;</option>
                <option value="Sparkling">Sparkling</option>
                <option value="Dessert">Dessert</option>
                <option value="Fortified">Fortified</option>
              </select>
            </div>
            <div>
              <label htmlFor="grape" className="mb-2 block text-sm font-medium text-text/70">
                Primary Grape
              </label>
              <input
                type="text"
                id="grape"
                name="grape"
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
                placeholder="e.g. Cabernet Sauvignon"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="region" className="mb-2 block text-sm font-medium text-text/70">
                Region <span className="text-wine">*</span>
              </label>
              <input
                type="text"
                id="region"
                name="region"
                required
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
                placeholder="e.g. Napa Valley"
              />
            </div>
            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-medium text-text/70">
                Country <span className="text-wine">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                required
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
                placeholder="e.g. United States"
              />
            </div>
          </div>

          <div>
            <label htmlFor="submitter-email" className="mb-2 block text-sm font-medium text-text/70">
              Your Email <span className="text-wine">*</span>
            </label>
            <input
              type="email"
              id="submitter-email"
              name="email"
              required
              className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium text-text/70">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40 resize-y"
              placeholder="Why should this wine be included? Any known critic scores or awards?"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-wine to-wine-light px-8 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            Submit Wine
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>

        <AdUnit format="horizontal" className="mt-12" />
      </div>
    </>
  );
}
