export const metadata = {
  title: "About VidFlow",
  description:
    "Learn more about VidFlow, a simple YouTube media processing tool.",
};

export default function AboutPage() {
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
          About VidFlow
        </h1>

        <div className="mt-10 space-y-8 leading-7 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900">
              What is VidFlow?
            </h2>

            <p className="mt-3">
              VidFlow is a simple web-based media processing tool designed
              to make working with supported YouTube video URLs straightforward.
              Users can analyze a supported video and view the media formats
              available for processing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Simple by design
            </h2>

            <p className="mt-3">
              VidFlow focuses on a clear interface and a simple workflow.
              There is no account requirement for the basic service, and the
              available formats are displayed after a video is analyzed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Responsible use
            </h2>

            <p className="mt-3">
              VidFlow is intended to provide media processing functionality.
              Users are responsible for making sure that their use of the
              service complies with applicable laws, copyright requirements,
              platform rules, and the rights of content owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Our goal
            </h2>

            <p className="mt-3">
              Our goal is to keep VidFlow fast, simple, transparent, and easy
              to use while continuing to improve reliability and the overall
              user experience.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
