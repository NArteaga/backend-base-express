const { sign, verify, decode } = require('jsonwebtoken')

module.exports = () => {
  const getToken = (expire, data) => {
    expire = Math.floor(Date.now() / 1000) + (parseInt(expire) * 60)
    return sign({ ...data, exp: expire }, process.env.JWT_SECRET)
  }

  const verifyToken = (token) =>
    verify(token, process.env.JWT_SECRET)
    
  return { getToken, verifyToken }
}