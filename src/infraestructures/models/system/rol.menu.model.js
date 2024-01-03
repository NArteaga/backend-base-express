const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    idRol: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador del rol',
      field: 'id_rol',
    },
    idMenu: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador del menu',
      field: 'id_menu',
    },
    accion: {
      type: dataTypes.JSONB,
      allowNull: false,
      xlabel: 'Acciones correspondientes que se pueden realizar',
      field:'metodo',
    },
    ...fieldsAuditory
  }
  return sequelize.define('rolMenu', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'system_rol_menu'
  })
}