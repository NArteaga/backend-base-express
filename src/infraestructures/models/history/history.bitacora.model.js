const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    idBitacora: {
      type: dataTypes.UUID,
      xlabel: 'identificador de la bitacora',
      field: 'id_bitacora',
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'nombre del bitacora',
      field: 'nombre',
    },
    palabraClave: {
      type: dataTypes.JSONB,
      xlabel: 'paralabras claves del bitacora',
      field: 'palabra_clave',
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: false,
      xlabel: 'descripcion del bitacora',
      field: 'descripcion',
    },
    idAdjunto: {
      type: dataTypes.UUID,
      xlabel: 'identificador del adjunto',
      field: 'id_adjunto',
    },
    estado: {
      type: dataTypes.ENUM,
      values: ['SEGUIMIENTO', 'CERRADO', 'CANCELADO'],
      allowNull: false,
      xlabel: 'Estado del registro',
      field: 'estado',
    },
    ...fieldsAuditory
  }
  return sequelize.define('history_bitacora', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'history_bitacora',
  })
}