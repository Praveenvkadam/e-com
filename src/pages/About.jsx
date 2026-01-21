import Navbar from "@/components/Navbar";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          This application is built as a practical, real‑world e‑commerce
          frontend. The priority is correctness, maintainability, and predictable
          behavior — not flashy demos or fragile shortcuts.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Authentication is handled using Firebase to provide secure,
          production‑grade user sessions. Application state is managed with
          Redux, keeping cart, payment, and UI logic explicit and testable.
        </p>

        <p className="text-gray-700 leading-relaxed mb-10">
          Every design decision favors clarity over cleverness. Pages are simple,
          flows are deterministic, and side effects are isolated. This approach
          scales cleanly as features grow instead of collapsing under technical
          debt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold mb-2">Reliable Architecture</h2>
            <p className="text-sm text-gray-600">
              State management, routing, and authentication are clearly
              separated. Each layer has a single responsibility.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold mb-2">Security‑First Auth</h2>
            <p className="text-sm text-gray-600">
              Firebase Authentication ensures secure sign‑in, session
              persistence, and industry‑standard identity handling.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold mb-2">Built to Scale</h2>
            <p className="text-sm text-gray-600">
              The codebase is structured to support real payments, APIs, and
              backend integrations without rewrites.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
