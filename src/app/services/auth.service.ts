import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  login(data: User): Observable<User> {
    const password = data.password;
    const email = data.email;
    return this.http.post<User>('http://localhost:8082/login', { email, password }).pipe(map(user => {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }))
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
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