import { spawn } from "node:child_process";
import path from "node:path";

const configuredYtDlpPath =
  process.env.YTDLP_PATH?.trim();

const configuredDenoPath =
  process.env.DENO_PATH?.trim();

const configuredCookiesPath =
  process.env.YOUTUBE_COOKIES_PATH?.trim();

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

      // Proven working YouTube client on Railway.
      "--extractor-args",
      "youtube:player_client=mweb",
    ];

    /*
     * Use Deno when explicitly configured.
     */
    if (configuredDenoPath) {
      finalArgs.push(
        "--js-runtimes",
        `deno:${configuredDenoPath}`
      );
    }

    /*
     * Cookies are optional.
     * Only pass them when the environment variable exists.
     */
    if (
      configuredCookiesPath
    ) {
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

    const child = spawn(/*turbopackIgnore: true*/
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

