import { Subscription } from './repositories/domain/subscription.domain'
import { SubscriptionRepository } from './repositories/subscription.repository'
import { SubscriptionCreateDto, SubscriptionUpdate } from '../dtos/subscription.dto'
import { ApplicationException } from '../common/exceptions/application.exceptions'

export class SubscriptionService {

  constructor(private readonly subscriptionRepository: SubscriptionRepository) { }

  public async find(id: number): Promise<Subscription | null> {
    return await this.subscriptionRepository.find(id)
  }

  public async all(): Promise<Subscription[]> {
    return await this.subscriptionRepository.all()
  }

  public async store(entry: SubscriptionCreateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code)

    if (!originalEntry) {
      await this.subscriptionRepository.store(entry as Subscription)
    } else {
      throw new ApplicationException('Subscription already exist')
    }
  }

  public async update(id: number, entry: SubscriptionUpdate): Promise<void> {

    const originalEntry = await this.subscriptionRepository.find(id)

    if (!originalEntry) {
      throw new ApplicationException('Subscription not found')
    }

    originalEntry.code = entry.code
    originalEntry.amount = entry.amount
    originalEntry.cron = entry.cron

    await this.subscriptionRepository.update(originalEntry)

  }

  public async delete(id: number): Promise<void> {
    return await this.subscriptionRepository.delete(id)
  }

}