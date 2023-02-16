import { Zodios, makeApi } from '@zodios/fetch'
import { CustomerAPI } from 'App/Core/Zodios/Queries/Paymongo/V1/Customer'

import { PaymentIntentAPI } from 'App/Core/Zodios/Queries/Paymongo/V1/PaymentIntent'

export const allPaymongoAPI = makeApi([...PaymentIntentAPI, ...CustomerAPI])

export const paymongo = new Zodios('https://api.paymongo.com', allPaymongoAPI)
