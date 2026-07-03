"use server";

import pdf from "@cedrugs/pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

const INSERT_BATCH_SIZE = 100;

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File | null;

    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return { success: false, error: "No text found in PDF" };
    }

    const chunks = await chunkContent(data.text);

    if (chunks.length === 0) {
      return { success: false, error: "No searchable text found in PDF" };
    }

    const embeddings = await generateEmbeddings(chunks);

    if (embeddings.length !== chunks.length) {
      throw new Error(
        `Embedding count mismatch: ${embeddings.length} embeddings for ${chunks.length} chunks`
      );
    }

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    for (let index = 0; index < records.length; index += INSERT_BATCH_SIZE) {
      await db
        .insert(documents)
        .values(records.slice(index, index + INSERT_BATCH_SIZE));
    }

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    console.error("PDF processing error:", error);

    return { success: false, error: "Failed to process PDF" };
  }
}
