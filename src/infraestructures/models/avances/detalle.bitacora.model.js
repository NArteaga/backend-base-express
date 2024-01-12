const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    idAdjunto: {
      type: dataTypes.UUID,
      xlabel: 'Identificador de la imagen',
      field: 'id_adjunto',
    },
    idFuncionario: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador del funcionario',
      field: 'id_funcionario',
    },
    idBitacora: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador del bitacora',
      field: 'id_bitacora',
    },
    aporte: {
      type: dataTypes.TEXT,
      allowNull: false,
      xlabel: 'aporte al bitacora',
      field: 'aporte',
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: false,
      xlabel: 'descripcion del detalle bitacora',
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
  return sequelize.define('detalle-bitacora', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'avances-detalle-bitacora'
  })
}