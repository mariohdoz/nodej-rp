import connector from '../../../../common/persistence/mysql.persistence'
import { Balance } from '../../domain/balance.domain'
import { BalanceRepository } from '../../balance.repository'
import moment from 'moment'

export class BalanceMysqlRepository implements BalanceRepository {
  readonly table = 'movement'

  public async all(): Promise<Balance[]> {
    const [rows] = await connector.execute(
      `SELECT *
      FROM ${this.table}
      ORDER BY id DESC`
    )
    return rows as Balance[]
  }

  public async find(id: number): Promise<Balance | null> {
    const [row]: any[] = await connector.execute(
      `SELECT *
      FROM ${this.table}
      WHERE id = ${id}`
    )

    if (!row) {
      return null
    }
    return row[0]
  }

  public async findByUserId(user_id: number): Promise<Balance | null> {
    const [row]: any[] = await connector.execute(
      `SELECT 
        *
      FROM 
        ${this.table}
      WHERE 
        user_id = ${user_id}`
    )

    if (!row) {
      return null
    }

    return row[0]
  }

  public async store(entry: Balance): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    connector.execute(
      `INSERT INTO ${this.table}(user_id, amount, created_at) 
      VALUES(${entry.user_id}, ${entry.amount}, "${date}")`
    )
  }

  public async update(entry: Balance): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    connector.execute(
      `UPDATE 
        ${this.table} 
      SET 
        user_id=${entry.user_id}, amount=${entry.amount}, updated_at="${date}"
      WHERE 
        id = ${entry.id}`
    )
  }

  public async delete(id: number): Promise<void> {
    connector.execute(
      `DELETE FROM ${this.table} WHERE id = ${id}`
    )
  }
}