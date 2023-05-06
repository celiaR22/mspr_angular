import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  login(data: User): Observable<User> {
    const password = data.password
    const email = data.email
    return this.http.post<User>('http://localhost:8082/login', { email, password })
  }

  signup(data: User) {
    const lastname_user = data.lastname;
    const firstname_user = data.firstname;
    const birthdate_user = data.birthdate;
    const email_user = data.email;
    const phone_user = data.phone;
    const password_user = data.password;
    return this.http.post<User>('http://localhost:8082/signup', { lastname_user, firstname_user, birthdate_user, email_user, phone_user, password_user })
  }

}