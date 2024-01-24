module.exports = (app, { controllers }) => {
  const { administracion } = controllers

  app.get('/administracion', administracion.findAll)
  app.post('/administracion', administracion.create)
  app.patch('/administracion/:id', administracion.update)
  app.post('/administracion/file', administracion.uploadFile)
  app.delete('/administracion/:id', administracion.deleteId)
  
  return app
}