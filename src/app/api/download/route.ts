import { NextResponse } from "next/server";
import { createMediaInfo } from "@/lib/media/service";
import { detectPlatform } from "@/lib/platforms/detector";
import { processMedia } from "@/lib/media/processors/processor";
import {
  validateApiRequest,
  validateMediaUrl,
  validateFormatId,
} from "@/lib/media/api-security";
import { cleanupGeneratedFiles } from "@/lib/media/cleanup";

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
    /*
     * Remove generated files older than 2 hours.
     * Cleanup failures never block a download request.
     */
    await cleanupGeneratedFiles();

    const body = await request.json();

    const rawUrl =
      typeof body?.url === "string"
        ? body.url
        : "";

    const formatId =
      typeof body?.formatId === "string"
        ? body.formatId.trim()
        : "";

    const urlValidation =
      validateMediaUrl(rawUrl);

    if (!urlValidation.ok) {
      return NextResponse.json(
        {
          success: false,
          error: urlValidation.error,
        },
        { status: 400 }
      );
    }

    if (!formatId) {
      return NextResponse.json(
        {
          success: false,
          error: "Format is required.",
        },
        { status: 400 }
      );
    }

    if (!validateFormatId(formatId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid format.",
        },
        { status: 400 }
      );
    }

    const url = urlValidation.url;
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

    const mediaInfo = await createMediaInfo(
      platform,
      url
    );

    if (mediaInfo.status !== "ready") {
      return NextResponse.json(
        {
          success: false,
          error: mediaInfo.message,
        },
        { status: 400 }
      );
    }

    const result = await processMedia(
      platform,
      mediaInfo,
      formatId
    );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      processing: result,
    });
  } catch (error) {
    console.error(
      "Download API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to prepare the selected format.",
      },
      { status: 500 }
    );
  }
}
