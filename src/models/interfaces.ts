export type Rol = 'admin' | 'profesor' | 'alumno';

export interface Usuario {
    id: Number
    nombre : String
    rol : Rol;
    activo : Boolean;
    tieneCoche?: String; // Almacenar marca de coche

}

