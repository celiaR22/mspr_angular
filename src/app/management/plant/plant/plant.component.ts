import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {

  constructor(private plantService: PlantService) { }
  plants: Plant[] = [
    {
      id: 1,
      user_id: 2,
      name: 'mimosas',
      instruction: 'arrosé matin et soir',
      type: 'fleur',
      status: 'libre'
    },
    {
      id: 2,
      user_id: 2,
      name: 'tulipe',
      instruction: 'arrosé matin et soir',
      type: 'fleur',
      status: 'garder'
    },
    {
      id: 3,
      user_id: 4,
      name: 'romarin',
      instruction: 'arrosé matin et soir',
      type: 'herbe aromatique',
      status: 'libre'
    },
    {
      id: 5,
      user_id: 2,
      name: 'menthe',
      instruction: 'arrosé matin et soir',
      type: 'herbe aromatique',
      status: 'libre'
    },
  ]

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    console.log(sessionStorage.getItem('currentUser'))
    this.plantService.getPlantByUser(sessionStorage.getItem('currentUser')).subscribe((value) => {
      console.log(value)
    })
  }



}
