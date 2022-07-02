import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Manager} from '../models/manager.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): User {
    const user = new User();
    return user;
  }


}
