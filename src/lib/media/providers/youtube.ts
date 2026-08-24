import type { MediaInfo } from "../types";

const API_KEY = process.env.YOUTUBE_API_KEY;

function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1) || null;
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}

function parseDuration(duration: string): number {
  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) return 0;

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

export async function createYouTubeMediaInfo(
  url: string
): Promise<MediaInfo> {
  if (!API_KEY) {
    return {
      platform: "youtube",
      platformName: "YouTube",
      originalUrl: url,
      status: "error",
      formats: [],
      message: "YouTube API key is not configured.",
    };
  }

  const videoId = extractYouTubeVideoId(url);

  if (!videoId) {
    return {
      platform: "youtube",
      platformName: "YouTube",
      originalUrl: url,
      status: "error",
      formats: [],
      message: "Invalid YouTube URL.",
    };
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("YouTube API error:", errorText);

      return {
        platform: "youtube",
        platformName: "YouTube",
        originalUrl: url,
        status: "error",
        formats: [],
        message: "Unable to retrieve YouTube video information.",
      };
    }

    const data = await response.json();
    const video = data.items?.[0];

    if (!video) {
      return {
        platform: "youtube",
        platformName: "YouTube",
        originalUrl: url,
        status: "unavailable",
        formats: [],
        message: "YouTube video was not found.",
      };
    }

    const duration = video.contentDetails?.duration
      ? parseDuration(video.contentDetails.duration)
      : undefined;

    return {
      platform: "youtube",
      platformName: "YouTube",
      originalUrl: url,
      title: video.snippet?.title,
      thumbnailUrl:
        video.snippet?.thumbnails?.maxres?.url ??
        video.snippet?.thumbnails?.high?.url ??
        video.snippet?.thumbnails?.medium?.url,
      channelName: video.snippet?.channelTitle,
      duration,
      status: "ready",
      formats: [
        {
          id: "video-mp4-1080",
          label: "MP4 — 1080p",
          extension: "mp4",
          quality: "1080p",
          type: "video",
        },
        {
          id: "video-mp4-720",
          label: "MP4 — 720p",
          extension: "mp4",
          quality: "720p",
          type: "video",
        },
        {
          id: "video-mp4-480",
          label: "MP4 — 480p",
          extension: "mp4",
          quality: "480p",
          type: "video",
        },
        {
          id: "audio-mp3",
          label: "MP3 — Audio",
          extension: "mp3",
          type: "audio",
        },
      ],
      message: "YouTube video information retrieved successfully.",
    };
  } catch (error) {
    console.error("YouTube request error:", error);

    return {
      platform: "youtube",
      platformName: "YouTube",
      originalUrl: url,
      status: "error",
      formats: [],
      message: "An error occurred while contacting YouTube.",
    };
  }
}

