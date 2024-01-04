'use strict';
const { fildAuditoryRegister } = require('../libs/config.js');

let rows = [
  { id: 'e583d4bf-d090-4710-b0f2-6a6656620001', id_rol: '8db0ee96-0e81-441f-ad33-4f8823980003', id_menu: '434a5663-708d-4259-94e9-1447debe0003', accion: '["EDITAR", "VER", "CREAR", "ELIMINAR"]', estado: 'ACTIVO' },
  { id: 'e583d4bf-d090-4710-b0f2-6a6656620002', id_rol: '8db0ee96-0e81-441f-ad33-4f8823980003', id_menu: '434a5663-708d-4259-94e9-1447debe0004', accion: '["EDITAR", "VER", "CREAR", "ELIMINAR"]', estado: 'ACTIVO' },
  { id: 'e583d4bf-d090-4710-b0f2-6a6656620003', id_rol: '8db0ee96-0e81-441f-ad33-4f8823980003', id_menu: '434a5663-708d-4259-94e9-1447debe0005', accion: '["EDITAR", "VER", "CREAR", "ELIMINAR"]', estado: 'ACTIVO' },
  { id: 'e583d4bf-d090-4710-b0f2-6a6656620004', id_rol: '8db0ee96-0e81-441f-ad33-4f8823980003', id_menu: '434a5663-708d-4259-94e9-1447debe0006', accion: '["EDITAR", "VER", "CREAR", "ELIMINAR"]', estado: 'ACTIVO' },
  { id: 'e583d4bf-d090-4710-b0f2-6a6656620005', id_rol: '8db0ee96-0e81-441f-ad33-4f8823980003', id_menu: '434a5663-708d-4259-94e9-1447debe0007', accion: '["EDITAR", "VER", "CREAR", "ELIMINAR"]', estado: 'ACTIVO' },
]

rows = fildAuditoryRegister(rows);

module.exports = {
  up (queryInterface) {
    return queryInterface.bulkInsert('system_rol_menu', rows, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      })
  },
  down (queryInterface) {}
}