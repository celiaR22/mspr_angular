import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Keep } from 'src/app/models/keep';
import { Locations } from 'src/app/models/location';
import { Plant } from 'src/app/models/plant';
import { KeepService } from 'src/app/services/keep.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.scss']
})
export class KeepComponent implements OnInit {

  constructor(private keepService: KeepService, private router: Router, private snackBar: MatSnackBar, private plantService: PlantService) { }
  keeps: Keep[];
  locations: Locations[];
  plants: Plant[]
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const sources = [
      this.keepService.getKeepByUser(),
      this.keepService.getLocations(),
      this.plantService.getPlantByUser()
    ]
    forkJoin(sources).subscribe((response) => {
      this.keeps = response[0]['keeps'];
      this.locations = response[1]['locations']
      this.plants = response[2]['plants'];
      this.getCityNameByKeep();

    })
  }

  addKeep() {
    this.router.navigate(['addKeep'])
  }

  getCityNameByKeep() {
    this.keeps.map((keep) => {
      const city = this.locations.filter((location) => location.address_id == keep.location_id)
      keep.location = {
        city: city[0].city
      }
    })
  }


}
