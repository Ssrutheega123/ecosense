
"use client";

import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    SignedIn,
    SignedOut,
} from "@clerk/nextjs"; 
import Link from "next/link";
import { Leaf } from "lucide-react";
import {Button} from "./ui/button";


export const Navigation=()=>{
    return (
        <nav className="sticky top-0 z-50 border-b border-emerald-100 bg-white/85 backdrop-blur">
            <div className="flex container h-16 items-center justify-between px-4 mx-auto">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-100">
                        <Leaf className="size-5" />
                    </span>
                    EcoSense AI
                </Link>
                <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
                    <Link className="hover:text-emerald-700" href="/upload">Upload</Link>
                    <Link className="hover:text-emerald-700" href="/chat">Ask AI</Link>
                </div>
                <div className="flex gap-2">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost">Sign In</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button>Sign Up</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <SignOutButton>
                            <Button variant="outline">Sign Out</Button>
                        </SignOutButton>
                    </SignedIn>

                </div>

            </div>
        </nav>
    );

};
