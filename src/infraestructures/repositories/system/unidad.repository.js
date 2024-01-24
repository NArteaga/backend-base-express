const { createOrUpdate, deleteId } = require('../../libs/repository.js');
const { toJSON } = require('../../libs/utils');

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
  const findList = async () => {
    const query = {
      attributes: [
        'id',
        'nombre',
        'descripcion',
        'estado',
      ],
      where: { estado: 'ACTIVO' }
    }
    const result = await unidad.findAll(query)
    if (result) return toJSON(result)
    return null
  }

  return {
    findByNombre,
    findList,
    createOrUpdate: (item, transaction) => createOrUpdate(item, unidad, transaction),
    deleteId: (id, user, transaction) => deleteId(id, user, unidad, transaction)
  }
}