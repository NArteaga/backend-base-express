const ldap = require('activedirectory2')

module.exports = () => {
  const auth = (user, password) => {
    const username = `${user}@domfndr`
    console.log(username)
    const client = new ldap({ url: `ldap://${process.env.LDAP_HOST}:${process.env.LDAP_PORT}` })
    return new Promise((resolve, reject) => {
      client.authenticate(username, password, (err, result) => {
        if (err) reject(new Error('credenciales invalidas'))
        if (result) resolve(infoUser(user, password))
      })
    })
  }

  const infoUser = (user, password) => {
    const username = `${user}@domfndr`
    const client = new ldap({ url: `ldap://${process.env.LDAP_HOST}:${process.env.LDAP_PORT}`, username, password })
    return new Promise((resolve, reject) => {
      client.findUser(username, (err, result) => {
        console.log(result)
        if (err) reject(new Error('no se pudo encontrar el usuario correspondiente'))
        if (result) resolve(getContent(result))
      })
    })
  }

  const getContent = (user) => {
    const infoClient = user.dn.split(',').map(String)
    const apellidos = user.sn.split(' ')
    return {
      nombreCompleto: getInfo(infoClient[0]),
      nombres: user.givenName,
      primerApellido: apellidos[0].trim() || '',
      secondApellido: apellidos[1]?.trim() || '',
      departamento: getInfo(infoClient[1]),
      gerencia: getInfo(infoClient[2]),
      direccion: getInfo(infoClient[3]),
      codigo: user.userAccountControl,
      correoInstitucional: `${user.sAMAccountName}@fndr.gob.bo`
    }
  }

  const getInfo = (text) => {
    return text.substring(3).trim()
  }
  return { auth }
}