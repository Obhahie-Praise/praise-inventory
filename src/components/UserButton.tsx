"use client";
import { useRandomColor } from "@/hooks/useRandomColor";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import { LogOut, Settings, User, UserRound } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserButton = () => {
  const router = useRouter();
  const [drop, setDrop] = useState(false);
  const { data: session, isPending } = useSession();
  const bgColor = useRandomColor()

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;
  const altImage = user.name.charAt(0).toUpperCase();

  return (
    <div className={`px-2 py-2 rounded-lg flex items-center relative  hover:bg-zinc-600/20 ${drop ? "" : "cursor-pointer"}`} onClick={() => setDrop(!drop)}>
      <div className={`w-8 h-8 relative rounded-full ring ring-zinc-300 text-sm font-medium ${bgColor}`}>
        {user.image ? <img src={user.image} alt="User" className="w-full h-full rounded-full object-cover" /> : <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{altImage}</p>}
      </div>
      <div className="ml-2">
        <p className="font-medium text-sm capitalize">{user.name}</p>
        <span className="font-normal text-zinc-400 text-xs">{user.email}</span>
      </div>

      {drop && (
        <div
          className={`absolute -top-40 px-3 py-2 bg-zinc-50 text-black rounded-lg border-2 border-zinc-300 max-w-50 space-y-2`}
        >
          <Link href="/settings"
            className="flex items-center space-x-2 w-full cursor-pointer py-2 text-black" 
          >
            <Settings width={19} height={19} className="" />
            <p className="font-medium text-sm">Account Settings</p>
          </Link>
          <div
            className="flex items-center space-x-2 py-2 border-t border-zinc-300"
            onClick={() => signOut()}
          >
            <p className="font-medium text-sm text-nowrap">User ID</p>
            <p className="truncate">{user.id}</p>
          </div>
          <button
            className="flex items-center space-x-2 w-full cursor-pointer py-2 border-t border-zinc-300 text-red-500" 
            onClick={() => {signOut()
              redirect('sign-in');
            }}
          >
            <LogOut width={17} height={17} className="" />
            <p className="font-medium text-sm">Sign Out</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserButton;
