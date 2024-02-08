const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    idUser: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador de Usuario',
      field: 'id_user',
    },
    token: {
      type: dataTypes.TEXT,
      allowNull: false,
      xlabel: 'Token del Cliente',
      field: 'token',
    },
    client: {
      type: dataTypes.JSONB,
      allowNull: false,
      xlabel: 'Información del Cliente',
      field: 'client',
    },
    exp: {
      type: dataTypes.INTEGER,
      allowNull: false,
      xlabel: 'Tiempo de Expiracion',
      field: 'exp',
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
  return sequelize.define('auth', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'system_auth',
    indexes: [
      { unique: false, fields: ['id_user', 'token', 'estado'] }
    ]
  })
}