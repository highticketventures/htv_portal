"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronLeft,
  Users,
  Plus,
  Calendar,
  Link as LinkIcon,
  MessageSquareText,
  Paperclip,
  Search,
  Video,
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const mockRequest = {
  title: "Google Ads Review",
  date: "03.04.2025",
  status: "Action Required",
  statusStep: 1, // 0: Submitted, 1: In Progress, 2: Reviewing, 3: Completed
  avatars: [
    { name: "Fletcher Ladd", src: "https://i.pravatar.cc/40?img=8" },
    { name: "Sarah Lane", src: "https://i.pravatar.cc/40?img=5" },
  ],
  details: {
    created: "19 April 2025, 19:25",
    category: "Marketing / SEO & Content Optimization",
    requestedBy: {
      name: "Fletcher Ladd",
      src: "https://i.pravatar.cc/40?img=8",
    },
    partner: { name: "Sarah Lane", src: "https://i.pravatar.cc/40?img=5" },
    requestId: "2025-R-000000001",
  },
  requestText: `Lorem ipsum dolor sit amet consectetur. Nunc ullamcorper sed vel urna in sit nibh. Etiam duis praesent dolor elit morbi et augue euismod proin. Magna ridiculus elit non dolor tristique eget. Curabitur justo consequat eu placerat viverra lobortis ullamcorper erat. Lorem ipsum dolor sit.\n\n- Lorem ipsum\n- Dolor sit amet consectetur\n\nLorem ipsum dolor sit.`,
};

const mockMessages = [
  {
    name: "Fletch - CEO",
    time: "11:54",
    avatar: "https://i.pravatar.cc/40?img=8",
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet elementum sagittis amet semper.",
    self: false,
  },
  {
    name: "Fletch - CEO",
    time: "11:56",
    avatar: "https://i.pravatar.cc/40?img=8",
    content:
      "Lorem ipsum dolor sit amet consectetur.\nAmet elementum sagittis amet semper.",
    self: false,
    muted: true,
  },
  {
    name: "John Doe",
    time: "17:12",
    avatar: "https://i.pravatar.cc/40?img=51",
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet elementum sagittis amet semper.",
    self: false,
  },
  {
    name: "Fletch - CEO",
    time: "18:01",
    avatar: "https://i.pravatar.cc/40?img=8",
    content: "Lorem ipsum dolor sit amet consectetur. Amet elementum sagittis",
    self: false,
  },
  {
    name: "Sarah Lane",
    time: "18:04",
    avatar: "https://i.pravatar.cc/40?img=5",
    content: `Amet elementum sagittis amet semper.\nLorem ipsum dolor sit amet consectetur. Amet elementum sagittis amet semper. Dolor ipsum amet!\nAmet elementum sagittis amet semper.`,
    self: false,
  },
];

const statusSteps = [
  { label: "Submitted" },
  { label: "In Progress" },
  { label: "Reviewing" },
  { label: "Completed" },
];

