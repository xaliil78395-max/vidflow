import { NextResponse } from "next/server";
import { detectPlatform } from "@/lib/platforms/detector";
import { createMediaInfo } from "@/lib/media/service";
import {
  validateApiRequest,
  validateMediaUrl,
} from "@/lib/media/api-security";

export async function POST(request: Request) {
  const security = await validateApiRequest(request);

  if (!security.ok) {
    return NextResponse.json(
      {
        success: false,
        error: security.error,
      },
      { status: security.status }
    );
  }

  try {
    const body = await request.json();

    const rawUrl =
      typeof body?.url === "string"
        ? body.url
        : "";

    const validation = validateMediaUrl(rawUrl);

    if (!validation.ok) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
        },
        { status: 400 }
      );
    }

    const url = validation.url;
    const platform = detectPlatform(url);

    if (platform === "unknown") {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported or invalid URL.",
        },
        { status: 400 }
      );
    }

    const analysis = await createMediaInfo(
      platform,
      url
    );

    if (analysis.status !== "ready") {
      return NextResponse.json(
        {
          success: false,
          error: analysis.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Analyze API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to analyze the URL.",
      },
      { status: 500 }
    );
  }
}
