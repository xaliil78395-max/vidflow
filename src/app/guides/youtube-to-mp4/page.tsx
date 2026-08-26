import Link from "next/link";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/guides" className="text-sm font-semibold text-blue-600">
          ← Back to Guides
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
          YouTube to MP4
        </h1>

        <p className="mt-6 leading-8 text-gray-600">
          VidFlow shows available MP4 video qualities after analyzing a
          supported YouTube video URL.
        </p>

        <h2 className="mt-10 text-2xl font-bold">Choose the available quality</h2>

        <p className="mt-3 leading-8 text-gray-600">
          Depending on the original video, available options may include lower
          resolutions as well as HD, Full HD, or higher qualities.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Important</h2>

        <p className="mt-3 leading-8 text-gray-600">
          VidFlow only presents formats that are available for the analyzed
          source. A quality that is not available in the original source may
          not appear as a download option.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Try YouTube to MP4
        </Link>
      </div>
    </main>
  );
}
