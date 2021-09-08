import connector from '../../../../common/persistence/mssql.persistence'
import { Subscription } from '../../domain/subscription.domain'
import { SubscriptionRepository } from '../../subscription.repository'
import moment from 'moment'

export class SubscriptionMssqlRepository implements SubscriptionRepository {

  readonly table = 'wallet_subscription'

  public async all(): Promise<Subscription[]> {
    const pool = await connector
    const result = await pool.query(
      `SELECT *
      FROM ${this.table}
      ORDER BY id DESC`
    )
    return result.recordset
  }

  public async find(id: number): Promise<Subscription | null> {

    const pool = await connector
    const result = await pool.query(
      `SELECT *
      FROM ${this.table}
      WHERE id = ${id}`
    )

    if (!result.rowsAffected) {
      return null
    }
    return result.recordset[0]
  }

  public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
    const pool = await connector
    const result = await pool.query(
      `SELECT 
        *
      FROM 
        ${this.table}
      WHERE 
        user_id = ${user_id}
        AND code = ${code}`
    )

    if (!result.rowsAffected) {
      return null
    }

    return result.recordset[0]
  }

  public async store(entry: Subscription): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    const pool = await connector
    await pool.query(
      `INSERT INTO ${this.table}(user_id, code, amount, cron, created_at) 
      VALUES(${entry.user_id}, ${entry.code}, ${entry.amount}, ${entry.cron}, "${date}")`
    )
  }

  public async update(entry: Subscription): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    const pool = await connector
    await pool.query(
      `UPDATE 
        ${this.table} 
      SET 
        user_id=${entry.user_id}, code=${entry.code}, amount=${entry.amount}, cron=${entry.cron}, updated_at="${date}"
      WHERE 
        id = ${entry.id}`
    )
  }

  public async delete(id: number): Promise<void> {
    const pool = await connector
    await pool.query(
      `DELETE FROM ${this.table} WHERE id = ${id}`
    )
  }
}