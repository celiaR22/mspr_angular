import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {

  constructor() { }
  plants: Plant[] = [
    {
      id: 1,
      user_id: 1,
      name: 'Mimosas',
      instruction: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'type fleur',
      status: 'libre',
    },
    {
      id: 2,
      user_id: 2,
      name: 'Tulipe',
      instruction: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'type fleur2',
      status: 'libre',
    },
    {
      id: 3,
      user_id: 1,
      name: 'Mimosas',
      instruction: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'type fleur',
      status: 'libre',
    },
    {
      id: 4,
      user_id: 1,
      name: 'Mimosas',
      instruction: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'type fleur',
      status: 'libre',
    },
    {
      id: 5,
      user_id: 1,
      name: 'Mimosas',
      instruction: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'type fleur',
      status: 'libre',
    },
    {
      id: 6,
      user_id: 1,
      name: 'Mimosas',
      instruction: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'type fleur',
      status: 'libre',
    },
    {
      id: 7,
      user_id: 1,
      name: 'Mimosas',
      instruction: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'type fleur',
      status: 'libre',
    },
  ]

  ngOnInit(): void {
  }

}
