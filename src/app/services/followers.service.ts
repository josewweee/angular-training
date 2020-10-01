import { CrudDataService } from './crud-data-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FollowersService extends CrudDataService {
  constructor(http: HttpClient) {
    super(http, 'https://api.github.com/users');
  }
}
