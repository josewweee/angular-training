/* Aqui podemos poner variables como nuevas bases de datos, o nuevos colores, que usaremos cuando
estemos en modo produccion, o tambien en enviroment.ts podemos hacer lo mismo pero para cuando estemos
en modo de develop */

/* Si queremos agregar un enviroment para test o algo mas, podemos crear el file.test.ts y registrarlo en
angular-setting.json, OJO QUE TODOS LOS ENVIROMENT DEBEN TENER LAS MISMAS PROPIEDADES */
export const environment = {
  production: true,
};
