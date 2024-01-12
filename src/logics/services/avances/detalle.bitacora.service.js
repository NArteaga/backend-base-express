const notify = require("../../libs/notify");

module.exports = ({ repositories, libs, transaction: { create, commit, rollback } }) => {
  const { detalleBitacora, adjunto, adjuntoDetalleBitacora } = repositories;
  const { file } = libs

  const createOrUpdate = async ({ user, body }) => {
    let transaction
    try {
      transaction = await create()
      body.user = user.user;
      body.idFuncionario = user.user
      const response = await detalleBitacora.createOrUpdate(body, transaction)
      if (body?.adjuntos)
        for (const adjunto of body.adjuntos)
          await adjuntoDetalleBitacora.createOrUpdate({ idDetalleBitacora: response.id, user: user.user, idAdjunto: adjunto.id, estado: 'ACTIVO' }, transaction)
      if (body?.removeAdjunto)
        for (const adjunto of body.removeAdjunto)
          await adjuntoDetalleBitacora.deleteCondition({ idDetalleBitacora: response.id, idAdjunto: adjunto, user: user.user }, transaction)
      const result = await detalleBitacora.findById(response.id, transaction)
      await commit(transaction)
      
      return result
    } catch (error) {
      console.log(error)
      await rollback(transaction)
      if (body.id) throw new Error(`No se pudo actualizar el proyecto`, 400)
      throw new Error(`No se pudo crear el proyecto`, 400)
    }
  }

  const findAll = async ({ idBitacora }) => {
    try {
      const response = await detalleBitacora.findAllByIdBitacora(idBitacora)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se pudo listar las bitacoras`, 400)
    }
  }

  const createImage = async ({
    file: { data, mimetype, name },
    idBitacora,
    user: { user }
  }) => {
    try {
      const path = `bitacora/${idBitacora}/${user}`
      const { filename, ext } = file.write(path, data, mimetype, user)
      const url = `${process.env.BACKEND_URL}/public/${path}/${filename}`
      const { id } = await adjunto.createOrUpdate({ nombre: name, path: url, mime: mimetype, tipo: ext, estado: 'ACTIVO', user })
      return { id, url }
    } catch (error) {
      throw new Error(`No se creo el adjunto`, 400)
    }
  }

  const createFile = async ({
    files,
    idBitacora,
    user: { user }
  }) => {
    let transaction
    const adjuntos = []
    const path = `bitacora/${idBitacora}/${user}/adjuntos`
    try {
      transaction = await create()
      if (!Array.isArray(files)) files = [files]
      for (const { data, mimetype, name } of files) {
        const { filename, ext } = file.write(path, data, mimetype, user, name)
        const url = `${process.env.BACKEND_URL}/public/${path}/${filename}`
        const { id } = await adjunto.createOrUpdate({ nombre: name, path: url, mime: mimetype, tipo: ext, estado: 'ACTIVO', user }, transaction)
        adjuntos.push({ id, url, filename })
      }
      await commit(transaction)
      return adjuntos
    } catch (error) {
      console.log(error)
      if (adjunto.length > 0) {
        for (const { filename } of adjuntos)
          file.remove(path, filename)
      }
      await rollback(transaction)
      throw new Error(`No se creo el adjunto`, 400)
    }
  }

  return {
    createOrUpdate,
    createImage,
    createFile,
    findAll
  }
}