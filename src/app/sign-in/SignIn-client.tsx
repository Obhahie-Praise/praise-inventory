"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import {
  Eye,
  EyeClosed,
  LoaderCircle,
  ScanFace,
} from "lucide-react";

const SignInClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsAuthenticating(true);

    const res = await signIn.email({
      email: email,
      password: password,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
      setIsAuthenticating(false);
    } else {
      router.push("/dashboard");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="">
        <label className="font-medium block mb-0.5" htmlFor="email">
          Email
        </label>
        <div className="flex items-center outline-2 outline-zinc-300 p-2 rounded-lg">
          <input
            value={email}
            id="email"
            type="email"
            className="w-full focus:outline-none text-zinc-400"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <ScanFace strokeWidth={1.3} className="ml-2" />
        </div>
      </div>
      <div className="">
        <label className="font-medium block mb-0.5" htmlFor="password">
          Password
        </label>
        <div className="flex items-center outline-2 outline-zinc-300 p-2 rounded-lg">
          <input
            value={password}
            id="password"
            type={passwordView ? "text" : "password"}
            className="w-full focus:outline-none text-zinc-400"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div onClick={() => setPasswordView(!passwordView)} className="">
            {passwordView ? (
              <EyeClosed strokeWidth={1.3} className="ml-2" />
            ) : (
              <Eye strokeWidth={1.3} className="ml-2" />
            )}
          </div>
        </div>
      </div>
      <p className="text-zinc-600 font-medium underline">Forgot Password?</p>
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-black text-white font-medium mt-2 cursor-pointer"
      >
        {isAuthenticating ? (
          <LoaderCircle
            className="mx-auto animate-spin"
            width={25}
            height={25}
            strokeWidth={3}
          />
        ) : (
          "Sign In"
        )}
      </button>
      <div className="w-full relative text-center">
        {error && (
          <p className="absolute w-full top-3 text-red-500 bg-red-500/20 py-1.5 border border-red-500 rounded-lg">
            {error}
          </p>
        )}
      </div>
    </form>
  );
};

export default SignInClient;
