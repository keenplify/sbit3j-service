import { Zodios, makeApi } from '@zodios/fetch'
import { CustomerAPI } from 'App/Core/Zodios/Queries/Paymongo/V1/Customer'

import { PaymentIntentAPI } from 'App/Core/Zodios/Queries/Paymongo/V1/PaymentIntent'
import { WebhookAPI } from 'App/Core/Zodios/Queries/Paymongo/V1/Webhook'

export const allPaymongoAPI = makeApi([...PaymentIntentAPI, ...CustomerAPI, ...WebhookAPI])

export const paymongo = new Zodios('https://api.paymongo.com', allPaymongoAPI)
