export const PaymongoWebhookEvents = [
  'source.chargeable',
  'payment.paid',
  'payment.failed',
  'payment.refunded',
  'payment.refund.updated',
  'link.payment.paid',
] as const

export type PaymongoWebhookEvent = (typeof PaymongoWebhookEvents)[number]
