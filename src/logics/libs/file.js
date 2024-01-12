const { writeFileSync, existsSync, mkdirSync, rmSync } = require('fs')
const { join } = require('path')
const { extension } = require('mime-types')
module.exports = () => {
  const write = (path, data, mime, user, name = '') => {
    path = join(process.env.PATH_FILE_PUBLIC, 'public', path)
    if (!existsSync(path)) mkdirSync(path, { recursive: true })
    let ext = extension(mime)
    if (!ext && name) ext = name.split('.')[1]
    const filename = `${user}_${Date.now()}.${ext}`
    writeFileSync(join(path, filename), data)
    return { filename, ext }
  }

  const remove = (path) => {
    path = join(process.env.PATH_FILE_PUBLIC, 'public', path)
    if (existsSync(path)) rmSync(path)
  }
  return { write, remove }
}