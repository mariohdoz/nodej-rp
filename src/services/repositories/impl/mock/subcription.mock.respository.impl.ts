import db from '../../../../common/persistence/mock.persistence'
import { Subscription } from '../../domain/subscription.domain'
import { SubscriptionRepository } from '../../subscription.repository'

export class SubscriptionMockRepository implements SubscriptionRepository {
  public async find(id: number): Promise<Subscription | null> {
    const table = db.subscriptions as Subscription[]
    const result = table.find(x => x.id === id)

    if (result) {
      return Object.assign({ ...result })
    }

    return null
  }

  public async findByUserAndCode(userId: number, code: string): Promise<Subscription | null> {
    const table = db.subscriptions as Subscription[]
    const result = table.find(x => x.user_id === userId && x.code === code)

    if (result) {
      return Object.assign({ ...result })
    }

    return null
  }

  public async all(): Promise<Subscription[]> {
    const table = db.subscriptions as Subscription[]
    return Object.assign([...table])
  }

  public async store(entry: Subscription): Promise<void> {
    const table = db.subscriptions as Subscription[]
    const now = new Date()

    // set id value
    db._subscription_id++

    table.push({
      id: db._subscription_id,
      code: entry.code,
      amount: entry.amount,
      user_id: entry.user_id,
      cron: entry.cron,
      created_at: now,
      updated_at: null,
    } as Subscription)
  }

  public async update(entry: Subscription): Promise<void> {
    const table = db.subscriptions as Subscription[]
    const now = new Date()

    const originalEntry = table.find(x => x.id === entry.id)

    if (originalEntry) {
      originalEntry.code = entry.code
      originalEntry.user_id = entry.user_id
      originalEntry.amount = entry.amount
      originalEntry.cron = entry.cron
      originalEntry.updated_at = now
    }
  }

  public async delete(id: number): Promise<void> {
    let table = db.subscriptions as Subscription[]
    table = table.filter(x => x.id !== id)
  }
}