"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SignUpClient from "./SignUpClient";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link
        href="/"
        className="absolute top-10 left-5 p-1 rounded border-2 border-zinc-400"
      >
        <ArrowLeft strokeWidth={1.3} />
      </Link>
      <div className="min-w-70">
        <h1 className="text-3xl font-medium">Create new account</h1>
        <p className="text-zinc-400 my-1">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline text-black">
            Sign In
          </Link>
        </p>
        <div className="space-y-2">
          <SignUpClient />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
