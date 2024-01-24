module.exports = (app, { controllers }) => {
  const { unidad } = controllers

  app.get('/unidad/list', unidad.findList)

  return app
}
