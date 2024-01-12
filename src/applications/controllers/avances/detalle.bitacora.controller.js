const { error, ok } = require('../../../common/response')
const { HTTP_CODES } = require('../../../common/constants')
module.exports = ({ services: { detalleBitacora } }) => {
  const create = async (req, res) => {
    try {
      const result = await detalleBitacora.createOrUpdate(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const update = async (req, res) => {
    try {
      req.body.id = req.params.id
      const result = await detalleBitacora.createOrUpdate(req)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const findAll = async (req, res) => {
    try {
      const result = await detalleBitacora.findAll(req.params)
      return ok(res, true, 'ok', result)
    } catch (err) {
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const uploadImage = async ({ files: { file } , user, params: { idBitacora } }, res) => {
    try {
      const response = await detalleBitacora.createImage({ file, idBitacora, user })
      return ok(res, true, 'ok', response)
    } catch (err) {
      console.log(err)
      error(res, HTTP_CODES.BAD_REQUEST, err.message)
    }
  }

  const uploadFile = async ({ files, user, params: { idBitacora } }, res) => {
    try {
      const response = await detalleBitacora.createFile({ files: files['files[]'], user, idBitacora })
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
    uploadImage,
  }
}