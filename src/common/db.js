const debug = require('debug')('app:db')
const sequelize = require('sequelize')
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
    acquire: 30000,
    idle: 10000,
  },
  logging: s => console.log(s)
}

module.exports = {
  sequelize: new sequelize(db),
  dataTypes: sequelize.DataTypes,
  transaction: (sequelize) => {
    create = () =>
      new Promise((resolve, reject) => {
        return sequelize.transaction().then(transaction => resolve(transaction))
      }),
    commit = (transaction) => {
      if (transaction && !['commit', 'rollback'].includes(transaction.finished))
        transaction.commit()
    },
    rollback = (transaction) => {
      if (transaction && !['commit', 'rollback'].includes(transaction.finished))
        transaction.rollback()
    }

    return {
      create, commit, rollback
    }
  }
}