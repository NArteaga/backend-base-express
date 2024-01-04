const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')
module.exports = ({ services: { login } }) => {
  const authentication = async ({ user }, res) => {
    try {
      const auth = await login.authenticated(user)
      return ok(res, true, 'ok', auth)
    } catch (err) {
      error(res, HTTP_CODES.UNAUTHORIZED, err.message)
    }
  }

  const refreshToken = async ({ user }, res) => {
    try {
      const token = jwt.getToken(240, user)
      console.log(token)
      console.log(jwt.verifyToken(token))
      return ok(res, true, 'ok', { token })
    } catch (err) {
      error(res, HTTP_CODES.UNAUTHORIZED, err.message)
    }
  }

  return {
    authentication,
    refreshToken
  }
}

