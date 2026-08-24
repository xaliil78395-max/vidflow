import { spawn } from "node:child_process";

const configuredYtDlpPath =
  process.env.YTDLP_PATH?.trim();

const configuredDenoPath =
  process.env.DENO_PATH?.trim();

const cookiesPath =
  process.env.YOUTUBE_COOKIES_PATH?.trim();

export const ytDlpPath =
  configuredYtDlpPath || "yt-dlp";

export const denoPath =
  configuredDenoPath || "deno";

export const cookiesFilePath =
  cookiesPath || "";

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
    ];

    /*
     * Use Deno when explicitly configured.
     * Otherwise yt-dlp will use its normal runtime behavior.
     */
    if (configuredDenoPath) {
      finalArgs.push(
        "--js-runtimes",
        `deno:${configuredDenoPath}`
      );
    }

    /*
     * Only use cookies when explicitly configured.
     */
    if (cookiesFilePath) {
      finalArgs.push(
        "--cookies",
        cookiesFilePath
      );
    }

    finalArgs.push(...args);

    console.log(
      "Running yt-dlp:",
      ytDlpPath
    );

    const child = spawn(
      /*turbopackIgnore: true*/ ytDlpPath,
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

    child.on("error", reject);

    child.on("close", (code) => {
      resolve({
        stdout,
        stderr,
        code: code ?? -1,
      });
    });
  });
}


