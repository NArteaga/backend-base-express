const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Nombre del rol',
      field: 'nombre',
    },
    descripcion: {
      type: dataTypes.STRING,
      xlabel: 'Descripción del rol',
      field: 'descripcion',
    },
    estado: {
      type: dataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      allowNull: false,
      xlabel: 'Estado del registro',
      field: 'estado',
    },
    ...fieldsAuditory
  }
  return sequelize.define('rol', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'system_rol'
  })
}