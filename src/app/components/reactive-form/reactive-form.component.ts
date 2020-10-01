import { UsernameValidators } from '../../validators/username.validators';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.sass'],
})
export class ReactiveFormComponent implements OnInit {
  /* el get del topics y un casting a formArray para tener intellisense y evitarnos errores */
  get topics() {
    return this.ractiveFormArray.get('topics') as FormArray;
  }

  /* Usamos el get, para no escribir tanto en el html, mejor solo invocamos el username, la ruta va asi, ya que esta anidado dentro del account formGroup */
  /* Recordemos, que field es una variable normal y property es como una variable con get y setters */
  get username() {
    return this.reactiveForm.get('account.username');
  }
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      contact: fb.group({
        email: [],
        phone: [],
      }),
      topics: fb.array([]),
    });
  }
  reactiveForm = new FormGroup({
    /* Podemos agrupar formControls dentro de 1 formGroup para mas orden */
    account: new FormGroup({
      /* este validators, no tuvo que ser llamado usando new Validators por que es una funcion estatica */
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          UsernameValidators.cannotContainSpace,
        ],
        UsernameValidators.asyncValidator
      ),
      password: new FormControl('', Validators.required),
    }),
  });
  /* FORM ARRAY ---------- Podemos tener un array de objetos en un form, de esta manera */
  ractiveFormArray = new FormGroup({
    topics: new FormArray([]),
  });

  /* Form builder ------- otra forma de armar los formGroups, es un poco mas limpia*/
  form;
  /* cada objeto que le enviamos es un formControl, htmlInputElement es lo que se recibe de un input */
  addTopic(topic: HTMLInputElement) {
    this.topics.push(new FormControl(topic.value));
    topic.value = '';
  }
  /* Eliminamos un objeto de forma normal usando un array */
  removeTopic(topic: FormControl) {
    const index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }

  login() {
    // this.username.setErrors({})  PODEMOS ASIGNAR ERRORES POR APARTE
    // Podemos crear nuevos errores para el form completo por aparte, para utilizarlo en el momento de submit
    this.reactiveForm.setErrors({
      invalidLogin: true,
    });
  }

  ngOnInit(): void {}
}
