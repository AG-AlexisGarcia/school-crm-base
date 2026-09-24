/* export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
} */

import type { Usuario, Rol } from './models/interfaces';

export function devueleAlumno(usuariosDelCentro: Usuario[], id: number, rol: Rol): Usuario | undefined {
  return usuariosDelCentro.find(usuario => usuario.id === id && usuario.rol === rol)

}

