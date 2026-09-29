import { CRMController } from "./controllers/crm.controller";
import type { Usuario } from "./models/interfaces";

// Instanciamos el motor (creamos el objeto en memoria)
const miEscuelaCRM = new CRMController("1.0.0");
let todoslosUsuarios: Usuario[] = [];

async function leerTodosLosUsuarios() {
  console.log("Leyendo todos los usuarios del centro...");
  todoslosUsuarios = await miEscuelaCRM.leerTodosAsync();
  console.log("Usuarios leídos:", todoslosUsuarios);
}
miEscuelaCRM.filtrarUsuariosPorRol("profesor");

leerTodosLosUsuarios();

async function pintarUsuariosEnPantalla(): Promise<void> {
const contenedor = document.getElementById("listaUsuarios") as HTMLDivElement;
if (!contenedor) return;
contenedor.innerHTML = ""; // Limpiamos el contenedor antes de pintar
const usuarios = await miEscuelaCRM.leerTodosAsync();
contenedor.innerHTML = usuarios
}

async function addUsuario() {
  console.log("Agregando un nuevo usuario...");
  let guardaConExito = false;
  guardaConExito = await miEscuelaCRM.registrarUsuarioAsync({
    id: 4,
    nombre: "Ana Torres",
    rol: "alumno",
    activo: true,
  });
  if (guardaConExito) {
    console.log("Usuario agregado con éxito.");
  } else {
    console.log("Error al agregar el usuario.");
  }
}

async function testRegistrarSancion() {
  try {
    console.log("Iniciando proceso de sanción...");

    // Esperamos la operación asíncrona del CRM
    await miEscuelaCRM.registrarSancionAsync(
      "3", // ID del alumno (ej: Carlos García)
      "2", // ID del profesor (ej: María López)
      "comportamiento",
      "Interrumpir reiteradamente la explicación en clase.",
    );

    console.log("Operación asíncrona completada con éxito.");
  } catch (error) {
    console.error("Ocurrió un error al registrar la sanción:", error);
  }
}

// Ejecutamos la prueba
testRegistrarSancion();

addUsuario();

console.log("Versión del CRM:", miEscuelaCRM.verVersion());
// Usamos sus métodos
const profesores = miEscuelaCRM.filtrarUsuariosPorRol("profesor");

console.log("Profesores del centro:", profesores);

miEscuelaCRM.agregarUsuario({
  id: 7,
  nombre: "Carlos Ruiz",
  rol: "profesor",
  activo: true,
});
