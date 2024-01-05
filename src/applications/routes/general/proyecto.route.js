module.exports = (app, { controllers }) => {
  const { proyecto } = controllers
  app.get('/proyecto', proyecto.findAll)
  app.post('/proyecto', proyecto.create)
  app.patch('/proyecto/:id', proyecto.create)
  
  return app
}