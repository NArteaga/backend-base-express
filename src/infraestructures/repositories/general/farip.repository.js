const { toJSON } = require('../../libs/utils');
const { createOrUpdate, deleteId } = require('../../libs/repository.js');
module.exports = ({ estructures }) => {
  const { farip, adjunto } = estructures

  const findAll = async (transaction) => {
    const query = {}
    if (transaction) query.transaction = transaction
    query.attributes = [
      'id',
      'nombre',
      'estado',
      'userCreated',
    ]
    query.include = [
      {
        attributes: [
          'id',
          'nombre',
          'path',
          'tipo',
          'mime'
        ],
        model: adjunto,
        as: 'documento',
        where: { estado: 'ACTIVO' }
      }
    ]
    query.where = {}
    query.order = [['createdAt', 'DESC']]
    const result = await farip.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }

  return {
    findAll,
    createOrUpdate: (item, transaction) => createOrUpdate(item, farip, transaction),
    deleteId: (id, user, transaction) => deleteId(id, user, farip, transaction),
  }
}
