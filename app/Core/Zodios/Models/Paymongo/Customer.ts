import { CustomerDevices } from 'App/Enums/CustomerDevices'
import { z } from 'zod'

export const CustomerAttributesSchema = z.object({
  default_device: z.enum(CustomerDevices),
  default_payment_method_id: z.string().nullable(),
  livemode: z.boolean(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
})

export type CustomerAttributes = z.infer<typeof CustomerAttributesSchema>
