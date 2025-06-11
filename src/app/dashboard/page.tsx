'use client'

import { Container, Flex, Text, Card, Button, Avatar } from '@radix-ui/themes'
import { useUser } from '@clerk/nextjs'
import { 
  User, 
  Clock, 
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  FileText,
  Calendar,
  ChevronRight,
  RotateCw,
  ClockArrowDown,
  Check,
  Video
} from 'lucide-react'
import GaugeComponent from 'react-gauge-component'

function MetricCard({ label, value, subtitle }: { label: string; value: string; subtitle?: string }) {
  return (
    <div className="p-4 flex-1 font-medium">
      <Flex direction="column" gap="4">
        <Text size="2" color="gray" className="flex items-center gap-1 text-sm">
          {label} {subtitle && `| (${subtitle})`}
        </Text>
        <Text size="7" weight="bold">{value}</Text>
      </Flex>
    </div>
  )
}

function RequestStatusCard({ status, count, description }: { status: string; count: number; description: string }) {
  const icon = status === 'Active' ? <RefreshCw size={14} /> :
               status === 'Pending' ? <ClockArrowDown size={14}/> :
               <Check size={14}/>
               
  return (
    <Flex align="center" gap="4" className="py-2">
      {icon}
      <Text size="3" weight="medium">{status}</Text>
      <Text size="3" weight="bold">{count}</Text>
      <Text size="2" color="gray" className="text-gray-400">{description}</Text>
    </Flex>
  )
}

