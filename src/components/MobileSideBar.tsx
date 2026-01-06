"use client"

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import SideBar from './SideBar';

interface MobileSideBarProps {
  currentPath?: string;
}

const MobileSideBar = ({ currentPath = "/dashboard" }: MobileSideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button - Visible on mobile/tablet only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay - Visible on mobile/tablet only when sidebar is open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Hidden on mobile/tablet, visible on lg+ */}
      <div
        className={`fixed left-0 top-0 h-full z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SideBar currentPath={currentPath} />
      </div>
    </>
  );
};

export default MobileSideBar;
