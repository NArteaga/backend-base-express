const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')
module.exports = ({ services: { farip } }) => {
  const create = async (req, res) => {
    try {
      const response = await farip.createOrUpdate(req)
      return ok(res, true, 'ok', response)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const update = async (req, res) => {
    try {
      req.body.id = req.params.id
      const response = await farip.createOrUpdate(req)
      return ok(res, true, 'ok', response)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const findAll = async (_, res) => {
    try {
      const response = await farip.findAll()
      return ok(res, true, 'ok', response)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const uploadFile = async ({ files: { file } , user }, res) => {
    try {
      const response = await farip.createDocument({ file, user })
      return ok(res, true, 'ok', response)
    } catch (err) {
      console.log(err)
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const deleteId = async ({ params , user }, res) => {
    try {
      const response = await farip.deleteById({ params, user })
      return ok(res, true, 'ok', response)
    } catch (err) {
      console.log(err)
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  return {
    create,
    update,
    findAll,
    uploadFile,
    deleteId
  }
}