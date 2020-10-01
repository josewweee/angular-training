/* Imports necesarios para el pipe custom */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  /* nombre de como lo invocaremos */
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {
  limit: number;
  /* Siempre debemos tener este metodo, con este devolveremos el valor que nos llega */
  transform(value: string, args?: any, anotherArg?: any) {
    this.limit = args;
    if (!value) { return null; }
    const actualLimit = this.limit ? this.limit : 50;
    /* Retornamos el valor que nos llego, ya modificado por el pipe */
    return value.substr(0, actualLimit) + '...';
  }
}
