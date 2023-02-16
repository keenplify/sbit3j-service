import { PaymongoPaymentAttributesSchema } from 'App/Core/Zodios/Models/Paymongo/Payment'
import { PaymongoWebhookEvents } from 'App/Enums/PaymongoWebhookEvents'
import { z } from 'zod'

export const PaymongoEventSchema = z.object({
  id: z.string(),
  type: z.enum(PaymongoWebhookEvents),
  attributes: PaymongoPaymentAttributesSchema,
})

export type PaymongoEvent = z.infer<typeof PaymongoEventSchema>
