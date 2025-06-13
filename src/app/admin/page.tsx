"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FileText, MessageSquareText, Search, ListFilter } from "lucide-react";
import React, { useState, useEffect } from "react";

const mockUsers = [
  { name: "User 1", avatar: "https://i.pravatar.cc/40?img=8" },
  { name: "User 2", avatar: "https://i.pravatar.cc/40?img=5" },
  { name: "User 3", avatar: "https://i.pravatar.cc/40?img=52" },
  { name: "User 4", avatar: "https://i.pravatar.cc/40?img=47" },
  { name: "User 5", avatar: "https://i.pravatar.cc/40?img=51" },
];

type Company = { id: string; name: string };
type Request = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
  company?: { id: string; name: string };
};

const requestTabs = [
  { key: "submitted", label: "Submitted" },
  { key: "inprogress", label: "In Progress" },
  { key: "reviewing", label: "Reviewing" },
  { key: "completed", label: "Completed" },
  { key: "all", label: "All" },
];

export default function AdminRequestsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [companyId, setCompanyId] = useState<string | "">("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch companies for filter dropdown
  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then(setCompanies);
  }, []);

  // Fetch all requests (optionally filtered by company)
  useEffect(() => {
    setIsLoading(true);

    const url = companyId
      ? `/api/requests?companyId=${companyId}`
      : "/api/requests/all";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .finally(() => setIsLoading(false));
  }, [companyId]);

  const groupedRequests = React.useMemo(() => {
    if (!requests) return [];
    const groups: {
      date: string;
      requests: (Request & { users: typeof mockUsers })[];
    }[] = [];
    const requestsByDate = new Map<
      string,
      (Request & { users: typeof mockUsers })[]
    >();
    requests.forEach((request) => {
      if (
        activeTab !== "all" &&
        request.status.toLowerCase() !== activeTab.toLowerCase()
      ) {
        return;
      }
      if (
        searchQuery &&
        !request.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return;
      }
      const date = new Date(request.createdAt).toLocaleDateString();
      const existingRequests = requestsByDate.get(date) || [];
      const numUsers = Math.floor(Math.random() * 2) + 1;
      const users = mockUsers.slice(0, numUsers);
      requestsByDate.set(date, [...existingRequests, { ...request, users }]);
    });
    Array.from(requestsByDate.entries())
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .forEach(([date, requests]) => {
        groups.push({ date, requests });
      });
    return groups;
  }, [requests, activeTab, searchQuery]);

  const tabCounts = React.useMemo(() => {
    if (!requests) return {};
    return requests.reduce((acc, request) => {
      const status = request.status.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      acc.all = (acc.all || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [requests]);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="py-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-4 mb-6">
          <span className="text-2xl font-bold">Admin View - All Requests</span>
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Filter by Company:</label>
            <select
              className="border rounded px-2 py-1"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            >
              <option value="">All Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-4">
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
                    {tabCounts[tab.key] || 0}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
          {isLoading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col gap-8 mt-4">
              {groupedRequests.map((group) => (
                <div key={group.date}>
                  <div className="text-sm font-medium mb-3 text-gray-500">
                    {group.date}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {group.requests.map((req) => (
                      <Link
                        href={`/requests/${req.id}`}
                        key={req.id}
                        className="block"
                      >
                        <Card className="rounded-xl shadow-sm border gap-1 border-gray-100 p-4 flex flex-col min-h-[120px] hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-base">
                                {req.title}
                              </span>
                              <span className="bg-gray-200 text-gray-600 font-semibold rounded-full px-2 text-xs ml-2">
                                {req.status}
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
                                    <AvatarFallback>
                                      {user.name[0]}
                                    </AvatarFallback>
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
                            <span>{req.category}</span>
                          </div>
                          <div className="text-gray-500 text-sm line-clamp-2">
                            {req.description}
                          </div>
                          {req.company && (
                            <div className="text-xs text-gray-400 mt-2">
                              Company: {req.company.name}
                            </div>
                          )}
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
