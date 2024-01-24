const { toJSON } = require('../../libs/utils.js');
const { createOrUpdate, deleteId } = require('../../libs/repository.js');
module.exports = ({ estructures }) => {
  const { administracion, adjunto } = estructures

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
    query.order = [['createdAt', 'DESC']]
    query.where = {}
    const result = await administracion.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }

  return {
    findAll,
    createOrUpdate: (item, transaction) => createOrUpdate(item, administracion, transaction),
    deleteId: (id, user, transaction) => deleteId(id, user, administracion, transaction),
  }
}
