const { pk, fieldsAuditory } = require('../../libs/fields.js')

module.exports = ({ sequelize, dataTypes }) => {
  const fields = {
    id: pk,
    codigoLdap: {
      type: dataTypes.INTEGER,
      allowNull: false,
      xlabel: 'Codigo funcionario en el LDAP',
      field: 'codigo_ldap',
    },
    nombres: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Nombres del funcionario',
      field: 'nombre_completo',
    },
    primerApellido: {
      type: dataTypes.STRING,
      xlabel: 'Primer apellido del funcionario',
      field: 'primer_apellido',
    },
    segundoApellido: {
      type: dataTypes.STRING,
      xlabel: 'Segundo apellido del funcionario',
      field:'segundo_apellido',
    },
    usuario: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Usuario del funcionario en el LDAP',
      field: 'usuario',
    },
    correo: {
      type: dataTypes.STRING,
      allowNull: false,
      xlabel: 'Correo institucional del funcionario',
      field: 'correo',
    },
    idUnidad: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Departamento del funcionario',
      field: 'id_departamento',
    },
    idRol: {
      type: dataTypes.UUID,
      allowNull: false,
      xlabel: 'Rol del funcionario',
      field: 'id_rol',
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
  return sequelize.define('funcionario', fields, {
    paranoid: true,
    timestamps: true,
    tableName: 'system_funcionario'
  })
}