module.exports = ({ repositories }) => {
  const { proyecto } = repositories;

  const createOrUpdate = async ({user, data}) => {
    try {
      body.user = user.user;
      const response = await proyecto.createOrUpdate(data)
      return response
    } catch (error) {
      if (body.id) throw new Error(`No se pudo actualizar el proyecto`, 400)
      throw new Error(`No se pudo crear el proyecto`, 400)
    }
  }

  const findAll = async (params) => {
    try {
      const response = await proyecto.findAll(params)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  return {
    createOrUpdate,
    findAll
  }
}