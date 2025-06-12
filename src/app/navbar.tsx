"use client";

import {
  useUser,
  useAuth,
  SignOutButton,
  useOrganizationList,
  useClerk,
} from "@clerk/nextjs";
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
  LogOut,
  Building2,
  User,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { user } = useUser();
  const { orgSlug } = useAuth();
  const { userMemberships } = useOrganizationList({
    userMemberships: true,
  });
  const { setActive } = useClerk();

  let prefix = "/";
  if (orgSlug) {
    prefix = `/orgs/${orgSlug}`;
  }

  const handleOrgSwitch = async (orgId: string, orgSlug: string | null) => {
    try {
      await setActive({ organization: orgId });
      window.location.href = `/orgs/${orgSlug}`;
    } catch (error) {
      console.error("Error switching organization:", error);
    }
  };

  return (
    <nav className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="py-4 flex justify-between items-center">
          {/* Left side - Logo and Nav Items */}
          <div className="flex items-center gap-6">
            <Link
              href={`${prefix}`}
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
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-black"
            >
              <Bug size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-30 hover:text-black"
            >
              <LifeBuoy size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-black"
            >
              <Settings size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-black mr-2"
            >
              <Bell size={20} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName || ""}
                    />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.fullName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <User size={16} />
                    User Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                {userMemberships.data?.map((membership) => (
                  <DropdownMenuItem
                    key={membership.organization.id}
                    onClick={() =>
                      handleOrgSwitch(
                        membership.organization.id,
                        membership.organization.slug
                      )
                    }
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar className="h-4 w-4 mr-2">
                      <AvatarImage
                        src={membership.organization.imageUrl}
                        alt={membership.organization.name || ""}
                      />
                      <AvatarFallback>
                        <Building2 size={8} />
                      </AvatarFallback>
                    </Avatar>
                    {membership.organization.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/create-organization"
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Create Organization
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SignOutButton>
                    <div className="flex items-center gap-2 text-red-600">
                      <LogOut size={16} />
                      Sign out
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
