import { NotFoundError } from './../../validators/not-found-error';
import { BadInput } from './../../validators/bad-input';
import { AppError } from './../../validators/app-error';
import { PostsService } from '../../services/posts.service';
import { Component, OnInit } from '@angular/core';
/* SEPRAMOS LAS LLAMADAS HTTP EN EL SERVIDE POR EL PRINCIPIO DE SEPARATION OF CONCERNS, EN DONDE CADA CLASE DEBE DE ENCARGASE DE SOLO
1 COSA, Y ESTA CLASE SE ENCARGA DE RENDERIZAR, EL CRUD-POST SERVICE SE ENCARGA DE LAS LLAMADAS */
@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.sass'],
})
export class HttpComponent implements OnInit {
  posts: any;

  constructor(private service: PostsService) {}

  ngOnInit(): void {
    /* Lo que nos llega del suscribe ya es la respuesta en un array de objetos */
    this.service.getAll().subscribe((posts) => {
      this.posts = posts;
      console.log(this.posts);
    });
  }

  /* Es una buena practica poner el tipo de elemento que nos llega */
  createPost(input: HTMLInputElement) {
    /* Creamos el nuevo objeto y lo mostramos en la UI antes de que llegue al servidor, para que se vea mas rapido pal usuario.
    Esto es un acercamiento optimista debido a que si hay fallos (no problable) nos toca hacer un rollback de esto. */
    const post = {
      title: input.value,
    };
    this.posts.splice(0, 0, post);

    /* Limpiamos el input */
    input.value = '';

    this.service.create(post).subscribe(
      (newPost) => {
        /* Agregamos el id que nos responde el post al objeto */
        post['id'] = newPost['id'];
        /* Agregamos al comienzo del array el nuevo post, Asi se agrega al comienzo.
        Esto es un acercamiento persimista, ya que actualizamos la UI luego de que el servidor nos responde*/

        // this.posts.splice(0, 0, post);
      },
      /* Los errores nos llegan de tipo appError, pero adicionalmente pueden ser de su hijo badInput, asi que de una vez preguntamos pa saber que tipo
      de error es */
      (error: AppError) => {
        // Removemos el objeto que agregamos inicialmente si hay un error, esto es un ROLLBACK del acercamiento optimista
        this.posts.splice(0, 1);

        if (error instanceof BadInput) {
          // Podemos de una vez mostrar errores en un form, si tuvieramos uno
          // this.form.setErrors(error.originalError)
        } else {
          /* Hacemos un re throw del error para que sea manejado por el manejador default de errores de angular
          pero en este caso, como remplzamos el manejador default de errores de angular en app.module, este error sera manejado por nuestra clase
          app-error-handler */
          throw error;
        }
      }
    );
  }

  updatePost(post) {
    this.service.update(post).subscribe((updatedPost) => {
      console.log(updatedPost);
    });
  }

  deletePost(post) {
    // Acercamiento optimista, estamos removiendo antes de confirmar, si hay algun problema en el servidor, hacemos rollback
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id).subscribe(
      () => {
        // ACERCAMIENTO PESIMISTA
        // let index = this.posts.indexOf(post);
        // this.posts.splice(index, 1);
        null;
      },
      (error: AppError) => {
        // ROLLBACK del acercamiento optimista
        this.posts.splice(index, 0, post);

        if (error instanceof NotFoundError) {
          alert(`This post has already been deleted`);
        } else {
          /* Hacemos un re throw del error para que sea manejado por el manejador default de errores de angular
          pero en este caso, como remplzamos el manejador default de errores de angular en app.module, este error sera manejado por nuestra clase
          app-error-handler */
          throw error;
        }
      }
    );
  }
}
