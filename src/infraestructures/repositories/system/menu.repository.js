const { toJSON } = require('../../libs/utils');

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
    ]
    query.include = [
      {
        attributes: [
          'nombre',
          'ruta',
          'icon',
          'tipo',
        ],
        model: menu,
        as: 'childrens',
        where: { tipo: 'MENU', estado: 'ACTIVO' },
        order: [['order', 'DESC']],
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
    const result = await menu.findAll(query)
    if (result) return toJSON(result)
    return null
  }

  return {
    findMenu,
  }
}
