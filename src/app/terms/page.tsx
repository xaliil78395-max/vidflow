export const metadata = {
  title: "Terms of Service",
  description:
    "Read the VidFlow Terms of Service governing use of the VidFlow website and media processing service.",
};

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
          Last updated: August 26, 2026
        </p>

        <div className="mt-10 space-y-8 leading-7 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Acceptance of these terms
            </h2>

            <p className="mt-3">
              By accessing or using VidFlow, you agree to use the service
              responsibly and in accordance with these Terms of Service,
              applicable laws, and the rules of any third-party platform
              involved in your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              The VidFlow service
            </h2>

            <p className="mt-3">
              VidFlow provides web-based media processing functionality for
              supported video URLs. Available formats, qualities, processing
              times, and service availability may vary depending on the source
              media and technical conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              User responsibility
            </h2>

            <p className="mt-3">
              You are responsible for the URLs you submit and for ensuring that
              you have the necessary rights, authorization, or permission to
              access, download, process, or otherwise use the requested
              content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Copyright and intellectual property
            </h2>

            <p className="mt-3">
              VidFlow does not claim ownership of content processed through the
              service. Users are responsible for respecting copyright,
              intellectual property rights, licensing requirements, and other
              applicable restrictions relating to third-party content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Prohibited use
            </h2>

            <p className="mt-3">
              You must not use VidFlow for unlawful activity, to violate the
              rights of others, to circumvent applicable restrictions, or in a
              manner that could damage, disrupt, overload, or interfere with
              the service or its infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Availability and changes
            </h2>

            <p className="mt-3">
              VidFlow may change, suspend, limit, or discontinue parts of the
              service when necessary for maintenance, technical reasons,
              security, legal requirements, or future development.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              No guarantee
            </h2>

            <p className="mt-3">
              VidFlow is provided on an as-is and as-available basis. We do not
              guarantee that every supported URL will always work or that a
              particular format, quality, processing speed, or availability
              will always be provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Third-party services
            </h2>

            <p className="mt-3">
              VidFlow may interact with third-party services such as YouTube.
              Those services are operated independently and may have their own
              terms, policies, technical limitations, and requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Changes to these terms
            </h2>

            <p className="mt-3">
              These Terms of Service may be updated as VidFlow evolves. The
              latest version will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Contact
            </h2>

            <p className="mt-3">
              If you have questions about these Terms of Service, please visit
              the Contact page.
            </p>

            <a
              href="/contact"
              className="mt-3 inline-block font-semibold text-blue-600 hover:text-blue-700"
            >
              Contact VidFlow →
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
