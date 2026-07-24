import type { Metadata } from 'next';

export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'Terms of Use | 50 Best Wines',
  description: 'Terms of use for 50 Best Wines. Read our terms and conditions for using our website and services.',
};

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">Terms of Use</h1>
          <p className="mt-3 text-text/50">Last updated: July 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-text/60">
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">1. Acceptance of Terms</h2>
            <p>
              By accessing and using 50bestwines.com (the &quot;Site&quot;), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Site. The Site is operated by 50 Best Limited.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">2. Description of Service</h2>
            <p>
              50 Best Wines provides aggregated wine rankings, reviews, and editorial content compiled from publicly available wine critic scores and publications. Our service is informational in nature and is intended to help consumers make informed wine purchasing decisions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">3. Intellectual Property</h2>
            <p>
              All content on this Site, including but not limited to text, graphics, logos, data compilations, aggregated scores, editorial reviews, and software, is the property of 50 Best Limited or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from this Site without prior written permission from 50 Best Limited.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">4. Accuracy of Information</h2>
            <p>
              While we strive to provide accurate and up-to-date wine rankings and information, we make no warranties or representations regarding the completeness, accuracy, reliability, or availability of any information on the Site. Wine scores are aggregated from third-party sources and may change over time.
            </p>
            <p className="mt-3">
              Prices, availability, and retailer information are provided for informational purposes only and may not reflect current market conditions. Always verify pricing and availability with the retailer before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">5. Affiliate Links & Advertising</h2>
            <p>
              The Site contains affiliate links to third-party wine retailers and other commercial partners. When you click on these links and make a purchase, we may earn a commission at no additional cost to you. These affiliate relationships do not influence our rankings or editorial content.
            </p>
            <p className="mt-3">
              We also display advertisements through third-party ad networks, including Google AdSense. The display of advertisements does not constitute an endorsement of the products or services advertised.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">6. User Submissions</h2>
            <p>
              If you submit information to us through our contact form, wine submission form, or any other means, you grant 50 Best Limited a non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, and publish such content in connection with our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">7. Prohibited Uses</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Use the Site for any unlawful purpose or in violation of these Terms.</li>
              <li>Scrape, crawl, or use automated means to access the Site or extract data without our prior written consent.</li>
              <li>Attempt to interfere with the proper functioning of the Site.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
              <li>Use the Site to transmit spam, malware, or other harmful content.</li>
              <li>Reproduce or redistribute our rankings or scores for commercial purposes without permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">8. Alcohol-Related Disclaimer</h2>
            <p>
              The Site provides information about alcoholic beverages. You must be of legal drinking age in your jurisdiction to purchase alcohol. We do not sell alcohol directly. Always drink responsibly and in accordance with local laws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, 50 Best Limited and its directors, employees, partners, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, arising from your use of or inability to use the Site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless 50 Best Limited and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising from your use of the Site or your violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">11. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">12. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated effective date. Your continued use of the Site after any modifications constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Site shall be resolved in the courts of the UAE.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">14. Contact</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="mt-3 rounded-xl border border-card-border bg-card-bg p-4">
              <p className="font-medium text-text/80">50 Best Limited</p>
              <p>Email: info@50bestwines.com</p>
              <p>Website: <a href="https://50bestwines.com" className="text-wine underline hover:text-wine-light">50bestwines.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
