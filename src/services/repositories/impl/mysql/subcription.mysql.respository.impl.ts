import connector from '../../../../common/persistence/mysql.persistence'
import { Subscription } from '../../domain/subscription.domain'
import { SubscriptionRepository } from '../../subscription.repository'
import moment from 'moment'

export class SubscriptionMysqlRepository implements SubscriptionRepository {

  readonly table = 'wallet_subscription'

  public async all(): Promise<Subscription[]> {
    const [rows] = await connector.execute(
      `SELECT *
      FROM ${this.table}
      ORDER BY id DESC`
    )
    return rows as Subscription[]
  }

  public async find(id: number): Promise<Subscription | null> {

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

  public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
    const [row]: any[] = await connector.execute(
      `SELECT 
        *
      FROM 
        ${this.table}
      WHERE 
        user_id = ${user_id}
        AND code = ${code}`
    )

    if (!row) {
      return null
    }

    return row[0]
  }

  public async store(entry: Subscription): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    connector.execute(
      `INSERT INTO ${this.table}(user_id, code, amount, cron, created_at) 
      VALUES(${entry.user_id}, ${entry.code}, ${entry.amount}, ${entry.cron}, "${date}")`
    )
  }

  public async update(entry: Subscription): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    connector.execute(
      `UPDATE 
        ${this.table} 
      SET 
        user_id=${entry.user_id}, code=${entry.code}, amount=${entry.amount}, cron=${entry.cron}, updated_at="${date}"
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