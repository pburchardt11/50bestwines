import type { Metadata } from 'next';

export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'Privacy Policy | 50 Best Wines',
  description: 'Privacy policy for 50 Best Wines. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-text/50">Last updated: July 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-sm leading-relaxed text-text/60">
          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">1. Introduction</h2>
            <p>
              50 Best Wines (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated by 50 Best Limited, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at 50bestwines.com (the &quot;Site&quot;).
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="text-text/80">Personal Information:</strong> When you contact us or submit a form, we may collect your name, email address, and any other information you voluntarily provide.</li>
              <li><strong className="text-text/80">Usage Data:</strong> We automatically collect information about your device, browser, IP address, pages visited, time spent on pages, and referring URLs through analytics tools.</li>
              <li><strong className="text-text/80">Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience, analyze site usage, and serve relevant advertisements.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">3. How We Use Your Information</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>To operate, maintain, and improve our website and services.</li>
              <li>To respond to your inquiries, comments, or questions.</li>
              <li>To analyze usage patterns and optimize our content and user experience.</li>
              <li>To display relevant advertisements through third-party ad networks (such as Google AdSense).</li>
              <li>To comply with legal obligations and enforce our terms of use.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">4. Third-Party Services</h2>
            <p className="mb-3">We may use third-party services that collect, monitor, and analyze data:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="text-text/80">Google AdSense:</strong> We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our site or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-wine underline hover:text-wine-light" target="_blank" rel="noopener noreferrer">Google&apos;s Ad Settings</a>.</li>
              <li><strong className="text-text/80">Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our site. Data collected includes pages visited, session duration, and approximate geographic location.</li>
              <li><strong className="text-text/80">Affiliate Partners:</strong> We include links to third-party wine retailers. When you click these links and make a purchase, we may earn a commission. These partners may use their own cookies.</li>
              <li><strong className="text-text/80">Formspree:</strong> Contact form submissions are processed through Formspree, which may temporarily store your submitted data.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">5. Cookies</h2>
            <p>
              Cookies are small text files placed on your device. You can configure your browser to refuse cookies or alert you when cookies are being sent. However, some features of the Site may not function properly without cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">6. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Usage data is typically retained for analytics purposes for up to 26 months.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">7. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Withdraw consent at any time (where processing is based on consent).</li>
              <li>Lodge a complaint with a data protection authority.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, please contact us at info@50bestwines.com.</p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">8. Children&apos;s Privacy</h2>
            <p>
              Our Site is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we discover that a minor has provided us with personal information, we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on servers located outside your country of residence. By using the Site, you consent to such transfers. We take reasonable steps to ensure your data is treated securely and in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. Your continued use of the Site after changes are posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl font-bold text-text">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
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
