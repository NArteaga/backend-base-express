const { createOrUpdate } = require('../../libs/repository.js');
module.exports = ({ estructures }) => {
  const { auth } = estructures
  // const operation = sequelize.Op
  const getToken = async (token) => {
    const query = {
      attributes: [
        'id',
        'idUser',
        'token',
        'client',
        'exp',
        'estado'
      ],
      where: { token }
    }
    const result = await auth.findOne(query)
    if (result) return result.toJSON()
    return null
  }

  return {
    getToken,
    createOrUpdate: (item, transaction) => createOrUpdate(item, auth, transaction)
  }
}
