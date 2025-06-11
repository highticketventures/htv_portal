'use client'

import { Button, Dialog, Flex, TextField, TextArea, Select } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCompanyStore } from '@/lib/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { requestSchema, type RequestFormData } from '@/lib/validations'

const categories = [
  'Bug Report',
  'Feature Request',
  'Integration',
  'Support',
  'Other',
]

export function CreateRequestButton() {
  const { currentCompanyId } = useCompanyStore()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
  })

  const mutation = useMutation({
    mutationFn: async (data: RequestFormData) => {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          companyId: currentCompanyId,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to create request')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      reset()
    },
  })

  const onSubmit = (data: RequestFormData) => {
    mutation.mutate(data)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create Request</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Create New Request</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill out the form below to create a new request.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Flex direction="column" gap="3">
            <div>
              <TextField size="3" placeholder="Title" {...register('title')} />
              {errors.title && (
                <div className="text-red-500 text-sm mt-1">{errors.title.message}</div>
              )}
            </div>

            <div>
              <Select.Root {...register('category')}>
                <Select.Trigger placeholder="Select category" />
                <Select.Content>
                  {categories.map((category) => (
                    <Select.Item key={category} value={category}>
                      {category}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              {errors.category && (
                <div className="text-red-500 text-sm mt-1">{errors.category.message}</div>
              )}
            </div>

            <div>
              <TextArea
                placeholder="Description"
                {...register('description')}
              />
              {errors.description && (
                <div className="text-red-500 text-sm mt-1">{errors.description.message}</div>
              )}
            </div>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Create Request'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
} 