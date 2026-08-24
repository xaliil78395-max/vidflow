export default function TermsPage() {
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
          Terms of Service
        </h1>

        <p className="mt-4 text-gray-500">
          Last updated: August 24, 2026
        </p>

        <div className="mt-10 space-y-8 leading-7 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Acceptable use
            </h2>
            <p className="mt-3">
              You are responsible for ensuring that your use of VidFlow
              complies with applicable laws, platform rules, copyright
              requirements, and the rights of content owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              User responsibility
            </h2>
            <p className="mt-3">
              VidFlow provides media processing functionality. Users are
              responsible for the URLs they submit and for determining whether
              they have the necessary rights or permission to download or
              process the requested content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Availability
            </h2>
            <p className="mt-3">
              VidFlow is provided on an as-is basis. Availability, supported
              formats, processing time, and video quality may vary depending on
              the source media and technical conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Changes
            </h2>
            <p className="mt-3">
              These terms may be updated as VidFlow evolves. Continued use of
              the service after changes are published constitutes acceptance of
              the updated terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
