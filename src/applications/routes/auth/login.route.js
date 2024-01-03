const { Router } = require('express')
module.exports = (app, { middlewares, controllers }) => {
  const { recaptcha, ldap } = middlewares
  const { login } = controllers
  app.post('/login', recaptcha.verificarCaptcha('auth'), ldap.verificar(), login.authentication)
  
  return app
}