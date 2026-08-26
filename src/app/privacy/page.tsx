export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the VidFlow Privacy Policy and learn how information is handled when using the service.",
};

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
          Last updated: August 26, 2026
        </p>

        <div className="mt-10 space-y-8 leading-7 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Introduction
            </h2>

            <p className="mt-3">
              This Privacy Policy explains how VidFlow handles information
              when you use the VidFlow website and its media processing
              features. We aim to keep the service simple and collect only
              information that is reasonably necessary to operate the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Information you provide
            </h2>

            <p className="mt-3">
              VidFlow does not require users to create an account for the basic
              service. When you submit a supported video URL, the URL is sent
              to our service so that the requested media can be analyzed and
              processed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Video URLs and processing
            </h2>

            <p className="mt-3">
              Submitted URLs may be temporarily processed by VidFlow to
              retrieve available media information and generate the requested
              output. VidFlow does not need to permanently store submitted
              URLs in order to provide the basic processing service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Generated files
            </h2>

            <p className="mt-3">
              Generated media files may be stored temporarily while processing
              and downloading take place. Temporary files may be automatically
              removed as part of normal system maintenance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Cookies and advertising
            </h2>

            <p className="mt-3">
              VidFlow may use third-party advertising services. These services
              may use cookies, similar technologies, or other information to
              display and measure advertisements according to their own
              policies and applicable requirements.
            </p>

            <p className="mt-3">
              Third-party advertising providers may have their own privacy
              policies explaining how they process information. Users should
              review those policies when interacting with advertisements or
              third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Third-party services
            </h2>

            <p className="mt-3">
              VidFlow may interact with third-party platforms, including
              YouTube, when processing supported URLs. Those platforms may
              process information according to their own privacy policies and
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Security
            </h2>

            <p className="mt-3">
              We take reasonable technical measures to operate VidFlow and
              protect information processed by the service. However, no
              internet service can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Children's privacy
            </h2>

            <p className="mt-3">
              VidFlow is not specifically directed toward children. Users
              should use the service responsibly and in accordance with
              applicable laws and platform requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Changes to this policy
            </h2>

            <p className="mt-3">
              This Privacy Policy may be updated from time to time as VidFlow
              develops or as legal and technical requirements change. The
              latest version will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Contact
            </h2>

            <p className="mt-3">
              If you have questions about this Privacy Policy, please visit
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
