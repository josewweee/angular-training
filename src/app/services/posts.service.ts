import { CrudDataService } from './crud-data-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/* Aqui extendemos del crud, para poder usar todos sus metodos, pero con un url especifico, para cada
nuevo url, lo mejor es crear una clase de estas nuevas, o implementar metodos nuevos aqui */
export class PostsService extends CrudDataService {
  constructor(http: HttpClient) {
    super(http, `https://jsonplaceholder.typicode.com/posts`);
  }
}
