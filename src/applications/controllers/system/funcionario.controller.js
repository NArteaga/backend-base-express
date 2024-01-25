const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')

module.exports = ({ services: { funcionario }, libs: { ldap } }) => {
  const create = async (req, res) => {
    try {
      const result = await funcionario.createOrUpdate(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const update = async (req, res) => {
    try {
      req.body.id = req.params.id
      const result = await funcionario.createOrUpdate(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const deleteById = async (req, res) => {
    try {
      const result = await funcionario.deleteById(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const info = async (req, res) => {
    try {
      const result = await ldap.getUser(req.params.username)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const findAll = async (req, res) => {
    try {
      const result = await funcionario.findAll(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  return {
    create,
    update,
    deleteById,
    findAll,
    info,
  }
}