import {CRMController} from './controllers/crm.controller';

// Instanciamos el motor (creamos el objeto en memoria)
const miEscuelaCRM = new CRMController("1.0.0");


 async function addUsuario() {
    console.log("Agregando un nuevo usuario...");
    let guardaConExito =  false;
    guardaConExito = await miEscuelaCRM.registrarUsuarioAsync({ id: 4, nombre: "Ana Torres", rol: "alumno", activo: true });
    if (guardaConExito) {
        console.log("Usuario agregado con éxito.");
    } else {
        console.log("Error al agregar el usuario.");
    }
}

async function testRegistrarSancion() {
  try {
    console.log('Iniciando proceso de sanción...');

    // Esperamos la operación asíncrona del CRM
    await miEscuelaCRM.registrarSancionAsync(
      '3', // ID del alumno (ej: Carlos García)
      '2', // ID del profesor (ej: María López)
      'comportamiento',
      'Interrumpir reiteradamente la explicación en clase.'
    );

    console.log('Operación asíncrona completada con éxito.');
  } catch (error) {
    console.error('Ocurrió un error al registrar la sanción:', error);
  }
}

// Ejecutamos la prueba
testRegistrarSancion();

addUsuario();

console.log("Versión del CRM:", miEscuelaCRM.verVersion());
// Usamos sus métodos
const profesores = miEscuelaCRM.filtrarUsuariosPorRol("profesor");


console.log("Profesores del centro:", profesores);

miEscuelaCRM.agregarUsuario({ id:7, nombre: "Carlos Ruiz", rol: "profesor", activo: true });