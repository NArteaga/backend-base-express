module.exports = (app, { controllers }) => {
  const { detalleBitacora } = controllers
  app.get('/detalle-bitacora/:idBitacora', detalleBitacora.findAll)
  app.post('/detalle-bitacora', detalleBitacora.create)
  app.patch('/detalle-bitacora/:id', detalleBitacora.update)
  app.post('/detalle-bitacora/image/:idBitacora', detalleBitacora.uploadImage)
  app.post('/detalle-bitacora/file/:idBitacora', detalleBitacora.uploadFile)

  return app
}
