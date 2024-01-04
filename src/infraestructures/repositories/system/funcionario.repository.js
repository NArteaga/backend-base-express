const { createOrUpdate, deleteCondition, deleteId, findOne } = require('../../libs/repository.js');
module.exports = ({ estructures, sequilize }) => {
  const { funcionario, unidad, rol } = estructures

  const findByCodigoLdap = async (codigo, transaction) => {
    const query = {
      attributes: [
        'id',
        'codigoLdap',
        'nombres',
        'primerApellido',
        'segundoApellido',
        'usuario',
        'correo',
        'idUnidad',
        'idRol',
        'estado',
      ],
      include: [
        {
          attributes: [
            'nombre'
          ],
          model: unidad,
          as: 'unidad',
          where: {
            estado: 'ACTIVO'
          }
        },
        {
          attributes: [
            'nombre'
          ],
          model: rol,
          as: 'rol',
          where: {
            estado: 'ACTIVO'
          }
        }
      ],
      where: {
        codigoLdap: codigo
      }
    }
    if (transaction) query.transaction = transaction
    const result = await funcionario.findOne(query)
    if (result) return result.toJSON()
    return null
  }
  return {
    findByCodigoLdap,
    createOrUpdate: (item, transaction) => createOrUpdate(item, funcionario, transaction)
  }
}
