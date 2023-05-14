import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {

  constructor(private plantService: PlantService, private router: Router) { }
  plants: Plant[]

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.plantService.getPlantByUser().subscribe((value) => {
      this.plants = value['plants'];
    })
  }

  addPlante() {
    this.router.navigate([`add`]);
  }
}