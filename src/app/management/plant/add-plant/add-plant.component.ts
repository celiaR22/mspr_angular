import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gestionForm } from 'src/app/share/form/gestionForm';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent extends gestionForm implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private plantService: PlantService, private snackBar: MatSnackBar) {
    super()
  }
  plantForm: FormGroup;
  plantsArray: Plant[];
  plant: Plant;
  idPlant: number;

  superngOnInit(): void {
  }

  override ngOnInit(): void {
    this.idPlant = +this.activatedRoute.snapshot.params['id'];
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
        this.plantsArray = value['plant'];
        this.plant = this.plantsArray.find((plant) => plant.plant_id == this.idPlant)
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
    }
  }

  onSubmitForm() {
    this.errorMessage = [];
    // on véifie si le form est valid
    if (this.plantForm.valid) {
      const data = this.getData(this.plantForm.value);
      /// on va vérifier si c'est un update ou un add ( si update on aura un id dans param de url)
      if (this.idPlant) {
        this.plantService.updatePlantByUser(this.idPlant, data).subscribe({
          next: (value) => {
            this.router.navigate(['/plants']);
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
      } else {
        this.plantService.addPlantByUser(data).subscribe({
          next: (value) => {
            this.router.navigate(['/plants']);
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

    } else {
      this.getFormErrors(this.plantForm);
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