export default function RequestDetailsPage() {
  const [tab, setTab] = useState("chat");
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="mb-2">
          <Link
            href="/requests"
            className="flex items-center gap-2 text-gray-700 hover:text-black text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Requests
          </Link>
        </div>
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {mockRequest.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-700 text-sm flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {mockRequest.date}
            </span>
            <span className="bg-[#227c64]/10 text-[#227c64] text-xs font-semibold rounded-full px-2 py-1">
              {mockRequest.status}
            </span>
            <div className="flex items-center gap-1 ml-2">
              {mockRequest.avatars.map((user, i) => (
                <Avatar key={i} className="-ml-4 border-2 border-white w-7 h-7">
                  <AvatarImage src={user.src} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Left */}
          <div className="flex-1 min-w-0">
            {/* Status Progress Bar */}
            <div className="flex items-center gap-2 mt-2 mb-4">
              {statusSteps.map((step, idx) => (
                <div key={step.label} className="flex-1 flex flex-col">
                  <div
                    className={
                      idx < mockRequest.statusStep
                        ? "h-1 w-full py-1 rounded-full bg-[#227c64]"
                        : idx === mockRequest.statusStep
                        ? "h-1 w-full py-1 rounded-full bg-gradient-to-r from-[#227c64] from-0% via-[#227c64]/10 via-80% to-[#227c64] to-100%"
                        : "h-1 w-full py-1 rounded-full bg-gray-200"
                    }
                  ></div>
                  <span
                    className={`text-xs mt-2 ${
                      idx <= mockRequest.statusStep
                        ? "text-[#227c64] font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab} className="w-full gap-0">
              <div className="flex items-center border-b border-l border-r rounded-t-xl border-gray-100 border-b-gray-200 bg-white px-2">
                <TabsList className="flex bg-transparent border-none p-0 shadow-none">
                  <TabsTrigger
                    value="chat"
                    className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:text-black"
                  >
                    Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="files"
                    className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:text-black"
                  >
                    Files
                  </TabsTrigger>
                </TabsList>
                <div className="flex-1" />
                <span className="text-gray-400 mr-2 cursor-pointer flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </span>
              </div>
              <TabsContent value="chat">
                {/* Chat Area */}
                <div className="bg-white rounded-b-xl border border-gray-100 p-0 overflow-hidden flex flex-col min-h-[400px] max-h-[600px]">
                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {/* Date Divider */}
                    <div className="flex items-center justify-center text-xs text-gray-400 mb-2">
                      April 19th
                    </div>
                    {mockMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 ${
                          msg.self ? "justify-end" : ""
                        }`}
                      >
                        <Avatar className="w-9 h-9">
                          <AvatarImage src={msg.avatar} />
                          <AvatarFallback>{msg.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-gray-900">
                              {msg.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {msg.time}
                            </span>
                          </div>
                          <div
                            className={`text-sm whitespace-pre-line ${
                              msg.muted ? "text-gray-400" : "text-gray-700"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                        {msg.self && <span className="text-green-500">✓</span>}
                      </div>
                    ))}
                  </div>
                  {/* Message Input */}
                  <div className="bg-[#f6f6f6] rounded-md px-4 py-3 flex items-center gap-2 mx-3 my-3">
                    <span className="text-gray-100 cursor-pointer bg-gray-400 hover:bg-gray-500 rounded-full p-1">
                      <Plus className="w-5 h-5" />
                    </span>
                    <Input
                      type="text"
                      placeholder="Message Sarah Lane, John Doe"
                      className="flex-1 bg-transparent border-none outline-none text-gray-400 placeholder-gray-400 text-base"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 cursor-pointer font-semibold text-base select-none hover:text-gray-500 underline"
                    >
                      Aa
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="files">
                <div className="bg-white rounded-b-xl border border-gray-100 p-8 text-gray-400 text-center">
                  No files yet.
                </div>
              </TabsContent>
            </Tabs>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-[440px] flex flex-col gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2 justify-center font-semibold"
              >
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2241_2482)">
                    <path
                      d="M10.6829 7.99994L12.4376 10.0312L14.7971 11.5583L15.2086 8.01244L14.7971 4.54578L12.3923 5.88744L10.6829 7.99994Z"
                      fill="#00832D"
                    />
                    <path
                      d="M0.5 11.2291V14.25C0.5 14.9406 1.05234 15.5 1.73429 15.5H4.71714L5.33429 13.2166L4.71714 11.2291L2.67029 10.6041L0.5 11.2291Z"
                      fill="#0066DA"
                    />
                    <path
                      d="M4.71714 0.5L0.5 4.77083L2.67029 5.39583L4.71714 4.77083L5.324 2.81042L4.71714 0.5Z"
                      fill="#E94235"
                    />
                    <path
                      d="M4.71714 4.77087H0.5V11.2292H4.71714V4.77087Z"
                      fill="#2684FC"
                    />
                    <path
                      d="M17.492 2.30832L14.7972 4.54582V11.5583L17.5044 13.8062C17.9096 14.1271 18.5021 13.8344 18.5021 13.3125V2.79166C18.5021 2.26353 17.8962 1.97395 17.492 2.30832ZM10.6829 7.99999V11.2292H4.71716V15.5H13.5629C14.2448 15.5 14.7972 14.9406 14.7972 14.25V11.5583L10.6829 7.99999Z"
                      fill="#00AC47"
                    />
                    <path
                      d="M13.5629 0.5H4.71716V4.77083H10.6829V8L14.7972 4.54792V1.75C14.7972 1.05937 14.2448 0.5 13.5629 0.5Z"
                      fill="#FFBA00"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2241_2482">
                      <rect
                        width="18"
                        height="15"
                        fill="white"
                        transform="translate(0.5 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-gray-700">Join Call</span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2 justify-center font-semibold"
              >
                <Calendar className="w-5 h-5 text-gray-900" />
                <span className="text-gray-700">Reschedule</span>
              </Button>
            </div>
            <Card className="p-4 flex flex-col gap-2">
              <div className="font-semibold text-gray-700">Details</div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-start">
                  <span className="text-gray-500 lg:w-[100px]">Created on</span>
                  <span>{mockRequest.details.created}</span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="text-gray-500 lg:w-[100px]">
                    Business area
                  </span>
                  <span>{mockRequest.details.category}</span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="text-gray-500 lg:w-[100px]">
                    Requested by
                  </span>
                  <span className="flex items-center gap-1">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={mockRequest.details.requestedBy.src} />
                      <AvatarFallback>
                        {mockRequest.details.requestedBy.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {mockRequest.details.requestedBy.name}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="text-gray-500 lg:w-[100px]">Partner</span>
                  <span className="flex items-center gap-1">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={mockRequest.details.partner.src} />
                      <AvatarFallback>
                        {mockRequest.details.partner.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {mockRequest.details.partner.name}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="text-gray-500 lg:w-[100px]">Request ID</span>
                  <span className="flex items-center gap-1">
                    {mockRequest.details.requestId}
                    <LinkIcon className="w-3 h-3 text-gray-400" />
                  </span>
                </div>
              </div>
            </Card>
            <Card className="p-4 flex flex-col gap-2">
              <div className="font-semibold text-gray-700">Request Text</div>
              <div className="text-sm whitespace-pre-line text-gray-700">
                {mockRequest.requestText}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
