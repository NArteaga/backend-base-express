const sequelize = require('sequelize')
const dayjs = require('dayjs')

module.exports = {
  pk: {
    primaryKey: true,
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    xlabel: 'Identificador del registro',
    field: 'id',
  },
  fieldsAuditory: {
    userCreated: {
      type: sequelize.UUID,
      allowNull: false,
      xlabel: 'Usuario que creó el registro',
      field: '_user_created',
    },
    userUpdated: {
      type: sequelize.UUID,
      xlabel: 'Usuario que actualizó el registro',
      field: '_user_updated',
    },
    userDeleted: {
      type: sequelize.UUID,
      xlabel: 'Usuario que eliminó el registro',
      field: '_user_deleted',
    },
    createdAt: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW,
      allowNull: false,
      xlabel: 'Fecha de creación del registro',
      field: '_created_at',
      get: function () {
        if (this.getDataValue('createdAt'))
          return dayjs(this.getDataValue('createdAt')).format('DD-MM-YYYY HH:mm:ss')
        return null
      }
    },
    updatedAt: {
      type: sequelize.DATE,
      defaultValue: sequelize.NOW,
      xlabel: 'Fecha de actualización del registro',
      field: '_updated_at',
      get: function () {
        if (this.getDataValue('updatedAt'))
          return dayjs(this.getDataValue('updatedAt')).format('DD-MM-YYYY HH:mm:ss')
        return null
      }
    },
    deletedAt: {
      type: sequelize.DATE,
      defaultValue: null,
      xlabel: 'Fecha de eliminación del registro',
      field: '_deleted_at',
      get: function () {
        if (this.getDataValue('deletedAt'))
          return dayjs(this.getDataValue('deletedAt')).format('DD-MM-YYYY HH:mm:ss')
        return null
      }
    }
  }
}