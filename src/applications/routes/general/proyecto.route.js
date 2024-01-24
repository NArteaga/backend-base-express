module.exports = (app, { controllers }) => {
  const { proyecto } = controllers

  app.get('/proyecto', proyecto.findAll)
  app.post('/proyecto', proyecto.create)
  app.patch('/proyecto/:id', proyecto.update)
  app.post('/proyecto/file', proyecto.uploadFile)
  app.delete('/proyecto/:id', proyecto.deleteId)
  
  return app
}