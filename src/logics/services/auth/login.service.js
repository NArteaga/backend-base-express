module.exports = ({ repositories, models, libs, transaction: t }) => {
  const { funcionario, unidad, rol, menu } = repositories;
  const { create, commit, rollback } = t
  const { jwt } = libs;

  const authenticated = async (user) => {
    let transaction
    try {
      transaction = await create()
      let usuario = await funcionario.findByCodigoLdap(user.usuario, transaction)
      if (!usuario) {
        const { ID_CREATE, ID_ROL } = process.env
        const unidadUsuario = await unidad.findByNombre(user.departamento, transaction)
        if (!unidadUsuario) throw new Error('Error al crear el usuario', 401)
        await funcionario.createOrUpdate(
        {
          codigoLdap: user.codigo,
          nombres: user.nombres,
          primerApellido: user.primerApellido,
          segundoApellido: user.segundoApellido,
          usuario: user.usuario,
          correo: user.correoInstitucional,
          idUnidad: unidadUsuario.id,
          idRol: ID_ROL,
          estado: 'ACTIVO',
          user: ID_CREATE
        }, transaction)
        usuario = await funcionario.findByCodigoLdap(user.codigo, transaction)
      }
      if (usuario.estado === 'INACTIVO') throw new Error('Su usuario fue desactivado', 401)
      const token = jwt.getToken(240, {
        user: usuario.id,
        ...user,
        rol: usuario.idRol,
      })
      const permisos = await rol.findPermision(usuario.idRol, transaction)
      const menus = await menu.findMenu(usuario.idRol, transaction)
      await commit(transaction)
      return {
        token,
        usuario,
        permisos,
        menus
      }
    } catch (error) {
      console.log(error)
      await rollback(transaction)
      throw error
    }
  }

  return {
    authenticated
  }
}