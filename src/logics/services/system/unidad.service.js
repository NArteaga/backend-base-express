module.exports = ({ repositories: { unidad } }) => {
  const findList = async () => {
    const result = await unidad.findList()
    return result
  }

  return { findList }
}