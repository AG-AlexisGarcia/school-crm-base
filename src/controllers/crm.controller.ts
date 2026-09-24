import type { Rol, Usuario } from '../models/interfaces';

export class CRMController {
    // Propiedades
    public usuariosDelCentro: Usuario[] = [];
    private readonly CLAVE_STORAGE = 'school-crm-usuarios';

    //constructor
    constructor() {
        // Cargar usuarios desde localStorage si existen, de lo contrario inicializar con datos por defecto
        const usuariosGuardados = localStorage.getItem(this.CLAVE_STORAGE);
        if (usuariosGuardados) {
            this.usuariosDelCentro = JSON.parse(usuariosGuardados);
        } else {
        this.usuariosDelCentro = [
            { id: 1, nombre: 'Ana Martínez', rol: 'profesor', activo: true, tieneCoche: 'Toyota' },
            { id: 2, nombre: 'Carlos Soler', rol: 'alumno', activo: true },
            { id: 3, nombre: 'Lucía Gómez', rol: 'admin', activo: false },
            { id: 4, nombre: 'María López', rol: 'profesor', activo: true },
            { id: 5, nombre: 'Javier Torres', rol: 'alumno', activo: false },
            { id: 6, nombre: 'Laura Fernández', rol: 'alumno', activo: true },
            
        ];


    }
}
    // Métodos La funcion de ayer que estaba en main convertida en metodo de la clase CRMController
    filtrarUsuariosPorRol(rolRuscado: Rol): Usuario[] {
        // Filtra los usuarios del centro por el rol especificado
        // Usamos this para refernciar la propiedad usuariosDelCentro de la clase
        return this.usuariosDelCentro.filter(usuario => usuario.rol === rolRuscado );
    }
    //Agregar usuarios, recibe un nuevo usuario y lo agrega al array de usuariosDelCentro comprobando que el id no exista ya en el array
    agregarUsuario(nuevoUsuario: Usuario): void {
        const usuarioExistente = this.usuariosDelCentro.find(usuario => usuario.id === nuevoUsuario.id);
        if (usuarioExistente) {
            console.log(`El usuario con id ${nuevoUsuario.id} ya existe.`);
        } else {
            this.usuariosDelCentro.push(nuevoUsuario);
            console.log(`Usuario con id ${nuevoUsuario.id} agregado correctamente.`);
        }
        this.guardarUsuariosEnStorage(); // Guardar en localStorage después de agregar un usuario
    }


    private guardarUsuariosEnStorage(): void {
        localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(this.usuariosDelCentro));
    }


}