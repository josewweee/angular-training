import { CourseService } from '../../services/courses.service';
import { Component } from '@angular/core';

@Component({
  selector: 'courses',
  template: `<h1>Bindings y Pipes</h1>
    <ul>
      <li *ngFor="let course of courses">
        {{ course }}
      </li>
    </ul>
    <h3>
      one way binding usando brakets o usando property binding [propiedad]
    </h3>
    <!-- interpolacion en 1 camino, hay 2 formas de hacerlo -->
    <p>{{ title }}</p>
    <p [textContent]="title"></p>
    <img [src]="imageUrl" />
    <img src="{{ imageUrl }}" />
    <table>
      <tr>
        <!-- Usamos el attr, ya que aqui estamos es modificando el DOM, no un elemento de html, por lo que hay un 1% de atributos con exepciones
      que no estan en el DOM y si en el html, pa estos casos ponemos attr. para evitar el error de unkown attribute in <td> -->
        <td [attr.colspan]="colspan"></td>
      </tr>
    </table>
    <h3>class binding, [class.active], etc... , va con un condicional</h3>
    <!-- Si la condicion es true, agregamos la clase luego del class.*esta* -->
    <button class="btn btn-primary" [class.active]="isActive">
      class binding
    </button>
    <div (click)="wontWorkCuzNoBubbling()"></div>
    <button
      class="btn btn-primary"
      [class.backgroundColor]="isActive ? 'blue' : 'white'"
      (click)="eventNoBubbling($event)"
    >
      inline style binding y no bubbling
    </button>
    <h3>keyup.enter / template variable, one way binding y two way bindings</h3>
    <!-- Ejecutamos la funcion cuando se este en focus en el input y se apriete ENTER -->
    <!-- ese #TEXT es un template variable, para usar el valor del input -->
    <input #text (keyup.enter)="onKeyUp(text.value)" />
    <!-- Otro metodo de 1 way binding, property binding -->
    <input
      [value]="texto"
      (keyup.enter)="texto = $event.target.value; onKeyUp2()"
    />

    <!-- Conectamos una variable con el value del input, nos toca agregar el modulo de FORMS en app.module, en imports -->
    <input [(ngModel)]="twoWayBinding" (keyup.enter)="onKeyUpTwoWay()" />
    <h3>Pipes, para modificar el output, build in y custom</h3>
    <!-- PIPES, transforman el contenido final que se le da al cliente, los pipes buildin de angular, son:  -->
    <div>
      {{ course.title | uppercase | lowercase }} <br />
      <!-- Los pipes van en orden de izq a derecha, (esto sera lowercase al final) -->
      {{ course.students | number }} <br />
      <!-- Ponemos la , y el punto como debe de ser -->
      {{ course.rating | number: '2.1-2' }} <br />
      <!-- : 'OPCIONES DEL PIPE', 2 enteros y min 1 decimal, maximo 2 -->
      {{ course.price | currency: 'COP':false:'3.0-3' }} <br />
      <!-- Opciones: currency, simbolo de plata, enteros y decimales -->
      {{ course.releaseDate | date: 'shortDate' }} <br />
      <!-- Formateamos el date, hay muchas opciones pa esto -->
    </div>
    <!-- Pipe custom, cortamos el texto -->
    <div>
      {{ longText | summary: 10 }}
    </div> `,
})
export class CoursesComponent {
  title = 'courses';
  imageUrl = 'http://lorempixel.com/400/200';
  colspan = 2;
  courses;
  isActive = true;
  twoWayBinding = 'two way binding';
  course = {
    title: 'The complete Jose Guide',
    rating: 4.9745,
    students: 30123,
    price: 187245,
    releaseDate: new Date(2020, 3, 1),
  };
  texto = 'text one way';
  longText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`;
  /* Metodo bueno, para hacer el desacoplado del servicio y poder testearlo facilmente en unit testing */
  /* Esto se llama dependency inyection, angular primero instancia el SINGLETON goodService, y luego lo inyecta en el constructor de este componente */
  constructor(goodService: CourseService) {
    /* Mala implementacion, queda muy acoplado al servicio para unit test y si se modifica el constructor del servicio, toca
    modificarlo manual aca */
    const service = new CourseService();
    this.courses = service.getCourses();
  }

  eventNoBubbling($event) {
    /* Tambien podemos llamar el evento */
    $event.stopPropagation();
    console.log(`el evento es`, $event);
  }

  wontWorkCuzNoBubbling() {
    console.log(`estamos dejando el bubbling`);
  }

  /* Aca obvio tambien podemos usar $event.target.value, pero esto es mas limpio, este es un BINDING 1 WAY*/
  onKeyUp(text) {
    console.log(`se presiono ENTER con input de ${text}`);
  }

  onKeyUp2() {
    console.log(`se presiono ENTER con input de ${this.texto}`);
  }

  onKeyUpTwoWay() {
    console.log(`two way binding con: ${this.twoWayBinding}`);
  }
}
