import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  getPlantByUser(data: string) {
    const test = JSON.parse(data);
    // console.log(test)
    // const header = new HttpHeaders({
    //   'Content-type': 'application/json',
    //   'Authorization': `${test.jwt}`
    // })

    // const headers = new HttpHeaders()
    //   .set('Content-type', 'application/json')
    //   .set('Authorization', `Bearer ${test}`);
    const token = test.jwt;
    const headers = new HttpHeaders()
      // .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${test.jwt}`)

    console.log(headers)
    return this.http.get<Plant>('http://localhost:8082/plant/all', { headers })
  }
}
