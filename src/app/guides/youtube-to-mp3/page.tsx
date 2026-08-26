import Link from "next/link";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/guides" className="text-sm font-semibold text-blue-600">
          ← Back to Guides
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
          YouTube to MP3
        </h1>

        <p className="mt-6 leading-8 text-gray-600">
          VidFlow can process the audio of a supported YouTube video and
          generate an MP3 file.
        </p>

        <h2 className="mt-10 text-2xl font-bold">How it works</h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-gray-600">
          <li>Copy a supported YouTube video URL.</li>
          <li>Paste the URL into VidFlow.</li>
          <li>Analyze the video.</li>
          <li>Select the available MP3 audio option.</li>
          <li>Start processing and download the generated file.</li>
        </ol>

        <p className="mt-8 leading-8 text-gray-600">
          Processing availability may depend on the source video and technical
          conditions.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Try YouTube to MP3
        </Link>
      </div>
    </main>
  );
}
