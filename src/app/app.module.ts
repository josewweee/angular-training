import { CrudDataService } from './services/crud-data-service.service';
import { AppErrorHandler } from './validators/app-error-handler';
import { PostsService } from './services/posts.service';
import { SummaryPipe } from './pipes/summary.pipe';
import { EmailService } from './services/email.service';
import { CourseService } from './services/courses.service';
import { CoursesComponent } from './components/courses-bindings/courses.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteComponent } from './components/favorite-reusable-component/favorite.component';
import { PanelComponent } from './components/panel-ngcontent/panel.component';
import { DirectivesComponent } from './components/directives/directives.component';
import { InputFormatDirective } from './directives/input-format.directive';
import { FormsComponent } from './components/forms/forms.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { HttpComponent } from './components/http/http.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/routing/home/home.component';
import { ProfileComponent } from './components/routing/profile/profile.component';
import { NotFoundComponent } from './components/routing/not-found/not-found.component';
import { FollowersComponent } from './components/routing/followers/followers.component';

@NgModule({
  /* Se declaran en declarations, componentes, pipes y custom directives */
  declarations: [
    AppComponent,
    CoursesComponent,
    SummaryPipe,
    FavoriteComponent,
    PanelComponent,
    DirectivesComponent,
    InputFormatDirective,
    FormsComponent,
    ReactiveFormComponent,
    HttpComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    FollowersComponent,
  ],
  /* Angular para ser mas optimo funciona por modulos, solo debemos de importar los modulos que nos sirven */
  /* en imports, todos los imports de angular, si sale algun error diciendo que no encontramos la propiedad,
  es por que falta un import */
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      /* Recordemos que el orden si importa, asi que las rutas mas especificas deben de ir primero  */
      { path: '', component: HomeComponent },
      { path: 'followers/:id/:username', component: ProfileComponent },
      { path: 'followers', component: FollowersComponent },
      { path: 'posts', component: HttpComponent },
      /* Ese soble asterisco significa cualquier ruta, este es el default */
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  /* Los providers se instancian 1 sola vez para todos los componentes de este modulo, usa el patron SINGLETON, aca metemos las librerias */
  providers: [
    CourseService,
    EmailService,
    PostsService,
    CrudDataService,
    /* Con este objeto de abajo le decimos a angular que en vez de usar ErrorHandler (clase default para errores)
    vamos a utilizar AppErrorHandler, la clase que creamos pa manejar errores, y claro, lo pasamos como singleton */
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
