import { ytDlpPath } from "../yt-dlp";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

export type FfmpegProcessResult = {
  success: boolean;
  message: string;
  outputUrl?: string;
};

export async function processWithFfmpeg(
  sourceUrl: string,
  formatId: string
): Promise<FfmpegProcessResult> {
  const outputDir = path.join(
    process.cwd(),
    "public",
    "generated"
  );

  await fs.mkdir(outputDir, { recursive: true });

  const filename = `media-${Date.now()}.mp3`;
  const outputPath = path.join(outputDir, filename);

  return new Promise((resolve) => {
    const args = [
      "--no-playlist",
      "-x",
      "--audio-format",
      "mp3",
      "--audio-quality",
      "2",
      "-o",
      outputPath,
      sourceUrl,
    ];

    const process = spawn(ytDlpPath, args, {
      windowsHide: true,
    });

    let stderr = "";

    process.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    process.on("error", (error) => {
      resolve({
        success: false,
        message: `yt-dlp could not start: ${error.message}`,
      });
    });

    process.on("close", async (code) => {
      if (code !== 0) {
        console.error("yt-dlp error:", stderr);

        resolve({
          success: false,
          message:
            "Unable to download and process the selected media.",
        });
        return;
      }

      try {
        await fs.access(outputPath);

        resolve({
          success: true,
          message: "Media processed successfully.",
          outputUrl: `/generated/${filename}`,
        });
      } catch {
        resolve({
          success: false,
          message: "The MP3 file was not created.",
        });
      }
    });
  });
}


