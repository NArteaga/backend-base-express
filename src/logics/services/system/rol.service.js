module.exports = ({ repositories: { rol, rolMenu }, transaction: { create, commit, rollback } }) => {
  const createOrUpdate = async ({ user: { user }, body }) => {
    try {
      const { menus, apis, views } = body
      delete body.menus
      delete body.apis
      delete body.views
      body.user = user;
      const result = await rol.createOrUpdate(body)
      await rolMenu.deleteCondition({ user, idRol: result.id  })
      if (menus) {
        for (const id in menus) {
          const menu = menus[id]
          const resultRolMenu = await rolMenu.getRegister(result.id, id)
          if (resultRolMenu) {
            await rolMenu.restore(resultRolMenu.id)
            menu.idRolMenu = resultRolMenu.id
          }
          await rolMenu.createOrUpdate({ id: menu.idRolMenu, idRol: result.id, idMenu: id, accion: menu.accion, user, estado: 'ACTIVO' })
        }
      }
      if (apis) {
        for (const id in apis) {
          const api = apis[id]
          const resultRolMenu = await rolMenu.getRegister(result.id, id)
          if (resultRolMenu) {
            await rolMenu.restore(resultRolMenu.id)
            api.idRolMenu = resultRolMenu.id
          }
          await rolMenu.createOrUpdate({ id: api.idRolMenu, idRol: result.id, idMenu: id, accion: api.accion, user, estado: 'ACTIVO' })
        }
      }
      if (views) {
        for (const id in views) {
          const view = views[id]
          const resultRolMenu = await rolMenu.getRegister(result.id, id)
          if (resultRolMenu) {
            await rolMenu.restore(resultRolMenu.id)
            view.idRolMenu = resultRolMenu.id
          }
          await rolMenu.createOrUpdate({ id: view.idRolMenu, idRol: result.id, idMenu: id, accion: view.accion, user, estado: 'ACTIVO' })
        }
      }
      return result
    } catch (error) {
      console.log(error)
      if (body.id) throw new Error(`No se pudo actualizar el rol`, 400)
      throw new Error(`No se pudo crear el rol`, 400)
    }
  }

  const findAll = async ({ query }) => {
    try {
      const response = await rol.findAll(query)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const deleteById = async ({ params, user: { user } }) => {
    try {
      const response = await rol.deleteById(params, user)
      return response
    } catch (error) {
      console.log(error)
      throw new Error(`No se encontraron registros`, 400)
    }
  }

  const pemisoMiddleware = async ({ id, method }) => {
    try {
      const permisos = await rol.findMiddleware(id, method)
      return permisos
    } catch (error) {
      console.log(error)
      throw new Error(`No tiene permisos para realizar la siguiente tarea`, 400)
    }
  }

  const findList = async () => {
    const list = await rol.findList()
    return list
  }

  return {
    pemisoMiddleware,
    findList,
    createOrUpdate,
    findAll,
    deleteById
  }
}