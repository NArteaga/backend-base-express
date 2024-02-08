module.exports = ({ repositories: { auth }, libs: { jwt } }) => {
  const findToken = async (token) => {
    try {
      const result = await auth.getToken(token)
      if (result.estado === 'INACTIVO') throw new Error('No se pudo validar la sesión')
      return result
    } catch (error) {
      console.log(error)
      throw new Error('No se pudo validar la sesión')
    }
  }

  const create = async ({ client, token }) => {
    try {
      const { exp, user } = jwt.verifyToken(token)
      const result = await auth.createOrUpdate({ client, token, idUser: user, exp: exp, user })
      return result
    } catch (error) {
      throw new Error('Error al iniciar la sesión')
    }
  }

  const logout = async (token, user) => {
    try {
      const result = await auth.getToken(token)
      await auth.createOrUpdate({ id: result.id, estado: 'INACTIVO', user })
      return result
    } catch (error) {
      console.log(error)
      throw new Error('No se pudo cerrar la sesión')
    }
  }

  return { findToken, create, logout }
}