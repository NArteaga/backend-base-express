const { toJSON, getQuery } = require('../../libs/utils');
const { Op } = require('sequelize')
module.exports = ({ estructures }) => {
  const { proyecto } = estructures

  const findAll = async (params, transaction) => {
    const query = getQuery(params)
    console.log(Op)
    if (transaction) query.transaction = transaction
    query.attributes = [
      'id',
      'nombre',
      'palabraClave',
      'descripcion',
      'ruta',
      'estado',
    ]
    console.log(params)
    query.where = {}
    if (params.nombre)
      query.where.nombre = { [Op.iLike]: `%${params.nombre}%` }
    if (params.palabraClave)
      query.where.palabraClave = { [Op.contains]: params.palabraClave }
    if (params.estado)
      query.where.estado = params.estado
    const result = await proyecto.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }
  return {
    findAll,
    createOrUpdate: (item, transaction) => createOrUpdate(item, proyecto, transaction)
  }
}
