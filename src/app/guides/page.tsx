import Link from "next/link";

const guides = [
  {
    title: "How to Download YouTube Videos",
    description:
      "Learn how to analyze a YouTube video, choose an available format, and download it with VidFlow.",
    href: "/guides/how-to-download-youtube-videos",
  },
  {
    title: "YouTube to MP3",
    description:
      "Learn how to extract available YouTube audio as an MP3 file using VidFlow.",
    href: "/guides/youtube-to-mp3",
  },
  {
    title: "YouTube to MP4",
    description:
      "Learn how to download available YouTube video formats as MP4 files.",
    href: "/guides/youtube-to-mp4",
  },
  {
    title: "Download YouTube Videos in 1080p",
    description:
      "Learn how to select and download an available 1080p Full HD version of a YouTube video.",
    href: "/guides/download-youtube-1080p",
  },
  {
    title: "Download YouTube Videos in 4K",
    description:
      "Learn how to download an available 4K YouTube video when the original video provides that quality.",
    href: "/guides/download-youtube-4k",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            Vid<span className="text-blue-600">Flow</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-gray-600 hover:text-blue-600"
          >
            Back to downloader
          </Link>
        </div>
      </header>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              VidFlow Guides
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Helpful guides for understanding available YouTube video and
              audio formats and using VidFlow.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:border-blue-300 hover:shadow-lg"
              >
                <h2 className="text-xl font-bold">
                  {guide.title}
                </h2>

                <p className="mt-3 leading-7 text-gray-500">
                  {guide.description}
                </p>

                <p className="mt-5 font-semibold text-blue-600">
                  Read guide →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
