module.exports = (app, { controllers }) => {
  const { institucion } = controllers

  app.get('/institucion', institucion.findAll)
  app.post('/institucion', institucion.create)
  app.patch('/institucion/:id', institucion.update)
  app.post('/institucion/file', institucion.uploadFile)
  app.delete('/institucion/:id', institucion.deleteId)
  
  return app
}