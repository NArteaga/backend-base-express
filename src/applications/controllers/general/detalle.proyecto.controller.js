const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')
module.exports = ({ services: { detalleProyecto } }) => {
  const create = async (req, res) => {
    try {
      const detalleProyecto = await detalleProyecto.createOrUpdate(req)
      return ok(res, true, 'ok', proyecto)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const update = async (req, res) => {
    try {
      req.body.id = req.params.id
      const detalleProyecto = await detalleProyecto.createOrUpdate(req)
      return ok(res, true, 'ok', proyecto)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const findAll = async (req, res) => {
    try {
      const detalleProyecto = await detalleProyecto.findAll(req.params)
      return ok(res, true, 'ok', detalleProyecto)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  return {
    create,
    update,
    findAll,
  }
}