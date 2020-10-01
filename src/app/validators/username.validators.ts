import { AbstractControl, ValidationErrors } from '@angular/forms';
/* ES mejor poner esto en una carpeta llamada common/validators al mismo nivel que components */
export class UsernameValidators {
  /* Aplicamos static, para llamar a este metodo de una, sin crear una nueva instancia de la clase con new */
  /* Aqui podemos crear metodos para hacer evaluaciones mas profundas y luego retornar un error */
  /* Esos 2 puntos y lo que sigue desp de la funcion, es una especificacion del tipo de dato que retornamos */
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    /* Podemos retornar objetos con detalles del error, para mostrarle al usuario mas informacion */
    /*  return { minLength: {
        requiredLength: 3,
        actualLength: control.value.length
      }} */
    return null;
  }

  static asyncValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'jose') { resolve({ asyncValidator: true }); }
        else { resolve(null); }
      }, 2000);
    });
  }
}
