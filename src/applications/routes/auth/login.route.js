
module.exports = (app, { middlewares, controllers }) => {
  const { recaptcha, ldap, jwt } = middlewares
  const { login } = controllers

  app.post('/login', recaptcha.verificarCaptcha('auth'), ldap.verificar(), login.authentication)
  app.get('/logout', jwt.verificar(), login.logout)
  app.get('/verificar', jwt.verificar(), login.verificar)
  
  return app
}