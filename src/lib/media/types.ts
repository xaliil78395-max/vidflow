export type SupportedPlatform =
  | "youtube";

export type MediaStatus =
  | "ready"
  | "processing"
  | "unavailable"
  | "error";

export type MediaFormat = {
  id: string;
  label: string;
  extension: "mp4" | "webm" | "mp3";
  quality?: string;
  type: "video" | "audio";
};

export type MediaInfo = {
  platform: SupportedPlatform;
  platformName: string;
  originalUrl: string;

  title?: string;
  thumbnailUrl?: string;
  channelName?: string;
  duration?: number;

  status: MediaStatus;
  formats: MediaFormat[];
  message: string;
};
