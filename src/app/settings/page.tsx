import type { Metadata } from "next";
import SideBarWrapper from "@/components/SideBarWrapper";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react'

export const metadata: Metadata = {
  title: "Settings | Inventory Management",
  description: "Manage your account settings and preferences.",
};

const SettingPage = async () => {
    const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  return (
    <div className="min-h-screen bg-zinc-100 flex">
      <SideBarWrapper currentPath="/settings" />
      <main className="flex-1 lg:ml-60 p-4 sm:p-6 lg:p-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900">
                Settings
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500">
                Manage your account settings and preferences.
              </p>
            </div>
          </div>
        </header>
        <div className="flex justify-center mt-20 sm:mt-40">
          <p className="text-lg sm:text-2xl uppercase font-semibold text-zinc-700">coming soon !!</p>
        </div>
      </main>
    </div>
  )
}

export default SettingPage