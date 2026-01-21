import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <p className="text-gray-700 leading-relaxed mb-10">
          This project is a demonstration application. If you have questions,
          feedback, or want to discuss implementation details, use the form
          below. Messages are not persisted or sent — this is a UI‑only contact
          page.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-semibold mb-4">Get in touch</h2>
            <p className="text-sm text-gray-600 mb-6">
              For real applications, this form would connect to a backend or
              email service. Here, it exists to complete the user flow and page
              structure.
            </p>

            <ul className="text-sm text-gray-700 space-y-2">
              <li>Email: support@example.com</li>
              <li>Location: Remote / Global</li>
              <li>Response time: N/A (demo)</li>
            </ul>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your message"
                disabled
              />
            </div>

            <button
              type="button"
              disabled
              className="w-full rounded-xl bg-black text-white py-3 opacity-50 cursor-not-allowed"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
