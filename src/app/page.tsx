import type { Metadata } from "next";
import { BoxIcon } from "lucide-react";
import LightRays from "../components/LightRays"
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Home | Inventory Management",
  description: "Manage inventory the smart way with our intelligent inventory management system for personal and business needs.",
};

const HomePage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="absolute top-0 h-screen -z-50 w-full">
        <LightRays mouseInfluence={0.05} raysSpeed={2.5} />
      </div>
      <header className="flex items-center justify-between px-4 sm:px-6 lg:mx-40 my-8 sm:my-15 lg:px-5 lg:py-3 border border-zinc-400 rounded-xl backdrop-blur-2xl">
        <div className="flex gap-2 items-center">
          <BoxIcon className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.6} />
          <h1 className="font-medium text-lg sm:text-xl lg:text-2xl">Inventory</h1>
        </div>
        <div className="flex gap-2 sm:gap-4 flex-wrap">
          <Link href="/sign-in" className="px-2 sm:px-3 py-1 rounded-lg text-black font-normal text-sm sm:text-base border-2 border-zinc-400 hover:border-zinc-400 transition-colors">Sign In</Link>
          <Link href="/sign-up" className="px-2 sm:px-3 py-1 bg-black rounded-lg text-white font-normal text-sm sm:text-base hover:bg-zinc-700 transition-colors">Sign Up</Link>
        </div>
      </header>

      <div className="mt-12 sm:mt-20 lg:mt-30 px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-6xl font-medium capitalize">Manage inventory the smart way.</h2>
        <p className="text-center mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-zinc-500">Smart inventory management for your personal and business needs</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 flex-wrap">
          <Link href="/about" className="px-3 py-1 rounded-lg text-black font-normal text-sm sm:text-base border-2 border-zinc-400 hover:border-zinc-400 transition-colors text-center">Learn More</Link>
          <Link href="/sign-up" className="px-3 py-1 bg-black rounded-lg text-white font-normal text-sm sm:text-base hover:bg-zinc-700 transition-colors text-center">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
