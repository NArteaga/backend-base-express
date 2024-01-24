const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')

module.exports = ({ services: { rol } }) => {
  const create = async (req, res) => {
    try {
      const result = await rol.createOrUpdate(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const update = async (req, res) => {
    try {
      req.body.id = req.params.id
      const result = await rol.createOrUpdate(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const deleteById = async (req, res) => {
    try {
      const result = await rol.deleteById(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const findAll = async (req, res) => {
    try {
      const result = await rol.findAll(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const findList = async (_, res) => {
    try {
      const result = await rol.findList()
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  return {
    findList,
    create,
    update,
    deleteById,
    findAll,
  }
}