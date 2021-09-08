import connector from '../../../../common/persistence/mssql.persistence'
import { Movement } from '../../domain/movement.domain'
import { MovementRepository } from '../../movement.repository'
import moment from 'moment'

export class MovementMssqlRepository implements MovementRepository {

  readonly table = 'movement'

  public async all(): Promise<Movement[]> {
    const pool = await connector
    const result = await pool.query(
      `SELECT *
      FROM ${this.table}
      ORDER BY id DESC`
    )

    return result.recordset
  }

  public async find(id: number): Promise<Movement | null> {
    const pool = await connector
    const result = await pool.query(`SELECT *
      FROM ${this.table}
      WHERE id = ${id}`)

    if (!result.output) {
      return null
    }

    return result.recordset[0]
  }

  public async store(entry: Movement): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    const pool = await connector
    await pool.query(
      `INSERT INTO ${this.table}(user_id, type, amount, created_at) 
      VALUES(${entry.user_id}, ${entry.type}, ${entry.amount}, "${date}")`
    )
  }

  public async update(entry: Movement): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    const pool = await connector
    await pool.query(
      `UPDATE 
        ${this.table} 
      SET 
        user_id=${entry.user_id}, type=${entry.type}, amount=${entry.amount}, updated_at="${date}"
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