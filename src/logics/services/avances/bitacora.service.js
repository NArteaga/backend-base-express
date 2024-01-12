module.exports = ({ repositories, libs: { file, notify }, transaction: { create, commit, rollback } }) => {
  const { bitacora, historyBitacora, adjunto } = repositories;

  const createOrUpdate = async ({ user, body }) => {
    let transaction
    try {
      transaction = await create()
      body.user = user.user;
      const content = { ...body }
      const response = await bitacora.createOrUpdate(body, transaction)
      if (response?.id) {
        delete content.id
        await historyBitacora.createOrUpdate({
          idBitacora: response.id,
          ...content
        }, transaction)
      }
      await commit(transaction)
      notify.send('notify', `Se ${ body.id ? 'adiciono' : 'actualizo' } una nueva bitacora`, { ...response, type: 'Bitacora' })
      return response
    } catch (error) {
      console.log(error)
      await rollback(transaction)
      if (body.id) throw new Error(`No se pudo actualizar el proyecto`, 400)
      throw new Error(`No se pudo crear el proyecto`, 400)
    }
  }

  const findAll = async (params) => {
    try {
      const response = await bitacora.findAll(params)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const createImage = async ({
    file: { data, mimetype, name },
    user: { user }
  }) => {
    try {
      const { filename, ext } = file.write('bitacora', data, mimetype, user)
      const url = `${process.env.BACKEND_URL}/public/bitacora/${filename}`
      const { id } = await adjunto.createOrUpdate({ nombre: name, path: url, mime: mimetype, tipo: ext, estado: 'ACTIVO', user })
      return { id, url }
    } catch (error) {
      throw new Error(`No se creo el adjunto`, 400)
    }
  }

  return {
    createImage,
    createOrUpdate,
    findAll
  }
}