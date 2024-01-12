const { toJSON, getQuery } = require('../../libs/utils');
const { createOrUpdate, deleteCondition, deleteId, findOne } = require('../../libs/repository.js');
module.exports = ({ estructures, sequilize }) => {
  const { adjuntoDetalleBitacora } = estructures
  return {
    createOrUpdate: (item, transaction) => createOrUpdate(item, adjuntoDetalleBitacora, transaction),
    deleteCondition: (params, transaction) => deleteCondition(params, adjuntoDetalleBitacora, transaction)
  }
}