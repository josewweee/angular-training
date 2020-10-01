import { Component } from '@angular/core';
import { FavoriteChangeEventArgs } from './components/favorite-reusable-component/favorite.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'hello-world';

  post = {
    title: 'post',
    isFavorite: true,
  };

  /* los args llegan de la senal emitida en favotite, change */
  onFavoriteChange(eventArgsFromFavorite: FavoriteChangeEventArgs) {
    console.log(`Favorite change:`, eventArgsFromFavorite);
  }
}
