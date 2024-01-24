module.exports = (app, { controllers }) => {
  const { farip } = controllers

  app.get('/farip', farip.findAll)
  app.post('/farip', farip.create)
  app.patch('/farip/:id', farip.update)
  app.post('/farip/file', farip.uploadFile)
  app.delete('/farip/:id', farip.deleteId)
  
  return app
}