module.exports = (models) => {
  const {
    auth,
    funcionario,
    rol,
    menu,
    rolMenu,
    unidad,
    adjunto,
  } = models

  const {
    administracion,
    farip,
    institucion,
    proyecto,
  } = models

  const {
    adjuntoDetalleBitacora,
    detalleBitacora,
    bitacora
  } = models

  auth.belongsTo(funcionario, { foreignKey: { name: 'idUser' }, as: 'funcionario' })

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

  detalleBitacora.belongsTo(bitacora, { foreignKey: { name: 'idProyecto' }, as: 'bitacora' })
  bitacora.hasMany(detalleBitacora, { foreignKey: { name: 'idProyecto' }, as: 'detallesBitacora' })

  detalleBitacora.belongsTo(funcionario, { foreignKey: { name: 'idFuncionario' }, as:'funcionario' })
  funcionario.hasMany(detalleBitacora, { foreignKey: { name: 'idFuncionario' }, as: 'detallesBitacora' })
  
  bitacora.belongsTo(adjunto, { foreignKey: { name: 'idAdjunto' }, as: 'adjunto' })

  administracion.belongsTo(adjunto, { foreignKey: { name: 'idDocument'}, as: 'documento' })
  farip.belongsTo(adjunto, { foreignKey: { name: 'idDocument'}, as: 'documento' })
  institucion.belongsTo(adjunto, { foreignKey: { name: 'idDocument'}, as: 'documento' })
  proyecto.belongsTo(adjunto, { foreignKey: { name: 'idDocument'}, as: 'documento' })

  detalleBitacora.belongsTo(adjunto, { foreignKey: { name: 'idAdjunto' }, as: 'imagen' })

  detalleBitacora.belongsToMany(adjunto, { through: { model: adjuntoDetalleBitacora, unique: false}, as: 'adjuntos', foreignKey: 'idDetalleBitacora' })
  adjunto.belongsToMany(detalleBitacora, { through: { model: adjuntoDetalleBitacora, unique: false}, as: 'detallesBitacoras', foreignKey: 'idAdjunto' })
  return models
}