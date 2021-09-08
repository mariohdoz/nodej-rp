import { ConnectionPool } from 'mssql'
import config from '../../server/config'

const connectionConfig = {
  server: config.DB_MSSQL_HOST,
  database: config.DB_MSSQL_DATABASE,
  user: config.DB_MSSQL_USER,
  password: config.DB_MSSQL_PASSWORD,
  options: {
    enableArithAbort: true
  }
}

export default new ConnectionPool(connectionConfig).connect()