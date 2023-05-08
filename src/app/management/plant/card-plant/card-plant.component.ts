import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';

@Component({
  selector: 'app-card-plant',
  templateUrl: './card-plant.component.html',
  styleUrls: ['./card-plant.component.scss']
})
export class CardPlantComponent implements OnInit {
  @Input() plants: Plant[];
  constructor(private router: Router, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }

  deletePlantById(element: Plant) {
    // on récupere l'index de la plante qu'on veut supprimer
    const indexPlant = this.plants.findIndex((plant) => plant.id == element.id)
    // on fait un splice pour la supprimer de notre tableau d'objets
    this.plants.splice(indexPlant, 1);
    // on confirme la suppression
    this.snackBar.open('La plante a bien été supprimé', 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  updatePlant(idPlant: number) {
    this.router.navigate([`plant/${idPlant}`]);
  }

}
