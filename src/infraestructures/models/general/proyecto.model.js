const { pk, fieldsAuditory } = require('../../libs/fields')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'nombre del proyecto',
      field: 'nombre',
    },
    palabraClave: {
      type: dataTypes.JSONB,
      xlabel: 'paralabras claves del proyecto',
      field: 'palabra_clave',
    },
    descripcion: {
      type: dataTypes.TEXT,
      allowNull: false,
      xlabel: 'descripcion del proyecto',
      field: 'descripcion',
    },
    ruta: {
      type: dataTypes.JSONB,
      xlabel: 'Ruta de la imagen',
      field: 'ruta',
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
  return sequelize.define('proyecto', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'general-proyecto',
  })
}