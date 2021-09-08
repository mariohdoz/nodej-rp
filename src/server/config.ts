import config = require('dotenv')

config.config()

if (!process.env.APP_PORT){
  throw new Error('APP_PORT MUST BE DEFINED')
}

if (!process.env.NODE_ENV){
  throw new Error('NODE_ENV MUST BE DEFINED')
}

if (!process.env.DB_HOST) {
  throw new Error('DB_HOST MUST BE DEFINED')
}

if (!process.env.DB_USER) {
  throw new Error('DB_USER MUST BE DEFINED')
}

if (!process.env.DB_PASSWORD) {
  throw new Error('DB_PASSWORD MUST BE DEFINED')
}

if (!process.env.DB_DATABASE) {
  throw new Error('DB_DATABASE MUST BE DEFINED')
}

if (!process.env.DB_PORT) {
  throw new Error('DB_PORT MUST BE DEFINED')
}

const APP_PORT: string = process.env.APP_PORT
const NODE_ENV: string = process.env.NODE_ENV
const DB_HOST: string = process.env.DB_HOST
const DB_USER: string = process.env.DB_USER
const DB_PASSWORD: string = process.env.DB_PASSWORD
const DB_DATABASE: string = process.env.DB_DATABASE
const DB_PORT: string = process.env.DB_PORT

export default {
  APP_PORT,
  NODE_ENV,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_USER,
  DB_PORT
}