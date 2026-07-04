"use client";

import Link from "next/link";
import { useState } from "react";
import { processPdfFile } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DatabaseZap, FileText, Loader2, UploadCloud } from "lucide-react";

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setFileName(file.name);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const result = await processPdfFile(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "PDF processed successfully",
        });
        event.target.value = "";
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to process PDF",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "An error occurred while processing the PDF",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="space-y-5">
          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700" variant="outline">
            <UploadCloud className="size-3.5" />
            Document ingestion
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Add environmental knowledge to EcoSense.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Upload a PDF report and EcoSense will extract text, split it into
            useful chunks, generate embeddings, and store the vectors in Neon
            for semantic search.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-white p-4">
              <FileText className="mb-3 size-5 text-emerald-600" />
              <p className="font-semibold text-slate-950">Best files</p>
              <p className="mt-1 text-sm text-slate-500">Reports, policies, research PDFs, ESG disclosures.</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-4">
              <DatabaseZap className="mb-3 size-5 text-emerald-600" />
              <p className="font-semibold text-slate-950">Stored as vectors</p>
              <p className="mt-1 text-sm text-slate-500">Neon + pgvector powers document retrieval.</p>
            </div>
          </div>
        </section>

        <Card className="border-emerald-100 bg-white shadow-xl shadow-emerald-900/5">
          <CardHeader>
            <CardTitle>Upload PDF</CardTitle>
            <CardDescription>
              Choose one PDF at a time. Large files can take a little longer to embed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/60 p-8 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-white text-emerald-700">
                {isLoading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
              </div>
              <Label htmlFor="pdf-upload" className="text-base font-semibold text-slate-950">
                Select an environmental PDF
              </Label>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                EcoSense works best with text-based PDFs such as environmental impact reports,
                sustainability disclosures, and compliance notes.
              </p>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="mx-auto mt-5 max-w-md bg-white"
              />
              {fileName && (
                <p className="mt-3 text-sm text-slate-500">
                  Selected: <span className="font-medium text-slate-700">{fileName}</span>
                </p>
              )}
            </div>

            {isLoading && (
              <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
                Extracting text, creating embeddings, and saving vectors...
              </div>
            )}

            {message && (
              <Alert variant={message.type === "error" ? "destructive" : "default"}>
                <AlertTitle>{message.type === "error" ? "Processing failed" : "Ready to search"}</AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            {message?.type === "success" ? (
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link href="/chat">Ask questions from this knowledge base</Link>
              </Button>
            ) : (
              <p className="text-center text-sm text-slate-500">
                After upload, open the chat to query your document with semantic search.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
