import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }
  token = sessionStorage.getItem('currentUser');

  getPlantByUser(data: string) {
    const token = JSON.parse(data);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token.jwt}`)
    return this.http.get<Plant>('http://localhost:8082/plant/all', { headers })
  }

  deletePlantById(id: number) {
    const token = JSON.parse(this.token);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token.jwt}`)
    return this.http.delete(`http://localhost:8082/plant/${id}`, { headers })
  }
}
