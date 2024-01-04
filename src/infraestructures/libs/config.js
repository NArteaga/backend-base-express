'use strict';

const { config } = require('dotenv')

config()

const fildAuditoryRegister = (fields) => {
  return fields.map((field) => ({
    ...field,
    _user_created: process.env.ID_CREATE,
    _created_at: new Date(),
    _updated_at: new Date()
  }))
}

module.exports = {
  fildAuditoryRegister
}