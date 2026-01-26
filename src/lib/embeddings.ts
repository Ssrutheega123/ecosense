// src/lib/embeddings.ts
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function generateEmbeddings(texts: string[]) {
  try {
    const inputs = texts.map((text) => text.replace(/\n/g, " "));

    const output = await hf.featureExtraction({
      // FIXED: Use a model that supports 'feature-extraction'
      model: "BAAI/bge-small-en-v1.5", 
      inputs: inputs,
    });

    return output as number[][];
  } catch (error) {
    console.error("Embedding Error:", error);
    throw new Error("Failed to generate embeddings");
  }
}