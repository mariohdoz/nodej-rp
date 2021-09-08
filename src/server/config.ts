import config = require('dotenv')

config.config()

if (!process.env.APP_PORT){
  throw new Error('APP_PORT MUST BE DEFINED')
}

if (!process.env.NODE_ENV){
  throw new Error('NODE_ENV MUST BE DEFINED')
}

if (!process.env.DB_MYSQL_HOST) {
  throw new Error('DB_MYSQL_HOST MUST BE DEFINED')
}

if (!process.env.DB_MYSQL_USER) {
  throw new Error('DB_MYSQL_USER MUST BE DEFINED')
}

if (!process.env.DB_MYSQL_PASSWORD) {
  throw new Error('DB_MYSQL_PASSWORD MUST BE DEFINED')
}

if (!process.env.DB_MYSQL_DATABASE) {
  throw new Error('DB_MYSQL_DATABASE MUST BE DEFINED')
}

if (!process.env.DB_MYSQL_PORT) {
  throw new Error('DB_MYSQL_PORT MUST BE DEFINED')
}

if (!process.env.DB_MSSQL_HOST) {
  throw new Error('DB_MSSQL_HOST MUST BE DEFINED')
}

if (!process.env.DB_MSSQL_USER) {
  throw new Error('DB_MSSQL_USER MUST BE DEFINED')
}

if (!process.env.DB_MSSQL_PASSWORD) {
  throw new Error('DB_MSSQL_PASSWORD MUST BE DEFINED')
}

if (!process.env.DB_MSSQL_DATABASE) {
  throw new Error('DB_MSSQL_DATABASE MUST BE DEFINED')
}

if (!process.env.DB_MSSQL_PORT) {
  throw new Error('DB_MSSQL_PORT MUST BE DEFINED')
}

const APP_PORT: string = process.env.APP_PORT
const NODE_ENV: string = process.env.NODE_ENV
const DB_MYSQL_HOST: string = process.env.DB_MYSQL_HOST
const DB_MYSQL_USER: string = process.env.DB_MYSQL_USER
const DB_MYSQL_PASSWORD: string = process.env.DB_MYSQL_PASSWORD
const DB_MYSQL_DATABASE: string = process.env.DB_MYSQL_DATABASE
const DB_MYSQL_PORT: string = process.env.DB_MYSQL_PORT
const DB_MSSQL_HOST: string = process.env.DB_MSSQL_HOST
const DB_MSSQL_USER: string = process.env.DB_MSSQL_USER
const DB_MSSQL_PASSWORD: string = process.env.DB_MSSQL_PASSWORD
const DB_MSSQL_DATABASE: string = process.env.DB_MSSQL_DATABASE
const DB_MSSQL_PORT: string = process.env.DB_MSSQL_PORT

export default {
  APP_PORT,
  NODE_ENV,
  DB_MYSQL_HOST,
  DB_MYSQL_DATABASE,
  DB_MYSQL_PASSWORD,
  DB_MYSQL_USER,
  DB_MYSQL_PORT,
  DB_MSSQL_HOST,
  DB_MSSQL_DATABASE,
  DB_MSSQL_PASSWORD,
  DB_MSSQL_USER,
  DB_MSSQL_PORT
}