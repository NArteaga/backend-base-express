const { toJSON, getQuery } = require('../../libs/utils');

module.exports = ({ estructures, sequilize }) => {
  const { detalleProyecto, funcionario } = estructures

  const findAllByIdProyecto = async (idProyecto, transaction) => {
    const query = {}
    if (transaction) query.transaction = transaction
    query.attributes = [
      'id',
      'aporte',
      'descripcion',
      'adjunto',
      'estado',
    ]
    query.include = [
      {
        model: funcionario,
        as: 'funcionario',
        attributes: [
          'id',
          'nombres',
          'primerApellido',
          'segundoApellido',
        ]
      }
    ]
    query.order = [['_created_at', 'DESC']]
    query.where = { estado: 'ACTIVO', idProyecto }
    const result = await detalleProyecto.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }
  return {
    findAllByIdProyecto,
    createOrUpdate: (item, transaction) => createOrUpdate(item, detalleProyecto, transaction)
  }
}