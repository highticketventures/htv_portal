'use client'

import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useCompanyStore } from '@/lib/store'
import { useUser } from '@clerk/nextjs'

export function CompanySwitcher() {
  const { user } = useUser()
  const { currentCompanyId, setCurrentCompanyId } = useCompanyStore()

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/companies?userId=${user?.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch companies')
      }
      return response.json()
    },
    enabled: !!user?.id,
  })

  if (isLoading || !companies?.length) {
    return null
  }

  return (
    <Select.Root
      value={currentCompanyId || undefined}
      onValueChange={setCurrentCompanyId}
    >
      <Select.Trigger placeholder="Select company" />
      <Select.Content>
        {companies.map((company: { id: string; name: string }) => (
          <Select.Item key={company.id} value={company.id}>
            {company.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
} 