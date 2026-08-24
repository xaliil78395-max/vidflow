import { NextResponse } from "next/server";
import { runYtDlp } from "@/lib/media/yt-dlp";

type YouTubeInfo = {
  id?: string;
  title?: string;
  thumbnail?: string;
  duration?: number;
  uploader?: string;
  channel?: string;
  webpage_url?: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const url =
      typeof body?.url === "string"
        ? body.url.trim()
        : "";

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          error: "URL is required.",
        },
        { status: 400 }
      );
    }

    const result = await runYtDlp([
      "--dump-single-json",
      "--skip-download",
      url,
    ]);

    if (result.code !== 0) {
      console.error(
        "YouTube info yt-dlp error:",
        result.stderr || result.stdout
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to retrieve YouTube video information.",
        },
        { status: 500 }
      );
    }

    const info =
      JSON.parse(result.stdout) as YouTubeInfo;

    return NextResponse.json({
      success: true,
      video: {
        id: info.id ?? "",
        title:
          info.title ??
          "Untitled video",
        thumbnail:
          info.thumbnail ??
          "",
        duration:
          info.duration ??
          0,
        uploader:
          info.uploader ??
          info.channel ??
          "Unknown channel",
        webpageUrl:
          info.webpage_url ??
          url,
      },
    });
  } catch (error) {
    console.error(
      "YouTube info error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        success: false,
        error:
          `YouTube information failed: ${message}`,
      },
      { status: 500 }
    );
  }
}
