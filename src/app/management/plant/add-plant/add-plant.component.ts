import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private plantService: PlantService, private snackBar: MatSnackBar) { }
  plantForm: FormGroup;
  plantsArray: Plant[];
  plant: Plant;

  ngOnInit(): void {
    this.loadData();
    this.createForm()
  }

  createForm() {
    /// on cree le formulaire en mettant par défaut avec un '?', 
    //si c'est un ajout l input sera vide si c'est un update il prendra la valeur de la plante cliquer 
    this.plantForm = this.fb.group({
      plantName: [this.plant?.name_plant, Validators.required],
      plantType: [this.plant?.type_plant, Validators.required],
      plantInstruction: [this.plant?.instructions_plant, Validators.required]
    })
  }

  loadData() {
    this.plantService.getPlantByUser(sessionStorage.getItem('currentUser')).subscribe({
      next: (value) => {
        const plantId = this.activatedRoute.snapshot.params['id'];
        this.plantsArray = value['plant'];
        this.plant = this.plantsArray.find((plant) => plant.plant_id == plantId)
        this.createForm();
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      },
    })
  }

  getData(data: any): Plant {
    return {
      name_plant: data.plantName,
      instructions_plant: data.plantInstruction,
      type_plant: data.plantType,
      status_plant: 'libre',
    }
  }

  onSubmitForm() {
    const data = this.getData(this.plantForm.value);
    if (this.plantForm.valid) {
      /// si form valid on ajoute dans bdd
      /// et on redirige vers la page des plantes
      this.router.navigate(['/plants']);
    }
  }

  /// pour annuler l'ajout ou l'update de la plante
  cancelAction() {
    this.router.navigate(['/plants']);
  }

  getPlantById() {
    const plantId = this.activatedRoute.snapshot.params['id'];
    return this.plantsArray.find((plant) => plant.plant_id == plantId);
  }

}
