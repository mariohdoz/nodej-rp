import connector from '../../../../common/persistence/mssql.persistence'
import { Balance } from '../../domain/balance.domain'
import { BalanceRepository } from '../../balance.repository'
import moment from 'moment'

export class BalanceMssqlRepository implements BalanceRepository {
  readonly table = 'movement'

  public async all(): Promise<Balance[]> {
    const pool = await connector
    const result = await pool.query(
      `SELECT *
      FROM ${this.table}
      ORDER BY id DESC`
    )
    return result.recordset
  }

  public async find(id: number): Promise<Balance | null> {
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

  public async findByUserId(user_id: number): Promise<Balance | null> {
    const pool = await connector
    const result = await pool.query(
      `SELECT 
        *
      FROM 
        ${this.table}
      WHERE 
        user_id = ${user_id}`
    )

    if (!result.rowsAffected) {
      return null
    }

    return result.recordset[0]
  }

  public async store(entry: Balance): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    const pool = await connector
    await pool.query(
      `INSERT INTO ${this.table}(user_id, amount, created_at) 
      VALUES(${entry.user_id}, ${entry.amount}, "${date}")`
    )
  }

  public async update(entry: Balance): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    const pool = await connector
    await pool.query(
      `UPDATE 
        ${this.table} 
      SET 
        user_id=${entry.user_id}, amount=${entry.amount}, updated_at="${date}"
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