import { ytDlpPath } from "./yt-dlp";
import { spawn } from "node:child_process";

export async function getYouTubeInfo(url: string) {
  return new Promise((resolve, reject) => {
    const child = spawn(ytDlpPath, [
      "--dump-single-json",
      "--no-playlist",
      "--no-warnings",
      url,
    ], {
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("error", (error) => {
      reject(new Error(`yt-dlp could not start: ${error.message}`));
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(
          new Error(
            stderr.trim() || `yt-dlp exited with code ${code}`
          )
        );
        return;
      }

      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(new Error("yt-dlp returned invalid JSON."));
      }
    });
  });
}

