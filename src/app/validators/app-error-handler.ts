import { ErrorHandler } from '@angular/core';

/* Creamos un error handler Global, para manejar lo que se hara con todos los errores que no esperabamos,
no los 404 o 400, si no cualquier otra cosa que pueda salir, aca podemos elegir si mostrar un toast, etc... */
export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    alert(`An unexpected error occurred.`);
    console.log(error);
  }
}
