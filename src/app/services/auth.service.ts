import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<User>('http://localhost:8082/login', { email, password })
  }
}