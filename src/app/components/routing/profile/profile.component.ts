import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    /* Nos podemos suscribir al paramMap obervable por si hay cambios de la ruta en el mismo componente */
    this.route.paramMap.subscribe((params) => {
      /* Con ese + al frente, convertivos el string que se retorna en un int */
      const id = +params.get('id');
    });

    /* Tambien podemos utilizar solo el snapshot por si no hay cambios de ruta en el mismo componente, esto asi buscara en cada onInit */
    this.route.snapshot.paramMap.get('id');
  }

  // navigation
  submit() {
    this.router.navigate(['/followers'], {
      queryParams: { page: 1, order: 'newest' },
    });
  }
}
