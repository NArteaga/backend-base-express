module.exports = ({ repositories: { administracion, adjunto }, libs: { file } }) => {

  const createOrUpdate = async ({ user, body }) => {
    try {
      body.user = user.user;
      body.estado = body?.estado || 'ACTIVO'
      const response = await administracion.createOrUpdate(body)
      return response
    } catch (error) {
      console.log(error)
      if (body.id) throw new Error(`No se pudo actualizar el proyecto`, 400)
      throw new Error(`No se pudo crear el proyecto`, 400)
    }
  }

  const findAll = async () => {
    try {
      const response = await administracion.findAll()
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const deleteById = async ({ params: { id }, user: { user } }) => {
    try {
      const response = await administracion.deleteId(id, user)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const createDocument = async ({
    file: { data, mimetype, name },
    user: { user }
  }) => {
    try {
      const { filename, ext } = file.write('administracion', data, mimetype, user)
      const url = `${process.env.BACKEND_URL}/public/administracion/${filename}`
      const { id } = await adjunto.createOrUpdate({ nombre: name, path: url, mime: mimetype, tipo: ext, estado: 'ACTIVO', user })
      return { id, url }
    } catch (error) {
      throw new Error(`No se creo el adjunto`, 400)
    }
  }

  return {
    createDocument,
    createOrUpdate,
    deleteById,
    findAll
  }
}