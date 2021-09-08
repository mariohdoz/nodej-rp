interface SubscriptionCreateDto {
  code: string
  user_id: number
  amount: number
  cron: string
}

interface SubscriptionUpdate {
  code: string
  amount: number
  cron: string
}

export {
  SubscriptionUpdate,
  SubscriptionCreateDto
}