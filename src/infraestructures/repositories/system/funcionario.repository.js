const { createOrUpdate, deleteId } = require('../../libs/repository.js');
const { getQuery, toJSON } = require('../../libs/utils.js')
const { Op } = require('sequelize')

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
        usuario: codigo
      }
    }
    if (transaction) query.transaction = transaction
    const result = await funcionario.findOne(query)
    if (result) return result.toJSON()
    return null
  }

  const findAll = async (condition, transaction) => {
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
            'id',
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
            'id',
            'nombre'
          ],
          model: rol,
          as: 'rol',
          where: {
            estado: 'ACTIVO'
          }
        }
      ],
      where: {},
      ...getQuery(condition)
    }
    const where = []
    if (condition?.nombres)
      where.push(
        {
          [Op.or]: {
            nombres: { [Op.iLike]: `%${condition.nombres}%` },
            primerApellido: { [Op.iLike]: `%${condition.nombres}%` },
            segundoApellido: { [Op.iLike]: `%${condition.nombres}%` },
          }
        }
      )

    if (condition?.usuario)
      where.push({ usuario: { [Op.iLike]: `%${condition.usuario}%` } })

    if (condition?.rol)
      query.include[1].where.id = condition.rol

    if (condition?.unidad)
      query.include[0].where.id = condition.unidad
    
    if (condition?.estado)
      where.push({ estado: condition.estado })

    query.where = { [Op.and]: where }

    if (transaction) query.transaction = transaction
    const result = await funcionario.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }

  return {
    findByCodigoLdap,
    findAll,
    createOrUpdate: (item, transaction) => createOrUpdate(item, funcionario, transaction),
    deleteById: (id, user, transaction) => deleteId(id, user, funcionario, transaction),
  }
}
