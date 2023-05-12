export const PaymentIntentStatuses = [
  'awaiting_payment_method',
  'processing',
  'succeeded',
  'awaiting_next_action',
] as const

export type PaymentIntentStatus = (typeof PaymentIntentStatuses)[number]
