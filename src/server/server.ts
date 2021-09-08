import { app } from './app'
import config from './config'
const APP_PORT = config.APP_PORT

app.listen(APP_PORT, () => {
  console.log(`App running on PORT ${APP_PORT} ${process.env.NODE_ENV}`)
})