'use strict';
const { fildAuditoryRegister } = require('../libs/config.js');
let rows = [
  { id: '434a5663-708d-4259-94e9-1447debe0001', nombre: 'GENERAL', ruta: '/app/general', icon: 'pi pi-home', orden: 1, tipo: 'GRUPO_MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe0002', nombre: 'AVANCE', ruta: '/app/avances', icon: 'pi pi-chart-line', orden: 2, tipo: 'GRUPO_MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe0003', nombre: 'Información Institucional', id_agrupador: '434a5663-708d-4259-94e9-1447debe0001', ruta: '/app/general/inversion', icon: 'pi pi-building', orden: 1, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe0004', nombre: 'Seguimiento FARIP', id_agrupador: '434a5663-708d-4259-94e9-1447debe0001', ruta: '/app/general/farip', icon: 'pi pi-money-bill', orden: 2, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe0005', nombre: 'Seguimiento de Proyectos', id_agrupador: '434a5663-708d-4259-94e9-1447debe0001', ruta: '/app/general/proyectos', icon: 'pi pi-briefcase', orden: 3, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe0006', nombre: 'Seguimiento de Administración', id_agrupador: '434a5663-708d-4259-94e9-1447debe0001', ruta: '/app/general/administracion', icon: 'pi pi-book', orden: 4, tipo: 'MENU', estado: 'ACTIVO' },
  { id: '434a5663-708d-4259-94e9-1447debe0007', nombre: 'Avances y Ayudas Memorias', id_agrupador: '434a5663-708d-4259-94e9-1447debe0002', ruta: '/app/avances/bitacora', icon: 'pi pi-chart-bar', orden: 1, tipo: 'MENU', estado: 'ACTIVO' },
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