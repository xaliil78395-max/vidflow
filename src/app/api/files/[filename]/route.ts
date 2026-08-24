import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";

const GENERATED_DIR = path.join(
  process.cwd(),
  "public",
  "generated"
);

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ filename: string }>;
  }
) {
  try {
    const { filename } = await context.params;

    if (!filename) {
      return NextResponse.json(
        {
          success: false,
          error: "Filename is required.",
        },
        { status: 400 }
      );
    }

    if (
      filename.includes("/") ||
      filename.includes("\\") ||
      filename.includes("..")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid filename.",
        },
        { status: 400 }
      );
    }

    const filePath = path.join(
      GENERATED_DIR,
      filename
    );

    const resolvedGeneratedDir =
      path.resolve(GENERATED_DIR);

    const resolvedFilePath =
      path.resolve(filePath);

    if (
      !resolvedFilePath.startsWith(
        resolvedGeneratedDir + path.sep
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file path.",
        },
        { status: 400 }
      );
    }

    let stats;

    try {
      stats = await fs.stat(filePath);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "File not found.",
        },
        { status: 404 }
      );
    }

    if (!stats.isFile()) {
      return NextResponse.json(
        {
          success: false,
          error: "File not found.",
        },
        { status: 404 }
      );
    }

    const file = await fs.readFile(filePath);

    const extension =
      path.extname(filename).toLowerCase();

    const contentType =
      extension === ".mp3"
        ? "audio/mpeg"
        : extension === ".mp4"
          ? "video/mp4"
          : "application/octet-stream";

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(file.length),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("File download error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to serve the requested file.",
      },
      { status: 500 }
    );
  }
}
