const { toJSON, getQuery } = require('../../libs/utils');
const { createOrUpdate, deleteId } = require('../../libs/repository.js');
const { Op } = require('sequelize');

module.exports = ({ estructures }) => {
  const { rol, menu } = estructures
  // const operation = sequelize.Op

  const findMenu = async (idRol, transaction) => {
    const query = {}
    if (transaction) query.transaction = transaction
    query.attributes = [
      'nombre',
      'ruta',
      'icon',
      'tipo',
      'orden'
    ]
    query.include = [
      {
        attributes: [
          'nombre',
          'ruta',
          'icon',
          'tipo',
          'orden'
        ],
        model: menu,
        as: 'childrens',
        where: { tipo: 'MENU', estado: 'ACTIVO' },
        include: [
          {
            attributes: [
              'nombre',
            ],
            through: {
              attributes: [],
              where: { estado: 'ACTIVO' }
            },
            model: rol,
            as: 'roles',
            where: { id: idRol, estado: 'ACTIVO' }
          }
        ]
      },
    ]
    query.where = { estado: 'ACTIVO' }
    query.order = [['orden', 'ASC'], ['childrens', 'orden', 'ASC']]
    const result = await menu.findAll(query)
    if (result) return toJSON(result)
    return null
  }

  const findGroup = async (type, transaction) => {
    const query = {}
    
    query.attributes = [
      'id',
      'nombre',
      'ruta',
      'icon',
      'orden',
      'tipo',
      'estado',
    ]

    query.where = { estado: 'ACTIVO', tipo: type }

    if (transaction) query.transaction = transaction
    const result = await menu.findAll(query)
    if (result) return toJSON(result)
    return null
  }

  const findAll = async (condition, transaction) => {
    const query = getQuery(condition)
    query.where = {}
    query.attributes = [
      'id',
      'nombre',
      'idAgrupador',
      'ruta',
      'icon',
      'orden',
      'tipo',
      'estado',
    ]

    query.include = [
      {
        required: false,
        attributes: [
          'id',
          'nombre',
          'idAgrupador',
          'ruta',
          'icon',
          'orden',
          'tipo',
          'estado',
        ],
        model: menu,
        as: 'father'
      },
    ]

    if (condition?.nombre) query.where.nombre = { [Op.iLike]: `%${condition.nombre}%` }
    if (condition?.ruta) query.where.ruta = { [Op.iLike]: `%${condition.ruta}%` }
    if (condition?.tipo) query.where.tipo = condition.tipo
    if (condition?.idAgrupador) query.where.idAgrupador = condition.idAgrupador
    if (condition?.estado) query.where.estado = condition.estado

    if (transaction) query.transaction = transaction
    const result = await menu.findAndCountAll(query)
    if (result) return toJSON(result)
    return null
  }

  return {
    findAll,
    findMenu,
    findGroup,
    createOrUpdate: (item, transaction) => createOrUpdate(item, menu, transaction),
    deleteId: (id, user, transaction) => deleteId(id, user, menu, transaction)
  }
}
