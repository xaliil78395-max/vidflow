import type { SupportedPlatform, MediaInfo } from "../types";
import type { ProcessingResult } from "./types";
import { youtubeProcessor } from "./youtube";

export async function processMedia(
  platform: SupportedPlatform,
  mediaInfo: MediaInfo,
  formatId: string
): Promise<ProcessingResult> {
  switch (platform) {
    case "youtube":
      return youtubeProcessor.process(mediaInfo, formatId);

    default:
      return {
        success: false,
        status: "error",
        message: `Processing for ${platform} is not available.`,
      };
  }
}
