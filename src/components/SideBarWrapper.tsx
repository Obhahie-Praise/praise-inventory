"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import SideBar from './SideBar'

interface SideBarWrapperProps {
  currentPath?: string
}

export default function SideBarWrapper({ currentPath = "/dashboard" }: SideBarWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button - Only visible on mobile (< md) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay - Only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Desktop: fixed and visible, Mobile: slide in/out */}
      <div
        className={`
          fixed top-0 left-0 z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'block' : 'hidden'} md:block
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <SideBar currentPath={currentPath} />
      </div>
    </>
  )
}
