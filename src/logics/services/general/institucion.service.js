module.exports = ({ repositories: { institucion, adjunto }, libs: { file } }) => {

  const createOrUpdate = async ({ user, body }) => {
    try {
      body.user = user.user;
      body.estado = body?.estado || 'ACTIVO'
      const response = await institucion.createOrUpdate(body)
      return response
    } catch (error) {
      console.log(error)
      if (body.id) throw new Error(`No se pudo actualizar el proyecto`, 400)
      throw new Error(`No se pudo crear el proyecto`, 400)
    }
  }

  const findAll = async () => {
    try {
      const response = await institucion.findAll()
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const deleteById = async ({ params, user: { user } }) => {
    try {
      const response = await institucion.deleteById(params, user)
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
      const { filename, ext } = file.write('institucion', data, mimetype, user)
      const url = `${process.env.BACKEND_URL}/public/institucion/${filename}`
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