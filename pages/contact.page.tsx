import Head from "next/head";

// Contact page for the I75 League recap site
export default function ContactPage() {
  return (
    <>
      {/* Metadata for SEO and browser tab */}
      <Head>
        <title>Contact – I75 League Recaps</title>
        <meta name="description" content="Get in touch with the I75 League recap team." />
      </Head>

      {/* Main content area for the Contact page */}
      <main data-testid="contact-main" className="pt-6 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-6">
          For questions about the site, to join our league, or to share feedback, drop us a line:
        </p>

        {/* Simple email link for direct contact */}
        <p className="mb-8">
          <a
            data-testid="contact-email-link"
            href="mailto:notCurrentlyActiveEmail@i75league.com"
            className="text-green-600 hover:underline"
          >
            notCurrentlyActiveEmail@i75league.com
          </a>
        </p>

        {/* Contact form (non-functional placeholder) */}
        <form data-testid="contact-form" className="space-y-4">
          {/* Name field section */}
          <div data-testid="contact-form-name-section">
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Email field section */}
          <div data-testid="contact-form-email-section">
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Message field section */}
          <div data-testid="contact-form-message-section">
            <label className="block mb-1 font-medium" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Submit button (currently non-functional) */}
          <button
            data-testid="contact-form-submit"
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Send Message - Not Functional
          </button>
        </form>
      </main>
    </>
  );
}
