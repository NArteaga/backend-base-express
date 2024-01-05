module.exports = (app, { controllers }) => {
  const { detalleProyecto } = controllers
  app.get('/detalle-proyecto/:idProyecto', detalleProyecto.findAll)
  app.post('/detalle-proyecto', detalleProyecto.create)
  app.patch('/detalle-proyecto/:id', detalleProyecto.create)
  
  return app
}