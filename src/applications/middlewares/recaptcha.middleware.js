const axios = require('axios')
const { HTTP_CODES } = require('../../common/constants')
const { error } = require('../../common/response')

const RecaptchaMiddleWare = function () {
  const verificarCaptcha = (action) => {
    return async function _middleware(req, res, next) {
      try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY
        const token = req.headers['recaptcha-token']
        const url = `${process.env.RECAPTCHA_URL}?secret=${secretKey}&response=${token}`
        const { data: response } = await axios.post(url)
        if (
          response.success
          && response.score > 0.5
          && response.hostname === process.env.FRONTEND_HOST
          && response.action === action)
            return next()
        error(res, HTTP_CODES.UNAUTHORIZED, err.message)
      } catch (err) {
        error(res, HTTP_CODES.UNAUTHORIZED, 'No se pudo comprobar el token del recaptcha')
      }
    }
  }
  return {
    verificarCaptcha
  }
}

module.exports = () => {
  return new RecaptchaMiddleWare()
}