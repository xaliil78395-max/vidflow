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

    /*
     * MP3
     */
    if (formatId === "mp3") {
      const filename = `youtube-${timestamp}.mp3`;
      const outputPath = path.join(outputDir, filename);

      const result = await runYtDlp([
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

        const details =
          result.stderr || result.stdout || "";

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

    /*
     * MP4 quality
     */
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

    const filename =
      `youtube-${timestamp}-${height}p.mp4`;

    const outputPath =
      path.join(outputDir, filename);

    /*
     * Known YouTube MP4 video formats.
     *
     * mweb has been tested successfully on Railway:
     *
     * 144p  -> 160
     * 240p  -> 133
     * 360p  -> 134
     * 480p  -> 135
     * 720p  -> 136
     * 1080p -> 137
     *
     * Audio:
     * 140 -> m4a AAC
     *
     * We use yt-dlp's format filters instead of hardcoding
     * a single format ID because different videos can expose
     * different format IDs.
     */
    const selector =
      `bestvideo[height=${height}][ext=mp4][vcodec^=avc1]+` +
      `bestaudio[ext=m4a]/` +
      `bestvideo[height<=${height}][ext=mp4][vcodec^=avc1]+` +
      `bestaudio[ext=m4a]/` +
      `best[height<=${height}][ext=mp4]`;

    console.log(
      "YouTube MP4 selector:",
      selector
    );

    const result = await runYtDlp([
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

      if (
        details.includes("403") ||
        details.includes("Forbidden")
      ) {
        return {
          success: false,
          status: "error",
          message:
            "YouTube rejected the media request. Please try again.",
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
        outputUrl:
          `/api/files/${encodeURIComponent(filename)}`,
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
        message:
          "The MP4 file was not created.",
      };
    }
  },
};
