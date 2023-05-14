import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Keep } from 'src/app/models/keep';
import { Plant } from 'src/app/models/plant';
import { KeepService } from 'src/app/services/keep.service';
import { PlantService } from 'src/app/services/plant.service';
import { gestionForm } from 'src/app/share/form/gestionForm';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-keep',
  templateUrl: './add-keep.component.html',
  styleUrls: ['./add-keep.component.scss']
})
export class AddKeepComponent extends gestionForm implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private plantService: PlantService,
    private keepService: KeepService,
    private snackBar: MatSnackBar) {
    super()
  }
  keepForm: FormGroup;
  idKeep: number;
  plants: Plant[]
  keep: Keep;

  superngOnInit(): void {
  }

  override ngOnInit(): void {
    this.idKeep = this.activatedRoute.snapshot.params['id'];
    this.loadData();
    this.createForm()
  }

  createForm() {
    this.keepForm = this.fb.group({
      keepLocalisation: [this.keep?.location_id, Validators.required],
      keepPlants: [this.keep?.plants ? this.getPlantsSelectedId() : [''], Validators.required],
      keepStartDate: [this.keep?.start_date_keep, Validators.required],
      keepEndDate: [this.keep?.end_date_keep, Validators.required],
      keepInstruction: [this.keep?.instruction_keep, Validators.required]
    })
  }

  loadData() {
    if (this.idKeep) {
      const source = [
        this.plantService.getPlantByUser(),
        this.keepService.getKeepById(this.idKeep)
      ]
      forkJoin(source).subscribe((response) => {
        this.plants = response[0]['plants'];
        this.keep = response[1]['keep']
        this.createForm();
      })
    } else {
      this.plantService.getPlantByUser().subscribe((value) => {
        this.plants = value['plants']
      })
    }

  }

  cancelAction() {
    this.router.navigate(['/keeps']);
  }

  getData(data: any): Keep {
    return {
      instruction_keep: data.keepInstruction,
      start_date_keep: data.keepStartDate,
      end_date_keep: data.keepEndDate,
      city: data.keepLocalisation,
      plants: data.keepPlants
    }
  }

  onSubmitForm() {
    this.errorMessage = [];
    // // on véifie si le form est valid
    if (this.keepForm.valid) {
      const data = this.getData(this.keepForm.value);
      /// on va vérifier si c'est un update ou un add ( si update on aura un id dans param de url)
      if (this.idKeep) {
        ///
      } else {
        this.keepService.createKeep(data).subscribe({
          next: (value) => {
            this.router.navigate(['/keeps']);
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
      this.getFormErrors(this.keepForm);
    }
  }

  getPlantsSelectedId() {
    if (this.idKeep) {
      const arrayPlantsId = []
      this.keep.plants.forEach((plant) => {
        arrayPlantsId.push(plant['plant_id'])
      })
      return arrayPlantsId;
    } else {
      return []
    }

  }

}
