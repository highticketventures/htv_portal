"use client";

import {OrganizationProfile} from "@clerk/nextjs";

export default function Home() {

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <OrganizationProfile />
    </div>
  );
}