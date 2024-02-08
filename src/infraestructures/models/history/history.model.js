const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    idField: {
      type: dataTypes.UUID,
      xlabel: 'identificador de la fila',
      field: 'id_field',
    },
    table: {
      type: dataTypes.STRING(250),
      xlabel: 'nombre de la tabla',
      field: 'table',
    },
    data: {
      type: dataTypes.JSONB,
      xlabel: 'datos del registro',
      field: 'data',
    },
    ...fieldsAuditory
  }
  return sequelize.define('history', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'history',
  })
}