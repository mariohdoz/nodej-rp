import { createPool } from 'mysql2/promise'
import config from '../../server/config'

// export defaultcreateConnection({
//   type: 'mysql',
//   host: config.DB_HOST,
//   port: parseInt(config.APP_PORT),
//   username: config.DB_USER,
//   password: config.DB_PASSWORD,
//   database: config.DB_DATABASE,
//   entities: [Subscription]
// }).then(()=> console.log('DB ready'))
//   .catch(err => console.log(err))

export default createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  port: parseInt(config.DB_PORT),
  decimalNumbers: true
})