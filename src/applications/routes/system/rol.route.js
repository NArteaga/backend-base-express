module.exports = (app, { controllers }) => {
  const { rol } = controllers
  app.get('/rol', rol.findAll)
  app.post('/rol', rol.create)
  app.patch('/rol/:id', rol.update)
  app.delete('/rol/:id', rol.deleteById)
  app.get('/rol/list', rol.findList)

  return app
}
