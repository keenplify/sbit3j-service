import { PaymongoWebhookEvents } from 'App/Enums/PaymongoWebhookEvents'
import { z } from 'zod'

export const PaymongoEventAttributesSchema = z.object({
  type: z.enum(PaymongoWebhookEvents),
  livemode: z.boolean(),
  data: z.object({
    attributes: z.any(),
  }),
})

export const PaymongoEventSchema = z.object({
  data: z.object({
    id: z.string(),
    type: z.enum(['event']),
    attributes: PaymongoEventAttributesSchema,
  }),
})

export type PaymongoEvent = z.infer<typeof PaymongoEventSchema>
