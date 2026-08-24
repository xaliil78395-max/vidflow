export type Platform =
  | "youtube"
  | "unknown";

export function detectPlatform(
  input: string
): Platform {
  try {
    const url = new URL(input.trim());

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return "unknown";
    }

    const hostname = url.hostname
      .toLowerCase()
      .replace(/^www\./, "");

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtu.be"
    ) {
      return "youtube";
    }

    return "unknown";
  } catch {
    return "unknown";
  }
}
