module.exports = (app, { controllers }) => {
  const { funcionario } = controllers

  app.get('/funcionario', funcionario.findAll)
  app.post('/funcionario', funcionario.create)
  app.get('/funcionario/info/:username', funcionario.info)
  app.patch('/funcionario/:id', funcionario.update)
  app.delete('/funcionario/:id', funcionario.deleteById)

  return app
}
