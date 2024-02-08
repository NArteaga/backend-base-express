const { HTTP_CODES } = require('../../common/constants')
const { error } = require('../../common/response')

const JWTMiddleWare = function (jwt, auth) {
  const verificar = () => {
    return async function _middleware(req, res, next) {
      try {
        if (!req.headers.authorization) throw new Error('No autorizado')
        req.token = req.headers.authorization.replace('Bearer ', '')
        const user = await jwt.verifyToken(req.token)
        await auth.findToken(req.token)
        if (user.exp) delete user.exp
        if (user.iat) delete user.iat
        req.user = user
        next()
      } catch (err) {
        error(res, HTTP_CODES.UNAUTHORIZED, err.message)
      }
    }
  }
  return {
    verificar
  }
}

module.exports = ({ libs: { jwt }, services: { auth } }) => {
  return new JWTMiddleWare(jwt, auth)
}