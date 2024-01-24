const { createOrUpdate, deleteId, deleteCondition } = require('../../libs/repository.js');

module.exports = ({ estructures }) => {
  const { rolMenu } = estructures

  const getRegister = async (idRol, idMenu, transaction) => {
    const query = {}
    query.attributes = ['id']
    query.where = { idRol, idMenu }
    query.paranoid = false
    if (transaction) query.transaction = transaction
    const result = await rolMenu.findOne(query)
    if (result) return result.toJSON()
    return null
  }

  const restore = async (id, transaction) => {
    const query = {}
    query.where = { id }
    if (transaction) query.transaction = transaction
    await rolMenu.restore(query)
    return true
  }

  return {
    getRegister,
    restore,
    createOrUpdate: (item, transaction) => createOrUpdate(item, rolMenu, transaction),
    deleteId: (id, user, transaction) => deleteId(id, user, rolMenu, transaction),
    deleteCondition: (condition, transaction) => deleteCondition(condition, rolMenu, transaction),
  }
}