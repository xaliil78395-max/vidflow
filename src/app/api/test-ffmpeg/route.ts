import { NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { mediaEngine } from "@/lib/media/engine/media-engine";

export async function POST() {
  try {
    const testDir = path.join(process.cwd(), "public", "generated");
    await fs.mkdir(testDir, { recursive: true });

    const sourcePath = path.join(testDir, "ffmpeg-test.mp4");

    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn(
        "ffmpeg",
        [
          "-y",
          "-f", "lavfi",
          "-i", "color=c=blue:s=1280x720:d=3",
          "-f", "lavfi",
          "-i", "anullsrc=r=44100:cl=stereo",
          "-shortest",
          "-c:v", "libx264",
          "-c:a", "aac",
          sourcePath,
        ],
        { windowsHide: true }
      );

      let error = "";

      ffmpeg.stderr.on("data", (chunk) => {
        error += chunk.toString();
      });

      ffmpeg.on("error", reject);

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(error));
        }
      });
    });

    const result = await mediaEngine.process({
      sourceUrl: `file://${sourcePath}`,
      formatId: "audio-mp3",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("FFmpeg test error:", error);

    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: "FFmpeg test failed.",
      },
      { status: 500 }
    );
  }
}
