import { Component, OnInit } from '@angular/core';
import { FavoriteChangeEventArgs } from '../../favorite-reusable-component/favorite.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  title = 'hello-world';

  post = {
    title: 'post',
    isFavorite: true,
  };

  ngOnInit(): void {}

  /* los args llegan de la senal emitida en favotite, change */
  onFavoriteChange(eventArgsFromFavorite: FavoriteChangeEventArgs) {
    console.log(`Favorite change:`, eventArgsFromFavorite);
  }
}
