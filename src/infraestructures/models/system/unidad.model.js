const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    idUnidad: {
      type: dataTypes.UUID,
      xlabel: 'Identificador de la unidad',
      field: 'id_unidad',
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Nombre del unidad',
      field: 'nombre',
    },
    descripcion: {
      type: dataTypes.STRING,
      xlabel: 'Descripción del unidad',
      field: 'descripcion',
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
  return sequelize.define('unidad', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'system_unidad'
  })
}