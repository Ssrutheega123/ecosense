import {cosineDistance,desc,gt,sql} from "drizzle-orm";
import {db} from "./db-config";
import {documents} from "./db-schema";
import {generateEmbeddings} from "./embeddings";

export async function searchDocuments(
    query:string,
    limit:number=5,
    threshold:number=0.5
){
    const embeddings=await generateEmbeddings([query]);
    const queryVector=embeddings[0];
    const similarity=sql<number>`1-(${cosineDistance(
        documents.embedding,
        queryVector
    )})`;
    const similarDocuments=await db
    .select({
        id:documents.id,
        content:documents.content,
        similarity,
    })
    .from(documents)
    .where(gt(similarity,threshold))
    .orderBy(desc(similarity))
    .limit(limit);

    return similarDocuments;
}
