"use client";

import { useUser } from "@clerk/nextjs";
import {
  UsersRound,
  ExternalLink,
  FileText,
  Calendar,
  ChevronRight,
  Check,
  Video,
  FileCheck,
  FilePlus,
  RefreshCcw,
  Info,
  FileChartColumn,
  Trophy,
} from "lucide-react";
import GaugeComponent from "react-gauge-component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

function MetricCard({
  isActive,
  label,
  value,
  subtitle,
}: {
  isActive?: boolean;
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <Card
      className={`flex-1 p-0 rounded-lg ${
        isActive ? "bg-white" : "text-gray-600 bg-gray-100/60"
      }`}
    >
      <CardContent className="p-4">
        <div className={`flex flex-col gap-4 `}>
          <p className={`text-sm flex items-center gap-1 `}>
            {label} {subtitle && <span className="text-gray-400 px-1">|</span>}
            {subtitle && <span className="text-gray-400">{subtitle}</span>}
            {isActive && <Info size={14} />}
          </p>
          <p
            className={`text-2xl font-bold ${isActive ? "" : "text-gray-600"}`}
          >
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function PartnersCard() {
  return (
    <Card className="flex-1 gap-0 rounded-lg p-4">
      <CardHeader className="pb-4 px-0">
        <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 11.25L5.19356 13.5853C4.87184 13.911 4.71098 14.0739 4.57271 14.0854C4.45276 14.0953 4.33531 14.0471 4.25697 13.9557C4.16667 13.8504 4.16667 13.6215 4.16667 13.1637V11.9937C4.16667 11.583 3.83031 11.2858 3.4239 11.2262V11.2262C2.44031 11.0822 1.66783 10.3097 1.52376 9.3261C1.5 9.16391 1.5 8.97039 1.5 8.58333V5.1C1.5 3.83988 1.5 3.20982 1.74524 2.72852C1.96095 2.30516 2.30516 1.96095 2.72852 1.74524C3.20982 1.5 3.83988 1.5 5.1 1.5H10.65C11.9101 1.5 12.5402 1.5 13.0215 1.74524C13.4448 1.96095 13.789 2.30516 14.0048 2.72852C14.25 3.20982 14.25 3.83988 14.25 5.1V8.25M14.25 16.5L12.6177 15.3652C12.3882 15.2056 12.2735 15.1259 12.1487 15.0693C12.0378 15.0191 11.9213 14.9826 11.8017 14.9606C11.6669 14.9357 11.5271 14.9357 11.2477 14.9357H9.9C9.05992 14.9357 8.63988 14.9357 8.31901 14.7722C8.03677 14.6284 7.8073 14.3989 7.66349 14.1167C7.5 13.7958 7.5 13.3758 7.5 12.5357V10.65C7.5 9.80992 7.5 9.38988 7.66349 9.06901C7.8073 8.78677 8.03677 8.5573 8.31901 8.41349C8.63988 8.25 9.05992 8.25 9.9 8.25H14.1C14.9401 8.25 15.3601 8.25 15.681 8.41349C15.9632 8.5573 16.1927 8.78677 16.3365 9.06901C16.5 9.38988 16.5 9.80992 16.5 10.65V12.6857C16.5 13.3846 16.5 13.7341 16.3858 14.0097C16.2336 14.3773 15.9416 14.6693 15.574 14.8215C15.2984 14.9357 14.9489 14.9357 14.25 14.9357V16.5Z"
              stroke="#424242"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Partners
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-5 flex flex-col items-center border-t border-gray-300 gap-4">
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
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.28253 10.7123L1.03989 14.9549M7.77079 3.98139L6.60013 5.15206C6.50463 5.24755 6.45689 5.2953 6.40249 5.33324C6.3542 5.36691 6.30212 5.39478 6.24732 5.41628C6.18558 5.4405 6.11936 5.45374 5.98694 5.48022L3.23859 6.02989C2.52436 6.17274 2.16725 6.24416 2.00018 6.43245C1.85463 6.59649 1.78816 6.816 1.81828 7.03322C1.85285 7.28256 2.11037 7.54008 2.6254 8.05512L7.93971 13.3694C8.45474 13.8845 8.71226 14.142 8.9616 14.1765C9.17882 14.2067 9.39834 14.1402 9.56237 13.9946C9.75066 13.8276 9.82208 13.4705 9.96493 12.7562L10.5146 10.0079C10.5411 9.87546 10.5543 9.80925 10.5785 9.74751C10.6 9.6927 10.6279 9.64062 10.6616 9.59234C10.6995 9.53794 10.7473 9.49019 10.8428 9.3947L12.0134 8.22403C12.0745 8.16298 12.105 8.13245 12.1386 8.1058C12.1684 8.08212 12.1999 8.06075 12.233 8.04186C12.2702 8.0206 12.3099 8.0036 12.3893 7.96959L14.26 7.16783C14.8058 6.93392 15.0787 6.81697 15.2026 6.62799C15.311 6.46272 15.3498 6.26134 15.3106 6.06764C15.2657 5.84613 15.0557 5.6362 14.6359 5.21633L10.7785 1.35897C10.3586 0.939104 10.1487 0.729169 9.92719 0.684266C9.73348 0.644998 9.53211 0.683779 9.36684 0.792179C9.17785 0.916136 9.0609 1.18902 8.827 1.7348L8.02524 3.60557C7.99123 3.68493 7.97422 3.72461 7.95296 3.76182C7.93408 3.79487 7.9127 3.82644 7.88903 3.85625C7.86237 3.88981 7.83185 3.92034 7.77079 3.98139Z"
          stroke="#A1A1A1"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : status === "Pending" ? (
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.025 7.625L14.5254 9.125L13.025 7.625M14.7088 8.75C14.736 8.50375 14.75 8.25351 14.75 8C14.75 4.27208 11.7279 1.25 8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.27208 14.75 8 14.75C10.1205 14.75 12.0125 13.7722 13.25 12.243M8 4.25V8L10.25 9.5"
          stroke="#A1A1A1"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <Check size={16} className="text-[#A1A1A1]" />
    );

  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <div className="flex items-center">{icon}</div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-0 justify-between">
          <p className="text-sm font-medium text-[#535353]">{status}</p>
          <p className="text-sm text-[#414651]">{count}</p>
        </div>
        <p className="text-xs text-[#A1A1A1]">{description}</p>
      </div>
    </div>
  );
}

function RequestsStatusCard() {
  return (
    <Card className="flex-1 gap-0 rounded-lg p-4">
      <CardHeader className="pb-4 px-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
            <FileText size={16} />
            Requests Status
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-5 border-gray-300 text-gray-400 border rounded-md"
          >
            Open Hub
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-0 border-t border-gray-300">
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
    <Card className="flex-1 gap-0 rounded-lg p-4">
      <CardHeader className="pb-4 px-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
            <Calendar size={16} />
            Upcoming Events
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-5 border-gray-300 text-gray-400 border rounded-md"
          >
            See All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-0 border-t border-gray-300">
        <div className="flex flex-col gap-4">
          <UpcomingEvent title="Annual Report" date="Apr 04" days="1 Day" />
          <UpcomingEvent title="Tax Filing" date="Apr 29" days="18 Days" />
          <UpcomingEvent title="Month Report" date="May 12" days="1 Month" />
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingEvent({
  title,
  date,
  days,
}: {
  title: string;
  date: string;
  days: string;
}) {
  const icon =
    title === "Annual Report" ? (
      <FileText size={16} className="text-[#A1A1A1]" />
    ) : title === "Tax Filing" ? (
      <FileChartColumn size={16} className="text-[#A1A1A1]" />
    ) : (
      <FileText size={16} className="text-[#A1A1A1]" />
    );
  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <div className="flex items-center">{icon}</div>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-0 justify-between">
          <p className="text-sm font-medium text-[#535353]">{title}</p>
          <p className="text-sm text-[#414651]">{date}</p>
        </div>
        <p className="text-xs text-[#A1A1A1]">{days}</p>
      </div>
    </div>
  );
}

function ScheduledConsultationsCard() {
  return (
    <Card className="flex-1 gap-0 rounded-lg p-4">
      <CardHeader className="pb-4 px-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
            <Video size={16} />
            Scheduled Consultations
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-5 border-gray-300 text-gray-400 border rounded-md"
          >
            See All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-0 border-t border-gray-300">
        <div className="flex flex-col gap-4">
          <ScheduledConsultation
            title="Consultation"
            date="Apr 04, 15:30"
            link="#"
          />
          <ScheduledConsultation
            title="Finance Consultation"
            date="Apr 07, 18:00"
            link="#"
          />
        </div>
        <p className="text-xs text-[#A1A1A1] mt-4">
          You have no more scheduled consultations.
        </p>
      </CardContent>
    </Card>
  );
}

function ScheduledConsultation({
  title,
  date,
  link,
}: {
  title: string;
  date: string;
  link: string;
}) {
  return (
    <div className="flex justify-between w-full">
      <div className="flex w-full gap-2">
        <div className="flex items-center">
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2279_2719)">
              <path
                d="M10.1829 8L11.9376 10.0313L14.2971 11.5583L14.7086 8.0125L14.2971 4.54584L11.8923 5.8875L10.1829 8Z"
                fill="#00832D"
              />
              <path
                d="M0 11.2292V14.25C0 14.9406 0.552343 15.5 1.23429 15.5H4.21714L4.83429 13.2167L4.21714 11.2292L2.17029 10.6042L0 11.2292Z"
                fill="#0066DA"
              />
              <path
                d="M4.21714 0.5L0 4.77083L2.17029 5.39583L4.21714 4.77083L4.824 2.81042L4.21714 0.5Z"
                fill="#E94235"
              />
              <path
                d="M4.21714 4.77084H0V11.2292H4.21714V4.77084Z"
                fill="#2684FC"
              />
              <path
                d="M16.992 2.30832L14.2972 4.54582V11.5583L17.0044 13.8062C17.4096 14.1271 18.0021 13.8344 18.0021 13.3125V2.79166C18.0021 2.26353 17.3962 1.97395 16.992 2.30832ZM10.1829 7.99999V11.2292H4.21716V15.5H13.0629C13.7448 15.5 14.2972 14.9406 14.2972 14.25V11.5583L10.1829 7.99999Z"
                fill="#00AC47"
              />
              <path
                d="M13.0629 0.5H4.21716V4.77083H10.1829V8L14.2972 4.54792V1.75C14.2972 1.05937 13.7448 0.5 13.0629 0.5Z"
                fill="#FFBA00"
              />
            </g>
            <defs>
              <clipPath id="clip0_2279_2719">
                <rect
                  width="18"
                  height="15"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col gap-0">
          <p className="text-sm text-[#414651]">{title}</p>
          <p className="text-xs text-[#A1A1A1]">{date}</p>
        </div>
      </div>
      <Link
        href={link}
        className="text-xs flex items-center gap-2 p-0 hover:bg-transparent text-[#424242]"
      >
        Link
        <div className="border-[#D5D7DA] border rounded-sm p-1">
          <ExternalLink size={14} className="text-[#A1A1A1]" />
        </div>
      </Link>
    </div>
  );
}

function PartnerScoreCard() {
  return (
    <Card className="flex-1 gap-0 rounded-lg p-4">
      <CardHeader className="pb-4 px-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
            <Trophy size={16} />
            Partner Score
          </CardTitle>
          <Link
            href="#"
            className="text-xs flex items-center gap-2 p-0 hover:bg-transparent text-[#424242]"
          >
            <div className="border-[#D5D7DA] border rounded-sm p-1">
              <ExternalLink size={14} className="text-[#A1A1A1]" />
            </div>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="border-t border-gray-300">
        <GaugeChart value={87} />
      </CardContent>
    </Card>
  );
}

function RecentActivityCard() {
  return (
    <Card className="col-span-2 gap-0 rounded-lg p-4">
      <CardHeader className="pb-4 px-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#424242] flex items-center gap-2">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.025 7.625L14.5254 9.125L13.025 7.625M14.7088 8.75C14.736 8.50375 14.75 8.25351 14.75 8C14.75 4.27208 11.7279 1.25 8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.27208 14.75 8 14.75C10.1205 14.75 12.0125 13.7722 13.25 12.243M8 4.25V8L10.25 9.5"
                stroke="#424242"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Recent Activity
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-5 border-gray-300 text-gray-400 border rounded-md"
          >
            Open Hub
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border-t border-gray-300 p-0">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="py-2 text-sm text-[#A1A1A1] font-medium">
                Request
              </th>
              <th className="py-2 text-sm text-[#A1A1A1] font-medium">
                Date
              </th>
              <th className="py-2 text-sm text-[#A1A1A1] font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-3 text-sm">Google Ads Review</td>
              <td className="py-3 text-sm">
                Today, <span className="text-sm text-gray-400">2:15 pm</span>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <FilePlus size={16} />
                  <p className="text-sm">Created</p>
                </div>
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-3 text-sm">Hiring SDR</td>
              <td className="py-3 text-sm">
                Yesterday, <span className="text-sm text-gray-400">4:22 pm</span>
              </td>
              <td className="py-3">
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
              <td className="py-3 text-sm">Profit Optimization</td>
              <td className="py-3 text-sm">
                1 April, <span className="text-sm text-gray-400">10:00 am</span>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <FileCheck size={16} />
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
              hideMinMax: true,
            },
          }}
          value={value}
          minValue={0}
          maxValue={100}
          style={{ width: "100%", height: "150px" }}
        />

        {/* Value and Above Average text centered in the gauge */}
        <div className="absolute top-4 inset-0 flex flex-col items-center justify-center">
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
              <Button variant="outline" className="text-gray-500">
                <RefreshCcw size={14} />
              </Button>
              Updated 3 minutes ago
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Metrics Grid */}
          <div className="flex gap-2">
            <MetricCard label="Revenue (MTD)" value="$30,219" isActive />
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
