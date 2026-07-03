import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 150,
  separators: ["\n\n", "\n", ". ", " ", ""],
});

export function sanitizeDocumentText(content: string) {
  return content
    .replace(/\u0000/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function chunkContent(content: string) {
  const sanitizedContent = sanitizeDocumentText(content);

  if (!sanitizedContent) {
    return [];
  }

  const chunks = await textSplitter.splitText(sanitizedContent);

  return chunks
    .map((chunk) => sanitizeDocumentText(chunk))
    .filter((chunk) => chunk.length > 0);
}
