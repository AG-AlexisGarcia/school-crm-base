import { CRMController } from "./controllers/crm.controller";
import type { Usuario } from "./models/interfaces";

const miEscuelaCRM = new CRMController();

//Usamos los metodos

const profesores = miEscuelaCRM.filtrarUsuariosPorRol('profesor');

// Llamamos al metodo agregarUsuario para agregar un nuevo usuario

const nuevoUsuario: Usuario = { id: 7, nombre: "María García", rol: "profesor", activo: true };
miEscuelaCRM.agregarUsuario(nuevoUsuario);
console.log('Profesores:', profesores);