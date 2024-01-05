'use strict'

const toJSON = (result) => {
  const response = { rows: [], count: 0 }
  if (!result) return response
  if (Array.isArray(result))
    return result.map(item => item.toJSON())
  if (result.rows && Array.isArray(result.rows))
    response.rows = result.rows.map(row => row.toJSON())
  if (result.count) response.count = result.count
  return response
}

const getQuery = (option = {}, arr = []) => {
  const query = {}
  if (!option.order) option.order = '-createdAt'
  query.order = [[option.order, 'ASC']]
  if (option.order.startsWith('-'))
    query.order[0] = [option.order.substring(1), 'DESC']
  query.order.push(['id', 'ASC'])
  if (option.limit) query.limit = parseInt(option.limit)
  if (query?.limit && option.page)
    query.offset = parseInt(option.page) * query.limit
  return query
}

const errorHandler = (error) => {
  if (!error.errors) throw error
  const { errors } = error
  const outError = {}
  for (const index in errors) {
    const { key, type, value, message } = errors[index]
    let mensaje = ''
    if (['unique violation'].indexOf(type) === -1) throw new Error(message)
    if ('unique violation' === type) mensaje = `"${value}" Este valor ya fue registrado anteriormente`
    else mensaje = `${type}: ${message}`
    if (outError[key]) outError[key].errors.push(message)
    else outError[key] = { errors: [message] }
  }
  if (Object.keys(outError).length)
    throw new Error(convertOutErrorToText(outError))
  throw error
}

const convertOutErrorToText = (outError) => {
  const text = []
  for (const key in outError)
    text.push(`${key}: ${outError[key].errors.join(', ')}`)
  return text.join('\n')
}

module.exports = {
  toJSON,
  getQuery,
  errorHandler,
}