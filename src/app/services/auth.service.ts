import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    
  constructor(private http: HttpClient) {
  }
    
  login(email:string, password:string ) {
      return this.http.post<Login>('http://localhost:8082/login', {email, password})
  }
}
