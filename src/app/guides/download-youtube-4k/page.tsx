import Link from "next/link";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/guides" className="text-sm font-semibold text-blue-600">
          ← Back to Guides
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
          How to Download YouTube Videos in 4K
        </h1>

        <p className="mt-6 leading-8 text-gray-600">
          Some YouTube videos are published in 4K resolution. When a supported
          source provides an available 4K format, VidFlow may display that
          option during analysis.
        </p>

        <h2 className="mt-10 text-2xl font-bold">Steps</h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-gray-600">
          <li>Copy the YouTube video URL.</li>
          <li>Paste it into VidFlow.</li>
          <li>Analyze the video.</li>
          <li>Look for an available 2160p or 4K option.</li>
          <li>Select the format and begin processing.</li>
        </ol>

        <h2 className="mt-8 text-2xl font-bold">Why might 4K not appear?</h2>

        <p className="mt-3 leading-8 text-gray-600">
          Not every YouTube video is uploaded in 4K. Available qualities depend
          on the original source and the formats that can be processed.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Check available 4K formats
        </Link>
      </div>
    </main>
  );
}
