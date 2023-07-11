import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Keep } from '../models/keep';

@Injectable({
  providedIn: 'root'
})
export class KeepService {

  constructor(private http: HttpClient) { }

  token = JSON.parse(sessionStorage.getItem('currentUser'));

  getKeepByUser() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.jwt}`)
    return this.http.get<Keep>('http://localhost:8082/keep/user/all', { headers })
  }

  createKeep(data: Keep) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.jwt}`)
    return this.http.post<Keep>('http://localhost:8082/keep/', data, { headers })
  }

  getKeepById(idKeep: number) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.jwt}`)
    return this.http.get<Keep>(`http://localhost:8082/keep/${idKeep}`, { headers })
  }

  getLocations() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.jwt}`)
    return this.http.get<Keep>(`http://localhost:8082/locations`, { headers })
  }

  getAllKeppExceptUserCo() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.jwt}`)
    return this.http.get<Keep>(`http://localhost:8082/keep/all/except`, { headers })
  }

  applyToKeep(idKeepToApply: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.jwt}`
    );
    return this.http.put<Keep>(`http://localhost:8082/keep/apply/${idKeepToApply}`, { headers })

  }

}
