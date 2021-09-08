import { Balance } from './domain/balance.domain'

export interface BalanceRepository {
  all(): Promise<Balance[]>
  find(id: number): Promise<Balance | null>
  findByUserId(user_id: number): Promise<Balance | null>
  store(entry: Balance): Promise<void>
  update(entry: Balance): Promise<void>
  delete(id: number): Promise<void>
}