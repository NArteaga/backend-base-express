module.exports = (models) => {
  const {
    funcionario,
    rol,
    menu,
    rolMenu,
    unidad,
  } = models


  const {
    detalleProyecto,
    proyecto
  } = models

  funcionario.belongsTo(rol, { foreignKey: { name: 'idRol' }, as: 'rol' })
  rol.hasMany(funcionario, { foreignKey: { name: 'idRol' }, as: 'funcionarios' })

  rol.belongsToMany(menu, { through: { model: rolMenu, unique: false}, as: 'menus', foreignKey: 'idRol' })
  menu.belongsToMany(rol, { through: { model: rolMenu, unique: false}, as: 'roles', foreignKey: 'idMenu' })

  funcionario.belongsTo(unidad, { foreignKey: { name: 'idUnidad' }, as: 'unidad' })
  unidad.hasMany(funcionario, { foreignKey: { name: 'idUnidad' }, as: 'funcionarios' })

  unidad.belongsTo(unidad, { foreignKey: { name: 'idUnidad' }, as: 'father' })
  unidad.hasMany(unidad, { foreignKey: { name: 'idUnidad' }, as: 'childrens' })

  menu.belongsTo(menu, { foreignKey: { name: 'idAgrupador' }, as: 'father' })
  menu.hasMany(menu, { foreignKey: { name: 'idAgrupador' }, as: 'childrens' })

  detalleProyecto.belongsTo(proyecto, { foreignKey: { name: 'idProyecto' }, as: 'proyecto' })
  proyecto.hasMany(detalleProyecto, { foreignKey: { name: 'idProyecto' }, as: 'detalleProyectos' })

  detalleProyecto.belongsTo(funcionario, { foreignKey: { name: 'idFuncionario' }, as:'funcionario' })
  funcionario.hasMany(detalleProyecto, { foreignKey: { name: 'idFuncionario' }, as: 'detalleProyectos' })
  
  return models
}