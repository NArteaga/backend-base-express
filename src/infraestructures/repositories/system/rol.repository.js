const { toJSON, getQuery } = require('../../libs/utils');
const { createOrUpdate, deleteId } = require('../../libs/repository.js');
const { Op } = require('sequelize');

module.exports = ({ sequelize, estructures }) => {
  const { rol, menu } = estructures
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
            accion: { [Op.contains]: method },
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

  const findAll = async (condition, transaction) => {
    const query = getQuery()
    if (transaction) query.transaction = transaction
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'estado',
      'createdAt'
    ]
    query.include = [
      {
        required: false,
        attributes: [
          'id',
          'nombre',
          'ruta',
          'tipo',
          'icon',
        ],
        through: {
          attributes: ['id', 'accion'],
          where: { estado: 'ACTIVO' }
        },
        model: menu,
        as:'menus',
        where: { tipo: ['MENU', 'VISTA', 'API'], estado: 'ACTIVO' }
      }
    ]
    query.where = {}
    if (condition?.nombre) query.where.nombre = { [Op.iLike]: `%${condition.nombre}%` }
    if (condition?.estado) query.where.estado = condition.estado
    const result = await rol.findAndCountAll(query)
    if (result) return toJSON(result)
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
    const result = await rol.findAll(query)
    if (result) return toJSON(result)
    return null
  }

  return {
    findMiddleware,
    findPermision,
    findList,
    findAll,
    createOrUpdate: (item, transaction) => createOrUpdate(item, rol, transaction),
    deleteId: (id, user, transaction) => deleteId(id, user, rol, transaction)
  }
}