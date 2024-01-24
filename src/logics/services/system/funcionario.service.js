module.exports = ({ repositories, transaction: { create, commit, rollback } }) => {
  const { funcionario } = repositories;
  const createOrUpdate = async ({ user: { user }, body }) => {
    let sendError = false;
    try {
      body.user = user;
      if (!body.id) {
        const usuario = await funcionario.findByCodigoLdap(body.usuario)
        if (usuario) { 
          sendError = true
          throw new Error('Ya existe un usuario con las mismas caracteristicas', 400)
        }
      }
      const result = await funcionario.createOrUpdate(body)
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
      const response = await funcionario.findAll(query)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const deleteById = async ({ params, user: { user } }) => {
    try {
      const response = await funcionario.deleteById(params, user)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  return {
    createOrUpdate,
    findAll,
    deleteById,
  }
}