const { toJSON, getQuery } = require('../../libs/utils');
const { createOrUpdate } = require('../../libs/repository.js');
module.exports = ({ estructures, sequilize }) => {
  const { detalleBitacora, funcionario, adjunto } = estructures

  const findAllByIdBitacora = async (idBitacora, transaction) => {
    const query = {}
    if (transaction) query.transaction = transaction
    query.attributes = [
      'id',
      'aporte',
      'descripcion',
      'estado',
      'createdAt',
      'updatedAt',
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
      },
      {
        required: false,
        attributes: [
          'id',
          'nombre',
          'path',
          'tipo',
          'mime'
        ],
        model: adjunto,
        as: 'imagen',
        where: { estado: 'ACTIVO' }
      },
      {
        required: false,
        attributes: [
          'id',
          'nombre',
          'path',
          'tipo',
          'mime'
        ],
        through: {
          attributes: [],
          where: {
            estado: 'ACTIVO'
          }
        },
        model: adjunto,
        as:'adjuntos',
        where: { estado: 'ACTIVO' }
      }
    ]
    query.order = [['_created_at', 'DESC']]
    query.where = { estado: 'ACTIVO', idBitacora }
    const result = await detalleBitacora.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }

  const findById = async (id, transaction) => {
    const query = {}
    if (transaction) query.transaction = transaction
    query.attributes = [
      'id',
      'aporte',
      'descripcion',
      'estado',
      'createdAt',
      'updatedAt',
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
      },
      {
        required: false,
        attributes: [
          'id',
          'nombre',
          'path',
          'tipo',
          'mime'
        ],
        model: adjunto,
        as: 'imagen',
        where: { estado: 'ACTIVO' }
      },
      {
        required: false,
        attributes: [
          'id',
          'nombre',
          'path',
          'tipo',
          'mime'
        ],
        through: {
          attributes: [],
          where: {
            estado: 'ACTIVO'
          }
        },
        model: adjunto,
        as:'adjuntos',
        where: { estado: 'ACTIVO' }
      }
    ]
    query.order = [['_created_at', 'DESC']]
    query.where = { estado: 'ACTIVO', id }
    const result = await detalleBitacora.findOne(query)
    if (result) return result.toJSON()
    return null
  }

  return {
    findById,
    findAllByIdBitacora,
    createOrUpdate: (item, transaction) => createOrUpdate(item, detalleBitacora, transaction)
  }
}