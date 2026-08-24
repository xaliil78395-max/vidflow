import type {
  MediaEngine,
  MediaEngineRequest,
  MediaEngineResult,
} from "./types";

import { processWithFfmpeg } from "./ffmpeg-engine";
import { downloadYoutubeMedia } from "./youtube-engine";

export const mediaEngine: MediaEngine = {
  async process(
    request: MediaEngineRequest
  ): Promise<MediaEngineResult> {
    if (!request.sourceUrl) {
      return {
        success: false,
        status: "error",
        message: "Media source is required.",
      };
    }

    if (!request.formatId) {
      return {
        success: false,
        status: "error",
        message: "Format is required.",
      };
    }

    const youtubeFormats = [
      "mp3",
      "360p",
      "480p",
      "720p",
      "1080p",
    ];

    const result = youtubeFormats.includes(request.formatId)
      ? await downloadYoutubeMedia(
          request.sourceUrl,
          request.formatId
        )
      : await processWithFfmpeg(
          request.sourceUrl,
          request.formatId
        );

    if (!result.success) {
      return {
        success: false,
        status: "error",
        message: result.message,
      };
    }

    return {
      success: true,
      status: "ready",
      message: result.message,
      outputUrl: result.outputUrl,
    };
  },
};
