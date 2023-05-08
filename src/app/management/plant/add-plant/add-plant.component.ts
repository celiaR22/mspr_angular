import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plant } from 'src/app/models/plant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }
  plantForm: FormGroup;
  plantsArray: Plant[];
  plant: Plant;

  ngOnInit(): void {
    this.loadData();
    this.createForm();
    this.getPlantById();
  }

  createForm() {
    this.plantForm = this.fb.group({
      plantName: ['', Validators.required],
      plantType: ['', Validators.required],
      plantInstruction: ['', Validators.required]
    })
  }

  loadData() {
    this.plantsArray = [{
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
  }

  getData(data: any): Plant {
    return {
      id: 10,
      user_id: 2,
      name: data.plantName,
      instruction: data.plantInstruction,
      type: data.plantType,
      status: 'libre',
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
    this.plant = this.plantsArray.find((plant) => plant.id == plantId);
  }

}
