import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient, private router: Router) {
  }

  searchLocation(location){
    return this.http.get(`https://nominatim.openstreetmap.org/search?q=${location},+France&format=json&limit=4`)
  }
}