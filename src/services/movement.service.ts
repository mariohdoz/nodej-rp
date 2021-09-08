import { BalanceRepository } from './repositories/balance.repository'
import { MovementRepository } from './repositories/movement.repository'
import { MovementCreateDto } from '../dtos/movement.dto'
import { Movement } from './repositories/domain/movement.domain'
import { Balance } from './repositories/domain/balance.domain'
import { ApplicationException } from '../common/exceptions/application.exceptions'
import { MovementType } from '../common/enums/movements.types'

export class MovementService {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly balanceRepository: BalanceRepository
  ) { }

  public async all(): Promise<Movement[]> {
    return await this.movementRepository.all()
  }

  public async find(id: number): Promise<Movement | null> {
    return await this.movementRepository.find(id)
  }

  public async store(entry: MovementCreateDto): Promise<void> {
    const { user_id, type } = entry
    const balance = await this.balanceRepository.findByUserId(user_id)

    if (MovementType.income === type) {
      await this.income(entry, balance)
    } else if (MovementType.outcome === type) {
      await this.outcome(entry, balance)
    } else {
      throw new ApplicationException('Incorrect type of movement supplied ')
    }

  }

  private async income(entry: MovementCreateDto, balance: Balance | null) {
    const { user_id, amount } = entry

    if (!balance) {
      await this.balanceRepository.store({ user_id, amount } as Balance)
    } else {
      balance.amount += amount
      await this.balanceRepository.update(balance)
    }

    await this.movementRepository.store(entry as Movement)
  }

  private async outcome(entry: MovementCreateDto, balance: Balance | null) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('User does not have enough balance')
    } else {
      balance.amount -= entry.amount
      await this.balanceRepository.update(balance)
    }

    await this.movementRepository.store(entry as Movement)
  }

}