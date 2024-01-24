module.exports = (app, { controllers }) => {
  const { menu } = controllers

  app.get('/menu', menu.findAll)
  app.get('/menu/type/:type', menu.findGroup)
  app.post('/menu', menu.create)
  app.patch('/menu/:id', menu.update)
  app.delete('/menu/:id', menu.deleteById)

  return app
}
