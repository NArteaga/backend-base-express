'use strict';

const rows = [
  {
    "id" : "25560978-0379-4137-81c2-711801327fcc",
    "codigo_ldap" : 66048,
    "nombre_completo" : "Rodrigo",
    "primer_apellido" : "Beltrán",
    "segundo_apellido" : "Bustos",
    "usuario" : "rbeltran",
    "correo" : "rbeltran@fndr.gob.bo",
    "id_departamento" : "f20b494e-2926-4d01-a17e-8dcfd3b40015",
    "id_rol" : "8db0ee96-0e81-441f-ad33-4f8823980004",
    "estado" : "ACTIVO",
    "_user_created" : "0a31e39e-2659-4d14-befd-79370ddd8483",
    "_user_updated" : null,
    "_user_deleted" : null,
    "_created_at" : "2024-01-25T12:39:06.206Z",
    "_updated_at" : "2024-01-25T12:39:06.207Z",
    "_deleted_at" : null
  },
  {
    "id" : "b9587f8a-2b74-4c96-ab3d-09598c971063",
    "codigo_ldap" : 66048,
    "nombre_completo" : "Fernando",
    "primer_apellido" : "Mita",
    "segundo_apellido" : "Rodriguez",
    "usuario" : "fmita",
    "correo" : "fmita@fndr.gob.bo",
    "id_departamento" : "f20b494e-2926-4d01-a17e-8dcfd3b40001",
    "id_rol" : "8db0ee96-0e81-441f-ad33-4f8823980001",
    "estado" : "ACTIVO",
    "_user_created" : "0a31e39e-2659-4d14-befd-79370ddd8483",
    "_user_updated" : null,
    "_user_deleted" : null,
    "_created_at" : "2024-01-25T18:54:01.184Z",
    "_updated_at" : "2024-01-25T18:54:01.185Z",
    "_deleted_at" : null
  },
  {
    "id" : "c98a3375-66cf-49dc-a3ef-28b14c067f04",
    "codigo_ldap" : 66048,
    "nombre_completo" : "Maria Elena",
    "primer_apellido" : "Angeleri",
    "segundo_apellido" : "Bernal",
    "usuario" : "mangeleri",
    "correo" : "mangeleri@fndr.gob.bo",
    "id_departamento" : "f20b494e-2926-4d01-a17e-8dcfd3b40003",
    "id_rol" : "8db0ee96-0e81-441f-ad33-4f8823980003",
    "estado" : "ACTIVO",
    "_user_created" : "0a31e39e-2659-4d14-befd-79370ddd8483",
    "_user_updated" : null,
    "_user_deleted" : null,
    "_created_at" : "2024-01-25T18:54:58.336Z",
    "_updated_at" : "2024-01-25T18:54:58.337Z",
    "_deleted_at" : null
  },
  {
    "id" : "e53b29c1-ffd7-421d-9d05-17c40abdcaa8",
    "codigo_ldap" : 66048,
    "nombre_completo" : "Fernando Simón",
    "primer_apellido" : "Zambrana",
    "segundo_apellido" : "Sea",
    "usuario" : "fzambrana",
    "correo" : "fzambrana@fndr.gob.bo",
    "id_departamento" : "f20b494e-2926-4d01-a17e-8dcfd3b40004",
    "id_rol" : "8db0ee96-0e81-441f-ad33-4f8823980003",
    "estado" : "ACTIVO",
    "_user_created" : "0a31e39e-2659-4d14-befd-79370ddd8483",
    "_user_updated" : null,
    "_user_deleted" : null,
    "_created_at" : "2024-01-25T18:55:28.068Z",
    "_updated_at" : "2024-01-25T18:55:28.069Z",
    "_deleted_at" : null
  },
  {
    "id" : "7e02e0cd-d6e4-4209-8d27-f01a3e22964f",
    "codigo_ldap" : 512,
    "nombre_completo" : "Cristhian",
    "primer_apellido" : "Vargas",
    "segundo_apellido" : "",
    "usuario" : "cvargas",
    "correo" : "cvargas@fndr.gob.bo",
    "id_departamento" : "f20b494e-2926-4d01-a17e-8dcfd3b40002",
    "id_rol" : "8db0ee96-0e81-441f-ad33-4f8823980003",
    "estado" : "ACTIVO",
    "_user_created" : "0a31e39e-2659-4d14-befd-79370ddd8483",
    "_user_updated" : null,
    "_user_deleted" : null,
    "_created_at" : "2024-01-25T18:55:55.645Z",
    "_updated_at" : "2024-01-25T18:55:55.645Z",
    "_deleted_at" : null
  },
  {
    "id" : "6978d7c0-6a38-4b6d-b8ce-df93deb8a95e",
    "codigo_ldap" : 66048,
    "nombre_completo" : "Monica",
    "primer_apellido" : "Torrez",
    "segundo_apellido" : "Apaza",
    "usuario" : "mtorrez",
    "correo" : "mtorrez@fndr.gob.bo",
    "id_departamento" : "f20b494e-2926-4d01-a17e-8dcfd3b40015",
    "id_rol" : "8db0ee96-0e81-441f-ad33-4f8823980004",
    "estado" : "ACTIVO",
    "_user_created" : "0a31e39e-2659-4d14-befd-79370ddd8483",
    "_user_updated" : null,
    "_user_deleted" : null,
    "_created_at" : "2024-01-25T19:09:17.289Z",
    "_updated_at" : "2024-01-25T19:09:17.290Z",
    "_deleted_at" : null
  },
  {
    "id" : "0a31e39e-2659-4d14-befd-79370ddd8483",
    "codigo_ldap" : 66048,
    "nombre_completo" : "Nicolás Bryan",
    "primer_apellido" : "Arteaga",
    "segundo_apellido" : "Gutiérrez",
    "usuario" : "narteaga",
    "correo" : "narteaga@fndr.gob.bo",
    "id_departamento" : "f20b494e-2926-4d01-a17e-8dcfd3b40015",
    "id_rol" : "8db0ee96-0e81-441f-ad33-4f8823980003",
    "estado" : "ACTIVO",
    "_user_created" : "4c3a74c6-5e24-4bbd-b6dc-c7b718780aa5",
    "_user_updated" : null,
    "_user_deleted" : null,
    "_created_at" : "2024-01-24T22:40:13.556Z",
    "_updated_at" : "2024-01-24T22:40:13.559Z",
    "_deleted_at" : null
  }
]
module.exports = {
  up (queryInterface) {
    return queryInterface.bulkInsert('system_funcionario', rows, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      })
  },
  down (queryInterface) {}
}