module.exports = ({ repositories: { farip, adjunto }, libs: { file } }) => {

  const createOrUpdate = async ({ user, body }) => {
    try {
      body.user = user.user;
      body.estado = body?.estado || 'ACTIVO'
      const response = await farip.createOrUpdate(body)
      return response
    } catch (error) {
      console.log(error)
      if (body.id) throw new Error(`No se pudo actualizar el proyecto`, 400)
      throw new Error(`No se pudo crear el proyecto`, 400)
    }
  }

  const findAll = async () => {
    try {
      const response = await farip.findAll()
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const deleteById = async ({ params: { id }, user: { user } }) => {
    try {
      const response = await farip.deleteId(id, user)
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
      const { filename, ext } = file.write('farip', data, mimetype, user)
      const url = `${process.env.BACKEND_URL}/public/farip/${filename}`
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