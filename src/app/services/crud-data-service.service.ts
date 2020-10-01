import { NotFoundError } from '../validators/not-found-error';
import { AppError } from '../validators/app-error';
import { BadInput } from '../validators/bad-input';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

/* ACA usaremos Observables en vez de promises por que los observables nos dan la posibilidad de usar un monton de operators, como map, retry, etc...
en 1 linea de codigo, esto se llama ReactiveProgramming o rxjs
que las promises no tienen, nota: los Observables son lazy, asi que no haran nada hasta que nos suscribamos a ellos, las promesas ejecutan de una  */
export class CrudDataService {
  constructor(private http: HttpClient, private url: string) {
    /* El constructor lo debemos dejar lo mas vacio posible, hagamos las llamdas http en el ngOnInit method, esto es por convencion */
  }

  getAll() {
    /* En angular el fetch es cambiado por un get */
    /* Llamamos la funcion que comprueba errores, que es generica, debe de ir dentro del pipe y ya no es catch, si no, catchError,
    esto es solo con observables. */
    /* El map se encarga de transformar el response que nos dan en un array de objetos, para que no tegamos ese response en el
    componente que utiliza este metodo, POR AHORA NO HACE NADA, POR QUE EL GET NOS RESPONDE CON UN OBJETO, PERO SI NO FUERA ASI
    USARIAMOS RESPONSE.JSON() */
    return this.http.get(this.url).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  create(resource) {
    /* Hacemos un post, al url, enviamod un json del objeto a enviar */
    return this.http.post(this.url, JSON.stringify(resource)).pipe(
      /* revisamos si hay algun error, usando el pipe y luego el catchError */
      map((response) => response),
      catchError(this.handleError)
    );
  }

  update(resource) {
    // modificamos solo unas propiedades, para mejor performance
    return this.http
      .patch(this.url + `/${resource.id}`, JSON.stringify({ isRead: true }))
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
    // modificamos todo el objeto
    // this.http.put(this.url, JSON.stringify(post));
  }

  delete(id) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }
  /* Metodo para manejar errores y no repetir codigo en cada funcion. Private, por que solo se usa en esta clase */
  private handleError(error: Response) {
    /* 404 significa que el servidor nos respondio con que se hizo un bad request, estos errores se deben evaluar todos aqui */
    if (error.status === 404) {
      /* Creamos un nuevo observable que solo tiene 1 error de tipo badInput, notFoundError o appError, 3 clases que creamos
      para no trabajar con el tipo Response en nuestra app, si no para trabjar con clases de nuestro dominio y dejar el response pa este servicio,
      ya que este se encarga de las http */
      return throwError(new BadInput(error.json()));
    }
    if (error.status === 404) {
      /* Aca no enviamos el error, ya que sabemos que el 404 es que no se encuentra, no hay necesitad de logearlo */
      return throwError(new NotFoundError());
    }
    /* Aca enviamos el error para despues logearlo y ver que paso */
    return throwError(new AppError(error.json()));
  }
}
