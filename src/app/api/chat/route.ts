import {streamText,UIMessage,convertToModelMessages,tool,InferUITools,UIDataTypes,stepCountIs} from "ai";
import {huggingface} from "@ai-sdk/huggingface";
import {z} from "zod";
import {searchDocuments} from "@/lib/search";

const tools={
    searchKnowledgeBase:tool({
        description:"Search the knowledge base for financial information and fintech information",
        inputSchema:z.object({
            query:z.string().describe("The search query to find relevant documents"),

        }),
        execute:async({query})=>{
            console.log("tool triggered with query:",query);
            try{
                console.log(`AI is searching for:"${query}`);
                const results=await searchDocuments(query,3,0.5);
                console.log(`Database returned ${results.length} chunks`);
                if(results.length===0){
                    return "No relevant information found in the knowledge base";
                }

                const formattedResults=results
                    .map((r,i)=>`[${i+1}]${r.content}`)
                    .join("\n\n");
                return formattedResults;
            }catch(error){
                console.error("Search error:",error);
                return "Error searching the knowledge base";
            }
        },
    }),
};

export type ChatTools=InferUITools<typeof tools>;
export type ChatMessage=UIMessage<never,UIDataTypes,ChatTools>;

export async function POST(req: Request) {
    try {
        const { messages }: { messages: ChatMessage[] } = await req.json();

        const result = streamText({
            model: huggingface("meta-llama/Llama-3.1-8B-Instruct"),
            messages: await convertToModelMessages(messages),
            tools:tools,
            system:`You are a helpful fintech assistant with access to a knowledge base,
                When users ask questions, search the knowledge base for relevant information.
                Always search before answering if the question might relate to uploaded documants.
                Base your answers on the search results when available. Give concise answers that correctly answer what the user is asking for.Do not flood them with all the information from the search results.`,
            stopWhen:stepCountIs(10),
            
            toolChoice:'required'
            
        });

        return result.toUIMessageStreamResponse();
    } catch(error){
        console.error("Error streaming chat completion:",error);
        return new Response("Failed to stream chat completion",{status:500});
    }
}