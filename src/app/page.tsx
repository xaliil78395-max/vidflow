"use client";

import Script from "next/script";

import { useState } from "react";

type Platform =
  | "youtube"
  | "x"
  | "unknown";

type MediaFormat = {
  id: string;
  label: string;
  extension: "mp4" | "webm" | "mp3";
  quality?: string;
  type: "video" | "audio";
};

type Analysis = {
  platform: Platform;
  platformName: string;
  originalUrl: string;
  status: string;
  message: string;
  title?: string;
  thumbnailUrl?: string;
  channelName?: string;
  duration?: number;
  formats?: MediaFormat[];
};

type DownloadResult = {
  success: boolean;
  processing?: {
    success: boolean;
    status: string;
    message: string;
    outputUrl?: string;
    media?: {
      title?: string;
      formatId: string;
      originalUrl: string;
    };
  };
  error?: string;
};

const platformIcons: Record<Platform, string> = {
  youtube: "▶",
  x: "𝕏",
  unknown: "?",
};

function formatDuration(seconds?: number) {
  if (!seconds) return "—";

  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const remaining = total % 60;

  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("mp3");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [download, setDownload] =
    useState<DownloadResult | null>(null);
  const [error, setError] = useState("");

  const analyzeVideo = async () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Please paste a video URL first.");
      return;
    }

    setLoading(true);
    setError("");
    setDownload(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: trimmedUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to retrieve video information."
        );
      }

      setAnalysis(data.analysis);

      if (
        data.analysis?.formats?.some(
          (format: MediaFormat) => format.id === selectedFormat
        )
      ) {
        return;
      }

      setSelectedFormat("mp3");
    } catch (err) {
      console.error(err);
      setAnalysis(null);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to retrieve video information."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadMedia = async () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Please paste a video URL first.");
      return;
    }

    setLoading(true);
    setError("");
    setDownload(null);

    try {
      let currentAnalysis = analysis;

      if (!currentAnalysis) {
        const analyzeResponse = await fetch(
          "/api/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: trimmedUrl,
            }),
          }
        );

        const analyzeData =
          await analyzeResponse.json();

        if (
          !analyzeResponse.ok ||
          !analyzeData.success
        ) {
          throw new Error(
            analyzeData.error ||
              "Unable to retrieve video information."
          );
        }

        currentAnalysis = analyzeData.analysis;
        setAnalysis(currentAnalysis);
      }

      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: trimmedUrl,
          formatId: selectedFormat,
        }),
      });

      const data: DownloadResult =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to download and process the selected media."
        );
      }

      setDownload(data);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to download and process the selected media."
      );
    } finally {
      setLoading(false);
    }
  };

  const formats = analysis?.formats ?? [];
  const audioFormats = formats.filter(
    (format) => format.type === "audio"
  );
  const videoFormats = formats.filter(
    (format) => format.type === "video"
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight">
            Vid<span className="text-blue-600">Flow</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#how-it-works" className="hover:text-blue-600">
              How it works
            </a>
            <a href="#faq" className="hover:text-blue-600">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <section className="px-6 pb-20 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Fast & Simple YouTube Downloader
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Download videos
            <span className="block text-blue-600">
              from YouTube
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
            Paste a YouTube video link, choose MP4 or MP3,
            and download it in seconds.
          </p>

          <div className="mx-auto mt-10 max-w-3xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:flex-row">
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setAnalysis(null);
                  setDownload(null);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    analyzeVideo();
                  }
                }}
                placeholder="Paste your YouTube URL here..."
                className="min-w-0 flex-1 rounded-xl bg-gray-50 px-5 py-4 text-base outline-none placeholder:text-gray-400 focus:bg-white"
              />

              <button
                onClick={analyzeVideo}
                disabled={loading}
                className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Working..." : "Analyze Video"}
              </button>
            </div>

            <div className="my-8 flex justify-center overflow-hidden">
              <div
                id="container-bbbb0439d7505450ce3053cc823ad3ec"
                className="min-h-[90px]"
              />
              <Script
                id="adsterra-banner"
                async
                strategy="afterInteractive"
                data-cfasync="false"
                src="https://pl31019455.profitableratecpmnetwork.com/bbbb0439d7505450ce3053cc823ad3ec/invoke.js"
              />
            </div>

            {analysis && (
              <div className="mx-auto mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-lg">
                <div className="flex gap-4 border-b border-gray-100 p-5">
                  {analysis.thumbnailUrl ? (
                    <img
                      src={analysis.thumbnailUrl}
                      alt={analysis.title || "Video"}
                      className="h-20 w-32 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
                      {platformIcons[analysis.platform]}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">
                        {analysis.platformName}
                      </h3>

                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                        Video found
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-gray-800">
                      {analysis.title || analysis.message}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                      {analysis.channelName && (
                        <span>
                          Channel:{" "}
                          {analysis.channelName}
                        </span>
                      )}

                      {analysis.duration !== undefined && (
                        <span>
                          Duration:{" "}
                          {formatDuration(
                            analysis.duration
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-3 text-sm font-bold text-gray-700">
                        Audio
                      </p>

                      <div className="space-y-3">
                        {audioFormats.map((format) => (
                          <button
                            key={format.id}
                            onClick={() =>
                              setSelectedFormat(format.id)
                            }
                            className={`w-full rounded-xl border p-4 text-left transition ${
                              selectedFormat === format.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">
                                {format.label}
                              </span>

                              <span className="text-sm text-gray-500">
                                {format.quality}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-sm font-bold text-gray-700">
                        Video
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {videoFormats.map((format) => (
                          <button
                            key={format.id}
                            onClick={() =>
                              setSelectedFormat(format.id)
                            }
                            className={`rounded-xl border p-4 text-left transition ${
                              selectedFormat === format.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <div className="font-semibold">
                              {format.quality}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              MP4
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadMedia}
                    disabled={loading}
                    className="mt-6 w-full rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Working..."
                      : selectedFormat === "mp3"
                        ? "Download MP3 Audio"
                        : `Download ${selectedFormat.replace("mp4-", "")} MP4`}
                  </button>
                </div>

                {download?.processing?.outputUrl && (
                  <div className="border-t border-gray-100 p-5">
                    <div className="rounded-2xl bg-green-50 p-5 text-center">
                      <div className="text-3xl">✓</div>

                      <h3 className="mt-2 text-lg font-bold text-green-800">
                        Your file is ready
                      </h3>

                      <p className="mt-2 text-sm text-green-700">
                        {download.processing.message}
                      </p>

                      <a
                        href={
                          download.processing.outputUrl
                        }
                        download
                        className="mt-5 inline-flex rounded-xl bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
                      >
                        Download{" "}
                        {selectedFormat === "mp3"
                          ? "MP3"
                          : "MP4"}
                      </a>
                    </div>
                  </div>
                )}

                <div className="px-5 pb-5">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Video URL
                    </p>

                    <p className="mt-2 truncate text-sm text-gray-600">
                      {analysis.originalUrl}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mx-auto mt-5 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <p className="mt-4 text-sm text-gray-400">
              Download available YouTube video qualities as MP4 or extract audio as MP3.
            </p>
          </div>


        </div>
      </section>

      <div className="mx-auto flex max-w-6xl justify-center px-6 py-8">
        <Script
          id="adsterra-second"
          strategy="afterInteractive"
          src="https://pl31019456.profitableratecpmnetwork.com/bc/c8/e7/bcc8e7624bdf5ca99cfe254f59bf8545.js"
        />
      </div>

      <section
        id="how-it-works"
        className="border-y border-gray-100 bg-gray-50 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              How it works
            </h2>

            <p className="mt-3 text-gray-500">
              Three simple steps.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Paste the link",
                text: "Copy a video URL from YouTube and paste it above.",
              },
              {
                number: "02",
                title: "Choose your format",
                text: "Choose MP3 audio or the available MP4 video quality.",
              },
              {
                number: "03",
                title: "Download",
                text: "Download your processed YouTube file directly to your device.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-200 bg-white p-7"
              >
                <div className="text-sm font-bold text-blue-600">
                  {step.number}
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-10 space-y-4">
            <details className="rounded-xl border border-gray-200 p-5">
              <summary className="cursor-pointer font-semibold">
                What formats can I download?
              </summary>

              <p className="mt-3 leading-7 text-gray-500">
                VidFlow supports MP3 audio and the MP4 video qualities available for the selected YouTube video.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 p-5">
              <summary className="cursor-pointer font-semibold">
                Do I need an account to use VidFlow?
              </summary>

              <p className="mt-3 leading-7 text-gray-500">
                No. You can analyze and download supported YouTube videos without creating an account.
              </p>
            </details>

            <details className="rounded-xl border border-gray-200 p-5">
              <summary className="cursor-pointer font-semibold">
                Is every video quality available?
              </summary>

              <p className="mt-3 leading-7 text-gray-500">
                No. The available quality depends on the
                original YouTube video. If a selected
                quality does not exist, VidFlow will show
                an error instead of creating an incorrect
                file.
              </p>
            </details>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
          <p>
            © 2026 VidFlow. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-700">
              Privacy
            </a>

            <a href="#" className="hover:text-gray-700">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}











