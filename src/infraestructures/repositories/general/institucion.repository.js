const { toJSON } = require('../../libs/utils.js');
const { createOrUpdate, deleteId } = require('../../libs/repository.js');

module.exports = ({ estructures }) => {
  const { institucion, adjunto } = estructures

  const findAll = async (transaction) => {
    const query = {}
    if (transaction) query.transaction = transaction
    query.attributes = [
      'id',
      'nombre',
      'estado',
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
    const result = await institucion.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }

  return {
    findAll,
    createOrUpdate: (item, transaction) => createOrUpdate(item, institucion, transaction),
    deleteId: (id, user, transaction) => deleteId(id, user, institucion, transaction),
  }
}
