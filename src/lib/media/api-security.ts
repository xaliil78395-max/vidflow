import { headers } from "next/headers";
import { detectPlatform } from "@/lib/platforms/detector";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateEntry>();

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function validateApiRequest(
  request: Request
): Promise<
  | { ok: true }
  | { ok: false; status: number; error: string }
> {
  const contentLength = request.headers.get(
    "content-length"
  );

  if (
    contentLength &&
    Number(contentLength) > MAX_BODY_BYTES
  ) {
    return {
      ok: false,
      status: 413,
      error: "Request is too large.",
    };
  }

  const key = getClientKey(request);
  const now = Date.now();

  const existing = rateLimitStore.get(key);

  if (!existing || now >= existing.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
  } else {
    existing.count += 1;

    if (
      existing.count >
      MAX_REQUESTS_PER_WINDOW
    ) {
      return {
        ok: false,
        status: 429,
        error:
          "Too many requests. Please try again later.",
      };
    }
  }

  if (rateLimitStore.size > 1000) {
    for (const [entryKey, entry] of rateLimitStore) {
      if (now >= entry.resetAt) {
        rateLimitStore.delete(entryKey);
      }
    }
  }

  return { ok: true };
}

export function validateMediaUrl(
  input: string
):
  | { ok: true; url: string }
  | { ok: false; error: string } {
  const value = input.trim();

  if (!value) {
    return {
      ok: false,
      error: "URL is required.",
    };
  }

  if (value.length > 2048) {
    return {
      ok: false,
      error: "URL is too long.",
    };
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    return {
      ok: false,
      error: "Invalid URL.",
    };
  }

  if (
    url.protocol !== "https:" &&
    url.protocol !== "http:"
  ) {
    return {
      ok: false,
      error: "Only HTTP and HTTPS URLs are supported.",
    };
  }

  if (url.username || url.password) {
    return {
      ok: false,
      error: "URLs with embedded credentials are not allowed.",
    };
  }

  if (detectPlatform(value) === "unknown") {
    return {
      ok: false,
      error: "Only supported YouTube URLs are allowed.",
    };
  }

  return {
    ok: true,
    url: value,
  };
}

export function validateFormatId(
  formatId: string
): boolean {
  return (
    formatId === "mp3" ||
    /^mp4-\d{1,4}$/.test(formatId)
  );
}

