const { error } = require('../../common/response')
const { HTTP_CODES } = require('../../common/constants')

const RolMiddleWare = function (rolService) {
  const compare = (pathOrigin, pathBd) => {
    if (pathOrigin.length !== pathBd.length) return false
    let flag = true
    for (const index in pathOrigin)
      flag = pathOrigin[index] === pathBd[index] || pathBd[index] === '@id'
    return flag
  }
  const verificar = () => {
    return async function _middleware(req, res, next) {
      try {
        const { method, baseUrl, user: { rol } } = req
        const permissions = await rolService.pemisoMiddleware({ id: rol, method })
        const path = baseUrl.split('/')
        for (const { ruta } of permissions?.menus) {
          const pathPermission = ruta.split('/')
          if (compare(path, pathPermission)) return next()
        }
        error(res, HTTP_CODES.UNAUTHORIZED, 'Usuario no autorizado para realizar esta acción')
      } catch (err) {
        console.log(err)
        error(res, HTTP_CODES.UNAUTHORIZED, err.message)
      }
    }
  }
  return {
    verificar
  }
}

module.exports = ({ services: { rol } }) => {
  return new RolMiddleWare(rol)
}