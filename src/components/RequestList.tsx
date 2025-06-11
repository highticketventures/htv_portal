'use client'

import { Table, Badge } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useCompanyStore } from '@/lib/store'
import { formatDistanceToNow } from 'date-fns'

type Request = {
  id: string
  title: string
  category: string
  status: string
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

export function RequestList() {
  const { currentCompanyId } = useCompanyStore()

  const { data: requests, isLoading } = useQuery<Request[]>({
    queryKey: ['requests', currentCompanyId],
    queryFn: async () => {
      const response = await fetch(`/api/requests?companyId=${currentCompanyId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch requests')
      }
      return response.json()
    },
    enabled: !!currentCompanyId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!requests?.length) {
    return <div>No requests found</div>
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Requester</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {requests.map((request) => (
          <Table.Row key={request.id}>
            <Table.Cell>{request.title}</Table.Cell>
            <Table.Cell>{request.category}</Table.Cell>
            <Table.Cell>
              <Badge
                color={
                  request.status === 'Completed'
                    ? 'green'
                    : request.status === 'In Progress'
                    ? 'orange'
                    : 'blue'
                }
              >
                {request.status}
              </Badge>
            </Table.Cell>
            <Table.Cell>{request.user.name || request.user.email}</Table.Cell>
            <Table.Cell>
              {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
} 