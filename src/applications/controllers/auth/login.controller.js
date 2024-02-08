const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')
const DeviceDetector = require('node-device-detector');
const geoip = require('geoip-lite');
const detector = new DeviceDetector()

module.exports = (value) => {
  const { services: { login, auth }, libs: { notify } } = value
  const authentication = async ({ user, client }, res) => {
    try {
      const respuestaClient = await login.authenticated(user)
      await auth.create({ client, token: respuestaClient.token })
      // notify.send(`auth-${user.usuario}`, `Bienvinido ${user.nombreCompleto}`)
      if (respuestaClient.menus.length === 0) throw new Error('credenciales invalidas')
      return ok(res, true, 'ok', respuestaClient)
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

  const logout = async ({ token, user: { user } }, res) => {
    try {
      await auth.logout(token, user)
      return ok(res, true, 'ok')
    } catch (err) {
      console.log(err)
      error(res, HTTP_CODES.UNAUTHORIZED, err.message)
    }
  }

  return {
    authentication,
    verificar,
    refreshToken,
    logout
  }
}


