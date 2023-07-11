import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInformation } from '../models/user';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserInformation>;
  public currentUser: Observable<UserInformation>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserInformation>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }


  login(data: UserInformation): Observable<UserInformation> {
    console.log(JSON.parse(sessionStorage.getItem('currentUser')))
    const password = data.password;
    const email = data.email;
    return this.http
      .post<UserInformation>('http://localhost:8082/login', { email, password })
      .pipe(
        map((user) => {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    const token = JSON.parse(sessionStorage.getItem('currentUser'));
    // sessionStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.jwt}`
    });
    return this.http.post<UserInformation>('http://localhost:8082/logout', {}, { headers });
    // const token = JSON.parse(sessionStorage.getItem('currentUser'));
    // const headers = new HttpHeaders()
    //   .set('Authorization', `Bearer ${token.jwt}`)
    // console.log(token.jwt)
    // console.log
    // // sessionStorage.removeItem('currentUser');
    // // this.currentUserSubject.next(null);
    // // this.router.navigate(['/login']);
    // return this.http.post<UserInformation>(`http://localhost:8082/logout`, { headers })
  }

  signup(data: UserInformation) {
    const lastname_user = data.lastname;
    const firstname_user = data.firstname;
    const birthdate_user = data.birthdate;
    const email_user = data.email;
    const phone_user = data.phone;
    const password_user = data.password;
    const cgu_user = data.cgu;
    const newsletter_user = data.newsletter
    return this.http.post<UserInformation>('http://localhost:8082/signup', {
      lastname_user,
      firstname_user,
      birthdate_user,
      email_user,
      phone_user,
      password_user,
      cgu_user,
      newsletter_user
    });
  }
}
