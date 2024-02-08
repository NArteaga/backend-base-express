const device = require('node-device-detector');
const geoip = require('geoip-lite');
const { HTTP_CODES } = require('../../common/constants')
const { error } = require('../../common/response')

const detector = new device()

const DeviceMiddleware = function () {
  const verificar = () => {
    return async function _middleware(req, res, next) {
      try {
        const { os, client, device } = detector.detect(req.headers['user-agent'])
        req.client = {
          so: `${os.name} ${os.version}`,
          archicture: os.platform || 'amd',
          browser: `${client.name} ${client.version}`,
          type: client.type,
          device: device.name || 'desktop',
          deviceType: device.type,
          ip: req.clientIp,
        }
        const geoClient = geoip.lookup(req.clientIp)
        if (geoClient) {
          req.client = {
            ...req.client,
            country: geoClient.country,
            region: geoClient.region,
            city: geoClient.city,
            latitude: geoClient.ll[0],
            longitude: geoClient.ll[1],
            timezone: geoClient.timezone,
            radius: geoClient.area,
          }
        }
        next()
      } catch (err) {
        error(res, HTTP_CODES.UNAUTHORIZED, err.message)
      }
    }
  }
  return {
    verificar
  }
}

module.exports = () => {
  return new DeviceMiddleware()
}