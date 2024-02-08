const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'nombre',
      field: 'nombre',
    },
    idDocument: {
      type: dataTypes.UUID,
      xlabel: 'identificador del documento subido',
      field: 'id_documento',
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

  return sequelize.define('administracion', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'general_administracion',
    indexes: [
      { unique: false, fields: ['nombre', 'estado'] }
    ]
  })
}