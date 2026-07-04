"use client";


import { Fragment, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Loader } from "@/components/ai-elements/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, MessageSquareText, Sparkles } from "lucide-react";

const suggestions = [
  "What are the major environmental risks?",
  "Summarize the mitigation measures.",
  "What evidence supports the conclusion?",
  "Which regulations are mentioned?",
];




export default function RAGChatBot() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  useEffect(() => {
    const prompt = new URLSearchParams(window.location.search).get("prompt");
    if (prompt) {
      setInput(prompt);
    }
  }, []);

  const handleSubmit=(message:PromptInputMessage)=>{
    if(!message.text?.trim()){
      return;
    }
    sendMessage({
      text:message.text,
    });
    setInput("");
  }

  const useSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-8">
      <div className="mx-auto grid h-[calc(100vh-8rem)] max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm lg:block">
          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700" variant="outline">
            <BrainCircuit className="size-3.5" />
            RAG assistant
          </Badge>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
            Ask your environmental knowledge base.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            EcoSense answers from uploaded PDFs only. If the evidence is not in
            your documents, it should say so.
          </p>
          <div className="mt-6 space-y-2">
            {suggestions.map((suggestion) => (
              <button
                className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-3 text-left text-sm text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                key={suggestion}
                onClick={() => useSuggestion(suggestion)}
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-h-0 flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white text-emerald-700">
                <MessageSquareText className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-950">EcoSense AI</p>
                <p className="text-sm text-slate-500">Semantic answers from uploaded PDFs</p>
              </div>
            </div>
            <Sparkles className="hidden size-5 text-emerald-600 sm:block" />
          </div>

          <Conversation className="min-h-0 flex-1">
            <ConversationContent>
              {messages.length === 0 && (
                <div className="mx-auto flex max-w-xl flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Sparkles />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-950">What should EcoSense find?</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Ask about risks, mitigation measures, policy obligations, locations,
                    species, findings, or summaries from your uploaded PDFs.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2 lg:hidden">
                    {suggestions.slice(0, 2).map((suggestion) => (
                      <Button
                        key={suggestion}
                        onClick={() => useSuggestion(suggestion)}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div key={message.id}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message from={message.role}>
                              <MessageContent>
                                <MessageResponse>{part.text}</MessageResponse>
                              </MessageContent>
                            </Message>
                          </Fragment>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
              {(status === "submitted" || status === "streaming") && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput onSubmit={handleSubmit} className="mt-4">
            <PromptInputBody>
              <PromptInputTextarea
                placeholder="Ask about your uploaded environmental documents..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                {/* Model selector,web search etc */}
              </PromptInputTools>
              <PromptInputSubmit disabled={!input.trim() || status === "submitted" || status === "streaming"} status={status} />
            </PromptInputFooter>
          </PromptInput>
        </section>
      </div>
    </main>
  );
}
