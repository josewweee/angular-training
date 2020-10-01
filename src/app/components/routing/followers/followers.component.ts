import { FollowersService } from './../../../services/followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.sass'],
})
export class FollowersComponent implements OnInit {
  followers: any;

  constructor(
    private service: FollowersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // tenemos 2 observables con parametros tanto normales como query, pero seria mejor juntarlos en 1 solo observable
    // this.route.paramMap.subscribe((params) => {});
    /* Asi tomamos los queryParams, los opcionales del ? */
    // this.route.queryParamMap.subscribe((params) => {});

    // this.route.snapshot.queryParamMap.get('page'); TAMBIEN POSIBLE, AUNQUE PARA PAGINATION HAY QUE UTILIZAR EL OBERVABLE

    // podemos combinar de esta forma varios observables en 1 arreglo de observables al cual nos podemos suscribir, para simplificar todo
    const observableCombined = combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
    ]);
    /* FORMA 1, UN MAP QUE NOS HAGA LAS OPERACIONES NECESARIAS, NOS RETORNE 1 OBSERVABLE DEL UNICO TIPO QUE
    NECESITAMOS Y LUEGO AL FINAL LLAMAMOS 1 SOLO SUSCRIBE */
    observableCombined
      .pipe(
        // pasamos de recibir un paramMap[] del combineLatest de 2 observables paramMap a retornar 1 solo obserbavle<any> de tipo any que es el del
        // service, ya que ya hicimos el trabajo que necesitabamos con el paramMap, esto lo hace el swtichMap, el map retorna un observable<observable<any>>
        // una matriz
        switchMap((combined) => {
          const id = combined[0].get('id');
          const page = combined[1].get('page');
          // podriamos ya hacer la llamada al server pa que nos envie segun la info de los parametros que tomamos del observer y esto seria dinamico
          // this.service.getAll({id: id, page: page})

          // en este ejemplo llamaremos todo de igual forma

          return this.service.getAll();
        })
      )
      .subscribe((followers) => (this.followers = followers));
  }

  /* FORMA 2 UN SUSCRIBE, DENTRO DE UN SUSCRIBE, ESTO SE VE FEO Y ES DURO DE ENTENDER */
  // nos suscribimos a un arreglo de observables y ya podremos tomar informacion de cada uno
  /* observableCombined.subscribe((combined) => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');
      //podriamos ya hacer la llamada al server pa que nos envie segun la info de los parametros que tomamos del observer y esto seria dinamico
      //this.service.getAll({id: id, page: page})

      //en este ejemplo llamaremos todo de igual forma
      this.service
        .getAll()
        .subscribe((followers: any[]) => (this.followers = followers));
    });
  } */
}
