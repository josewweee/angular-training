/* Creamos una clase para remplazar el Response en el componente http, de forma que no rompamos el separation
of concerns, y el componente http, no toque nada de request http, eso lo hace el service */
export class AppError {
  constructor(public originalError?: any) {}
}
