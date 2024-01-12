const { toJSON, getQuery } = require('../../libs/utils');
const { createOrUpdate, deleteCondition, deleteId, findOne } = require('../../libs/repository.js');
const { Op } = require('sequelize')
module.exports = ({ estructures }) => {
  const { bitacora, adjunto } = estructures

  const findAll = async (params, transaction) => {
    const query = getQuery(params)
    if (transaction) query.transaction = transaction
    query.attributes = [
      'id',
      'nombre',
      'palabraClave',
      'descripcion',
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
        as: 'adjunto',
        where: { estado: 'ACTIVO' }
      }
    ]
    query.where = {}
    if (params.nombre)
      query.where.nombre = { [Op.iLike]: `%${params.nombre}%` }
    if (params.palabraClave)
      query.where.palabraClave = { [Op.contains]: params.palabraClave }
    if (params.estado)
      query.where.estado = params.estado
    const result = await bitacora.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }
  return {
    findAll,
    createOrUpdate: (item, transaction) => createOrUpdate(item, bitacora, transaction)
  }
}
