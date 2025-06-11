"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  FileText,
  MessageSquareText,
  Plus,
  Search,
  Users,
  User,
  ListFilter,
} from "lucide-react";
import React, { useState } from "react";

const mockRequests = [
  {
    date: "03.04.2025",
    requests: [
      {
        title: "Google Ads Review",
        status: "Submitted",
        category: "Marketing / SEO & Content Optimization",
        users: [
          { name: "User 1", avatar: "https://avatar.vercel.sh/1" },
          { name: "User 2", avatar: "https://avatar.vercel.sh/2" },
        ],
        description:
          "Lorem ipsum dolor sit amet consectetur. Sit quis justo risus est morbi sed. Pellentesque mauris.",
      },
      {
        title: "Hiring SDR",
        status: "Submitted",
        category: "Marketing / SEO & Content Optimization",
        users: [{ name: "User 3", avatar: "https://avatar.vercel.sh/3" }],
        description:
          "Lorem ipsum dolor sit amet consectetur. Sit quis justo risus est morbi sed. Pellentesque mauris.",
      },
      {
        title: "Profit Optimization",
        status: "Submitted",
        category: "Marketing / SEO & Content Optimization",
        users: [
          { name: "User 4", avatar: "https://avatar.vercel.sh/4" },
          { name: "User 5", avatar: "https://avatar.vercel.sh/5" },
        ],
        description:
          "Lorem ipsum dolor sit amet consectetur. Sit quis justo risus est morbi sed. Pellentesque mauris.",
      },
    ],
  },
  {
    date: "15.02.2025",
    requests: [
      {
        title: "Hiring SDR",
        status: "Submitted",
        category: "Marketing / SEO & Content Optimization",
        users: [{ name: "User 6", avatar: "https://avatar.vercel.sh/6" }],
        description:
          "Lorem ipsum dolor sit amet consectetur. Sit quis justo risus est morbi sed. Pellentesque mauris.",
      },
    ],
  },
  {
    date: "02.01.2025",
    requests: [
      {
        title: "Google Ads Review",
        status: "Submitted",
        category: "Marketing / SEO & Content Optimization",
        users: [{ name: "User 7", avatar: "https://avatar.vercel.sh/7" }],
        description:
          "Lorem ipsum dolor sit amet consectetur. Sit quis justo risus est morbi sed. Pellentesque mauris.",
      },
    ],
  },
];

const requestTabs = [
  { key: "submitted", label: "Submitted", count: 4 },
  { key: "inprogress", label: "In Progress", count: 5 },
  { key: "reviewing", label: "Reviewing", count: 1 },
  { key: "completed", label: "Completed", count: 103 },
  { key: "all", label: "All", count: 113 },
];

export default function RequestHubPage() {
  const [activeTab, setActiveTab] = useState("submitted");
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="py-8 max-w-[1200px] mx-auto px-4">
        {/* Banner */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-36 flex items-center justify-center mb-8 relative">
          <span className="text-gray-400 absolute left-8 top-8 text-2xl font-bold">
            Banner
          </span>
        </div>

        {/* Create Request */}
        <div className="flex flex-col gap-4 mb-6">
          <span className="text-xl font-bold">Create Request</span>
          <Button variant="default" className="w-fit bg-black text-white">
            <Plus size={18} className="mr-2" /> New Support Request
          </Button>
        </div>

        {/* All Requests */}
        <div className="flex flex-col gap-4">
          <span className="text-lg font-bold">All Requests</span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 w-fit">
              {requestTabs.map((tab) => (
                <Button
                  key={tab.key}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1 px-4 py-1 rounded-full transition-all
                    ${
                      activeTab === tab.key
                        ? "bg-white border border-gray-200 font-semibold text-black shadow-sm"
                        : "bg-gray-100 text-gray-500 font-normal hover:bg-gray-200 border border-transparent"
                    }
                  `}
                >
                  {tab.label}
                  <span
                    className={`ml-1 px-2 text-xs font-medium rounded-full transition-all
                      ${
                        activeTab === tab.key
                          ? "bg-white text-gray-600 border border-gray-200"
                          : "bg-white/80 text-gray-400"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-56">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </span>
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <Button
                variant="outline"
                className="ml-2 border-full rounded-full border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-600 px-2 py-1"
              >
                <ListFilter size={18} />
              </Button>
            </div>
          </div>

          {/* Requests by Date */}
          <div className="flex flex-col gap-6 mt-4">
            {mockRequests.map((group) => (
              <div key={group.date}>
                <span className="text-sm font-medium mb-2 text-gray-500">
                  {group.date}
                </span>
                <div className="flex gap-4 flex-wrap">
                  {group.requests.map((req, idx) => (
                    <Card
                      key={idx}
                      className="w-[340px] min-h-[150px] flex flex-col justify-between p-4 shadow-sm border border-gray-100"
                    >
                      <CardContent className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{req.title}</span>
                          <span className="bg-gray-200 text-gray-600 rounded px-2 text-xs ml-2">
                            Status
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {req.category}
                        </span>
                        <span className="text-sm text-gray-500 truncate">
                          {req.description}
                        </span>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between mt-4">
                        <div className="flex gap-[-2px]">
                          {req.users.map((user, i) => (
                            <Avatar
                              key={i}
                              className="-ml-2 border-2 border-white"
                            >
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <MessageSquareText className="w-4 h-4" /> Chat
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
