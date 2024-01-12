module.exports = (app, { controllers }) => {
  const { bitacora } = controllers

  app.get('/bitacora', bitacora.findAll)
  app.post('/bitacora', bitacora.create)
  app.patch('/bitacora/:id', bitacora.update)
  app.post('/bitacora/file', bitacora.uploadFile)
  
  return app
}