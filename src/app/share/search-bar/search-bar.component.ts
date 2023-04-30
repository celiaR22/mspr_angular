import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  searchForm: FormGroup


  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.searchForm = this.fb.group({
      localisation: [''],
      startDate: [''],
      endDate: [''],
    })
  }

  getData(dataForm: FormGroup) {
    const dataValue = dataForm.value;
    return {
      localisation: dataValue.localisation,
      startDate: dataValue.startDate,
      endDate: dataValue.endDate
    }
  }

  submitForm() {
    const data = this.getData(this.searchForm);
    console.log(data)
  }


  /// reinitialise la valeur de l'input date au click sur l'icon X
  resetDate(field: string) {
    this.searchForm.get(field).setValue(null)
  }

}
