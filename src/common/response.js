module.exports = {
  ok: (res, finalizado = true, message, datos) => (res.status(200).json({
    finalizado,
    mensaje: message,
    datos
  })),
  error: (res, code, message, response) => (res.status(code).json({
    finalizado: false,
    mensaje: message || 'ERROR',
    datos: response || null
  }))
}
