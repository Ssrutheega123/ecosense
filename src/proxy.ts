/*
import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute=createRouteMatcher(["/",'/sign-in(.*)','/sign-up(.*)']);

export default clerkMiddleware(async(auth,req)=>{
  if(!isPublicRoute(req)){
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
*/

import {clerkMiddleware,createRouteMatcher} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
const isPublicROute=createRouteMatcher(["/","/sign-in(.*","/sign-up(.*"]);
const isAdminRoute=createRouteMatcher(["upload"]);

export default clerkMiddleware(async(auth,req)=>{
    const {sessionClaims}=await auth();
    const isAdmin=sessionClaims?.metadata?.role==="admin";
    if(!isAdminRoute(req)&&!isAdmin){
        const url=new URL("/",req.url);
        return NextResponse.redirect(url);
    }
    if(!isPublicROute(req)){
        await auth.protect();
    }
});

export const config={
    matcher:[
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",

    ],
};
