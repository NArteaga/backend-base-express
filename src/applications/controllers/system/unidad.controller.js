const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')

module.exports = ({ services: { unidad } }) => {

  const findList = async (_, res) => {
    try {
      const result = await unidad.findList()
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  return {
    findList
  }
}