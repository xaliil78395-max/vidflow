export type MediaEngineRequest = {
  sourceUrl: string;
  formatId: string;
};

export type MediaEngineResult = {
  success: boolean;
  status: "processing" | "ready" | "error";
  message: string;
  outputUrl?: string;
};

export interface MediaEngine {
  process(
    request: MediaEngineRequest
  ): Promise<MediaEngineResult>;
}