function GaugeChart({ value }: { value: number }) {
  return (
    <div className="relative w-full p-4">
      <div className="relative" style={{ height: '180px' }}>
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.15,
            padding: 0.02,
            cornerRadius: 1,
            subArcs: [
              {
                limit: value,
                color: '#227C64',
                showTick: false
              },
              {
                color: '#f3f4f6',
                showTick: false
              }
            ]
          }}
          pointer={{
            width: 0,
            elastic: false
          }}
          labels={{
            valueLabel: {
              hide: true
            },
            tickLabels: {
              type: 'outer',
              ticks: [
                { value: 0 },
                { value: 100 }
              ],
              defaultTickValueConfig: {
                formatTextValue: value => value + '%',
                style: { fill: '#6B7280', fontSize: '12px' }
              }
            }
          }}
          value={value}
          minValue={0}
          maxValue={100}
          style={{ width: '100%', height: '180px' }}
        />
        
        {/* Value and Above Average text centered in the gauge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ marginTop: '30px' }}>
          <Text size="8" weight="bold" className="text-[2rem] text-gray-900">{value}</Text>
          <Text className="text-gray-500 text-sm">Above Average</Text>
        </div>
      </div>

      {/* Growth text below the gauge */}
      <div className="text-center mt-1">
        <Text size="2" color="gray" className="text-xs">Top 30% in revenue growth</Text>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useUser()
  const firstName = user?.firstName

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-8 max-w-[1200px] mx-auto">
        <Flex direction="column" gap="6">
          {/* Header */}
          <Flex direction="column" gap="2">
            <Text size="8" weight="bold" className="text-gray-900">Welcome back, {firstName}!</Text>
            <Text size="4" color="gray">Here's your business snapshot for this week.</Text>
          </Flex>

          {/* Action Buttons */}
          <Flex gap="3" align="center" justify="start">
            <Button size="3" variant="solid" highContrast className="!bg-[#0D0D0D] hover:!bg-black/90">
              <Text className="text-white">+ New Support Request</Text>
            </Button>
            <Button size="3" variant="surface" className="flex items-center gap-2 !border-none">
              <User size={16} />
              <Text>Manage Team</Text>
            </Button>
            <Text size="2" color="gray" mr="auto" className="flex items-center gap-1">
              <RotateCw size={14} />
              Updated 3 minutes ago
            </Text>
          </Flex>

          {/* Metrics Grid */}
          <Flex gap="2">
            <MetricCard label="Revenue (MTD)" value="$30,219" />
            <MetricCard label="Profit (MTD)" value="$6,817" subtitle="Expenses (MTD)" />
            <MetricCard label="Profit (YTD)" value="$276,013" subtitle="Expenses (YTD)" />
            <MetricCard label="Cash Balance" value="$341,154" />
          </Flex>

          {/* Main Content Grid */}
          <Flex gap="6">
            {/* Left Column */}
            <Flex direction="column" gap="6" style={{ flex: 1 }}>
              {/* Partners Card */}
              <div className="p-4">
                <Flex direction="column" gap="4">
                  <Flex align="center" gap="2">
                    <User size={16} />
                    <Text size="4" weight="medium">Partners</Text>
                  </Flex>
                  <Flex align="center" gap="4">
                    <Avatar
                      size="4"
                      src="https://avatar.vercel.sh/sarah"
                      fallback="SL"
                      className="rounded-full"
                    />
                    <Flex direction="column">
                      <Text weight="medium">Sarah Lane</Text>
                      <Text size="2" color="gray">Venture Partner</Text>
                    </Flex>
                    <Button ml="auto" className="flex items-center gap-1 !border-none">
                      Book Session
                      <ChevronRight size={14} />
                    </Button>
                  </Flex>
                </Flex>
              </div>

              {/* Partner Score Card */}
              <div className="p-6">
                <Flex direction="column">
                  <Flex align="center" justify="between">
                    <Flex align="center" gap="2">
                      <Text size="4" weight="medium">Partner Score</Text>
                    </Flex>
                    <Button variant="ghost" size="1" className="!border-none">
                      <RotateCw size={14} />
                    </Button>
                  </Flex>
                  <GaugeChart value={87} />
                </Flex>
              </div>
            </Flex>

            {/* Middle Column */}
            <div className="p-4" style={{ flex: 1 }}>
              <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                  <Flex gap="2" align="center">
                    <FileText size={16} />
                    <Text size="4" weight="medium">Requests Status</Text>
                  </Flex>
                  <Button variant="ghost" size="1" className="!border-none">Open Hub</Button>
                </Flex>
                
                <Flex direction="column" gap="2">
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
                </Flex>
              </Flex>
            </div>

            {/* Right Column */}
            <Flex direction="column" gap="6" style={{ flex: 1 }}>
              {/* Upcoming Events */}
              <div className="p-4">
                <Flex direction="column" gap="4">
                  <Flex justify="between" align="center">
                    <Flex gap="2" align="center">
                      <Calendar size={16} />
                      <Text size="4" weight="medium">Upcoming Events</Text>
                    </Flex>
                    <Button variant="ghost" size="1" className="!border-none">See All</Button>
                  </Flex>
                  
                  <Flex direction="column" gap="3">
                    <Flex justify="between" align="center">
                      <Flex gap="2">
                        <FileText size={14} className="text-gray-400" />
                        <Text>Annual Report</Text>
                      </Flex>
                      <Text size="2" color="gray">1 Day</Text>
                    </Flex>
                    <Flex justify="between" align="center">
                      <Flex gap="2">
                        <FileText size={14} className="text-gray-400" />
                        <Text>Tax Filing</Text>
                      </Flex>
                      <Text size="2" color="gray">18 Days</Text>
                    </Flex>
                    <Flex justify="between" align="center">
                      <Flex gap="2">
                        <FileText size={14} className="text-gray-400" />
                        <Text>Month Report</Text>
                      </Flex>
                      <Text size="2" color="gray">1 Month</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </div>

              {/* Scheduled Consultations */}
              <div className="p-4">
                <Flex direction="column" gap="4">
                  <Flex justify="between" align="center">
                    <Flex gap="2" align="center">
                      <Video size={16} />
                      <Text size="4" weight="medium">Scheduled Consultations</Text>
                    </Flex>
                    <Button variant="ghost" size="1" className="!border-none">See All</Button>
                  </Flex>
                  
                  <Flex direction="column" gap="3">
                    <Flex justify="between" align="center">
                      <Flex gap="2" align="center">
                        <Avatar
                          size="1"
                          src="https://avatar.vercel.sh/consultation"
                          fallback="C"
                          className="rounded-full"
                        />
                        <Text>Consultation</Text>
                      </Flex>
                      <Text size="2" color="gray">Apr 04, 15:30</Text>
                      <Button variant="ghost" size="1" className="flex items-center gap-1 !border-none">
                        Link
                        <ExternalLink size={14} />
                      </Button>
                    </Flex>
                    <Flex justify="between" align="center">
                      <Flex gap="2" align="center">
                        <Avatar
                          size="1"
                          src="https://avatar.vercel.sh/finance"
                          fallback="F"
                          className="rounded-full"
                        />
                        <Text>Finance Consultation</Text>
                      </Flex>
                      <Text size="2" color="gray">Apr 07, 18:00</Text>
                      <Button variant="ghost" size="1" className="flex items-center gap-1 !border-none">
                        Link
                        <ExternalLink size={14} />
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </Flex>

          {/* Recent Activity */}
          <div className="p-4">
            <Flex direction="column" gap="4">
              <Flex justify="between" align="center">
                <Flex gap="2" align="center">
                  <Clock size={16} />
                  <Text size="4" weight="medium">Recent Activity</Text>
                </Flex>
                <Button variant="ghost" size="1" className="!border-none">Open Hub</Button>
              </Flex>
              
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="py-2 px-4 text-gray-500 font-medium">Request</th>
                    <th className="py-2 px-4 text-gray-500 font-medium">Date</th>
                    <th className="py-2 px-4 text-gray-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4">Google Ads Review</td>
                    <td className="py-3 px-4 text-gray-500">Today, 2:15 pm</td>
                    <td className="py-3 px-4">
                      <Flex gap="2" align="center">
                        <FileText size={14} className="text-blue-500" />
                        Created
                      </Flex>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Hiring SDR</td>
                    <td className="py-3 px-4 text-gray-500">Yesterday, 4:22 pm</td>
                    <td className="py-3 px-4">
                      <Flex gap="2" align="center">
                        <RefreshCw size={14} className="text-orange-500" />
                        New Message
                      </Flex>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Profit Optimization</td>
                    <td className="py-3 px-4 text-gray-500">1 April, 10:00 am</td>
                    <td className="py-3 px-4">
                      <Flex gap="2" align="center">
                        <CheckCircle2 size={14} className="text-green-500" />
                        Completed
                      </Flex>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Flex>
          </div>
        </Flex>
      </Container>
    </div>
  )
} 