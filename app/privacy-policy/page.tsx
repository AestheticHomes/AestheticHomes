import type { Metadata } from 'next'
import { SITE, CONTACT } from '@/lib/constants'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/privacy-policy', {
    title: 'Privacy Policy',
    description: `Privacy policy for ${SITE.name}.`,
  })
}

export default function Page() {
  return (
    <section className="sec">
      <div className="container max-w-4xl">
        <header className="mb-12">
          <h1 className="sec__title">Privacy Policy</h1>
          <p className="sec__sub">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div className="space-y-10 text-base md:text-lg leading-relaxed opacity-90">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Welcome to <strong>{SITE.name}</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website ({SITE.url}) and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you when you inquire about our interior design and execution services:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, and title.</li>
              <li><strong>Contact Data</strong> includes email address, telephone numbers, and property address for site visits.</li>
              <li><strong>Project Data</strong> includes floor plans, design preferences, budget estimates, and requirements for your home interiors.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting, and device information used to access this website.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To contact you and arrange a free site visit or design consultation.</li>
              <li>To provide 3D designs, quotations, and manage your interior project.</li>
              <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
              <li>To administer and protect our business and this website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorised way. We limit access to your personal data to those employees, contractors, and third parties (such as delivery partners or carpenters) who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing. If you wish to exercise any of these rights, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="p-6 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10">
              <p className="font-semibold text-xl mb-3">{SITE.legalName}</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="font-medium min-w-[80px]">Email:</span>
                  <a href={`mailto:${CONTACT.email}`} className="hover:underline">{CONTACT.email}</a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium min-w-[80px]">Phone:</span>
                  <a href={`tel:${CONTACT.phone1}`} className="hover:underline">{CONTACT.phone1Display}</a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium min-w-[80px]">Address:</span>
                  <span>{CONTACT.address.full}</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
