'use strict';
const { fildAuditoryRegister } = require('../libs/config.js');
let rows = [
  { id: '8db0ee96-0e81-441f-ad33-4f8823980001', nombre: 'DIRECTOR', descripcion: '', estado: 'ACTIVO' },
  { id: '8db0ee96-0e81-441f-ad33-4f8823980002', nombre: 'CONSULTA', descripcion: '', estado: 'ACTIVO' },
  { id: '8db0ee96-0e81-441f-ad33-4f8823980003', nombre: 'OPERADOR', descripcion: '', estado: 'ACTIVO' },
  { id: '8db0ee96-0e81-441f-ad33-4f8823980004', nombre: 'ADMINISTRADOR', descripcion: '', estado: 'ACTIVO' },
  { id: '8db0ee96-0e81-441f-ad33-4f8823980005', nombre: 'FUNCIONARIO', descripcion: '', estado: 'ACTIVO' },
]

rows = fildAuditoryRegister(rows);

module.exports = {
  up (queryInterface) {
    return queryInterface.bulkInsert('system_rol', rows, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      })
  },
  down (queryInterface) {}
}