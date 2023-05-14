import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Keep } from 'src/app/models/keep';
import { Plant } from 'src/app/models/plant';
import { KeepService } from 'src/app/services/keep.service';
import { PlantService } from 'src/app/services/plant.service';
import { gestionForm } from 'src/app/share/form/gestionForm';

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

  superngOnInit(): void {
  }

  override ngOnInit(): void {
    this.loadData();
    this.createForm()
  }

  createForm() {
    this.keepForm = this.fb.group({
      keepLocalisation: ['', Validators.required],
      keepPlants: [[''], Validators.required],
      keepStartDate: ['', Validators.required],
      keepEndDate: ['', Validators.required],
      keepInstruction: ['', Validators.required]
    })
  }

  loadData() {
    this.plantService.getPlantByUser(sessionStorage.getItem('currentUser')).subscribe((value) => {
      this.plants = value['plants'];
    })
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

}
