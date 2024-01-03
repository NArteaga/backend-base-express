module.exports = ({ sequelize, estructures }) => {
  const { rol, menu } = estructures
  const operation = sequelize.Op
  const findMiddleware = (idRol, method) => {
    const query = {}
    query.attributes = [
      'nombre',
      'descripcion',
      'estado',
    ]
    query.includes = [
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
    query.where = { idRol, estado: 'ACTIVO' }
    const result = rol.findOne(query)
    if (result) return result.toJSON()
    return null
  }

  const findPermision = (idRol) => {
    const query = {}
    query.attributes = [
      'nombre',
      'descripcion',
    ]
    query.includes = [
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
    query.where = { idRol, estado: 'ACTIVO' }
    const result = rol.findAll(query)
    if (result) return toJSON(result)
    return null
  }


  return {
    findMiddleware,
    findPermision,
  }
}