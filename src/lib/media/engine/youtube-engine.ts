import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

export type YoutubeDownloadResult = {
  success: boolean;
  message: string;
  outputUrl?: string;
};

function getYtDlpPath(): string {
  return process.env.YTDLP_PATH || "yt-dlp.exe";
}

function getFfmpegPath(): string {
  if (process.platform === "linux") {
    return "/usr/bin";
  }

  return process.env.FFMPEG_PATH || "ffmpeg";
}

function getCookiesPath(): string {
  return (
    process.env.YOUTUBE_COOKIES_PATH ||
    path.join(process.cwd(), "cookies", "youtube.txt")
  );
}

export async function downloadYoutubeMedia(
  sourceUrl: string,
  formatId: string
): Promise<YoutubeDownloadResult> {
  const outputDir = path.join(
    process.cwd(),
    "public",
    "generated"
  );

  await fs.mkdir(outputDir, { recursive: true });

  const ytDlp = getYtDlpPath();
  const ffmpeg = getFfmpegPath();
  const cookies = getCookiesPath();

  const isMp3 = formatId === "mp3";

  const qualityMap: Record<string, string> = {
    "360p": "360",
    "480p": "480",
    "720p": "720",
    "1080p": "1080",
  };

  const commonArgs = [
    "--force-ipv4",
    "--no-playlist",
    "--no-warnings",
    "--cookies",
    cookies,
    "--ffmpeg-location",
    ffmpeg,
  ];

  if (isMp3) {
    const filename = `youtube-${Date.now()}.mp3`;
    const outputPath = path.join(outputDir, filename);

    const args = [
      ...commonArgs,
      "-x",
      "--audio-format",
      "mp3",
      "--audio-quality",
      "0",
      "-o",
      outputPath,
      sourceUrl,
    ];

    return runProcess(
      ytDlp,
      args,
      outputPath,
      `/generated/${filename}`,
      "YouTube audio downloaded successfully."
    );
  }

  const height = qualityMap[formatId];

  if (!height) {
    return {
      success: false,
      message: "Unsupported YouTube format.",
    };
  }

  const filename = `youtube-${Date.now()}-${height}p.mp4`;
  const outputPath = path.join(outputDir, filename);

  const formatSelector =
    `bestvideo[height<=${height}]+bestaudio/` +
    `best[height<=${height}]`;

  const args = [
    ...commonArgs,
    "-f",
    formatSelector,
    "--merge-output-format",
    "mp4",
    "-o",
    outputPath,
    sourceUrl,
  ];

  return runProcess(
    ytDlp,
    args,
    outputPath,
    `/generated/${filename}`,
    `YouTube ${height}p video downloaded successfully.`
  );
}

async function runProcess(
  executable: string,
  args: string[],
  outputPath: string,
  outputUrl: string,
  successMessage: string
): Promise<YoutubeDownloadResult> {
  return new Promise((resolve) => {
    const child = spawn(executable, args, {
      windowsHide: true,
    });

    let stderr = "";
    let stdout = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      console.error("yt-dlp start error:", error);

      resolve({
        success: false,
        message: `yt-dlp could not start: ${error.message}`,
      });
    });

    child.on("close", async (code) => {
      if (code !== 0) {
        console.error(
          "yt-dlp failed:",
          stderr || stdout
        );

        const details = stderr || stdout;

        if (
          details.includes("Sign in to confirm") ||
          details.includes("not a bot")
        ) {
          resolve({
            success: false,
            message:
              "YouTube requires authentication. Please check the cookies file.",
          });
          return;
        }

        if (
          details.includes("Requested format is not available") ||
          details.includes("format is not available")
        ) {
          resolve({
            success: false,
            message:
              "This exact video quality is not available. Please choose another quality.",
          });
          return;
        }

        resolve({
          success: false,
          message:
            "Unable to download the YouTube media.",
        });

        return;
      }

      try {
        await fs.access(outputPath);

        resolve({
          success: true,
          message: successMessage,
          outputUrl,
        });
      } catch {
        resolve({
          success: false,
          message: "The output file was not created.",
        });
      }
    });
  });
}

/**
 * Backward compatibility:
 * Existing MP3 functionality continues to work.
 */
export async function downloadYoutubeMp3(
  sourceUrl: string
): Promise<YoutubeDownloadResult> {
  return downloadYoutubeMedia(sourceUrl, "mp3");
}

