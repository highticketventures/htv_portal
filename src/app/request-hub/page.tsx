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
          { name: "User 1", avatar: "https://i.pravatar.cc/40?img=8" },
          { name: "User 2", avatar: "https://i.pravatar.cc/40?img=5" },
        ],
        description:
          "Lorem ipsum dolor sit amet consectetur. Sit quis justo risus est morbi sed. Pellentesque mauris.",
      },
      {
        title: "Hiring SDR",
        status: "Submitted",
        category: "Marketing / SEO & Content Optimization",
        users: [{ name: "User 3", avatar: "https://i.pravatar.cc/40?img=52" }],
        description:
          "Lorem ipsum dolor sit amet consectetur. Sit quis justo risus est morbi sed. Pellentesque mauris.",
      },
      {
        title: "Profit Optimization",
        status: "Submitted",
        category: "Marketing / SEO & Content Optimization",
        users: [
          { name: "User 4", avatar: "https://i.pravatar.cc/40?img=47" },
          { name: "User 5", avatar: "https://i.pravatar.cc/40?img=51" },
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
        users: [{ name: "User 6", avatar: "https://i.pravatar.cc/40?img=53" }],
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
        users: [{ name: "User 7", avatar: "https://i.pravatar.cc/40?img=54" }],
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
      <div className="py-8 max-w-[1800px] mx-auto px-4">
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
          <div className="flex flex-col gap-8 mt-4">
            {mockRequests.map((group) => (
              <div key={group.date}>
                <div className="text-sm font-medium mb-3 text-gray-500">
                  {group.date}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.requests.map((req, idx) => (
                    <Card
                      key={idx}
                      className="rounded-xl shadow-sm border gap-1 border-gray-100 p-4 flex flex-col min-h-[120px]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">
                            {req.title}
                          </span>
                          <span className="bg-gray-200 text-gray-600 font-semibold rounded-full px-2 text-xs ml-2">
                            Status
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            {req.users.map((user, i) => (
                              <Avatar
                                key={i}
                                className="-ml-4 border-2 border-white w-7 h-7"
                              >
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 border-gray-200 bg-white hover:bg-gray-100"
                            >
                              <FileText className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex justify-end mt-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 border-gray-200 bg-white hover:bg-gray-100"
                            >
                              <MessageSquareText className="w-4 h-4" /> Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm gap-2 mb-1">
                        <svg
                          width="16"
                          height="14"
                          viewBox="0 0 16 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.6667 4.33334V7M6.83337 2.66667H4.53337C3.41327 2.66667 2.85322 2.66667 2.42539 2.88466C2.04907 3.0764 1.74311 3.38236 1.55136 3.75869C1.33337 4.18651 1.33337 4.74656 1.33337 5.86667L1.33337 6.66667C1.33337 7.28792 1.33338 7.59855 1.43487 7.84358C1.57019 8.17028 1.82976 8.42985 2.15646 8.56517C2.40149 8.66667 2.71212 8.66667 3.33338 8.66667V11.5C3.33338 11.6548 3.33338 11.7322 3.3398 11.7974C3.40214 12.4304 3.90298 12.9312 4.53602 12.9936C4.60121 13 4.6786 13 4.83338 13C4.98816 13 5.06554 13 5.13073 12.9936C5.76377 12.9312 6.26461 12.4304 6.32696 11.7974C6.33338 11.7322 6.33338 11.6548 6.33338 11.5V8.66667H6.83338C8.01099 8.66667 9.45154 9.29793 10.5629 9.90376C11.2113 10.2572 11.5354 10.4339 11.7478 10.4079C11.9446 10.3838 12.0935 10.2954 12.2089 10.1341C12.3334 9.9601 12.3334 9.612 12.3334 8.91581V2.41753C12.3334 1.72133 12.3334 1.37324 12.2089 1.19926C12.0935 1.03794 11.9446 0.949535 11.7478 0.925421C11.5354 0.899417 11.2113 1.07613 10.5629 1.42957C9.45154 2.03541 8.01099 2.66667 6.83337 2.66667Z"
                            stroke="#8E8E8E"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <span>{req.category}</span>
                      </div>
                      <div className="text-gray-500 text-sm line-clamp-2">
                        {req.description}
                      </div>
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
