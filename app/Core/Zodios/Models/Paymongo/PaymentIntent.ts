import { PaymongoMetadataSchema } from 'App/Core/Zodios/Models/Paymongo/Metadata'
import { CaptureTypes } from 'App/Enums/CaptureTypes'
import { Currencies } from 'App/Enums/Currencies'
import { PaymentIntentStatuses } from 'App/Enums/PaymentIntentStatus'
import { PaymentMethods } from 'App/Enums/PaymentMethods'
import { z } from 'zod'

export const PaymentIntentAttributesSchema = z.object({
  amount: z.number(),
  capture_type: z.enum(CaptureTypes),
  client_key: z.string(),
  currency: z.enum(Currencies),
  description: z.string().nullable(),
  livemode: z.boolean(),
  statement_descriptor: z.string(),
  status: z.enum(PaymentIntentStatuses),
  last_payment_error: z.any().nullable(),
  payment_method_allowed: z.array(z.enum(PaymentMethods)),
  payments: z.array(z.any()),
  next_action: z
    .object({
      type: z.enum(['url', 'redirect']),
      redirect: z
        .object({
          url: z.string(),
          return_url: z.string(),
        })
        .optional(),
    })
    .nullable(),
  payment_method_options: z
    .object({
      card: z
        .object({
          request_three_d_secure: z.string(),
        })
        .optional(),
    })
    .nullable(),
  metadata: PaymongoMetadataSchema.optional(),
  setup_future_usage: z.any().nullable(),
  created_at: z.number(),
  updated_at: z.number(),
})

export type PaymentIntentAttributes = z.infer<typeof PaymentIntentAttributesSchema>
