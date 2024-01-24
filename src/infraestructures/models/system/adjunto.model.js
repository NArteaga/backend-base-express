const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Nombre del adjunto',
      field: 'nombre',
    },
    path: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Url del adjunto',
      field: 'path',
    },
    mime: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Mime del adjunto',
      field: 'mime',
    },
    tipo: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Tipo del adjunto',
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
  return sequelize.define('adjunto', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'system_adjunto'
  })
}