module.exports = ({ repositories: { menu } }) => {
  const createOrUpdate = async ({ user: { user }, body }) => {
    let sendError = false;
    try {
      body.user = user;
      body.estado = body?.estado || 'ACTIVO'
      const result = await menu.createOrUpdate(body)
      return result
    } catch (error) {
      console.log(error)
      if (sendError) throw new Error(error.message, 400)
      if (body.id) throw new Error(`No se pudo actualizar al funcionario`, 400)
      throw new Error(`No se pudo crear al funcionario`, 400)
    }
  }

  const findAll = async ({ query }) => {
    try {
      const response = await menu.findAll(query)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const findGroup = async ({ params: { type } }) => {
    try {
      const response = await menu.findGroup(type)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const deleteById = async ({ params, user: { user } }) => {
    try {
      const response = await menu.deleteById(params, user)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }
  
  return {
    createOrUpdate,
    findAll,
    findGroup,
    deleteById,
  }
}