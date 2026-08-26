import { spawn } from "node:child_process";

const configuredYtDlpPath =
  process.env.YTDLP_PATH?.trim();

const configuredDenoPath =
  process.env.DENO_PATH?.trim();

const configuredCookiesPath =
  process.env.YOUTUBE_COOKIES_PATH?.trim();

const youtubeUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36";

export const ytDlpPath =
  configuredYtDlpPath || "yt-dlp";

export const denoPath =
  configuredDenoPath || "deno";

export const cookiesFilePath =
  configuredCookiesPath || "";

export function runYtDlp(
  args: string[]
): Promise<{
  stdout: string;
  stderr: string;
  code: number;
}> {
  return new Promise((resolve, reject) => {
    const finalArgs: string[] = [
      "--force-ipv4",
      "--no-playlist",
      "--no-warnings",
      "--user-agent",
      youtubeUserAgent,
    ];

    if (configuredDenoPath) {
      finalArgs.push(
        "--js-runtimes",
        `deno:${configuredDenoPath}`
      );
    }

    if (configuredCookiesPath) {
      finalArgs.push(
        "--cookies",
        configuredCookiesPath
      );
    }

    finalArgs.push(...args);

    console.log(
      "Running yt-dlp:",
      ytDlpPath
    );

    console.log(
      "yt-dlp args:",
      finalArgs.join(" ")
    );

    const child = spawn(
      /*turbopackIgnore: true*/
      ytDlpPath,
      finalArgs,
      {
        windowsHide: true,
      }
    );

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      resolve({
        stdout,
        stderr,
        code: code ?? -1,
      });
    });
  });
}

