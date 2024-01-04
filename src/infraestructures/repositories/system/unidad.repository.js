const { createOrUpdate, deleteCondition, deleteId, findOne } = require('../../libs/repository.js');
module.exports = ({ estructures, sequilize }) => {
  const { unidad } = estructures

  const findByNombre = async (nombre, transaction) => {
    const query = {
      attributes: [
        'id',
        'nombre',
        'estado',
      ],
      where: {
        nombre: nombre,
        estado: 'ACTIVO'
      }
    }
    if (transaction) query.transaction = transaction
    const result = await unidad.findOne(query)
    if (result) return result.toJSON()
    return null
  }
  return {
    findByNombre,
    createOrUpdate: (item, transaction) => createOrUpdate(item, unidad, transaction)
  }
}