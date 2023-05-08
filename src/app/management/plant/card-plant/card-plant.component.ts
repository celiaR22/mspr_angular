import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-card-plant',
  templateUrl: './card-plant.component.html',
  styleUrls: ['./card-plant.component.scss']
})
export class CardPlantComponent implements OnInit {
  @Input() plants: Plant[];
  constructor(private router: Router, private snackBar: MatSnackBar, private plantService: PlantService) { }


  ngOnInit(): void {
  }

  deletePlantById(element: Plant) {
    this.plantService.deletePlantById(element.plant_id).subscribe({
      next: (value) => {
        const indexPlant = this.plants.findIndex((plant) => plant.plant_id == element.plant_id)
        this.plants.splice(indexPlant, 1);
        this.snackBar.open(value['message'], 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      },
    })
  }

  updatePlant(idPlant: number) {
    this.router.navigate([`plant/${idPlant}`]);
  }

}
