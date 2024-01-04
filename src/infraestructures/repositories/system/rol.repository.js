const { toJSON } = require('../../libs/utils');

module.exports = ({ sequelize, estructures }) => {
  const { rol, menu } = estructures
  const operation = sequelize.Op
  const findMiddleware = async (idRol, method, transaction) => {
    const query = {}
    if (transaction) query.transaction = transaction
    query.attributes = [
      'nombre',
      'descripcion',
      'estado',
    ]
    query.include = [
      {
        attributes: [
          'ruta',
        ],
        through: {
          attributes: [],
          where: { 
            accion: { [operation.contains]: method },
            estado: 'ACTIVO'
          }
        },
        model: menu,
        as:'menus',
        where: { tipo: 'API', estado: 'ACTIVO' }
      }
    ]
    query.where = { id: idRol, estado: 'ACTIVO' }
    const result = await rol.findOne(query)
    if (result) return result.toJSON()
    return null
  }

  const findPermision = async (idRol, transaction) => {
    const query = {}
    if (transaction) query.transaction = transaction
    query.attributes = [
      'nombre',
      'descripcion',
    ]
    query.include = [
      {
        attributes: [
          'ruta',
        ],
        through: {
          attributes: ['accion'],
          where: { estado: 'ACTIVO' }
        },
        model: menu,
        as:'menus',
        where: { tipo: ['MENU', 'VISTA'], estado: 'ACTIVO' }
      }
    ]
    query.where = { id: idRol, estado: 'ACTIVO' }
    const result = await rol.findOne(query)
    if (result) return result.toJSON()
    return null
  }


  return {
    findMiddleware,
    findPermision,
  }
}