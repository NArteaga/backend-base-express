const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')
module.exports = (value) => {
  const { services: { login }, libs: { notify } } = value
  const authentication = async ({ user }, res) => {
    try {
      console.log('AUTH')
      const auth = await login.authenticated(user)
      // notify.send(`auth-${user.usuario}`, `Bienvinido ${user.nombreCompleto}`)
      console.log(auth)
      if (auth.menus.length === 0) throw new Error('credenciales invalidas')
      return ok(res, true, 'ok', auth)
    } catch (err) {
      console.log(err)
      error(res, HTTP_CODES.UNAUTHORIZED, err.message)
    }
  }

  const verificar = async ({}, res) => {
    try {
      return ok(res, true, 'ok')
    } catch (err) {
      console.log(err)
      error(res, HTTP_CODES.UNAUTHORIZED, err.message)
    }
  }

  const refreshToken = async ({ user }, res) => {
    try {
      const token = jwt.getToken(240, user)
      return ok(res, true, 'ok', { token })
    } catch (err) {
      error(res, HTTP_CODES.UNAUTHORIZED, err.message)
    }
  }

  return {
    authentication,
    verificar,
    refreshToken
  }
}

