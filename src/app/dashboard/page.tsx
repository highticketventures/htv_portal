"use client";

import { useUser } from "@clerk/nextjs";
import {
  UsersRound,
  Clock,
  RefreshCw,
  ExternalLink,
  FileText,
  Calendar,
  ChevronRight,
  ClockArrowDown,
  Check,
  Video,
  FileCheck,
  FilePlus,
  RefreshCcw,
  MessageSquare,
} from "lucide-react";
import GaugeComponent from "react-gauge-component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

function MetricCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <Card className="flex-1 p-0">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            {label} {subtitle && `| (${subtitle})`}
          </p>
          <p className=" font-bold text-2xl">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PartnersCard() {
  return (
    <Card className="flex-1 gap-0 p-4">
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
          <MessageSquare size={14} />
          Partners
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-5 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://i.pravatar.cc/300"></AvatarImage>
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Sarah Lane</p>
            <p className="text-xs text-[#A1A1A1]">Venture Partner</p>
          </div>
        </div>
        <Button
          variant="outline"
          className=" justify-between text-sm bg-[#0D0D0D] text-white"
        >
          Book Session
          <ChevronRight size={14} />
        </Button>
      </CardContent>
    </Card>
  );
}

function RequestStatusCard({
  status,
  count,
  description,
}: {
  status: string;
  count: number;
  description: string;
}) {
  const icon =
    status === "Active" ? (
      <RefreshCw size={14} className="text-[#A1A1A1]" />
    ) : status === "Pending" ? (
      <ClockArrowDown size={14} className="text-[#A1A1A1]" />
    ) : (
      <Check size={14} className="text-[#A1A1A1]" />
    );

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm font-medium text-[#535353]">{status}</p>
        </div>
        <p className="text-sm text-[#414651]">{count}</p>
      </div>
      <p className="text-xs text-[#A1A1A1] ml-6">{description}</p>
    </div>
  );
}

