export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <a
          href="/"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to VidFlow
        </a>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-500">
          Last updated: August 24, 2026
        </p>

        <div className="mt-10 space-y-8 leading-7 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Information we collect
            </h2>
            <p className="mt-3">
              VidFlow does not require an account. Video URLs submitted to
              VidFlow may be processed temporarily in order to analyze and
              generate the requested media file.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Generated files
            </h2>
            <p className="mt-3">
              Generated media files are stored temporarily for processing and
              downloading. Older generated files may be automatically removed
              by the system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Third-party services
            </h2>
            <p className="mt-3">
              VidFlow may interact with third-party platforms such as YouTube
              when processing a URL submitted by a user. Their own privacy
              policies and terms may also apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Contact
            </h2>
            <p className="mt-3">
              If you have questions about this Privacy Policy, please contact
              the VidFlow website operator.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
