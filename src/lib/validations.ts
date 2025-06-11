import { z } from 'zod'

export const requestSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required').max(1000),
  category: z.string().min(1, 'Category is required'),
})

export type RequestFormData = z.infer<typeof requestSchema>

export const messageSchema = z.object({
  content: z.string().min(1, 'Message is required').max(1000),
})

export type MessageFormData = z.infer<typeof messageSchema> 