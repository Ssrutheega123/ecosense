CREATE EXTENSION IF NOT EXISTS vector;
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(384)
);
--> statement-breakpoint
CREATE INDEX "embeddingIndex" ON "documents" USING hnsw ("embedding" vector_cosine_ops);
