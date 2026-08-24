import { runYtDlp } from "./yt-dlp";
import type { MediaInfo, SupportedPlatform } from "./types";

const platformNames: Record<SupportedPlatform, string> = {
  youtube: "YouTube",
};

type YtDlpFormat = {
  format_id?: string;
  ext?: string;
  height?: number;
  width?: number;
  vcodec?: string;
  acodec?: string;
  resolution?: string;
  format_note?: string;
  filesize?: number;
  filesize_approx?: number;
  tbr?: number;
};

export async function createMediaInfo(
  platform: SupportedPlatform,
  url: string
): Promise<MediaInfo> {
  try {
    const result = await runYtDlp([
      "--dump-single-json",
      "--no-playlist",
      "--skip-download",
      "--no-warnings",
      url,
    ]);

    if (result.code !== 0) {
      console.error("yt-dlp stderr:", result.stderr);

      throw new Error(
        result.stderr || "yt-dlp failed to analyze the YouTube media."
      );
    }

    if (!result.stdout.trim()) {
      throw new Error("yt-dlp returned no data.");
    }

    const data = JSON.parse(result.stdout) as {
      title?: string;
      thumbnail?: string;
      uploader?: string;
      channel?: string;
      duration?: number;
      formats?: YtDlpFormat[];
    };

    const formats: MediaInfo["formats"] = [];

    formats.push({
      id: "mp3",
      label: "MP3 Audio",
      extension: "mp3",
      quality: "Best audio",
      type: "audio",
    });

    const videoHeights = new Set<number>();

    for (const format of data.formats ?? []) {
      if (
        typeof format.height === "number" &&
        format.height > 0 &&
        format.vcodec &&
        format.vcodec !== "none"
      ) {
        videoHeights.add(format.height);
      }
    }

    const sortedHeights = Array.from(videoHeights).sort(
      (a, b) => a - b
    );

    for (const height of sortedHeights) {
      let label = `MP4 ${height}p`;

      if (height >= 2160) {
        label = `MP4 ${height}p 4K`;
      } else if (height >= 1080) {
        label = `MP4 ${height}p Full HD`;
      } else if (height >= 720) {
        label = `MP4 ${height}p HD`;
      }

      formats.push({
        id: `mp4-${height}`,
        label,
        extension: "mp4",
        quality: `${height}p`,
        type: "video",
      });
    }

    return {
      platform,
      platformName: platformNames[platform],
      originalUrl: url,
      title: data.title,
      thumbnailUrl: data.thumbnail,
      channelName: data.uploader || data.channel,
      duration:
        typeof data.duration === "number"
          ? data.duration
          : undefined,
      status: "ready",
      formats,
      message: "YouTube media is ready for processing.",
    };
  } catch (error) {
    console.error("YouTube analysis error:", error);

    return {
      platform,
      platformName: platformNames[platform],
      originalUrl: url,
      status: "error",
      formats: [],
      message:
        error instanceof Error
          ? `yt-dlp error: ${error.message}`
          : `yt-dlp error: ${String(error)}`,
    };
  }
}
