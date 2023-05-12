import { PaymongoMetadataSchema } from 'App/Core/Zodios/Models/Paymongo/Metadata'
import { Currencies } from 'App/Enums/Currencies'
import { PaymentStatuses } from 'App/Enums/PaymentStatus'
import { z } from 'zod'

export const PaymongoPaymentAttributesSchema = z.object({
  access_url: z.string().nullable(),
  amount: z.number(),
  balance_transaction_id: z.string(),
  currency: z.enum(Currencies),
  payment_intent_id: z.string(),
  fee: z.number(),
  status: z.enum(PaymentStatuses),
  metadata: PaymongoMetadataSchema.optional(),
})

export type PaymongoPaymentAttributes = z.infer<typeof PaymongoPaymentAttributesSchema>
