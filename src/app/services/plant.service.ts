import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private http: HttpClient) { }
  token = JSON.parse(sessionStorage.getItem('currentUser'));

  getPlantById(idPlant: number) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.jwt}`)
    return this.http.get(`http://localhost:8082/plant/${idPlant}`, { headers })
  }

  getPlantByUser() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.jwt}`)
    return this.http.get<Plant>('http://localhost:8082/plant/all', { headers })
  }

  addPlantByUser(data: Plant) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.jwt}`
    );
    return this.http.post<Plant>('http://localhost:8082/plant/', data, {
      headers,
    });
  }

  addPicturePlant(idPlant: number, data: File) {
    const formData = new FormData();
    formData.set('picture', data);
    const boundary = this.generateBoundary();

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token.jwt}`)
      .set('Content-Type', `multipart/form-data; boundary=${boundary}`);
    return this.http.post(
      `http://localhost:8082/upload/plant/${idPlant}`,
      formData,
      { headers }
    );
  }

  updatePlantByUser(idPlant: number, data: Plant) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.jwt}`
    );
    return this.http.put<Plant>(
      `http://localhost:8082/plant/${idPlant}`,
      data,
      { headers }
    );
  }

  deletePlantById(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.jwt}`
    );
    return this.http.delete(`http://localhost:8082/plant/${id}`, { headers });
  }

  generateBoundary() {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return `----MyBoundary${text}`;
  }
}
