import { z } from 'zod'

export const ZodiosDefaultBasicAuthBase64Parameter = {
  name: 'Authorization',
  type: 'Header' as const,
  schema: z.string().transform((str) => `Basic ${Buffer.from(str).toString('base64')}`),
}
