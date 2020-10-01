import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]',
})
export class InputFormatDirective {
  @Input('appInputFormat') format;
  @Input('format') format2;

  /* ElementRef nos da acceso a DOM objects */
  constructor(private el: ElementRef) {}

  /* HostListener sirve para suscribirnos al evento que invoque a este directive, podemos saber todo lo que emite */
  @HostListener('focus') onFocus() {
    console.log(`on focus`);
  }

  @HostListener('blur') onBlur() {
    const value: string = this.el.nativeElement.value;
    if (this.format == 'lowercase') {
      this.el.nativeElement.value = value.toLowerCase();
    }
    else { this.el.nativeElement.value = value.toUpperCase(); }

    if (this.format2 == 'lowercase') {
      this.el.nativeElement.value = value.toLowerCase();
    }
    else { this.el.nativeElement.value = value.toUpperCase(); }
  }
}
