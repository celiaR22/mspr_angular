import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  token = JSON.parse(sessionStorage.getItem('currentUser'));

  getUserByUser() {
    console.log(this.token);

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.jwt}`
    );
    return this.http.get<User>('http://localhost:8082/profile/', { headers });
  }

  updateUser(data: User) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.jwt}`
    );
    return this.http.put<User>(`http://localhost:8082/profile/`, data, {
      headers,
    });
  }
}
