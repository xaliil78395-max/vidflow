import path from "node:path";
import { promises as fs } from "node:fs";

const GENERATED_DIR = path.join(
  process.cwd(),
  "public",
  "generated"
);

const MAX_FILE_AGE_MS = 2 * 60 * 60 * 1000;

export async function cleanupGeneratedFiles(): Promise<void> {
  try {
    await fs.mkdir(GENERATED_DIR, { recursive: true });

    const entries = await fs.readdir(
      GENERATED_DIR,
      { withFileTypes: true }
    );

    const now = Date.now();

    await Promise.all(
      entries.map(async (entry) => {
        if (!entry.isFile()) {
          return;
        }

        const filePath = path.join(
          GENERATED_DIR,
          entry.name
        );

        try {
          const stats = await fs.stat(filePath);

          const age = now - stats.mtimeMs;

          if (age > MAX_FILE_AGE_MS) {
            await fs.unlink(filePath);

            console.log(
              `Cleaned generated file: ${entry.name}`
            );
          }
        } catch (error) {
          console.error(
            `Unable to clean generated file: ${entry.name}`,
            error
          );
        }
      })
    );
  } catch (error) {
    console.error(
      "Generated files cleanup error:",
      error
    );
  }
}
