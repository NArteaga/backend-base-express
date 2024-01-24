const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Nombre del menu',
      field: 'nombre',
    },
    idAgrupador: {
      type: dataTypes.UUID,
      xlabel: 'Identificador agrupador del menu',
      field: 'id_agrupador',
    },
    ruta: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Ruta de redireccion del menu',
      field: 'ruta',
    },
    icon: {
      type: dataTypes.STRING,
      xlabel: 'Icono del menu',
      field: 'icon',
    },
    orden: {
      type: dataTypes.INTEGER,
      xlabel: 'Orden del menu',
      field: 'orden',
    },
    tipo: {
      type: dataTypes.ENUM,
      values: ['GRUPO_MENU', 'MENU', 'VISTA', 'API'],
      allowNull: false,
      xlabel: 'tipo de menu',
      field: 'tipo',
    },
    estado: {
      type: dataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      allowNull: false,
      defaultValue: 'ACTIVO',
      xlabel: 'Estado del registro',
      field: 'estado',
    },
    ...fieldsAuditory
  }
  return sequelize.define('menu', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'system_menu'
  })
}