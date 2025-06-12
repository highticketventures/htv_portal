"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  MessageSquare,
  Settings,
  Bell,
  Layers,
  FileText,
  Bug,
  LifeBuoy,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="py-4 flex justify-between items-center">
          {/* Left side - Logo and Nav Items */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-semibold text-lg flex items-center gap-2"
            >
              <Image src="/images/logo.png" alt="logo" width={90} height={27} />
            </Link>

            <div className="flex gap-4 items-center">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
              >
                <LayoutGrid size={16} />
                Dashboard
              </Link>
              <Link
                href="/requests"
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
              >
                <FileText size={16} />
                Request Hub
              </Link>
              <Link
                href="/management"
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
              >
                <Layers size={16} />
                Management
              </Link>
              <Link
                href="/resources"
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
              >
                <FileText size={16} />
                Resources
              </Link>
              <Link
                href="/messages"
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
              >
                <MessageSquare size={16} />
                Messages
              </Link>
            </div>
          </div>

          {/* Right side - Icons and User */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-black">
              <Bug size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-30 hover:text-black">
              <LifeBuoy size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-black">
              <Settings size={20} />  
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-black mr-2">
              <Bell size={20} />
            </Button>
            <OrganizationSwitcher />
            <UserButton afterSignOutUrl="/"/>
          </div>
        </div>
      </div>
    </nav>
  );
}
