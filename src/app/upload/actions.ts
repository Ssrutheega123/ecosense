// src/app/upload/actions.ts
/*
"use server";

import * as pdf from "pdf-parse/lib/pdf-parse.js";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;
    

    // Convert File to Buffer and extract text
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return {
        success: false,
        error: "No text found in PDF",
      };
    }

    // Chunk the text
    const chunks = await chunkContent(data.text);

    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks);

    // Store in database
    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      error: "Failed to process PDF",
    };
  }
}

"use server";

import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

// 1. Use createRequire to safely load the legacy CommonJS module
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
const parsePdf = typeof pdf === 'function' ? pdf : pdf.default;

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;
    
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Convert File to Buffer and extract text
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // 2. This will now be correctly recognized as a callable function
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return {
        success: false,
        error: "No text found in PDF",
      };
    }

    // Chunk the text
    const chunks = await chunkContent(data.text);

    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks);

    // Store in database
    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      error: "Failed to process PDF",
    };
  }
}


"use server";

import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";
import pdf from "@cedrugs/pdf-parse"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfBase = require("pdf-parse");

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // 1. Resolve the actual function from the module object
    const parsePdf = typeof pdfBase === 'function' ? pdfBase : pdfBase.default;

    if (typeof parsePdf !== 'function') {
      console.error("Resolved pdfBase structure:", pdfBase);
      throw new Error("PDF parser is not a function. Check your pdf-parse installation.");
    }

    // 2. Call the resolved function
    const data = await parsePdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return { success: false, error: "No text found in PDF" };
    }

    const chunks = await chunkContent(data.text);
    const embeddings = await generateEmbeddings(chunks);

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return { success: false, error: "Failed to process PDF" };
  }
}
*/

// src/app/upload/actions.ts
"use server";

import pdf from "@cedrugs/pdf-parse"; // Standard import works with the fork
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;
    if (!file) return { success: false, error: "No file uploaded" };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // This call will now work correctly
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return { success: false, error: "No text found in PDF" };
    }

    const chunks = await chunkContent(data.text);
    const embeddings = await generateEmbeddings(chunks);

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return { success: false, error: "Failed to process PDF" };
  }
}