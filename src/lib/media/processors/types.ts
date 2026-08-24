import type { MediaInfo } from "../types";

export type ProcessingResult = {
  success: boolean;
  status: "processing" | "ready" | "error";
  message: string;
  outputUrl?: string;
  media?: {
    title?: string;
    formatId: string;
    originalUrl: string;
  };
};

export interface MediaProcessor {
  process(
    mediaInfo: MediaInfo,
    formatId: string
  ): Promise<ProcessingResult>;
}
