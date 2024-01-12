
const { createOrUpdate } = require('../../libs/repository.js');
module.exports = ({ estructures }) => {
  const { historyBitacora } = estructures

  return {
    createOrUpdate: (item, transaction) => createOrUpdate(item, historyBitacora, transaction)
  }
}
