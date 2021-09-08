import { createPool } from 'mysql2/promise'
import config from '../../server/config'

export default createPool({
  host: config.DB_MYSQL_HOST,
  user: config.DB_MYSQL_USER,
  password: config.DB_MYSQL_PASSWORD,
  database: config.DB_MYSQL_DATABASE,
  port: parseInt(config.DB_MYSQL_PORT),
  decimalNumbers: true
})