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
          && response.action === action)
            return next()
        throw new Error('No se encuentra autorizado')
      } catch (err) {
        error(res, HTTP_CODES.UNAUTHORIZED, err.message)
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