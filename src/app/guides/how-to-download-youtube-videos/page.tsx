import Link from "next/link";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/guides" className="text-sm font-semibold text-blue-600">
          ← Back to Guides
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
          How to Download YouTube Videos
        </h1>

        <p className="mt-6 leading-8 text-gray-600">
          VidFlow allows you to analyze a supported YouTube video URL and
          choose from the media formats that are available for that video.
        </p>

        <h2 className="mt-10 text-2xl font-bold">Step 1: Copy the video URL</h2>
        <p className="mt-3 leading-8 text-gray-600">
          Open YouTube, copy the link of the video you want to process, and
          return to VidFlow.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Step 2: Analyze the video</h2>
        <p className="mt-3 leading-8 text-gray-600">
          Paste the URL into VidFlow and select Analyze Video. The service will
          retrieve information about the video and show the available formats.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Step 3: Choose a format</h2>
        <p className="mt-3 leading-8 text-gray-600">
          Select MP3 audio or one of the available MP4 video qualities.
          Available options depend on the original source video.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Step 4: Download the file</h2>
        <p className="mt-3 leading-8 text-gray-600">
          Start processing the selected format. When processing is complete,
          VidFlow provides a download button for the generated file.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Open VidFlow
        </Link>
      </div>
    </main>
  );
}
