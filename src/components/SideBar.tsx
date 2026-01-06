"use client"

import { BoxesIcon, BoxIcon, PlusCircleIcon, SettingsIcon, UserRound } from 'lucide-react'
import Link from 'next/link';
import UserButton from './UserButton';

const SideBar = ({currentPath = "/dashboard"}: {currentPath?: string}) => {
    const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BoxIcon,
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: BoxesIcon, // or PackageIcon
  },
  {
    name: "Add Product",
    href: "/add-product",
    icon: PlusCircleIcon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];


  return (
    <div className='w-60 bg-zinc-900 fixed top-0 left-0 text-white h-screen p-6 flex flex-col'>
        <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
                <BoxIcon width={30} height={30} strokeWidth={2} />
                <span className="text-lg font-semibold">Inventory</span>
            </div>
        </div>

        <nav className="space-y-1 flex-1">
            <div className="text-xs font-semibold text-zinc-400 uppercase">Inventory</div>
            {navigation.map((item, key) => {
                const IsActive = currentPath === item.href
                return (
                <Link href={item.href} key={key} className={`flex items-center space-x-3 py-2 px-3 font-medium rounded-lg ${IsActive ? "bg-zinc-200 text-zinc-700" : "hover:bg-zinc-400/10 text-zinc-300 transition-colors"}`}>
                    <item.icon width={20} height={20} />
                    <span className="text-sm">{item.name}</span>
                    </Link>
  )})}
        </nav>

        <div className="py-2 px-4 border-t border-zinc-700 transition-colors mt-auto">
            <UserButton />
        </div>
    </div>
  )
}

export default SideBar