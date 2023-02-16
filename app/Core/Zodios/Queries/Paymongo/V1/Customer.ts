import { makeApi } from '@zodios/core'
import { ZodiosDefaultBasicAuthBase64Parameter } from 'App/Core/Zodios/Defaults/Parameters/BasicAuthBase64'
import { CustomerAttributesSchema } from 'App/Core/Zodios/Models/Paymongo/Customer'
import { CustomerDevices } from 'App/Enums/CustomerDevices'
import { z } from 'zod'

export const CustomerAPI = makeApi([
  {
    method: 'delete',
    path: '/v1/customers/:id',
    alias: 'deleteCustomer',
    parameters: [ZodiosDefaultBasicAuthBase64Parameter],
    response: z.any(),
  },
  {
    method: 'get',
    path: '/v1/customers',
    alias: 'retrieveCustomer',
    parameters: [
      ZodiosDefaultBasicAuthBase64Parameter,
      {
        name: 'email',
        type: 'Query',
        schema: z.string().email(),
      },
      {
        name: 'phone_number',
        type: 'Query',
        schema: z.string(),
      },
    ],
    response: z.any(),
  },
  {
    method: 'post',
    path: '/v1/customers',
    alias: 'createCustomer',
    parameters: [
      ZodiosDefaultBasicAuthBase64Parameter,
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          data: z.object({
            attributes: z.object({
              first_name: z.string(),
              last_name: z.string(),
              phone: z.string(),
              email: z.string().email(),
              default_device: z.enum(CustomerDevices),
            }),
          }),
        }),
      },
    ],
    response: z.object({
      data: z.object({
        id: z.string(),
        type: z.enum(['customer']),
        attributes: CustomerAttributesSchema,
      }),
    }),
  },
])
