import type { MediaInfo } from "../types";
import type { MediaProcessor, ProcessingResult } from "./types";
import { runYtDlp } from "../yt-dlp";
import path from "node:path";
import { promises as fs } from "node:fs";

export const youtubeProcessor: MediaProcessor = {
  async process(
    mediaInfo: MediaInfo,
    formatId: string
  ): Promise<ProcessingResult> {
    const format = mediaInfo.formats.find(
      (item) => item.id === formatId
    );

    if (!format) {
      return {
        success: false,
        status: "error",
        message: "Selected YouTube format is not available.",
      };
    }

    const outputDir = path.join(
      process.cwd(),
      "public",
      "generated"
    );

    await fs.mkdir(outputDir, { recursive: true });

    const timestamp = Date.now();

    if (formatId === "mp3") {
      const filename = `youtube-${timestamp}.mp3`;
      const outputPath = path.join(outputDir, filename);

      const result = await runYtDlp([
        "--no-playlist",
        "--no-warnings",
        "--ffmpeg-location",
        process.env.FFMPEG_PATH || "ffmpeg",
        "-x",
        "--audio-format",
        "mp3",
        "--audio-quality",
        "0",
        "-o",
        outputPath,
        mediaInfo.originalUrl,
      ]);

      if (result.code !== 0) {
        console.error(
          "YouTube MP3 error:",
          result.stderr || result.stdout
        );

        return {
          success: false,
          status: "error",
          message: "Unable to download the MP3 file.",
        };
      }

      try {
        await fs.access(outputPath);

        return {
          success: true,
          status: "ready",
          message: "MP3 processed successfully.",
          outputUrl: `/api/files/${encodeURIComponent(filename)}`,
          media: {
            title: mediaInfo.title,
            formatId,
            originalUrl: mediaInfo.originalUrl,
          },
        };
      } catch {
        return {
          success: false,
          status: "error",
          message: "The MP3 file was not created.",
        };
      }
    }

    const match = formatId.match(/^mp4-(\d+)$/);

    if (!match) {
      return {
        success: false,
        status: "error",
        message: "Unsupported YouTube format.",
      };
    }

    const height = Number(match[1]);

    if (!Number.isInteger(height) || height <= 0) {
      return {
        success: false,
        status: "error",
        message: "Invalid video quality.",
      };
    }

    const filename = `youtube-${timestamp}-${height}p.mp4`;
    const outputPath = path.join(outputDir, filename);

    /*
     * Prefer an MP4/H.264 video-only format at the requested
     * resolution, then fall back to the best compatible video.
     *
     * YouTube formats for this video:
     * 144p  -> 160
     * 240p  -> 133
     * 360p  -> 134
     * 480p  -> 135
     * 720p  -> 136
     * 1080p -> 137
     */
    const selector =
      `bestvideo[height=${height}][ext=mp4][vcodec^=avc1]+bestaudio[ext=m4a]/` +
      `bestvideo[height=${height}][ext=mp4]+bestaudio[ext=m4a]/` +
      `bestvideo[height<=${height}][ext=mp4][vcodec^=avc1]+bestaudio[ext=m4a]/` +
      `best[height<=${height}][ext=mp4]`;

    const result = await runYtDlp([
      "--no-playlist",
      "--no-warnings",
      "--ffmpeg-location",
      process.env.FFMPEG_PATH || "ffmpeg",
      "-f",
      selector,
      "--merge-output-format",
      "mp4",
      "-o",
      outputPath,
      mediaInfo.originalUrl,
    ]);

    if (result.code !== 0) {
      console.error(
        "YouTube MP4 error:",
        result.stderr || result.stdout
      );

      const details =
        result.stderr || result.stdout || "";

      if (
        details.includes("Requested format is not available") ||
        details.includes("format is not available")
      ) {
        return {
          success: false,
          status: "error",
          message:
            `The ${height}p quality is not available for this video.`,
        };
      }

      if (
        details.includes("Sign in to confirm") ||
        details.includes("not a bot")
      ) {
        return {
          success: false,
          status: "error",
          message:
            "YouTube requires authentication. Please check the cookies file.",
        };
      }

      return {
        success: false,
        status: "error",
        message:
          `Unable to download ${format.label}.`,
      };
    }

    try {
      await fs.access(outputPath);

      return {
        success: true,
        status: "ready",
        message:
          `${format.label} processed successfully.`,
        outputUrl: `/api/files/${encodeURIComponent(filename)}`,
        media: {
          title: mediaInfo.title,
          formatId,
          originalUrl: mediaInfo.originalUrl,
        },
      };
    } catch {
      return {
        success: false,
        status: "error",
        message: "The MP4 file was not created.",
      };
    }
  },
};

