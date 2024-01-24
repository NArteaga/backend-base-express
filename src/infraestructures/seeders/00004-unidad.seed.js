'use strict';
const { fildAuditoryRegister } = require('../libs/config.js');

let rows = [
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40001', nombre: 'Dirección General Ejecutiva', descripcion: '', estado: 'ACTIVO' },
  // DEPENDIENTES DE LA MAE
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40002', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40001', nombre: 'Gerencia de Finanzas', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40003', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40001', nombre: 'Gerencia de Gestión de Proyectos', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40004', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40001', nombre: 'Gerencia de Gestión y Sistemas', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40005', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40001', nombre: 'Departamento de Transparencia', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40006', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40001', nombre: 'Departamento de Asesoria Legal', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40007', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40001', nombre: 'Departamento de Auditoria Interna', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40008', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40001', nombre: 'Coordinación General y Proyectos Especiales', descripcion: '', estado: 'ACTIVO' },
  // DEPENDIENTES DE LA GERENCIA FINANZAS
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40009', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40002', nombre: 'Departamento de Lineas Cartera y Riesgo', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40010', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40002', nombre: 'Departamento de Finanzas', descripcion: '', estado: 'ACTIVO' },
  // DEPENDIENTES DE LA GERENCIA GESTION PROYECTOS
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40011', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40003', nombre: 'Departamento de Evaluación y Aprobación', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40012', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40003', nombre: 'Departamento de Ejecución y Cierre', descripcion: '', estado: 'ACTIVO' },
  // DEPENDIENTES DE LA GERENCIA GESTION Y SISTEMAS
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40013', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40003', nombre: 'Departamento de Gestioón de Recursos Humanos', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40014', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40003', nombre: 'Departamento de Administración', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40015', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40003', nombre: 'Departamento de Sistemas', descripcion: '', estado: 'ACTIVO' },
  { id: 'f20b494e-2926-4d01-a17e-8dcfd3b40016', id_unidad: 'f20b494e-2926-4d01-a17e-8dcfd3b40003', nombre: 'Departamento de Planificación y Gestión', descripcion: '', estado: 'ACTIVO' },
]

rows = fildAuditoryRegister(rows);

module.exports = {
  up (queryInterface) {
    return queryInterface.bulkInsert('system_unidad', rows, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      })
  },
  down (queryInterface) {}
}