const { createOrUpdate } = require('../../libs/repository.js');
module.exports = ({ estructures }) => {
  const { adjunto } = estructures
  // const operation = sequelize.Op

  return {
    createOrUpdate: (item, transaction) => createOrUpdate(item, adjunto, transaction)
  }
}
