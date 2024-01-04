const { config } = require('dotenv')

config()

const db = {
  database: process.env.DB_PG_DATABASE,
  username: process.env.DB_PG_USER,
  password: process.env.DB_PG_PASSWORD,
  host: process.env.DB_PG_HOST,
  port: process.env.DB_PG_PORT,
  dialect: 'postgres',
  timezone: 'America/La_Paz',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
}

module.exports = db