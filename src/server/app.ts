import express from 'express'
import { loadControllers } from 'awilix-express'
import loadcontainer from './container'

const app: express.Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// load containers
loadcontainer(app)

// Set the controllers
app.use(loadControllers(
  ' controllers/*.ts',
  { cwd: __dirname + '/../' }
))


export { app }
