import { z } from 'zod'

export const PaymongoMetadataSchema = z.object({
  clientId: z.string().optional(),
  subscriptionId: z.string().optional(),
  subscriptionProductId: z.string().optional(),
})

export type PaymongoMetadata = z.infer<typeof PaymongoMetadataSchema>
