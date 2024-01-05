const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    idFuncionario: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador del funcionario',
      field: 'id_funcionario',
    },
    idProyecto: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Identificador del proyecto',
      field: 'id_proyecto',
    },
    aporte: {
      type: dataTypes.TEXT,
      allowNull: false,
      xlabel: 'aporte al proyecto',
      field: 'aporte',
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: false,
      xlabel: 'descripcion del detalle proyecto',
      field: 'descripcion',
    },
    adjunto: {
      type: dataTypes.JSONB,
      allowNull: false,
      xlabel: 'Ruta de los adjuntos',
      field: 'adjunto',
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
  return sequelize.define('detalle-proyecto', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'general-detalle-proyecto'
  })
}