import { pipeline } from "@xenova/transformers";

// Load embedding pipeline once
const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

export async function generateEmbeddings(texts: string[]) {
  try {

    const embeddings: number[][] = [];

    for (const text of texts) {

      const cleaned = text
        .replace(/\n/g, " ")
        .trim();

      if (!cleaned) continue;

      const output = await extractor(cleaned, {
        pooling: "mean",
        normalize: true,
      });

      embeddings.push(Array.from(output.data));
    }

    return embeddings;

  } catch (error) {
    console.error("Embedding Error:", error);
    throw new Error("Failed to generate embeddings");
  }
}