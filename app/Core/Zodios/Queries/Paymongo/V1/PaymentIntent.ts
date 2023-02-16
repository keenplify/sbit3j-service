import { makeApi } from '@zodios/core'
import { ZodiosDefaultBasicAuthBase64Parameter } from 'App/Core/Zodios/Defaults/Parameters/BasicAuthBase64'
import { PaymentIntentAttributesSchema } from 'App/Core/Zodios/Models/Paymongo/PaymentIntent'
import { CaptureTypes } from 'App/Enums/CaptureTypes'
import { Currencies } from 'App/Enums/Currencies'
import { PaymentMethods } from 'App/Enums/PaymentMethods'
import { z } from 'zod'

export const PaymentIntentAPI = makeApi([
  {
    method: 'post',
    path: '/v1/payment_intents',
    alias: 'createPaymentIntent',
    parameters: [
      ZodiosDefaultBasicAuthBase64Parameter,
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          data: z.object({
            attributes: z.object({
              amount: z.number(),
              payment_method_allowed: z.array(z.enum(PaymentMethods)),
              payment_method_options: z
                .object({
                  card: z.object({
                    request_three_d_secure: z.any(),
                  }),
                })
                .optional(),
              currency: z.enum(Currencies),
              capture_type: z.enum(CaptureTypes),
              metadata: z.any().optional(),
            }),
          }),
        }),
      },
    ],
    response: z.object({
      data: z.object({
        id: z.string(),
        type: z.enum(['payment_intent']),
        attributes: PaymentIntentAttributesSchema,
      }),
    }),
  },

  {
    method: 'post',
    path: '/v1/payment_intents/:id/attach',
    alias: 'attachToPaymentIntent',
    parameters: [
      ZodiosDefaultBasicAuthBase64Parameter,
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          data: z.object({
            attributes: z.object({
              payment_method: z.string(),
              client_key: z.string(),
              return_url: z.string().url(),
            }),
          }),
        }),
      },
    ],
    response: z.object({
      data: z.object({
        id: z.string(),
        type: z.string(),
        attributes: PaymentIntentAttributesSchema,
      }),
    }),
  },
])
