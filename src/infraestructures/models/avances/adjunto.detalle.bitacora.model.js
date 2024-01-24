const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    idDetalleBitacora: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador del detalle Bitacora',
      field: 'id_detalle_bitacora',
    },
    idAdjunto: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador del adjunto',
      field: 'id_adjunto',
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
  return sequelize.define('adjunto-detalle-bitacora', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'avances-adjunto-detalle-bitacora'
  })
}