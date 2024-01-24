const { query } = require('express')
const { errorHandler } = require('./utils')

const createOrUpdate = async (object, model, transaction) => {
  const query = { where: { id: object?.id || null } }
  if (transaction) query.transaction = transaction
  const result = await model.findOne(query)
  if (result) return update(object, query, model, result)
  return create(object, model, transaction)
}

const update = async (object, query, model, item) => {
  object.updatedAt = new Date()
  object.userUpdated = object.user
  try {
    delete object.user
    const updated = await model.update(object, query)
    const result = updated ? await model.findOne(query) : item
    if (result) return result.toJSON()
    return null
  } catch (error) {
    if (query?.transaction) await query.transaction.rollback()
    errorHandler(error)
  }
}

const create = async (object, model, transaction) => {
  object.createdAt = new Date()
  object.userCreated = object.user
  let query = {}
  if (transaction) query.transaction = transaction
  try {
    delete object.user
    const result = await model.create(object, query)
    if (result) return result.toJSON()
    return null
  } catch (error) {
    console.log(error)
    if (transaction) await transaction.rollback()
    errorHandler(error)
  }
}

const deleteId = async (id, user, model, transaction) => {
  const query = { where: { id } }
  if (transaction) query.transaction = transaction
  try {
    const result = await model.findOne(query)
    if (!result) return false
    return deleteCondition({ id, user }, model, transaction)
  } catch (error) {
    if (transaction) await transaction.rollback()
    throw new Error(error)
  }
}

const deleteCondition = async (condition, model, transaction) => {
  const set = {
    userDeleted: condition.user,
    deletedAt: new Date()
  }
  delete condition.user
  const query = { where: { ...condition } }
  if (transaction) query.transaction = transaction
  try {
    const deleted = await model.update(set, query)
    return !!deleted
  } catch (error) {
    if (transaction) await transaction.rollback()
    throw new Error(error)
  }
}

const findOne = async (params, model, transaction) => {
  query = { where: { params } }
  if (transaction) query.transaction = transaction
  try {
    const result = await model.findOne(query)
    if (result) return result.toJSON()
    return null
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createOrUpdate,
  deleteId,
  deleteCondition,
  findOne,
}