function RequestsStatusCard() {
  return (
    <Card className="flex-1 gap-0 p-4">
      <CardHeader className="p-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2 p-0">
            <FileText size={14} />
            Requests Status
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">
            Open Hub
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-0">
        <div className="flex flex-col gap-3">
          <RequestStatusCard
            status="Active"
            count={2}
            description="Current requests"
          />
          <RequestStatusCard
            status="Pending"
            count={4}
            description="Requests in process"
          />
          <RequestStatusCard
            status="Completed"
            count={26}
            description="Resolved requests"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingEventsCard() {
  return (
    <Card className="flex-1 gap-0 p-4">
      <CardHeader className="p-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
            <Calendar size={14} />
            Upcoming Events
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">
            See All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-0">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-0">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-[#A1A1A1]" />
                <p className="text-sm text-[#414651]">Annual Report</p>
              </div>
              <p className="text-xs text-[#A1A1A1] ml-6">Apr 04</p>
            </div>
            <p className="text-xs text-[##424242]">1 Day</p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-0">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-[#A1A1A1]" />
                <p className="text-sm text-[#414651]">Tax Filing</p>
              </div>
              <p className="text-xs text-[#A1A1A1] ml-6">Apr 29</p>
            </div>
            <p className="text-xs text-[##424242]">18 Days</p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-0">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-[#A1A1A1]" />
                <p className="text-sm text-[#414651]">Month Report</p>
              </div>
              <p className="text-xs text-[#A1A1A1] ml-6">May 12</p>
            </div>
            <p className="text-xs text-[#424242]">1 Month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduledConsultationsCard() {
  return (
    <Card className="flex-1 gap-0 p-4">
      <CardHeader className="p-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
            <Video size={14} />
            Scheduled Consultations
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-4 h-5">
                  <Image
                    src="/images/Google_Meet_icon.png"
                    width={24}
                    height={24}
                    alt="Consultation"
                    className="rounded-full"
                  />
                </div>
                <p className="text-sm text-[#414651]">Consultation</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-2 p-0 hover:bg-transparent text-[#424242]"
              >
                Link
                <div className="border-[#D5D7DA] border rounded-sm p-1">
                  <ExternalLink size={14} className="text-[#A1A1A1]" />
                </div>
              </Button>
            </div>
            <p className="text-xs text-[#A1A1A1] ml-6">Apr 04, 15:30</p>
          </div>
          <div className="flex flex-col gap-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-4 h-5 items-center">
                  <Image
                    src="/images/Google_Meet_icon.png"
                    width={24}
                    height={24}
                    alt="Consultation"
                    className="rounded-full"
                  />
                </div>
                <p className="text-sm text-[#414651]">Finance Consultation</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-2 p-0 hover:bg-transparent text-[#424242]"
              >
                Link
                <div className="border-[#D5D7DA] border rounded-sm p-1">
                  <ExternalLink size={14} className="text-[#A1A1A1]" />
                </div>
              </Button>
            </div>
            <p className="text-xs text-[#A1A1A1] ml-6">Apr 07, 18:00</p>
          </div>
        </div>
        <p className="text-xs text-[#A1A1A1] mt-4">
          You have no more scheduled consultations.
        </p>
      </CardContent>
    </Card>
  );
}

function PartnerScoreCard() {
  return (
    <Card className="flex-1 gap-0 p-4">
      <CardHeader className="p-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center">
            Partner Score
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="border-[#D5D7DA] border rounded-sm !p-1"
          >
            <ExternalLink size={12} className="text-[#A1A1A1]" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <GaugeChart value={87} />
      </CardContent>
    </Card>
  );
}

function RecentActivityCard() {
  return (
    <Card className="col-span-2 gap-0 p-4">
      <CardHeader className="p-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
            <Clock size={14} />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm">
            Open Hub
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 text-xs text-[#A1A1A1] font-medium">
                Request
              </th>
              <th className="py-2 px-4 text-xs text-[#A1A1A1] font-medium">
                Date
              </th>
              <th className="py-2 px-4 text-xs text-[#A1A1A1] font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 text-sm">Google Ads Review</td>
              <td className="py-3 px-4 text-xs text-[#A1A1A1]">
                Today, 2:15 pm
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <FilePlus size={14} />
                  <p className="text-sm">Created</p>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm">Hiring SDR</td>
              <td className="py-3 px-4 text-xs text-[#A1A1A1]">
                Yesterday, 4:22 pm
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src="https://i.pravatar.cc/300"></AvatarImage>
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">New Message</p>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm">Profit Optimization</td>
              <td className="py-3 px-4 text-xs text-[#A1A1A1]">
                1 April, 10:00 am
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <FileCheck size={14} />
                  <p className="text-sm">Completed</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function GaugeChart({ value }: { value: number }) {
  return (
    <div className="relative w-full">
      <div className="relative">
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.22,
            padding: 0.02,
            cornerRadius: 1,
            subArcs: [
              {
                limit: value,
                color: "#227C64",
                showTick: false,
              },
              {
                color: "#f3f4f6",
                showTick: false,
              },
            ],
          }}
          pointer={{
            width: 0,
            elastic: false,
          }}
          labels={{
            valueLabel: {
              hide: true,
            },
            tickLabels: {
              type: "outer",
              ticks: [{ value: 0 }, { value: 100 }],
              defaultTickValueConfig: {
                formatTextValue: (value) => value + "%",
                style: { fill: "#6B7280", fontSize: "12px" },
              },
            },
          }}
          value={value}
          minValue={0}
          maxValue={100}
          style={{ width: "100%", height: "150px" }}
        />

        {/* Value and Above Average text centered in the gauge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[2rem] text-gray-900 font-bold mt-4">{value}</p>
          <p className="text-gray-500 text-sm">Above Average</p>
        </div>
      </div>

      {/* Growth text below the gauge */}
      <div className="text-center">
        <p className="text-xs text-gray-500">Top 30% in revenue growth</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || "Fletcher";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="py-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-[#252525]">
              Welcome back, {firstName}!
            </h1>
            <p className="text-[18px] text-[#7B7B7B]">
              Here&apos;s your business snapshot for this week.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 items-center">
            <Button
              variant="default"
              className="bg-[#0D0D0D] hover:bg-black/90 text-white"
            >
              <Link href="/requests/new">+ New Support Request</Link>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <UsersRound size={16} />
              Manage Team
            </Button>
            <span className="text-xs text-[#A1A1A1] mr-auto flex items-center gap-2 p-2">
              <RefreshCcw size={14} />
              Updated 3 minutes ago
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Metrics Grid */}
          <div className="flex gap-2">
            <MetricCard label="Revenue (MTD)" value="$30,219" />
            <MetricCard
              label="Profit (MTD)"
              value="$6,817"
              subtitle="Expenses (MTD)"
            />
            <MetricCard
              label="Profit (YTD)"
              value="$276,013"
              subtitle="Expenses (YTD)"
            />
            <MetricCard label="Cash Balance" value="$341,154" />
          </div>

          {/* First Row of Cards */}
          <div className="grid grid-cols-4 gap-2">
            <PartnersCard />
            <RequestsStatusCard />
            <UpcomingEventsCard />
            <ScheduledConsultationsCard />
          </div>

          {/* Second Row of Cards */}
          <div className="grid grid-cols-4 gap-2">
            <PartnerScoreCard />
            <RecentActivityCard />
          </div>
        </div>
      </div>
    </div>
  );
}
