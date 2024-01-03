const axios = require('axios')
const { HTTP_CODES } = require('../../common/constants')
const { error } = require('../../common/response')

const LdapMiddleWare = function (ldap) {
  const verificar = () => {
    return async function _middleware(req, res, next) {
      try {
        console.log(req.body)
        const { usuario, password } = req.body
        const user = await ldap.auth(usuario, password)
        console.log(user)
        req.user = user
        req.body = {}
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

module.exports = ({ libs }) => {
  const { ldap } = libs
  return new LdapMiddleWare(ldap)
}