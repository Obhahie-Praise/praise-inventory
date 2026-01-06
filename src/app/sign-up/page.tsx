"use client";
import { signIn } from "@/lib/auth-client";
import { ArrowLeft, GithubIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignUpClient from "./SignUpClient";
import { useState } from "react";



const SignUpPage = () => {
  const [isGithubAuthenticating, setIsGithubAuthenticating] = useState(false);
  const [isGoogleAuthenticating, setIsGoogleAuthenticating] = useState(false);
  const socialSignIn = async (provider: string) => {
    try {await signIn.social({
      provider,
      callbackURL: "/dashboard",
    })} catch (error) {
      setIsGithubAuthenticating(false);
      setIsGoogleAuthenticating(false);
    }
  };

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
          <button
            onClick={() => {
              socialSignIn("github");
              setIsGithubAuthenticating(true)
            }}
            className="relative flex items-center justify-center w-full font-medium py-2.5 border-2 border-zinc-300 rounded-lg bg-black text-white cursor-pointer"
          >
            <GithubIcon
              className="absolute top-1/2 -translate-y-1/2 left-4"
              width={25}
              height={25}
            />
            <p className="">Sign up with GitHub</p>
            {isGithubAuthenticating && (
              <LoaderCircle
                className="mx-auto animate-spin absolute top-1/2 -translate-y-1/2 right-4 text-gray-500"
                width={25}
                height={25}
                strokeWidth={3}
              />
            )}
          </button>
          <button
            onClick={() => {
              socialSignIn("google");
              setIsGoogleAuthenticating(false)
            }}
            className="relative flex items-center justify-center w-full font-medium py-2.5 border-2 border-zinc-300 rounded-lg cursor-pointer"
          >
            <Image
              className="absolute top-1/2 -translate-y-1/2 left-4"
              src="/google.png"
              alt="Google Sign In"
              width={25}
              height={25}
            />
            <p className="">Sign up with Google</p>
            {isGoogleAuthenticating && (
              <LoaderCircle
                className="mx-auto animate-spin absolute top-1/2 -translate-y-1/2 right-4 text-gray-500"
                width={25}
                height={25}
                strokeWidth={3}
              />
            )}
          </button>

          <div className="flex items-center my-3">
            <div className="h-px flex-1 bg-zinc-300" />
            <p className="px-2 text-zinc-400">or continue with</p>
            <div className="h-px flex-1 bg-zinc-300" />
          </div>
          <SignUpClient />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
