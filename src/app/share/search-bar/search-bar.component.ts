import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeocodingService }from '../../services/geocoding.service'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder, private geocodingService:GeocodingService) { }
  searchForm: FormGroup
  filteredOptions


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
   
    let result = this.geocodingService.searchLocation(data.localisation).subscribe((value)=> {
      this.filteredOptions = value
      
      for (let i = 0; i < this.filteredOptions.length; i++) {
        const element = this.filteredOptions[i];
        console.log(element.display_name);
        
      }
      
    })
   
  }


  /// reinitialise la valeur de l'input date au click sur l'icon X
  resetDate(field: string) {
    this.searchForm.get(field).setValue(null)
  }

}
