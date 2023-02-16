export const PaymentMethods = [
  'atome',
  'card',
  'dob',
  'paymaya',
  'billease',
  'gcash',
  'grab_pay',
] as const

export type PaymentMethod = (typeof PaymentMethods)[number]
