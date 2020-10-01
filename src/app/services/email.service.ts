import { CourseService } from './courses.service';
/* Este injectable, es para poder inyectar instancias de dependencias en el constructor de esta clase
este injectable no toca ser declarado en los componentes, por que ya Component, viene con el injectable por dentro */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  /* el injectable es para poder invocar por ejemplo, la instancia de courseService aqui */
  constructor(course: CourseService) {}
}
