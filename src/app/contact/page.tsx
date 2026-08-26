export const metadata = {
  title: "Contact VidFlow",
  description:
    "Contact the VidFlow website operator with questions, feedback, or service issues.",
};

export default function ContactPage() {
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
          Contact VidFlow
        </h1>

        <div className="mt-10 space-y-8 leading-7 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Get in touch
            </h2>

            <p className="mt-3">
              If you have questions, feedback, or experience a technical
              problem while using VidFlow, you can contact the website
              operator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Technical issues
            </h2>

            <p className="mt-3">
              When reporting a technical problem, please include the type of
              issue you experienced and, when possible, the general steps that
              led to the problem. Please do not send passwords, private
              credentials, or other sensitive information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Service feedback
            </h2>

            <p className="mt-3">
              Feedback about the interface, supported formats, processing
              experience, or general usability is welcome and may help improve
              VidFlow.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
