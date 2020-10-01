import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
/* ESTE ES UN COMPONENTE RE UTILIZABLE, LO USAREMOS EN MUCHOS LUGARES, POR ESO TIENE INPUT Y OUTPUT */
@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  // template: '<div>lo que sea</div>' USAR ESTE METODO CUANDO TENEMOS MENOS DE 10 LINEAS PA UN COMPONENTE REUTILIZABLE
  styleUrls: ['./favorite.component.sass'],
  /* Segundo acercamiento para recibir parametros desde el component en html, no es tan recomendable, debido a que
  el nombre del string siempre debe ser el mismo en todas partes de la app */
  inputs: ['isFavoriteAlt'],
  /* Esta es la opcion por default, estamos usando el shadowDOM emulado, no el nativo ( poco soporte de browsers)
  para que los styles de este componente no se filtren a todo nuestro proyecto, si no solo a este component */
  encapsulation: ViewEncapsulation.Emulated,
})
export class FavoriteComponent {
  /* Mejor forma para recibir parametros desde el componentent en html cuando es invocado, revisar app.html */
  /* si ponemos el alias, este sera el que ponemos en el html como propiedad para recibir datos, es util para
  tener compnentes re-usables */
  @Input('optional-alias') isFavorite: boolean;
  /* Emitimos una senal cada vez que se ejecute un change, click, etc.. y podemos enviar informacion a quien nos
  use como componentes */
  @Output('change') changeEvent = new EventEmitter();

  /* Segundo acercamiento para recibir parametros desde el component en html */
  isFavoriteAlt: boolean;

  onClick() {
    this.isFavorite = !this.isFavorite;
    /* Aqui emitimos la senal y enviamos algunos datos, que seran usados en app.ts */
    this.changeEvent.emit({
      newValue: this.isFavorite,
    });
  }
}

/* Aplicamos la interfaz, para definir el tipo en app.ts y tener intellisense y compilacion de una */
export interface FavoriteChangeEventArgs {
  newValue: boolean;
}
