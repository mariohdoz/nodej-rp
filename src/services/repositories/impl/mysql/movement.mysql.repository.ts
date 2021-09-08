import connector from '../../../../common/persistence/mysql.persistence'
import { Movement } from '../../domain/movement.domain'
import { MovementRepository } from '../../movement.repository'
import moment from 'moment'

export class MovementMysqlRepository implements MovementRepository {

  readonly table = 'movement'

  public async all(): Promise<Movement[]> {
    const [rows] = await connector.execute(
      `SELECT *
      FROM ${this.table}
      ORDER BY id DESC`
    )
    return rows as Movement[]
  }

  public async find(id: number): Promise<Movement | null> {
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

  public async store(entry: Movement): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    connector.execute(
      `INSERT INTO ${this.table}(user_id, type, amount, created_at) 
      VALUES(${entry.user_id}, ${entry.type}, ${entry.amount}, "${date}")`
    )
  }

  public async update(entry: Movement): Promise<void> {
    const date = (moment()).format('YYYY-MM-DD HH:mm:ss')
    connector.execute(
      `UPDATE 
        ${this.table} 
      SET 
        user_id=${entry.user_id}, type=${entry.type}, amount=${entry.amount}, updated_at="${date}"
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