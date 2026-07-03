CREATE EXTENSION IF NOT EXISTS vector;
--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "embedding" TYPE vector(384);
