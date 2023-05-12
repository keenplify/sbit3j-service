import { makeApi } from '@zodios/core'
import { ZodiosDefaultBasicAuthBase64Parameter } from 'App/Core/Zodios/Defaults/Parameters/BasicAuthBase64'
import { PaymongoWebhookEvents } from 'App/Enums/PaymongoWebhookEvents'
import { z } from 'zod'

export const WebhookAPI = makeApi([
  {
    method: 'post',
    path: '/v1/webhooks',
    alias: 'createWebhook',
    parameters: [
      ZodiosDefaultBasicAuthBase64Parameter,
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          data: z.object({
            attributes: z.object({
              url: z.string().url(),
              events: z.array(z.enum(PaymongoWebhookEvents)),
            }),
          }),
        }),
      },
    ],
    response: z.any(),
  },
])
