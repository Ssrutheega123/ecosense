import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  DatabaseZap,
  FileText,
  Leaf,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const workflow = [
  {
    title: "Upload reports",
    description: "Add PDF reports, ESG notes, research papers, or policy documents.",
    icon: UploadCloud,
  },
  {
    title: "Create knowledge",
    description: "EcoSense chunks the text and stores searchable vectors in Neon.",
    icon: DatabaseZap,
  },
  {
    title: "Ask questions",
    description: "Use natural language to find evidence-backed answers from your files.",
    icon: MessageSquareText,
  },
];

const suggestedQuestions = [
  "What are the major environmental risks?",
  "Summarize the mitigation measures.",
  "Which locations or species are affected?",
  "What regulations are mentioned?",
];

const focusAreas = [
  "Environmental reports",
  "ESG disclosures",
  "Climate policies",
  "Pollution studies",
  "Research PDFs",
  "Compliance notes",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eefdf5_45%,#ffffff_100%)]">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <Badge className="mb-5 border-emerald-200 bg-emerald-50 text-emerald-700" variant="outline">
            <Leaf className="size-3.5" />
            Environmental document intelligence
          </Badge>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Turn environmental PDFs into answers you can trust.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            EcoSense is a focused RAG assistant for searching reports,
            sustainability documents, research papers, and compliance files with
            semantic search and AI-generated answers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/upload">
                Upload a PDF
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-emerald-200 bg-white/70">
              <Link href="/chat">Ask EcoSense AI</Link>
            </Button>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl border border-emerald-100 bg-white/70 p-4">
              <p className="font-semibold text-slate-950">PDF</p>
              <p className="text-slate-500">ingestion</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white/70 p-4">
              <p className="font-semibold text-slate-950">Vector</p>
              <p className="text-slate-500">search</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white/70 p-4">
              <p className="font-semibold text-slate-950">RAG</p>
              <p className="text-slate-500">answers</p>
            </div>
          </div>
        </div>

        <Card className="border-emerald-100 bg-white/85 shadow-xl shadow-emerald-900/5 backdrop-blur">
          <CardHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Sparkles />
            </div>
            <CardTitle className="text-2xl">Try asking EcoSense</CardTitle>
            <CardDescription>
              Start with useful environmental questions instead of a blank prompt.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestedQuestions.map((question) => (
              <Link
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                href={`/chat?prompt=${encodeURIComponent(question)}`}
                key={question}
              >
                {question}
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 lg:grid-cols-3 lg:px-8">
        {workflow.map((item) => (
          <Card className="border-slate-200 bg-white/90" key={item.title}>
            <CardHeader>
              <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <item.icon />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Card className="border-emerald-100 bg-emerald-950 text-white">
          <CardHeader>
            <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-white/10">
              <BrainCircuit />
            </div>
            <CardTitle>Is this environmental modelling?</CardTitle>
            <CardDescription className="text-emerald-50/80">
              Not exactly — and that is a good thing for this project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-emerald-50/90">
            <p>
              EcoSense is best described as environmental document intelligence,
              not climate simulation or physical ecosystem modelling.
            </p>
            <p>
              It helps people understand environmental documents faster by
              retrieving relevant evidence and generating grounded answers.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle>Best content for this dashboard</CardTitle>
            <CardDescription>
              Keep the product focused on documents where semantic search is genuinely useful.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <Badge className="bg-emerald-50 text-emerald-700" key={area} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 p-4">
                <FileText className="mb-3 size-5 text-emerald-600" />
                <p className="font-semibold text-slate-950">Summarize</p>
                <p className="mt-1 text-sm text-slate-500">Extract key findings and actions.</p>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4">
                <Search className="mb-3 size-5 text-emerald-600" />
                <p className="font-semibold text-slate-950">Search</p>
                <p className="mt-1 text-sm text-slate-500">Find meaning, not just keywords.</p>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4">
                <ShieldCheck className="mb-3 size-5 text-emerald-600" />
                <p className="font-semibold text-slate-950">Review</p>
                <p className="mt-1 text-sm text-slate-500">Surface risks and compliance points.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
