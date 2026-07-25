'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Welcome! You will receive our weekly wine picks soon.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-wine/20 bg-gradient-to-br from-[#1a0a10] via-[#0e0608] to-[#080808] p-8 sm:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-wine/70">
            Stay in the know
          </p>
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">
            Get Weekly Wine Picks
          </h2>
          <p className="mt-3 text-text/50">
            Curated selections from our editors, delivered every Friday. Discover outstanding
            wines before everyone else.
          </p>

          {status === 'success' ? (
            <div className="mt-8 rounded-xl border border-emerald-900/30 bg-emerald-950/20 px-6 py-4">
              <p className="text-sm font-medium text-emerald-400">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full rounded-xl border border-card-border bg-[#111] px-5 py-3.5 text-sm text-text placeholder-text/30 outline-none transition-colors focus:border-wine/40 sm:max-w-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-wine to-wine-light px-8 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-xs text-red-400">{message}</p>
          )}

          <p className="mt-4 text-[11px] text-text/25">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
