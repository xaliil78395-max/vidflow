import Link from "next/link";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/guides" className="text-sm font-semibold text-blue-600">
          ← Back to Guides
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
          How to Download YouTube Videos in 1080p
        </h1>

        <p className="mt-6 leading-8 text-gray-600">
          If a supported YouTube video has an available 1080p version,
          VidFlow can display that quality as an MP4 option.
        </p>

        <h2 className="mt-10 text-2xl font-bold">Steps</h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-gray-600">
          <li>Paste the YouTube URL into VidFlow.</li>
          <li>Analyze the video.</li>
          <li>Check the available video qualities.</li>
          <li>Select 1080p if it appears in the list.</li>
          <li>Process and download the MP4 file.</li>
        </ol>

        <p className="mt-8 leading-8 text-gray-600">
          The presence of 1080p depends on the source video and the formats
          available for processing.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Check available 1080p formats
        </Link>
      </div>
    </main>
  );
}
