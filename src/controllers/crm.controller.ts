import type { Usuario, Rol } from "../models/interfaces";
import type { Sancion } from "../models/interfaces";

export class CRMController {
  // Propiedades
  private usuariosDelCentro: Usuario[] = [];
  private sancionesDelCentro: Sancion[] = [];
  private readonly CLAVE_STORAGE = "school-crm-usuarios";
  private readonly CLAVE_SANCIONES = "school_crm_sanciones"; // 👈 Clave solicitada

  constructor(private version: string) {
    const datosLocales = localStorage.getItem(this.CLAVE_STORAGE);
    if (datosLocales) {
      this.usuariosDelCentro = JSON.parse(datosLocales);
    } else {
      this.usuariosDelCentro = [
        { id: 1, nombre: "Juan Pérez", rol: "admin", activo: true },
        { id: 2, nombre: "María López", rol: "profesor", activo: true },
        { id: 3, nombre: "Carlos García", rol: "alumno", activo: true },
      ];
    }

    const sancionesLocales = localStorage.getItem(this.CLAVE_SANCIONES);
    if (sancionesLocales) {
      this.sancionesDelCentro = JSON.parse(sancionesLocales);
    }
  }
  

  public registrarUsuarioAsync(usuario: Usuario): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(
        `[NETWORK]: Conectando con el servidor escolar para registrar a ${usuario.id}...`,
      );

      // Simulamos un retraso de red de 2 segundos (2000 milisegundos)
      setTimeout(() => {
        const nuevoUsuario: Usuario = {
          id: usuario.id, // Genera un ID único aleatorio nativo de la plataforma web
          nombre: usuario.nombre,
          rol: usuario.rol,
          activo: usuario.activo,
        };

        this.usuariosDelCentro.push(nuevoUsuario);
        this.guardarEnDisco(); // Guardamos los cambios en localStorage
        

        // La operación ha terminado con éxito: resolvemos la promesa
        resolve(true);
      }, 2000);
    });
  }

  public registrarSancionAsync(
    alumnoId: string,
    profesorId: string,
    tipo: 'comportamiento' | 'expulsion',
    descripcion: string
  ): Promise<void> {
    return new Promise((resolve) => {
      console.log(`[NETWORK]: Conectando para registrar sanción al alumno ${alumnoId}...`);

      // Simulamos el retardo de red de 1.5 segundos (1500 ms)
      setTimeout(() => {
        // Leemos las sanciones previas de school_crm_sanciones
        const sancionesGuardadas = localStorage.getItem(this.CLAVE_SANCIONES);
        const listaSanciones: Sancion[] = sancionesGuardadas
          ? JSON.parse(sancionesGuardadas)
          : [];

        // Creamos el nuevo registro
        const nuevaSancion: Sancion = {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          alumnoId,
          profesorId,
          tipo,
          descripcion,
          fecha: new Date().toISOString(),
        };

        // Añadimos y guardamos en LocalStorage
        listaSanciones.push(nuevaSancion);
        this.guardarEnDisco(); // Guardamos las sanciones actualizadas en localStorage
        console.log(`✅ Sanción registrada en ${this.CLAVE_SANCIONES}:`, nuevaSancion);

        // Resolvemos la promesa sin devolver valor (Promise<void>)
        resolve();
      }, 1500);
    });
  }

  // Métodos: El mismo método , devuelve la lista de usuarios como promesa, con un retardo de 2 segundos para simular la llamada a un servidor remoto.
  filtrarUsuariosPorRol(rolBuscado: Rol): Promise<Usuario[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.usuariosDelCentro.filter(
          (usuario) => usuario.rol === rolBuscado,
        ));
      }, 2000);
    });
  }

  actualizaVersion(nuevaVersion: string): void {
    this.version = nuevaVersion;
  }


  verVersion(): string {
    return this.version;
  }
  // 🚀 RESOLUCIÓN DEL RETO EXPRESS
  public agregarUsuario(nuevoUsuario: Usuario): void {
    // 1. Validamos si el ID ya existe en nuestro array privado
    const idDuplicado = this.usuariosDelCentro.some(
      (user) => user.id === nuevoUsuario.id,
    );

    if (idDuplicado) {
      console.error(
        `❌ Error: El usuario con ID [${nuevoUsuario.id}] ya existe en el SchoolCRM.`,
      );
      return; // Cortamos la ejecución para no añadirlo
    }

    // 2. Si no está duplicado, lo añadimos de forma segura
    this.usuariosDelCentro.push(nuevoUsuario);
    console.log(`✅ Usuario ${nuevoUsuario.nombre} añadido correctamente.`);
    this.guardarEnDisco(); // Guardamos los cambios en localStorage
  }
  //metodo llamado leerTodosAsync que devuelva una promesa que resuelva con todos los usuarios del centro con un retardo de 2 segundos (simulando una llamada a un servidor remoto). El método debe ser público y devolver una promesa que resuelva con un array de usuarios.
  public leerTodosAsync(): Promise<Usuario[]> {
    return new Promise((resolve) => {
      console.log("[NETWORK]: Conectando con el servidor escolar para leer todos los usuarios...");
      setTimeout(() => {
      resolve(this.usuariosDelCentro);
      }, 2000);
    });
  }

  // Método privado para guardar en localStorage
  private guardarEnDisco(): void {
    localStorage.setItem(
      this.CLAVE_STORAGE,
      JSON.stringify(this.usuariosDelCentro),
    );
    // Guardamos también las sanciones en localStorage
    localStorage.setItem(
      this.CLAVE_SANCIONES,
      JSON.stringify(this.sancionesDelCentro),
    );
  }
}