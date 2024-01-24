'use strict';
const { v4 } = require('uuid');
const { fildAuditoryRegister } = require('../libs/config.js');

let rows = [
  { id: '434a5663-708d-4259-94e9-1447debe1000', nombre: 'GENERAL', ruta: '/app/general', icon: 'pi pi-home', orden: 1, tipo: 'GRUPO_MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe2000', nombre: 'AVANCE', ruta: '/app/avances', icon: 'pi pi-chart-line', orden: 2, tipo: 'GRUPO_MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe3000', nombre: 'ADMINISTRACIÓN', ruta: '/app/admin', icon: 'pi pi-users', orden: 3, tipo: 'GRUPO_MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe1001', nombre: 'Información Institucional', id_agrupador: '434a5663-708d-4259-94e9-1447debe1000', ruta: '/app/general/inversion', icon: 'pi pi-building', orden: 1, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe1002', nombre: 'Seguimiento FARIP', id_agrupador: '434a5663-708d-4259-94e9-1447debe1000', ruta: '/app/general/farip', icon: 'pi pi-money-bill', orden: 2, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe1003', nombre: 'Seguimiento de Proyectos', id_agrupador: '434a5663-708d-4259-94e9-1447debe1000', ruta: '/app/general/proyectos', icon: 'pi pi-briefcase', orden: 3, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe1004', nombre: 'Seguimiento de Administración', id_agrupador: '434a5663-708d-4259-94e9-1447debe1000', ruta: '/app/general/administracion', icon: 'pi pi-book', orden: 4, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe2001', nombre: 'Avances y Ayudas Memorias', id_agrupador: '434a5663-708d-4259-94e9-1447debe2000', ruta: '/app/avances/bitacora', icon: 'pi pi-chart-bar', orden: 1, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe3001', nombre: 'Usuario', id_agrupador: '434a5663-708d-4259-94e9-1447debe3000', ruta: '/app/admin/usuario', icon: 'pi pi-user', orden: 1, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe3002', nombre: 'Rol', id_agrupador: '434a5663-708d-4259-94e9-1447debe3000', ruta: '/app/admin/rol', icon: 'pi pi-box', orden: 2, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe3003', nombre: 'Menu', id_agrupador: '434a5663-708d-4259-94e9-1447debe3000', ruta: '/app/admin/menu', icon: 'pi pi-list', orden: 3, tipo: 'MENU', estado: 'ACTIVO' },
]

rows = [
  ...rows,
  { id: 'bf736567-dc06-4976-893c-fd5057970001', nombre: 'API de Bitacora', ruta: '/api/avances/bitacora', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970002', nombre: 'API de Bitacora', ruta: '/api/avances/bitacora/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970003', nombre: 'API de File de Bitacora', ruta: '/api/avances/bitacora/file', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970004', nombre: 'API de Detalle Bitacora', ruta: '/api/avances/detalle-bitacora', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970005', nombre: 'API de Detalle Bitacora', ruta: '/api/avances/detalle-bitacora/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970006', nombre: 'API de Imagen de Detalle Bitacora', ruta: '/api/avances/detalle-bitacora/image/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970007', nombre: 'API de File de Detalle Bitacora', ruta: '/api/avances/detalle-bitacora/file/@id', tipo: 'API', estado: 'ACTIVO' },
]

rows = [
  ...rows,
  { id: 'bf736567-dc06-4976-893c-fd5057970008', nombre: 'API de Administracion', ruta: '/api/general/administracion', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970009', nombre: 'API de Administracion', ruta: '/api/general/administracion/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970010', nombre: 'API de File de Administracion', ruta: '/api/general/administracion/file', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970011', nombre: 'API de Farip', ruta: '/api/general/farip', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970012', nombre: 'API de Farip', ruta: '/api/general/farip/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970013', nombre: 'API de File de Farip', ruta: '/api/general/farip/file', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970014', nombre: 'API de Institucion', ruta: '/api/general/institucion', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970015', nombre: 'API de Institucion', ruta: '/api/general/institucion/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970016', nombre: 'API de File de Institucion', ruta: '/api/general/institucion/file', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970017', nombre: 'API de Proyecto', ruta: '/api/general/proyecto', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970018', nombre: 'API de Proyecto', ruta: '/api/general/proyecto/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970019', nombre: 'API de File de Proyecto', ruta: '/api/general/proyecto/file', tipo: 'API', estado: 'ACTIVO' },
]

rows = [
  ...rows,
  { id: 'bf736567-dc06-4976-893c-fd5057970020', nombre: 'API de Funcionario', ruta: '/api/system/funcionario', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970021', nombre: 'API de Funcionario', ruta: '/api/system/funcionario/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970022', nombre: 'API de Funcionario', ruta: '/api/system/funcionario/info/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970023', nombre: 'API de Menu', ruta: '/api/system/menu', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970024', nombre: 'API de Menu', ruta: '/api/system/menu/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970025', nombre: 'API de Menu', ruta: '/api/system/menu/type/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970026', nombre: 'API de Rol', ruta: '/api/system/rol', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970027', nombre: 'API de Rol', ruta: '/api/system/rol/@id', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970028', nombre: 'API de Rol', ruta: '/api/system/rol/list', tipo: 'API', estado: 'ACTIVO' },
  { id: 'bf736567-dc06-4976-893c-fd5057970029', nombre: 'API de Unidad', ruta: '/api/system/unidad/list', tipo: 'API', estado: 'ACTIVO' },
]

rows = fildAuditoryRegister(rows);

module.exports = {
  up (queryInterface) {
    return queryInterface.bulkInsert('system_menu', rows, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      })
  },
  down (queryInterface) {}
}