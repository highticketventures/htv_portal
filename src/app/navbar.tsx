'use client'

import { UserButton } from "@clerk/nextjs"
import { Container, Flex, Button, IconButton } from "@radix-ui/themes"
import Link from "next/link"
import { 
  DashboardIcon, 
  ChatBubbleIcon, 
  GearIcon, 
  BellIcon, 
  ClockIcon,
  ComponentInstanceIcon,
  LayersIcon,
  FileTextIcon
} from '@radix-ui/react-icons'

export default function Navbar() {
  return (
    <nav className="bg-black text-white">
      <Container>
        <Flex py="4" justify="between" align="center">
          {/* Left side - Logo and Nav Items */}
          <Flex align="center" gap="6">
            <Link href="/" className="font-semibold text-lg flex items-center gap-2">
              <ComponentInstanceIcon width={24} height={24} />
              Portal
            </Link>

            <Flex gap="4" align="center">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <DashboardIcon />
                Dashboard
              </Link>
              <Link href="/requests" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <FileTextIcon />
                Request Hub
              </Link>
              <Link href="/management" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <LayersIcon />
                Management
              </Link>
              <Link href="/resources" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <FileTextIcon />
                Resources
              </Link>
              <Link href="/messages" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <ChatBubbleIcon />
                Messages
              </Link>
            </Flex>
          </Flex>

          {/* Right side - Icons and User */}
          <Flex gap="4" align="center">
            <IconButton variant="ghost" color="gray">
              <GearIcon width={20} height={20} />
            </IconButton>
            <IconButton variant="ghost" color="gray">
              <ClockIcon width={20} height={20} />
            </IconButton>
            <IconButton variant="ghost" color="gray">
              <GearIcon width={20} height={20} />
            </IconButton>
            <IconButton variant="ghost" color="gray">
              <BellIcon width={20} height={20} />
            </IconButton>
            <UserButton afterSignOutUrl="/" />
          </Flex>
        </Flex>
      </Container>
    </nav>
  )
}
