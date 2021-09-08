const db = {
  balances: [
    {
      id: 1,
      user_id: 1,
      amount: 100
    },
    {
      id: 2,
      user_id: 2,
      amount: 100
    },
    {
      id: 3,
      user_id: 3,
      amount: 100
    }
  ],
  movements: [],
  subscriptions: [],
  _balance_id: 0,
  _movement_id: 0,
  _subscription_id: 0,
}

db._balance_id = db.balances.length

export default db