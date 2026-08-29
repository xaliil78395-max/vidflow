import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vidflow.casa"),

  title: {
    default: "VidFlow - Fast & Simple YouTube Downloader",
    template: "%s | VidFlow",
  },

  description:
    "VidFlow is a simple YouTube media processing tool that lets you analyze supported YouTube videos and process available MP4 video and MP3 audio formats.",

  keywords: [
    "YouTube downloader",
    "YouTube MP4",
    "YouTube MP3",
    "video downloader",
    "MP4 downloader",
    "MP3 downloader",
    "VidFlow",
  ],

  applicationName: "VidFlow",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "VidFlow - Fast & Simple YouTube Downloader",
    description:
      "Analyze supported YouTube videos and process available MP4 video and MP3 audio formats with VidFlow.",
    type: "website",
    siteName: "VidFlow",
  },

  twitter: {
    card: "summary",
    title: "VidFlow - Fast & Simple YouTube Downloader",
    description:
      "A simple tool for analyzing supported YouTube videos and processing available MP4 and MP3 formats.",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}




